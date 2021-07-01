import { useEffect, useState } from "react";
import { getProfileDetails, resetProfile } from "../redux/actions/profile";
import {
  fetchPostersByUserId2,
  fetchPostersByUserId3,
  resetPosters,
} from "../redux/actions/posters";
import { useSelector, useDispatch } from "react-redux";
// import _ from "lodash";
const useProfile = (id, uid, loading) => {
  const dispatch = useDispatch();
  const posters = useSelector((state) => state.poster.myPosters);
  const user = useSelector((state) => state.profile.user);
  //   const [notFound, setNotFound] = useState(null);
  useEffect(() => {
    const getData = async () => {
      if (id && !loading) {
        try {
          await dispatch(getProfileDetails(id));
          //   if (!_.isEmpty(user)) {
          // setNotFound(false);
          if (uid === id) await dispatch(fetchPostersByUserId2(id));
          else await dispatch(fetchPostersByUserId3(id));
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
  }, [id, loading]);
  return { user, posters };
};

export default useProfile;
