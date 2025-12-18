const reviewImages = [
  { src: '/review1.avif', alt: 'Customer review photo 1' },
  { src: '/review2.avif', alt: 'Customer review photo 2' },
  { src: '/review3.avif', alt: 'Customer review photo 3' },
];

const ReviewsSection = () => {
  return (
    <section className="bg-black text-white py-20">
      <div className="mx-auto px-2 md:px-16 max-w-5xl">
        <div className="grid md:grid-cols-3 gap-12 md:gap-10">
          {reviewImages.map((img, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center"
            >
              <img src={img.src} alt={img.alt} className="w-full h-auto rounded-lg object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;


