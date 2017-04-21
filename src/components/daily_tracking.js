import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchFoods from './food_search/search';
import DisplayFoodData from './food_search/display_food_data';

class DailyTracking extends Component {

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
        foodeaten: state.dayTrackingData.fooditems
    }
}

export default connect(mapStateToProps)(DailyTracking);