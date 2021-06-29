import { useState, useEffect } from "react";

const usePagination = (query, nextQuery) => {
  const [loading, setLoading] = useState(false);
  const [lastItem, setLastItem] = useState(null);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await query();
      setItems(data.posters);
      setLastItem(data.lastVisible);
      setHasMore(true);
      setLoading(false);
    };
    getData();
  }, []);

  const loadMore = async () => {
    console.log("Load More");
    setLoading(true);
    if (lastItem) {
      const nextItems = await nextQuery(lastItem);
      setLoading(false);
      setItems((prevItem) => [...prevItem, ...nextItems.posters]);
      if (nextItems.lastVisible) setLastItem(nextItems.lastVisible);
      else setHasMore(false);
    } else {
      setHasMore(false);
      setLoading(false);
    }
  };
  return { items, loading, loadMore, hasMore };
};

export default usePagination;
