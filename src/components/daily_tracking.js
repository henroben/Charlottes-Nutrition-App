import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchFoods from './food_search/search';
import DisplayFoodData from './food_search/display_food_data';
import { startSaveDailyTracker, startUpdateDailyTracker, startReadDailyTracker } from '../actions';

class DailyTracking extends Component {

    componentDidMount() {
        console.log('DailyTracking did mount');
        let today = new Date().toDateString();
        let date = JSON.stringify(new Date(today));
        this.props.startReadDailyTracker(date);
    }

    displayFoodEaten(foodEaten) {
        console.log('food eaten', this.props.foodeaten);

            return foodEaten.map((food) => {
                return(
                    <li className="list-group-item" key={food.ndbno}>
                        <div className="row">
                            <div className="col-xs-9">
                                {food.name}
                            </div>
                            <div className="col-xs-3">
                                <span className="pull-right">
                                    <i className="fa fa-cog fa-lg fa-fw"></i> <i className="fa fa-times fa-lg fa-fw"></i>
                                </span>
                            </div>
                        </div>
                    </li>
                );
            });

    }

    handleSaveData(foodEaten, today) {
        let date = JSON.stringify(new Date(today));
        console.log(date);
        this.props.startSaveDailyTracker(foodEaten, date);
    }

    handleUpdateData(foodEaten, ref, today) {
        console.log('firebase ref is', ref);
        let date = JSON.stringify(new Date(today));
        // call update action and update firebase db
        this.props.startUpdateDailyTracker(foodEaten, today, ref);
    }

    displaySaveButton(foodEaten, today) {
        if(foodEaten.length > 0) {
            if(this.props.foodref) {
                return(
                    <button className="btn btn-primary btn-block" onClick={this.handleUpdateData.bind(this, foodEaten, this.props.foodref, today)}>Update Data for {today}</button>
                );
            } else {
                return(
                    <button className="btn btn-primary btn-block" onClick={this.handleSaveData.bind(this, foodEaten, today)}>Save Data for {today}</button>
                );
            }

        }
    }

    render() {
        console.log('tracking', this.props.location);
        let today = new Date().toDateString();
        return(
            <div className="panel panel-success">
               <div className="panel-heading"><h4>Daily Tracking for {today}</h4></div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-xs-8">
                            <ul className="list-group">
                                {this.displayFoodEaten(this.props.foodeaten)}
                                {this.displaySaveButton(this.props.foodeaten, today)}
                            </ul>
                        </div>
                        <div className="col-xs-4">
                            <SearchFoods location={this.props.location} />
                            <DisplayFoodData location={this.props.location} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state,
        foodeaten: state.dayTrackingData.fooditems,
        foodref: state.dayTrackingData.ref
    }
}

export default connect(mapStateToProps, { startSaveDailyTracker, startUpdateDailyTracker, startReadDailyTracker })(DailyTracking);