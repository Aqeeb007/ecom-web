import { Avatar, Button } from "antd";
import { Checkbox } from "antd";
import { Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    console.log(values);
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
              Email
            </label>
            <div className="mt-1">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input {...field} autoComplete required />
                )}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input.Password {...field} autoComplete required />
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
            <Link className="font-semibold text-blue-600 underline hover:text-blue-500">
              Create Account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
