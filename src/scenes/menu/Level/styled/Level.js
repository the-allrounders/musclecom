import styled from 'styled-components';

export default styled.div`
  background-color: ${props => props.active ? 'red' : 'white'};
  flex: 1;
  flex-grow: 1;
  height: 50%;
  width: 33%;
`;
