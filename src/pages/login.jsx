import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { authorize } from "../redux/authSlice";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required("Password is required"),
  rememberMe: yup.boolean().test("singleCheckbox", "Required", (val) => {
    return val;
  }),
});

const Login = () => {
  // const loginStatus = useSelector((state) => state.auth.authState);
  const reduxState = useSelector((state) => state.auth.authState.token);
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    axios.post("http://localhost:8080/login", data).then((response) => {
      if (response.data.error) {
        console.log(response.data.error);
      } else {
        console.log(reduxState);
        // localStorage.setItem("accessToken", response.data.accessToken);
        const logObj = {
          id: response.data.user.id,
          name: response.data.user.name,
          token: response.data.accessToken,
        };
        dispatch(authorize(logObj));
        // console.log(logObj);
        // console.log(reduxState);
        navigate("/");
      }
    });
  };

  return (
    <>
      <div className="w-full h-screen flex flex-row justify-center items-center dark:bg-gray-100 ">
        <div class=" w-full max-w-sm p-4 bg-white rounded-lg shadow sm:p-6 md:p-8 dark:bg-white-100 dark:border-gray-700">
          <form class="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-400 dark:placeholder-gray-400 dark:text-black"
                placeholder="name@domain.com"
                required
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-400 dark:placeholder-gray-400 dark:text-black"
                required
              />
            </div>
            <div class="flex items-center mb-4">
              <input
                {...register("rememberMe")}
                id="default-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-checkbox"
                class="ms-2 text-sm font-medium text-black-500"
              >
                Remember me
              </label>
            </div>

            <div class="flex flex-row items-center justify-around text-sm font-medium text-gray-500 dark:text-gray-300">
              <Link
                to="/register"
                class="text-blue-700 hover:underline dark:text-gray-700 mr-3"
              >
                Sign Up Here!
              </Link>
              <button
                type="submit"
                class="w-36 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-large rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
