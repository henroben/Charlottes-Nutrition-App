import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ReactCalendar, { Month } from 'react-calendar';

import SearchFoods from './food_search/search';
import DisplayFoodData from './food_search/display_food_data';
import Trackable from './display_trackable';
import DisplayDailyNutrients from './display_daily_nutrients';

import { startSaveDailyTracker, startUpdateDailyTracker, startReadDailyTracker, removeDailyFood } from '../actions';

class DailyTracking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            navdate: moment()
        };
    }

    componentDidMount() {
         // check to see if selected date present, otherwise load today
        if(!this.props.trackingDate) {
            let today = new Date(moment().startOf('day').format('YYYY-MM-DD')).toJSON();
            this.props.startReadDailyTracker(today);
        }
    }

    removeFoodEaten(ndbno, foodEaten, measurement, servingsize) {
        this.props.removeDailyFood(ndbno, foodEaten, measurement, servingsize);
    }

    displayFoodEaten(foodEaten) {
            if(foodEaten.length > 0) {
                return foodEaten.map((food) => {
                    return(
                        <li className="list-group-item" key={food.ndbno}>
                            <div className="row">
                                <div className="col-xs-9">
                                    {food.name}
                                </div>
                                <div className="col-xs-3">
                                <span className="pull-right">
                                    <i className="fa fa-cog fa-lg fa-fw"></i> <i className="fa fa-times fa-lg fa-fw food-option" onClick={this.removeFoodEaten.bind(this, food.ndbno, this.props.foodeaten, food.measurement, food.servingsize)}></i>
                                </span>
                                </div>
                            </div>
                        </li>
                    );
                });
            } else {
                return(
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-xs-12">No food found for this date</div>
                        </div>
                    </li>
                );
            }


    }



    handleSaveData(foodEaten, today, trackableitems, nutrientitems) {
        this.props.startSaveDailyTracker(foodEaten, today, trackableitems, nutrientitems);
    }

    handleUpdateData(foodEaten, ref, today, trackableitems, nutrientitems) {
        // call update action and update firebase db
        this.props.startUpdateDailyTracker(foodEaten, today, ref, trackableitems, nutrientitems);
    }

    handleCalendarClick(date) {
        // console.log(JSON.stringify(date));
        let searchDate = new Date(date.startOf('day').format('YYYY-MM-DD')).toJSON();
        console.log('reading data for', searchDate);
        this.props.startReadDailyTracker(searchDate);
    }

    displaySaveButton(foodEaten, today, trackableitems) {
        let formatToday = moment(today).format('Do MMMM YYYY').toString();
        if(foodEaten.length > 0 || trackableitems.length > 0) {
            if(this.props.foodref) {
                return(
                    <button className="btn btn-primary btn-block" onClick={this.handleUpdateData.bind(this, foodEaten, this.props.foodref, today, trackableitems, this.props.nutrientitems)}>Update Data for {formatToday}</button>
                );
            } else {
                return(
                    <button className="btn btn-primary btn-block" onClick={this.handleSaveData.bind(this, foodEaten, today, trackableitems, this.props.nutrientitems)}>Save Data for {formatToday}</button>
                );
            }
        }
    }

    handlePrevMonth() {
        this.setState({
            navdate: this.state.navdate.clone().subtract(1, 'month')
        });
    }

    handleNextMonth() {
        this.setState({
            navdate: this.state.navdate.clone().add(1, 'month')
        })
    }

    render() {
        console.log('tracking', this.props.location);
        let today = moment(this.props.trackingDate).format('Do MMMM YYYY').toString();
        let displayDailyCalories = '';
        if(this.props.nutrientitems.length > 0) {
            displayDailyCalories = `Calories consumed: ${this.props.nutrientitems[1].measures[0].value} ${this.props.nutrientitems[1].unit}`
        }
        return(
            <div className="panel panel-success">
               <div className="panel-heading"><h4>Daily Tracking for {today} <small>{displayDailyCalories}</small></h4></div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-xs-8">
                            <ul className="list-group">
                                {this.displayFoodEaten(this.props.foodeaten)}
                                {this.displaySaveButton(this.props.foodeaten, this.props.trackingDate, this.props.trackableitems)}
                            </ul>
                        </div>
                        <div className="col-xs-4">
                            <a href="#" className="prevMonth" onClick={this.handlePrevMonth.bind(this)}>
                                <i className="fa fa-arrow-left"></i> Prev Month
                            </a>
                            <a href="#" className="nextMonth" onClick={this.handleNextMonth.bind(this)}>
                                Next Month <i className="fa fa-arrow-right"></i>
                            </a>
                            <Month date={moment(this.state.navdate).startOf('day').add(1, 'days')} mods={
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
                    <div className="row">
                        <div className="col-md-12">
                            <DisplayDailyNutrients nutrients={this.props.nutrientitems} />
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
        trackingDate: state.dayTrackingData.date,
        nutrientitems: state.dayTrackingData.nutrientitems
    }
}

export default connect(mapStateToProps, { startSaveDailyTracker, startUpdateDailyTracker, startReadDailyTracker, removeDailyFood })(DailyTracking);