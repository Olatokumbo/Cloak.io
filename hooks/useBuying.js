import { useEffect, useState } from "react";
import {
  listPendingHireRequests,
  listFinishedHireRequest,
} from "../redux/actions/hires";
const useSelling = (orderState, userId) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const getData = async () => {
      let list;
      if (userId) {
        try {
          if (orderState === "active") {
            list = await listPendingHireRequests(userId);
          } else if (orderState === "completed") {
            list = await listFinishedHireRequest(userId);
          }
          setItems(list);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getData();
  }, [userId, orderState]);
  return items;
};

export default useSelling;
