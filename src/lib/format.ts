export function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function fromPriceLabel(prices: number[]) {
  const lowest = Math.min(...prices);
  return `From ${formatMoney(lowest)}`;
}
