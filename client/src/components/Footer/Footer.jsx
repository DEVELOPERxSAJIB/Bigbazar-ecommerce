import "./Footer.css";
import logo from "../../assets/images/logo2.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footer-distributed">
        <div className="container">
          <div className="footer-left">
            <Link to={"/"}>
              <h3>
                <img
                  src={logo}
                  alt="footer-logo"
                  style={{ maxHeight: "40px" }}
                />
              </h3>
            </Link>
            <p className="footer-links ml-3">
              <a href="#" className="link-1">
                Home
              </a>
              <a href="#">Blog</a>
              <a href="#">Pricing</a>
              <a href="#">About</a>
              <a href="#">Faq</a>
              <a href="#">Contact</a>
            </p>
            <p className="footer-company-name text-white ml-3">
              All rights are reserved © 2025
            </p>
          </div>
          <div className="footer-center">
            <div>
              <i className="fa fa-map-marker" />
              <p>
                <span>19 South Totpara 2 no cross road, Khulna</span>
              </p>
            </div>
            <div>
              <i className="fa fa-phone" />
              <p>+88 01789 557538</p>
            </div>
            <div>
              <i className="fa fa-envelope" />
              <p>
                <a href="mailto:support@company.com">support@company.com</a>
              </p>
            </div>
          </div>
          <div className="footer-right">
            <p className="footer-company-about">
              <span>About the company</span>
              Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce
              euismod convallis velit, eu auctor lacus vehicula sit amet.
            </p>
            <div className="footer-icons">
              <a href="#">
                <i className="fa fa-facebook" />
              </a>
              <a href="#">
                <i className="fa fa-twitter" />
              </a>
              <a href="#">
                <i className="fa fa-linkedin" />
              </a>
              <a href="#">
                <i className="fa fa-github" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
