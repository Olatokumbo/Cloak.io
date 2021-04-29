const ProfileComment = () => {
  return (
    <div>
      <hr />
      <div className="flex items-start my-7">
        <img
          src="/davidO.jpg"
          alt="me"
          className="w-10 max-h-10 rounded-full mr-3"
        />
        <div className="flex flex-col">
          <div className="mb-2">
            <div className="flex">
              <h4 className="text-base font-bold text-gray-800 mr-2">
                faithodesola
              </h4>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <h6 className="text-sm text-yellow-400 font-bold">5</h6>
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

              <h5 className="text-xs self-end text-gray-500">Ogun, Lagos</h5>
            </div>
          </div>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <h1 className="mt-5 text-sm font-medium text-gray-600 self-end">
            Published: Jan 27, 2021
          </h1>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default ProfileComment;
