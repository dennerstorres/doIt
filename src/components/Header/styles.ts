import styled from 'styled-components/native';

interface ContainerProps {
  $topInset?: number;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  min-height: 60px;
  padding-top: ${props => props.$topInset || 0}px;
  background-color: ${props => props.theme.colors.primary};
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.typography.size.xlarge};
  font-weight: ${props => props.theme.typography.weight.bold};
`;
