import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home/Home";
import PostDetail from "../components/Post/PostDetail";
import { SignIn } from "../pages/auth/Signin";
import { SignUp } from "../pages/auth/Signup";
import { CreatePost } from "../pages/Createpost";
import NewPostDisplay from "../components/Post/NewPost";
import Profile from '../components/UserItems/Profile';
import Searches from "../pages/Searches";
import UserPosts from "../components/UserItems/UserPosts";
import UserBookmarks from "../components/UserItems/UserBookmarks";
import EditPost from "../components/Post/EditPost";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="posts/:id" element={<PostDetail />} />
        <Route path="newpost/:id" element={<NewPostDisplay />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/myPosts' element={<UserPosts />} />
        <Route path='/bookmarks' element={<UserBookmarks/>} />
        <Route path="/search/:text" element={<Searches />} />
        <Route path='/edit-post/:postId' element={<EditPost />} />
      </Route>
      <Route path="auth/SignIn" element={<SignIn />} />
      <Route path="auth/register" element={<SignUp />} />
    </>
  )
);

export default router;
