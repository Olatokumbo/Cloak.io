import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { fetchReviews } from "../redux/actions/reviews";
const useReviews = (id) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(null);
  useEffect(() => {
    setLoading(true);
    setNotFound(null);
    const getData = async () => {
      try {
        let data = await fetchReviews(id);
        setReviews(data);
        setLoading(false);
        if (data.length === 0) {
          setNotFound(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);
  return { reviews, loading, notFound };
};

export default useReviews;
