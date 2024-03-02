/* eslint-disable react/prop-types */
import { Button } from "antd";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import global from "../../global";
import { formatCurrencyINR } from "../../libs/formatCurrencyINR";

const EventCard = ({ active, data }) => {
  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      <div className="w-full lg:-w[50%] m-auto">
        <img src={`${data.imageUrl[0]?.url}`} alt="" />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className={`${global.heading}`}>{data.productName}</h2>
        <p className="text-xl text-justify ">{data.description}</p>
        <div className="flex justify-between py-2">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {formatCurrencyINR(data.price)}
            </h5>
            <h5 className="font-bold text-[20px] text-2xl text-[#333] font-Roboto">
              {formatCurrencyINR(data.discountPrice)}
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data.total_sell} sold
          </span>
        </div>
        <CountDown data={data} />
        <br />
        <div className="flex items-center gap-3">
          <Link to={`/product-details/${data._id}`}>
            <Button className="bg-[#3C3D42] hover:!bg-[#3C3D42] text-white hover:!text-white hover:!border-[#3C3D42] p-3 py-4 flex items-center justify-center">
              See Details
            </Button>
          </Link>
          <Button className="bg-[#3C3D42] hover:!bg-[#3C3D42] text-white hover:!text-white hover:!border-[#3C3D42] py-4 p-3 flex items-center justify-center">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
