import { Link, useNavigate } from "react-router-dom";
import "./NotFound.css"
import MetaData from "../../../utils/MetaData";

const NotFound = () => {

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
    <MetaData title={"404 - page not found"} />
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
          <h2>404 - The Page cant be found</h2>
        </div>
        <Link onClick={goBack} >GO TO PREVIOUS PAGE</Link>
      </div>
    </div>
    </>
  );
};

export default NotFound;
