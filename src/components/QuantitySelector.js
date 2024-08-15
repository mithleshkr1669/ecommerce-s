// import { useAppSelector } from '@/lib/hooks';
// import { useState } from 'react';

// const QuantitySelector = ({item}) => {
  
//   const [quantity, setQuantity] = useState(1);

//   const handleIncrease = () => {
//     console.log("handle increase item", item)
    
//     setQuantity(prev => prev + 1);
//     // try {
//     //   sessionStorage.setItem("cart",JSON.stringify(item))
//     // } catch (error) {
//     //   console.log("this is error",error)
//     // }
//   };

//   const handleDecrease = () => {
//     if (quantity > 1) {
//       setQuantity(prev => prev - 1);
//     }
//   };

//   const handleChange = (e) => {
//     const value = parseInt(e.target.value);
//     if (!isNaN(value) && value >= 1) {
//       setQuantity(value);
//     }
//   };  
//   return (
//     <div className="grid grid-cols-3 gap-2 w-32">
//       <button 
//         onClick={handleDecrease} 
//         className="bg-gray-200 text-gray-800 px-2 py-1 rounded-l"
//       >
//         -
//       </button>
//       <input 
//         type="number" 
//         value={quantity} 
//         onChange={handleChange}
//         className="text-center border-gray-300 border px-2 py-1"
//       />
//       <button 
//         onClick={handleIncrease} 
//         className="bg-gray-200 text-gray-800 px-2 py-1 rounded-r"
//       >
//         +
//       </button>
//     </div>
//   );
// };

// export default QuantitySelector;
