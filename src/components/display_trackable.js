import React, { Component } from 'react';

export default class Trackable extends Component {

    handleTrackingClick(trackable, data) {
        console.log(`${trackable} was rated ${data}`);
    }

    renderRatingsList(rating, rateTo) {
        let rateArray = [];
        let icon = null;
        for(let i = 0; i < rateTo; i++) {
            if(rating === 'numbers') {
                icon = (i + 1);
            }
            rateArray.push(<li key={i}
                               className={'rating-' + rating}
                               onClick={this.handleTrackingClick.bind(this, this.props.heading, (i+1))}
            >{icon}</li>);
        };
        return rateArray;
    }

    renderRatings(rating) {
        let rateTo = this.props.rateTo;
        let rates = this.renderRatingsList(rating, 7);

        if(rating === 'stars') {
            return(
                <ul className="trackable-rating rating-stars">
                    {rates.map((rate) => {
                        return rate;
                    })}
                </ul>
            );
        } else if(rating === 'numbers') {
            return (
                <ul className="trackable-rating rating-numbers">
                    {rates.map((rate) => {
                        return rate;
                    })}
                </ul>
            );
        }
    }

    render() {
        return(
            <div className="panel panel-default">
                <div className="panel-heading"><h5>{this.props.heading}</h5></div>
                <div className="panel-body">
                    {this.renderRatings(this.props.rating)}
                </div>
            </div>
        );
    }
}