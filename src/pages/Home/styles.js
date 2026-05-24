import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.tiny};
  align-items: center;
`;

export const CounterContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: ${props =>
    `${props.theme.spacing.large} ${props.theme.spacing.medium} ${props.theme.spacing.tiny} ${props.theme.spacing.medium}`};
`;

export const CounterBox = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CounterLabel = styled.Text`
  color: ${props => props.theme.colors.text};
  font-weight: ${props => props.theme.typography.weight.bold};
  font-size: ${props => props.theme.typography.size.medium};
`;

export const CounterValue = styled.Text`
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.accent};
  padding: ${props =>
    `${props.theme.spacing.nano} ${props.theme.spacing.small}`};
  border-radius: 10px;
  margin-left: ${props => props.theme.spacing.small};
  font-size: ${props => props.theme.typography.size.small};
  font-weight: ${props => props.theme.typography.weight.bold};
  overflow: hidden;
`;

export const FilterContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: ${props => props.theme.spacing.medium};
  margin-bottom: ${props => props.theme.spacing.small};
`;

export const FilterButton = styled.TouchableOpacity`
  padding: ${props =>
    `${props.theme.spacing.tiny} ${props.theme.spacing.medium}`};
  border-bottom-width: 2px;
  border-bottom-color: ${props =>
    props.active ? props.theme.colors.primary : 'transparent'};
`;

export const FilterText = styled.Text`
  color: ${props =>
    props.active ? props.theme.colors.primary : props.theme.colors.text};
  font-weight: ${props =>
    props.active
      ? props.theme.typography.weight.bold
      : props.theme.typography.weight.regular};
  font-size: ${props => props.theme.typography.size.medium};
`;
