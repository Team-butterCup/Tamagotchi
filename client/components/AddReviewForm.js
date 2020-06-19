import React from 'react'
import {connect} from 'react-redux'
import {updateDraft, resetDraft, postReview} from '../store'
import {withRouter} from 'react-router-dom'

import {TextField, Button, Toolbar, Cutout, NumberField} from 'react95'

class ControlledTextFieldExample extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.reset = this.reset.bind(this)
  }
  async componentDidMount() {
    await this.props.updateDraft({
      rating: 5,
      description: ''
    })
  }

  handleChange(e) {
    if (typeof e === 'number') this.props.updateDraft({rating: e})
    else this.props.updateDraft({[e.target.name]: e.target.value})
  }

  async handleSubmit(e) {
    e.preventDefault()
    await this.props.updateDraft({
      tamagotchiId: Number(this.props.tamagotchiId),
      userId: this.props.user.id || null
    })
    await this.props.postReview(this.props.draft)
    this.props.resetDraft()
  }
  reset() {
    this.props.resetDraft()
  }
  render() {
    return (
      <Toolbar>
        <form>
          <div>
            <Cutout>
              <div style={{flexDirection: 'column'}}>
                <p style={{lineHeight: 1.3}}>Rate this Tamagotchi!</p>
                <NumberField
                  style={{flexDirection: 'row'}}
                  value={this.props.draft.rating}
                  min={1}
                  max={5}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <TextField
                  value={this.props.draft.description}
                  name="description"
                  onChange={this.handleChange}
                />
                <div
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    width: '100%'
                  }}
                >
                  <Button onClick={this.reset} style={{marginLeft: '2px'}}>
                    Reset
                  </Button>
                  <Button
                    onClick={this.handleSubmit}
                    style={{marginLeft: '2px'}}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </Cutout>
          </div>
        </form>
      </Toolbar>
    )
  }
}

const mapState = reduxState => {
  return {
    draft: reduxState.reviewDraft,
    user: reduxState.user
  }
}

const mapDispatch = dispatch => {
  return {
    updateDraft: reviewDraft => dispatch(updateDraft(reviewDraft)),
    postReview: review => dispatch(postReview(review)),
    resetDraft: () => dispatch(resetDraft())
  }
}

export default withRouter(
  connect(mapState, mapDispatch)(ControlledTextFieldExample)
)
