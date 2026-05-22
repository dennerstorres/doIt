import styled from 'styled-components/native';

//#1f2421 Dark Jungle Green
//#216869 Skobeloff
//#49a078 Shiny Shamrock
//#9cc5a1 Eton Blue
//#dce1de Gainsboro

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  padding: 5px;
  align-items: center;
`;

export const GeneralText = styled.Text`
  color: ${props => props.theme.colors.text};
  margin-bottom: 5px;
`;

export const WarningText = styled.Text`
  color: ${props => props.theme.colors.secondary};
  text-align: center;
`;

export const CounterContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 15px 10px 5px 10px;
`;

export const CounterBox = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CounterLabel = styled.Text`
  color: ${props => props.theme.colors.text};
  font-weight: bold;
  font-size: 14px;
`;

export const CounterValue = styled.Text`
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.accent};
  padding: 2px 8px;
  border-radius: 10px;
  margin-left: 8px;
  font-size: 12px;
  font-weight: bold;
  overflow: hidden;
`;
