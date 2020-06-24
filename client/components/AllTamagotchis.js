import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {NavLink, withRouter} from 'react-router-dom'

//import DeleteButton from "./DeleteButton";
import {deleteTamagotchiThunk} from '../store/tamagotchis'
import AddCartOrder from './AddCartOrder'
import RemoveCartOrder from './RemoveCartOrder'
import {Hourglass, Button} from 'react95'

const AllTamagotchis = props => {
  const tamagotchis = props.tamagotchis
  const user = props.user
  return (
    <div>
      <div>
        <h1>Browse Adoptable Tamagotchis</h1>
      </div>
      <div className="addButton">
        {!!user.isAdmin && (
          <NavLink to="/add_tamagotchi">
            <Button>Add Tamagotchi</Button>
          </NavLink>
        )}
      </div>
      {tamagotchis !== undefined && tamagotchis.length && props.cart ? (
        tamagotchis.map(tamagotchi => (
          <div key={tamagotchi.id}>
            <NavLink to={`/tamagotchis/${tamagotchi.id}`}>
              <div>
                <div>
                  <img src={tamagotchi.imageUrl} width="100" />
                </div>
                <div>{tamagotchi.name}</div>
              </div>
            </NavLink>
            <AddCartOrder
              tamagotchiId={tamagotchi.id}
              price={tamagotchi.price}
            />
            <RemoveCartOrder />
            {/* <DeleteButton TamagotchiId={Tamagotchi.id} name={Tamagotchi.name} /> */}
            <div className="deleteButton">
              {!!user.isAdmin && (
                <button
                  type="button"
                  onClick={() => props.deleteTamagotchi(tamagotchi.id)}
                >
                  Delete Tamagotchi
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <div>
          <Hourglass size={32} />
          {/* <h1> loading... </h1> */}
        </div>
      )}
    </div>
  )
}

const mapState = reduxState => {
  return {
    tamagotchis: reduxState.tamagotchis,
    cart: reduxState.ordersAndCart,
    user: reduxState.user
  }
}

const mapDispatch = dispatch => ({
  deleteTamagotchi: tamagotchiId =>
    dispatch(deleteTamagotchiThunk(tamagotchiId))
})

export default withRouter(connect(mapState, mapDispatch)(AllTamagotchis))
