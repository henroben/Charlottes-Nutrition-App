import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchFoods from './search';

class DailyTracking extends Component {
    render() {
        return(
            <div className="panel panel-success">
               <div className="panel-heading"><h4>Daily Tracking</h4></div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-xs-8">
                            Eaten today
                        </div>
                        <div className="col-xs-4">
                            <SearchFoods />
                        </div>
                    </div>
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

export default connect()(DailyTracking);