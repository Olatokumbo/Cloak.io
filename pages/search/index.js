import { useEffect, useState } from "react";
import PosterCard from "../../components/PosterCard";
import Link from "next/link";
import Layout from "../../components/Layout";
import CategoryList from "../../sections/CategoryList";
import { useRouter } from "next/router";
import { TextField, makeStyles, Button } from "@material-ui/core";
import PosterCardSkeleton from "../../skeletons/PosterCardSkeleton";
import useAlgoliaSearch from "../../hooks/useAlgoliaSearch";
const useStyles = makeStyles((_theme) => ({
  price_input: {
    width: "80px",
    margin: "5px",
  },
}));

const Search = () => {
  const classes = useStyles();
  const {
    push,
    query: { keyword, price_min, price_max },
  } = useRouter();
  // const router = useRouter();
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const { loading, searchResults, notFound } = useAlgoliaSearch(
    "posters",
    keyword,
    price_min,
    price_max
  );
  const filterSearch = () => {
    if (priceMax) {
      push({
        pathname: "/search",
        query: {
          keyword,
          price_min: priceMin || 0,
          price_max: priceMax,
        },
      });
    } else {
      push({
        pathname: "/search",
        query: {
          keyword,
          price_min: priceMin,
        },
      });
    }
  };
  useEffect(() => {
    // setPriceMin(price_min); // previously setPriceMin(price_min || 0);
    if (!price_min) setPriceMin("");
    if (!price_max) setPriceMax("");
    // setPriceMax(price_max); // previously setPriceMax(price_max || 0);
  }, [price_min, price_max, keyword]);

  return (
    <Layout>
      <CategoryList />
      <div className="p-3">
        <div className="p-5">
          <h1 className="text-3xl font-semibold">Results for "{keyword}"</h1>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 px-1 pb-1 border-none xs:border-r xs:border-gray-300">
            <div className="bg-gray-100 rounded p-2">
              <h1 className="text-base font-semibold">Price</h1>
              <div className="flex items-center justify-center">
                <TextField
                  size="small"
                  type="number"
                  variant="outlined"
                  className={classes.price_input}
                  placeholder="min"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  InputProps={{ inputProps: { min: 0 } }}
                />
                -
                <TextField
                  size="small"
                  type="number"
                  variant="outlined"
                  className={classes.price_input}
                  placeholder="max"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  InputProps={{ inputProps: { min: 1 } }}
                />
                <Button
                  disabled={!(priceMin || priceMax)}
                  color="primary"
                  variant="contained"
                  onClick={filterSearch}
                >
                  GO
                </Button>
              </div>
            </div>
          </div>
          <div className="px-2 flex-3">
            {!loading ? (
              !notFound ? (
                <div className="mb-5 w-full grid gap-x-2 gap-y-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
                  {searchResults.map((hit) => (
                    <Link key={hit.objectID} href={`/search/${hit.objectID}`}>
                      <a>
                        <PosterCard data={hit} searched={true} />
                      </a>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center w-72 justify-center m-auto">
                  <h1 className="text-center my-5 text-2xl">Not Found</h1>
                  <PosterCardSkeleton />
                </div>
              )
            ) : (
              <div className="mb-5 w-full grid gap-x-2 gap-y-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
                <PosterCardSkeleton />
                <PosterCardSkeleton />
                <PosterCardSkeleton />
                <PosterCardSkeleton />
                <PosterCardSkeleton />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
