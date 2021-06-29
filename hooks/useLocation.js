import { useState, useEffect } from "react";
const useLocation = () => {
  let url;
  if (process.env.NODE_ENV === "production")
    url = "https://cloak-io.vercel.app/api/states";
  url = "http://localhost:3000/api/states";

  const [cities, setCities] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        let states = await fetch(url);
        states = await states.json();
        let modifiedData = states.data.map((state) => state.info.officialName);
        // modifiedData = [].concat.apply([], modifiedData).sort();
        setCities(modifiedData);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return cities;
};

export default useLocation;
