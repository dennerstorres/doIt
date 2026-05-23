import styled from 'styled-components/native';

export const TaskAdd = styled.View`
  flex-direction: row;
  margin-top: ${props => props.theme.spacing.medium};
`;

export const TaskText = styled.TextInput.attrs(props => ({
  placeholderTextColor: props.theme.colors.accent,
}))`
  height: 40px;
  width: 80%;
  background-color: ${props => props.theme.colors.white};
  padding-left: ${props => props.theme.spacing.medium};
  color: ${props => props.theme.colors.text};
`;

export const ButtonAdd = styled.TouchableOpacity`
  height: 40px;
  width: 20%;
  background-color: ${props => props.theme.colors.primary};
  justify-content: center;
  align-items: center;
`;
