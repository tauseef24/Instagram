import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required("Password is required"),
  confirmPass: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required(),
});

const Register = () => {
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:8080/register", data)
      .then(() => {
        console.log(data);
        navigate("/login");
      })
      .catch((err) => {
        console.log("Not Registered: ", err);
      });
  };

  return (
    <>
      <div className="w-full h-screen flex flex-row justify-center items-center dark:bg-gray-100 ">
        <div class=" w-full max-w-sm p-4 bg-white rounded-lg shadow sm:p-6 md:p-8 dark:bg-white-100 dark:border-gray-700">
          <form class="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Name
              </label>
              <input
                type="text"
                {...register("name")}
                name="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-400 dark:placeholder-gray-400 dark:text-black"
                placeholder="Donald Reymond"
                required
              />
            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                {...register("email")}
                placeholder="name@domain.com"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-400 dark:placeholder-gray-400 dark:text-black"
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
                type="password"
                name="password"
                {...register("password")}
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-400 dark:placeholder-gray-400 dark:text-black"
                required
              />
            </div>
            <div>
              <label
                for="confirmPass"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Confirm Password
              </label>
              <input
                type="password"
                {...register("confirmPass")}
                name="confirmPass"
                id="confirmPass"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-400 dark:placeholder-gray-400 dark:text-black"
                required
              />
            </div>

            <div class="flex flex-row items-center justify-end text-sm font-medium text-gray-500 dark:text-gray-300">
              <Link
                to="/Login"
                class="text-blue-700 hover:underline dark:text-gray-700 mr-3 "
              >
                Already registered?
              </Link>
              <button
                type="submit"
                class="w-36 text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-large rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
