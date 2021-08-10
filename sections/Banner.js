import { useSelector } from "react-redux";
import { sendVerificationEmailLink } from "../redux/actions/auth";
const Banner = () => {
  const { isAuth, emailVerified } = useSelector((state) => state.auth);
  return (
    isAuth &&
    emailVerified === false && (
      <div className="w-full p-3 flex justify-center bg-indigo-700">
        <div className="flex items-center flex-wrap justify-center">
        <h1 className="text-white text-sm mr-3 text-center">Please verify your Email account</h1>
        <h1 onClick={sendVerificationEmailLink} className="text-yellow-300 text-sm hover:underline cursor-pointer">Resend Link</h1>
        </div>
      </div>
    )
  );
};

export default Banner;
