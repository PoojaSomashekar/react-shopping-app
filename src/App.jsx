import classes from './App.module.css';
import ProductList from './components/ProductList';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductDetails from './components/ProductDetails';
import WishList from './components/WishList';
import Cart from './components/Cart';
import Home from './components/Home';
import RootLayout from './components/Root';

const router = createBrowserRouter([
  {path: '/', element: <RootLayout />, children: [
    {path: '/', element: <Home />},
  {path: '/productList', element: <ProductList />},
  {path: '/productList/:category', element: <ProductList />},
  {path: '/productDetails', element: <ProductDetails />},
  {path: '/productDetails/:productItem', element: <ProductDetails />},
  {path: '/wishList', element: <WishList />},
  {path: '/cart', element: <Cart />},
  ]},
]);
const App = () => {
  return <div className={classes.container}>
  <RouterProvider router={router}></RouterProvider>
  </div>;
}

export default App;
