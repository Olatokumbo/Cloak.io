import { useEffect, useState } from "react";
import { Chip, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((_theme) => ({
  active: {
    background: "#ffbc00",
    color: "white"
  },
  done: {
    background: "#0b8a32",
    color: "white",
  },
  cancelled: {
    background: "#dc2626",
    color: "white",
  },
}));

const OrderStatusFlag = ({ done, cancelled }) => {
  const classes = useStyles();
  const [name, setName] = useState("active");
  useEffect(() => {
    if (done && !cancelled) setName("done");
    else if (!done && cancelled) setName("cancelled");
    else setName("active");
  }, [done, cancelled]);
  return <Chip className={classes[name]} label={name} />;
};

export default OrderStatusFlag;
