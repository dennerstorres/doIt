import React, {useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'styled-components/native';
import {useTasks} from '../../hooks/useTasks';
import {getTaskStats} from '../../utils/taskUtils';
import Header from '../../components/Header';
import {
  Container,
  Section,
  SectionTitle,
  Card,
  MainStatContainer,
  MainStatValue,
  MainStatLabel,
  Row,
  SpacedRow,
  Label,
  Value,
  ProgressBarContainer,
  SpacedProgressBarContainer,
  ProgressBar,
  StatItem,
  EmptyMessage,
} from './styles';

const Statistics: React.FC = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const {tasks} = useTasks();

  const stats = useMemo(() => getTaskStats(tasks || []), [tasks]);

  const priorityLabels: Record<string, string> = {
    high: 'Alta',
    medium: 'Média',
    low: 'Baixa',
    none: 'Nenhuma',
  };

  const categoryLabels: Record<string, string> = {
    work: 'Trabalho',
    personal: 'Pessoal',
    shopping: 'Compras',
    health: 'Saúde',
    study: 'Estudo',
    none: 'Geral',
  };

  if (!tasks || tasks.length === 0) {
    return (
      <Container>
        <Header showBackButton onBack={() => navigation.goBack()} />
        <EmptyMessage>Crie algumas tarefas para ver estatísticas.</EmptyMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Header showBackButton onBack={() => navigation.goBack()} />

      <Section>
        <SectionTitle>Visão Geral</SectionTitle>
        <Card>
          <MainStatContainer>
            <MainStatValue>{stats.completionPercentage}%</MainStatValue>
            <MainStatLabel>Tarefas Concluídas</MainStatLabel>
          </MainStatContainer>

          <SpacedProgressBarContainer>
            <ProgressBar
              $width={`${stats.completionPercentage}%`}
              $color={theme.colors.primary}
            />
          </SpacedProgressBarContainer>

          <SpacedRow>
            <Label>Total de Tarefas</Label>
            <Value>{stats.total}</Value>
          </SpacedRow>
          <Row>
            <Label>Concluídas</Label>
            <Value>{stats.completed}</Value>
          </Row>
          <Row>
            <Label>Arquivadas</Label>
            <Value>{stats.totalArchived}</Value>
          </Row>
        </Card>

        <SectionTitle>Por Prioridade</SectionTitle>
        <Card>
          {(Object.keys(stats.byPriority) as Array<
            keyof typeof stats.byPriority
          >)
            .sort((a, b) => {
              const order = {high: 0, medium: 1, low: 2, none: 3};
              return order[a] - order[b];
            })
            .map(priority => {
              const count = stats.byPriority[priority];
              const percentage =
                stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
              const colors = {
                high: theme.colors.error,
                medium: theme.colors.warning,
                low: theme.colors.info,
                none: theme.colors.accent,
              };

              return (
                <StatItem key={priority}>
                  <Row>
                    <Label>{priorityLabels[priority]}</Label>
                    <Value>
                      {count} ({percentage}%)
                    </Value>
                  </Row>
                  <ProgressBarContainer>
                    <ProgressBar
                      $width={`${percentage}%`}
                      $color={colors[priority]}
                    />
                  </ProgressBarContainer>
                </StatItem>
              );
            })}
        </Card>

        <SectionTitle>Por Categoria</SectionTitle>
        <Card>
          {(Object.keys(stats.byCategory) as Array<
            keyof typeof stats.byCategory
          >)
            .filter(cat => stats.byCategory[cat] > 0)
            .map(category => {
              const count = stats.byCategory[category];
              const percentage =
                stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;

              return (
                <StatItem key={category}>
                  <Row>
                    <Label>{categoryLabels[category]}</Label>
                    <Value>
                      {count} ({percentage}%)
                    </Value>
                  </Row>
                  <ProgressBarContainer>
                    <ProgressBar
                      $width={`${percentage}%`}
                      $color={theme.colors.secondary}
                    />
                  </ProgressBarContainer>
                </StatItem>
              );
            })}
        </Card>
      </Section>
    </Container>
  );
};

export default Statistics;
