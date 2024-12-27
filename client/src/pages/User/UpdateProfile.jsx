import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../../utils/MetaData";
import { useEffect, useState } from "react";
import { updateProfile } from "../../features/auth/authApiSlice";
import AlertMessage from "../../../utils/AlertMessage";
import { setMessageEmpty } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loader, user, error, message } = useSelector((state) => state.auth);

  const [avatar, setAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);

  // data update
  const [input, setInput] = useState({
    name: "",
    email: "",
  });

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // avatar updates
  const handleAvatar = (e) => {
    setAvatar(e.target.files[0]);
    setPreviewAvatar(URL.createObjectURL(e.target.files[0]));
  };

  // update user
  const handleSumbitForm = (e) => {
    e.preventDefault();

    const form_data = new FormData();
    form_data.append("name", input.name);
    form_data.append("email", input.email);
    if (avatar) {
      form_data.append("avatar", avatar);
    }

    dispatch(updateProfile({ id: user._id, data: form_data }));
  };

  useEffect(() => {
    if (message) {
      AlertMessage({ type: "success", msg: message });
      dispatch(setMessageEmpty());
      navigate("/profile");
    }

    if (error) {
      AlertMessage({ type: "error", msg: error });
      dispatch(setMessageEmpty());
    }
  }, [dispatch, error, message, navigate]);

  useEffect(() => {
    setInput({
      ...user,
    });
  }, [user]);

  return (
    <>
      <MetaData title={"Profile update "} />
      <div className="container-container-fluid">
        <div className="row wrapper update-profile-custom-wrapper">
          <div className="col-10 col-lg-5">
            <form
              onSubmit={handleSumbitForm}
              className="shadow-lg"
              encType="multipart/form-data"
            >
              <h1 className="mt-2 mb-5">Update Profile</h1>
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
                <label htmlFor="avatar_upload">Avatar</label>
                <div className="d-flex align-items-center">
                  <div>
                    <figure className="avatar mr-3 item-rtl">
                      <img
                        src={
                          previewAvatar
                            ? previewAvatar
                            : user.avatar.url ||
                              "https://cdn-icons-png.flaticon.com/512/3870/3870822.png"
                        }
                        className="rounded-circle"
                        alt="Avatar Preview"
                      />
                    </figure>
                  </div>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="avatar"
                      className="custom-file-input"
                      id="customFile"
                      onChange={handleAvatar}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Avatar
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn update-btn btn-block mt-4 mb-3"
                disabled={loader ? true : false}
              >
                {loader ? "Update . . ." : "Update"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
