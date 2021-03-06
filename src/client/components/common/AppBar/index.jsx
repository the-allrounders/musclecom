import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography } from 'material-ui';

const AppBarComponent = ({ title, subtitle }) => (
  <AppBar>
    <Toolbar>
      <Typography type="title" color="inherit" styles={{ flex: 1 }}>
        {subtitle && `${subtitle} | `}
        {title}
      </Typography>
    </Toolbar>
  </AppBar>
);

AppBarComponent.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

AppBarComponent.defaultProps = {
  title: 'MuscleCom',
  subtitle: undefined,
};

export default AppBarComponent;
