import cartImg from "../assets/images/icon-add-to-cart.svg";

import { AnimatePresence, motion } from "motion/react";
const Product = (props) => {
  const { productQuantity, addToCart } = props;

  const handleClick = (type) => {
    addToCart(props, type);
  };

  return (
    <div>
      <div className="relative">
        <picture>
          <source media="(min-width:1000px)" srcSet={props.imageObj.desktop} />
          <source media="(min-width:768px)" srcSet={props.imageObj.tablet} />
          <source media="(min-width:224px)" srcSet={props.imageObj.mobile} />
          <img
            src={props.imageObj.desktop}
            alt={props.name}
            className="rounded-xl"
          />
        </picture>
        <AnimatePresence mode="wait">
          {productQuantity <= 0 ? (
            <motion.button
              animate={{
                opacity: [0.9, 1],
                transition: { duration: 0.5 },
              }}
              exit={{ opacity: 0.7 }}
              type="button"
              onClick={() => handleClick("increment")}
              className="mx-auto w-1/2 sm:w-4/5 lg:w-48 rounded-4xl border-rose-400 border-2 absolute overflow-hidden -bottom-6 md:-bottom-6  left-1/2 -translate-x-1/2 cursor-pointer md:max-h-[52px]"
            >
              <div className="flex font-bold justify-center gap-1 md:gap-2 px-2 py-3 lg:py-3 bg-white hover:bg-rose-200 transition">
                <img src={cartImg} alt="" className="w-5  lg:w-7" />
                <span className="font-bold text-xs md:text-sm lg:text-base flex items-center">
                  Add to Cart
                </span>
              </div>
            </motion.button>
          ) : (
            <motion.div
              animate={{
                opacity: [0.8, 1],
                transition: { duration: 0.5 },
              }}
              exit={{ opacity: 0.7 }}
              className="bg-red-primary flex justify-between px-2 py-2 lg:py-3 items-center mx-auto w-1/2 sm:w-4/5 lg:w-48  rounded-4xl border-rose-400 border-2 absolute overflow-hidden -bottom-6 md:-bottom-6  left-1/2 -translate-x-1/2"
            >
              <button
                whileTap={{ scale: [0.8, 1] }}
                onClick={() => handleClick("decrement")}
                className="active:scale-110 rounded-full border-2 border-white size-5 flex justify-center items-center cursor-pointer hover:bg-white hover:[&_svg]:fill-red-primary hover:[&_svg]:stroke-red-primary focus-visible:bg-white transition focus-visible:[&_svg]:fill-red-primary focus-visible:[&_svg]:stroke-red-primary outline-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="2"
                  fill="none"
                  viewBox="0 0 10 2"
                  className=" fill-white stroke-1 stroke-white"
                >
                  <path d="M0 .375h10v1.25H0V.375Z" />
                </svg>
              </button>
              <motion.span
                key={productQuantity}
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  transition: { duration: 0.05 },
                }}
                className="text-white font-semibold"
              >
                {productQuantity}
              </motion.span>
              <button
                key="increment-btn"
                className="active:scale-110 rounded-full border-2 border-white size-5 flex justify-center items-center cursor-pointer hover:bg-white hover:[&_svg]:fill-red-primary hover:[&_svg]:stroke-red-primary focus-visible:bg-white focus-visible:[&_svg]:fill-red-primary focus-visible:[&_svg]:stroke-red-primary transition outline-0"
                onClick={() => handleClick("increment")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  fill="none"
                  viewBox="0 0 10 10"
                  className=" fill-white stroke-1 stroke-white"
                >
                  <path d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="pt-10">
        <p className="text-rose-400 text-base font-semibold">
          {props.category}
        </p>
        <h3 className="font-base font-bold py-2">{props.name}</h3>
        <p className="text-red-primary text-xl font-bold">
          {`$${props.price.toFixed(2)}`}
        </p>
      </div>
    </div>
  );
};
export default Product;
