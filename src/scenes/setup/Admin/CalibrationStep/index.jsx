import React from 'react';

const CalibrationStepComponent = ({ pager }) => (
  <section>
    <h2>Stap 2 - Kalibratie</h2>
    <p>
      Om te weten hoe de verschillende spieren functioneren gaan we een paar
      oefeningen doen.
    </p>
    <p>
      Per spier willen we erachter komen wat het verschil is tussen wel en niet
      aanspannen. Om hier achter te komen gaan we per spier eerst een aantal
      seconden niet aanspannen, en daarna een aantal seconden wel. Span de spier
      dan niet per se zo <strong>hard</strong> mogelijk aan, maar net zo hard
      als dat jij het vol kunt houden om die actie vaker op een dag te herhalen.
    </p>
    <p>
      De begeleider bepaalt wanneer een oefening gelukt is. Je kunt dus net zo
      vaak oefenen tot het voor je gevoel goed gaat.
    </p>
    <button onClick={pager.next}>Start eerste oefening</button>
  </section>
);

export default CalibrationStepComponent;
