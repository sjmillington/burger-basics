import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux';

class Orders extends Component {

    componentDidMount() {
        this.props.onOrdersInit();
    }

    render () {

        let orderSummary = null;

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
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrdersInit: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios)); 