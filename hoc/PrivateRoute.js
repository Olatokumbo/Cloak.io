import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const PrivateRoute = (WrappedComponent) => {
  return (props) => {
    if (typeof window !== "undefined") {
      const router = useRouter();
      const isAuthenicated = useSelector((state) => state.auth.isAuth);
      useEffect(() => {
        console.log(isAuthenicated)
        if (!isAuthenicated) {
          router.replace("/");
          return null;
        }
        // return <WrappedComponent {...props} />;
      }, [isAuthenicated]);
    }
    return <WrappedComponent {...props} />;
  };
};

export default PrivateRoute;
