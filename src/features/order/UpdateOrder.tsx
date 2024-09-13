import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";
import { ActionFunctionArgs } from "react-router-dom";

export default function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export async function action({ params }: ActionFunctionArgs) {
  const data = { priority: true };
  const { orderId } = params as { orderId: string };
  await updateOrder(orderId, data);
  return null;
}
