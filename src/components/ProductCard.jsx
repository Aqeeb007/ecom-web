/* eslint-disable react/prop-types */
import { Button, Rate } from "antd";
import { Card } from "antd";
import { Eye } from "lucide-react";
import { formatCurrencyINR } from "../libs/formatCurrencyINR";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength - 3) + "...";
  }

  return (
    <Card className="w-64 h-auto py-3 bg-gray-100">
      <div className="flex items-center justify-center">
        <img
          src={product.imageUrl[0].url}
          alt=""
          className="flex w-[90%] items-center justify-center rounded-lg"
        />
      </div>

      <div className="p-2 h-1/2">
        <p className="text-xl font-semibold">
          {truncateText(product.productName, 20)}
        </p>
        <p className="mb-1 text-gray-700">
          {truncateText(product.description, 60)}
        </p>
        <Rate defaultValue={product.ratings} disabled />
        <div className="flex gap-2">
          <div className="text-lg font-medium">
            {formatCurrencyINR(product.discountPrice)}
          </div>
          <div className="text-sm text-red-500">
            {formatCurrencyINR(product.price)}
          </div>
        </div>
        <div className="flex justify-between w-full gap-4 pt-1">
          <Button className="w-full bg-[#3C3D42] hover:!bg-[#3C3D42] text-white hover:!text-white hover:!border-[#3C3D42]">
            Add to Cart
          </Button>
          <Button
            onClick={() => navigate(`/product-details/${product.id}`)}
            className="bg-[#3C3D42] hover:!bg-[#3C3D42] text-white hover:!text-white hover:!border-[#3C3D42]"
          >
            <Eye />
          </Button>
        </div>
      </div>
    </Card>
  );
};
