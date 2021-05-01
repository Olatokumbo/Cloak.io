const SignupBanner = () => {
  return (
    <div className="w-full relative overflow-hidden">
      <div className="opacity-30 absolute left-0 right-0 top-0 bottom-0 rounded"></div>
      <div className="absolute p-10 flex h-full w-full">
        <div className="flex-1 flex flex-col justify-center items-start">
          <h1 className="text-white text-5xl font-semibold">
            Lorem ipsum dolor sit amet
          </h1>
          <button className="my-5 mr-5 bg-black focus:outline-none text-white px-3 py-2 md:px-4 rounded-md hover:bg-gray-900">
            Sign Up Now
          </button>
        </div>
        <div className="flex-none md:flex-1"></div>
      </div>
      <img
        src="/bg-signup.png"
        className="object-cover rounded relative w-full -z-1  h-96"
        height="422"
        width="1440"
      />
    </div>
  );
};

export default SignupBanner;
