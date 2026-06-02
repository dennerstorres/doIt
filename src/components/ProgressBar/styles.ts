import styled from 'styled-components/native';

interface ContainerProps {
  $height?: number;
}

interface FillProps {
  $width: string;
  $color?: string;
}

export const ProgressBarContainer = styled.View<ContainerProps>`
  width: 100%;
  height: ${props => props.$height || 8}px;
  background-color: ${props => props.theme.colors.background};
  border-radius: 4px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.View<FillProps>`
  height: 100%;
  width: ${props => props.$width};
  background-color: ${props => props.$color || props.theme.colors.primary};
  border-radius: 4px;
`;
