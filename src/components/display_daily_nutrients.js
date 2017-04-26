import React, { Component } from 'react';
import Chart from '../components/chart';

export default class DisplayDailyNutrients extends Component {
    renderNutrientTotals(nutrients) {
        return nutrients.map((nutrient) => {
            return(
                <div className="col-xs-6">
                    <div className="well">
                        {nutrient.name} : {nutrient.measures[0].value} {nutrient.unit}
                    </div>
                </div>
            );
        })
    }
    render() {
        return(
            <div className="panel panel-default">
                <div className="panel-heading"><h5>Daily Nutrient Totals</h5></div>
                <div className="panel-body">
                    {this.renderNutrientTotals(this.props.nutrients)}
                    <Chart chartData={ [1,5,7] } chartColour={ 'orange' } chartUnits={'mg'} />
                </div>
            </div>
        );
    }
}