import { Link } from "react-router-dom";
import logo from "../../assets/images/logo2.png";
import Search from "../../../utils/Search";
import { useSelector } from "react-redux";

const Header = () => {
  const { user, loader } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <>
      <nav style={{backgroundColor : "#10AC84"}} className="navbar navbar-expand-md navbar-light">
        <div className="container d-flex align-items-center flex-coloumn py-3">
          {/* Brand Logo */}
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Brand Logo" style={{maxHeight : "40px"}} />
          </Link>

          {/* Toggler for Mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Content */}
          <div className="collapse navbar-collapse" id="navbarContent">
            <div className="d-flex flex-column flex-md-row justify-content-between w-100">

              {/* Search Section */}
              <div className="flex-grow-1 mt-md-0">
                <Search />
              </div>

              {/* Cart and User Section */}
              <div className="d-flex ml-md-3 align-items-center justify-content-end mt-3 mt-md-0">
                {/* Cart */}
                <Link to="/cart" className="text-decoration-none mr-3">
                  <span id="cart">Cart</span>
                  <span id="cart_count" className="ml-2">
                    {cartItems?.length > 0 ? cartItems?.length : 0}
                  </span>
                </Link>

                {/* User */}
                {user ? (
                  <div className="dropdown">
                    <Link
                      to="#!"
                      className="btn dropdown-toggle text-white"
                      type="button"
                      id="userMenu"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"

                    >
                      <figure className="avatar avatar-nav">
                        <img
                          src={
                            user.avatar?.url
                              ? user.avatar.url
                              : "https://cdn-icons-png.flaticon.com/512/3870/3870822.png"
                          }
                          alt={user.name}
                          className="rounded-circle bg-success"
                          style={{ width: "30px", height: "30px" }}
                        />
                      </figure>
                      <span>{user.name}</span>
                    </Link>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="userMenu"
                    >
                      {user.role === "admin" && (
                        <Link className="dropdown-item" to="/dashboard">
                          Dashboard
                        </Link>
                      )}
                      <Link className="dropdown-item" to="/my-orders">
                        Orders
                      </Link>
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>
                      <Link
                        to="/logout"
                        className="dropdown-item text-danger"
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                ) : (
                  !loader && (
                    <Link to="/login" className="btn ml-4 text-light font-bold" id="login_btn">
                      Login
                    </Link>
                  )
                )}
              </div>

            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
