import React, { Component } from 'react';
import { connect } from 'react-redux';
import DailyTracking from './daily_tracking';

class Dashboard extends Component {
    render() {
        return(
            <div className="row">
                <div className="col-sm-1"></div>
                <div className="col-sm-10">
                    <div className="well well-sm">
                        <h1>Dashboard</h1>
                        <div className="row">
                            <div className="col-sm-12">
                                <DailyTracking />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-1"></div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state,
    }
}

export default connect(mapStateToProps, {})(Dashboard);