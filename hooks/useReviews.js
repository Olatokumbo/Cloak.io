import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { fetchNextReviews, fetchReviews } from "../redux/actions/reviews";
const useReviews = (id) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(null);
  const [lastItem, setLastItem] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    setLoading(true);
    setNotFound(null);
    const getData = async () => {
      try {
        // if (id) {
        let data = await fetchReviews(id);
        setReviews(data.reviews);
        setLastItem(data.lastVisible);
        setHasMore(true);
        setLoading(false);
        if (data.reviews.length === 0) {
          setNotFound(true);
          setHasMore(false);
        }
        // }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);

  const loadMore = async () => {
    console.log("Load More");
    setLoading(true);
    let nextItems;
    if (lastItem) {
      if (id) {
        nextItems = await fetchNextReviews(id, lastItem);
        setLoading(false);
        console.log(nextItems);
        if (nextItems.reviews)
          setReviews((prevItem) => [...prevItem, ...nextItems.reviews]);
        if (nextItems.lastVisible) setLastItem(nextItems.lastVisible);
        else setHasMore(false);
      }
    } else {
      setHasMore(false);
      setLoading(false);
    }
  };
  return { reviews, loading, notFound, hasMore, loadMore };
};

export default useReviews;
