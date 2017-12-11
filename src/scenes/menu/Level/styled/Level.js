import styled from 'styled-components';

function calculateWidth(total) {
  return total > 6 ? `${100 / (total / 2)}%` : '33%';
}

export default styled.div`
  background-color: ${props => (props.active ? 'red' : 'white')};
  height: 50%;
  width: ${props => calculateWidth(props.total)};
`;
