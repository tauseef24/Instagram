import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authState: {
    id: "",
    name: "",
    token: "",
  },
  posts: [],
  userPosts: [],
  specificPost: {
    title: "",
    description: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authorize: (state, action) => {
      state.authState = action.payload;
      console.log(state.authState.token);
    },
    getPosts: (state, action) => {
      state.posts = action.payload;
      console.log(state.posts);
    },
    getUserPosts: (state, action) => {
      state.userPosts = action.payload;
      console.log(state.userPosts);
    },
    setSpecificPost: (state, action) => {
      state.specificPost = action.payload;
      console.log(state.specificPost);
    },
  },
});

export const { authorize, getPosts, getUserPosts, setSpecificPost } =
  authSlice.actions;
export default authSlice.reducer;
