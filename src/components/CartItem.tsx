import { Button } from "@material-ui/core";
import { CartItemType } from "../App";
import { Wrapper } from "./CartItem.styles";

type Props = {
  item: CartItemType;
  addItemsToCart: (item: CartItemType) => void;
  removeItems: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ item, addItemsToCart, removeItems }) => {
  return (
    <Wrapper>
      <div>
        <h3>{item.title}</h3>
        <div className="items__info">
          <p>Price ${item.price}</p>
          <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <h4>Amount</h4>
        </div>
        <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeItems(item.id)}
          >
            {" "}
            -{" "}
          </Button>
          <p>{item.amount}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addItemsToCart(item)}
          >
            {" "}
            +{" "}
          </Button>
        </div>
      </div>
      <img src={item.image} alt={item.title} />
    </Wrapper>
  );
};

export default CartItem;
