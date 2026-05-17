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
- [ ] Criar estrutura `/src/hooks`
- [ ] Criar estrutura `/src/utils`
- [ ] Criar estrutura `/src/constants`
- [ ] Criar estrutura `/src/theme`
- [ ] Criar estrutura `/src/storage`
- [ ] Criar estrutura `/src/types`
- [ ] Criar estrutura `/src/context`

---

# FASE 2 — Correções Críticas

## Modelagem

- [ ] Adicionar id único nas tarefas
- [ ] Corrigir keyExtractor usando id
- [ ] Remover mutação direta de estado
- [ ] Corrigir update imutável de tasks
- [ ] Adicionar validação para tarefa vazia
- [ ] Impedir tarefas duplicadas
- [ ] Adicionar limite mínimo de caracteres
- [ ] Adicionar limite máximo de caracteres

## UX Base

- [ ] Limpar input após submit corretamente
- [ ] Fechar teclado após adicionar task
- [ ] Adicionar placeholder melhor
- [ ] Adicionar feedback visual ao concluir
- [ ] Adicionar feedback visual ao deletar
- [ ] Adicionar empty state
- [ ] Adicionar contador de tarefas
- [ ] Adicionar contador de tarefas concluídas

---

# FASE 3 — Persistência Local

## Storage

- [ ] Instalar AsyncStorage
- [ ] Criar service de persistência
- [ ] Persistir tarefas localmente
- [ ] Carregar tarefas automaticamente
- [ ] Criar estratégia de fallback
- [ ] Adicionar tratamento de erro no storage
- [ ] Adicionar loading inicial

## Estrutura de Dados

- [ ] Criar model Task
- [ ] Padronizar estrutura de task
- [ ] Criar factory de tasks
- [ ] Criar utilitários de transformação

---

# FASE 4 — Refatoração Arquitetural

## Componentização

- [ ] Separar lógica de Home em hooks
- [ ] Criar hook useTasks
- [ ] Criar TaskList component
- [ ] Criar AddTask component
- [ ] Criar EmptyState component
- [ ] Criar Header component
- [ ] Remover lógica inline

## Organização

- [ ] Extrair estilos repetidos
- [ ] Criar theme global
- [ ] Padronizar cores
- [ ] Padronizar espaçamentos
- [ ] Padronizar tipografia

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

- [ ] Melhorar design geral
- [ ] Melhorar input de tarefas
- [ ] Melhorar animações
- [ ] Adicionar dark mode
- [ ] Criar tema light/dark
- [ ] Melhorar swipe actions
- [ ] Adicionar ícones consistentes
- [ ] Melhorar responsividade
- [ ] Adicionar confirmação para deletar
- [ ] Adicionar undo ao deletar
- [ ] Adicionar filtro Todas
- [ ] Adicionar filtro Pendentes
- [ ] Adicionar filtro Concluídas
- [ ] Adicionar ordenação
- [ ] Adicionar busca

---

# FASE 7 — Funcionalidades Reais

- [ ] Adicionar edição de tarefas
- [ ] Adicionar prioridade
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
- [ ] Configurar Jest corretamente
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
  - O script `validate` combina `yarn lint`, `yarn prettier` e `yarn test` usando o operador `&&`.
  - Isso garante que a validação pare imediatamente se qualquer um dos passos falhar.
- **Limitações**: Depende de que os scripts individuais (`lint`, `prettier`, `test`) estejam configurados corretamente.
- **Riscos**: Nenhum identificado.
