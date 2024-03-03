const initialState= {
    cartData: [],
}

export const cartItems = (state = initialState,action) => {
  switch(action.type){
    case 'ADD_TO_CART':
        return { 
            ...state,
            cartData: action.data
        }
        break;
    default:
        return state
  }
}
const state=0;
export const IncrementDecrement = (state,action) =>{
    switch(action.type) {
        case 'INCREMENT':
            return state+1;        
        break;

        case 'DECREMENT':
        return state-1;
        break;

        default:
        return state}
}
