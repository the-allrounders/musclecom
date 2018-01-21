import React from 'react';
import { Typography } from 'material-ui';

// Components
import CalibrateSensors from '../../CalibrateSensors';

// styled
import CalibrationStepWrapper from './styled/CalibrationStepWrapper';

const CalibrationStepComponent = () => (
  <CalibrationStepWrapper>
    <Typography paragraph>
      Om te weten hoe de verschillende spieren functioneren gaan we een paar
      oefeningen doen.
    </Typography>
    <Typography paragraph>
      Per spier willen we erachter komen wat het verschil is tussen wel en niet
      aanspannen. Om hier achter te komen gaan we per spier eerst een aantal
      seconden niet aanspannen, en daarna een aantal seconden wel. Span de spier
      dan niet per se zo <strong>hard</strong> mogelijk aan, maar net zo hard
      als dat jij het vol kunt houden om die actie vaker op een dag te herhalen.
    </Typography>
    <Typography paragraph>
      De begeleider bepaalt wanneer een oefening gelukt is. Je kunt dus net zo
      vaak oefenen tot het voor je gevoel goed gaat.
    </Typography>
    <CalibrateSensors interactive />
  </CalibrationStepWrapper>
);

export default CalibrationStepComponent;
