import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../../../utils/AlertMessage";
import { setMessageEmpty } from "../../features/auth/authSlice";
import MetaData from "../../../utils/MetaData";
import { processRegister } from "../../features/auth/authApiSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, message, error, loader } = useSelector(
    (state) => state.auth
  );

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ63g7rwZfd__LpTonMrIgDp04P-_FW5rAVng&s"
  );

  const handlePhoto = (e) => {
    setAvatarPreview(URL.createObjectURL(e.target.files[0]));
    setAvatar(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const form_data = new FormData();

    form_data.append("name", input.name);
    form_data.append("email", input.email);
    form_data.append("password", input.password);
    if (avatar) {
      form_data.append("avatar", avatar);
    }

    dispatch(processRegister(form_data));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (message) {
      AlertMessage({ type: "success", msg: message });
      dispatch(setMessageEmpty());
      navigate("/login");
    }

    if (error) {
      AlertMessage({ type: "error", msg: error });
      dispatch(setMessageEmpty());
      navigate("/register");
    }
  }, [dispatch, error, isAuthenticated, message, navigate]);

  return (
    <>
      <MetaData title={"Register user"} />
      <div className="container container-fluid">
        <div className="row wrapper register-main-container">
          <div className="col-10 col-lg-5">
            <form
              onSubmit={handleRegister}
              className="shadow-lg"
              encType="multipart/form-data"
            >
              <h1 className="mb-3">Register</h1>
              <div className="form-group">
                <label htmlFor="email_field">Name</label>
                <input
                  type="name"
                  id="name_field"
                  className="form-control"
                  name="name"
                  value={input.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  name="email"
                  value={input.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password_field">Password</label>
                <input
                  type="password"
                  id="password_field"
                  className="form-control"
                  name="password"
                  value={input.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="avatar_upload">Avatar</label>
                <div className="d-flex align-items-center">
                  <div>
                    <figure className="avatar mr-3 item-rtl">
                      <img
                        src={avatarPreview}
                        className="rounded-circle"
                        alt="image"
                      />
                    </figure>
                  </div>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="avatar"
                      className="custom-file-input"
                      id="customFile"
                      onChange={handlePhoto}
                      accept="image/*"
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Avatar
                    </label>
                  </div>
                </div>
              </div>
              <button
                id="register_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={loader ? true : false}
              >
                {loader ? " PROCESSING" : "REGISTER"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
