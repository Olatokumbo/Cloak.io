import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const PrivateRoute = (WrappedComponent) => {
  return (props) => {
    if (typeof window !== "undefined") {
      const router = useRouter();
      const { isAuth, loading } = useSelector((state) => state.auth);
      useEffect(() => {
        if (!isAuth && loading === false) {
          router.replace("/");
          return null;
        }
        // return <WrappedComponent {...props} />;
      }, [isAuth, loading]);
      if (isAuth && loading === false) {
        return <WrappedComponent {...props} />;
      }
    }
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  };
};

export default PrivateRoute;
