import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import '../styles/page.css';
import '../styles/offers.css';
import Paper from 'material-ui/Paper';
import Subheader from '../components/DictSubheader'
import {
  getOffers,
  changeModalStatus,
  setCurrentOffer,
  editOffer,
  saveFile,
  changeCreateModalStatus,
  createOffer
} from "../actions/offers";
import OfferForm from '../components/OfferForm';
import Offer from '../components/Offer';
import _ from 'lodash/collection';

class Offers extends Component {
  componentDidMount() {
    this.props.getOffers();
  }


    // geocodeByAddress(this.state.address)
    //   .then(results => getLatLng(results[0]))
    //   .then(latLng => console.log('Success', latLng))
    //   .catch(error => console.error('Error', error))

  render() {

    let offers = _.map(this.props.offers, (offer) => {
      return {
        id: offer.uuid,
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
          <Subheader
            openModal={this.props.changeCreateModalStatus}
          />
          <div className="offers">
            {offers.map((item, i) => (
                <Offer
                  setOffer={this.props.setCurrentOffer}
                  key={i}
                  changeModalStatus={this.props.changeModalStatus}
                  offer={{
                    modalVisited: this.props.modalVisited,
                    id: item.id,
                    name: item.name,
                    image: item.image,
                    disposable: item.disposable,
                    description: item.description,
                    latitude: item.latitude,
                    longitude: item.longitude,
                    percentage_discount: item.percentage_discount,
                    currency_discount: item.currency_discount,
                    use_bonus: item.use_bonus,
                    percentage_discount_limit: item.percentage_discount_limit,
                    currency_discount_limit: item.currency_discount_limit,
                    cost: item.cost
                  }}

                />
              )
            )}
          </div>
          <OfferForm
            label="SAVE"
            func={this.props.editOffer}
            isModalOpen={this.props.isModalOpen}
          />
          <OfferForm
            label="CREATE"
            func={this.props.createOffer}
            isModalOpen={this.props.isCreateModalOpen}
          />
        </Paper>
      </div>
    )
  }
}


export default withRouter(connect(
  state => ({
    offers: state.offers.items,
    isModalOpen: state.offers.isModalOpen,
    isCreateModalOpen: state.offers.isCreateModalOpen,
    currentOffer: state.offers.currentOffer,
    geolocation: state.offerForm.geolocation,
    offerForm: state.offerForm,
    modalVisited: state.offerForm.visited
  }),
  dispatch => ({
    createOffer: (
      image, id, name, description, disposable,
      geolocation, percentage_discount, currency_discount,
      use_bonus, percentage_discount_limit, currency_discount_limit, cost
    ) => {
      return dispatch(createOffer(
        image,
        id,
        name,
        description,
        disposable,
        geolocation,
        percentage_discount,
        currency_discount,
        use_bonus,
        percentage_discount_limit,
        currency_discount_limit,
        cost
      ))
    },
    editOffer: (
      image, id, name, description, disposable,
      geolocation, percentage_discount, currency_discount,
      use_bonus, percentage_discount_limit, currency_discount_limit, cost) => {
      return dispatch(editOffer(
        image,
        id,
        name,
        description,
        disposable,
        geolocation,
        percentage_discount,
        currency_discount,
        use_bonus,
        percentage_discount_limit,
        currency_discount_limit,
        cost
      ))
    },
    changeCreateModalStatus: () => {
      dispatch(changeCreateModalStatus())
    },
    saveFile: (file) => {
      dispatch(saveFile(file))
    },
    getOffers: () => {
      return dispatch(getOffers())
    },
    setCurrentOffer: (offer) => {
      dispatch(setCurrentOffer(offer))
    },
    changeModalStatus: () => {
      dispatch(changeModalStatus())
    }
  })
)(Offers))