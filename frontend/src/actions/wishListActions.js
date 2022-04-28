import axios from 'axios'
import {
  WISHLIST_ADD_ITEM,
  WISHLIST_REMOVE_ITEM,
  WISHLIST_SAVE_SHIPPING_ADDRESS,
  WISHLIST_SAVE_PAYMENT_METHOD,
} from '../constants/wishListConstants'

export const addToWishList = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/cats/${id}`)

  dispatch({
    type: WISHLIST_ADD_ITEM,
    payload: {
      cat: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  localStorage.setItem('wishListItems', JSON.stringify(getState().wishList.wishListItems))
}

export const removeFromWishList = (id) => (dispatch, getState) => {
  dispatch({
    type: WISHLIST_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('wishListItems', JSON.stringify(getState().wishList.wishListItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: WISHLIST_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: WISHLIST_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}
