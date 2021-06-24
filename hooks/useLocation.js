import { useState, useEffect } from "react";
const useLocation = () => {
  const url = "https://locationsng-api.herokuapp.com/api/v1/cities";
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        let data = await fetch(url);
        data = await data.json();
        let modifiedData = data.map((state) => state.cities);
        modifiedData = [].concat.apply([], modifiedData).sort();
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
