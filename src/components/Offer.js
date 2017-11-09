import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Img from 'react-image';
import '../styles/offers.css';
const Offer = (props) => {
  return(
    <div className="offer">
      <div className="content">
        <div className="left">
          <div className="offer-name">
            {props.offer.name.length ? props.offer.name : <span style={{color: 'red'}}>'no name'</span>}
          </div>

          <Img src={"http://localhost:3000" + props.offer.image} style={{width: '100px', height: '100px'}}/>

          <div className="offer-info disposable">
            {props.offer.disposable === true ? <div>disposable</div> : <div>reusable</div>}
          </div>
          {props.offer.percentage_discount
            ?
            <div className="offer-info discount">Discount: {props.offer.percentage_discount} %</div>
            :
            <div className="offer-info discount">Discount: {props.offer.currency_discount} usd</div>
          }
          <div className="offer-info cost">Cost: {props.offer.cost} usd</div>
        </div>
        <div className="right">
          <div className="offer-description">
            {props.offer.description}
          </div>
        </div>
      </div>


      <div className="edit-button">
        <FlatButton
          style={{color: '#8BB78B'}}
          label="EDIT"
          onClick={
            () => {
              props.changeModalStatus();
              props.setOffer(props.offer)
            }
          }
        />
      </div>

    </div>
  )

};


export default Offer;
