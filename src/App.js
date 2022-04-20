import React from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SingleProduct from "./screens/SingleProduct";
import Login from "./screens/Login";
import Register from "./screens/Register";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import NotFound from "./screens/NotFound";
import Dashboard from "./screens/Dashboard";
import Auth from './middleware/auth';
import Guest from './middleware/guest';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Dashboard} exact />
        <Route path="/HomeScreen" component={HomeScreen} exact />
        <Route path="/products/:id" component={SingleProduct} />
        <Route path="/login">
          <Guest>
            <Login />
          </Guest>
        </Route>
        <Route path="/register">
          <Guest>
            <Register />
          </Guest>
        </Route>
        <Route path="/profile">
          <Auth>
            <ProfileScreen />
          </Auth>
        </Route>
        <Route path="/cart/:id?">
          <Auth>
            <CartScreen />
          </Auth>
        </Route>
        <Route path="/shipping">
          <Auth>
            <ShippingScreen />
          </Auth>
        </Route>
        <Route path="/payment">
          <Auth>
            <PaymentScreen />
          </Auth>
        </Route>
        <Route path="/placeorder" component={PlaceOrderScreen} />
        <Route path="/order" component={OrderScreen} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
