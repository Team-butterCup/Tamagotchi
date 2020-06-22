import React from 'react'
import {connect} from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import {Button} from 'react95'

export const Checkout = props => {
  const orders = props.orders
  const makePayment = token => {
    const body = {
      token,
      product
    }
  }
  return (
    <StripeCheckout
      stripeKey={process.env.REACT_APP_KEY}
      token={makePayment}
      name="Buy Tamagotchi"
      amount={product.price * 100}
    >
      <Button>
        Pay $
        {orders
          .map(order => order.tamagotchi)
          .map(tamagotchi => tamagotchi.price)}
      </Button>
    </StripeCheckout>
  )
}

const mapStateToProps = reduxState => {
  return {
    orders: reduxState.ordersAndCart.orders,
    user: reduxState.user
  }
}

export default connect(mapStateToProps)(Checkout)
