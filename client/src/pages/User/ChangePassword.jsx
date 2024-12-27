import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../features/auth/authApiSlice";
import AlertMessage from "../../../utils/AlertMessage";
import { setMessageEmpty } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { user, message, error, loader } = useSelector(
    (state) => state.auth
  );

  const [input, setInput] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleInputChangle = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleResetPassForm = (e) => {
    e.preventDefault();
    dispatch(updatePassword(input));
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
  }, [dispatch, error, message, navigate, user]);

  return (
    <>
      <div className="container-container-fluid">
        <div className="row wrapper update-password-custom-wrapper">
          <div className="col-10 col-lg-5">
            <form onSubmit={handleResetPassForm} className="shadow-lg">
              <h1 className="mt-2 mb-5">Update Password</h1>
              <div className="form-group">
                <label htmlFor="old_password_field">Old Password</label>
                <input
                  type="password"
                  id="old_password_field"
                  className="form-control"
                  name="oldPassword"
                  value={input.oldPassword}
                  onChange={handleInputChangle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="new_password_field">New Password</label>
                <input
                  type="password"
                  id="new_password_field"
                  className="form-control"
                  name="newPassword"
                  value={input.newPassword}
                  onChange={handleInputChangle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="new_password_field">Confirm Password</label>
                <input
                  type="password"
                  id="new_password_field"
                  className="form-control"
                  name="confirmNewPassword"
                  value={input.confirmNewPassword}
                  onChange={handleInputChangle}
                />
              </div>
              <button
                type="submit"
                className="btn update-btn btn-block mt-4 mb-3"
                disabled={loader ? true : false}
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
