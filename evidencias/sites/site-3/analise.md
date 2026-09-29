# Comparação — Wikipédia

Fontes: HARs reais das três condições, relatório do monitor, logger uBlock e resultado oficial Blacklight. Nenhuma ausência é tomada automaticamente como bloqueio ou falso negativo.

## wikimedia.org
13 pedidos; catálogo: sem classificação | Blacklight: 31 pedidos; categorias: cookies | uBlock: 20 registros; 0 bloqueados/redirecionados

Firefox registrou 11 entradas deste domínio, por exemplo https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9f/CPM_22_%28311693005%29.jpg/250px-CPM_22_%28311693005%29.jpg (query preservada no HAR) (HTTP 200, entrada 13). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O logger uBlock tem 20 registros deste domínio, sem ação --/<< na amostra. A presença no monitor não implica que deva ser bloqueado; ver linhas 3, 4, 6. Blacklight associou o domínio às categorias cookies; cookies de terceiros e rastreadores publicitários são categorias distintas.

Evidências: monitor.har: log.entries[13], [15], [16], [18]; blacklight.har: log.entries[15], [16], [17], [18]; ublock.har: log.entries[15], [16], [17], [18]; ublock-logger.txt: linhas 3, 4, 6, 8, 10; blacklight-resultados.json: cards cookies

## wikipedia.org
22 pedidos; catálogo: sem classificação | Blacklight: 30 pedidos; categorias: nenhuma nos cartões | uBlock: 24 registros; 0 bloqueados/redirecionados

Firefox registrou 22 entradas deste domínio, por exemplo https://pt.wikipedia.org/wiki/Wikip%C3%A9dia:P%C3%A1gina_principal (HTTP 200, entrada 0). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O logger uBlock tem 24 registros deste domínio, sem ação --/<< na amostra. A presença no monitor não implica que deva ser bloqueado; ver linhas 5, 7, 9. Blacklight também contatou este domínio (30 entradas no seu HAR), mas não o incluiu nos domínios dos cartões de rastreadores/cookies/session replay. É diferença entre tráfego bruto e critérios dos cartões.

Evidências: monitor.har: log.entries[0], [1], [2], [3]; blacklight.har: log.entries[0], [1], [2], [3]; ublock.har: log.entries[0], [1], [2], [3]; ublock-logger.txt: linhas 5, 7, 9, 11, 13
