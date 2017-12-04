import React from 'react';
import SensorConnection from "../../SensorConnection";

const SensorStepComponent = ({ sensors }) => (
  <section>
    <h2>Stap 1 - Sensoren</h2>
    <SensorConnection sensors={sensors} />
  </section>
);

export default SensorStepComponent;
