import styled from 'styled-components';
import { LinearProgress } from 'material-ui';

export default styled(LinearProgress)`
  position: relative;
  top: -5px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  ${p =>
    !p.hide
      ? `
    opacity: 1;
  `
      : ''};
`;
