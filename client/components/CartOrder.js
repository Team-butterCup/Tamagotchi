import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {NavLink, withProvider} from 'react-router-dom'
import {Hourglass, Cutout, Bar, Button} from 'react95'
import RemoveCartOrder from './RemoveCartOrder'
import AddCartOrder from './AddCartOrder'

import {createOrderThunk, fetchOrders} from '../store'

export const cartOrder = props => {
  const cart = props.cart

  useEffect(() => {
    async function idk() {
      await props.createOrder({id: cart.id})
      await props.setOrders()
    }
    idk()
  }, [])

  return (
    <div>
      <h1>Cart</h1>
      {cart !== undefined && cart.tamagotchis ? (
        cart.tamagotchis.map(tamagotchi => (
          <div
            key={`${cart.id},${tamagotchi.id}`}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly'
            }}
          >
            <Cutout>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Bar />
                Name: {tamagotchi.name}
                <Bar />
                Adoption Fee: {tamagotchi.price}
                <Bar />
                Qty: {tamagotchi.TamagotchiOrder.qty}
                <Bar />
                <AddCartOrder tamagotchiId={tamagotchi.id} />
                <Bar />
                <RemoveCartOrder
                  orderId={cart.id}
                  tamagotchiId={tamagotchi.id}
                />
              </div>
            </Cutout>
          </div>
        ))
      ) : (
        <div>
          <Hourglass size={32} />
        </div>
      )}
      <div>
        <NavLink to="/checkout">
          <Button>Proceed to Checkout</Button>
        </NavLink>
      </div>
    </div>
  )
}

const mapStateToProps = reduxState => {
  return {
    isLoggedIn: !!reduxState.user.id,
    cart: reduxState.ordersAndCart.cart,
    user: reduxState.user
  }
}

const mapDispatch = dispatch => {
  return {
    createOrder: order => dispatch(createOrderThunk(order)),
    setOrders: () => dispatch(fetchOrders())
  }
}

export default connect(mapStateToProps, mapDispatch)(cartOrder)
