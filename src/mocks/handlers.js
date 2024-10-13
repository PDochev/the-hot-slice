import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://react-fast-pizza-api.onrender.com/api/menu", () => {
    return HttpResponse.json([
      {
        id: 1,
        name: "Margherita",
        unitPrice: 12,
        imageUrl:
          "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-1.jpg",
        ingredients: ["tomato", "mozzarella", "basil"],
        soldOut: false,
      },
      {
        id: 2,
        name: "Capricciosa",
        unitPrice: 14,
        imageUrl:
          "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-2.jpg",
        ingredients: ["tomato", "mozzarella", "ham", "mushrooms", "artichoke"],
        soldOut: true,
      },
    ]);
  }),
];
