import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AddToToday from '../add_to_today';
import { fetchNutrients } from '../../actions/index';

class DisplayNutrientData extends Component {

    displayNutrients(nutrients) {
        if(nutrients !== null) {
            console.log('nutrients', nutrients);
            return nutrients.map((nutrient) => {
                console.log(nutrient.name);
                return(
                    <li className="list-group-item" key={nutrient.nutrient_id}>
                        <div className="row">
                            <div className="col-xs-7">{nutrient.name}</div>
                            <div className="col-xs-3">{nutrient.value}</div>
                            <div className="col-xs-2">{nutrient.unit}</div>
                        </div>
                    </li>
                );
            });
        }
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
                    <div className="panel-heading"><h4><AddToToday ndbno={nutrients.report.food.ndbno} />{nutrients.report.food.name} <br/> <small>{measures}</small></h4></div>
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