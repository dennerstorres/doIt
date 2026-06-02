import React from 'react';
import {ProgressBarContainer, ProgressBarFill} from './styles';

interface ProgressBarProps {
  progress: number; // 0 to 100
  color?: string;
  height?: number;
  testID?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color,
  height,
  testID,
}) => {
  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <ProgressBarContainer $height={height} testID={testID}>
      <ProgressBarFill
        $width={`${normalizedProgress}%`}
        $color={color}
        testID={`${testID}-fill`}
      />
    </ProgressBarContainer>
  );
};

export default ProgressBar;
