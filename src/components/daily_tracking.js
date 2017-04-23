import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ReactCalendar, { Month } from 'react-calendar';

import SearchFoods from './food_search/search';
import DisplayFoodData from './food_search/display_food_data';

import { startSaveDailyTracker, startUpdateDailyTracker, startReadDailyTracker } from '../actions';

class DailyTracking extends Component {

    componentDidMount() {
        console.log('DailyTracking did mount');
        // let today = new Date().toDateString();
        // let today = new Date(moment().startOf('day').format('YYYY-MM-DD')).toJSON();
        // let date = JSON.stringify(new Date(today));

        console.warn('moment test', moment().startOf('day').format('YYYY-MM-DD'));
        console.warn('json test', new Date(moment().startOf('day').format('YYYY-MM-DD')).toJSON());
        let today = new Date(moment().startOf('day').format('YYYY-MM-DD')).toJSON();

        // console.log('intial date is:', today);
        // console.log('intial date new Date is:', new Date(today));
        // console.log('initial date json:', new Date(today).toJSON());
        // console.log('initial date moment:', moment().startOf('day'));
        // console.log('initial date moment json:', moment().startOf('day').toJSON());
        // console.log('intial date moment utc:', moment.utc());
        this.props.startReadDailyTracker(today);
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
        // let date = JSON.stringify(new Date(today));
        // console.log(date);
        this.props.startSaveDailyTracker(foodEaten, today);
    }

    handleUpdateData(foodEaten, ref, today) {
        console.log('firebase ref is', ref);
        // let date = JSON.stringify(new Date(today));
        // call update action and update firebase db
        this.props.startUpdateDailyTracker(foodEaten, today, ref);
    }

    handleCalendarClick(date) {
        // console.log(JSON.stringify(date));
        let searchDate = new Date(date.startOf('day').format('YYYY-MM-DD')).toJSON();
        console.log('reading data for', searchDate);
        this.props.startReadDailyTracker(searchDate);
    }

    displaySaveButton(foodEaten, today) {
        let formatToday = moment(today).format('Do MMMM YYYY').toString();
        if(foodEaten.length > 0) {
            if(this.props.foodref) {
                return(
                    <button className="btn btn-primary btn-block" onClick={this.handleUpdateData.bind(this, foodEaten, this.props.foodref, today)}>Update Data for {formatToday}</button>
                );
            } else {
                return(
                    <button className="btn btn-primary btn-block" onClick={this.handleSaveData.bind(this, foodEaten, today)}>Save Data for {formatToday}</button>
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
                                {this.displaySaveButton(this.props.foodeaten, this.props.trackingDate)}
                            </ul>
                        </div>
                        <div className="col-xs-4">
                            <Month date={moment().startOf('day').add(1, 'days')} mods={
                                [
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
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state,
        foodeaten: state.dayTrackingData.fooditems,
        foodref: state.dayTrackingData.ref,
        trackingDate: state.dayTrackingData.date
    }
}

export default connect(mapStateToProps, { startSaveDailyTracker, startUpdateDailyTracker, startReadDailyTracker })(DailyTracking);