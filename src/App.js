import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
    totalPrice: 0,
  }

  removeAllCartItems = () => {
    console.log('remove')
    this.setState({cartList: []})
  }
  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const findProduct = cartList.find(item => item.id === product.id)

    if (findProduct) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item => {
          if (item.id === product.id) {
            const updatedData = item.quantity + product.quantity
            return {...item, quantity: updatedData}
          }
          return item
        }),
      }))
    } else {
      const updatedList = [...cartList, product]
      this.setState({cartList: updatedList})
    }
  }

  incrementCartItemQuantity = product => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item => {
        if (item.id === product.id) {
          const update = item.quantity + 1
          return {...item, quantity: update}
        }
        return item
      }),
    }))
  }

  decrementCartItemQuantity = product => {
    const {cartList} = this.state

    const listProduct = cartList.find(item => item.id === product.id)

    if (listProduct.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item => {
          if (item.id === product.id) {
            const update = item.quantity - 1
            return {...item, quantity: update}
          }
          return item
        }),
      }))
    } else {
      this.removeCartItem(product.id)
    }
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(item => item.id !== id),
    }))
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,

          removeAllCartItems: this.removeAllCartItems,
          removeCartItem: this.removeCartItem,
          orderSummery: this.orderSummery,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
