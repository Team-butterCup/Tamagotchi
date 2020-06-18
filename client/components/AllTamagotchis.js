import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
//import AddTamagotchiForm from "./AddTamagotchiForm";
//import DeleteButton from "./DeleteButton";
import Hourglass from 'react95'

export const AllTamagotchis = props => {
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
                  <img src={tamagotchi.imageUrl} width="100"></img>
                </div>
                <div>{tamagotchi.name}</div>
              </div>
            </NavLink>
            {/* <DeleteButton TamagotchiId={Tamagotchi.id} name={Tamagotchi.name} /> */}
          </div>
        ))
      ) : (
        <Hourglass size={32} />
      )}
    </div>
  )
}

const mapStateToProps = reduxState => {
  return {
    tamagotchis: reduxState.tamagotchis
  }
}

export default connect(mapStateToProps)(AllTamagotchis)
