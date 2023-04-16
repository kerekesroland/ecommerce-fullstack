export interface ICartItem {
  id: string;
  gift?: boolean;
  image: string;
  title: string;
  price: number;
  oldPrice: number;
  quantity: number;
  isNew: boolean;
  main_category: string;
  category: Array<string>;
}
