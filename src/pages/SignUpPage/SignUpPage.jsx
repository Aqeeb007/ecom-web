import { Avatar, Button, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import axios from "../../service/axios";
import handleApiError from "../../utils/ApiErrorHandler";
import { useState } from "react";

const SignUpPage = () => {
  const [avatar, setAvatar] = useState(null);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values) => {
    // eslint-disable-next-line no-unused-vars
    const { avatar: _, ...requiredFields } = values;
    const allFieldsNotEmpty = Object.values(requiredFields).every(
      (value) => !!value
    );

    if (!allFieldsNotEmpty) {
      toast.error("All fields are required");
      return;
    }

    if (values.password !== values.confirmPassword) {
      toast.error("Password not matched");
      return;
    }

    const form = new FormData();
    form.append("email", values.email);
    form.append("password", values.password);
    form.append("confirmPassword", values.confirmPassword);
    form.append("avatar", avatar);

    try {
      const { data } = await axios.post("/users/sign-up", form);
      toast.success(data.message);
      reset();
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="border-gray-200 shadow-lg bg-white border-2 space-y-4 flex items-center flex-col px-3 py-6 w-[400px] rounded-xl h-auto">
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
                  <Input
                    type="password"
                    {...field}
                    autoComplete={"true"}
                    required
                  />
                )}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password <span className="text-red-600">*</span>
            </label>
            <div className="mt-1">
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input.Password {...field} autoComplete={"true"} required />
                )}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Avatar
            </label>
            <div className="mt-1">
              <Controller
                name="avatar"
                control={control}
                // eslint-disable-next-line no-unused-vars
                render={({ field }) => (
                  <Input
                    type="file"
                    onChange={(e) => {
                      setAvatar(e.target.files[0]);
                    }}
                    required
                  />
                )}
              />
            </div>
          </div>
        </form>
        <Button
          onClick={handleSubmit(onSubmit)}
          className="text-white bg-blue-600 w-36"
          htmlType="submit"
        >
          Sign up
        </Button>
        <div>
          {"Already Have an Account? "}{" "}
          <span>
            <Link
              to={"/login"}
              className="font-semibold text-blue-600 underline hover:text-blue-500"
            >
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
