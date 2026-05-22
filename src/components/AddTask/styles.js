import styled from 'styled-components/native';

export const TaskAdd = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

export const TaskText = styled.TextInput.attrs({
  placeholderTextColor: '#9cc5a1',
})`
  height: 40px;
  width: 80%;
  background-color: #fff;
  padding-left: 10px;
  color: #1f2421;
`;

export const ButtonAdd = styled.TouchableOpacity`
  height: 40px;
  width: 20%;
  background-color: #49a078;
  justify-content: center;
  align-items: center;
`;
