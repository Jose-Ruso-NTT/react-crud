import { useCallback } from "react";

interface FormatPriceParams {
  currency: string;
  total: number;
}

const useFormatPrice = () => {
  const formatPrice = useCallback(
    ({ currency, total }: FormatPriceParams) =>
      new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency,
      }).format(total),
    []
  );

  return { formatPrice };
};

export default useFormatPrice;
