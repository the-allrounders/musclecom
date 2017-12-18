import styled from 'styled-components';

export default styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  display: inline-block;
  border-radius: 50%;
  min-width: 40px;
  min-height: 40px;
  padding: 5px;
  background: red;
  color: yellow;
  text-align: center;
  line-height: 1;
  box-sizing: content-box;
  white-space: nowrap;
  font-size: 20px;
  font-weight: bold;
  &:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    padding-top: 100%;
    height: 0;
  }
`;
