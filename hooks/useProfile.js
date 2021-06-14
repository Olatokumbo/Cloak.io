import { useEffect, useState } from "react";
import { getProfileDetails, resetProfile } from "../redux/actions/profile";
import { fetchPostersByUserId2, resetPosters } from "../redux/actions/posters";
import { useSelector, useDispatch } from "react-redux";
// import _ from "lodash";
const useProfile = (id) => {
  const dispatch = useDispatch();
  const posters = useSelector((state) => state.poster.myPosters);
  const user = useSelector((state) => state.profile.user);
//   const [notFound, setNotFound] = useState(null);
  useEffect(() => {
    const getData = async () => {
      if (id) {
        try {
          await dispatch(getProfileDetails(id));
        //   if (!_.isEmpty(user)) {
            setNotFound(false);
            await dispatch(fetchPostersByUserId2(id));
        //   } else setNotFound(true);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getData();
    return () => {
    //   setNotFound(null);
      dispatch(resetProfile());
      dispatch(resetPosters());
    };
  }, [id]);
  return { user, posters};
};

export default useProfile;
