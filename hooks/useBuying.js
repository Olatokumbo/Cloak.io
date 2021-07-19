import { useEffect, useState } from "react";
import {
  listPendingHireRequests,
  listFinishedHireRequest,
} from "../redux/actions/hires";
const useSelling = (orderState, userId) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      let list;
      setLoading(true);
      if (userId) {
        try {
          if (orderState === "active") {
            list = await listPendingHireRequests(userId);
          } else if (orderState === "completed") {
            list = await listFinishedHireRequest(userId);
          }
          setItems(list || []);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getData();
  }, [userId, orderState]);
  return { items, loading };
};

export default useSelling;
