# Evidências

Esta pasta não equivale a validação concluída. `locais/` contém somente resultados de fixture sintética quando `npm run test:browser` é executado. Esses arquivos não substituem DDG, HARs dos sites sorteados ou comparação Blacklight/uBlock.

Estrutura de coleta:

```text
evidencias/
  locais/                     # teste sintético, Firefox headless
  ddg/
    tracker-reporting/
    storage-blocking/
    fingerprinting/
    bounce-tracking/
    query-parameters/
    tracker-blocking/
    storage-partitioning/
    js-leaks/
  sites/
    site-1/
    site-2/
    site-3/
```

Cada grupo DDG: `ambiente.md`, `monitor.png`, `monitor.json`, resultado da página e evidência de divergências. Use sufixos `-antes`/`-depois` para condições diferentes.

Cada site: `ambiente.md`, `monitor.har`, `monitor.png`, `monitor.json`, `blacklight.png`/relatório, `ublock-logger.txt` e print, listas normalizadas `blacklight-dominios.json` e `ublock-dominios.json`, `reconciliacao.json`.

HARs devem ser exportados pelo DevTools da execução real. Não gerar HAR artificial a partir do JSON do monitor. Revisar dados sensíveis antes de versionar, preservando cópias originais privadas quando necessárias à análise. A ferramenta de reconciliação exporta apenas metadados redigidos e não modifica o HAR original.
