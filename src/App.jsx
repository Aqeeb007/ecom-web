import Cookies from "js-cookie";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
// eslint-disable-next-line no-unused-vars
import ProtectedRoute from "./routes/ProtecedRoute";
import {
  EventsPage,
  FaqsPage,
  HomePage,
  LoginPage,
  PageNotFound,
  ProductDetailsPage,
  ProductsPage,
  ProfilePage,
  SignUpPage,
} from "./routes/route";
import {
  SellerDashboardPage,
  SellerLoginPage,
  SellerSignUpPage,
} from "./routes/shopRoutes";
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/mainState";
import { Layout } from "./components/Layout/Layout";

function App() {
  const { loading } = useSelector((state) => state.mainState.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/products"
        element={
          <Layout>
            <ProductsPage />
          </Layout>
        }
      />
      <Route
        path="/product-details/:productId"
        element={
          <Layout>
            <ProductDetailsPage />
          </Layout>
        }
      />

      <Route
        path="/events"
        element={
          <Layout>
            <EventsPage />
          </Layout>
        }
      />
      <Route
        path="/faqs"
        element={
          <Layout>
            <FaqsPage />
          </Layout>
        }
      />
      {/* Proteced Routes */}
      <Route
        path="/profile/:name/:user_id"
        element={
          <ProtectedRoute>
            <Layout>
              <ProfilePage />
            </Layout>
          </ProtectedRoute>
        }
      />
      {/* seller routes */}
      <Route path="/seller/login" element={<SellerLoginPage />} />
      <Route path="/seller/sign-up" element={<SellerSignUpPage />} />

      {/* seller proteced route */}
      <Route
        path="/seller/:name/:seller_id"
        element={<SellerDashboardPage />}
      />

      {/* Page not found  */}
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
