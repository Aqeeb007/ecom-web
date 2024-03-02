import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

// eslint-disable-next-line react/prop-types
export const Layout = ({ children }) => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <main className="pt-16">{children}</main>
      <div className="">
        <Footer />
      </div>
    </div>
  );
};
