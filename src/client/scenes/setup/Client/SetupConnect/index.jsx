import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import { CardMedia, Typography } from 'material-ui';
import { routes } from '../../../../router';

// Components
import AppBar from '../../AppBar';

// styled
import QRCardWrapper from './styled/QRCardWrapper';
import StyledCard from './styled/StyledCard';
import StyledCardContent from './styled/StyledCardContent';

const SetupConnect = ({ actionStore }) => {
  if (!actionStore.ip) return null;

  return (
    <Fragment>
      <AppBar />
      <QRCardWrapper>
        <StyledCard>
          <CardMedia
            component={() => (
              <QRCode
                size={200}
                value={`${actionStore.ip}/#${routes.SETUP_ADMIN}`}
              />
            )}
            image="#"
          />
          <StyledCardContent>
            <Typography component="p">
              Open de MuscleCom applicatie en scan bovenstaande afbeelding.
            </Typography>
          </StyledCardContent>
        </StyledCard>
      </QRCardWrapper>
    </Fragment>
  );
};

SetupConnect.propTypes = {
  actionStore: PropTypes.shape({
    ip: PropTypes.string,
  }).isRequired,
};

export default inject('actionStore')(observer(SetupConnect));
