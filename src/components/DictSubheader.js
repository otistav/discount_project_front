import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';

const Subheader = (props) => {
  return(
    <div style={{ width: '100%'}}>
      <FloatingActionButton onClick={() => {props.openModal(); console.log(props)}}/>
    </div>
  )
};

export default Subheader;