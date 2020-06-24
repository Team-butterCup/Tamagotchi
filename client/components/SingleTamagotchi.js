import React from 'react'
import {fetchSingleTamagotchi} from '../store/singleTamagotchi'
import {connect} from 'react-redux'
import {withRouter, NavLink} from 'react-router-dom'
import Reviews from './review'
import {Cutout, Window, WindowContent, Button, Bar} from 'react95'
import AddCartOrder from './AddCartOrder'
import RemoveCartOrder from './RemoveCartOrder'

class SingleTamagotchi extends React.Component {
  componentDidMount() {
    const id = Number(this.props.match.params.tamagotchiId)
    this.props.getSingleTamagotchi(id)
  }
  render() {
    let {
      name,
      description,
      price,
      age,
      qty,
      imageUrl,
      id
    } = this.props.tamagotchi
    let user = this.props.user
    console.log('user', user)

    return (
      <div>
        <h2>Name: {name}</h2>
        <img src={imageUrl} />
        <h3>age: {age}</h3>
        <h3>description: {description}</h3>
        <h3>price: {price}</h3>
        <h3>quantity: {qty}</h3>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <h3 style={{marginRight: '5px'}}>Add one to Cart //</h3>
          <AddCartOrder tamagotchiId={id} price={price} />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <h3 style={{marginRight: '5px'}}>Remove from Cart //</h3>
          <RemoveCartOrder />
        </div>
        <div>
          <Reviews tamagotchiId={id} />
        </div>
      </div>
    )
  }
}

const mapState = reduxState => ({
  tamagotchi: reduxState.singleTamagotchi
})

const mapDispatch = dispatch => ({
  getSingleTamagotchi: tamagotchiId =>
    dispatch(fetchSingleTamagotchi(tamagotchiId))
})

export default withRouter(connect(mapState, mapDispatch)(SingleTamagotchi))
