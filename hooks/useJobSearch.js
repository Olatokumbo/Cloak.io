import { useEffect, useState } from "react";
import algoliasearch from "algoliasearch";
import { errorNotification } from "../utils/notifications";

const useJobSearch = (
  location,
  page,
  keyword,
  city
) => {
  const [searchResults, setSearchResults] = useState([]);
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  var client = algoliasearch(
    process.env.NEXT_PUBLIC__ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC__ALGOLIA_SEARCH_KEY
  );

  var index = client.initIndex("jobs");
  useEffect(() => {
    setLoading(true);
    // setSelectedPage(page);
    // if (pages === 0) setSelectedPage(0);
    const jobSearch = async () => {
      await index
        .search(
          keyword,
          location
            ? { filters: `location:"${location}"`, page }
            : { page }
        )
        .then((responses) => {
          setLoading(false);
          if (responses.hits.length === 0) setMessage("Job(s) Not Found");
          else setMessage("");
          setSearchResults(responses.hits);
          setPages(responses.nbPages);
        })
        .catch((e) => {
          setLoading(false);
            errorNotification("Failed", e.message);
        });
    };
    jobSearch();
  }, [keyword, page, city]);

  return { loading, searchResults, pages, location, message };
};

export default useJobSearch;
