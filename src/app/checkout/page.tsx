'use client';

import { useState, useEffect, useRef } from 'react';
import { useCart } from '../../contexts/CartContext';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaLock, FaChevronLeft, FaSpinner } from 'react-icons/fa';
import { processPayment, initializeApplePay, initializeGooglePay } from '../../lib/payment';
import { createOrder } from '../../lib/orders';

const CheckoutPage = () => {
  const { items, getTotal, clearCart, getSelectedAddons, getAddonsTotal } = useCart();
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const paymentInProgress = useRef(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postcode: '',
    country: 'United Kingdom',
    phone: '',
  });

  // 根据产品类型和总数量计算单价
  const getUnitPrice = (productType: string | undefined, totalQuantity: number): number => {
    if (productType === 'horizon') {
      if (totalQuantity === 1) return 54.99;
      if (totalQuantity === 2) return 93.48 / 2;
      if (totalQuantity === 4) return 164.97 / 4;
      if (totalQuantity < 2) return 54.99;
      if (totalQuantity < 4) return 93.48 / 2;
      return 164.97 / 4;
    } else if (productType === 'console') {
      if (totalQuantity === 1) return 39.99;
      if (totalQuantity === 2) return 67.98 / 2;
      if (totalQuantity === 4) return 135.96 / 4;
      if (totalQuantity < 2) return 39.99;
      if (totalQuantity < 4) return 67.98 / 2;
      return 135.96 / 4;
    }
    return 0;
  };

  // 获取相同类型产品的总数量
  const getProductTotalQuantity = (productType: string | undefined): number => {
    if (!productType) return 0;
    return items
      .filter(item => item.productType === productType)
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  // 计算单个商品应该显示的价格
  const getItemDisplayPrice = (item: typeof items[0]): number => {
    if (!item.productType) {
      return item.price;
    }
    const totalQuantity = getProductTotalQuantity(item.productType);
    return getUnitPrice(item.productType, totalQuantity);
  };

  const subtotal = getTotal();
  const addonsTotal = getAddonsTotal();
  const shipping = 4.99;
  const total = subtotal + addonsTotal + shipping;

  const paymentMethods = [
    { id: 'paypal', name: 'PayPal', icon: '/paypal.png' },
    { id: 'applepay', name: 'Apple Pay', icon: '/apple.png' },
    { id: 'visa', name: 'Visa', icon: '/visa.png' },
    { id: 'googlepay', name: 'Google Pay', icon: '/googlepay.png' },
    { id: 'yinlianpay', name: 'YinLian Pay', icon: '/yinlianpay.png' },
    { id: 'airwallex', name: 'Airwallex', icon: '/airwallex.png' },
  ];

  // 当购物车内容或支付方式变化时，重置支付状态
  useEffect(() => {
    paymentInProgress.current = false;
    setIsProcessing(false);
  }, [items, selectedPayment]);

  // 加载PayPal SDK
  useEffect(() => {
    if (selectedPayment === 'paypal' && !paypalLoaded) {
      // 检查是否已经加载了PayPal SDK
      if ((window as any).paypal) {
        setPaypalLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'sb'}&currency=GBP`;
      script.async = true;
      script.onload = () => setPaypalLoaded(true);
      script.onerror = () => {
        console.error('Failed to load PayPal SDK');
        setPaypalLoaded(false);
      };
      document.body.appendChild(script);
      return () => {
        const existingScript = document.querySelector(`script[src*="paypal.com/sdk"]`);
        if (existingScript) {
          document.body.removeChild(existingScript);
        }
      };
    }
  }, [selectedPayment, paypalLoaded]);

  // 渲染PayPal按钮
  useEffect(() => {
    if (selectedPayment === 'paypal' && paypalLoaded && typeof window !== 'undefined' && (window as any).paypal) {
      const container = document.getElementById('paypal-button-container');
      if (container) {
        // 每次渲染前都清空容器，确保创建新的按钮实例
        // 这样可以避免复用之前的订单状态
        container.innerHTML = '';

        const paypal = (window as any).paypal;
        
        paypal.Buttons({
          createOrder: async (data: any, actions: any) => {
            // 验证表单
            if (!formData.email || !formData.firstName || !formData.lastName || !formData.address) {
              throw new Error('Please fill in all required fields');
            }

            // 检查是否有PayPal配置，如果有则使用后端API创建订单，否则使用PayPal SDK直接创建
            const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
            const hasPayPalConfig = paypalClientId && paypalClientId !== 'sb';

            if (hasPayPalConfig) {
              // 获取选中的附加商品
              const selectedAddons = getSelectedAddons();
              
              // 将附加商品转换为订单项格式
              const addonItems = selectedAddons.map(addon => ({
                id: addon.id,
                name: addon.name,
                price: addon.price,
                image: addon.image,
                quantity: 1,
                productType: 'addon' as const,
              }));

              // 使用后端API创建PayPal订单
              const orderData = {
                items: [...items, ...addonItems],
                shipping: {
                  address: formData.address,
                  city: formData.city,
                  postcode: formData.postcode,
                  country: formData.country,
                },
                customer: {
                  email: formData.email,
                  firstName: formData.firstName,
                  lastName: formData.lastName,
                  phone: formData.phone,
                },
              };

              const paymentRequest = {
                paymentMethod: 'paypal',
                amount: total,
                currency: 'GBP',
                orderData,
              };

              try {
                const response = await processPayment(paymentRequest);
                if (response.success && response.paymentId) {
                  // 返回PayPal订单ID
                  return response.paymentId;
                }
                throw new Error(response.error || 'Failed to create PayPal order');
              } catch (error: any) {
                console.error('PayPal createOrder error:', error);
                throw new Error(error.message || 'Failed to create PayPal order');
              }
            } else {
              // 使用PayPal SDK直接创建订单（客户端模式）
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    currency_code: 'GBP',
                    value: total.toFixed(2),
                  },
                }],
              });
            }
          },
          onApprove: async (data: any, actions: any) => {
            try {
              // 捕获订单
              let order;
              if (actions.order) {
                order = await actions.order.capture();
              }
              
              // 获取PayPal订单ID
              const paypalOrderId = data.orderID || order?.id || `paypal_${Date.now()}`;
              
              await handleOrderSuccess('paypal', paypalOrderId);
            } catch (error: any) {
              console.error('PayPal onApprove error:', error);
              alert(`Payment failed: ${error.message || 'Please try again.'}`);
            }
          },
          onError: (err: any) => {
            console.error('PayPal error:', err);
            const errorMessage = err?.message || err?.toString() || 'Unknown error';
            console.error('PayPal error details:', err);
            alert(`PayPal payment failed: ${errorMessage}. Please check the console for details.`);
          },
          onCancel: (data: any) => {
            console.log('PayPal payment cancelled', data);
          },
        }).render('#paypal-button-container').catch((err: any) => {
          console.error('PayPal button render error:', err);
        });
      }
    } else if (selectedPayment !== 'paypal') {
      // 当切换到其他支付方式时，清理容器
      const container = document.getElementById('paypal-button-container');
      if (container) {
        container.innerHTML = '';
      }
    }
  }, [selectedPayment, paypalLoaded, formData.email, formData.firstName, formData.lastName, formData.address, formData.city, formData.postcode, formData.country, formData.phone, items, total]);

  // 创建订单并跳转
  const handleOrderSuccess = async (paymentMethod: string, paymentId: string) => {
    // 确保支付流程已完成
    if (paymentInProgress.current) {
      paymentInProgress.current = false;
    }
    setIsProcessing(false);

    try {
      // 获取选中的附加商品
      const selectedAddons = getSelectedAddons();
      
      // 将附加商品转换为订单项格式
      const addonItems = selectedAddons.map(addon => ({
        id: addon.id,
        name: addon.name,
        price: addon.price,
        image: addon.image,
        quantity: 1,
        productType: 'addon' as const,
      }));

      const orderData = {
        items: [...items, ...addonItems],
        customer: {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
        },
        shipping: {
          address: formData.address,
          city: formData.city,
          postcode: formData.postcode,
          country: formData.country,
        },
        paymentMethod,
        paymentId,
        total,
      };

      const orderResponse = await createOrder(orderData);
      
      if (orderResponse.success && orderResponse.order) {
        clearCart();
        router.push(`/order?status=success&payment=${paymentMethod}&orderNumber=${orderResponse.order.orderNumber}`);
      } else {
        // 即使订单创建失败，也跳转（使用临时订单号）
        const tempOrderNumber = `GL${Date.now()}${Math.floor(Math.random() * 10000)}`;
        clearCart();
        router.push(`/order?status=success&payment=${paymentMethod}&orderNumber=${tempOrderNumber}`);
      }
    } catch (error) {
      console.error('Order creation error:', error);
      // 即使出错也跳转
      const tempOrderNumber = `GL${Date.now()}${Math.floor(Math.random() * 10000)}`;
      clearCart();
      router.push(`/order?status=success&payment=${paymentMethod}&orderNumber=${tempOrderNumber}`);
    }
  };

  // 处理支付
  const handlePayment = async (paymentMethod: string) => {
    // 防止重复提交
    if (paymentInProgress.current) {
      console.warn('Payment already in progress');
      return;
    }

    if (!formData.email || !formData.firstName || !formData.lastName || !formData.address) {
      alert('Please fill in all required fields');
      return;
    }

    paymentInProgress.current = true;
    setIsProcessing(true);

    try {
      // 获取选中的附加商品
      const selectedAddons = getSelectedAddons();
      
      // 将附加商品转换为订单项格式
      const addonItems = selectedAddons.map(addon => ({
        id: addon.id,
        name: addon.name,
        price: addon.price,
        image: addon.image,
        quantity: 1,
        productType: 'addon' as const,
      }));

      const orderData = {
        items: [...items, ...addonItems],
        shipping: {
          address: formData.address,
          city: formData.city,
          postcode: formData.postcode,
          country: formData.country,
        },
        customer: {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
        },
      };

      const paymentRequest = {
        paymentMethod,
        amount: total,
        currency: 'GBP',
        orderData,
      };

      // 根据不同的支付方式处理
      switch (paymentMethod) {
        case 'paypal':
          // PayPal按钮会自己处理支付，这里不应该被调用
          alert('Please use the PayPal button to complete your payment');
          break;
        case 'applepay':
          await handleApplePayPayment(paymentRequest);
          break;
        case 'googlepay':
          await handleGooglePayPayment(paymentRequest);
          break;
        case 'visa':
          await handleVisaPayment(paymentRequest);
          break;
        case 'yinlianpay':
          await handleYinLianPayment(paymentRequest);
          break;
        case 'airwallex':
          await handleAirwallexPayment(paymentRequest);
          break;
        default:
          alert('Invalid payment method');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
      paymentInProgress.current = false;
    }
  };


  // Apple Pay支付处理
  const handleApplePayPayment = async (paymentRequest: any) => {
    try {
      if (typeof window !== 'undefined' && window.ApplePaySession && window.ApplePaySession.canMakePayments()) {
        const session = await initializeApplePay(paymentRequest.amount, paymentRequest.currency);
        if (!session) {
          alert('Apple Pay is not available');
          paymentInProgress.current = false;
          setIsProcessing(false);
          return;
        }

        session.onvalidatemerchant = async (event: any) => {
          try {
            const response = await fetch('/api/payment/validate-apple', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ validationURL: event.validationURL }),
            });
            const merchantSession = await response.json();
            session.completeMerchantValidation(merchantSession);
          } catch (error) {
            session.abort();
            paymentInProgress.current = false;
            setIsProcessing(false);
          }
        };

        session.onpaymentauthorized = async (event: any) => {
          try {
            const response = await processPayment(paymentRequest);
            if (response.success) {
              session.completePayment(window.ApplePaySession.STATUS_SUCCESS);
              await handleOrderSuccess('applepay', response.paymentId || `applepay_${Date.now()}`);
            } else {
              session.completePayment(window.ApplePaySession.STATUS_FAILURE);
              paymentInProgress.current = false;
              setIsProcessing(false);
            }
          } catch (error) {
            session.completePayment(window.ApplePaySession.STATUS_FAILURE);
            paymentInProgress.current = false;
            setIsProcessing(false);
          }
        };

        session.begin();
      } else {
        alert('Apple Pay is not available on this device');
        paymentInProgress.current = false;
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Apple Pay error:', error);
      paymentInProgress.current = false;
      setIsProcessing(false);
    }
  };

  // Google Pay支付处理
  const handleGooglePayPayment = async (paymentRequest: any) => {
    try {
      if (typeof window !== 'undefined' && window.google?.payments?.api) {
        const googlePayData = await initializeGooglePay(
          paymentRequest.amount,
          paymentRequest.currency
        );

        if (!googlePayData || !googlePayData.paymentsClient || !googlePayData.paymentRequest) {
          alert('Google Pay is not available');
          paymentInProgress.current = false;
          setIsProcessing(false);
          return;
        }

        const { paymentsClient, paymentRequest: googlePaymentRequest } = googlePayData;

        paymentsClient.loadPaymentData(googlePaymentRequest)
          .then(async (paymentData: any) => {
            try {
              const response = await processPayment(paymentRequest);
              if (response.success) {
                await handleOrderSuccess('googlepay', response.paymentId || `googlepay_${Date.now()}`);
              } else {
                alert(response.error || 'Payment failed');
                paymentInProgress.current = false;
                setIsProcessing(false);
              }
            } catch (error) {
              console.error('Google Pay processing error:', error);
              paymentInProgress.current = false;
              setIsProcessing(false);
            }
          })
          .catch((error: any) => {
            console.error('Google Pay error:', error);
            alert('Google Pay payment failed');
            paymentInProgress.current = false;
            setIsProcessing(false);
          });
      } else {
        alert('Google Pay is not available');
        paymentInProgress.current = false;
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Google Pay initialization error:', error);
      paymentInProgress.current = false;
      setIsProcessing(false);
    }
  };

  // Visa/Stripe支付处理
  const handleVisaPayment = async (paymentRequest: any) => {
    try {
      const response = await processPayment(paymentRequest);
      if (response.success) {
        if (response.clientSecret) {
          // 使用Stripe处理支付
          if (typeof window !== 'undefined' && (window as any).Stripe) {
            const stripe = (window as any).Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
            const { error, paymentIntent } = await stripe.confirmCardPayment(response.clientSecret, {
              payment_method: {
                card: {
                  // 这里需要从表单获取卡号信息
                },
              },
            });

            if (error) {
              alert(error.message);
              paymentInProgress.current = false;
              setIsProcessing(false);
            } else {
              await handleOrderSuccess('visa', paymentIntent?.id || response.paymentId || `visa_${Date.now()}`);
            }
          } else {
            // 如果没有Stripe SDK，重定向到支付页面
            alert('Please install Stripe SDK or use a different payment method');
            paymentInProgress.current = false;
            setIsProcessing(false);
          }
        } else {
          // Demo模式：直接处理订单
          await handleOrderSuccess('visa', response.paymentId || `visa_${Date.now()}`);
        }
      } else {
        alert(response.error || 'Payment failed');
        paymentInProgress.current = false;
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Visa payment error:', error);
      alert('Payment failed. Please try again.');
      paymentInProgress.current = false;
      setIsProcessing(false);
    }
  };

  // 银联支付处理
  const handleYinLianPayment = async (paymentRequest: any) => {
    try {
      const response = await processPayment(paymentRequest);
      if (response.success) {
        // 检查是否有真实的支付网关配置
        // 如果有redirectUrl且不是订单页面，说明需要跳转到第三方支付页面
        if (response.redirectUrl && !response.redirectUrl.includes('/order')) {
          // 有第三方支付重定向URL，跳转到支付页面
          window.location.href = response.redirectUrl;
        } else {
          // Demo模式或支付完成：通过handleOrderSuccess处理订单
          await handleOrderSuccess('yinlianpay', response.paymentId || `yinlianpay_${Date.now()}`);
        }
      } else {
        alert(response.error || 'Payment failed');
        paymentInProgress.current = false;
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('YinLian payment error:', error);
      alert('Payment failed. Please try again.');
      paymentInProgress.current = false;
      setIsProcessing(false);
    }
  };

  // 空中云汇支付处理
  const handleAirwallexPayment = async (paymentRequest: any) => {
    try {
      const response = await processPayment(paymentRequest);
      if (response.success) {
        // 检查是否有真实的支付网关配置
        // 如果有redirectUrl且不是订单页面，说明需要跳转到第三方支付页面
        if (response.redirectUrl && !response.redirectUrl.includes('/order')) {
          // 有第三方支付重定向URL，跳转到支付页面
          window.location.href = response.redirectUrl;
        } else {
          // Demo模式或支付完成：通过handleOrderSuccess处理订单
          await handleOrderSuccess('airwallex', response.paymentId || `airwallex_${Date.now()}`);
        }
      } else {
        alert(response.error || 'Payment failed');
        paymentInProgress.current = false;
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Airwallex payment error:', error);
      alert('Payment failed. Please try again.');
      paymentInProgress.current = false;
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPayment) {
      alert('Please select a payment method');
      return;
    }
    await handlePayment(selectedPayment);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <Link href="/" className="text-purple-400 hover:text-purple-300">
            Continue shopping
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
          <FaChevronLeft />
          <span>Continue shopping</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 左侧：订单详情和表单 */}
          <div>
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>

            {/* 联系信息 */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-purple-500"
                required
              />
            </section>

            {/* 收货地址 */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-purple-500"
                required
              />
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Postcode"
                  value={formData.postcode}
                  onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                  className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-purple-500"
                required
              />
              <input
                type="tel"
                placeholder="Phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                required
              />
            </section>

            {/* 支付方式 */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setSelectedPayment(method.id)}
                    className={`w-full flex items-center gap-4 p-4 border-2 rounded-lg transition ${
                      selectedPayment === method.id
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPayment === method.id
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-gray-600 bg-transparent'
                    }`}>
                      {selectedPayment === method.id && (
                        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                      )}
                    </div>
                    {method.icon && (
                      <div className="relative w-16 h-10 bg-white rounded px-2 py-1 flex items-center justify-center">
                        <Image
                          src={method.icon}
                          alt={method.name}
                          fill
                          className="object-contain p-1"
                          sizes="64px"
                        />
                      </div>
                    )}
                    <span className="font-semibold">{method.name}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* 右侧：订单摘要 */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              {/* 商品列表 */}
              <div className="space-y-4 mb-6">
                {items.map((item) => {
                  const unitPrice = getItemDisplayPrice(item);
                  const itemTotal = unitPrice * item.quantity;
                  return (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-20 h-20 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
                        <p className="text-gray-400 text-xs mb-1">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-purple-400 font-bold">
                          £{itemTotal.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
                
                {/* 附加商品列表 */}
                {getSelectedAddons().map((addon) => (
                  <div key={addon.id} className="flex gap-4">
                    <div className="relative w-20 h-20 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={addon.image}
                        alt={addon.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm mb-1">{addon.name}</h3>
                      <p className="text-gray-400 text-xs mb-1">
                        Quantity: 1
                      </p>
                      <p className="text-purple-400 font-bold">
                        £{addon.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 价格明细 */}
              <div className="border-t border-gray-800 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                {addonsTotal > 0 && (
                  <div className="flex justify-between text-gray-400">
                    <span>Add-ons</span>
                    <span>£{addonsTotal.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span>£{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-3 border-t border-gray-800">
                  <span>Total</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
              </div>

              {/* 提交按钮 */}
              {selectedPayment === 'paypal' && paypalLoaded ? (
                <div id="paypal-button-container" className="mb-4"></div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <button
                    type="submit"
                    disabled={isProcessing || !selectedPayment}
                    className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <FaLock />
                        <span>Complete Order</span>
                      </>
                    )}
                  </button>
                </form>
              )}
              
              {selectedPayment === 'paypal' && !paypalLoaded && (
                <div className="text-center text-gray-400 text-sm mb-4">
                  Loading PayPal...
                </div>
              )}

              <p className="text-xs text-gray-500 text-center mt-4">
                Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;

