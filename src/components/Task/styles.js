import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${props =>
    props.done ? props.theme.colors.primary : props.theme.colors.secondary};
  height: 60px;
  justify-content: center;
  padding: ${props =>
    `${props.theme.spacing.tiny} ${props.theme.spacing.large}`};
  margin-bottom: ${props => props.theme.spacing.small};
  margin-horizontal: ${props => props.theme.spacing.small};
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

export const TaskText = styled.Text`
  color: ${props =>
    props.done ? props.theme.colors.accent : props.theme.colors.white};
  text-decoration-line: ${props => (props.done ? 'line-through' : 'none')};
  font-size: ${props => props.theme.typography.size.medium};
  font-weight: ${props => props.theme.typography.weight.regular};
  flex: 1;
`;
