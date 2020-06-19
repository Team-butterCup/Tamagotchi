import React from 'react'
import {connect} from 'react-redux'
import {NavLink, withRouter} from 'react-router-dom'

//import AddTamagotchiForm from "./AddTamagotchiForm";
//import DeleteButton from "./DeleteButton";

import AddCartOrder from './AddCartOrder'
import RemoveCartOrder from './RemoveCartOrder'
import {Hourglass, Button} from 'react95'

const AllTamagotchis = props => {
  const tamagotchis = props.tamagotchis
  return (
    <div>
      <div>
        <h1>Browse Adoptable Tamagotchis</h1>
      </div>
      {/* <div>
        <AddTamagotchiForm />
      </div> */}
      {tamagotchis !== undefined && tamagotchis.length ? (
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
            <AddCartOrder tamagotchiId={tamagotchi.id} />
            <RemoveCartOrder />
            {/* <DeleteButton TamagotchiId={Tamagotchi.id} name={Tamagotchi.name} /> */}
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
    tamagotchis: reduxState.tamagotchis
  }
}

export default withRouter(connect(mapState)(AllTamagotchis))
