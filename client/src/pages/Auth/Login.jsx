import { Link, useNavigate, useParams } from "react-router-dom";
import MetaData from "../../../utils/MetaData";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  verifyRegisteredUser,
} from "../../features/auth/authApiSlice";
import MainLoader from "../../../utils/MainLoader";
import AlertMessage from "../../../utils/AlertMessage";
import { setMessageEmpty } from "../../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user, isAuthenticated, message, error, loader } = useSelector(
    (state) => state.auth
  );

  const { token } = useParams();

  useEffect(() => {
    if (token) {
      dispatch(verifyRegisteredUser(token));
      navigate("/login");
    }
  }, [dispatch, message, navigate, token]);

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(input));
  };

  useEffect(() => {

    if (message) {
      AlertMessage({ type: "success", msg: message });
      dispatch(setMessageEmpty());
    }

    if (error) {
      AlertMessage({ type: "error", msg: error });
      dispatch(setMessageEmpty());
    }
  }, [error, isAuthenticated, navigate, user, message, dispatch]);

  return (
    <>
      <MetaData title={"Login"} />
      {loader ? (
        <MainLoader />
      ) : (
        <div className="container container-fluid">
          <div className="row wrapper login-main-container">
            <div className="col-10 col-lg-5">
              <form onSubmit={handleLogin} className="shadow-lg">
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    id="email_field"
                    className="form-control"
                    value={input.email}
                    name="email"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    name="password"
                    className="form-control"
                    value={input.password}
                    onChange={handleInputChange}
                  />
                </div>
                <Link to={"/forgot-password"} className="float-right mb-4">
                  Forgot Password?
                </Link>
                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  LOGIN
                </button>
                <Link to={"/register"} className="float-right mt-2">
                  New User?
                </Link>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
