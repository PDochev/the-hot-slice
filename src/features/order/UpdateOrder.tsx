import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

export default function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

type ActionParams = {
  params: {
    orderId: string;
  };
};

export async function action({ params }: ActionParams) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
