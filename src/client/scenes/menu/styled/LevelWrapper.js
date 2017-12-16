import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${props => (props.actions === 2 ? 'column' : 'row')};
  height: 100vh;
  width: 100vw;
`;
