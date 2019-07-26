import * as actionTypes from './actionTypes'
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        id: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json')
            .then(res => {
                dispatch(fetchOrdersSuccess(res));
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
            });
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        purchaseBurgerStart();
        axios.post( '/orders.json', orderData )
            .then( response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            } )
            .catch( error => {
                dispatch(purchaseBurgerFail(error));
            } );
    }
}

export const purchaseBurgerInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}