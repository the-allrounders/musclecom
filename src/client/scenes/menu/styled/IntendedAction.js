import styled from 'styled-components';

const IntendedAction = styled.span`
  z-index: 10;
  display: block;
  vertical-align: middle;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const fill = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  clip: rect(0px, 60px, 120px, 0px);
  background-color: yellow;
`;

const LeftFill = fill.extend`
  z-index: 1;
  animation: left 1.2s linear both;
  @keyframes left {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      transform: rotate(180deg);
    }
  }

  @-webkit-keyframes left {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(180deg);
    }
  }
`;

const RightFill = fill.extend`
  z-index: 3;
  animation: right 1.2s linear both ;
  animation-delay: 1.2s;
  
  @keyframes right {
    0% {
      -webkit-transform:rotate(0deg);
    }
    100% {
      transform:rotate(180deg);
    }
  }

  @-webkit-keyframes right {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(180deg);
    }
  }
`;

const LeftCircle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  clip: rect(0px, 120px, 120px, 60px);
  border-radius: 100%;
  background-color: #fff;
  top: 0;
`;

const RightCircle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  clip: rect(0px, 120px, 120px, 60px);
  border-radius: 100%;
  background-color: #fff;
  z-index: 3;
  transform: rotate(180deg);
  top: 0;
`;

export { IntendedAction, LeftCircle, RightCircle, RightFill, LeftFill };
