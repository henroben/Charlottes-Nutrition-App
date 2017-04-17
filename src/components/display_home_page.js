import React, { Component } from 'react';
import { connect } from 'react-redux';

class DisplayHomePage extends Component {
    render() {
        return(
            <div className="row">
                <div className="col-sm-1"></div>
                <div className="col-sm-10">
                    <div className="jumbotron">
                        <h1>Welcome</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aperiam atque aut cum debitis dicta dolores et expedita, illo impedit, nostrum obcaecati odit possimus repellat rerum sunt suscipit tenetur vero.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex in inventore ratione voluptatum. Aspernatur corporis cumque esse iure, labore nisi porro provident quisquam reprehenderit repudiandae sequi sint tempora ut! Ratione.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aperiam atque aut cum debitis dicta dolores et expedita, illo impedit, nostrum obcaecati odit possimus repellat rerum sunt suscipit tenetur vero.</p>
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

export default connect(mapStateToProps, {})(DisplayHomePage);