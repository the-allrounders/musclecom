import React from 'react';
// styled
import Bar from './styled/Bar';
import BarItem from './styled/BarItem';

const ProgressBar = ({ step }) => (
  <Bar>
    <BarItem done={step > 0} active={step === 1}>
      Verbinden
    </BarItem>
    <BarItem done={step > 1} active={step === 2}>
      Sensoren
    </BarItem>
    <BarItem done={step > 2} active={step === 3 || step === 4}>
      Kalibratie
    </BarItem>
  </Bar>
);

export default ProgressBar;
