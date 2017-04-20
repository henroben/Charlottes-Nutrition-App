import React, { Component } from 'react';
import { connect } from 'react-redux';
import DailyTracking from './daily_tracking';

class Dashboard extends Component {
    render() {
        console.log('dashboard route', this.props.location.pathname);
        return(
            <div className="row">
                <div className="col-sm-1"></div>
                <div className="col-sm-10">
                    <div className="well well-sm">
                        <h1>Dashboard</h1>
                        <div className="row">
                            <div className="col-sm-12">
                                <DailyTracking location={this.props.location.pathname} />
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