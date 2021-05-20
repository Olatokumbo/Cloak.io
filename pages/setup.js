import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { TextField, Button } from "@material-ui/core";
import { setupAccount } from "../redux/actions/auth";
import { useSelector } from "react-redux";
import PrivateRoute from "../hoc/PrivateRoute";
const NewUser = () => {
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [displayName, setDisplayName] = useState("");
  const uid = useSelector((state) => state.auth.uid);

  const submitDetails = async (e) => {
    e.preventDefault();
    try {
      setupAccount(displayName, phoneNumber, uid);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Layout>
      <div className="w-full min-h-screen p-4">
        <form onSubmit={submitDetails} className="max-w-96 sm:w-96 m-auto">
          <h1 className="text-lg font-semibold">Setup Account</h1>
          <TextField
            name="displayName"
            size="small"
            label="Display Name"
            variant="outlined"
            fullWidth={true}
            margin="normal"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
            required
            disabled
          />
          <TextField
            name="phoneNumber"
            type="tel"
            size="small"
            label="Phone Number"
            variant="outlined"
            fullWidth={true}
            margin="normal"
            onChange={(e) => setPhoneNumber(e.target.value)}
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            required
            // inputProps={{ maxLength: 10 }}
            value={phoneNumber}
            disabled
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            color="primary"
          >
            Done
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default PrivateRoute(NewUser);
