// import { useState } from "react";
import { Rating } from "@material-ui/lab";
const ReviewCard = () => {
  // const [value, setValue] = useState(2);
  return (
    <div className="mb-5 border-b-2 py-5 border-gray-100 border-solid">
      <div className="flex flex-col sm:flex-row">
        <Rating name="simple-controlled" readOnly value={3} />
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
        <h5 className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </h5>
      </div>
    </div>
  );
};

export default ReviewCard;
