import ProductPage from "../../components/ProductPage/ProductPage";

async function getProductById(id: string) {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Product not found");

  return res.json();
}

export default async function Detail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProductById(id);

  return <ProductPage product={product} />;
}