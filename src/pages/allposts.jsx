import axios from "axios";
import image from "../assets/css-bg.jpg";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserPosts } from "../redux/authSlice";
import { useEffect } from "react";

export default function AllPosts() {
  let { uid } = useParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const accessToken = useSelector((state) => state.auth.authState.token);

  useEffect(() => {
    console.log(uid);

    axios
      .get(`http://localhost:8080/users/${uid}`, {
        headers: {
          Authorization: `JWT ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch(getUserPosts(response.data));
        // console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [uid]);

  const userPosts = useSelector((state) => state.auth.userPosts);
  console.log(userPosts);

  return (
    <div className=" flex flex-col justify-center mt-5 items-center w-screen h-[100%] ">
      {userPosts.map((value, key) => (
        <div
          className="mt-5 w-[24%] h-[100%] bg-gradient-to-r  from-[#7928ca] to-[#ff0080] text-white  rounded-lg flex flex-col justify-center items-center"
          key={key}
          onClick={() => {
            navigate(`/post/${value._id}`);
          }}
        >
          <h1>All Posts from User</h1>
          <div className="bg-neutral-800 h-[99%] text-white w-[99%] rounded-lg flex flex-col items-center">
            <img
              className="w-[95%] h-[55%] mt-3 rounded-md"
              src={value.imageUrl}
              alt="Post image"
            />
            <div className="w-[100%] text-wrap flex flex-row items-center justify-between">
              <div className="ml-3 mt-3 w-[75%] text-lg">{value.title}</div>
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
              {value.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
