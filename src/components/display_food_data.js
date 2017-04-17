import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchFood, fetchNutrients } from '../actions/index';
import SearchFoods from './search';
import DisplayNutrientsData from './display_nutrients_data';

class DisplayFoodData extends Component {

    componentWillMount() {
        // this.props.fetchFood();
    }

    handleOnClick(id) {
        console.log('item clicked', id);
        this.props.fetchNutrients(id);
    }

    displayFoodItems(items) {
        if(items !== null) {
            console.log('items', items);
            return items.map((item) => {
                console.log(item.name);
                return(
                    <li className="list-group-item" key={item.ndbno} onClick={this.handleOnClick.bind(this, item.ndbno)}>{item.name}</li>
                );
            });
        }
    }

    render() {
        const { food } = this.props.food;

        if (!food) {
            return  <SearchFoods />;
        }

        return(
            <div>
                <SearchFoods />
                <h3>{food.list.q}</h3>
                <ul className="list-group">
                    {this.displayFoodItems(food.list.item)}
                </ul>
                <DisplayNutrientsData />
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log('state', state);
    return {
        food: state.food
    }
}

export default connect(mapStateToProps, { fetchFood, fetchNutrients })(DisplayFoodData);