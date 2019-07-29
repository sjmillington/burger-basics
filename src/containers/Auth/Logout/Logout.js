import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';

class Logout extends Component {

    componentDidMount(){
        this.props.onLogout();
    }

    render (){
        return (
            <Redirect to="/"/>
        );
    }
}

const mapDispatchToPros = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToPros)(Logout);