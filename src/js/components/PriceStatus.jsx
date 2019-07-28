import React, { Component } from "react";
import SvgIcon from '@material-ui/core/SvgIcon';

class PriceStatus extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {    
    if(this.props.status=='down') {
      return (
        <SvgIcon >
          <path d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z"/>
        </SvgIcon>
      );
    }
    else if(this.props.status=='up') {
      return (
        <SvgIcon >
          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
        </SvgIcon>
      );
    } else {
      return (
        <SvgIcon >
          <path d="M22 12l-4-4v3H3v2h15v3z"/><path d="M0 0h24v24H0z" fill="none"/>
        </SvgIcon>
      );
    }
  }
}


export default PriceStatus;