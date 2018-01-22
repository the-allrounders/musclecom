import styled from 'styled-components';

export default styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  border-radius: 50%;
  min-width: 120px;
  min-height: 120px;
  background: yellow;
  color: red;
  text-align: center;
  line-height: 1;
  box-sizing: content-box;
  white-space: nowrap;
  font-size: 60px;
  font-weight: bold;
  box-shadow: 0 1px 1.5px 0 rgba(0, 0, 0, 0.12), 0 1px 1px 0 rgba(0, 0, 0, 0.24);
  &:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    padding-top: 100%;
    height: 0;
  }
`;
