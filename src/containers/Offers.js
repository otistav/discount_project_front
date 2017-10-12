import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import '../styles/page.css';
import '../styles/offers.css';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Menu from 'material-ui/Menu';
import {getOffers} from "../actions/offers";
import Img from 'react-image';
import Offer from '../components/Offer';
import _ from 'lodash/collection';

class Offers extends Component {
  componentDidMount() {
    this.props.getOffers();
  }
  render() {
    let offers = _.map(this.props.offers, (offer) => {
      console.log(offer.disposable);
      return {
        name: offer.name,
        image: offer.image,
        disposable: offer.disposable,
        description: offer.description,
        latitude: offer.latitude,
        longitude: offer.longitude,
        percentage_discount: offer.percentage_discount,
        currency_discount: offer.currency_discount,
        use_bonus: offer.use_bonus,
        percentage_discount_limit: offer.percentage_discount_limit,
        currency_discount_limit: offer.currency_discount_limit,
        cost: offer.cost
      }
    });
    return(
      <div>
        <Paper className="page">
          <div className="offers">
            {offers.map(item => (
                <Offer
                  name={item.name}
                  image={item.image}
                  disposable={item.disposable}
                  description={item.description}
                  latitude={item.latitude}
                  longitude={item.longitude}
                  percentage_discount={item.percentage_discount}
                  currency_discount={item.currency_discount}
                  use_bonus={item.use_bonus}
                  percentage_discount_limit={item.percentage_discount_limit}
                  currency_discount_limit={item.currency_discount_limit}
                  cost={item.cost}
                />
              )

            )}
          </div>

        </Paper>
      </div>
    )
  }
}


export default withRouter(connect(
  state => ({
    offers: state.offers.items
  }),
  dispatch => ({
    getOffers: () => {
      dispatch(getOffers())
    }
  })
)(Offers))