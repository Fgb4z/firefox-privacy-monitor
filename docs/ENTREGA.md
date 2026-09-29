# Entrega — 29/09/2026

Autor: **Fernando Guerra Boni**, sem matrícula conforme solicitado.

## Concluído no repositório local

- [x] Extensão Firefox instalável, painel, bloqueio personalizado e `.gitignore`.
- [x] Detecções, metodologia do score e limites documentados.
- [x] Testes automatizados e fixture no Firefox real.
- [x] Oito grupos DDG, prints do monitor, resultados da página e HARs.
- [x] BBC News, Magazine Luiza e Wikipédia: HARs nativos DevTools, prints e JSON.
- [x] Resultados oficiais Blacklight, incluindo HAR, e logger uBlock separado.
- [x] Reconciliação por domínio com referências a recursos/linhas e discussão do score.
- [x] [Relatório final PDF](relatorio/relatorio-final.pdf) com autoria preenchida.

Limitações registradas: Blacklight recebeu erro da Magazine Luiza; js-leaks tem referência Firefox 92; WebSocket já falhou no controle sem regra; Prefetch Cache não passou. Algumas diferenças entre execuções independentes não permitem provar a causa. Esses pontos não foram omitidos nem tratados como aprovação.

## Falta para entregar

- [ ] Ler o PDF final e conferir se corresponde às orientações do professor.
- [ ] Fazer os commits das alterações finais e `git push`.
- [ ] Conferir no GitHub se PDF, código, HARs e prints aparecem e se o professor tem acesso.
- [ ] Enviar o PDF e o link do repositório pelo canal de entrega da disciplina.

Não há necessidade de nova coleta para preencher campos do relatório. Uma nota específica depende da avaliação do professor; a existência dos arquivos não comprova aprovação integral em todos os critérios.

## Commits finais por assunto

O histórico anterior foi preservado. Sugestão de grupos reais, após revisar `git diff`:

```powershell
git add src/background.js extension/dist/background.js tests/background.test.mjs tests/sanitize.test.mjs scripts
git commit -m "fix: bloqueia workers e consolida ferramentas de coleta"

git add evidencias
git commit -m "test: registra testes DDG e comparacoes dos tres sites"

git add README.md docs
git commit -m "docs: finaliza relatorio e checklist de entrega"

git push origin HEAD
```

Esses commits organizam mudanças diferentes; não simulam trabalho em dias anteriores. Não retrodate commits. Commit é local: as alterações só aparecem no GitHub depois do push. Verificar `git status` ao final. `.cache`, perfis, dependências e originais privados continuam ignorados; bundles instaláveis e evidências públicas acompanham o Git.
