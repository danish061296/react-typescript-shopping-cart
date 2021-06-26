import { useState } from "react";
import { useQuery } from "react-query";
// UI components
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Item from "./components/Item";
import Cart from "./components/Cart";

// styles
import { Wrapper, DrawerButton } from "./styles/App.styles";
import { Drawer, LinearProgress, Grid, Badge } from "@material-ui/core";

// types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> => {
  return await (await fetch("https://fakestoreapi.com/products")).json();
};

const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  console.log(data);

  // get total sum of items selected
  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((acc: number, item) => acc + item.amount, 0);

  const addItemsToCart = (selectedItem: CartItemType) => {
    setCartItems((prevItems) => {
      // check if the item is already in the cart
      const isItemInCart = prevItems.find(
        (item) => item.id === selectedItem.id
      );
      if (isItemInCart) {
        return prevItems.map((item) =>
          item.id === selectedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // when first time the item is added
      return [...prevItems, { ...selectedItem, amount: 1 }];
    });
  };

  const removeItems = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong...</div>;

  return (
    <Wrapper>
      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      >
        <Cart
          cartItems={cartItems}
          addItemsToCart={addItemsToCart}
          removeItems={removeItems}
        />
      </Drawer>
      <DrawerButton onClick={() => setIsCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </DrawerButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} addItemsToCart={addItemsToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
