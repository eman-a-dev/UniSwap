import Link from 'next/link';

export default function ProductCard({ product }: { product: any }) {
  if (!product) return null;

  return (
    <Link
      href={`/productdetails/${product.item_id}`} // ✅ Use correct ID here
      className="w-full max-w-sm rounded-3xl bg-white shadow-lg p-4 space-y-4 hover:scale-[1.02] transition-all"
    >
      {/* Image and Info */}
      <img src={product.image_url} alt={product.title} className="w-full h-60 object-cover" />
      <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
      <p className="text-sm text-gray-500">{product.description}</p>
      <div className="flex justify-between items-center pt-2">
        <span className="text-lg font-semibold text-gray-800">${product.price}</span>
        <button className="bg-orange-500 text-white px-7 py-2 rounded-full">Buy</button>
      </div>
    </Link>
  );
}
