import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import useCurrencyConverter from "../hooks/useCurrencyConverter";
import { useDispatch, useSelector } from "react-redux";
import { IProduct } from "../models/IProduct";
import { AppDispatch, RootState } from "../store/store";
import { setProducts } from "../store/slices/productsSlice";

interface ICurrencyContext {
  currentCurrency: string;
  setCurrency?: (currency: string) => void;
  convertedAmount: number | null;
}

const CurrencyContext = createContext<ICurrencyContext>({
  currentCurrency: "USD",
  convertedAmount: null,
});

const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currentCurrency, setCurrentCurrency] = useState<string>(
    (localStorage.getItem("currency") as string) ?? "USD"
  );
  const [localConvertedAmount, setLocalConvertedAmount] = useState<
    number | null
  >(null);

  const setCurrency = (currency: string) => {
    handleToCurrencyChange(currency);
    setCurrentCurrency(currency.toUpperCase());
    localStorage.setItem("currency", currency.toUpperCase());
  };

  const dispatch: AppDispatch = useDispatch();
  const { loading, convertedAmount, handleToCurrencyChange } =
    useCurrencyConverter(1, "USD", currentCurrency?.toUpperCase());
  const products: IProduct[] = useSelector(
    (state: RootState) => state.products.products
  );

  const productsWithCurrentPrice = useMemo(() => {
    return products?.map((product) => {
      return {
        ...product,
        price: (product?.originalPrice * (convertedAmount ?? 1)).toFixed(2),
      };
    });
  }, [convertedAmount]);
  useEffect(() => {
    if (!loading && convertedAmount !== null) {
      setLocalConvertedAmount(convertedAmount);
      dispatch(setProducts(productsWithCurrentPrice));
    }
  }, [loading, convertedAmount]);

  return (
    <CurrencyContext.Provider
      value={{
        currentCurrency,
        setCurrency,
        convertedAmount: localConvertedAmount,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  return useContext(CurrencyContext);
};

export default CurrencyProvider;
