import React from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Login from "./screens/Login";
import Register from "./screens/Register";
import CartScreen from "./screens/CartScreen";
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
import DetailProduct from "./screens/DetailProduct";
import Freezer from "./screens/Freezer";
import HeaderHS from "./components/HeaderHS";
import Footer from "./components/Footers";
import TrendingProduct from "./components/TrendingProduct/TrendingProduct";
import Profile from "./screens/Profile";
import Wishlist from "./screens/Wishlist";
import Checkout from "./screens/Checkout";
import NewArrivalScreen from "./screens/NewArrivalScreen";

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
            <HeaderHS />
            <Profile />
            <Footer />
          </Auth>
        </Route>
        <Route path="/NewArrival">
          <Auth>
            <HeaderHS />
            <NewArrivalScreen />
            <Footer />
          </Auth>
        </Route>
        <Route path="/wishlist">
          <Auth>
            <HeaderHS />
            <Wishlist />
            <Footer />
          </Auth>
        </Route>
        <Route path="/cart/:id?">
          <Auth>
            <CartScreen />
          </Auth>
        </Route>
        <Route path="/checkout">
          <Auth>
            <HeaderHS />
            <Checkout />
            <Footer />
          </Auth>
        </Route>
        <Route path="/payment">
          <Auth>
            <PaymentScreen />
          </Auth>
        </Route>
        <Route path="/DetailProduct/:id">
          <Auth>
            <HeaderHS />
            <DetailProduct />
            <TrendingProduct />
            <Footer />
          </Auth>
        </Route>
        <Route path="/Freezer">
          <Auth>
            <HeaderHS />
            <Freezer />
            <TrendingProduct />
            <Footer />
          </Auth>
        </Route>
        <Route path="/NotFound">
          <Auth>
            <NotFound />
          </Auth>
        </Route>
        <Route path="/placeorder" component={PlaceOrderScreen} />
        <Route path="/order" component={OrderScreen} />
        <Route path="/search/:id" component={Search} />
        <Route path="/kiosk" component={KioskScreen} />
        <Route path="/ProductList" component={ProductList} />
      </Switch>
    </Router>
  );
};

export default App;
