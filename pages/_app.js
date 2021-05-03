import "../styles/globals.css";
import { Provider} from "react-redux";
import { useStore } from "../redux/store";
import Auth from "../auth";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  return (
    <Provider store={store}>
      <Auth>
        <Component {...pageProps} />
      </Auth>
    </Provider>
  );
}

export default MyApp;
