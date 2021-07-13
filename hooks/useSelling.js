import { useEffect, useState } from "react";
import {
  listPendingHires,
  listFinishedHires,
  listCancelledHires,
} from "../redux/actions/hires";
const useSelling = (orderState, userId) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const getData = async () => {
      let list;
      if (userId) {
        try {
          if (orderState === "active") {
            list = await listPendingHires(userId);
          } else if (orderState === "completed") {
            list = await listFinishedHires(userId);
          } else if (orderState === "cancelled") {
            list = await listCancelledHires(userId);
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
