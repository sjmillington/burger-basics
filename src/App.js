import React, { Component, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'))
const Orders = React.lazy(() => import('./containers/Orders/Orders'))
const Auth = React.lazy(() => import('./containers/Auth/Auth'))
const Logout = React.lazy(() => import('./containers/Auth/Logout/Logout'))



class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignup();
  }

  render () {

    //redirect could be a specific 404 page. 

    let routes = (
      <Switch>
        <Suspense fallback={<div>Loading...</div>}>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" /> 
        </Suspense>
      </Switch>
    );

    if(this.props.isAuthenticated){
      routes = (
          
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" component={Orders} />
              <Route path="/auth" component={Auth} />
              <Route path="/logout" component={Logout} />
              <Route path="/" exact component={BurgerBuilder} />
              <Redirect to="/" /> 
              </Switch>
            </Suspense>
                  
      )
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
