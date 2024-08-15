import Link from "next/link";
import { useState } from "react";

export default function Product({ products, cart, addToCart, removeFromCart }) {
  const [isAdded, setIsAdded] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const isInCart = cart.some((item) => item.id === products.id);

  const handleAddToCart = () => {
    addToCart(products);
    setIsAdded(true);

    // Reset the "Added" animation after 1.5 seconds
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(products.id);
    setIsRemoved(true);

    // Reset the "Removed" animation after 1.5 seconds
    setTimeout(() => setIsRemoved(false), 1500);
  };

  return (
    <div className="bg-white border p-4 rounded-lg shadow-lg relative">
      <img
        src={products.image}
        alt={products.name}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h2 className="text-lg font-bold mt-2">{products.name}</h2>
      <p className="text-gray-500">${products.price.toFixed(2)}</p>

      {isInCart ? (
        <div className="mt-5">
          <Link
            href="/cartPage"
            className={`py-2 bg-orange-500 text-white px-4 rounded hover:bg-orange-600 transition-all duration-300 ${
              isRemoved ? "bg-gray-500" : ""
            }`}
          >
            {/* {isRemoved ? 'Removed' : 'Remove Item'} */}Go to Cart
          </Link>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className={`mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all duration-300 ${
            isAdded ? "bg-green-500" : ""
          }`}
        >
          {isAdded ? "Added!" : "Add to Cart"}
        </button>
      )}

      {/* Feedback Message for Add to Cart */}
      {isAdded && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-80 rounded-lg">
          <p className="text-green-500 font-bold text-lg animate-pulse">
            Added to Cart!
          </p>
        </div>
      )}

      {/* Feedback Message for Remove from Cart */}
      {isRemoved && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-80 rounded-lg">
          <p className="text-red-500 font-bold text-lg animate-pulse ml-3">
            Oops!! You don't like it. It can add value in this way in your life.
          </p>
        </div>
      )}
    </div>
  );
}
