# Roteiro de validação e evidências

## Preparar o ambiente

Instale Firefox 142+, carregue `extension/manifest.json` e crie um perfil exclusivo em `about:profiles`. Registre versão Firefox/Windows, data, timezone, ETP, cookies, região, preferências, consentimento, duração e extensões/listas. Não altere tudo ao mesmo tempo. Use páginas sem login pessoal. Primeiro valide a fixture com `npm.cmd run fixture`.

Separe condições: **M** (monitor, sem outras extensões), **U** (uBlock Origin, coleta própria), **B** (relatório Blacklight com timestamp). Uma coleta adicional **M+U** ajuda a estudar observabilidade, mas não substitui M: o monitor pode deixar de enxergar requisições que uBlock ou ETP já impediram. Desabilitar ETP não é pré-requisito; documente e, quando necessário, faça uma segunda coleta explicitamente marcada.

## DuckDuckGo: oito grupos

A [página inicial oficial](https://www.first-party.site/) e o [repositório](https://github.com/duckduckgo/privacy-test-pages) são a referência. Confira o que a página realmente informa no dia da execução. Não substituir resultado esperado por uma previsão genérica nossa.

| ID / página | Ação | O que comparar |
|---|---|---|
| tracker-reporting — `/tracker-reporting/1major-via-script.html` | Carregar; testar também imagem/fetch se possível | Rastreador anunciado vs domínio/recurso/status observado |
| storage-blocking — `/privacy-protections/storage-blocking/` | Acionar testes e aguardar frames | Resultado por API vs chamada, origem e negação; monitor não bloqueia APIs |
| fingerprinting — `/privacy-protections/fingerprinting/` | HTTPS, Start the test, canvas visual se necessário | Métodos de leitura vs resultado do teste; monitor não impede fingerprinting |
| bounce-tracking — `/privacy-protections/bounce-tracking/` | Completar cada fluxo escolhido | Sequência de URLs/redirects, tempos, identificadores e eventuais lacunas |
| query-parameters — `/privacy-protections/query-parameters/` | Seguir links indicados | Parâmetros conhecidos detectados; não há remoção automática |
| tracker-blocking — `/privacy-protections/request-blocking/` | Rodar sem regra; adicionar **bad.third-party.site**, recarregar e repetir | Cada mecanismo anunciado vs cancelamento/erro, incluindo frames/workers |
| storage-partitioning — `/privacy-protections/storage-partitioning/` | Uma cópia aberta; sem recarga forçada; Run Tests e Show Detailed Results | Partições reportadas pelo teste vs origens/partitionKey; método de acesso isolado não prova isolamento |
| js-leaks — `/security/js-leaks.html` | Rodar sem e com monitor | Alterações próprias (wrappers) vs alterações posteriores observadas; enumerar APIs |

Para cada grupo/subteste:

1. Anote URL completa localmente, horário, ação executada e **resultado esperado informado pela própria página**.
2. Capture o resultado da página e o monitor aberto, preferencialmente lado a lado. Use o popup ou duas janelas, com URL e domínio visíveis; o painel expandido mostra a URL observada.
3. Exporte JSON, salve resultados próprios do DDG quando houver e identifique arquivos por condição (antes/depois).
4. Preencha esperado, observado e explicação no `docs/relatorio/dados.json`. Para divergências, referencie método, domínio, recurso, frame, requestId e/ou entrada HAR. Havendo concordância, também indique evidência.
5. Guarde em `evidencias/ddg/<id>/`. Print de fixture ou teste automatizado não substitui print na página DDG.

## Três sites reais

Fernando confirmou que os sites podem ser escolhidos livremente. A entrega usa BBC News, Magazine Luiza e Wikipédia. A tentativa anterior da CNN Brasil ficou em `evidencias/adicionais/cnn`, após falhas do Blacklight. Para repetir a coleta de cada site:

1. Condição M: abrir DevTools → Rede antes da navegação, habilitar persistência do log e registrar cache. Navegar, seguir o consentimento definido e aguardar um intervalo fixo (ex.: 30s). Fazer as mesmas interações nas repetições.
2. No painel de Rede, exportar **Salvar tudo como HAR** (nome pode variar com idioma/versão). Salvar em `evidencias/sites/site-N/monitor.har`.
3. Abrir monitor, atualizar, exportar `monitor.json`, tirar `monitor.png` com a página identificável. Registrar score e suas sete parcelas.
4. Condição U: em perfil limpo/equivalente, instalar uBlock Origin do [projeto oficial](https://github.com/gorhill/uBlock), registrar versão e listas. Abrir logger **antes** da navegação, reproduzir condições e salvar log/prints contendo domínios, recursos, regra aplicada e resultados. HAR adicional recomendado.
5. Condição B: executar [Blacklight](https://themarkup.org/blacklight), guardar relatório/prints completos, URL submetida e horário. Se indisponível, registrar evidência do erro e combinar alternativa com o professor; não inventar resultados.
6. Transcrever domínios Blacklight/uBlock em listas JSON normalizadas com referência ao arquivo/linha/seção de origem. Rodar `scripts/compare-har.mjs` conforme README.
7. Para **cada domínio na união**, verificar em que ferramenta aparece. Nem todo domínio que o monitor observou é rastreador. Se o mesmo serviço usa outros hosts, registrar o mapeamento com prova.
8. Preencher reconciliação e discussão do score. Exemplos de evidência concreta: `monitor.har log.entries[42]`, horário, URL sem token, status 302 e Location; `logger.txt linha 18`, regra `||dominio^`; `blacklight.png seção Trackers`.

Uma possível causa não é uma explicação comprovada. “Pode ser cache” sozinho é insuficiente. Vincule à entrada e cabeçalhos/status do HAR ou faça uma repetição que isole o efeito. HAR e requestId do Firefox usam identificadores distintos: correlacionar horário + host + caminho + método/status, não supor igualdade de IDs. O script fornece índice HAR **base zero**.

O JSON do monitor redige parâmetros; o HAR original pode ser necessário para comprovar sincronização. Guarde original privado, prepare uma cópia revisada para entrega e documente as redações sem destruir as relações necessárias à análise. Cookies/tokens pessoais não devem ser publicados.

## Gerar o PDF

Editar `docs/relatorio/dados.json` com caminhos relativos à raiz. `npm.cmd run report` sempre produz rascunho explicitamente identificado e lista pendências. `npm.cmd run report -- --final` exige textos preenchidos, oito testes, três sites, evidências existentes, scores e reconciliações. Os scores dos sites são recalculados a partir dos JSONs indicados. A checagem de preenchimento não certifica a qualidade da explicação: revisar visualmente o PDF e conferir todos os arquivos.

## Coleta executada e reprodução automatizada

As evidências entregues usam Firefox 156.0.1 headless em perfis novos e independentes, por Selenium. Os HARs vêm da API **nativa do Firefox DevTools**, `NetMonitorAPI.getHar/HarExporter`, aberta antes da navegação. Não são conversões do relatório do monitor. Imagens da página e do painel são capturas reais separadas. Horários ISO em UTC estão nos metadados; as coletas ocorreram na noite de 28/09 em Brasília.

```powershell
node scripts/collect-ddg.mjs             # aceita um ID de teste opcional
node scripts/ddg-js-baseline.mjs         # controle sem extensão
node scripts/collect-sites.mjs          # aceita site-1, site-2 ou site-3
node scripts/download-ublock.mjs         # pacote oficial Mozilla Add-ons
node scripts/collect-ublock.mjs
node scripts/collect-blacklight.mjs
node scripts/fetch-blacklight-results.mjs
node scripts/prepare-blacklight-evidence.mjs
```

O último comando baixa os arquivos oficiais Blacklight. Para extrair seus HARs privados e consolidar a comparação:

```powershell
python -c "import zipfile,pathlib; root=pathlib.Path('.cache/blacklight'); [(root.joinpath(p.name.replace('-archive.zip','-requests.har')).write_bytes(zipfile.ZipFile(p).read('raw/requests.har'))) for p in root.glob('*-archive.zip')]"
node scripts/prepare-comparison.mjs
node scripts/prepare-report-data.mjs
npm.cmd run report -- --final
```

Esses comandos de coleta acessam a rede e **substituem os arquivos** da condição executada; preservar as coletas anteriores antes de repetir. O Firefox da automação fica em `.cache/selenium`, sem alterar o navegador pessoal. As preferências reais estão em `ambiente.json`; ETP do perfil Selenium foi `custom`, trackingProtection=false e cookieBehavior=5. Isso não é uma afirmação sobre padrões do Firefox de uso pessoal. Os metadados uBlock registram versão/listas; o Blacklight registra região, navegador, histórico e horários.

Resultados que exigem interpretação: WebSocket já falhava sem a regra; Prefetch Cache não passou no teste de particionamento; js-leaks compara com Firefox 92; o Blacklight da Magazine Luiza recebeu um documento de erro. Não declarar todos os testes aprovados. A reconciliação cita recursos concretos e deixa explícito quando não há evidência para isolar a causa de uma ausência.
