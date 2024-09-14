import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

type MenuProps = {
  id: number;
  name: string;
  unitPrice: number;
  ingredients: string[];
  soldOut: boolean;
  imageUrl: string;
};

function Menu() {
  const menu = useLoaderData() as MenuProps[];

  return (
    <ul className="px-2 mt-4 mb-4 md:w-3/4 md:mx-auto md:px-6 lg:w-11/12 lg:mx-auto ">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
