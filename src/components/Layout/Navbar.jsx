import { Avatar, Button, Drawer, Input } from "antd";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { productData } from "../../data";
import { Sidebar } from "./Sidebar";
import { Trash } from "lucide-react";
import { formatCurrencyINR } from "../../libs/formatCurrencyINR";
import { Minus } from "lucide-react";
import { Plus } from "lucide-react";
import global from "../../global";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const nav_routes = [
  {
    to: "/",
    title: "Home",
  },
  {
    to: "/products",
    title: "Products",
  },
  {
    to: "/events",
    title: "Events",
  },
  {
    to: "/faqs",
    title: "FAQs",
  },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const [searchData, setSearchData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector(
    (state) => state.mainState.auth
  );
  const seller = { name: "seller", _id: 1234 };
  const data = productData;

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      productData &&
      productData.filter((product) =>
        product.productName.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSearchVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 z-10 flex items-center justify-between w-full h-16 px-2 bg-gray-100 shadow-sm 800px:px-10">
      <div className="block 800px:hidden">
        <Menu onClick={() => setOpen(true)} size={30} />
      </div>
      <div className="hidden 800px:block">
        <Link href="/">
          <img src={logo} className="h-12 " alt="" />
        </Link>
      </div>
      <div>
        <Input
          className=" relative 800px:w-[300px] min-w-[290px] bg-gray-50 hover:!bg-gray-50 focus-within:!bg-gray-50"
          placeholder="Search..."
          prefix={<Search />}
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setSearchVisible(true)}
        />
        {searchVisible && searchData && searchData.length !== 0 && (
          <div
            ref={searchRef}
            className="absolute top-[64px] min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4 rounded-b-lg"
          >
            {searchData.map((i, index) => (
              <Link key={index} to={`/product/${i.id}`}>
                <div className="flex w-full items-start-py-3">
                  <img
                    src={`${i.imageUrl[0]?.url}`}
                    alt=""
                    className="w-[40px] h-[40px] mr-[10px]"
                  />
                  <h1>{i.productName}</h1>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="hidden gap-4 800px:flex">
        {nav_routes.map((route) => (
          <NavLink
            key={route.title}
            to={route.to}
            className={({ isActive }) =>
              isActive
                ? "text-green-600"
                : "flex items-center justify-center text-gray-500 hover:text-gray-700"
            }
          >
            <span className="ml-2 font-semibold">{route.title}</span>
          </NavLink>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4">
        <div onClick={() => setCartOpen(true)}>
          <ShoppingBag className="cursor-pointer" size={30} />
        </div>
        <div>
          <Avatar
            size={35}
            className="cursor-pointer"
            src={`${
              isAuthenticated
                ? user.avatar.url
                : "https://avatars.githubusercontent.com/u/10000000"
            }`}
            onClick={() =>
              isAuthenticated
                ? navigate(`/profile/${user.name}/${user._id}`)
                : navigate(`/login`)
            }
          />
        </div>
        <div>
          <Button
            onClick={() =>
              isAuthenticated
                ? navigate(`/seller/${seller.name}/${seller._id}`)
                : navigate(`/seller/login`)
            }
          >
            Become Seller
          </Button>
        </div>
      </div>
      <Drawer width={400} closable={false} placement="left" open={open}>
        <div className="p-2 bg-gray-100 h-screen !w-full">
          <X className="ml-auto" onClick={() => setOpen(false)} />
          <div>
            <Sidebar
              onClose={() => {
                setOpen(false);
              }}
            />
          </div>
        </div>
      </Drawer>
      <Drawer width={400} closable={false} placement="right" open={cartOpen}>
        <div className="flex flex-col w-full h-screen p-2 overflow-hidden bg-gray-100">
          <div className="flex justify-end">
            <X onClick={() => setCartOpen(false)} />
          </div>
          <div className="flex-grow overflow-y-auto">
            {data.length <= 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-3xl">
                <ShoppingBag size={40} />
                No items in your cart.
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className={`${global.heading}`}>Cart</div>
                {data.map((item, index) => (
                  <div
                    className="flex items-start w-full gap-3 p-3 transition-colors duration-200 ease-in-out bg-gray-100 hover:bg-gray-200 rounded-xl"
                    key={index}
                  >
                    <div className="flex items-center justify-center flex-shrink-0 w-24 h-24">
                      <img
                        src={item.imageUrl?.[0]?.url}
                        alt=""
                        className="object-cover w-full h-full rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <h1 className="text-xl font-semibold">
                        {item.productName}
                      </h1>
                      <p className="text-gray-600">
                        {formatCurrencyINR(item.discountPrice)}
                      </p>
                      <div className="flex items-center gap-4 pt-3">
                        <Button
                          icon={<Minus />}
                          className="px-2 py-1 text-gray-500 bg-gray-200 rounded"
                          // onClick={() => decreaseQuantity(index)}
                        />
                        <span className="text-lg">3</span>
                        <Button
                          icon={<Plus />}
                          className="px-2 py-1 text-gray-500 bg-gray-200 rounded"
                          // onClick={() => decreaseQuantity(index)}
                        />
                        <Trash
                          className="w-6 h-6 ml-auto text-red-600 cursor-pointer"
                          // onClick={() => removeItem(index)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col mt-auto">
            <div className={`${global.heading}`}>Order Information</div>
            <div className="flex flex-col gap-1">
              <div className="text-md">
                Sub Total: <span>{formatCurrencyINR(1049)}</span>
              </div>
              <div className="text-md">
                Delivery Charge: <span>{formatCurrencyINR(1049)}</span>
              </div>
              <div className="text-lg font-semibold">
                Total: <span>{formatCurrencyINR(1049)}</span>
              </div>
            </div>
            <Button className="mt-auto">Check Out</Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
