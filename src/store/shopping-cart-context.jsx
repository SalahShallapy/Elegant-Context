import { useState, useReducer } from "react";
import { createContext } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products.js";

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

const shoppingCartReducer = function (state, action) {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];

    // Check if the item already exists in the cart
    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload
    );

    if (existingCartItemIndex >= 0) {
      // If the item exists, update its quantity
      const updatedItem = {
        ...updatedItems[existingCartItemIndex],
        quantity: updatedItems[existingCartItemIndex].quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // If the item does not exist, add it to the cart
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload
      );
      if (product) {
        updatedItems.push({
          id: action.payload,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }
    }

    // Return the updated cart state
    return { items: updatedItems };
  }

  if (action.type === "UPDATE_ITEM") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
    };
  }

  return state;
};

export default function CartContextProvidor({ children }) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: [],
    }
  );

  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      payload: id,
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: "UPDATE_ITEM",
      payload: {
        productId,
        amount,
      },
    });
  }

  const contextValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
