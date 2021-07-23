import { CircularProgress } from "@material-ui/core";
const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <CircularProgress size="5rem"/>
    </div>
  );
};

export default Loading;
