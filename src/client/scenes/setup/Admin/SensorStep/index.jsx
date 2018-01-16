import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { PropTypes as MobxPropTypes } from 'mobx-react';
import SensorConnection from '../../SensorConnection';
import Sensor from '../../../../stores/Objects/Sensor';

const SensorStepComponent = ({ sensors, pager }) => (
  <section>
    <h2>Stap 1 - Sensoren</h2>
    <p>
      Sluit nu alle sensoren aan en bevestig de stickers op de juiste spieren.
      Hieronder kun je zien welke sensoren er nu zijn aangesloten. Zodra alle
      spieren die gebruikt kunnen worden zijn voorzien van een sensor, kun je
      door naar het instellen van de sensoren.
    </p>
    <p>
      Let op, dit scherm past automatisch aan als je sensors aansluit of
      loskoppelt.
    </p>
    <Button raised color="primary" onClick={pager.next}>
      Ja, deze sensoren kloppen
    </Button>
    <SensorConnection sensors={sensors} />
  </section>
);

SensorStepComponent.propTypes = {
  sensors: MobxPropTypes.observableArrayOf(PropTypes.instanceOf(Sensor))
    .isRequired,
  pager: PropTypes.shape({
    next: PropTypes.func.isRequired,
  }).isRequired,
};

export default SensorStepComponent;
