import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getSingleUserByAdmin,
  updateUserByAdmin,
} from "../../features/usersList/usersListApiSlice";
import MetaData from "../../../utils/MetaData";
import MainLoader from "../../../utils/MainLoader";
import AlertMessage from "../../../utils/AlertMessage";
import { setMessageEmpty } from "../../features/usersList/usersListSlice";
import Sidebar from "./Sidebar";

const UserDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { userDetails, error, loader, message } = useSelector(
    (state) => state.usersList
  );

  // Get data from
  const [input, setInput] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    dispatch(getSingleUserByAdmin(params.id));
  }, [dispatch, params.id]);

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit form
  const handleUpdateUser = (e) => {
    e.preventDefault();

    dispatch(
      updateUserByAdmin({
        id: params.id,
        name: input.name,
        email: input.email,
        role: input.role,
      })
    );
  };

  useEffect(() => {
    if (error) {
      AlertMessage({ type: "error", msg: error });
      dispatch(setMessageEmpty());
    }

    if (message) {
      AlertMessage({ type: "success", msg: message });
      dispatch(setMessageEmpty());
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    setInput({
      ...userDetails,
    });
  }, [userDetails]);

  return (
    <>
      <MetaData title={"Update user by admin"} />

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <h1 className="my-4">Update User</h1>
          <div className="container-container-fluid">
            {loader ? (
              <MainLoader />
            ) : (
              <>
                {userDetails ? (
                  <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                      <form onSubmit={handleUpdateUser} className="shadow-lg">
                        <h1 className="mt-2 mb-5">Update User</h1>
                        <div className="form-group">
                          <label htmlFor="name_field">Name</label>
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
                            defaultValue={userDetails?.email}
                            type="email"
                            id="email_field"
                            className="form-control"
                            name="email"
                            value={input.email}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="role_field">Role</label>
                          <select
                            id="role_field"
                            className="form-control"
                            name="role"
                            value={input.role}
                            onChange={handleInputChange}
                          >
                            <option value="">-Select a role-</option>
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                          </select>
                        </div>
                        <button
                          type="submit"
                          className="btn update-btn btn-block mt-4 mb-3"
                        >
                          Update
                        </button>
                      </form>
                    </div>
                  </div>
                ) : (
                  <h1>Not Found</h1>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
