import CartItem from "./CartItem";
import { Wrapper } from "./Cart.styles";
import { CartItemType } from "../App";

type Props = {
  cartItems: CartItemType[];
  addItemsToCart: (item: CartItemType) => void;
  removeItems: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addItemsToCart, removeItems }) => {
  const calculateTotalAmount = (items: CartItemType[]) => {
    return items.reduce(
      (acc: number, item) => acc + item.amount * item.price,
      0
    );
  };

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in your shopping cart</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addItemsToCart={addItemsToCart}
          removeItems={removeItems}
        />
      ))}
      <h2>Total: ${calculateTotalAmount(cartItems).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default Cart;
