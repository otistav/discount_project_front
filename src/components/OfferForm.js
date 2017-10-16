import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import '../styles/page.css';
import '../styles/offers.css';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import FlatButton from 'material-ui/FlatButton';

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
  editOffer,
  saveFile
} from "../actions/offers";
import Img from 'react-image';
import TextField from 'material-ui/TextField';
import Textarea from 'react-textarea-autosize';
import FileInputBox from 'react-file-input-box'
import Dialog from 'material-ui/Dialog';
import Checkbox from 'material-ui/Checkbox'
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import get from 'lodash/get';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import RaisedButton from 'material-ui/RaisedButton';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

class OfferForm extends Component {
  constructor() {
    super();
    this.image = new FormData();

  }

  //TODO навести порядок

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.changeModalStatus}
      />,
      <FlatButton
        label={this.props.label}
        primary={true}
        keyboardFocused={true}
        onClick={
          () => {
            let offer = this.props.offerForm;
            this.props.func(
              this.image, offer.id, offer.name, offer.description,
              offer.disposable, offer.geolocation, offer.percentage_discount,
              offer.currency_discount, offer.use_bonus, offer.percentage_discount_limit,
              offer.currency_discount_limit, offer.cost
            )
          }
        }
      />,
    ];
    const styles = {
      block: {
        maxWidth: 250,
      },
      radioButton: {
        marginBottom: 16,
      },
    };
    const defaultStyles = {
      root: {
        position: 'relative',
        paddingBottom: '0px',
      },
      input: {
        display: 'inline-block',
        width: '100%',
        padding: '10px',
        backgroundColor: '#62656b',
        color: 'white'
      },
      autocompleteContainer: {
        position: 'absolute',
        top: '100%',
        backgroundColor: '#62656b',
        border: '1px solid #555555',
        width: '100%',
      },
      autocompleteItem: {
        backgroundColor: '#62656b',
        padding: '10px',
        color: 'white',
        cursor: 'pointer',
      },
      autocompleteItemActive: {
        backgroundColor: '#62656b'
      },
      googleLogoContainer: {
        textAlign: 'right',
        padding: '1px',
        backgroundColor: '#62656b'
      },
      googleLogoImage: {
        width: 150
      }
    };
    console.log(this.props.offerForm.percentage_discount, this.props.offerForm.currency_discount);
    return(
      <Dialog
        actions={actions}
        modal={true}
        open={this.props.isModalOpen}
        style={{display: 'block'}}
        contentClassName="modal-dialog"
        autoScrollBodyContent={true}
      >
        <form>
          <RadioButtonGroup onChange={(e, value) => {
            this.props.changeDiscount(value)
          }} name="shipSpeed" defaultSelected="currency">
            <RadioButton
              value="currency"
              label="currency discount"
              style={styles.radioButton}
            />
            <RadioButton
              value="percentage"
              label="percentage discount"
              style={styles.radioButton}
            />

          </RadioButtonGroup>
          <TextField
            floatingLabelText="name"
            onChange={(e) => {this.props.editModalName(e.target.value)}}
            value={this.props.offerForm.name}
          />
          {this.props.discount_type === "percentage" ?
            <div>
              <TextField
                floatingLabelText="% discount"
                onChange={(e) => {this.props.editModalPercentageDiscount(e.target.value)}}
                value={this.props.offerForm.percentage_discount ? this.props.offerForm.percentage_discount : 0}
              />
              <TextField
                floatingLabelText="% discount limit"
                onChange={(e) => {this.props.editModalPercentageDiscountLimit(e.target.value)}}
                value={this.props.offerForm.percentage_discount_limit ? this.props.offerForm.percentage_discount_limit : 0}
              />
            </div>
            :
            <div>
              <TextField
                floatingLabelText="$ discount"
                onChange={(e) => {this.props.editModalCurrencyDiscount(e.target.value)}}
                value={this.props.offerForm.currency_discount ? this.props.offerForm.currency_discount : 0}
              />
              <TextField
                floatingLabelText="$ discount limit"
                onChange={(e) => {this.props.editModalCurrencyDiscountLimit(e.target.value)}}
                value={this.props.offerForm.currency_discount_limit ? this.props.offerForm.currency_discount_limit : 0}
              />
            </div>
          }

          <TextField
            floatingLabelText="cost"
            onChange={(e) => {this.props.editModalCost(e.target.value)}}
            value={this.props.offerForm.cost}
          />




          <Textarea
            cols={100}
            rows={40}
            value={this.props.offerForm.description}
            // style={{minWidth: '100px', minHeight: '100px'}}
            hint="description"
            onChange={(e) => {this.props.editModalDescription(e.target.value)}}
          />
          <PlacesAutocomplete
            styles={defaultStyles}
            inputProps={{
              value: this.props.geolocation,
              onChange: this.props.editGeolocation
            }}
          />
          {/*<FileInputBox*/}
            {/*handleInput={(e) => {this.image.append('image', e.target.files[0])}}*/}
            {/*name="string" label="string"*/}
          {/*>*/}
            {/*Example*/}
          {/*</FileInputBox>*/}
          <RaisedButton className="file-picker-button" label="Add file" primary={true} >
            <input type="file" onChange={(
              (e) => {
                this.image.append('image', e.target.files[0]);
                console.log(e.target.files);
                let reader = new FileReader();
                let url = reader.readAsDataURL(e.target.files[0]);
                console.log(url, 'this is url')
              }
            )} />
          </RaisedButton>

        </form>
      </Dialog>



    )
  }

}

export default withRouter(connect(
  state => ({
    offers: state.offers.items,
    currentOffer: state.offers.currentOffer,
    geolocation: state.offerForm.geolocation,
    offerForm: state.offerForm,
    discount_type: state.offerForm.discount_type
  }),
  dispatch => ({

    changeDiscount: (discount) => {
      dispatch({type: 'DISCOUNT_TYPE_CHANGED', payload: discount})
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
)(OfferForm))