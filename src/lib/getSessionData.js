export default function getSessionData() {
  try {
    if (typeof window !== "undefined") {
      let allItem = JSON.parse(sessionStorage.getItem("cart"));
      let initialPrice = allItem.reduce((acc, item) => {
        return acc + item.price;
      }, 0);
      if (initialPrice) {
        return initialPrice;
      }
    }
  } catch (error) {
    console.log("error in fetching data from session storage", error);
  }
}
