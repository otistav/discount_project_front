import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import '../styles/subheader.css';


const Subheader = (props) => {
  return(
    <div className="subheader">
      {props.useButton ? <RaisedButton
        className="button"
        primary={true}
        onClick={() => {props.openModal(); console.log(props)}}
        label={props.label}
        icon={<ContentAdd/>}
      /> : null}



      <div className="subheader-name">
        {props.subheaderName}
      </div>

    </div>
  )
};

export default Subheader;