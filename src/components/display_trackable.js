import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startAddTrackableItem } from '../actions/index';

class Trackable extends Component {

    handleTrackingClick(trackable, data) {
        trackable = trackable.replace(/\s+/g, '-').toLowerCase();
        console.log(`${trackable} was rated ${data}`);
        this.props.startAddTrackableItem(trackable, data, this.props.trackable);
    }

    renderRatingsList(rating, rateTo, selected) {
        let rateArray = [];
        let icon, ratingStyle, select = null;

        let trackables = _.filter(this.props.trackable, (object) => {
            return object.item === selected;
        });

        if(trackables[0] !== undefined || null) {
            select = (parseInt(trackables[0].rating) - 1);
        }

        for(let i = 0; i < rateTo; i++) {
            // check rating type
            if(rating === 'numbers') {
                icon = (i + 1);
            }
            if(select !== null && select >= i) {
                ratingStyle = 'selected';
            } else {
                ratingStyle = '';
            }
            rateArray.push(<li key={i}
                               // className={'rating-' + rating}
                               className={ratingStyle}
                               onClick={this.handleTrackingClick.bind(this, this.props.heading, (i+1))}
            >{icon}</li>);
        };
        return rateArray;
    }

    renderRatings(rating, selected) {
        let rateTo = this.props.rateTo;
        let rates = this.renderRatingsList(rating, 7, selected);

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

    getSelected(heading) {
        let trackable = heading.replace(/\s+/g, '-').toLowerCase();
        return trackable;
    }

    render() {
        let selected = this.getSelected(this.props.heading);
        return(
            <div className="panel panel-default">
                <div className="panel-heading"><h5>{this.props.heading}</h5></div>
                <div className="panel-body">
                    {this.renderRatings(this.props.rating, selected)}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        trackable: state.dayTrackingData.trackableitems
    }
}

export default connect(mapStateToProps, {startAddTrackableItem})(Trackable);