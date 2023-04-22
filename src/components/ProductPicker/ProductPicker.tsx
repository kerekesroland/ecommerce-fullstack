import { useState } from "react";
import { IProduct } from "../../models/IProduct";
import styles from "./ProductPicker.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { createPortal } from "react-dom";
import CustomSwiper from "../CustomSwiper/CustomSwiper";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addToCart } from "../../store/slices/cartSlice";

interface IProductPicker {
  products: IProduct[];
}

interface IProductPickerPopup {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  products: IProduct[];
  handleAddToCart: (product: IProduct) => void;
}

const ProductPicker = ({ products }: IProductPicker) => {
  const dispatch: AppDispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const handleAddToCart = (product: IProduct) => {
    dispatch(
      addToCart({
        ...product,
        quantity: 1,
        gift: true,
        price: 0,
        id: product.id.concat("BONUS"),
      })
    );
    onClose();
  };

  return (
    <div className={styles.product_picker_container}>
      <button onClick={onOpen} type="button" className={styles.animatedBtn}>
        Choose a custom <b>bonus item</b>
      </button>

      {isOpen ? (
        <ProductPickerPopup
          handleAddToCart={handleAddToCart}
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          products={products}
        />
      ) : null}
    </div>
  );
};

const ProductPickerPopup = ({
  isOpen,
  onOpen,
  onClose,
  products,
  handleAddToCart,
}: IProductPickerPopup) => {
  const productPickerModal = document.getElementById("product-picker-modal");

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!productPickerModal) return null;
  return createPortal(
    <div onClick={handleOverlayClick} className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <div className={styles.modal_header}>
          <h2>Choose a bonus item!</h2>
        </div>
        <div className={styles.products_container}>
          <CustomSwiper handleSelectProduct={handleAddToCart} data={products} />
        </div>
        <div className={styles.close_btn} onClick={onClose}>
          <CloseIcon style={{ fill: "crimson", fontSize: "2.2rem" }} />
        </div>
      </div>
    </div>,
    productPickerModal
  );
};

export default ProductPicker;
