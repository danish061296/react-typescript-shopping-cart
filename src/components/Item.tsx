import React from "react";
import { Button } from "@material-ui/core";
// types
import { CartItemType } from "../App";
// styles
import { Wrapper } from "./ItemStyles";

type Props = {
  item: CartItemType;
  addItemsToCart: (item: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, addItemsToCart }) => (
  <Wrapper>
    <img src={item.image} alt={item.title} />
    <div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <h3>${item.price}</h3>
    </div>
    <Button onClick={() => addItemsToCart(item)}>Add to Cart</Button>
  </Wrapper>
);

export default Item;
