import styled from 'styled-components/native';

export const EmptyStateContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: ${props => props.theme.spacing.huge};
`;

export const EmptyStateText = styled.Text`
  color: ${props => props.theme.colors.accent};
  font-size: ${props => props.theme.typography.size.large};
  font-weight: ${props => props.theme.typography.weight.regular};
  margin-top: ${props => props.theme.spacing.medium};
  text-align: center;
`;
