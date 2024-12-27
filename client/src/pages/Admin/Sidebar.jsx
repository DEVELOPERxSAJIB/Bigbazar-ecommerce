import { Link, useLocation } from "react-router-dom";
import { MdOutlineCategory } from "react-icons/md";
import { SiBrandfolder } from "react-icons/si";
import { FaRegCircleDot } from "react-icons/fa6";
import { PiFlagBannerDuotone } from "react-icons/pi";
import { matchPath } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <>
      <div className="sidebar-wrapper">
        <nav id="sidebar">
          <ul className="list-unstyled components">
            <li>
              <Link
                className={
                  location.pathname === "/dashboard" ? "menu-active" : null
                }
                to="/dashboard"
              >
                <i className="fa fa-tachometer"></i> Dashboard
              </Link>
            </li>

            <li>
              <Link
                className={
                  location.pathname === "/admin/hero-banner" ||
                  location.pathname === "/admin/create-hero-banner"
                    ? "menu-active"
                    : null
                }
                to="/admin/hero-banner"
              >
                <PiFlagBannerDuotone /> Banner
              </Link>
            </li>

            <li>
              <a
                href="#categorySubmenu"
                data-toggle="collapse"
                aria-expanded={
                  location.pathname === "/admin/category" ||
                  location.pathname === "/admin/create-category" ||
                  matchPath("/admin/update-category/:id", location.pathname)
                }
                className={`dropdown-toggle ${
                  location.pathname === "/admin/category" ||
                  location.pathname === "/admin/create-category" ||
                  matchPath("/admin/update-category/:id", location.pathname)
                    ? "menu-active"
                    : null
                }`}
              >
                <MdOutlineCategory /> Category
              </a>
              <ul
                className={`list-unstyled collapse ${
                  location.pathname === "/admin/category" ||
                  location.pathname === "/admin/create-category"
                    ? "show"
                    : ""
                }`}
                id="categorySubmenu"
              >
                <li>
                  <Link
                    className={
                      location.pathname === "/admin/category"
                        ? "sub-menu-active"
                        : ""
                    }
                    to="/admin/category"
                  >
                    <FaRegCircleDot /> All category
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      location.pathname === "/admin/create-category"
                        ? "sub-menu-active"
                        : ""
                    }
                    to="/admin/create-category"
                  >
                    <FaRegCircleDot /> Create category
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <a
                href="#brandSubmenu"
                data-toggle="collapse"
                aria-expanded={
                  location.pathname === "/admin/brand" ||
                  location.pathname === "/admin/create-brand" ||
                  matchPath("/admin/update-brand/:id", location.pathname)
                }
                className={`dropdown-toggle ${
                  location.pathname === "/admin/brand" ||
                  location.pathname === "/admin/create-brand" ||
                  matchPath("/admin/update-brand/:id", location.pathname)
                    ? "menu-active"
                    : null
                }`}
              >
                <SiBrandfolder /> Brand
              </a>

              <ul
                className={`list-unstyled collapse ${
                  location.pathname === "/admin/brand" ||
                  location.pathname === "/admin/create-brand"
                    ? "show"
                    : ""
                }`}
                id="brandSubmenu"
              >
                <li>
                  <Link
                    className={
                      location.pathname === "/admin/brand"
                        ? "sub-menu-active"
                        : ""
                    }
                    to="/admin/brand"
                  >
                    <FaRegCircleDot /> All Brand
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      location.pathname === "/admin/create-brand"
                        ? "sub-menu-active"
                        : ""
                    }
                    to="/admin/create-brand"
                  >
                    <FaRegCircleDot /> Create Brand
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <a
                href="#productSubmenu"
                data-toggle="collapse"
                aria-expanded={
                  location.pathname === "/admin/products" ||
                  location.pathname === "/admin/create-product"
                }
                className={`dropdown-toggle ${
                  location.pathname === "/admin/products" ||
                  location.pathname === "/admin/create-product"
                    ? "menu-active"
                    : null
                }`}
              >
                <i className="fa fa-product-hunt"></i> Products
              </a>
              <ul
                className={`list-unstyled collapse ${
                  location.pathname === "/admin/products" ||
                  location.pathname === "/admin/create-product"
                    ? "show"
                    : ""
                }`}
                id="productSubmenu"
              >
                <li>
                  <Link
                    className={
                      location.pathname === "/admin/products"
                        ? "sub-menu-active"
                        : ""
                    }
                    to="/admin/products"
                  >
                    <FaRegCircleDot /> All products
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      location.pathname === "/admin/create-product"
                        ? "sub-menu-active"
                        : ""
                    }
                    to="/admin/create-product"
                  >
                    <FaRegCircleDot /> Create new
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link
                className={
                  location.pathname === "/admin/orders" ? "menu-active" : null
                }
                to="/admin/orders"
              >
                <i className="fa fa-shopping-basket"></i> Orders
              </Link>
            </li>

            <li>
              <Link
                className={
                  location.pathname === "/admin/users" ? "menu-active" : null
                }
                to="/admin/users"
              >
                <i className="fa fa-users"></i> Users
              </Link>
            </li>

            <li>
              <Link
                className={
                  location.pathname === "/admin/reviews" ? "menu-active" : null
                }
                to="/admin/reviews"
              >
                <i className="fa fa-star"></i> Reviews
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
