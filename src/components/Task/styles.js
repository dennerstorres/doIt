import styled from 'styled-components/native';

//#1f2421 Dark Jungle Green
//#216869 Skobeloff
//#49a078 Shiny Shamrock
//#9cc5a1 Eton Blue
//#dce1de Gainsboro

export const Container = styled.View`
  background-color: ${props =>
    props.done ? props.theme.colors.primary : props.theme.colors.secondary};
  width: 100%;
  height: 50px;
  justify-content: center;
  padding: 5px 15px;
  margin-bottom: 5px;
  flex-direction: row;
  align-items: center;
`;

export const TaskText = styled.Text`
  color: ${props =>
    props.done ? props.theme.colors.accent : props.theme.colors.white};
  text-decoration-line: ${props => (props.done ? 'line-through' : 'none')};
  flex: 1;
`;
