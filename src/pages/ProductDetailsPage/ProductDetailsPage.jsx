import { useState } from "react";
import { productData } from "../../data";
import global from "../../global";
import { Button, Rate } from "antd";
import { formatCurrencyINR } from "../../libs/formatCurrencyINR";
import { Minus } from "lucide-react";
import { Plus } from "lucide-react";
import { ProductCard } from "../../components/ProductCard";

const ProductDetailsPage = () => {
  const [image, setImage] = useState(productData[1].imageUrl[0].url);
  const product = productData[1];
  const otherProduct = productData
    .filter((p) => product.category !== p.category)
    .slice(5);

  return (
    <div className="px-10">
      <h1 className={`${global.heading}`}>ProductDetails</h1>
      <div className="flex flex-col gap-10 800px:flex-row 800px:gap-32">
        <div className="flex flex-col gap-3 p-4 bg-gray-300 rounded-lg w-72 800px:w-[500px]">
          <img className="rounded-lg bg-blend-color-burn" src={image} alt="" />
          <div className="flex gap-3">
            <img
              onClick={() => setImage(product.imageUrl[0].url)}
              className="w-20 rounded-lg"
              src={product.imageUrl[0].url}
              alt=""
            />
            <img
              onClick={() => setImage(product.imageUrl[1].url)}
              className="w-20 rounded-lg"
              src={product.imageUrl[1].url}
              alt=""
            />
            <img
              onClick={() => setImage(product.imageUrl[1].url)}
              className="w-20 rounded-lg"
              src={product.imageUrl[1].url}
              alt=""
            />
          </div>
        </div>
        <div className="w-2/3">
          <h1 className={`${global.heading}`}>{product.productName}</h1>
          <Rate disabled defaultValue={product.ratings} />
          <div>
            <h1 className="my-2 text-2xl font-semibold">Price</h1>
            <h1 className="text-2xl">
              {formatCurrencyINR(product.discountPrice)}
            </h1>
          </div>
          <div
            className={`${
              product.stock > 0
                ? "bg-green-500 p-2 text-xl font-semibold w-[100px] flex items-center justify-center my-2 text-white rounded-lg"
                : "bg-red-500 p-2 text-xl font-semibold w-[150px] flex items-center justify-center my-2 text-white rounded-lg"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </div>
          <h1 className="my-2 text-2xl font-semibold">Description</h1>
          <div className="text-xl text-justify">{product.description}</div>

          <div className="flex items-center gap-4 pt-3">
            <Button
              icon={<Minus />}
              className="px-2 py-1 text-gray-500 bg-gray-200 rounded"
              // onClick={() => decreaseQuantity(index)}
            />
            <span className="text-lg">1</span>
            <Button
              icon={<Plus />}
              className="px-2 py-1 text-gray-500 bg-gray-200 rounded"
              // onClick={() => decreaseQuantity(index)}
            />
          </div>
          <Button className="flex items-center justify-center px-5 py-5 mt-16 text-xl font-semibold text-white bg-blue-500">
            Add to Cart
          </Button>
        </div>
      </div>
      <h1 className={`${global.heading}`}>Other Products</h1>
      <div className={`grid items-center justify-between md:grid-cols-5 `}>
        {otherProduct.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
