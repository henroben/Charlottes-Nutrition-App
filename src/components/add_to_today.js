import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addDailyFood } from '../actions/index';
import _ from 'lodash';

class AddToToday extends Component {

    clickHandler(ndbno, measure, serving) {
        this.props.addDailyFood(ndbno, measure, serving);
    }

    checkIfAdded(ndbno, foodeaten) {

        let foodFound = _.filter(foodeaten, (food) => {
            console.log(`in array: ${food.ndbno}, comparing to: ${ndbno}`);
            return food.ndbno === ndbno;
        });

        if (foodFound.length >= 1) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        if(this.checkIfAdded(this.props.ndbno, this.props.foodeaten) === false) {
            return(
                <div className="pull-right add-link" onClick={this.clickHandler.bind(this, this.props.ndbno, this.props.measure, this.props.servings)}><i className="fa fa-share"></i> Add<br/><small>to today</small></div>
            );
        } else {
            return(
                <div className="pull-right"><i className="fa fa-check"></i> Added<br/><small>to today</small></div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        foodeaten: state.dayTrackingData.fooditems
    }
}

export default connect(mapStateToProps, {addDailyFood})(AddToToday);