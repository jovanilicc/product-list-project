import { useEffect, useRef, useState } from "react";
import confirmedIcon from "../assets/images/icon-order-confirmed.svg";
import { ClipLoader } from "react-spinners";
import { AnimatePresence, motion } from "motion/react";
const Confirm = ({ openModal, cartItems, startNewOrder, handleClose }) => {
  const dialogRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  useEffect(() => {
    if (openModal) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [openModal]);

  const closeModal = () => {
    handleClose();
    setTimeout(() => dialogRef.current.close(), 300);
  };

  let totalPrice = 0;
  const orderList = cartItems.map((cartItem) => {
    totalPrice = totalPrice + cartItem.quantity * cartItem.price;

    return (
      <div
        key={cartItem.id}
        className="flex items-center justify-between border-b-1 border-b-rose-100 py-4"
      >
        <div className="flex gap-3">
          <span>
            <img
              src={cartItem.imageObj.thumbnail}
              alt={`${cartItem.name} thumbnail image`}
              className="size-10 rounded-sm"
            />
          </span>
          <div>
            <h4 className="font-semibold text-sm text-ellipsis text-nowrap overflow-hidden w-36 sm:w-auto">
              {cartItem.name}
            </h4>

            <div className="flex items-center justify-between max-w-20">
              <span className="text-red-primary text-sm font-bold">
                {cartItem.quantity + "x"}
              </span>
              <span className="text-rose-400 text-sm">{`@ $${cartItem.price.toFixed(
                2
              )}`}</span>
            </div>
          </div>
        </div>
        <div>
          <span className="font-semibold text-sm">{`$${(
            cartItem.quantity * cartItem.price
          ).toFixed(2)}`}</span>
        </div>
      </div>
    );
  });

  return (
    <>
      <dialog
        ref={dialogRef}
        onCancel={(event) => {
          event.preventDefault();
          closeModal();
        }}
        onClick={(event) =>
          event.target === event.currentTarget && closeModal()
        }
        className=" backdrop:bg-black/50 p-0"
      >
        {" "}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50, transition: 1000 }}
          className="rounded-xl z-50 fixed top-1/2  left-1/2 -translate-1/2 bg-white w-full min-[480px]:w-100 p-8 flex flex-col max-h-[600px] overflow-auto"
        >
          {isLoading && (
            <div className="text-center">
              <ClipLoader
                color="orange"
                speedMultiplier={0.5}
                size="50px"
              ></ClipLoader>
            </div>
          )}
          {!isLoading && (
            <motion.div animate={{ opacity: [0.5, 1], y: [20, 0] }}>
              <span>
                <img
                  src={confirmedIcon}
                  alt="Your order is complete"
                  className="size-10"
                />
              </span>
              <h3 className="pt-5 pb-2 font-bold text-3xl">Order Confirmed</h3>
              <p className="text-xs text-rose-400">
                We hope you enjoy your food!
              </p>
              <div className="rounded-md bg-rose-50 p-4 my-4">
                <div className="flex flex-col">{orderList}</div>
                <div className="flex justify-between items-center pt-4">
                  <span className="text-sm font-semibold ">Order total</span>
                  <span className="font-bold text-xl">{`$${totalPrice.toFixed(
                    2
                  )}`}</span>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={startNewOrder}
                className="cursor-pointer block w-full mx-auto bg-red-primary hover:opacity-90 transition-all text-center rounded-3xl text-sm font-semibold mt-4 mb-3 py-2 px-2 text-white"
              >
                Start New Order
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </dialog>
    </>
  );
};

export default Confirm;
