import { useEffect, useState } from "react";
import { getJobList } from "../redux/actions/jobs";
const useJobs = (userId, jobState) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const getJob = async () => {
      let jobList;
      if (jobState === "active") jobList = await getJobList(userId, false);
      else if (jobState === "closed") jobList = await getJobList(userId, true);
      jobList = JSON.parse(jobList);
      setItems(jobList);
    };
    getJob();
  }, [userId, jobState]);

  return items;
};

export default useJobs;
