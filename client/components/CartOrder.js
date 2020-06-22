import React from 'react'
import {connect} from 'react-redux'
import {Link, withProvider} from 'react-router-dom'
import {Hourglass, Cutout, Bar} from 'react95'
import RemoveCartOrder from './RemoveCartOrder'

export const cartOrder = props => {
  const cart = props.cart
  // const tamagotchiOrders = cart.getTamagotchis()
  // console.log('tamagotchiOrders', tamagotchiOrders)
  return (
    <div>
      <h1>Cart</h1>
      {cart !== undefined && cart.tamagotchis ? (
        cart.tamagotchis.map(tamagotchiOrder => (
          <div
            key={`${cart.id},${tamagotchiOrder.id}`}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly'
            }}
          >
            <Cutout>
              <div>
                <Bar />
                {tamagotchiOrder.name}
                <Bar />
                {tamagotchiOrder.price}
                <Bar />
              </div>
            </Cutout>
            <RemoveCartOrder />
          </div>
        ))
      ) : (
        <div>
          <Hourglass size={32} />
        </div>
      )}
    </div>
  )
}

const mapStateToProps = reduxState => {
  return {
    cart: reduxState.ordersAndCart.cart,
    user: reduxState.user
  }
}

export default connect(mapStateToProps)(cartOrder)
