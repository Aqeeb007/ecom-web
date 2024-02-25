import Cookies from "js-cookie";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./routes/ProtecedRoute";
import { HomePage, LoginPage, PageNotFound, SignUpPage } from "./routes/route";
import { SellerLoginPage, SellerSignUpPage } from "./routes/shopRoutes";
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/mainState";

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

      {/* Proteced Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />

      {/* seller routes */}
      <Route path="/seller/login" element={<SellerLoginPage />} />
      <Route path="/seller/sign-up" element={<SellerSignUpPage />} />

      {/* Page not found  */}
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
