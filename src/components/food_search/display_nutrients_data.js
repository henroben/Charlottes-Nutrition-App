import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AddToToday from '../add_to_today';
import { fetchNutrients } from '../../actions/index';

class DisplayNutrientData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            servingamount: 1,
            measureselected: 0
        };
    }

    displayNutrients(nutrients) {
        if(nutrients !== null) {
            return nutrients.map((nutrient) => {
                return(
                    <li className="list-group-item" key={nutrient.nutrient_id}>
                        <div className="row">
                            <div className="col-xs-7">{nutrient.name}</div>
                            <div className="col-xs-3">{parseFloat(nutrient.measures[this.state.measureselected].value * this.state.servingamount).toFixed(2)}</div>
                            <div className="col-xs-2">{nutrient.unit}</div>
                        </div>
                    </li>
                );
            });
        }
    }

    renderMeasures(measures) {
        console.log('measures', measures);
        return measures.map((measure, index) => {
            return(
                <option value={index} key={index}>{measure.label} ({measure.eqv} {measure.eunit})</option>
            );
        })
    }
    displayMeasures(measures) {
        let measuredefault = this.state.servingamount;
        return(
            <div className="form-group">
                Serving(s):
                <input type="text" className="serving-size" placeholder="1" ref="measuresAmount" value={measuredefault} onChange={this.handleMeasuresChange.bind(this)} />
                <select ref="nutrientmeasures" onChange={this.handleMeasuresChange.bind(this)}>
                    {this.renderMeasures(measures)}
                </select>
            </div>
        );
    }
    handleMeasuresChange() {
        console.log(`Measures selected: ${this.refs.nutrientmeasures.value}, amount ${this.refs.measuresAmount.value}`);
        this.setState({
            servingamount: this.refs.measuresAmount.value,
            measureselected: this.refs.nutrientmeasures.value
        });
    }

    render() {
        const { nutrients } = this.props.nutrients;

        if (!nutrients) {
            return <div></div>;
        }

        let measures = `${nutrients.report.food.nutrients[0].measures[0].qty} ${nutrients.report.food.nutrients[0].measures[0].label} (${nutrients.report.food.nutrients[0].measures[0].eqv} ${nutrients.report.food.nutrients[0].measures[0].eunit})`

        return(
            <div>
                <div className="panel panel-success">
                    <div className="panel-heading"><h4><AddToToday ndbno={nutrients.report.food.ndbno} measure={this.state.measureselected} servings={this.state.servingamount} />{nutrients.report.food.name} <br/> <small>{this.displayMeasures(nutrients.report.food.nutrients[0].measures)}</small></h4></div>
                    <div className="panel-body">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-xs-7"><strong>Nutrient</strong></div>
                                    <div className="col-xs-3"><strong>Amount</strong></div>
                                    <div className="col-xs-2"><strong>Units</strong></div>
                                </div>
                            </li>
                            {this.displayNutrients(nutrients.report.food.nutrients)}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state,
        nutrients: state.nutrients
    }
}

export default connect(mapStateToProps, {fetchNutrients})(DisplayNutrientData);