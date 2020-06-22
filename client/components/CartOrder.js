import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export const cartOrder = props => {
  const orders = props.orders
  const cart = orders.filter(
    order => order.userId === props.user.id && order.status === 'cart'
  )[0]
  // const tamagotchiOrders = cart.getTamagotchis()
  // console.log('tamagotchiOrders', tamagotchiOrders)
  return (
    <div>
      <h1>Cart</h1>
      <form>
        <input name="qty" type="number" min="0" max="1000" />
      </form>
    </div>
  )
}

const mapStateToProps = reduxState => {
  return {
    orders: reduxState.ordersAndCart.orders,
    user: reduxState.user
  }
}

export default connect(mapStateToProps)(cartOrder)
