import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeCartItem, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      // TODO: Update the functionality to remove all the items in the cart

      const removeCartItemFunction = () => {
        removeAllCartItems()
      }

      let price = null
      const cartSummery = () => {
        cartList.forEach(item => {
          price += item.price * item.quantity
        })

        return (
          <div className="order_summery">
            <div className="order_tab">
              <h1>
                Order Total :
                <span style={{fontWeight: 'bold'}}> RS {price}/-</span>
              </h1>
              <p>{cartList.length} items in cart</p>
              <button
                type="button"
                style={{
                  border: 'none',
                  color: 'white',
                  padding: '10px',
                  backgroundColor: 'blue',
                  width: '100%',
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        )
      }
      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <div style={{textAlign: 'end', width: '100%'}}>
                  <button
                    style={{
                      border: 'none',
                      backgroundColor: 'white',
                      color: 'blue',
                      width: '90px',
                    }}
                    type="button"
                    onClick={removeCartItemFunction}
                  >
                    Remove all
                  </button>
                </div>
                <CartListView />
                {cartSummery()}
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
