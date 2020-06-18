import React from 'react'
import {connect} from 'react-redux'
import {updateDraft, resetDraft, postReview} from '../store'

import {TextField, Button, Toolbar, Cutout, NumberField} from 'react95'

class ControlledTextFieldExample extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.reset = this.reset.bind(this)
  }
  componentDidMount() {
    this.props.updateDraft({
      rating: 5,
      description: ''
    })
  }

  handleChange(e) {
    this.props.updateDraft({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.postProject(this.props.projectDraft)
    this.props.resetDraft()
  }
  reset(e) {
    this.props.resetDraft()
  }
  render() {
    return (
      <Toolbar>
        <form>
          <NumberField
            value={this.props.draft.rating}
            name="rating"
            min="1"
            max="5"
            width={94}
            onChange={this.handleChange}
          />
          <TextField
            value={this.props.draft.description}
            onChange={this.handleChange}
          />
          <Button onClick={this.reset} style={{marginLeft: '2px'}}>
            Reset
          </Button>
        </form>
      </Toolbar>
    )
  }
}

const mapState = reduxState => {
  return {
    draft: reduxState.draft
  }
}

const mapDispatch = dispatch => {
  return {
    updateDraft: reviewDraft => dispatch(updateDraft(reviewDraft)),
    postReview: review => dispatch(postReview(review)),
    resetDraft: () => dispatch(resetDraft())
  }
}

export default connect(mapState, mapDispatch)(ControlledTextFieldExample)
