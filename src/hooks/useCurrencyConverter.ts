import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface CurrencyConverterState {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  convertedAmount: number | null;
  currencies: string[];
  loading: boolean;
}

interface CurrencyConverterActions {
  handleFromCurrencyChange: (newFromCurrency: string) => void;
  handleToCurrencyChange: (newToCurrency: string) => void;
  handleAmountChange: (newAmount: number) => void;
}

type CurrencyConverterHook = CurrencyConverterState & CurrencyConverterActions;

const useCurrencyConverter = (
  initialAmount: number,
  initialFromCurrency: string,
  initialToCurrency: string
): CurrencyConverterHook => {
  const [fromCurrency, setFromCurrency] = useState<string>(initialFromCurrency);
  const [toCurrency, setToCurrency] = useState<string>(initialToCurrency);
  const [amount, setAmount] = useState<number>(initialAmount);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then((response) => {
        setCurrencies(Object.keys(response?.data?.rates));
        setConvertedAmount(amount * response?.data?.rates[toCurrency]);
      })
      .catch((error) => {
        console.error("Error fetching exchange rates:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fromCurrency, toCurrency, localStorage.getItem("currency")]);

  const handleFromCurrencyChange = (newFromCurrency: string) => {
    setFromCurrency(newFromCurrency);
  };

  const handleToCurrencyChange = useCallback(
    (newToCurrency: string) => {
      setToCurrency(newToCurrency);
      localStorage.setItem("currency", newToCurrency?.toUpperCase());
    },
    [convertedAmount]
  );

  const handleAmountChange = (newAmount: number) => {
    setAmount(newAmount);
  };

  return {
    loading,
    fromCurrency,
    toCurrency,
    amount,
    convertedAmount,
    currencies,
    handleFromCurrencyChange,
    handleToCurrencyChange,
    handleAmountChange,
  };
};

export default useCurrencyConverter;
