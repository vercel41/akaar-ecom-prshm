import React from "react";
import CheckoutWithAreaSelect from "./component/checkout-with-area-select/CheckoutWithAreaSelect";
import CheckoutWithOutAreaSelect from "./component/checkout-without-area-select/CheckoutWithOutAreaSelect";
import CheckoutGlamqueen from "./component/checkout-glam-queen/CheckoutGlamqueen";
const CheckoutPage = () => {
  const useAreaSelectCheckout = process.env.USE_AREA_SELECT_CHECKOUT === "YES";
  const glamqueenCheckout = process.env.NEXT_PUBLIC_ENABLE_MANUAL_PAYMENT === "YES";
  return (
    <div>
      {useAreaSelectCheckout ? (
        <CheckoutWithAreaSelect />
      ) : glamqueenCheckout ? (
        <CheckoutGlamqueen />
      ) : (
        <CheckoutWithOutAreaSelect />
      )}
    </div>
  );
};

export default CheckoutPage;
