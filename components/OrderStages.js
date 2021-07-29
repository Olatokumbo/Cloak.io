import { useState } from "react";
import { Step, Stepper, StepLabel, makeStyles } from "@material-ui/core";

function getSteps() {
  return ["Order Received", "Approved", "Processing", "Done"];
}

const useStyles = makeStyles((theme) => ({
  stepper: {
    flexWrap: "wrap",
  },
  step: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const OrderStages = ({ activeStep }) => {
  const classes = useStyles();
  const steps = getSteps();
  return (
    <Stepper activeStep={activeStep} className={classes.stepper}>
      {steps.map((label) => {
        return (
          <Step key={label} className={classes.step}>
            <StepLabel>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default OrderStages;
