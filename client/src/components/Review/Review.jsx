import Ratings from "../Ratings/Ratings";

const Review = ({ reviews })  => {
  return (
    <>
      <div className="container container-fluid">
        <div className="reviews w-75">
          <h3>Ptoduct&apos;s Reviews:</h3>
          <hr />

          {reviews &&
            reviews?.map((review) => (
              <div key={review._id} className="review-card my-3">
               <Ratings value={review.rating} />
                <p className="review_user">by {review.name}</p>
                <p className="review_comment">{review.comment}</p>
                <hr />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Review;
