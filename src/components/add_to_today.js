import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addDailyFood } from '../actions/index';

class AddToToday extends Component {

    clickHandler(ndbno) {
        this.props.addDailyFood(ndbno);
    }

    render() {
        return(
            <div className="pull-right add-link" onClick={this.clickHandler.bind(this, this.props.ndbno)}><i className="fa fa-share"></i> Add<br/><small>to today</small></div>
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