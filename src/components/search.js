import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSearchText, fetchFood } from '../actions/index';

class FoodSearch extends Component {
    render() {
        let searchText = this.props.searchtext;
        return(
            <div className="panel panel-default">
                <div className="panel-heading">Search for food type:</div>
                <div className="panel-body">
                    <div className="form-group">
                        <input type="food" className="form-control" id="food" onChange={() => {
                            searchText = this.refs.searchText.value;
                            console.log('search input value', searchText);
                            this.props.setSearchText(searchText);
                            this.props.fetchFood(searchText);
                        }} placeholder="Broccoli, raw" ref="searchText" value={searchText} />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log('state', state);
    return {
        ...state,
        searchtext: state.searchtext.text
    }
}

export default connect(mapStateToProps, {setSearchText, fetchFood})(FoodSearch);