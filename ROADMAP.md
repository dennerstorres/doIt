# ROADMAP — doIt

## Stack atual identificada

- React Native 0.63.4
- React 16
- React Navigation 5
- Styled Components
- Sem backend
- Sem persistência
- Sem autenticação
- Sem testes reais

---

# Convenções

- [ ] Não iniciado
- [~] Em andamento
- [x] Finalizado
- [!] Bloqueado

---

# FASE 1 — Estabilização Base

## Infraestrutura

- [x] Atualizar README com setup completo
- [x] Criar `.env.example`
- [x] Configurar editorconfig
- [x] Padronizar eslint
- [x] Padronizar prettier
- [x] Configurar lint script completo
- [x] Configurar prettier script
- [x] Configurar husky
- [x] Configurar lint-staged
- [x] Adicionar scripts de validação
- [!] Validar compatibilidade Android atual
- [!] Validar compatibilidade iOS atual

## Estrutura

- [x] Criar estrutura `/src/services`
- [x] Criar estrutura `/src/hooks`
- [x] Criar estrutura `/src/utils`
- [x] Criar estrutura `/src/constants`
- [x] Criar estrutura `/src/theme`
- [x] Criar estrutura `/src/storage`
- [!] Criar estrutura `/src/types`
- [x] Criar estrutura `/src/context`

---

# FASE 2 — Correções Críticas

## Modelagem

- [x] Adicionar id único nas tarefas
- [x] Corrigir keyExtractor usando id
- [x] Remover mutação direta de estado
- [x] Corrigir update imutável de tasks
- [x] Adicionar validação para tarefa vazia
- [x] Impedir tarefas duplicadas
- [x] Adicionar limite mínimo de caracteres
- [x] Adicionar limite máximo de caracteres

## UX Base

- [x] Limpar input após submit corretamente
- [x] Fechar teclado após adicionar task
- [x] Adicionar placeholder melhor
- [x] Adicionar feedback visual ao concluir
- [x] Adicionar feedback visual ao deletar
- [x] Adicionar empty state
- [x] Adicionar contador de tarefas
- [x] Adicionar contador de tarefas concluídas

---

# FASE 3 — Persistência Local

## Storage

- [x] Instalar AsyncStorage
- [x] Criar service de persistência
- [x] Persistir tarefas localmente
- [x] Carregar tarefas automaticamente
- [x] Criar estratégia de fallback
- [x] Adicionar tratamento de erro no storage
- [x] Adicionar loading inicial

## Estrutura de Dados

- [x] Criar model Task
- [x] Padronizar estrutura de task
- [x] Criar factory de tasks
- [x] Criar utilitários de transformação

---

# FASE 4 — Refatoração Arquitetural

## Componentização

- [x] Separar lógica de Home em hooks
- [x] Criar hook useTasks
- [x] Criar TaskList component
- [x] Criar AddTask component
- [x] Criar EmptyState component
- [x] Criar Header component
- [x] Remover lógica inline

## Organização

- [x] Extrair estilos repetidos
- [x] Criar theme global
- [x] Padronizar cores
- [x] Padronizar espaçamentos
- [x] Padronizar tipografia

---

# FASE 5 — TypeScript

- [ ] Instalar TypeScript
- [ ] Configurar tsconfig
- [ ] Migrar App.js para App.tsx
- [ ] Criar tipagem Task
- [ ] Migrar componentes principais
- [ ] Migrar hooks
- [ ] Migrar navegação
- [ ] Remover arquivos JS restantes

---

# FASE 6 — Melhorias de UX/UI

- [x] Melhorar design geral
- [x] Melhorar input de tarefas
- [x] Melhorar animações
- [x] Adicionar dark mode
- [!] Criar tema light/dark
- [x] Melhorar swipe actions
- [ ] Adicionar ícones consistentes
- [ ] Melhorar responsividade
- [x] Adicionar confirmação para deletar
- [x] Adicionar undo ao deletar
- [!] Adicionar filtro Todas
- [!] Adicionar filtro Pendentes
- [!] Adicionar filtro Concluídas
- [x] Adicionar ordenação
- [x] Adicionar busca

---

# FASE 7 — Funcionalidades Reais

- [x] Adicionar edição de tarefas
- [x] Adicionar prioridade
- [ ] Adicionar categoria
- [ ] Adicionar data limite
- [ ] Adicionar lembretes locais
- [ ] Adicionar repetição de tarefas
- [ ] Adicionar arquivamento
- [ ] Adicionar estatísticas
- [ ] Adicionar progresso diário
- [ ] Adicionar streak de produtividade
- [ ] Adicionar tela de histórico

---

# FASE 8 — Performance e Qualidade

- [ ] Otimizar FlatList
- [ ] Adicionar memoização
- [ ] Evitar rerenders desnecessários
- [ ] Melhorar performance de swipe
- [ ] Revisar dependências pesadas
- [x] Configurar Jest corretamente
- [ ] Criar testes unitários hooks
- [ ] Criar testes components
- [ ] Criar testes de integração
- [ ] Configurar coverage

---

# FASE 9 — Atualização Tecnológica

- [ ] Atualizar React Native
- [ ] Atualizar React Navigation
- [ ] Revisar dependências deprecated
- [ ] Remover bibliotecas obsoletas
- [ ] Migrar gesture-handler se necessário
- [ ] Validar Android 13+
- [ ] Validar Android 14+
- [ ] Validar iOS recente
- [ ] Corrigir warnings de build

---

# FASE 10 — Backend Future Ready

- [ ] Criar camada services
- [ ] Criar client HTTP
- [ ] Criar interceptors
- [ ] Criar estrutura repository pattern
- [ ] Preparar sincronização futura
- [ ] Criar adapter offline-first
- [ ] Criar queue local
- [ ] Criar estratégia de sync
- [ ] Criar controle de conflito

---

# FASE 11 — Segurança

- [ ] Sanitizar inputs
- [ ] Revisar persistência segura
- [ ] Validar permissões
- [ ] Revisar logs sensíveis

---

# FASE 12 — Observabilidade

- [ ] Configurar crash reporting
- [ ] Configurar analytics
- [ ] Adicionar logs estruturados
- [ ] Criar error boundary

---

# FASE 13 — Publicação

## Android

- [ ] Configurar ícone final
- [ ] Configurar splash screen
- [ ] Configurar nome final app
- [ ] Configurar versão
- [ ] Gerar signed APK
- [ ] Gerar AAB
- [ ] Configurar Play Store assets

## iOS

- [ ] Configurar ícones iOS
- [ ] Configurar splash iOS
- [ ] Configurar signing
- [ ] Gerar build release

## Loja

- [ ] Criar política de privacidade
- [ ] Criar screenshots
- [ ] Criar descrição da store
- [ ] Publicar beta fechado
- [ ] Corrigir feedbacks
- [ ] Publicar v1.0

---

# HISTÓRICO DE IMPLEMENTAÇÃO

## Padronizar eslint

- **Implementação**: Configuração robusta do ESLint estendendo `@react-native-community` e sincronizada com Prettier e EditorConfig.
- **Decisões Técnicas**:
  - Uso de regras explícitas para indentação (2 espaços), aspas simples e ponto e vírgula obrigatório.
  - Adição de `.eslintignore` para evitar linting em código gerado e dependências.
  - Correção automática de >100 erros de estilo.
  - Refatoração manual de loops em `Home/index.js` para usar imutabilidade e evitar shadowing de variáveis.
  - Fix da configuração de testes (Jest) que estava quebrada devido a mocks ausentes do `react-native-gesture-handler`.
- **Limitações**: Algumas regras do Prettier podem conflitar com preferências pessoais, mas seguem o padrão da comunidade RN.
- **Riscos**: Mudanças no `package.json` para o Jest podem precisar de ajustes se novas libs nativas forem adicionadas.

## Padronizar prettier

- **Implementação**: Sincronização das configurações do Prettier entre `.prettierrc.js` e `.eslintrc.js` e criação do arquivo `.prettierignore`.
- **Decisões Técnicas**:
  - Adição de `jsxSingleQuote: true` na configuração do ESLint para alinhar com o Prettier.
  - Criação do `.prettierignore` espelhando o `.eslintignore` para evitar formatação de arquivos gerados e dependências.
  - Execução de formatação em todo o projeto para garantir consistência.
- **Limitações**: O uso de `jsxBracketSameLine` gera avisos de depreciação no Prettier 3+, mas foi mantido para preservar o padrão atual do projeto.
- **Riscos**: Nenhum identificado.

## Validar compatibilidade Android atual

- **Status**: [!] Bloqueado.
- **Motivo**: Incompatibilidade entre a versão do Java instalada no ambiente (Java 21) e a versão do Gradle utilizada no projeto (Gradle 6.2). O Gradle 6.2 não suporta Java 21, resultando em erros de inicialização do Groovy.
- **Sugestão de Desbloqueio**: Instalar uma versão compatível do JDK (ex: JDK 8 ou 11) ou atualizar o Gradle e o Android Gradle Plugin para versões compatíveis com Java 21.

## Validar compatibilidade iOS atual

- **Status**: [!] Bloqueado.
- **Motivo**: O ambiente de execução atual não possui o sistema operacional macOS, necessário para a validação de builds iOS.
- **Sugestão de Desbloqueio**: Executar a validação em um ambiente com macOS e Xcode configurados.

## Criar estrutura /src/services

- **Implementação**: Criação do diretório `/src/services` para centralizar a lógica de serviços (API, storage, etc.).
- **Decisões Técnicas**:
  - Inclusão de um arquivo `.gitkeep` para garantir que o diretório vazio seja rastreado pelo Git.
- **Limitações**: O diretório está atualmente vazio, aguardando a implementação de serviços específicos.
- **Riscos**: Nenhum identificado.

## Configurar lint script completo

- **Implementação**: Expansão dos scripts de lint no `package.json` para suportar verificação detalhada e correção automática.
- **Decisões Técnicas**:
  - Atualização do script `lint` para especificar explicitamente a extensão `.js`.
  - Adição do script `lint:fix` para automatizar a correção de problemas de estilo detectados.
- **Limitações**: Restrito a arquivos `.js` conforme a base de código atual.
- **Riscos**: Nenhum identificado.

## Configurar prettier script

- **Implementação**: Adição de scripts Prettier ao `package.json` para verificação e correção automática de formatação.
- **Decisões Técnicas**:
  - Adição do script `prettier` usando `prettier --check .` para validar a formatação de todos os arquivos.
  - Adição do script `prettier:fix` usando `prettier --write .` para aplicar correções automáticas de formatação.
- **Limitações**: O Prettier formata todos os arquivos suportados na raiz do projeto, respeitando o `.prettierignore`.
- **Riscos**: Nenhum identificado.

## Configurar lint-staged

- **Implementação**: Configuração do `lint-staged` para executar ESLint e Prettier apenas em arquivos staged.
- **Decisões Técnicas**:
  - Instalação do `lint-staged` como dependência de desenvolvimento.
  - Configuração no `package.json` para rodar `eslint --fix` e `prettier --write` em arquivos `.js`.
  - Atualização do hook de `pre-commit` do Husky para usar `npx lint-staged`.
- **Limitações**: Restrito a arquivos `.js` no momento.
- **Riscos**: Se muitos arquivos forem alterados simultaneamente, o tempo do pre-commit pode aumentar, mas ainda será mais rápido que rodar o lint no projeto todo.

## Configurar husky

- **Implementação**: Instalação e configuração do Husky para gerenciar hooks de Git.
- **Decisões Técnicas**:
  - Uso do Husky para garantir que o código seja validado via ESLint antes de cada commit.
  - Adição do script `prepare` no `package.json` para garantir que o Husky seja configurado automaticamente após a instalação das dependências.
  - Criação do hook `pre-commit` executando `yarn lint`.
- **Limitações**: Atualmente o lint é executado em todo o projeto a cada commit; será otimizado com `lint-staged` na próxima etapa para validar apenas arquivos alterados.
- **Riscos**: Nenhum identificado.

## Adicionar scripts de validação

- **Implementação**: Adição do script `validate` ao `package.json`.
- **Decisões Técnicas**:
  - O script `validate` combines `yarn lint`, `yarn prettier` e `yarn test` usando o operador `&&`.
  - Isso garante que a validação pare imediatamente se qualquer um dos passos falhar.
- **Limitações**: Depende de que os scripts individuais (`lint`, `prettier`, `test`) estejam configurados corretamente.
- **Riscos**: Nenhum identificado.

## Criar estrutura /src/hooks

- **Implementação**: Criação do diretório `/src/hooks` para centralizar hooks customizados e lógica de estado reutilizável.
- **Decisões Técnicas**:
  - Inclusão de um arquivo `.gitkeep` para garantir o rastreamento do diretório pelo Git, seguindo o padrão de infraestrutura do projeto.
  - Desbloqueio prévio da task após verificar que o bloqueio original (branch `origin/feature/infrastructure-status-and-hooks-4625301285441584084`) era obsoleto.
- **Limitações**: O diretório está vazio, aguardando a migração da lógica da Home (FASE 4).
- **Riscos**: Nenhum identificado.

## Criar estrutura /src/utils

- **Implementação**: Criação do diretório `/src/utils` para centralizar funções utilitárias e ajudantes reutilizáveis.
- **Decisões Técnicas**:
  - Inclusão de um arquivo `.gitkeep` para garantir que o diretório vazio seja rastreado pelo Git, seguindo o padrão estabelecido para novas pastas de infraestrutura.
- **Limitações**: O diretório está atualmente vazio, aguardando a migração de funções utilitárias ou criação de novas.
- **Riscos**: Nenhum identificado.

## Criar estrutura /src/types

- **Status**: [!] Bloqueado.
- **Motivo**: Adiado para a FASE 5 (Migração TypeScript). Como o projeto ainda está em JavaScript puro, a criação de uma estrutura de tipos agora seria prematura e não teria utilidade imediata.
- **Sugestão de Desbloqueio**: Executar como parte do setup do TypeScript na FASE 5.

## Criar estrutura /src/constants

- **Implementação**: Criação do diretório `/src/constants` para centralizar valores constantes globais do projeto.
- **Decisões Técnicas**:
  - Inclusão de um arquivo `.gitkeep` para garantir que o diretório vazio seja rastreado pelo Git, mantendo a consistência com outras pastas de infraestrutura.
- **Limitações**: O diretório está atualmente vazio, aguardando a definição de constantes.
- **Riscos**: Nenhum identificado.

## Criar estrutura /src/theme

- **Implementação**: Criação do diretório `/src/theme` para centralizar a configuração de temas e estilos globais.
- **Decisões Técnicas**:
  - Inclusão de um arquivo `.gitkeep` para garantir que o diretório vazio seja rastreado pelo Git, mantendo a consistência com o padrão de infraestrutura do projeto.
- **Limitações**: O diretório está atualmente vazio, aguardando a definição do tema global.
- **Riscos**: Nenhum identificado.

## Criar estrutura /src/storage

- **Implementação**: Criação do diretório `/src/storage` para centralizar a lógica de persistência de dados.
- **Decisões Técnicas**:
  - Inclusão de um arquivo `.gitkeep` para garantir que o diretório vazio seja rastreado pelo Git, seguindo o padrão de infraestrutura estabelecido.
- **Limitações**: O diretório está atualmente vazio, aguardando a instalação de bibliotecas de persistência (ex: AsyncStorage).
- **Riscos**: Nenhum identificado.

## Criar estrutura /src/context

- **Implementação**: Criação do diretório `/src/context` para centralizar a lógica de gerenciamento de estado global via Context API.
- **Decisões Técnicas**:
  - Inclusão de um arquivo `.gitkeep` para garantir que o diretório vazio seja rastreado pelo Git, mantendo a consistência com o padrão de infraestrutura do projeto.
- **Limitações**: O diretório está atualmente vazio, aguardando a definição de contextos específicos.
- **Riscos**: Nenhum identificado.

## Adicionar id único nas tarefas

- **Implementação**: Introdução de uma propriedade `id` única para cada tarefa no estado da aplicação.
- **Decisões Técnicas**:
  - Os IDs das tarefas iniciais foram definidos manualmente como strings numéricas simples.
  - Para novas tarefas, os IDs são gerados usando `String(new Date().getTime())` para garantir unicidade baseada no timestamp de criação.
  - A lógica de conclusão (`handleDoneTask`) e exclusão (`handleDeleteTask`) foi atualizada para identificar tarefas pelo `id` em vez do texto da tarefa.
- **Limitações**: O uso de timestamp como ID é suficiente para uso local single-threaded, mas pode precisar de uma biblioteca como `uuid` se a escala ou complexidade aumentar.
- **Riscos**: Nenhum identificado.

## Corrigir keyExtractor usando id

- **Implementação**: Atualização do `FlatList` e do componente `Task` para utilizar o novo `id` único como chave.
- **Decisões Técnicas**:
  - Alteração do `keyExtractor` no `FlatList` de `item => item.task` para `item => item.id`.
  - Atualização da prop `key` no componente `Task` renderizado para usar `item.id`.
- **Limitações**: Nenhuma.
- **Riscos**: Melhora a estabilidade da lista e evita problemas de renderização caso existam tarefas com o mesmo nome.

## Remover mutação direta de estado

- **Implementação**: Refatoração das funções de manipulação de tarefas na `Home` para usar atualizações funcionais de estado.
- **Decisões Técnicas**:
  - Uso de `setTasks(prevTasks => ...)` para garantir que as atualizações sejam baseadas no estado mais recente, evitando problemas de race conditions e closures obsoletas.
- **Limitações**: Nenhuma.
- **Riscos**: Nenhum identificado.

## Corrigir update imutável de tasks

- **Implementação**: Garantia de que todas as operações no estado de tarefas seguem princípios de imutabilidade.
- **Decisões Técnicas**:
  - Uso do spread operator (`...`) e métodos que retornam novos arrays (`map`, `filter`) dentro das atualizações funcionais de estado.
- **Limitações**: Nenhuma.
- **Riscos**: Melhora a previsibilidade do estado e a detecção de mudanças pelo React.

## Adicionar validação para tarefa vazia

- **Implementação**: Bloqueio de inserção de tarefas sem conteúdo ou apenas com espaços em branco na `Home`.
- **Decisões Técnicas**:
  - Uso do método `trim()` no conteúdo da tarefa antes da validação e da criação do novo objeto de tarefa.
  - Exibição de alerta visual via `Alert.alert` da API do React Native para informar o usuário sobre a restrição.
  - Retorno antecipado na função `handleAddTask` caso a validação falhe.
- **Limitações**: A validação ocorre apenas no lado do cliente (front-end), o que é adequado para a arquitetura atual sem backend.
- **Riscos**: Nenhum identificado.

## Impedir tarefas duplicadas

- **Implementação**: Bloqueio de inserção de tarefas que já existem na lista (case-insensitive).
- **Decisões Técnicas**:
  - Uso do método `some()` para verificar se já existe uma tarefa com o mesmo nome (ignorando maiúsculas/minúsculas) no estado `tasks`.
  - Exibição de alerta visual via `Alert.alert` caso a tarefa seja duplicada.
- **Limitações**: A verificação é feita apenas contra a lista atual em memória.
- **Riscos**: Nenhum identificado.

## Adicionar limite mínimo de caracteres

- **Implementação**: Implementação de validação que impede a adição de tarefas com menos de 3 caracteres.
- **Decisões Técnicas**:
  - Criação de um arquivo de constantes `src/constants/tasks.js` para centralizar a configuração do limite.
  - Adição de verificação de comprimento em `handleAddTask` após o `trim()`.
  - Exibição de alerta informativo ao usuário via `Alert.alert`.
- **Limitações**: Nenhuma.
- **Riscos**: Nenhum identificado.

## Adicionar limite máximo de caracteres

- **Implementação**: Restrição de entrada para tarefas com no máximo 50 caracteres.
- **Decisões Técnicas**:
  - Adição da constante `MAX_TASK_LENGTH` em `src/constants/tasks.js`.
  - Uso da prop `maxLength` no `TextInput` da Home para restringir entrada nativamente.
  - Adição de validação explícita em `handleAddTask` como fallback e para exibir alerta informativo.
- **Limitações**: Nenhuma.
- **Riscos**: Nenhum identificado.

## Limpar input após submit corretamente

- **Implementação**: Garantia de que o campo de texto da tarefa é limpo após uma adição bem-sucedida.
- **Decisões Técnicas**:
  - Chamada de `setTask('')` no final da função `handleAddTask` após a atualização do estado das tarefas.
- **Limitações**: Já estava implementado, mas agora está documentado e verificado.
- **Riscos**: Nenhum identificado.

## Fechar teclado após adicionar task

- **Implementação**: Garantia de que o teclado virtual seja recolhido automaticamente após a adição de uma nova tarefa.
- **Decisões Técnicas**:
  - Uso da API `Keyboard` do React Native.
  - Chamada de `Keyboard.dismiss()` após a limpeza do input na função `handleAddTask`.
- **Limitações**: O comportamento de fechamento do teclado é gerenciado pelo sistema operacional (Android/iOS) após o comando `dismiss`.
- **Riscos**: Nenhum identificado.

## Adicionar placeholder melhor

- **Implementação**: Atualização do texto do placeholder e melhoria da estilização do campo de entrada de tarefas.
- **Decisões Técnicas**:
  - Alteração do placeholder para "O que você vai fazer hoje?" para ser mais convidativo.
  - Definição de `placeholderTextColor` usando a cor `#9cc5a1` (Eton Blue) da paleta do projeto para harmonia visual.
  - Adição de `padding-left: 10px` no `TextInput` para evitar que o texto encoste na borda esquerda, melhorando a legibilidade.
  - Definição explícita da cor do texto como `#1f2421` para garantir contraste adequado.
- **Limitações**: Nenhuma.
- **Riscos**: Mudanças puramente visuais, baixo risco de regressão.

## Adicionar feedback visual ao concluir

- **Implementação**: Melhoria da experiência do usuário ao concluir tarefas com feedback visual imediato e animações.
- **Decisões Técnicas**:
  - Remoção do filtro que escondia tarefas concluídas na `FlatList`, permitindo que elas permaneçam visíveis.
  - Atualização de `handleDoneTask` para alternar (toggle) o estado `done`, permitindo desfazer a conclusão.
  - Adição de estilos visuais para tarefas concluídas no componente `Task`: texto riscado (`line-through`), mudança de cor do texto para tons mais suaves e exibição de um ícone de `check-circle`.
  - Integração da API `LayoutAnimation` para garantir transições suaves (suavização de layout) ao adicionar, concluir ou excluir tarefas.
  - Refatoração dos estilos do `Task` para evitar avisos de estilos inline no ESLint, movendo o layout flexível para o `Container` e `TaskText` do Styled Components.
- **Limitações**: O estado das tarefas ainda é volátil (perdido ao recarregar o app) até que a persistência local seja implementada.
- **Riscos**: `LayoutAnimation` pode se comportar de forma diferente em versões muito antigas do Android se não for habilitado corretamente, mas o tratamento foi incluído.

## Adicionar empty state

- **Implementação**: Exibição de uma mensagem amigável e ícone quando não há tarefas na lista.
- **Decisões Técnicas**:
  - Refatoração do componente `TaskList` em `src/pages/Home/styles.js` de `styled.View` para `styled.FlatList`.
  - Uso da prop `ListEmptyComponent` no `TaskList` refatorado em `src/pages/Home/index.js`.
  - Criação de novos styled components `EmptyStateContainer` e `EmptyStateText` em `Home/styles.js` para estilização centralizada.
  - Uso do ícone `clipboard` da biblioteca Feather.
- **Limitações**: Nenhuma.
- **Riscos**: Nenhum identificado.

## Adicionar feedback visual ao deletar

- **Status**: Validado como já implementado.
- **Análise**: Durante a execução desta task, foi identificado que o feedback visual para deleção já se encontrava presente na base de código através do componente `Swipeable` (que revela o ícone de lixeira) e da `LayoutAnimation` (que suaviza a transição da lista). O status no roadmap foi updated para refletir a realidade do projeto.
- **Limitações**: Nenhuma.
- **Riscos**: Nenhum identificado.

## Adicionar contador de tarefas

- **Implementação**: Exibição do número total de tarefas na tela inicial.
- **Decisões Técnicas**:
  - Criação de componentes estilizados (`CounterContainer`, `CounterBox`, `CounterLabel`, `CounterValue`) para uma exibição limpa e organizada.
  - Cálculo dinâmico do total baseado no tamanho do array de tarefas no estado.
- **Limitações**: Nenhuma.
- **Riscos**: Nenhum identificado.

## Adicionar contador de tarefas concluídas

- **Implementação**: Exibição do número de tarefas que já foram marcadas como concluídas.
- **Decisões Técnicas**:
  - Uso do método `filter` para derivar a contagem de tarefas concluídas a partir do estado global de tarefas.
  - Exibição ao lado do contador total para fornecer uma visão clara do progresso do usuário.
- **Limitações**: Nenhuma.
- **Riscos**: Nenhum identificado.

## Criar service de persistência

- **Implementação**: Criação de um serviço de persistência centralizado em `src/services/storage.js`.
- **Decisões Técnicas**:
  - Uso do `@react-native-async-storage/async-storage` para persistência local.
  - Implementação das funções `saveTasks` e `getTasks` com tratamento de erro básico (console.error e re-throw).
  - Uso da chave `@doit:tasks` para isolar os dados do aplicativo.
  - Criação de testes unitários em `src/services/__tests__/storage.test.js` mockando o AsyncStorage.
- **Limitações**: O tratamento de erro atual apenas loga no console antes de relançar o erro; o aplicativo chamador deve lidar com a exceção.
- **Riscos**: Falhas no AsyncStorage podem causar perda de dados se não forem tratadas adequadamente na UI.

## Persistir tarefas localmente

- **Implementação**: Integração do mecanismo de auto-save no componente principal `Home`.
- **Decisões Técnicas**:
  - Uso do hook `useEffect` para observar mudanças no estado `tasks`.
  - Chamada automática de `saveTasks(tasks)` sempre que a lista de tarefas é modificada (adição, exclusão ou conclusão).
  - Configuração do mock global do `AsyncStorage` em `jest-setup.js` para garantir estabilidade dos testes após a introdução da persistência na UI.
- **Limitações**: A persistência é disparada em cada mudança de estado, o que é eficiente para listas pequenas, mas pode precisar de debouncing no futuro se a lista crescer significativamente. Atualmente, o estado inicial de mock sobrescreve o storage no primeiro render até que o "Carregar tarefas automaticamente" seja implementado.
- **Riscos**: Se a operação de escrita falhar silenciosamente, o usuário pode perder o progresso da sessão atual.

## Instalar AsyncStorage

- **Implementação**: Adição da biblioteca `@react-native-async-storage/async-storage` ao projeto.
- **Decisões Técnicas**:
  - Instalação da versão `1.15.0` para garantir compatibilidade com o React Native 0.63.4.
  - Validação da estabilidade do projeto após a instalação via script `yarn validate`.
- **Limitações**: A validação de builds nativos está bloqueada no ambiente sandbox; a funcionalidade real depende da linkagem nativa correta.
- **Riscos**: Incompatibilidades menores com o ambiente de build Android legado (Gradle 6.2) podem surgir durante a compilação real.

## Carregar tarefas automaticamente

- **Status**: [ ] Desbloqueado.
- **Nota**: O bloqueio anterior (branch `origin/feature/infrastructure-status-and-hooks-4625301285441584084`) foi verificado como obsoleto.

## Criar estratégia de fallback

- **Status**: [ ] Desbloqueado.
- **Nota**: O bloqueio anterior (branch `feature/infrastructure-status-and-hooks`) foi verificado como obsoleto.

## Adicionar tratamento de erro no storage

- **Status**: [ ] Desbloqueado.
- **Nota**: O bloqueio anterior (branch `feature/infrastructure-status-and-hooks`) foi verificado como obsoleto.

## Adicionar loading inicial

- **Status**: [ ] Desbloqueado.
- **Nota**: O bloqueio anterior (branch `feature/infrastructure-status-and-hooks`) foi verificado como obsoleto.

## Criar model Task / Padronizar estrutura de task

- **Status**: [ ] Desbloqueado.
- **Nota**: O bloqueio anterior (branch `origin/feature/structure-types-8503643862023991203`) foi verificado como obsoleto.

## Criar factory de tasks / Criar utilitários de transformação

- **Status**: [ ] Desbloqueado.
- **Nota**: O bloqueio anterior (branch `feature/structure-types`) foi verificado como obsoleto.

## Separar lógica de Home em hooks / Criar hook useTasks

- **Status**: [ ] Desbloqueado.
- **Nota**: O bloqueio anterior (branch `origin/feature/infrastructure-status-and-hooks-4625301285441584084`) foi verificado como obsoleto.

## Criar EmptyState component

- **Implementação**: Extração da lógica de visualização de lista vazia para um componente dedicado em `src/components/EmptyState`.
- **Decisões Técnicas**:
  - Criação de um componente funcional simples que encapsula o ícone `clipboard` e a mensagem de "sem tarefas".
  - Migração dos styled components `EmptyStateContainer` e `EmptyStateText` para the novo componente, promovendo o desacoplamento da `Home`.
  - Uso do novo componente via prop `ListEmptyComponent` do `FlatList` na `Home`.
- **Limitações**: Nenhuma.
- **Riscos**: Baixo risco, componente puramente visual e desacoplado.

## Criar TaskList component

- **Implementação**: Extração da lógica da lista de tarefas da `Home` para um componente dedicado em `src/components/TaskList`.
- **Decisões Técnicas**:
  - Encapsulamento do `FlatList` e suas propriedades (`data`, `keyExtractor`, `renderItem`, `ListEmptyComponent`) em um componente funcional.
  - O componente recebe `tasks`, `handleDoneTask` e `handleDeleteTask` as props, mantendo-se agnóstico à origem do estado.
  - Criação de testes de snapshot para garantir que o componente renderize corretamente tanto com dados quanto em estado vazio.
  - Uso de mocks manuais para componentes internos (`Task`, `EmptyState`) nos testes para isolar a unidade sob teste.
- **Limitações**: Nenhuma.
- **Riscos**: Baixo risco, refatoração puramente estrutural que melhora a legibilidade e manutenibilidade da `Home`.

## Criar AddTask component

- **Implementação**: Extração da lógica de entrada de tarefas para um componente dedicado em `src/components/AddTask`.
- **Decisões Técnicas**:
  - Encapsulamento do `TextInput` e do botão de adição em um componente funcional controlado.
  - Recebe `task` (valor), `onChangeText` e `onAdd` (callback) como props.
  - Centralização de estilos e uso da constante `MAX_TASK_LENGTH` para consistência.
- **Limitações**: Nenhuma.
- **Riscos**: Baixo risco, melhora a separação de responsabilidades.

## Criar theme global / Padronizar cores

- **Implementação**: Criação de um sistema de temas centralizado usando `styled-components`.
- **Decisões Técnicas**:
  - Definição de um objeto de tema em `src/theme/index.js` contendo a paleta de cores oficial do projeto.
  - Integração do `ThemeProvider` no `App.js` para disponibilizar o tema em toda a árvore de componentes.
  - Refatoração de todos os styled-components para consumir cores via `props.theme.colors` em vez de valores hardcoded.
  - Uso do hook `useTheme` no componente `Task` para acessar cores dinamicamente em estilos `StyleSheet` e ícones.
  - Atualização dos testes unitários para suportar o `ThemeProvider`.
- **Limitações**: O tema atual é puramente de cores; espaçamentos e tipografia ainda não foram padronizados no tema.
- **Riscos**: Mudanças futuras nas chaves do tema exigirão atualizações em todos os componentes dependentes, mas a centralização reduz significativamente o esforço de manutenção de design.

## Criar Header component

- **Implementação**: Extração e criação de um componente de cabeçalho dedicado em `src/components/Header`.
- **Decisões Técnicas**:
  - Criação de um componente funcional simples exibindo o nome do aplicativo "doIt".
  - Estilização com `styled-components` utilizando a paleta de cores do projeto (Background: `#49a078` Shiny Shamrock, Text: `#fff`).
  - Integração na `Home` page e desativação do cabeçalho padrão do `react-navigation` no `App.js` para garantir uma identidade visual customizada.
- **Limitações**: O título é estático no momento.
- **Riscos**: Nenhum identificado.

## Padronizar espaçamentos

- **Implementação**: Introdução de uma escala de espaçamento semântica e de tipografia no tema global e refatoração dos componentes para utilizá-la.
- **Decisões Técnicas**:
  - Criação de objetos `spacing` e `typography` no `src/theme/index.js` com valores semânticos.
  - Substituição de valores hardcoded de margin, padding e font-size em `Home`, `Task`, `AddTask`, `TaskList`, `EmptyState` e `Header` por referências ao tema.
  - Remoção de componentes de estilo não utilizados (`GeneralText`, `WarningText`) em `Home/styles.js` para manter o código limpo.
  - Atualização dos testes unitários de `TaskList` para incluir o `ThemeProvider`, evitando quebras devidas ao consumo do tema.
- **Limitações**: A escala é baseada em valores fixos (px), o que pode precisar de revisão para acessibilidade (ex: usar escalas dinâmicas) no futuro.
- **Riscos**: Alterações visuais sutis podem ocorrer devido à aproximação de valores hardcoded para a escala semântica.

## Remover lógica inline

- **Status**: [ ] Desbloqueado.
- **Nota**: O bloqueio anterior (branch `feature/infrastructure-status-and-hooks`) foi verificado como obsoleto.

## Padronizar tipografia

- **Implementação**: Consolidação do sistema de tipografia no tema global e aplicação em todos os componentes.
- **Decisões Técnicas**:
  - Adição de pesos de fonte (`regular: '400'`, `bold: '700'`) ao objeto `typography` no `src/theme/index.js`.
  - Refatoração dos componentes `Header`, `Home`, `Task`, `AddTask` e `EmptyState` para consumir tanto `size` quanto `weight` do tema.
  - Remoção de todos os valores hardcoded de `font-weight: bold` e substituição por referências dinâmicas ao tema.
  - Garantia de que elementos textuais (como o input de tarefas e o texto da tarefa) tenham tamanhos de fonte explicitamente definidos via tema para consistência visual.
  - Atualização dos snapshots de teste para refletir a mudança técnica de `bold` para `700` nos estilos renderizados.
- **Limitações**: O projeto ainda utiliza as fontes padrão do sistema; a introdução de fontes customizadas exigiria uma nova etapa de infraestrutura.
- **Riscos**: Nenhum identificado.

## Melhorar input de tarefas

- **Implementação**: Aprimoramento da experiência do usuário e do visual do componente `AddTask`.
- **Decisões Técnicas**:
  - Adição de suporte ao teclado com `onSubmitEditing` para permitir adicionar tarefas pressionando "Enter".
  - Configuração do teclado com `returnKeyType="done"`, `autoCorrect={false}` e `autoCapitalize="sentences"`.
  - Implementação de um botão "Limpar" (ícone 'x') que aparece quando há texto no input.
  - Adição de um contador de caracteres que aparece quando o texto excede 40 caracteres.
  - Refatoração dos estilos para usar um `InputContainer` com borda e flexbox para melhor responsividade.
  - Garantia de que todos os ícones e textos consumam as cores do tema global.
  - Criação de testes unitários abrangentes em `src/components/AddTask/__tests__/AddTask.test.js`.
- **Limitações**: O contador é exibido de forma simples abaixo do input; animações mais complexas para sua aparição poderiam ser adicionadas no futuro.
- **Riscos**: Baixo risco de regressão devido à cobertura de testes unitários.

## Extrair estilos repetidos

- **Status**: [x] Finalizado.
- **Implementação**: Unificação de componentes de UI repetitivos.
- **Decisões Técnicas**:
  - Criação de `src/components/Shared/styles.js` para centralizar componentes base (`BaseInputContainer`, `BaseClearButton`, `BaseInput`).
  - Refatoração dos componentes `AddTask` e `Search` para estender esses estilos base via `styled(BaseComponent)`.
  - Padronização de paddings e alinhamentos em elementos de input para garantir consistência visual em toda a aplicação.
  - Atualização dos snapshots de teste para refletir as mudanças estruturais e de estilização implícita (como a remoção de redundâncias de `border-style`).
- **Limitações**: Focamos apenas em inputs e botões de limpeza; outros padrões atômicos podem surgir conforme novas telas forem adicionadas.
- **Riscos**: Alterações em componentes compartilhados afetam múltiplos pontos da UI; mitigado com testes de snapshot abrangentes.

## Adicionar confirmação para deletar

- **Implementação**: Introdução de um diálogo de confirmação antes da remoção definitiva de uma tarefa.
- **Decisões Técnicas**:
  - Uso da API `Alert.alert` do React Native para garantir um comportamento nativo em ambas as plataformas.
  - O diálogo inclui título ("Excluir Tarefa?"), mensagem descritiva e dois botões: "Cancelar" e "Excluir".
  - O botão "Excluir" utiliza o estilo `destructive` para indicar uma ação irreversível, conforme as diretrizes de interface de cada plataforma.
  - A lógica de exclusão com `LayoutAnimation` foi encapsulada no callback `onPress` do botão de confirmação.
  - Correção dos scripts `lint` e `lint:fix` no `package.json` para utilizar o binário local do ESLint, resolvendo conflitos de versão no ambiente de desenvolvimento.
- **Limitações**: Nenhuma identificada.
- **Riscos**: Nenhum identificado.

## Configurar Jest corretamente

- **Implementação**: Padronização do ambiente de testes e configuração de cobertura.
- **Decisões Técnicas**:
  - Configuração do Jest no `package.json` para coletar cobertura automaticamente (`collectCoverage: true`).
  - Definição de limites iniciais de cobertura (40%) para garantir uma base estável para evolução.
  - Atualização do `jest-setup.js` with mocks globais para `LayoutAnimation` e `UIManager`, evitando erros de tipo em componentes que usam animações nativas.
  - Exclusão do diretório de cobertura (`__coverage__`) no Git, ESLint e Prettier para manter o repositório limpo.
- **Limitações**: A cobertura atual de ~47% reflete a falta de testes em lógica complexa da Home e componentes de Task, que devem ser endereçados em tarefas futuras.
- **Riscos**: Baixo. As mudanças são restritas ao ambiente de desenvolvimento e testes.

## Adicionar busca

- **Implementação**: Introdução de funcionalidade de busca em tempo real na lista de tarefas.
- **Decisões Técnicas**:
  - Criação de um novo componente `Search` com suporte a input filtrado e botão de limpeza.
  - Refatoração dos componentes `EmptyState` e `TaskList` para suportar mensagens personalizadas quando não há resultados de busca.
  - Implementação de lógica de filtragem case-insensitive na `Home` page.
  - Adição de testes unitários com cobertura de 100% para o componente `Search`.
  - Uso de `testID` para garantir seletores estáveis nos testes de snapshot e unitários.
- **Limitações**: A busca é puramente local e baseada no texto da tarefa.
- **Riscos**: Conflito potencial com a futura implementação de filtros de status (Pendente/Concluída) na `Home`.

## Carregar tarefas automaticamente / Estratégia de fallback / Erro no storage / Loading inicial

- **Implementação**: Refinamento do ciclo de vida de persistência e carregamento com tratamento de erros robusto.
- **Decisões Técnicas**:
  - Evolução do `getTasks` para incluir um fallback em memória (cache), garantindo que dados recém-alterados estejam disponíveis mesmo se o `AsyncStorage` falhar temporariamente.
  - Implementação de alertas visuais (`Alert.alert`) na `Home` page para informar o usuário sobre falhas tanto no carregamento inicial quanto na persistência de alterações.
  - Uso de um fallback para lista vazia (`[]`) em caso de erro crítico de carregamento, permitindo que a aplicação continue funcional em modo de "sessão volátil".
  - Refatoração do componente `AddTask` para suportar o estado `loading`, desabilitando inputs e botões enquanto as tarefas estão sendo recuperadas do storage.
  - Melhoria da cobertura de testes unitários para cobrir cenários de falha de storage e verificação de comportamento da UI sob erro.
- **Limitações**: O cache em memória é volátil e não sobrevive ao reinício completo do app se o storage persistente estiver corrompido.
- **Riscos**: Múltiplos alertas em sucessão se o storage falhar repetidamente; considerar um sistema de notificação menos intrusivo no futuro.

## Criar model Task / Padronizar estrutura / Factory / Utilitários de transformação

- **Implementação**: Formalização do modelo de dados de tarefas e criação de utilitários para manipulação de listas.
- **Decisões Técnicas**:
  - Criação de `src/models/Task.js` com uma factory `createTask` que centraliza a criação de novas tarefas, garantindo campos consistentes (`id`, `task`, `done`, `createdAt`).
  - Implementação de `isValidTask` para validação estrutural básica.
  - Criação de `src/utils/taskUtils.js` contendo lógica pura para ordenação (`sortTasks`), filtragem (`filterTasksBySearch`) e estatísticas (`getTaskStats`).
  - A ordenação foi aprimorada para mostrar tarefas pendentes primeiro, seguidas pelas concluídas, ambas ordenadas por data de criação decrescente.
  - Refatoração da `Home` page para delegar a criação e transformação de dados para esses novos módulos, removendo lógica inline e preparando para a extração de hooks.
  - Adição de testes unitários abrangentes para o modelo e utilitários.
- **Limitações**: O campo `createdAt` é preenchido no cliente e depende do relógio do sistema.
- **Riscos**: Mudanças na estrutura de `Task` podem exigir migração de dados no `AsyncStorage` em versões futuras.

## Melhorar animações

- **Implementação**: Refinamento das transições de interface e feedback visual em toda a aplicação.
- **Decisões Técnicas**:
  - Configuração de um objeto `animationConfig` customizado para `LayoutAnimation`, utilizando `spring` (damping 0.7) para atualizações de layout (movimentação de itens) e `easeInEaseOut` com opacidade para criação e deleção.
  - Implementação de transição suave de cor de fundo no componente `Task` usando a API `Animated`. A cor interpola entre `secondary` (pendente) e `primary` (concluída) em 300ms.
  - Refatoração do `Container` do componente `Task` para estender `Animated.View`, permitindo animações de propriedades não suportadas pelo `LayoutAnimation` (como `backgroundColor` no Android).
  - Centralização da lógica de disparo de animações no hook `useTasks`, garantindo consistência em todas as operações de CRUD.
- **Limitações**: O uso de `useNativeDriver: false` para animações de cor é necessário, o que pode ter um custo de performance marginal em listas extremamente longas.
- **Riscos**: Conflitos sutis entre `LayoutAnimation` e `Animated` se disparados simultaneamente no mesmo elemento; resolvido usando `Animated` para cor e `LayoutAnimation` para estrutura/posição.

## Separar lógica de Home em hooks / Criar hook useTasks / Remover lógica inline

- **Implementação**: Extração completa da lógica de gerenciamento de tarefas da `Home` page para um hook customizado `useTasks`.
- **Decisões Técnicas**:
  - O hook encapsula estado (`tasks`, `loading`), persistência automática e operações (`addTask`, `toggleTask`, `deleteTask`).
  - Uso do padrão `isMounted` para evitar atualizações de estado em componentes desmontados durante operações assíncronas.
  - Centralização de validações (vazio, tamanho, duplicatas) e animações (`LayoutAnimation`) dentro do hook.
  - Implementação de testes unitários abrangentes para o hook usando `react-test-renderer` e um componente de teste dedicado.
  - Migração da configuração global do `UIManager` para Android do `Home/index.js` para `App.js` para evitar regressões visuais.
  - Refatoração da `Home` page para ser um componente puramente de apresentação, delegando toda a lógica de domínio ao hook.
- **Limitações**: O hook gerencia o estado global de tarefas mas ainda depende de alertas (`Alert.alert`) síncronos para feedback de erro.
- **Riscos**: Se a lógica do hook se tornar muito complexa, pode ser necessário quebrá-lo em hooks menores (ex: `usePersistence`, `useTaskActions`).

## Adicionar undo ao deletar

- **Implementação**: Adição de funcionalidade para desfazer a exclusão de uma tarefa.
- **Decisões Técnicas**:
  - Refatoração do hook `useTasks` para incluir um estado temporário `lastDeletedTask`.
  - Criação do componente `UndoAction` que utiliza a API `Animated` para transições suaves de opacidade.
  - O componente `UndoAction` gerencia seu próprio timeout de 5 segundos para auto-ocultação, chamando um callback de limpeza.
  - Uso de `useCallback` para garantir a estabilidade das funções de dismiss e evitar loops de efeito.
  - Cobertura de testes unitários de 100% para o novo componente e lógica do hook associada.
- **Limitações**: A restauração da tarefa atualmente a posiciona no final da lista, não preservando o índice original.
- **Riscos**: Baixo. A funcionalidade é isolada e possui fallback de limpeza automática.

## Adicionar ordenação

- **Implementação**: Funcionalidade de ordenação personalizada na lista de tarefas.
- **Decisões Técnicas**:
  - Expansão do utilitário `sortTasks` para suportar múltiplas estratégias: `DEFAULT` (Status + Data), `DATE_DESC` (Mais novas) e `ALPHABETICAL` (A-Z).
  - Uso de `useMemo` na `Home` page para otimizar a filtragem e ordenação, garantindo performance mesmo com listas extensas.
  - Adição de interface de seleção de ordenação com feedback visual de estado ativo.
  - Implementação de `testID` nos botões de ordenação para facilitar testes automatizados.
  - Atualização abrangente da suíte de testes unitários e de integração para validar cada estratégia de ordenação.
- **Limitações**: A preferência de ordenação é mantida apenas em memória na sessão atual (não persistida).
- **Riscos**: Baixo. A lógica é pura e desacoplada do estado global de persistência.

## Adicionar dark mode / Criar tema light/dark

- **Implementação**: Introdução de sistema de temas dinâmico com persistência.
- **Decisões Técnicas**:
  - Refatoração de `src/theme/index.js` para exportar objetos `light` e `dark`.
  - Implementação de `ThemeContext` para gerenciar o estado global do tema e persistir a preferência do usuário no `AsyncStorage`.
  - Integração do `ThemeProvider` do `styled-components` com o contexto de tema no nível raiz (`App.js`).
  - Adição de botão de alternância no `Header` com feedback visual (ícones sun/moon).
  - Auditoria de componentes para garantir que todas as cores sejam derivadas do objeto de tema.
  - Adição de testes unitários abrangentes para o `ThemeContext` e atualização de snapshots de componentes.
- **Limitações**: Alguns componentes de terceiros ou nativos (como a StatusBar ou o teclado) podem exigir ajustes adicionais de estilo baseados no tema em fases futuras.
- **Riscos**: Baixo. A arquitetura de temas é isolada e segue padrões estabelecidos de Context API.

## Melhorar swipe actions

- **Implementação**: Aprimoramento visual e funcional das ações de swipe nas tarefas.
- **Decisões Técnicas**:
  - Refatoração das ações de swipe (esquerda/direita) para incluir ícones dinâmicos (Feather) e rótulos de texto explicativos.
  - O conteúdo das ações agora escala e altera a opacidade conforme o usuário desliza, proporcionando um feedback visual mais rico.
  - A ação da esquerda alterna entre "Concluir" e "Desfazer" dinamicamente com base no status da tarefa.
  - Migração completa dos estilos de swipe actions de StyleSheet para Styled Components em `src/components/Task/styles.js` para consistência arquitetural.
  - Adição de testes unitários com snapshots para garantir a integridade da renderização do componente Task.
- **Limitações**: A largura das ações de swipe é baseada no conteúdo e paddings; comportamentos extremos de swipe dependem da configuração interna do `react-native-gesture-handler`.
- **Riscos**: Baixo. As mudanças são puramente de UI/UX e possuem cobertura de testes.

## Criar tema light/dark

- **Status**: [!] Bloqueado.
- **Motivo**: Inconsistência entre o histórico do ROADMAP e o estado atual da branch principal. O histórico cita a implementação de `ThemeContext`, mas o arquivo não está presente na branch.
- **Sugestão de Desbloqueio**: Reverter ou aplicar corretamente o PR #22 para restaurar a infraestrutura de temas dinâmicos.

## Adicionar filtro Todas/Pendentes/Concluídas

- **Status**: [!] Bloqueado.
- **Motivo**: Dependência de PR #17 aberto (`feature/task-filters`) que contém a implementação pendente de revisão ou merge.
- **Sugestão de Desbloqueio**: Revisar e realizar o merge do PR #17.

## Adicionar edição de tarefas

- **Implementação**: Funcionalidade de edição de tarefas inline com validação e persistência.
- **Decisões Técnicas**:
  - Implementação da função `editTask` no hook `useTasks` com as mesmas validações de criação (`empty`, `MIN_TASK_LENGTH`, `MAX_TASK_LENGTH`) e uma verificação de duplicidade que ignora o ID da tarefa sendo editada.
  - O componente `Task` foi aprimorado com um estado local `isEditing` para alternar entre a exibição do texto e um `TextInput`.
  - Adição de uma nova ação de swipe à direita ("Editar") usando o ícone `edit-2` do Feather.
  - Uso de Styled Components para gerenciar os novos elementos de UI de edição (`EditInput`, `ActionsWrapper`, `EditActions`, `CancelIcon`), removendo warnings de `no-inline-styles`.
  - Integração de feedback visual via `LayoutAnimation` ao entrar e sair do modo de edição.
  - Cobertura de testes unitários abrangente no hook e no componente, incluindo verificação de cancelamento, salvamento e snapshots.
- **Limitações**: O modo de edição é focado automaticamente (`autoFocus`), mas não seleciona o texto todo ao abrir (comportamento padrão do RN).
- **Riscos**: Baixo. A lógica é isolada por tarefa e respeita as regras de persistência global.

## Adicionar prioridade

- **Implementação**: Sistema de prioridades para tarefas (Nenhuma, Baixa, Média, Alta).
- **Decisões Técnicas**:
  - Definição de em `src/constants/tasks.js`.
  - Atualização do model `Task` para incluir o campo `priority`, com fallback para 'none'.
  - Integração no hook `useTasks` para persistir e editar a prioridade.
  - UI: Adição de seletores de prioridade no `AddTask` e no modo de edição do componente `Task`.
  - UI: Indicador visual colorido na listagem de tarefas baseado na prioridade.
  - Ordenação: Atualização do `sortTasks` para incluir prioridade no critério padrão (Status > Prioridade > Data) e adição de novo tipo de ordenação por prioridade.
  - Uso de cores semânticas (`info`, `warning`) adicionadas ao tema global.
- **Limitações**: Tarefas antigas sem prioridade assumem automaticamente 'Nenhuma'.
- **Riscos**: Baixo. A lógica é retrocompatível e possui ampla cobertura de testes unitários.

## Adicionar prioridade

- **Implementação**: Sistema de prioridades para tarefas (Nenhuma, Baixa, Média, Alta).
- **Decisões Técnicas**:
  - Definição de `TASK_PRIORITIES` em `src/constants/tasks.js`.
  - Atualização do model `Task` para incluir o campo `priority`, com fallback para 'none'.
  - Integração no hook `useTasks` para persistir e editar a prioridade.
  - UI: Adição de seletores de prioridade no `AddTask` e no modo de edição do componente `Task`.
  - UI: Indicador visual colorido na listagem de tarefas baseado na prioridade.
  - Ordenação: Atualização do `sortTasks` para incluir prioridade no critério padrão (Status > Prioridade > Data) e adição de novo tipo de ordenação por prioridade.
  - Uso de cores semânticas (`info`, `warning`) adicionadas ao tema global.
- **Limitações**: Tarefas antigas sem prioridade assumem automaticamente 'Nenhuma'.
- **Riscos**: Baixo. A lógica é retrocompatível e possui ampla cobertura de testes unitários.

## Melhorar design geral

- **Implementação**: Refatoração abrangente para eliminar valores hardcoded e centralizar o design no sistema de temas.
- **Decisões Técnicas**:
  - Substituição de cores hexadecimais por variáveis de `theme.colors` (ex: EmptyState Icon).
  - Migração de valores de espaçamento (margin, padding) e dimensões fixas para a escala semântica definida em `theme.spacing`.
  - Padronização de bordas e arredondamentos usando tokens do tema para garantir consistência visual entre diferentes componentes.
  - Atualização dos testes de snapshot para refletir as mudanças nas propriedades de estilo.
- **Limitações**: Algumas dimensões específicas (como alturas de 40px/50px/60px) foram mantidas como valores fixos por não possuírem mapeamento direto ideal na escala de espaçamento atual, visando preservar a proporção da UI.
- **Riscos**: Baixo. As mudanças são puramente de consistência arquitetural de estilo, validadas por testes automatizados.
