import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import '../styles/page.css';
import '../styles/offers.css';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Menu from 'material-ui/Menu';
import FlatButton from 'material-ui/FlatButton';
import FileInput from '@ranyefet/react-file-input';
import {
  getOffers,
  changeModalStatus,
  setCurrentOffer,
  editModalCurrencyDiscount,
  editModalCurrencyDiscountLimit,
  editModalDescription,
  editModalDisposableStatus,
  editModalName,
  editModalPercentageDiscount,
  editModalPercentageDiscountLimit,
  editModalUseBonusStatus,
  editModalCost,
  editGeolocation,
  editOffer
} from "../actions/offers";
import Dialog from 'material-ui/Dialog';
import Checkbox from 'material-ui/Checkbox'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import Img from 'react-image';
import TextField from 'material-ui/TextField';
import Textarea from 'muicss/lib/react/textarea';
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
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.changeModalStatus}
      />,
      <FlatButton
        label="Save"
        primary={true}
        keyboardFocused={true}
      />,
    ];
    return(
      <div>
        <Paper className="page">
          <div className="offers">
            {offers.map((item, i) => (
                <Offer
                  setOffer={this.props.setCurrentOffer}
                  key={i}
                  changeModalStatus={this.props.changeModalStatus}
                  offer={{
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
          <Dialog
            actions={actions}
            modal={true}
            open={this.props.isModalOpen}
            style={{display: 'block'}}
            contentClassName="modal-dialog"
            autoScrollBodyContent={true}
          >
            <form action="">
              <TextField
                hintText="name"
                onChange={(e) => {this.props.editModalName(e.target.value)}}
              />
              <TextField
                hintText="% discount"
                onChange={(e) => {this.props.editModalPercentageDiscount(e.target.value)}}
              />
              <TextField
                hintText="$ discount"
                onChange={(e) => {this.props.editModalCurrencyDiscount(e.target.value)}}
              />
              <TextField
                hintText="cost"
                onChange={(e) => {this.props.editModalCost(e.target.value)}}
              />
              <TextField
                hintText="% discount limit"
                onChange={(e) => {this.props.editModalPercentageDiscountLimit(e.target.value)}}
              />
              <TextField
                hintText="$ discount limit"
                onChange={(e) => {this.props.editModalCurrencyDiscountLimit(e.target.value)}}
              />


              <Textarea
                hint="description"
                onChange={(e) => {this.props.editModalDescription(e.target.value)}}
              />
              <PlacesAutocomplete
                inputProps={{
                  value: this.props.geolocation,
                  onChange: this.props.editGeolocation
                }}
              />
              <FileInput
                accept=".png,.gif"
                name="myImage"
              >
                <FlatButton label="choose file"/>
              </FileInput>
            </form>
          </Dialog>
        </Paper>
      </div>
    )
  }
}


export default withRouter(connect(
  state => ({
    offers: state.offers.items,
    isModalOpen: state.offers.isModalOpen,
    currentOffer: state.offers.currentOffer,
    geolocation: state.offerForm.geolocation,
  }),
  dispatch => ({
    getOffers: () => {
      return dispatch(getOffers())
    },
    setCurrentOffer: (offer) => {
      dispatch(setCurrentOffer(offer))
    },
    changeModalStatus: () => {
      dispatch(changeModalStatus())
    },
    editModalUseBonusStatus: (use_bonus) => {
      dispatch(editModalUseBonusStatus(use_bonus))
    },
    editModalPercentageDiscountLimit: (percentage_discount_limit) => {
      dispatch(editModalPercentageDiscountLimit(percentage_discount_limit))
    },
    editModalPercentageDiscount: (percentage_discount) => {
      dispatch(editModalPercentageDiscount(percentage_discount))
    },
    editModalName: (name) => {
      dispatch(editModalName(name))
    },
    editModalDisposableStatus: (disposable_status) => {
      dispatch(editModalDisposableStatus(disposable_status))
    },
    editModalDescription: (description) => {
      dispatch(editModalDescription(description))
    },
    editModalCurrencyDiscount: (currency_discount) => {
      dispatch(editModalCurrencyDiscount(currency_discount))
    },
    editModalCurrencyDiscountLimit: (currency_discount_limit) => {
      dispatch(editModalCurrencyDiscountLimit(currency_discount_limit))
    },
    editModalCost: (cost) => {
      dispatch(editModalCost(cost))
    },
    editGeolocation: (geolocation) => {
      dispatch(editGeolocation(geolocation))
    }

  })
)(Offers))