// import { useState } from "react";
import { Rating } from "@material-ui/lab";
const ReviewCard = ({ review }) => {
  // const [value, setValue] = useState(2);
  return (
    <div className="mb-5 border-b-2 py-5 border-gray-100 border-solid">
      <div className="flex flex-col sm:flex-row">
        <Rating name="simple-controlled" readOnly value={review.rating} />
        <h1 className="font-bold text-lg text-gray-800 ml-0 sm:ml-2">
          Awesome Service for the Price
        </h1>
      </div>
      <div className="flex items-center">
        <h1 className="font-semibold text-sm text-gray-500">David0 |</h1>
        <h1 className="font-semibold text-sm text-gray-500 ml-2">
          June 20, 2021
        </h1>
      </div>
      <div className="my-1">
        <h5 className="text-sm">{review.message}</h5>
      </div>
    </div>
  );
};

export default ReviewCard;
