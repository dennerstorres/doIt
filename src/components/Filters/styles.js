import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: ${props => props.theme.spacing.small}
    ${props => props.theme.spacing.medium};
  background-color: ${props => props.theme.colors.background};
`;

export const FilterButton = styled.TouchableOpacity`
  padding: ${props => props.theme.spacing.tiny}
    ${props => props.theme.spacing.medium};
  border-radius: 20px;
  background-color: ${props =>
    props.active ? props.theme.colors.primary : 'transparent'};
  border: 1px solid
    ${props =>
      props.active ? props.theme.colors.primary : props.theme.colors.accent};
`;

export const FilterText = styled.Text`
  color: ${props =>
    props.active ? props.theme.colors.white : props.theme.colors.secondary};
  font-size: ${props => props.theme.typography.size.small};
  font-weight: ${props => props.theme.typography.weight.bold};
`;
