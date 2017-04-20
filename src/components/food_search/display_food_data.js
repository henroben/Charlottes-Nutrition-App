import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchFood, fetchNutrients } from '../../actions/index';

class DisplayFoodData extends Component {

    handleOnClick(id) {
        // console.log('item clicked', id);
        this.props.fetchNutrients(id);
    }

    handleOnClickDashboard(id) {
        console.log('dashboard item clicked', id);
        // this.props.fetchNutrients(id);
    }

    displayFoodItems(items) {
        if(items !== null) {
            // console.log('items', items);
            return items.map((item) => {
                // console.log(item.name);
                if(this.props.location === '/') {
                    return(
                        <li className="list-group-item" key={item.ndbno} onClick={this.handleOnClickDashboard.bind(this, item.ndbno)}>{item.name}</li>
                    );
                } else {
                    return(
                        <li className="list-group-item" key={item.ndbno} onClick={this.handleOnClick.bind(this, item.ndbno)}>{item.name}</li>
                    );
                }
            });
        }
    }

    render() {
        const { food } = this.props.food;
        console.log('food data', this.props.location);
        if(this.props.food.error) {
            return <div className="alert alert-warning">{this.props.food.error}</div>
        }
        if (!food) {
            return  <div></div>;
        }

        return(
            <div className="panel panel-info">
                <div className="panel-heading">Results For: <strong>{food.list.q}</strong></div>
                <div className="panel-body">
                    <ul className="list-group">
                        {this.displayFoodItems(food.list.item)}
                    </ul>
                </div>
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