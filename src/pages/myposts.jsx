import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const MyPosts = () => {
  const navigate = useNavigate();
  const accessId = useSelector((state) => state.auth.authState.id);

  const handleClick = () => {
    navigate(`/users/${accessId}`);
  };

  return (
    <div className="mt-20">
      <button onClick={handleClick}>Click Here</button>
    </div>
  );
};

export default MyPosts;
