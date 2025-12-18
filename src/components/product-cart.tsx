const ProductCart = ({ product }: 
  { product: { title: string, description: string, price: number, image: string } }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={product.image} alt={product.title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-xl">{product.title}</h3>
        <p className="text-gray-500 mt-2">{product.description}</p>
        <p className="mt-4 text-lg font-semibold">${product.price}</p>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
