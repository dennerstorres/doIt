import styled from 'styled-components/native';

export const SearchContainer = styled.View`
  padding: ${props => props.theme.spacing.small}
    ${props => props.theme.spacing.large};
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.spacing.small};
  padding: 0 ${props => props.theme.spacing.medium};
  border: 1px solid ${props => props.theme.colors.accent};
  height: 40px;
`;

export const SearchInput = styled.TextInput.attrs(props => ({
  placeholderTextColor: props.theme.colors.accent,
}))`
  flex: 1;
  color: ${props => props.theme.colors.text};
  font-weight: ${props => props.theme.typography.weight.regular};
  font-size: ${props => props.theme.typography.size.medium};
  padding: 0 ${props => props.theme.spacing.small};
`;

export const ClearButton = styled.TouchableOpacity`
  padding: ${props => props.theme.spacing.tiny};
`;
