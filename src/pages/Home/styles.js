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
  font-weight: bold;
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
  font-weight: bold;
  overflow: hidden;
`;
