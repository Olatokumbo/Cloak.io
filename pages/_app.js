import "../styles/globals.css";
import { Provider } from "react-redux";
import { useStore } from "../redux/store";
import { useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../utils/theme";
import Auth from "../auth";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Auth>
          <Component {...pageProps} />
        </Auth>
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
