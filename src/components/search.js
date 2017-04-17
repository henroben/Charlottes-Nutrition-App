import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSearchText, fetchFood } from '../actions/index';

class FoodSearch extends Component {
    render() {
        let searchText = this.props.searchText;
        return(
            <div>
                <div className="form-group">
                    <label htmlFor="food">Search for food type:</label>
                    <input type="food" className="form-control" id="food" onChange={() => {
                        var searchText = this.refs.searchText.value;
                        console.log('search input value', searchText);
                        this.props.setSearchText(searchText);
                        this.props.fetchFood(searchText);
                    }} placeholder="Broccoli, raw" ref="searchText" value={searchText} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state,
        searchtext: state.searchtext
    }
}

export default connect(mapStateToProps, {setSearchText, fetchFood})(FoodSearch);