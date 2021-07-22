import { useEffect, useState } from "react";
import { fetchUser } from "../redux/actions/profile";
import { TableRow, TableCell, IconButton } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Link from "next/link";
const AppliedUser = ({ id }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const getData = async () => {
      let data = await fetchUser(id);
      data = JSON.parse(data);
      console.log(data);
      setUser(data);
    };
    getData();
  }, [id]);
  return (
    <TableRow key={user.id}>
      <TableCell component="th" scope="row">
        {user.displayName || "Not Found"}
      </TableCell>
      <TableCell align="right">{user.email || "Not Found"}</TableCell>
      <TableCell align="right">
        <Link href={`/profile/${user.id}`}>
          <IconButton>
            <VisibilityIcon />
          </IconButton>
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default AppliedUser;
