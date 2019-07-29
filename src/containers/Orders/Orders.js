import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import { connect } from 'react-redux';

class Orders extends Component {

    componentDidMount() {
        this.props.onOrdersInit(this.props.token, this.props.userId);
    }

    render () {

        let orderSummary = <Spinner />

        if(this.props.orders){
            orderSummary = (      
                this.props.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))
            )
        }

        return orderSummary;
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrdersInit: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios)); 