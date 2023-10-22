import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
const UpdateProfile = () => {
  const [params] = useSearchParams();
  const url = params.get("url");
  const navigate = useNavigate();
  useEffect(() => {
    const redirectBack = () => {
      return navigate(url);
    };
    redirectBack();
  }, [navigate, url]);
  return (
    <div className="bg-dark w-full h-screen text-white">
      <Spinner />
    </div>
  );
};

export default UpdateProfile;
