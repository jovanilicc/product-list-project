import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import products from "./data.json";
import Product from "./components/Product.jsx";
import Cart from "./components/Cart.jsx";
import Confirm from "./components/Confirm.jsx";

const App = () => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const cartData = localStorage.getItem("myCart");
      return JSON.parse(cartData) || [];
    } catch (err) {
      console.error("Failed to parse cart:", err);
      return [];
    }
  });
  const [confirmOrder, setConfirmOrder] = useState(false);

  useEffect(() => {
    localStorage.setItem("myCart", JSON.stringify(cartItems));
  }, [cartItems]);

  // useEffect(() => {
  //   if (confirmOrder) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "unset";
  //   }

  //   return () => {
  //     document.body.style.overflow = "unset";
  //   };
  // }, [confirmOrder]);
  const removeFromCart = (id) => {
    setCartItems((prev) => {
      return prev.filter((product) => product.id !== id);
    });
  };

  const addToCart = (product, type) => {
    setCartItems((currentItems) => {
      const isAlreadyInCartIndex = currentItems.findIndex(
        (item) => item.id === product.id
      );

      if (isAlreadyInCartIndex !== -1) {
        const updatedItems = [...currentItems];

        const currentItem = updatedItems[isAlreadyInCartIndex];
        const newQuantity =
          type === "increment"
            ? currentItem.quantity + 1
            : currentItem.quantity - 1;

        updatedItems[isAlreadyInCartIndex] = {
          ...currentItem,
          quantity: newQuantity,
        };

        return updatedItems.filter((item) => item.quantity > 0);
      } else {
        return [
          ...currentItems,
          {
            id: product.id,
            category: product.category,
            name: product.name,
            price: product.price,
            imageObj: product.imageObj,
            quantity: 1,
          },
        ];
      }
    });
  };

  const productList = products.map((product, index) => {
    return (
      <Product
        key={index}
        id={product.id}
        category={product.category}
        name={product.name}
        price={product.price}
        imageObj={product.image}
        addToCart={addToCart}
        productQuantity={
          cartItems.find((item) => item.id === product.id)?.quantity || 0
        }
      ></Product>
    );
  });

  const handleConfirm = () => {
    setConfirmOrder(true);
  };
  const handleClose = () => {
    setConfirmOrder(false);
    setCartItems((prev) => []);
  };
  const startNewOrder = () => {
    setConfirmOrder(false);
    setCartItems((prev) => []);
  };
  return (
    <>
      <main className="max-w-[1440px] mx-auto p-10 flex flex-col md:flex-row gap-10 relative">
        <AnimatePresence>
          {confirmOrder && (
            <motion.div key="modal-component" exit={{ opacity: 0, y: 50 }}>
              <Confirm
                cartItems={cartItems}
                startNewOrder={startNewOrder}
                handleClose={handleClose}
                openModal={confirmOrder}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <section className="md:max-w-[900px] flex-auto">
          <h1 className="text-4xl font-bold pb-5">Desserts</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-10">
            {productList}
          </div>
        </section>
        <aside className="min-w-[300px] flex-auto relative ">
          <Cart
            cartItems={cartItems}
            handleConfirm={handleConfirm}
            removeFromCart={removeFromCart}
          ></Cart>
        </aside>
      </main>
    </>
  );
};

export default App;
