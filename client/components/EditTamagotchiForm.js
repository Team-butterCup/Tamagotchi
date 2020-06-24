//MAKE THIS ADMIN TRUE

import React from 'react'
import {editTamagotchiThunk} from '../store/singleTamagotchi'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
// import { Button } from 'react95'

class EditTamagotchiForm extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event) {
    event.preventDefault()
    const editedTamagotchi = {
      name: event.target.name.value,
      age: event.target.age.value,
      description: event.target.description.value,
      price: event.target.price.value,
      qty: event.target.qty.value,
      imageUrl: event.target.imageUrl.value,
      id: this.props.tamagotchiId
    }

    this.props.editTamagotchi({
      editedTamagotchi
    })
  }

  render() {
    return (
      <form className="tamagotchi-form" onSubmit={this.handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input name="name" type="text" />
        <label htmlFor="age">Age: </label>
        <select name="age">
          <option defaultValue="selectAge">Select tamagotchi's age. . .</option>
          <option value="egg">Egg</option> <option value="baby">Baby</option>
          <option value="preteen">Preteen</option>
          <option value="teen">Teen</option>
          <option value="adult">Adult</option>
          <option value="senior">Senior</option>
          <option value="boomer">Boomer</option>
        </select>
        <label htmlFor="description">Description: </label>
        <textarea name="description" />
        <label htmlFor="price">Price: </label>
        <input name="price" type="number" />
        <label htmlFor="qty">Qty: </label>
        <input name="qty" type="number" />
        <label htmlFor="imageUrl">Image Url: </label>
        <input name="imageUrl" type="url" />
        <button type="submit" className="addButton">
          Save Changes
        </button>
      </form>
    )
  }
}

const mapDispatch = dispatch => ({
  editTamagotchi: editedTamagotchi =>
    dispatch(editTamagotchiThunk(editedTamagotchi))
})

export default withRouter(connect(null, mapDispatch)(EditTamagotchiForm))
