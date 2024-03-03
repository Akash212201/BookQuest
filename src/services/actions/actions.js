export const addToCart = ({data}) =>{
    return {
        type: 'ADD_TO_CART',
        data: data
    }
}
export const removeFromCart = ({data}) =>{
    return {
        type: 'REMOVE_FROM_CART',
        data: data
    }
}
export const Increment = ({data}) =>{
    return {
        type: 'INCREMENT',
        data: data
    }
}
export const  Decrement = ({data}) =>{
    return {
        type: 'DECREMENT',
        data: data
    }
}