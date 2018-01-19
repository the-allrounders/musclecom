import styled from 'styled-components';

export default styled.figcaption`
  width: 80%;
  margin: 0 auto;
  font-size: 24px;
  text-align: center;
  font-weight: bold;
  padding-top: 10px;
  color: ${props => (props.active ? 'yellow' : 'black')};
`;
