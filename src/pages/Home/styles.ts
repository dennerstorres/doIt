import styled from 'styled-components/native';

interface SortProps {
  $active?: boolean;
}

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
  border-radius: ${props => props.theme.spacing.medium};
  margin-left: ${props => props.theme.spacing.small};
  font-size: ${props => props.theme.typography.size.small};
  font-weight: ${props => props.theme.typography.weight.bold};
  overflow: hidden;
`;

export const LoadingIndicator = styled.ActivityIndicator.attrs(props => ({
  size: 'large',
  color: props.theme.colors.primary,
}))`
  margin-top: ${props => props.theme.spacing.large};
`;

export const SortContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  padding: 0 ${props => props.theme.spacing.medium};
  margin-bottom: ${props => props.theme.spacing.small};
`;

export const SortButton = styled.TouchableOpacity<SortProps>`
  flex-direction: row;
  align-items: center;
  background-color: ${props =>
    props.$active ? props.theme.colors.accent : 'transparent'};
  padding: ${props =>
    `${props.theme.spacing.tiny} ${props.theme.spacing.small}`};
  border-radius: ${props => props.theme.spacing.tiny};
  margin-left: ${props => props.theme.spacing.tiny};
`;

export const SortText = styled.Text<SortProps>`
  color: ${props =>
    props.$active ? props.theme.colors.white : props.theme.colors.text};
  font-size: ${props => props.theme.typography.size.small};
  font-weight: ${props =>
    props.$active
      ? props.theme.typography.weight.bold
      : props.theme.typography.weight.regular};
  margin-left: ${props => props.theme.spacing.tiny};
`;
