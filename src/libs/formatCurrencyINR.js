export function formatCurrencyINR(amount) {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    currencyDisplay: "code",
  });
  return formatter.format(amount).replace("INR", "₹");
}

// Example usage:
const amount = 123456.78;
const formattedAmount = formatCurrencyINR(amount);
console.log(formattedAmount); // Output: 1,23,456.78₹
