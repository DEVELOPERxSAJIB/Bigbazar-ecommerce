import Rating from "@mui/material/Rating";

const Ratings = ({ value, size="large" }) => {
  return <Rating name="read-only" value={value} precision={0.1} readOnly size={size} />;
};

export default Ratings;
