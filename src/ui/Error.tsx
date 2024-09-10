import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

type Error = {
  message: string;
  data?: string;
};

function Error() {
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{(error as Error).data || (error as Error).message}</p>

      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
