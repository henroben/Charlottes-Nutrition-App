import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addDailyFood } from '../actions/index';

class AddToToday extends Component {

    clickHandler(ndbno, measure, serving) {
        this.props.addDailyFood(ndbno, measure, serving);
    }

    render() {
        return(
            <div className="pull-right add-link" onClick={this.clickHandler.bind(this, this.props.ndbno, this.props.measure, this.props.servings)}><i className="fa fa-share"></i> Add<br/><small>to today</small></div>
        );
    }
}

function mapStateToProps(state) {
    console.log('state', state);
    return {
        ...state,
        searchtext: state.searchtext.text
    }
}

export default connect(null, {addDailyFood})(AddToToday);