import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeOrder} from '../store/orders'

import {Button} from 'react95'

export const RemoveCartOrder = props => {
  const order = props.order
  return (
    <div>
      {' '}
      <Button>Remove from Cart</Button>
    </div>
  )
}

const mapStateToProps = reduxState => {
  return {
    order: reduxState.order
  }
}

export default connect(mapStateToProps)(RemoveCartOrder)
