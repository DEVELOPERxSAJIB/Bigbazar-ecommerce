import { useSelector } from "react-redux";
import MainLoader from "../../../utils/MainLoader";
import { Link } from "react-router-dom";
import MetaData from "../../../utils/MetaData";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <MetaData title={`Profile @${user.name}`} />
      {user ? (
        <div className="container container-fluid my-5">
          <h2 className="mt-5 ml-5">My Profile</h2>
          <div className="row align-items-center justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
              <figure className="avatar avatar-profile">
                <img
                  className="rounded-circle img-fluid"
                  src={user?.avatar?.url
                    ? user?.avatar?.url
                    : 
                    "https://cdn-icons-png.flaticon.com/512/3870/3870822.png"
                  }
                  alt={"profile image"}
                />
              </figure>
              <Link
                to="/update-profile"
                id="edit_profile"
                className="btn btn-primary btn-block my-5"
              >
                Edit Profile
              </Link>
            </div>
            <div className="col-12 col-md-5">
              <h4>Full Name</h4>
              <p>{user.name}</p>
              <h4>Email Address</h4>
              <p>{user.email}</p>
              <h4>Joind On</h4>
              <p>{String(user.createdAt).substring(0, 10)}</p>
              <Link to="/my-orders" className="btn btn-danger btn-block mt-5">
                My Orders
              </Link>
              <Link
                to="/change-password"
                className="btn btn-primary btn-block mt-3"
              >
                Change Password
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <MainLoader />
      )}
    </>
  );
};

export default Profile;
