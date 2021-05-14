import Image from "next/image";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
const MyPosterCard = () => {
  return (
    <div className="flex flex-col border-solid border-gray-200 border-2">
      <div className="flex h-40 relative -z-1">
        <Image
          //   src={searched ? data.works : data.works[0]}
          src="/wallpaper.jpg"
          className="object-cover"
          layout="fill"
          loading="eager"
        />
      </div>
      <div className="p-2">
        <h1>Minimalist Web Designs</h1>
        <div className="w-full flex justify-between items-center mt-10">
          <DotsHorizontalIcon className="h-6 w-6 text-gray-700 cursor-pointer" />
          <div className="flex items-center">
            <h5 className="text-gray-800 mr-1 text-xs">Starting at</h5>
            <h5 className="text-sm font-semibold text-gray-800">₦30,000</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPosterCard;
