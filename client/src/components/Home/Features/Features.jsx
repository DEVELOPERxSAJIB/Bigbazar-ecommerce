import "./Features.css";
import { PiGift } from "react-icons/pi";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineContactSupport } from "react-icons/md";

const Features = () => {
  return (
    <>
      <div className="container p-2">
        <div className="row mt-5">
          <div className="col-md-3 col-sm-6 py-3">
            <div className="card feature-card border-0 shadow-sm">
              <div className="card-body d-flex flex-column align-items-center">
                <div className="icon">
                  <PiGift className="main-icon" />
                </div>
                <div className="text-center mt-3">
                  <h3 className="feature-heading">100% SETISFACTION</h3>
                  <p className="feature-desc">
                    Passage Of Lorem Ipsum, You Need To Be Amet Embarrassing.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 py-3">
            <div className="card feature-card border-0 shadow-sm">
              <div className="card-body d-flex flex-column align-items-center">
                <div className="icon">
                  <FaHandHoldingDollar className="main-icon" />
                </div>
                <div className="text-center mt-3">
                  <h3 className="feature-heading">SAVE 20% WHEN YOU</h3>
                  <p className="feature-desc">
                    Passage Of Lorem Ipsum, You Need To Be Amet Embarrassing.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 py-3">
            <div className="card feature-card border-0 shadow-sm">
              <div className="card-body d-flex flex-column align-items-center">
                <div className="icon">
                  <LiaShippingFastSolid className="main-icon" />
                </div>
                <div className="text-center mt-3">
                  <h3 className="feature-heading">FAST FREE SHIPMENT</h3>
                  <p className="feature-desc">
                    Passage Of Lorem Ipsum, You Need To Be Amet Embarrassing.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 py-3">
            <div className="card feature-card border-0 shadow-sm">
              <div className="card-body d-flex flex-column align-items-center">
                <div className="icon">
                  <MdOutlineContactSupport className="main-icon" />
                </div>
                <div className="text-center mt-3">
                  <h3 className="feature-heading">24/7 Free Support</h3>
                  <p className="feature-desc">
                    Passage Of Lorem Ipsum, You Need To Be Amet Embarrassing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
