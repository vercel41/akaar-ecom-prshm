import React from "react";
import CheckoutWithAreaSelect from "./component/checkout-with-area-select/CheckoutWithAreaSelect";
import CheckoutWithOutAreaSelect from "./component/checkout-without-area-select/CheckoutWithOutAreaSelect";
const CheckoutPage = () => {
  const useAreaSelectCheckout =
    process.env.USE_AREA_SELECT_CHECKOUT == "YES" ? true : false;
  return (
    <div>
      {useAreaSelectCheckout ? (
        <CheckoutWithAreaSelect />
      ) : (
        <CheckoutWithOutAreaSelect />
      )}
    </div>
  );
};

export default CheckoutPage;
