import { Rating } from "@material-ui/lab";
import { format } from "date-fns";
const ReviewCard = ({ review }) => {
  return (
    <div className="mb-5 border-b-2 py-5 border-gray-100 border-solid">
      <div className="flex flex-col sm:flex-row">
        <Rating
          name="simple-controlled"
          readOnly
          value={review.rating}
          // precision={0.5}
        />
        <h1 className="font-bold text-lg text-gray-800 ml-0 sm:ml-2">
          {review.title}
        </h1>
      </div>
      <div className="flex items-center">
        {/* <h1 className="font-semibold text-sm text-gray-500">David0 |</h1> */}
        <h1 className="font-semibold text-sm text-gray-500">
          {format(new Date(review.date.seconds * 1000), "MMMM dd, yyyy")}
        </h1>
      </div>
      <div className="my-1">
        {review.message.map((message, index) => (
          <h5 className="text-sm mb-1" key={index}>
            {message}
          </h5>
        ))}
      </div>
    </div>
  );
};

export default ReviewCard;
