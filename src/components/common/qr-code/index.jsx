import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode';

class QRCodeComponent extends Component {
  componentDidMount() {
    QRCode.toCanvas(this.canvas, this.props.children, () => {});
  }

  render() {
    return <canvas ref={c => this.canvas = c} />;
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
  };
}

export default QRCodeComponent;
