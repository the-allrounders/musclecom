import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { CardContent, CardActions, Typography, Button } from 'material-ui';
import Sensor from '../../../../stores/Objects/Sensor';

// components
import SensorConnectionItemIcon from './SensorConnectionItemIcon';

// styled
import StyledCard from './styled/StyledCard';
import StyledDetails from './styled/StyledDetails';
import StyledCardMedia from './styled/StyledCardMedia';
import StyledProgress from './styled/StyledProgress';

class SensorConnectionItemComponent extends Component {
  state = {
    completed: 0,
    showProgress: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.props.active) {
      if (nextProps.active) {
        clearTimeout(this.showProgressTimeout);
        this.setState({
          completed: 0,
          showProgress: true,
        });
        this.progressInterval = setInterval(() => {
          this.setState({
            completed:
              this.state.completed +
              100 / (nextProps.currentAction.calibrationTime / 350),
          });
        }, 350);
      } else {
        this.showProgressTimeout = setTimeout(() => {
          this.setState({
            showProgress: false,
            completed: 0,
          });
        }, 300);
        clearInterval(this.progressInterval);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.progressInterval);
    clearTimeout(this.showProgressTimeout);
  }

  render() {
    const {
      sensor,
      mode,
      onClick,
      active,
      interactive,
      currentAction,
    } = this.props;

    return (
      <Fragment>
        <StyledCard>
          <StyledDetails>
            <CardContent>
              <Typography type="headline">Sensor {sensor.channel}</Typography>
              {active ? (
                <div>
                  {currentAction.action === 'min' && (
                    <Typography type="subheading" color="secondary">
                      Span de spier nu zo min mogelijk aan.
                    </Typography>
                  )}
                  {currentAction.action === 'max' && (
                    <Typography type="subheading" color="secondary">
                      Span de spier nu 5 keer kort aan.
                    </Typography>
                  )}
                </div>
              ) : (
                <div>
                  <Typography type="subheading" color="secondary">
                    {sensor.connected ? 'Aangesloten' : 'Niet aangesloten'}
                  </Typography>
                  <Typography type="subheading" color="secondary">
                    {sensor.calibrated ? 'Ingesteld' : 'Nog niet ingesteld'}
                  </Typography>
                </div>
              )}
            </CardContent>
            {interactive && (
              <CardActions>
                <Button
                  dense
                  onClick={onClick}
                  disabled={active}
                  color="primary"
                >
                  {sensor.calibrated ? 'Opnieuw' : 'Nu'} instellen
                </Button>
              </CardActions>
            )}
          </StyledDetails>
          <StyledCardMedia
            component={p => (
              <SensorConnectionItemIcon {...p} sensor={sensor} mode={mode} />
            )}
            image="#"
          />
        </StyledCard>
        <StyledProgress
          mode="determinate"
          value={this.state.completed}
          hide={!this.state.showProgress}
        />
      </Fragment>
    );
  }
}

SensorConnectionItemComponent.propTypes = {
  sensor: PropTypes.instanceOf(Sensor).isRequired,
  mode: PropTypes.oneOf(['connect', 'calibrate']),
  interactive: PropTypes.bool,
};

SensorConnectionItemComponent.defaultProps = {
  mode: 'connect',
  interactive: false,
};

export default observer(SensorConnectionItemComponent);
