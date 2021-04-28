import Image from "next/image";
const ProfileCard = () => {
  return (
    <div className="flex flex-col rounded-md border-2 border-solid border-white shadow-xl hover:shadow-2xl cursor-pointer">
      <div className="h-28 relative -z-1">
        <Image src="/wallpaper.jpg" className="object-cover" layout="fill" />
      </div>
      <div className="flex flex-col py-3 px-7">
        <h1 className="text-md font-medium text-gray-800">
          Full Stack Web Developer
        </h1>
        <div className="flex mt-1">
          <div className="flex w-full justify-between">
            <div className="flex items-center">
              <img
                src="/davidO.jpg"
                alt="me"
                className="w-10 max-h-10 rounded-full mr-3"
              />
              <div className="flex flex-col">
                <h4 className="text-sm">David Odesola</h4>
                <h6 className="text-sm">Level 2</h6>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <h6 className="text-sm text-yellow-400">50k</h6>
                </div>
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

              <h5 className="text-sm self-end text-gray-500">Lagos, Ogun</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
