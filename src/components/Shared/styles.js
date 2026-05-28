import styled from 'styled-components/native';

export const BaseInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${props => props.theme.colors.white};
  min-height: 40px;
  border-width: 1px;
  border-color: ${props => props.theme.colors.accent};
`;

export const BaseClearButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const BaseInput = styled.TextInput.attrs(props => ({
  placeholderTextColor: props.theme.colors.accent,
}))`
  flex: 1;
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.size.medium};
  font-weight: ${props => props.theme.typography.weight.regular};
`;
