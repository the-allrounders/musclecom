import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import QRCode from 'qrcode.react';
import { CardMedia, Typography } from 'material-ui';
import { actionStore } from '../../../../stores';
import { routes } from '../../../../router';

// Components
import AppBar from '../../common/AppBar';

// styled
import QRCardWrapper from './styled/QRCardWrapper';
import StyledCard from './styled/StyledCard';
import StyledCardContent from './styled/StyledCardContent';

const SetupConnect = () => {
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
                value={`${actionStore.ip}/#${routes.REMOTE}`}
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

export default observer(SetupConnect);
