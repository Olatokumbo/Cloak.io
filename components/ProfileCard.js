import { truncate } from "../utils/truncate";
import Image from "next/image";
const ProfileCard = ({ data, searched }) => {
  return (
    <div className="flex flex-col border-2 border-solid border-white shadow-xl hover:shadow-2xl cursor-pointer rounded">
      <div className="h-40 relative -z-1">
        <Image
          src={searched ? data.works: data.works[0]}
          className="object-cover"
          layout="fill"
          loading="eager"
        />
      </div>
      <div className="flex flex-col p-2">
        <h1 className="text-md font-medium text-gray-800">{data.title}</h1>
        <h1 className="text-xs text-gray-600">
          {searched ? truncate(data.description): truncate(data.description[0])}
        </h1>
        <div className="flex my-1">
          <div className="flex w-full justify-between">
            <div className="flex items-center">
              <div className="w-7 h-7 mr-3 relative">
                <Image
                  src={searched ? data.photoURL : data.authorData.photoURL}
                  alt="me"
                  className="rounded-full"
                  layout="fill"
                  loading="eager"
                />
              </div>

              <div className="flex flex-col">
                <h4 className="text-sm">{searched ? data.displayName : data.authorData.displayName}</h4>
                {/* <h6 className="text-xs text-gray-600">Level 2</h6> */}
                {/* <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <h6 className="text-sm text-yellow-400">50k</h6>
                </div> */}
              </div>
            </div>
            <div className="flex self-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>

              <h5 className="text-xs self-end text-gray-500">
                {data.location || "Unspecified"}
              </h5>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex justify-between items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <div className="flex items-center">
            <h5 className="text-gray-800 mr-1">Starting at</h5>
            <h5 className="text-xl font-semibold text-gray-800">
              ₦{data.price}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
