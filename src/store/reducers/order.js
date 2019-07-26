import * as actionTypes from '../actions/actionTypes'

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = initialState, action) => {

    switch(action.type){
        case actionTypes.PURCHASE_BURGER_SUCCESS: 
            const newOrder = {
                ...action.orderData,
                id: action.id
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            };
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }    
        case actionTypes.PURCHASE_INIT: 
            return {
                ...state,
                purchased: false
            }   
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_ORDERS_SUCCESS:
                const fetchedOrders = [];
                for (let key in action.orders.data) {
                    fetchedOrders.push({
                        ...action.orders.data[key],
                        id: key
                    });
                }
            return{
                ...state,
                orders: fetchedOrders,
                loading: false
            }   
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        default: return state;    
    }

}

export default reducer;