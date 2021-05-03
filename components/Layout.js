import Navbar from "../components/Navbar";
import { useSelector } from "react-redux"
const Layout = (props) => {
  const auth = useSelector(state => state.auth);
  return (
    <div className="min-h-screen">
      <Navbar auth={auth} />
      <div>{props.children}</div>
    </div>
  );
};

export default Layout;
