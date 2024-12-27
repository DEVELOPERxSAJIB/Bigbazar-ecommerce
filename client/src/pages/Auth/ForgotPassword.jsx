import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordRequest } from "../../features/auth/authApiSlice";
import AlertMessage from "../../../utils/AlertMessage";
import { setMessageEmpty } from "../../features/auth/authSlice";
import MetaData from "../../../utils/MetaData";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  
  const handleSubmitEmail = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordRequest(email));
  };
  
  const { loader, message, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if(message) {
      AlertMessage({ type : "success", msg : message });
      dispatch(setMessageEmpty())
      setEmail("")
    }

    if(error) {
      AlertMessage({ type : "error", msg : error });
      dispatch(setMessageEmpty())
    }
  }, [dispatch, error, message])

  return (
    <>
        <MetaData title={"Recover your password"} />
        <div className="container-container-fluid">
          <div className="row wrapper forgot-password-main-wrapper">
            <div className="col-10 col-lg-5">
              <form onSubmit={handleSubmitEmail} className="shadow-lg">
                <h1 className="mb-3">Forgot Password</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Enter Email</label>
                  <input
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button
                  id="forgot_password_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled = {loader ? true : false }
                >
                  {loader ? "Sending . . ." : "Send Email"}
                </button>
              </form>
            </div>
          </div>
        </div>
      
    </>
  );
};

export default ForgotPassword;
