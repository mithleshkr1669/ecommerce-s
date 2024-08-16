import { useAppSelector } from '@/lib/hooks';
import { useState } from 'react';

const DiscountCalculator = ({handleDiscount}) => {
  const [discountType, setDiscountType] = useState();
  // const [discountedPrice, setDiscountedPrice] = useState();

  let totalPrice=useAppSelector((item)=>item.price.totalValue)

  console.log("discount type", discountType)
  function handleChange(e) {
    let value = parseInt(e.target.value);
    let selectedOption = e.target.options[e.target.selectedIndex]
    let name=selectedOption.getAttribute('name')
    if (name === "fixed") {
      let discountedPrice = value
      handleDiscount(discountedPrice)
      console.log("fixed discount",discountedPrice)
      // setDiscountedPrice(discountedPrice)
    } else if (name === "percentage") {
      let discountedPrice = ((value / 100) * totalPrice).toFixed(2)
      console.log("percentage",discountedPrice)
      handleDiscount(discountedPrice)      
    } else {
      console.log("This coupon is not available")
    }
    console.log("value",value)
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl w-fit shadow-md space-y-4">

      <div className="grid grid-cols-1 gap-4">

        <div className="flex flex-col">
          <label className="text-sm font-medium">Discount Type:</label>
          <select
            className="mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={discountType}
            onChange={handleChange}
          >
            <option name="fixed" value="10">₹10 Off (Fixed)</option>
            <option name="percentage" value="10%">10% Off (Percentage)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DiscountCalculator;
