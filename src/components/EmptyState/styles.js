import styled from 'styled-components/native';

export const EmptyStateContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

export const EmptyStateText = styled.Text`
  color: ${props => props.theme.colors.accent};
  font-size: 16px;
  margin-top: 10px;
  text-align: center;
`;
