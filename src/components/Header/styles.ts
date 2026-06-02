import styled from 'styled-components/native';

interface ContainerProps {
  $topInset?: number;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  min-height: 60px;
  padding-top: ${props => props.$topInset || 0}px;
  background-color: ${props => props.theme.colors.primary};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Title = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.typography.size.xlarge};
  font-weight: ${props => props.theme.typography.weight.bold};
`;

export const ActionButton = styled.TouchableOpacity`
  position: absolute;
  right: ${props => props.theme.spacing.medium};
  bottom: ${props => props.theme.spacing.medium};
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: ${props => props.theme.spacing.medium};
  bottom: ${props => props.theme.spacing.medium};
`;
