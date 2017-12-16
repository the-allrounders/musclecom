import React from 'react';
import SensorConnection from '../../SensorConnection';

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
    <button onClick={pager.next}>Ja, deze sensoren kloppen</button>
    <SensorConnection sensors={sensors} />
  </section>
);

export default SensorStepComponent;
