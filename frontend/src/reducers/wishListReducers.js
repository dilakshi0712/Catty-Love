import {
  WISHLIST_ADD_ITEM,
  WISHLIST_REMOVE_ITEM,
  WISHLIST_SAVE_SHIPPING_ADDRESS,
  WISHLIST_SAVE_PAYMENT_METHOD,
  WISHLIST_CLEAR_ITEMS,
} from '../constants/wishListConstants'

export const wishListReducer = (
  state = { wishListItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case WISHLIST_ADD_ITEM:
      const item = action.payload

      const existItem = state.wishListItems.find((x) => x.cat === item.cat)

      if (existItem) {
        return {
          ...state,
          wishListItems: state.wishListItems.map((x) =>
            x.cat === existItem.cat ? item : x
          ),
        }
      } else {
        return {
          ...state,
          wishListItems: [...state.wishListItems, item],
        }
      }
    case WISHLIST_REMOVE_ITEM:
      return {
        ...state,
        wishListItems: state.wishListItems.filter((x) => x.cat !== action.payload),
      }
    case WISHLIST_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }
    case WISHLIST_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      }
    case WISHLIST_CLEAR_ITEMS:
      return {
        ...state,
        wishListItems: [],
      }
    default:
      return state
  }
}
