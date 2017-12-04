import styled from 'styled-components';

export default styled.li`
  flex: 1;
  list-style: none;
  ${p => p.done ? `
    background-color: lightblue;
    color: white;
  ` : `
    background-color: grey;
  `}
  ${p => p.active ? `
    background-color: blue;
  ` : ''}
`;
