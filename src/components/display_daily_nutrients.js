import React, { Component } from 'react';
import _ from 'lodash';
import Chart from '../components/chart';

export default class DisplayDailyNutrients extends Component {
    calcMineralTotals(nutrients) {
        let mineralsForChart = [];
        let minerals = _.filter(nutrients, (nutrient) => {
            return nutrient.group === 'Minerals';
        });
        minerals.map((mineral) => {
            mineralsForChart.push({
                name: mineral.name,
                mg: mineral.measures[0].value
            });
        });
        return mineralsForChart;
    }
    calcVitaminsTotals(nutrients) {
        let vitaminsForChart = [];
        let vitamins = _.filter(nutrients, (vitamin) => {
            return vitamin.group === 'Vitamins';
        });
        vitamins.map((vitamin) => {
            vitaminsForChart.push({
                name: vitamin.name,
                mg: vitamin.measures[0].value
            });
        });
        return vitaminsForChart;
    }
    calcLipidsTotals(nutrients) {
        let lipidsForChart = [];
        let lipids = _.filter(nutrients, (lipid) => {
            return lipid.group === 'Lipids';
        });
        lipids.map((lipid) => {
            lipidsForChart.push({
                name: lipid.name,
                g: lipid.measures[0].value
            });
        });
        return lipidsForChart;
    }
    calcProximatesTotals(nutrients) {
        let proximatesForChart = [];
        let proximates = _.filter(nutrients, (nutrient) => {
            return nutrient.group === 'Proximates' && nutrient.unit !== 'kcal';
        });
        proximates.map((proximate) => {
            proximatesForChart.push({
                name: proximate.name,
                g: proximate.measures[0].value
            });
        });
        return proximatesForChart;
    }

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
        if(this.props.nutrients.length != 0) {
            return(
                <div className="panel panel-default">
                    <div className="panel-heading"><h5>Daily Nutrient Totals</h5></div>
                    <div className="panel-body">
                        {/*{this.renderNutrientTotals(this.props.nutrients)}*/}
                        <h5>Proximates</h5>
                        <Chart data={this.calcProximatesTotals(this.props.nutrients)} units={'g'} />
                        <h5>Minerals</h5>
                        <Chart data={this.calcMineralTotals(this.props.nutrients)} units={'mg'} />
                        <h5>Vitamins</h5>
                        <Chart data={this.calcVitaminsTotals(this.props.nutrients)} units={'mg'} />
                        <h5>Lipids</h5>
                        <Chart data={this.calcLipidsTotals(this.props.nutrients)} units={'g'} />
                    </div>
                </div>
            );
        } else {
            return(<div></div>);
        }

    }
}