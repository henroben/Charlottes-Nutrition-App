import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchFoods from './search';
import DisplayFoodData from './display_food_data';
import DisplayNutrientsData from './display_nutrients_data';

class DisplaySearchFood extends Component {
    render() {
        return(
            <div className="row">
                <div className="col-sm-4">
                    <SearchFoods />
                    <DisplayFoodData />
                </div>
                <div className="col-sm-8">
                    <DisplayNutrientsData />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state,
    }
}

export default connect(mapStateToProps, {})(DisplaySearchFood);