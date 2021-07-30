import { useSelector } from "react-redux";
const Banner = () => {
  const { isAuth, emailVerified } = useSelector((state) => state.auth);
  return (
    isAuth &&
    emailVerified === false && (
      <div className="w-full p-3 flex justify-center bg-indigo-700">
        <h1 className="text-white text-sm">Please verify your Email account</h1>
      </div>
    )
  );
};

export default Banner;
