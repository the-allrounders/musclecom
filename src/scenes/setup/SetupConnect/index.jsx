import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import { routes } from '../../../router';

const SetupConnect = ({ actionStore }) => {
  if(!actionStore.ip) {
    return null;
  }

  return (
    <div>
      <QRCode value={`${actionStore.ip}/#${routes.SETUP_ADMIN}`}>{actionStore.ip}/#{routes.SETUP_ADMIN}</QRCode>
    </div>
  );
};

SetupConnect.propTypes = {
  actionStore: PropTypes.shape({
    ip: PropTypes.string,
  }).isRequired,
};

export default inject('actionStore')(observer(SetupConnect));
