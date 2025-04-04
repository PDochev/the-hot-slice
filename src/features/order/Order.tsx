// Test ID: IIDSAT

import OrderItem from "./OrderItem";
import { LoaderFunctionArgs } from "react-router-dom";
import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

type IngredientsProps = {
  id: number;
  ingredients: string[];
};

type OrderProps = {
  id: number;
  status: string;
  priority: boolean;
  priorityPrice: number;
  orderPrice: number;
  estimatedDelivery: string;
  cart: {
    pizzaId: number;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
};

function Order() {
  const order = useLoaderData() as OrderProps;
  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
  }, [fetcher]);

  // console.log(fetcher.data);

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6 md:w-4/5 md:mx-auto lg:w-full">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span
              data-testid="priority"
              className="rounded-full bg-destructive px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50"
            >
              Priority
            </span>
          )}
          <span
            data-testid="statusOrder"
            className="rounded-full bg-accent px-3 py-1 text-sm font-semibold uppercase tracking-wide text-stone-700"
          >
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between rounded gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="dive-stone-200 divide-y border-b border-t">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher?.data?.find(
                (el: IngredientsProps) => el.id === item.pizzaId
              )?.ingredients ?? []
            }
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5 rounded">
        <p
          data-testid="orderPricePizza"
          className="text-sm font-medium text-stone-600"
        >
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p
            data-testid="priorityPrice"
            className="text-sm font-medium text-stone-600"
          >
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p data-testid="payOnDelivery" className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <UpdateOrder />}
    </div>
  );
}

export async function loader({ params }: LoaderFunctionArgs) {
  const { orderId } = params as { orderId: string };
  const order = await getOrder(orderId);
  return order;
}

export default Order;
