import React from 'react';
import SetupConnect from '../SetupConnect';
import SensorStep from './SensorStep';

const ClientSetupComponent = ({ actionStore, getStep }) => {
  const step = getStep();
  return (
    <section>
      <h1>Instellen</h1>
      {step === 1 && <SetupConnect />}
      {(step === 2 || step === 3) && <SensorStep sensors={actionStore.sensors} />}
    </section>
  );
};

export default ClientSetupComponent;
