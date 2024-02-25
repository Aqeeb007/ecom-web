import { Avatar, Button } from "antd";
import { Checkbox } from "antd";
import { Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import axios from "../../service/axios";
import handleApiError from "../../utils/ApiErrorHandler";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../redux/mainState";
import { useEffect } from "react";
import Cookies from "js-cookie";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "user@gmail.com",
      password: "User@1234",
    },
  });

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const onSubmit = async (values) => {
    // eslint-disable-next-line no-unused-vars
    const allFieldsNotEmpty = Object.values(values).every((value) => !!value);

    if (!allFieldsNotEmpty) {
      toast.error("All fields are required");
      return;
    }

    dispatch(loginStart());
    try {
      const { data } = await axios.post("/users/login", values);
      toast.success(data.message);
      localStorage.setItem("token", data.data.token, {
        expires: Date.now() + 10000,
      });
      dispatch(loginSuccess(data));
      navigate("/");
      reset();
    } catch (error) {
      handleApiError(error);
      dispatch(loginFailure());
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="border-gray-200 shadow-lg bg-white border-2 space-y-4 flex items-center flex-col px-3 py-6 w-[400px] rounded-xl h-[400px]">
        <Avatar
          src="https://github.com/shadcn.png"
          className="w-24 h-24 rounded-full"
          alt=""
        />
        <form
          action=""
          className="w-full space-y-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-600">*</span>
            </label>
            <div className="mt-1">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input {...field} autoComplete={"true"} required />
                )}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password <span className="text-red-600">*</span>
            </label>
            <div className="mt-1">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input.Password {...field} autoComplete={"true"} required />
                )}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <Checkbox /> <span>Remember me</span>
            </div>
            <Link className="text-blue-500">Forgot Password ?</Link>
          </div>
        </form>
        <Button
          onClick={handleSubmit(onSubmit)}
          className="text-white bg-blue-600 w-36"
          htmlType="submit"
        >
          Login
        </Button>
        <div>
          {"Don't Have an Account? "}{" "}
          <span>
            <Link
              to={"/sign-up"}
              className="font-semibold text-blue-600 underline hover:text-blue-500"
            >
              Create Account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
