import React from "react";
import { useContext } from "react";
import UserContext from "../context/UserContext";

const Profile = () => {
  const { user } = useContext(UserContext);
  if (!user) return <div className=" text-3xl text-center bg-gray-600">Please Login</div>
  return (
    <>
    <div className=" text-3xl text-center bg-amber-600"> Welcome! {user.username}</div>
    </>
  )
};

export default Profile;
