import { Carousel } from "antd";
import { ProductCard } from "../../components/ProductCard";
import { productData } from "../../data";
import EventCard from "../../components/Events/Event";
import global from "../../global";

const HomePage = () => {
  const bestSellersProducts = productData
    .filter((product) => product.total_sell > 0)
    .sort((a, b) => b.top_sell - a.top_sell) // Sort in descending order based on top_sell
    .slice(0, 5);

  const productsForHomePage10 = productData.slice(0, 10);

  return (
    <div>
      <div className="w-full">
        <CarouselHomePage />
      </div>
      <div className="px-10">
        <h1 className={`${global.heading}`}>Best Sellers</h1>
        <div className="">
          <div className={`grid items-center justify-between md:grid-cols-5 `}>
            {bestSellersProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
      <div className="px-10">
        <h1 className={`${global.heading}`}>Event</h1>

        <div className="">
          <EventCard active={true} data={productData[0]} />
        </div>
      </div>
      <div className="px-10">
        <h1 className={`${global.heading}`}>Products</h1>
        <div className="grid items-center justify-between gap-10 800px:grid-cols-5">
          {productsForHomePage10.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

const CarouselHomePage = () => {
  return (
    <Carousel autoplay={true} autoplaySpeed={5000}>
      <div className="">
        <img src="https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg" />
      </div>
      <div className="">
        <img src="https://themes.rslahmed.dev/rafcart/assets/images/banner-1.jpg" />
      </div>
      <div className="">
        <img src="https://themes.rslahmed.dev/rafcart/assets/images/banner-3.jpg" />
      </div>
    </Carousel>
  );
};

export default HomePage;
