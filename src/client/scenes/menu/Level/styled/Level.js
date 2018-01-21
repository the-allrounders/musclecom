import styled from 'styled-components';

function calculateWidth(total) {
  return total > 6 ? `${100 / (total / 2)}%` : '33.33%';
}

const Level = styled.div`
  position: relative;
  background-color: ${props => (props.active ? 'red' : 'white')};
  height: 50%;
  width: ${props => calculateWidth(props.total)};
`;

const LevelFigCaption = styled.figcaption`
  width: 80%;
  margin: 0 auto;
  font-size: 24px;
  text-align: center;
  font-weight: bold;
  padding-top: 10px;
  color: ${props => (props.active ? 'yellow' : 'black')};
`;

const LevelImage = styled.img`
  display: block;
  position: relative;
  max-width: 170px;
  max-height: 170px;
  margin: 0 auto;
`;

const LevelWrapper = styled.div`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;

const LevelAction = styled.div`
  display: inline-block;
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: yellow;
  font-size: 36px;
  color: red;
  font-weight: bold;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  text-align: center;
  padding: 15px;
`;

export { Level, LevelFigCaption, LevelImage, LevelWrapper, LevelAction };
