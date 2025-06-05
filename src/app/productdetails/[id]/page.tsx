import ProductPage from '../../components/ProductPage/ProductPage';

async function getProductById(id: string) {
  const res = await fetch(`http://localhost:3000/api/products/${id}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json();
}

export default async function Detail({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  return <ProductPage product={product} />;
}