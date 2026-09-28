# Firefox Privacy Monitor

Extensão acadêmica para Firefox, com processamento local, relatório por página e lista de bloqueio personalizada. Entrega prevista: **29/09/2026**. Os três sites sorteados ainda precisam ser informados.

## Instalar e usar

1. Instale o [Firefox oficial](https://www.mozilla.org/firefox/new/) **142 ou superior**.
2. Abra `about:debugging#/runtime/this-firefox` → **Carregar extensão temporária**.
3. Selecione [`extension/manifest.json`](extension/manifest.json). Os arquivos compilados em `extension/dist/` acompanham o repositório; não é necessário Node para carregar essa versão.
4. Abra uma página HTTP(S), recarregue e aguarde suas requisições terminarem. Clique no botão **Privacy Monitor** na barra de extensões.
5. Clique **Abrir painel** para uma visualização ampla, **Atualizar** para obter o estado atual e **Exportar JSON** para guardar a coleta. O painel mantém o vínculo com a aba original.
6. Em **Sua lista de bloqueio**, informe um domínio por linha, salve e recarregue a página. `bad.third-party.site` é o domínio solicitado pelo teste DDG de Tracker Blocking.

A instalação temporária termina ao reiniciar o Firefox. Ao editar os fontes, compile e clique **Recarregar** em `about:debugging`, depois recarregue a página testada. Relatórios ficam em memória e são substituídos na próxima navegação principal; exporte antes de sair. A lista de bloqueio fica em `storage.local`.

## O que está implementado

| Requisito | Implementação e interpretação |
|---|---|
| Conexões externas | `webRequest`, domínio registrável via Public Suffix List (tldts, sufixos privados incluídos), URL, tipo, status, origem e requestId |
| Rastreadores | Catálogo **demonstrativo**, claramente separado de toda conexão de terceira parte; não equivale às listas do uBlock/Blacklight |
| Cookies | Tentativas `Set-Cookie` e `document.cookie`; inventário via `cookies.getAll`; primeira/terceira parte, sessão/persistente, partição e diferença contra baseline |
| HTML5 storage | Métodos de localStorage/sessionStorage, IndexedDB, frames e snapshots de quantidade de chaves |
| Canvas | Leitura/serialização 2D, WebGL e OffscreenCanvas no documento; indica possível fingerprinting |
| Cookie sync | Correlação de valor opaco idêntico entre cookies/query e sites distintos, sem exportar valores; heurística |
| Bounce | Cadeia de redirects HTTP e sequência A→B→C com passagem rápida; preserva redirects até destino final |
| Query parameters | Nomes conhecidos, como `uid`, `gclid`, `fbclid` e `utm_*`; presença isolada não prova sincronização |
| Hook/hijacking | Mudança de referências monitoradas após document_start, handshake WebSocket terceiro e polling recorrente; não diagnostica comprometimento |
| Score | 100 menos penalidades limitadas a 100, com cálculo por categoria e critérios visíveis |
| Bloqueio | Cancelamento de pedidos por domínio e subdomínios, incluindo navegações principais; lista persistida |
| Exportação | JSON redigido e painel imprimível; relatório acadêmico PDF gerado a partir dos dados/evidências |

**Limites de medição são parte do trabalho:** cookies existentes não são necessariamente injetados nesta visita; tentativa não comprova aceitação. Observação de storage não comprova particionamento. O monitor não bloqueia APIs de storage, não remove parâmetros e não impede leitura de canvas. [Metodologia e limitações](docs/METODOLOGIA.md).

## Desenvolvimento e verificações

Requer Node.js **22.15+** e npm. No PowerShell, `npm.cmd` evita restrições da política de execução de scripts.

```powershell
npm.cmd ci
npm.cmd run check
npm.cmd run fixture
```

Abra `http://localhost:8787` no Firefox com a extensão carregada e aguarde 15 segundos. A fixture dispara cookies, storage, canvas, alteração de fetch e polling para `127.0.0.1`. Inclui um fluxo bounce. Estes dois hosts são sites distintos para a classificação; não há tráfego de teste enviado a terceiros externos.

```powershell
npm.cmd run test:browser   # Firefox headless isolado; primeiro uso baixa navegador/driver
npm.cmd run package        # ZIP em artifacts/
npm.cmd run report         # PDF rascunho com pendências explícitas
npm.cmd run report -- --final  # recusa gerar final enquanto faltarem dados/evidências
```

O teste real usa cache em `.cache/selenium/`, perfil temporário e não altera seu navegador padrão. `FIREFOX_BINARY` permite indicar um Firefox existente. Os testes de unidade e integração verificam classificação, privacidade da exportação, cookies, score, navegação, permissões de mensagens e reconciliação HAR. O smoke test gera evidências **sintéticas**, separadas das exigidas pelo professor em `evidencias/locais/`.

## Validação e entrega

- [Roteiro completo de coleta DDG, HAR, Blacklight e uBlock](docs/VALIDACAO.md).
- [Checklist e cronograma até 29/09](docs/ENTREGA.md).
- [Dados que alimentam o relatório](docs/relatorio/dados.json).
- [PDF rascunho](docs/relatorio/relatorio-rascunho.pdf): **não é a entrega final**.
- [Organização das evidências](evidencias/README.md).

Para iniciar a reconciliação por domínio:

```powershell
node scripts/compare-har.mjs evidencias/sites/site-1/monitor.har evidencias/sites/site-1/monitor.json evidencias/sites/site-1/blacklight-dominios.json evidencias/sites/site-1/ublock-dominios.json evidencias/sites/site-1/reconciliacao.json
```

As duas listas externas devem ser JSON normalizado: `[{"domain":"tracker.example","evidence":"arquivo.png: seção / logger.txt: linha","note":"observação"}]`. Elas são transcritas do Blacklight/logger, preservando o arquivo original. A tabela une os domínios observados nos quatro conjuntos e fornece índices de entradas do HAR. **Não inventa motivos de divergência.** Use-a para preencher `reconciliation` no relatório com `domain`, `plugin`, `blacklight`, `ublock`, `explanation` e `evidence`.

## Estrutura

```text
extension/          Manifest, painel e bundles instaláveis
src/                Detectores, estado por aba, score e interface
tests/              Testes de lógica e integração com APIs simuladas
scripts/            Build, fixture, Firefox real, HAR e geração de PDF
docs/               Metodologia, validação, entrega e relatório
evidencias/         Coletas reais e testes locais, em pastas distintas
```

## Dados e permissões

Não há telemetria nem servidor da extensão. `<all_urls>` permite observar e bloquear os sites escolhidos; `webRequest`/`webRequestBlocking` acessam a rede; `cookies` permite classificar cookies; `tabs` identifica a página; `storage` persiste somente regras. Valores de cookies/identificadores usados na correlação ficam temporariamente em memória. O JSON remove valores da query, fragmentos e credenciais, mas **caminhos, domínios e nomes podem continuar sensíveis**. HARs exportados pelo Firefox podem conter cookies, tokens e corpos: revise antes de publicar. Não faça os testes usando contas pessoais.

O projeto usa Manifest V2 para o bloqueio síncrono de rede suportado pelo Firefox. Há instrumentação no contexto da página via APIs específicas do Firefox (`wrappedJSObject`/`exportFunction`), sem eval ou scripts remotos. A página pode detectar/alterar os wrappers; isso é uma limitação explícita, particularmente no js-leaks.

## Referências

- [MDN WebExtensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- [Compartilhamento de objetos com scripts de página](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Sharing_objects_with_page_scripts)
- [cookies.getAll e partições](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/cookies/getAll)
- [DuckDuckGo Privacy Test Pages](https://github.com/duckduckgo/privacy-test-pages) e [páginas publicadas](https://www.first-party.site/)
- [Blacklight](https://themarkup.org/blacklight) e [uBlock Origin](https://github.com/gorhill/uBlock)
- [Public Suffix List](https://publicsuffix.org/list/) e [tldts](https://github.com/remusao/tldts)

Licença do projeto: [MIT](LICENSE). As dependências mantêm suas próprias licenças.
