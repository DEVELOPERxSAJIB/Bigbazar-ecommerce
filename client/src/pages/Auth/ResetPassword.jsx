import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../features/auth/authApiSlice";
import MetaData from "../../../utils/MetaData";
import AlertMessage from "../../../utils/AlertMessage";
import { setMessageEmpty } from "../../features/auth/authSlice";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useParams();
  const { loader, message, error } = useSelector((state) => state.auth);

  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitResetedPass = (e) => {
    e.preventDefault();
    const data = {
      token,
      password: input.password,
      confirmPassword: input.confirmPassword,
    };

    dispatch(resetPassword(data));
  };

  useEffect(() => {
    if (message) {
      AlertMessage({ type: "success", msg: message });
      dispatch(setMessageEmpty());
      navigate("/login");
    }

    if (error) {
      AlertMessage({ type: "error", msg: error });
      dispatch(setMessageEmpty());
    }
  }, [dispatch, error, message, navigate]);

  return (
    <>
      <MetaData title={"Reset old password"} />
      <div className="container-container-fluid">
        <div className="row wrapper reset-password-container-main">
          <div className="col-10 col-lg-5">
            <form onSubmit={handleSubmitResetedPass} className="shadow-lg">
              <h1 className="mb-3">New Password</h1>
              <div className="form-group">
                <label htmlFor="password_field">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password_field"
                  className="form-control"
                  value={input.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirm_password_field">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirm_password_field"
                  className="form-control"
                  value={input.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
              <button
                id="new_password_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={loader ? true : false}
              >
                {loader ? "Reseting . . ." : "Set Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
