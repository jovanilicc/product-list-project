import cartEmpty from "../assets/images/illustration-empty-cart.svg";
import deleteIcon from "../assets/images/icon-remove-item.svg";
import carbonIcon from "../assets/images/icon-carbon-neutral.svg";
import { motion, AnimatePresence, scale } from "motion/react";
const Cart = (props) => {
  const { handleConfirm } = props;

  let totalPrice = 0;
  const cartList = props.cartItems.map((cartItem) => {
    totalPrice = totalPrice + cartItem.quantity * cartItem.price;
    return (
      <motion.li
        animate={{ opacity: [0.7, 1], x: [30, 0] }}
        exit={{ opacity: 0.5, x: 30 }}
        key={cartItem.id}
        className="flex-auto flex flex-col justify-between py-3"
      >
        <div>
          <h4 className="font-bold text-base ">{cartItem.name}</h4>
          <div className="flex justify-between border-b border-b-slate-100 py-3">
            <div className="flex justify-between w-[200px]">
              <span className="text-red-primary text-base font-bold">
                {cartItem.quantity + "x"}
              </span>
              <span className="text-slate-600 font-semibold ">{`@ $${cartItem.price.toFixed(
                2
              )}`}</span>
              <span className="font-semibold">{`$${(
                cartItem.quantity * cartItem.price
              ).toFixed(2)}`}</span>
            </div>
            <div>
              <button
                onClick={() => props.removeFromCart(cartItem.id)}
                className="cursor-pointer rounded-full border-2 p-1 border-rose-300"
              >
                <img
                  src={deleteIcon}
                  alt={`Remove ${props.name} from cart`}
                  className="size-4"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.li>
    );
  });
  return (
    <>
      <div className="bg-white rounded-xl p-5">
        <h3 className="text-red-primary text-2xl font-bold pb-8">
          Your Cart (
          <motion.span
            className="inline-block"
            key={props.cartItems.length}
            animate={{ scale: [1.2, 1], opacity: [0.5, 1] }}
          >
            {props.cartItems.length}
          </motion.span>
          )
        </h3>
        <AnimatePresence mode="wait">
          {props.cartItems.length <= 0 ? (
            <motion.div key="empty-cart" animate={{ scale: [0.9, 1] }}>
              <img
                src={cartEmpty}
                alt="Your cart is currently empty"
                className="block mx-auto"
              />
              <p className=" text-rose-400 font-bold pt-4 text-center text-sm pb-6">
                Your added items will appear here
              </p>
            </motion.div>
          ) : (
            <motion.div key="cart" animate={{ opacity: [0.5, 1] }}>
              <motion.ul className="flex flex-col">
                <AnimatePresence propagate>{cartList}</AnimatePresence>
              </motion.ul>

              <div className="flex justify-between py-4">
                <span className="font-base">Order Total</span>
                <motion.span
                  key={totalPrice}
                  animate={{ scale: [1.2, 1], opacity: [0.5, 1] }}
                  className="text-xl font-bold "
                >{`$${totalPrice.toFixed(2)}`}</motion.span>
              </div>
              <motion.p
                animate={{ scale: [0.8, 1] }}
                className="rounded-xl bg-rose-100 flex items-center justify-center py-3 my-3"
              >
                <img
                  src={carbonIcon}
                  alt="This is carbon-neutral delivery"
                  className="mr-3"
                />
                <span>
                  This is
                  <span className="font-semibold">{" carbon-neutral "}</span>
                  delivery
                </span>
              </motion.p>
              <motion.button
                animate={{ opacity: [0.5, 1] }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleConfirm()}
                className="cursor-pointer block w-full mx-auto bg-red-primary hover:opacity-90 transition-all text-center rounded-3xl text-xl font-semibold mt-6 mb-3 py-3 px-2 text-white"
              >
                Confirm Order
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Cart;
