export type MenuType = {
  id: number;
  slug: string;
  title: string;
  desc?: string;
  img?: string;
  color: string;
}[];

export type OrderType = {
  id: string;
  userEmail: string;
  price: number;
  products: CartItemType[];
  status: string;
  createdAt: Date;
  intent_id?: string;
};

export type CartItemType = {
  id: string;
  title: string;
  img?: string;
  price: number;
  optionalTitle?: string;
  quantity: number;
};

export type ProductType = {
  id: string;
  title: string;
  desc?: string;
  price: number;
  img?: string;
  options?: { title: string; additionalPrice: number }[];
};

export type CartType = {
  products: CartItemType[];
  totalItems: number;
  totalPrice: number;
};

export type ActionType = {
  addtoCart: (item: CartItemType) => void;
  removeFromCart: (item: CartItemType) => void;
};
