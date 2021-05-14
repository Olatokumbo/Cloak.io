import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const PublicRoute = (WrappedComponent) => {
  return (props) => {
    if (typeof window !== "undefined") {
      const router = useRouter();
      const isAuthenicated = useSelector((state) => state.auth.isAuth);
      useEffect(() => {
        console.log(isAuthenicated);
        if (!isAuthenicated) {
          return <WrappedComponent {...props} />;
        }
        router.replace("/explore");
      }, [isAuthenicated]);
    }
    return <WrappedComponent {...props} />;
  };
};

export default PublicRoute;
