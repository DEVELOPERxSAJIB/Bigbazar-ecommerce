import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import MetaData from "../../../utils/MetaData";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(logOutUser());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      console.log("kasjdhfkasdfh");
    }
  }, [isAuthenticated, navigate]);

  return <MetaData title={"Login Out"} />;
};

export default Logout;
