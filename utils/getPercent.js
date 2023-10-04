/**
 * The function calculates the percentage of sale quantity out of the total quantity.
 * @param saleQty - The saleQty parameter represents the quantity of items that have been sold.
 * @param stockQty - The stockQty parameter represents the quantity of items in stock.
 * @returns the sale percentage as a rounded integer.
 */
export const getSalePercent = (saleQty, stockQty) => {
  let salePercent = 0;
  if (saleQty === 0 && stockQty === 0) return 0;
  if (typeof saleQty === "number" && typeof stockQty === "number") {
    const totalQty = stockQty + saleQty;
    salePercent = (saleQty / totalQty) * 100;
  }
  return Math.round(salePercent);
};
