export interface OrderDetail {
  product: {
    imageUrl: string;
    price: number;
    title: string;
  };
  quantity: number;
  totalPrice: number;
}
