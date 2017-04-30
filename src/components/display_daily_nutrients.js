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
            if(mineral.unit === 'mg') {
                mineralsForChart.push({
                    name: mineral.name,
                    mg: parseFloat(mineral.measures[0].value)
                });
            } else if(mineral.unit === 'µg') {
                mineralsForChart.push({
                    name: mineral.name,
                    mg: parseInt(mineral.measures[0].value / 1000)
                });
            }

        });
        console.log('minerals', mineralsForChart);
        return mineralsForChart;
    }
    calcVitaminsTotals(nutrients) {
        let vitaminsForChart = [];
        let vitamins = _.filter(nutrients, (vitamin) => {
            return vitamin.group === 'Vitamins';
        });
        vitamins.map((vitamin) => {
            if(vitamin.unit === 'mg') {
                vitaminsForChart.push({
                    name: vitamin.name,
                    mg: parseInt(vitamin.measures[0].value)
                });
            } else if (vitamin.unit === 'µg') {
                console.log(`vitamin ${vitamin.name} has ${(vitamin.measures[0].value)} µg`);
                console.log(`vitamin ${vitamin.name} has ${(vitamin.measures[0].value / 1000)} mg`);
                vitaminsForChart.push({
                    name: vitamin.name,
                    mg: parseInt(vitamin.measures[0].value / 1000)
                });
            }
        });
        return vitaminsForChart;
    }
    calcLipidsTotals(nutrients) {
        let lipidsForChart = [];
        let lipids = _.filter(nutrients, (lipid) => {
            return lipid.group === 'Lipids';
        });
        lipids.map((lipid) => {
            if(lipid.unit === 'g') {
                lipidsForChart.push({
                    name: lipid.name,
                    g: parseInt(lipid.measures[0].value)
                });
            } else if (lipid.unit === 'mg') {
                lipidsForChart.push({
                    name: lipid.name,
                    g: parseInt(lipid.measures[0].value / 1000)
                });
            }

        });
        return lipidsForChart;
    }
    calcProximatesTotals(nutrients) {
        let proximatesForChart = [];
        let proximates = _.filter(nutrients, (nutrient) => {
            return nutrient.group === 'Proximates' && nutrient.unit !== 'kcal';
        });
        proximates.map((proximate) => {

            if(proximate.unit === 'g') {
                proximatesForChart.push({
                    name: proximate.name,
                    g: parseInt(proximate.measures[0].value)
                });
            } else if (proximate.unit === 'mg') {
                proximatesForChart.push({
                    name: proximate.name,
                    g: parseInt(proximate.measures[0].value / 1000)
                });
            }

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