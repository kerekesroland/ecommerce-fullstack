export interface IProduct {
  id: string;
  title: string;
  price: number;
  oldPrice: number;
  isNew: boolean;
  category: Array<string>;
  image: string;
}
