import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${props =>
    props.done ? props.theme.colors.primary : props.theme.colors.secondary};
  width: 100%;
  height: 50px;
  justify-content: center;
  padding: ${props =>
    `${props.theme.spacing.tiny} ${props.theme.spacing.large}`};
  margin-bottom: ${props => props.theme.spacing.tiny};
  flex-direction: row;
  align-items: center;
`;

export const TaskText = styled.Text`
  color: ${props =>
    props.done ? props.theme.colors.accent : props.theme.colors.white};
  text-decoration-line: ${props => (props.done ? 'line-through' : 'none')};
  font-size: ${props => props.theme.typography.size.medium};
  font-weight: ${props => props.theme.typography.weight.regular};
  flex: 1;
`;
