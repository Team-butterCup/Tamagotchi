import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {createTamagotchiOrderThunk} from '../store'

import {Button} from 'react95'

export const addCartOrder = props => {
  const orderId = props.cart.id
  const tamagotchiId = props.tamagotchiId
  return (
    <div>
      <Button
        onClick={() =>
          props.createTamagotchiOrder({
            orderId,
            tamagotchiId
          })
        }
      >
        Add to Cart
      </Button>
    </div>
  )
}

const mapStateToProps = reduxState => {
  return {
    cart: reduxState.ordersAndCart.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createTamagotchiOrder: ids => dispatch(createTamagotchiOrderThunk(ids))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(addCartOrder)
)
