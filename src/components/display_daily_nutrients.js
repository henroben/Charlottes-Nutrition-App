import React, { Component } from 'react';
import _ from 'lodash';
import Chart from '../components/chart';

export default class DisplayDailyNutrients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rda: {
                proximates: {
                    255: 0, // water
                    203: 55, // protein
                    204: 95, // total fat
                    205: 300, // carbs
                    291: 24, // fibre
                    269: 120 // total sugars
                },
                minerals: {
                    301: 1000, // calcium
                    303: 10, // iron
                    304: 420,
                    305: 700,
                    306: 4700,
                    307: 1500,
                    309: 15
                },
                vitamins: {
                    320: 1, //Vitamin A, RAE
                    401: 90, // Vit C
                    404: 1.5, // Thiamin
                    405: 1.7, // Riboflavin
                    406: 19, // Niacin
                    415: 2, // Vitamin B-6
                    418: 0.002, // Vitamin B-12
                    435: 0.02, // Folate, DFE
                    430: 0.008 // Vitamin K (phylloquinone)
                },
                lipids: {
                    601: 0.2, // Cholesterol
                    605: 0, // Fatty acids, total trans
                    606: 17, // Fatty acids, total saturated
                    645: 24, // Fatty acids, total monounsaturated
                    646: 20 // Fatty acids, total polyunsaturated
                }
            }
        }
    }

    calcMineralTotals(nutrients) {
        let mineralsForChart = [];
        let minerals = _.filter(nutrients, (nutrient) => {
            return nutrient.group === 'Minerals';
        });
        minerals.map((mineral) => {
            if(mineral.unit === 'mg') {
                mineralsForChart.push({
                    name: mineral.name,
                    mg: parseFloat(mineral.measures[0].value),
                    rda: this.state.rda.minerals[mineral.nutrient_id]
                });
            } else if(mineral.unit === 'µg') {
                mineralsForChart.push({
                    name: mineral.name,
                    mg: parseFloat(mineral.measures[0].value / 1000),
                    rda: this.state.rda.minerals[mineral.nutrient_id]
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
                    mg: parseFloat(vitamin.measures[0].value),
                    rda: this.state.rda.vitamins[vitamin.nutrient_id]
                });
            } else if (vitamin.unit === 'µg') {
                console.log(`vitamin ${vitamin.name} has ${(vitamin.measures[0].value)} µg`);
                console.log(`vitamin ${vitamin.name} has ${(vitamin.measures[0].value / 1000)} mg`);
                vitaminsForChart.push({
                    name: vitamin.name,
                    mg: parseFloat(vitamin.measures[0].value / 1000),
                    rda: this.state.rda.vitamins[vitamin.nutrient_id]
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
                    g: parseFloat(lipid.measures[0].value),
                    rda: this.state.rda.lipids[lipid.nutrient_id]
                });
            } else if (lipid.unit === 'mg') {
                lipidsForChart.push({
                    name: lipid.name,
                    g: parseFloat(lipid.measures[0].value / 1000),
                    rda: this.state.rda.lipids[lipid.nutrient_id]
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
                    g: parseFloat(proximate.measures[0].value),
                    rda: this.state.rda.proximates[proximate.nutrient_id]
                });
            } else if (proximate.unit === 'mg') {
                proximatesForChart.push({
                    name: proximate.name,
                    g: parseFloat(proximate.measures[0].value / 1000),
                    rda: this.state.rda.proximates[proximate.nutrient_id]
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
                        <Chart data={this.calcProximatesTotals(this.props.nutrients)} units={'g'} rda={'rda'} />
                        <h5>Minerals</h5>
                        <Chart data={this.calcMineralTotals(this.props.nutrients)} units={'mg'} rda={'rda'} />
                        <h5>Vitamins</h5>
                        <Chart data={this.calcVitaminsTotals(this.props.nutrients)} units={'mg'} rda={'rda'} />
                        <h5>Lipids</h5>
                        <Chart data={this.calcLipidsTotals(this.props.nutrients)} units={'g'} rda={'rda'} />
                    </div>
                </div>
            );
        } else {
            return(<div></div>);
        }

    }
}