import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Footer from "./Footer";
const Layout = (props) => {
  const auth = useSelector((state) => state.auth);
  return (
    <div className="min-h-screen">
      <Navbar auth={auth} />
      <div className="min-h-screen">{props.children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
