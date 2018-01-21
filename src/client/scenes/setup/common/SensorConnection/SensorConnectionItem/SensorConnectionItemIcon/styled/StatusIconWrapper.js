import styled from 'styled-components';

export default styled.div`
  display: inline;
  position: absolute;
  width: 40px;
  height: 40px;
  margin-top: 10px;
  margin-left: -48px;
  background-color: ${p => p.bgColor};
  border-radius: 2px;
  transition: background-color 0.5s ease-in-out;
`;
