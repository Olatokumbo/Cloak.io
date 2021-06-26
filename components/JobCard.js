import { HeartIcon } from "@heroicons/react/outline";
import { truncate } from "../utils/truncate";
import { LocationMarkerIcon } from "@heroicons/react/solid";
// import { format } from "date-fns";
const JobCard = ({ data }) => {
  return (
    <div className="rounded-md my-2 p-6 shadow-lg bg-white cursor-pointer hover:shadow-xl min-h-48 flex flex-col h-56">
      <div className="flex justify-between items-center flex-col xs:flex-row">
        <div className="flex items-center mr-0 flex-col xs:flex-row md:mr-4 flex-1">
          <img
            src={data?.photoURL || data?.authorData.photoURL}
            alt="me"
            className="w-10 max-h-10 rounded-full mr-0 xs:mr-4"
          />
          <div className="flex flex-col">
            <h2 className="font-semibold text-lg text-center xs:text-left">
              {data?.title}
            </h2>
            <h6 className="text-xs text-gray-400 font-medium text-center xs:text-left">
              {data?.displayName || data?.authorData.displayName}
            </h6>
          </div>
        </div>
        <h1 className="text-2xl">{`₦${data.price}` || ""}</h1>
      </div>
      <div className="my-5 flex-1">
        <h5 className="text-gray-800 text-sm">
          {truncate(data?.description[0])}
        </h5>
      </div>
      <div className="flex justify-between items-center">
        <HeartIcon className="h-6 w-6" />
        <h5 className="text-sm font-semibold text-gray-400">
          <div className="flex self-end">
            <LocationMarkerIcon className="h-5 w-5 text-gray-500" />
            <h5 className="text-xs self-end text-gray-500">
              {data.location || "Unspecified"}
            </h5>
          </div>
        </h5>
      </div>
    </div>
  );
};

export default JobCard;
