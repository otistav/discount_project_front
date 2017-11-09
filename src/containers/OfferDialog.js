import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import '../styles/page.css';
import '../styles/offers.css';
import '../styles/offer-dialog.css';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import FlatButton from 'material-ui/FlatButton';

import {
  getOffers,
  loadImage,
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
  changeDiscount,
  saveFile,
} from "../actions/offers";
import RichTextEditor from 'react-rte';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import Textarea from 'react-textarea-autosize';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class OfferDialog extends Component {
  constructor() {
    super();
    this.image = new FormData();
    this.state = {
      currentImageURL: ''
    }

  }

  //TODO навести порядок

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={() => {
          this.props.changeModalStatus();
          this.setState({
            currentImageURL: ''
          })
          // this.image = new FormData()
        }
      }
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
            );
            this.setState({
              currentImageURL: ''
            });
            this.image = new FormData();
          }
        }
      />,
    ];
    return(
      <Dialog
        className="dialog"
        actions={actions}
        modal={false}
        open={this.props.isModalOpen}
        contentClassName="modal-dialog"
        autoScrollBodyContent={true}
      >
        <form>
          <RadioButtonGroup
            onChange={(e, value) => {
              this.props.changeDiscount(value)
            }}
            name="shipSpeed"
            defaultSelected="currency"
          >
            <RadioButton
              value="currency"
              label="currency discount"
              className="radio-button"
            />
            <RadioButton
              value="percentage"
              label="percentage discount"
              className="radio-button"
            />

          </RadioButtonGroup>
          <TextField
            floatingLabelText="name"
            onChange={(e) => {this.props.editModalName(e.target.value)}}
            value={this.props.offerForm.name}
            style={{marginRight: '10%'}}
          />
          <TextField
            floatingLabelText="cost"
            onChange={(e) => {this.props.editModalCost(e.target.value)}}
            value={this.props.offerForm.cost}
          />
          {this.props.discount_type === "percentage" ?
            <div>
              <TextField
                floatingLabelText="percentage discount"
                onChange={(e) => {this.props.editModalPercentageDiscount(e.target.value)}}
                style={{marginRight: '10%'}}
                value={this.props.offerForm.percentage_discount ? this.props.offerForm.percentage_discount : '' }
              />
              <TextField
                floatingLabelText="percentage discount limit"
                onChange={(e) => {this.props.editModalPercentageDiscountLimit(e.target.value)}}
                value={this.props.offerForm.percentage_discount_limit ? this.props.offerForm.percentage_discount_limit : ''}
              />
            </div>
            :
            <div>
              <TextField
                floatingLabelText="currency discount"
                onChange={(e) => {this.props.editModalCurrencyDiscount(e.target.value)}}
                value={this.props.offerForm.currency_discount ? this.props.offerForm.currency_discount : '' }
                style={{marginRight: '10%'}}
              />
              <TextField
                floatingLabelText="currency discount limit"
                onChange={(e) => {this.props.editModalCurrencyDiscountLimit(e.target.value)}}
                value={this.props.offerForm.currency_discount_limit ? this.props.offerForm.currency_discount_limit : '' }
              />
            </div>
          }


          <div className="checkboxes-container">
            <div className="checkboxes">
              <Checkbox
                label="Use bonus discount"
                className="checkbox"
                onCheck={() => {this.props.editModalUseBonusStatus()}}
                checked={this.props.offerForm.use_bonus}
              />
              <Checkbox
                label="Disposable"
                className="checkbox"
                onCheck={() => {this.props.editModalDisposableStatus()}}
                checked={this.props.offerForm.disposable}
              />
            </div>
          </div>

          <Textarea
            cols={100}
            value={this.props.offerForm.description}
            className="textarea"
            hint="description"
            onChange={(e) => {this.props.editModalDescription(e.target.value)}}
          />

          <RaisedButton className="file-picker-button" label="Add file" primary={true} >
            <input
              type="file"
              onChange={(
                (e) => {
                  this.image.append('image', e.target.files[0]);
                  this.setState({currentImageURL:window.URL.createObjectURL(e.target.files[0])});

                }
              )}
            />
          </RaisedButton>
          <img src={this.state.currentImageURL} className="preload-image" alt="No File Choosen"/>
          <div className="places-autocomplete">
            <PlacesAutocomplete
              classNames={{
                root: 'root',
                input: 'input',
                autocompleteContainer: 'autocomplete-container',
                autocompleteItem: 'autocomplete-item',
                autocompleteItemActive: 'autocomplete-item-active',
                googleLogoContainer: 'google-logo-container',
                googleLogoImage: 'google-logo-image'
              }}
              inputProps={{
                value: this.props.geolocation,
                onChange: this.props.editGeolocation
              }}
            />
          </div>

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
      dispatch(changeDiscount(discount))
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

    editModalUseBonusStatus: () => {
      dispatch(editModalUseBonusStatus())
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
    editModalDisposableStatus: () => {
      dispatch(editModalDisposableStatus())
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
)(OfferDialog))
