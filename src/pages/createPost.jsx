import image from "../assets/css-bg.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const schema = yup.object({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  imageUrl: yup.string().required("ImageUrl is Required"),
});

export default function CreatePost() {
  let navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.authState.token);
  console.log(accessToken);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    try {
      axios
        .post("http://localhost:8080/createPost", data, {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        })
        .then((response) => {
          console.log("Data Uploaded");
          navigate("/");
        });
    } catch (error) {
      console.log("Can't Submit: ", error);
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center w-screen h-screen ">
      <div className="w-[24%] h-[50%] bg-gradient-to-r  from-[#7928ca] to-[#ff0080] text-white  rounded-lg flex flex-col justify-center items-center">
        <form
          className="bg-neutral-800 h-[99%] text-white w-[99%] rounded-lg flex flex-col items-center justify-left"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="ml-5 mr-5 mt-9 w-[95%] text-lg">
            <label
              for="Name"
              class="block mb-2 text-sm font-medium text-white "
            >
              Name
            </label>
            <input
              type="text"
              {...register("title")}
              class="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
              placeholder="Title"
            />
            <p>{errors.title}</p>
          </div>
          <div className=" ml-5 mr-5 mt-4  w-[95%] text-wrap text-sm">
            <label
              for="Desc"
              class="block mb-2 text-sm font-medium text-white "
            >
              Description
            </label>
            <input
              type="text"
              {...register("description")}
              class="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
              placeholder="Description"
            />
            <p>{errors.desc}</p>
          </div>
          <div className="ml-5 mr-5 mt-4 w-[95%] text-lg">
            <label
              for="imageUrl"
              class="block mb-2 text-sm font-medium text-white "
            >
              Image URL
            </label>
            <input
              type="text"
              {...register("imageUrl")}
              class="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
              placeholder="imageUrl"
            />
            <p>{errors.imageUrl}</p>
          </div>

          <div>
            <button
              type="submit"
              class="ml-2 mb-4 mt-3 w-full  bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-900 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              <div>Create Post</div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
