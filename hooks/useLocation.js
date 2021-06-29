import { useState, useEffect } from "react";
const useLocation = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        let states = await fetch("/api/states");
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
