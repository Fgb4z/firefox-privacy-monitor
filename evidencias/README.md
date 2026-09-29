# Evidências da avaliação

Coletas reais de 28/09/2026, noite em Brasília; timestamps ISO são UTC e podem indicar 29/09. O [PDF final](../docs/relatorio/relatorio-final.pdf) reúne as análises e capturas.

| Pasta | Conteúdo |
|---|---|
| `ddg/` | Oito grupos DDG: resultado da página, monitor, capturas, HAR e execução |
| `sites/site-1/` | BBC News |
| `sites/site-2/` | Magazine Luiza |
| `sites/site-3/` | Wikipédia em português |
| `adicionais/cnn/` | Coleta anterior CNN Brasil; falhas do Blacklight motivaram a substituição |
| `locais/` | Fixture sintética, explicitamente separada das coletas de sites |

Cada teste DDG inclui `monitor.json`, `monitor.png`, `monitor-indicios.png`, `pagina.txt/png`, `pagina-resultados.json`, `instrucoes-pagina.txt`, `rede.har` e `execucao.json`. `tracker-blocking/sem-bloqueio/` é o controle anterior à regra. `js-leaks/sem-monitor.*` contém a referência sem extensão.

Cada site inclui HAR/JSON/prints do monitor, `ambiente.json`, HAR/logger/prints/metadados uBlock e resultados/prints/HAR Blacklight. `analise.md` e `reconciliacao.json` comparam domínios registráveis, mantendo os hosts e índices dos recursos. `blacklight-inicial*` são tentativas anteriores; a condição usada no PDF é a de `blacklight-resultados.json`.

HARs Firefox foram exportados **pelo DevTools nativo** por `NetMonitorAPI.getHar/HarExporter`; HAR Blacklight vem do arquivo ZIP oficial indicado no resultado. Não foram fabricados a partir dos JSONs do monitor. Prints são capturas reais de um Firefox em execução headless, com página e painel em imagens separadas. Originais privados ficam em `.cache`, ignorada pelo Git.

Valores de query/cookies nas cópias HAR públicas foram substituídos por hashes consistentes; credenciais e corpos foram omitidos. Nomes, domínio, path, método, status, horário e relações de igualdade são preservados. O logger mantém numeração de linhas; o contexto `.moz-extension-scheme` identifica downloads feitos pelo uBlock, excluídos da análise da página. `aliasURL` identifica aliases DNS, não novos pedidos automaticamente.

Não comparar números como se tivessem o mesmo significado: pedidos, hosts, rastreadores classificados, cookies presentes, tentativas de escrita e linhas bloqueadas são medidas distintas. As falhas e diferenças de ambiente estão descritas no relatório.
