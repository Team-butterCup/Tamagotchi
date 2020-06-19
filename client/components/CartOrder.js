import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import addCartOrder from './AddCartOrder'
import removeCartOrder from './RemoveCartOrder'

import {Button} from 'react95'

export const cartOrder = props => {
  const order = props.order
  return (
    <div>
      <h1>Cart</h1>{' '}
      <form>
        <input name="qty" type="number" min="0" max="1000" />
      </form>
    </div>
  )
}

const mapStateToProps = reduxState => {
  return {
    order: reduxState.order
  }
}

export default connect(mapStateToProps)(cartOrder)
