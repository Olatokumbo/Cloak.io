import { useState, useEffect } from "react";

const useNotification= (query, nextQuery, id) => {
  const [loading, setLoading] = useState(false);
  const [lastItem, setLastItem] = useState(null);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if (id) {
        setLoading(true);
        let data;
        data = await query(id);
        setItems(data.notifications);
        setLastItem(data.lastVisible);
        setHasMore(true);
        setLoading(false);
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
        nextItems = await nextQuery(id, lastItem);
        //   } else nextItems = await nextQuery(lastItem);
        setLoading(false);
        if (nextItems.notifications)
          setItems((prevItem) => [...prevItem, ...nextItems.notifications]);
        if (nextItems.lastVisible) setLastItem(nextItems.lastVisible);
        else setHasMore(false);
      }
    } else {
      setHasMore(false);
      setLoading(false);
    }
  };
  return { items, loading, loadMore, hasMore };
};

export default useNotification;
