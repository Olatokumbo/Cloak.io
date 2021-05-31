import { useEffect, useState } from "react";
import ProfileCard from "../../components/ProfileCard";
import Link from "next/link";
import algoliasearch from "algoliasearch";
import Layout from "../../components/Layout";
import CategoryList from "../../sections/CategoryList";
import { useRouter } from "next/router";
const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  var client = algoliasearch(
    process.env.NEXT_PUBLIC__ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC__ALGOLIA_SEARCH_KEY
  );
  var index = client.initIndex("posters");
  const {
    query: { keyword },
  } = useRouter();

  useEffect(() => {
    async function unauthenticated_search(query) {
      await index
        .search(query)
        .then((responses) => {
          setSearchResults(responses.hits);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    unauthenticated_search(keyword);
  }, [keyword]);
  return (
    <Layout>
      <CategoryList />
      <div>
        <div className="p-5">
          <h1 className="text-3xl font-semibold">Results for "{keyword}"</h1>
        </div>
        <div className="mb-5 w-full px-2 grid gap-x-2 gap-y-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
          {searchResults.map((hit) => (
            <Link key={hit.objectID} href={`/search/${hit.objectID}`}>
              <a>
                <ProfileCard data={hit} searched={true} />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
