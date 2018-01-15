import styled from 'styled-components';

export default styled.figcaption`
  width: 80%;
  margin: 0 auto;
  font-size: 24px;
  text-align: center;
  font-weight: bold;
  color: ${props => (props.active ? 'yellow' : 'black')};
`;
