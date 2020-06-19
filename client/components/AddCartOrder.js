import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {createTamagotchiOrderThunk} from '../store'

import {Button} from 'react95'

export const addCartOrder = props => {
  const cartId = props.cart[0].id
  const tamagotchiId = props.tamagotchiId
  return (
    <div>
      <Button
        onClick={() =>
          props.createTamagotchiOrder({
            cartId,
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

export default connect(mapStateToProps, mapDispatchToProps)(addCartOrder)
