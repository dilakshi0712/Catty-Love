import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  catListReducer,
  catDetailsReducer,
  catDeleteReducer,
  catCreateReducer,
  catUpdateReducer,
  catReviewCreateReducer,
  catTopRatedReducer,
} from './reducers/catReducers'
import { wishListReducer } from './reducers/wishListReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers'

const reducer = combineReducers({
  catList: catListReducer,
  catDetails: catDetailsReducer,
  catDelete: catDeleteReducer,
  catCreate: catCreateReducer,
  catUpdate: catUpdateReducer,
  catReviewCreate: catReviewCreateReducer,
  catTopRated: catTopRatedReducer,
  wishList: wishListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
})

const wishListItemsFromStorage = localStorage.getItem('wishListItems')
  ? JSON.parse(localStorage.getItem('wishListItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initialState = {
  wishList: {
    wishListItems: wishListItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
