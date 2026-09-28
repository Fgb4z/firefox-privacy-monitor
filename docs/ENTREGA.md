# Entrega — 29/09/2026

## Situação

- [x] Implementação da extensão e instruções de instalação.
- [x] Testes automatizados, fixture controlada e ferramentas de evidência.
- [x] Metodologia explícita do score e limitações.
- [x] Modelo estruturado e gerador de PDF com pendências.
- [ ] Instalar Firefox de uso manual e carregar a extensão.
- [ ] Receber os três sites sorteados.
- [ ] Executar e documentar os oito grupos DDG, incluindo js-leaks.
- [ ] HARs reais DevTools + prints do monitor para os três sites.
- [ ] Resultados Blacklight e logger uBlock dos três sites.
- [ ] Reconciliação de todos os domínios divergentes, nos dois sentidos.
- [ ] Comparação crítica do score com Blacklight.
- [ ] Preencher autoria, matrícula e ambiente; gerar e revisar PDF final.
- [ ] Verificar acesso do professor ao repositório e subir evidências revisadas.
- [ ] Histórico real de commits ao longo dos dias de trabalho.

## Próximos dias

| Data | Resultado a produzir |
|---|---|
| 23/09 | Base implementada, verificação técnica e primeiro commit real |
| 24/09 | Firefox manual, Tracker Reporting, Storage blocking e canvas; corrigir divergências |
| 25/09 | Bounce, parâmetros, Tracker Blocking, Storage partitioning e js-leaks |
| 26/09 | Três sites sorteados: coleta monitor, HAR e prints |
| 27/09 | uBlock/Blacklight, reconciliação por rastreador e evidências |
| 28/09 | Relatório final, revisão de score, testes e repositório |
| 29/09 | Conferência final de arquivos/acesso e envio |

Se o sorteio chegar depois, ajuste o cronograma sem omitir análises. Faça commits de mudanças reais (código, evidências, correções, análise) nos dias em que trabalhar. Não retrodate commits nem divida artificialmente o histórico para simular dias de trabalho. A implementação inicial por si só não satisfaz o requisito de histórico ao longo da semana.

Comandos úteis, após revisar `git diff` e as evidências:

```powershell
git status
git add README.md package.json package-lock.json src extension scripts tests docs evidencias .gitignore
git commit -m "Implementa monitor de privacidade e estrutura de validação"
git push origin HEAD
```

Não incluir `.cache`, perfis, `node_modules`, tokens ou HARs com dados pessoais. Os bundles de `extension/dist` fazem parte do instalável; precisam acompanhar os fontes e ser regenerados quando estes mudarem.
