import {combineReducers} from 'redux'
import {cartItems, IncrementDecrement} from './reducer'

const rootReducer = combineReducers({
    cartItems: cartItems,
    IncrementDecrement:IncrementDecrement
})
export default rootReducer;