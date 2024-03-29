export interface Item {
  id: string;
  image: string;
  title: string;
  price: number;
  oldPrice: number;
  isNew: boolean;
  category: string | Array<string>;
}
