import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ReactCalendar, { Month } from 'react-calendar';

import SearchFoods from './food_search/search';
import DisplayFoodData from './food_search/display_food_data';
import Trackable from './display_trackable';

import { startSaveDailyTracker, startUpdateDailyTracker, startReadDailyTracker, removeDailyFood } from '../actions';

class DailyTracking extends Component {

    componentDidMount() {
         // check to see if selected date present, otherwise load today
        if(!this.props.trackingDate) {
            let today = new Date(moment().startOf('day').format('YYYY-MM-DD')).toJSON();
            this.props.startReadDailyTracker(today);
        }
    }

    removeFoodEaten(ndbno, foodEaten) {
        this.props.removeDailyFood(ndbno, foodEaten);
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
                                    <i className="fa fa-cog fa-lg fa-fw"></i> <i className="fa fa-times fa-lg fa-fw food-option" onClick={this.removeFoodEaten.bind(this, food.ndbno, this.props.foodeaten)}></i>
                                </span>
                            </div>
                        </div>
                    </li>
                );
            });

    }



    handleSaveData(foodEaten, today, trackableitems) {
        this.props.startSaveDailyTracker(foodEaten, today, trackableitems);
    }

    handleUpdateData(foodEaten, ref, today, trackableitems) {
        // call update action and update firebase db
        this.props.startUpdateDailyTracker(foodEaten, today, ref, trackableitems);
    }

    handleCalendarClick(date) {
        // console.log(JSON.stringify(date));
        let searchDate = new Date(date.startOf('day').format('YYYY-MM-DD')).toJSON();
        console.log('reading data for', searchDate);
        this.props.startReadDailyTracker(searchDate);
    }

    displaySaveButton(foodEaten, today, trackableitems) {
        let formatToday = moment(today).format('Do MMMM YYYY').toString();
        if(foodEaten.length > 0) {
            if(this.props.foodref) {
                return(
                    <button className="btn btn-primary btn-block" onClick={this.handleUpdateData.bind(this, foodEaten, this.props.foodref, today, trackableitems)}>Update Data for {formatToday}</button>
                );
            } else {
                return(
                    <button className="btn btn-primary btn-block" onClick={this.handleSaveData.bind(this, foodEaten, today, trackableitems)}>Save Data for {formatToday}</button>
                );
            }
        }
    }

    render() {
        console.log('tracking', this.props.location);
        let today = moment(this.props.trackingDate).format('Do MMMM YYYY').toString();
        return(
            <div className="panel panel-success">
               <div className="panel-heading"><h4>Daily Tracking for {today}</h4></div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-xs-8">
                            <ul className="list-group">
                                {this.displayFoodEaten(this.props.foodeaten)}
                                {this.displaySaveButton(this.props.foodeaten, this.props.trackingDate, this.props.trackableitems)}
                            </ul>
                        </div>
                        <div className="col-xs-4">
                            <Month date={moment().startOf('day').add(1, 'days')} mods={
                                [
                                    {
                                        date: moment(this.props.trackingDate || today),
                                        classNames: [ 'current' ],
                                        component: [ 'day', 'month', 'week' ]
                                    },
                                    {
                                        component: [ 'day' ],
                                        events: {
                                            onClick: (date) => this.handleCalendarClick(date)
                                        }
                                    }
                                ]
                            } />
                            <SearchFoods location={this.props.location} />
                            <DisplayFoodData location={this.props.location} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <Trackable rating="numbers" rateTo={7} heading="Mood" />
                        </div>
                        <div className="col-md-4">
                            <Trackable rating="numbers" rateTo={7} heading="Energy" />
                        </div>
                        <div className="col-md-4">
                            <Trackable rating="numbers" rateTo={7} heading="Sleep" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <Trackable rating="stars" rateTo={7} heading="Tiredness" />
                        </div>
                        <div className="col-md-4">
                            <Trackable rating="stars" rateTo={7} heading="Back Pain" />
                        </div>
                        <div className="col-md-4">
                            <Trackable rating="stars" rateTo={7} heading="RSI Pain" />
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
        trackableitems: state.dayTrackingData.trackableitems,
        foodref: state.dayTrackingData.ref,
        trackingDate: state.dayTrackingData.date
    }
}

export default connect(mapStateToProps, { startSaveDailyTracker, startUpdateDailyTracker, startReadDailyTracker, removeDailyFood })(DailyTracking);