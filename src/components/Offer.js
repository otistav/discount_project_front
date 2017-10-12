import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Img from 'react-image';
import '../styles/offers.css';
const Offer = (props) => {
  return(
    <div className="offer">
      <div className="offer-name">
        {props.name}
      </div>
      <Img src={"http://localhost:3000/" + props.image} style={{width: '100px', height: '100px'}}/>

      <div className="offer-description">
        {props.description}
      </div>
      <div className="edit-button">
        <FlatButton label="EDIT"/>
      </div>
      <div>
        {props.disposable === true ? <div>disposable</div> : <div>reusable</div>}
      </div>
    </div>
  )

};


export default Offer;