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
import Search from "./screens/Search";
import KioskScreen from "./screens/KioskScreen";
import ProductList from "./screens/ProductList";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Guest>
            <Dashboard />
          </Guest>
        </Route>
        <Route path="/HomeScreen" exact>
          <Auth>
            <HomeScreen />
          </Auth>
        </Route>
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
        <Route path="/search/:id" component={Search} />
        <Route path="/kiosk" component={KioskScreen} />
        <Route path="*" component={NotFound} />
        <Route path="/ProductList" component={ProductList} />
      </Switch>
    </Router>
  );
};

export default App;
