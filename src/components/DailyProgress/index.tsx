import React from 'react';
import {useTheme} from 'styled-components/native';
import ProgressBar from '../ProgressBar';
import {
  Container,
  HeaderRow,
  Label,
  Percentage,
  ProgressBarWrapper,
} from './styles';

interface DailyProgressProps {
  progress: number;
}

const DailyProgress: React.FC<DailyProgressProps> = ({progress}) => {
  const theme = useTheme();

  return (
    <Container testID='daily-progress-container'>
      <HeaderRow>
        <Label>Progresso de Hoje</Label>
        <Percentage>{progress}%</Percentage>
      </HeaderRow>
      <ProgressBarWrapper>
        <ProgressBar
          progress={progress}
          color={theme.colors.primary}
          height={10}
          testID='daily-progress-bar'
        />
      </ProgressBarWrapper>
    </Container>
  );
};

export default DailyProgress;
