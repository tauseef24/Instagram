import axios from "axios";
import image from "../assets/css-bg.jpg";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setSpecificPost } from "../redux/authSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
});

function Post() {
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.authState.token);
  const [modal, setModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    console.log(id);
    try {
      axios
        .get(`http://localhost:8080/posts/${id}`, {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        })
        .then((response) => {
          dispatch(setSpecificPost(response.data));
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("Post Not Found: ", error);
    }
  }, [id]);

  const postObj = useSelector((state) => state.auth.specificPost);
  const userId = useSelector((state) => state.auth.authState.id);

  const deletePost = () => {
    try {
      axios
        .delete(`http://localhost:8080/posts/${id}`, {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        })
        .then((response) => {
          console.log("Post Deleted Successfully");
          navigate("/");
        })
        .catch((err) => {
          console.log("Couldn't Delete Post: ", err);
        });
    } catch (error) {
      console.log("Post Not Found: ", error);
    }
  };

  const onSubmit = (data) => {
    try {
      axios
        .put(`http://localhost:8080/posts/${id}`, data, {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        })
        .then((response) => {
          console.log("Data Updated");
          setModal(false)
          navigate(`/post/${id}`);
        });
    } catch (error) {
      console.log("Can't Update: ", error);
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center w-screen h-screen ">
      <div className="mt -5 w-[24%] h-[45%] bg-gradient-to-r  from-[#7928ca] to-[#ff0080] text-white  rounded-lg flex flex-col justify-center items-center">
        <div className="bg-neutral-800 h-[99%] text-white w-[99%] rounded-lg flex flex-col items-center">
          <img
            className="w-[95%] h-[55%] mt-3 rounded-md"
            src={postObj.imageUrl}
            alt="Post image"
          />
          <div className="w-[100%] text-wrap flex flex-row items-center justify-between">
            <div className="ml-3 mt-3 w-[75%] text-lg">{postObj.title}</div>
            <div className=" flex mt-2 mr-3 w-[25%] h-[100%] items-center justify-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#ff0080"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#ff0080"
                class="w-6 h-6 flex justify-center items-center"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 ml-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                />
              </svg>
              <svg
                class="h-8 w-8 text-slate-100"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="w-6 h-6 ml-1"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <line x1="10" y1="14" x2="21" y2="3" />{" "}
                <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" />
              </svg>
            </div>
          </div>
          <div className="ml-3 mt-3 mr-3 text-wrap text-sm">
            {postObj.description}
          </div>
          {modal && (
            <div className="popImage">
              <form
                className="bg-neutral-800 h-[99%] text-white w-[99%] rounded-lg flex flex-col items-center justify-left"
                onSubmit={handleSubmit(onSubmit)}
              >
                <img
                  className="w-[95%] h-[55%] mt-3 rounded-md object-fit"
                  src={postObj.imageUrl}
                  alt="Post image"
                />

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
                <div className=" ml-5 mr-5 mt-4  w-[95%] text-wrap text-sm h-[40%]">
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

                <div className="flex">
                  <button
                    type="submit"
                    class="ml-2 mb-4 mt-3 w-full  bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-900 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    <div>Edit Post</div>
                  </button>
                  <button
                    onClick={() => setModal(false)}
                    class="ml-2 mb-4 mt-3 w-full  bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-900 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    <div>Close</div>
                  </button>
                </div>
              </form>
            </div>
          )}
          {postObj.uid == userId ? (
            <div className="flex">
              <button
                type="submit"
                onClick={() => setModal(true)}
                class="ml-2 mb-4 mt-3 w-full  bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-900 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <div>Edit</div>
              </button>
              <button
                type="submit"
                onClick={deletePost}
                class="ml-2 mb-4 mt-3 w-full  bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-900 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <div>Delete</div>
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
