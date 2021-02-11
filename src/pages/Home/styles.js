import styled from 'styled-components/native';

//#1f2421 Dark Jungle Green
//#216869 Skobeloff
//#49a078 Shiny Shamrock
//#9cc5a1 Eton Blue
//#dce1de Gainsboro

export const Container = styled.View`
  flex: 1;
  background-color: #dce1de;
  padding: 5px;
  align-items: center;
`;

export const GeneralText = styled.Text`
  color: #1f2421;
  margin-bottom: 5px;
`;

export const WarningText = styled.Text`
  color: #216869;
  text-align: center;
`;

export const TaskAdd = styled.View`
  flex-direction: row;
`;

export const TaskText = styled.TextInput`
  height: 40px;
  width: 80%;
  background-color: #FFF;
`;

export const ButtonAdd = styled.TouchableOpacity`
  height: 40px;
  width: 20%;
  background-color: #49a078;
  justify-content: center;
  align-items: center;
`;

export const TaskList = styled.View`
  width: 100%;
  margin-top: 10px;
`;
