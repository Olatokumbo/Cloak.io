import PosterCard from "../../components/PosterCard";
import Link from "next/link";
import Layout from "../../components/Layout";
import CategoryList from "../../sections/CategoryList";
import { useRouter } from "next/router";
import { CircularProgress } from "@material-ui/core";
import useAlgoliaSearch from "../../hooks/useAlgoliaSearch";
const Search = () => {
  const {
    query: { keyword },
  } = useRouter();
  const { loading, searchResults, notFound } = useAlgoliaSearch(
    "posters",
    keyword
  );
  return (
    <Layout>
      <CategoryList />
      <div>
        <div className="p-5">
          <h1 className="text-3xl font-semibold">Results for "{keyword}"</h1>
        </div>
        <div className="mb-5 w-full px-2 grid gap-x-2 gap-y-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
          {!loading ? (
            !notFound ? (
              searchResults.map((hit) => (
                <Link key={hit.objectID} href={`/search/${hit.objectID}`}>
                  <a>
                    <PosterCard data={hit} searched={true} />
                  </a>
                </Link>
              ))
            ) : (
              "Not Found"
            )
          ) : (
            <CircularProgress />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
