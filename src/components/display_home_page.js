import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignIn from './signin';

class DisplayHomePage extends Component {
    render() {
        return(
            <div className="row">

                <div className="col-sm-7">
                    <div className="panel panel-tint">
                        <div className="panel-body">
                            <h2>Nutrition Tracking App</h2>
                            <hr/>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aperiam atque aut cum debitis dicta dolores et expedita, illo impedit, nostrum obcaecati odit possimus repellat rerum sunt suscipit tenetur vero.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex in inventore ratione voluptatum. Aspernatur corporis cumque esse iure, labore nisi porro provident quisquam reprehenderit repudiandae sequi sint tempora ut! Ratione.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aperiam atque aut cum debitis dicta dolores et expedita, illo impedit, nostrum obcaecati odit possimus repellat rerum sunt suscipit tenetur vero.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex in inventore ratione voluptatum. Aspernatur corporis cumque esse iure, labore nisi porro provident quisquam reprehenderit repudiandae sequi sint tempora ut! Ratione.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aperiam atque aut cum debitis dicta dolores et expedita, illo impedit, nostrum obcaecati odit possimus repellat rerum sunt suscipit tenetur vero.</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-5">
                    <SignIn />
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

export default connect(mapStateToProps, {})(DisplayHomePage);