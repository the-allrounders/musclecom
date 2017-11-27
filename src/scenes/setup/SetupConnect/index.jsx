import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { routes } from '../../../router';
import { setupRoutes } from '../';
// Components
import QRCode from '../../../components/common/qr-code';

const SetupConnect = ({ actionStore }) => {
  if(!actionStore.ip) {
    return null;
  }

  return (
    <div>
      <QRCode>{actionStore.ip}/#{routes.SETUP}{setupRoutes.ADMIN}</QRCode>
    </div>
  );
};

SetupConnect.propTypes = {
  actionStore: PropTypes.shape({
    ip: PropTypes.string,
  }).isRequired,
};

export default inject('actionStore')(observer(SetupConnect));
