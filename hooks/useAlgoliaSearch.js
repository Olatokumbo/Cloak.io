import { useEffect, useState } from "react";
import algoliasearch from "algoliasearch";

const useAlgoliaSearch = (indexName, keyword) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(null);

  var client = algoliasearch(
    process.env.NEXT_PUBLIC__ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC__ALGOLIA_SEARCH_KEY
  );
  var index = client.initIndex(indexName);

  useEffect(() => {
    if (keyword) {
      async function unauthenticated_search(query) {
        setLoading(true);
        setNotFound(null);
        await index
          .search(query)
          .then((responses) => {
            setSearchResults(responses.hits);
            setLoading(false);
            if (responses.hits.length === 0) setNotFound(true);
          })
          .catch((e) => {
            console.log(e);
          });
      }
      unauthenticated_search(keyword);
    }
  }, [keyword]);

  return { loading, searchResults, notFound };
};

export default useAlgoliaSearch;
