import { ProductCard } from "../../components/ProductCard";
import { productData } from "../../data";

const ProductsPage = () => {
  return (
    <div className="px-10">
      <h1 className="my-2 text-4xl font-semibold">All Products</h1>
      <div className="grid items-center justify-between gap-10 800px:grid-cols-5">
        {productData.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
