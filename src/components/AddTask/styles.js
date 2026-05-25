import styled from 'styled-components/native';

export const TaskAdd = styled.View`
  flex-direction: row;
  margin-top: ${props => props.theme.spacing.medium};
`;

export const InputContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  background-color: ${props => props.theme.colors.white};
  height: 40px;
  border-width: 1px;
  border-color: ${props => props.theme.colors.accent};
`;

export const TaskText = styled.TextInput.attrs(props => ({
  placeholderTextColor: props.theme.colors.accent,
}))`
  flex: 1;
  height: 40px;
  padding-left: ${props => props.theme.spacing.medium};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.size.medium};
  font-weight: ${props => props.theme.typography.weight.regular};
`;

export const ClearButton = styled.TouchableOpacity`
  padding: 0 ${props => props.theme.spacing.small};
  height: 100%;
  justify-content: center;
`;

export const ButtonAdd = styled.TouchableOpacity`
  height: 40px;
  width: 50px;
  background-color: ${props => props.theme.colors.primary};
  justify-content: center;
  align-items: center;
`;

export const Counter = styled.Text`
  font-size: ${props => props.theme.typography.size.small};
  color: ${props => props.theme.colors.secondary};
  text-align: right;
  margin-top: ${props => props.theme.spacing.tiny};
  margin-right: 50px;
`;
