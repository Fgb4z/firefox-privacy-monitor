# Comparação — BBC News

Fontes: HARs reais das três condições, relatório do monitor, logger uBlock e resultado oficial Blacklight. Nenhuma ausência é tomada automaticamente como bloqueio ou falso negativo.

## 2mdn.net
0 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: ddg_join_ads | uBlock: 0 registros; 0 bloqueados/redirecionados

Este domínio não consta no HAR da execução M; isso limita a afirmação a esta amostra. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight associou o domínio às categorias ddg_join_ads; cookies de terceiros e rastreadores publicitários são categorias distintas. O cartão Blacklight inclui este domínio, porém o HAR do próprio Blacklight não contém pedido correspondente. Há uma diferença de cobertura entre os artefatos da mesma ferramenta; o cartão comprova a classificação, mas este HAR não permite afirmar status, conclusão ou causa da ausência local.

Evidências: blacklight-resultados.json: cards ddg_join_ads

## 360yield.com
4 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: ddg_join_ads | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 4 entradas deste domínio, por exemplo https://ice.360yield.com/match (query preservada no HAR) (HTTP 302, entrada 267). O monitor observou a conexão, mas não a rotulou como rastreador: 360yield.com não está no catálogo demonstrativo de src/core.js. Blacklight a classifica por Tracker Radar; trata-se de diferença de classificação, não ausência de captura. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight associou o domínio às categorias ddg_join_ads; cookies de terceiros e rastreadores publicitários são categorias distintas. O cartão Blacklight inclui este domínio, porém o HAR do próprio Blacklight não contém pedido correspondente. Há uma diferença de cobertura entre os artefatos da mesma ferramenta; o cartão comprova a classificação, mas este HAR não permite afirmar status, conclusão ou causa da ausência local.

Evidências: monitor.har: log.entries[267], [276], [283], [330]; blacklight-resultados.json: cards ddg_join_ads

## 3lift.com
3 pedidos; catálogo: sem classificação | Blacklight: 2 pedidos; categorias: ddg_join_ads, cookies | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 3 entradas deste domínio, por exemplo https://eb2.3lift.com/getuid (query preservada no HAR) (HTTP 302, entrada 173). O monitor observou a conexão, mas não a rotulou como rastreador: 3lift.com não está no catálogo demonstrativo de src/core.js. Blacklight a classifica por Tracker Radar; trata-se de diferença de classificação, não ausência de captura. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight associou o domínio às categorias ddg_join_ads, cookies; cookies de terceiros e rastreadores publicitários são categorias distintas.

Evidências: monitor.har: log.entries[173], [178], [281]; blacklight.har: log.entries[228], [231]; blacklight-resultados.json: cards ddg_join_ads, cookies

## a-mo.net
1 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 1 entradas deste domínio, por exemplo https://sync.a-mo.net/setuid/magnite (query preservada no HAR) (HTTP 204, entrada 261). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. O domínio não consta no HAR Blacklight desta amostra. A diferença de tráfego está comprovada, mas a causa individual não pode ser afirmada apenas com ausência; condições e horários diferem, conforme os metadados das duas execuções.

Evidências: monitor.har: log.entries[261]

## adform.net
2 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 2 entradas deste domínio, por exemplo https://c1.adform.net/serving/cookie/match (query preservada no HAR) (HTTP 302, entrada 303). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. O domínio não consta no HAR Blacklight desta amostra. A diferença de tráfego está comprovada, mas a causa individual não pode ser afirmada apenas com ausência; condições e horários diferem, conforme os metadados das duas execuções.

Evidências: monitor.har: log.entries[303], [326]

## adnxs.com
5 pedidos; catálogo: sem classificação | Blacklight: 3 pedidos; categorias: ddg_join_ads, cookies | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 5 entradas deste domínio, por exemplo https://ib.adnxs.com/getuidj (query preservada no HAR) (HTTP 200, entrada 125). O monitor observou a conexão, mas não a rotulou como rastreador: adnxs.com não está no catálogo demonstrativo de src/core.js. Blacklight a classifica por Tracker Radar; trata-se de diferença de classificação, não ausência de captura. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight associou o domínio às categorias ddg_join_ads, cookies; cookies de terceiros e rastreadores publicitários são categorias distintas.

Evidências: monitor.har: log.entries[125], [184], [185], [190]; blacklight.har: log.entries[144], [250], [255]; blacklight-resultados.json: cards ddg_join_ads, cookies

## adsafeprotected.com
0 pedidos; catálogo: sem classificação | Blacklight: 2 pedidos; categorias: ddg_join_ads | uBlock: 0 registros; 0 bloqueados/redirecionados

Este domínio não consta no HAR da execução M; isso limita a afirmação a esta amostra. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight associou o domínio às categorias ddg_join_ads; cookies de terceiros e rastreadores publicitários são categorias distintas. A ocorrência exclusiva do Blacklight está concretamente registrada em blacklight.har[160]: https://dt.adsafeprotected.com/dt (query preservada no HAR) HTTP 200. Não foi reproduzida no Firefox; não há base para atribuí-la a uma falha do catálogo, pois nem o HAR local contém o pedido. O iniciador registrado pelo Blacklight foi https://secretivesponge.com/dist/qiwf1_xzb1hv6.module.js (entrada 205, campo _initiator). Isso identifica a cadeia executada nessa condição, sem presumir a mesma execução no Firefox.

Evidências: blacklight.har: log.entries[160], [205]; blacklight-resultados.json: cards ddg_join_ads

## adsrvr.org
6 pedidos; catálogo: sem classificação | Blacklight: 5 pedidos; categorias: ddg_join_ads, cookies | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 6 entradas deste domínio, por exemplo https://match.adsrvr.org/track/cmf/generic (query preservada no HAR) (HTTP 302, entrada 200). O monitor observou a conexão, mas não a rotulou como rastreador: adsrvr.org não está no catálogo demonstrativo de src/core.js. Blacklight a classifica por Tracker Radar; trata-se de diferença de classificação, não ausência de captura. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight associou o domínio às categorias ddg_join_ads, cookies; cookies de terceiros e rastreadores publicitários são categorias distintas.

Evidências: monitor.har: log.entries[200], [207], [209], [213]; blacklight.har: log.entries[165], [209], [234], [235]; blacklight-resultados.json: cards ddg_join_ads, cookies

## adtrafficquality.google
5 pedidos; catálogo: sem classificação | Blacklight: 5 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 5 entradas deste domínio, por exemplo https://ep1.adtrafficquality.google/getconfig/sodar (query preservada no HAR) (HTTP 200, entrada 147). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight também contatou este domínio (5 entradas no seu HAR), mas não o incluiu nos domínios dos cartões de rastreadores/cookies/session replay. É diferença entre tráfego bruto e critérios dos cartões.

Evidências: monitor.har: log.entries[147], [150], [152], [162]; blacklight.har: log.entries[162], [166], [173], [206]

## amazon-adsystem.com
6 pedidos; catálogo: sem classificação | Blacklight: 2 pedidos; categorias: ddg_join_ads | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 6 entradas deste domínio, por exemplo https://s.amazon-adsystem.com/dcm (query preservada no HAR) (HTTP 302, entrada 233). O monitor observou a conexão, mas não a rotulou como rastreador: amazon-adsystem.com não está no catálogo demonstrativo de src/core.js. Blacklight a classifica por Tracker Radar; trata-se de diferença de classificação, não ausência de captura. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight associou o domínio às categorias ddg_join_ads; cookies de terceiros e rastreadores publicitários são categorias distintas.

Evidências: monitor.har: log.entries[233], [236], [251], [256]; blacklight.har: log.entries[152], [199]; blacklight-resultados.json: cards ddg_join_ads

## bbc-reporting-api.app
2 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 1 registros; 1 bloqueados/redirecionados

Este domínio não consta no HAR da execução M; isso limita a afirmação a esta amostra. O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. uBlock produziu 1 linhas de bloqueio/redirecionamento, com regra concreta *$ping,3p, aplicada a https://dotcom.bbc-reporting-api.app/report-endpoint (query preservada no HAR) (linha 1). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. O domínio não consta no HAR Blacklight desta amostra. A diferença de tráfego está comprovada, mas a causa individual não pode ser afirmada apenas com ausência; condições e horários diferem, conforme os metadados das duas execuções.

Evidências: ublock-logger.txt: linhas 1

## bbc.co.uk
3 pedidos; catálogo: sem classificação | Blacklight: 2 pedidos; categorias: nenhuma nos cartões | uBlock: 3 registros; 0 bloqueados/redirecionados

Firefox registrou 3 entradas deste domínio, por exemplo https://www.bbc.co.uk/userinfo (HTTP 200, entrada 62). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O logger uBlock tem 3 registros deste domínio, sem ação --/<< na amostra. A presença no monitor não implica que deva ser bloqueado; ver linhas 38, 42, 88. Blacklight também contatou este domínio (2 entradas no seu HAR), mas não o incluiu nos domínios dos cartões de rastreadores/cookies/session replay. É diferença entre tráfego bruto e critérios dos cartões.

Evidências: monitor.har: log.entries[62], [91], [98]; blacklight.har: log.entries[78], [89]; ublock.har: log.entries[62], [85], [88]; ublock-logger.txt: linhas 38, 42, 88

## bbc.com
10 pedidos; catálogo: sem classificação | Blacklight: 18 pedidos; categorias: nenhuma nos cartões | uBlock: 18 registros; 2 bloqueados/redirecionados

Firefox registrou 10 entradas deste domínio, por exemplo https://www.bbc.com/news (HTTP 200, entrada 0). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. uBlock produziu 2 linhas de bloqueio/redirecionamento, com regra concreta ||a1.api.bbc.com^, aplicada a https://a1.api.bbc.com/event (query preservada no HAR) (linha 12). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. Blacklight também contatou este domínio (18 entradas no seu HAR), mas não o incluiu nos domínios dos cartões de rastreadores/cookies/session replay. É diferença entre tráfego bruto e critérios dos cartões.

Evidências: monitor.har: log.entries[0], [3], [86], [87]; blacklight.har: log.entries[0], [4], [102], [103]; ublock.har: log.entries[0], [3], [89], [90]; ublock-logger.txt: linhas 12, 32

## bbc.map.fastly.net
0 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 1 registros; 0 bloqueados/redirecionados

Este domínio não consta no HAR da execução M; isso limita a afirmação a esta amostra. O logger uBlock tem 1 registros deste domínio, sem ação --/<< na amostra. A presença no monitor não implica que deva ser bloqueado; ver linhas 83. O domínio não consta no HAR Blacklight desta amostra. A diferença de tráfego está comprovada, mas a causa individual não pode ser afirmada apenas com ausência; condições e horários diferem, conforme os metadados das duas execuções. A linha 83 é um alias DNS resolvido pelo uBlock: https://bbc.map.fastly.net/, com aliasURL=https://www.bbc.co.uk/userinfo. O monitor observa o URL original e não resolve CNAME; essa é uma diferença concreta de representação/cobertura, não necessariamente uma conexão adicional.

Evidências: ublock-logger.txt: linhas 83

## bbci.co.uk
70 pedidos; catálogo: sem classificação | Blacklight: 80 pedidos; categorias: nenhuma nos cartões | uBlock: 72 registros; 0 bloqueados/redirecionados

Firefox registrou 70 entradas deste domínio, por exemplo https://static.bbci.co.uk/frameworks/requirejs/0.13.0/sharedmodules/require.js (HTTP 200, entrada 1). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O logger uBlock tem 72 registros deste domínio, sem ação --/<< na amostra. A presença no monitor não implica que deva ser bloqueado; ver linhas 39, 40, 46. Blacklight também contatou este domínio (80 entradas no seu HAR), mas não o incluiu nos domínios dos cartões de rastreadores/cookies/session replay. É diferença entre tráfego bruto e critérios dos cartões.

Evidências: monitor.har: log.entries[1], [4], [5], [6]; blacklight.har: log.entries[1], [5], [6], [7]; ublock.har: log.entries[2], [4], [5], [6]; ublock-logger.txt: linhas 39, 40, 46, 59, 61

## bbcverticals.com
0 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 5 registros; 0 bloqueados/redirecionados

Este domínio não consta no HAR da execução M; isso limita a afirmação a esta amostra. O logger uBlock tem 5 registros deste domínio, sem ação --/<< na amostra. A presença no monitor não implica que deva ser bloqueado; ver linhas 14, 17, 21. O domínio não consta no HAR Blacklight desta amostra. A diferença de tráfego está comprovada, mas a causa individual não pode ser afirmada apenas com ausência; condições e horários diferem, conforme os metadados das duas execuções. A linha 14 é um alias DNS resolvido pelo uBlock: https://static-web-assets.gnl-common.bbcverticals.com/, com aliasURL=https://gn-web-assets.api.bbc.com/ngas/vendor/edr/edr.min.js. O monitor observa o URL original e não resolve CNAME; essa é uma diferença concreta de representação/cobertura, não necessariamente uma conexão adicional.

Evidências: ublock-logger.txt: linhas 14, 17, 21, 23, 168

## bidr.io
3 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 3 entradas deste domínio, por exemplo https://match.prod.bidr.io/cookie-sync/rp (query preservada no HAR) (HTTP 303, entrada 241). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. O domínio não consta no HAR Blacklight desta amostra. A diferença de tráfego está comprovada, mas a causa individual não pode ser afirmada apenas com ausência; condições e horários diferem, conforme os metadados das duas execuções.

Evidências: monitor.har: log.entries[241], [260], [302]

## bidswitch.net
3 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 3 entradas deste domínio, por exemplo https://x.bidswitch.net/sync (query preservada no HAR) (HTTP 302, entrada 334). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. O domínio não consta no HAR Blacklight desta amostra. A diferença de tráfego está comprovada, mas a causa individual não pode ser afirmada apenas com ausência; condições e horários diferem, conforme os metadados das duas execuções.

Evidências: monitor.har: log.entries[334], [335], [339]

## casalemedia.com
2 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 2 entradas deste domínio, por exemplo https://ssum.casalemedia.com/usermatchredir (query preservada no HAR) (HTTP 302, entrada 284). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. O domínio não consta no HAR Blacklight desta amostra. A diferença de tráfego está comprovada, mas a causa individual não pode ser afirmada apenas com ausência; condições e horários diferem, conforme os metadados das duas execuções.

Evidências: monitor.har: log.entries[284], [287]

## chartbeat.com
1 pedidos; catálogo: sem classificação | Blacklight: 1 pedidos; categorias: ddg_join_ads | uBlock: 3 registros; 3 bloqueados/redirecionados

Firefox registrou 1 entradas deste domínio, por exemplo https://static.chartbeat.com/js/chartbeat.js (HTTP 200, entrada 75). O monitor observou a conexão, mas não a rotulou como rastreador: chartbeat.com não está no catálogo demonstrativo de src/core.js. Blacklight a classifica por Tracker Radar; trata-se de diferença de classificação, não ausência de captura. uBlock produziu 3 linhas de bloqueio/redirecionamento, com regra concreta chartbeat.js, aplicada a https://static.chartbeat.com/js/chartbeat.js (linha 52). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. Blacklight associou o domínio às categorias ddg_join_ads; cookies de terceiros e rastreadores publicitários são categorias distintas.

Evidências: monitor.har: log.entries[75]; blacklight.har: log.entries[108]; ublock-logger.txt: linhas 52, 53, 54; blacklight-resultados.json: cards ddg_join_ads

## chartbeat.net
3 pedidos; catálogo: sem classificação | Blacklight: 2 pedidos; categorias: ddg_join_ads | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 2 entradas deste domínio, por exemplo https://ping.chartbeat.net/ping (query preservada no HAR) (HTTP 200, entrada 80). O monitor observou a conexão, mas não a rotulou como rastreador: chartbeat.net não está no catálogo demonstrativo de src/core.js. Blacklight a classifica por Tracker Radar; trata-se de diferença de classificação, não ausência de captura. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight associou o domínio às categorias ddg_join_ads; cookies de terceiros e rastreadores publicitários são categorias distintas.

Evidências: monitor.har: log.entries[80], [285]; blacklight.har: log.entries[123], [192]; blacklight-resultados.json: cards ddg_join_ads

## cloudflareinsights.com
1 pedidos; catálogo: sem classificação | Blacklight: 1 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 1 entradas deste domínio, por exemplo https://static.cloudflareinsights.com/beacon.min.js/v31edd6df95cf4e85bb4c19e7a9bdbcba1788362987495 (HTTP 200, entrada 186). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight também contatou este domínio (1 entradas no seu HAR), mas não o incluiu nos domínios dos cartões de rastreadores/cookies/session replay. É diferença entre tráfego bruto e critérios dos cartões.

Evidências: monitor.har: log.entries[186]; blacklight.har: log.entries[249]

## cootlogix.com
3 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 3 entradas deste domínio, por exemplo https://sync.cootlogix.com/api/user/image/55537adc33d1b40300987e8e (query preservada no HAR) (HTTP 302, entrada 203). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. O domínio não consta no HAR Blacklight desta amostra. A diferença de tráfego está comprovada, mas a causa individual não pode ser afirmada apenas com ausência; condições e horários diferem, conforme os metadados das duas execuções.

Evidências: monitor.har: log.entries[203], [225], [269]

## cxense.com
12 pedidos; catálogo: sem classificação | Blacklight: 9 pedidos; categorias: ddg_join_ads, cookies | uBlock: 2 registros; 2 bloqueados/redirecionados

Firefox registrou 11 entradas deste domínio, por exemplo https://cdn.cxense.com/ari.js (HTTP 200, entrada 89). O monitor observou a conexão, mas não a rotulou como rastreador: cxense.com não está no catálogo demonstrativo de src/core.js. Blacklight a classifica por Tracker Radar; trata-se de diferença de classificação, não ausência de captura. uBlock produziu 2 linhas de bloqueio/redirecionamento, com regra concreta ||cxense.com^$3p, aplicada a https://cdn.cxense.com/cx.cce.js (linha 20). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. Blacklight associou o domínio às categorias ddg_join_ads, cookies; cookies de terceiros e rastreadores publicitários são categorias distintas.

Evidências: monitor.har: log.entries[89], [92], [107], [115]; blacklight.har: log.entries[90], [94], [107], [125]; ublock.har: log.entries[83], [99]; ublock-logger.txt: linhas 20, 44; blacklight-resultados.json: cards ddg_join_ads, cookies

## deepintent.com
1 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 1 entradas deste domínio, por exemplo https://match.deepintent.com/usersync/141 (query preservada no HAR) (HTTP 200, entrada 309). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. O domínio não consta no HAR Blacklight desta amostra. A diferença de tráfego está comprovada, mas a causa individual não pode ser afirmada apenas com ausência; condições e horários diferem, conforme os metadados das duas execuções.

Evidências: monitor.har: log.entries[309]

## demdex.net
2 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 2 entradas deste domínio, por exemplo https://dpm.demdex.net/ibs:dpid=19566&dpuuid=7BDFB66C-6EC9-4FAA-9970-EC23CE249692 (HTTP 302, entrada 312). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. O domínio não consta no HAR Blacklight desta amostra. A diferença de tráfego está comprovada, mas a causa individual não pode ser afirmada apenas com ausência; condições e horários diferem, conforme os metadados das duas execuções.

Evidências: monitor.har: log.entries[312], [319]

## dotmetrics.net
6 pedidos; catálogo: sem classificação | Blacklight: 9 pedidos; categorias: cookies | uBlock: 1 registros; 1 bloqueados/redirecionados

Firefox registrou 5 entradas deste domínio, por exemplo https://uk-script.dotmetrics.net/door.js (query preservada no HAR) (HTTP 200, entrada 79). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. uBlock produziu 1 linhas de bloqueio/redirecionamento, com regra concreta ||dotmetrics.net^, aplicada a https://uk-script.dotmetrics.net/door.js (query preservada no HAR) (linha 48). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. Blacklight associou o domínio às categorias cookies; cookies de terceiros e rastreadores publicitários são categorias distintas.

Evidências: monitor.har: log.entries[79], [96], [97], [99]; blacklight.har: log.entries[92], [104], [105], [106]; ublock.har: log.entries[79]; ublock-logger.txt: linhas 48; blacklight-resultados.json: cards cookies

## doubleclick.net
12 pedidos; catálogo: Google Ads | Blacklight: 13 pedidos; categorias: ddg_join_ads, cookies | uBlock: 3 registros; 3 bloqueados/redirecionados

Firefox registrou 12 entradas deste domínio, por exemplo https://securepubads.g.doubleclick.net/tag/js/gpt.js (HTTP 200, entrada 108). O catálogo do monitor identifica Google Ads nos hosts securepubads.g.doubleclick.net, cm.g.doubleclick.net. uBlock produziu 3 linhas de bloqueio/redirecionamento, com regra concreta googletagservices_gpt.js:5, aplicada a https://securepubads.g.doubleclick.net/tag/js/gpt.js (linha 28). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. Blacklight associou o domínio às categorias ddg_join_ads, cookies; cookies de terceiros e rastreadores publicitários são categorias distintas.

Evidências: monitor.har: log.entries[108], [114], [151], [165]; blacklight.har: log.entries[98], [117], [128], [129]; ublock-logger.txt: linhas 28, 29, 30; blacklight-resultados.json: cards ddg_join_ads, cookies

## doubleverify.com
11 pedidos; catálogo: sem classificação | Blacklight: 7 pedidos; categorias: ddg_join_ads | uBlock: 3 registros; 2 bloqueados/redirecionados

Firefox registrou 11 entradas deste domínio, por exemplo https://pub.doubleverify.com/dvtag/29028254/DV1298722/pub.js (HTTP 200, entrada 104). O monitor observou a conexão, mas não a rotulou como rastreador: doubleverify.com não está no catálogo demonstrativo de src/core.js. Blacklight a classifica por Tracker Radar; trata-se de diferença de classificação, não ausência de captura. uBlock produziu 2 linhas de bloqueio/redirecionamento, com regra concreta ||doubleverify.com^, aplicada a https://pub.doubleverify.com/dvtag/signals/bsc/pub.json (query preservada no HAR) (linha 6). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. Blacklight associou o domínio às categorias ddg_join_ads; cookies de terceiros e rastreadores publicitários são categorias distintas.

Evidências: monitor.har: log.entries[104], [121], [122], [136]; blacklight.har: log.entries[101], [118], [119], [127]; ublock.har: log.entries[96], [109], [110]; ublock-logger.txt: linhas 6, 7; blacklight-resultados.json: cards ddg_join_ads

## dscg.akamaiedge.net
0 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 69 registros; 0 bloqueados/redirecionados

Este domínio não consta no HAR da execução M; isso limita a afirmação a esta amostra. O logger uBlock tem 69 registros deste domínio, sem ação --/<< na amostra. A presença no monitor não implica que deva ser bloqueado; ver linhas 58, 60, 62. O domínio não consta no HAR Blacklight desta amostra. A diferença de tráfego está comprovada, mas a causa individual não pode ser afirmada apenas com ausência; condições e horários diferem, conforme os metadados das duas execuções. A linha 58 é um alias DNS resolvido pelo uBlock: https://e3891.dscg.akamaiedge.net/, com aliasURL=https://static.files.bbci.co.uk/bbcdotcom/web/20260922-091849-a8520cb5b4-web-3.22.0-3/favicon-16x16.png. O monitor observa o URL original e não resolve CNAME; essa é uma diferença concreta de representação/cobertura, não necessariamente uma conexão adicional.

Evidências: ublock-logger.txt: linhas 58, 60, 62, 69, 71

## dv.tech
3 pedidos; catálogo: sem classificação | Blacklight: 2 pedidos; categorias: nenhuma nos cartões | uBlock: 3 registros; 3 bloqueados/redirecionados

Firefox registrou 1 entradas deste domínio, por exemplo https://vtrk.dv.tech/ (query preservada no HAR) (HTTP 204, entrada 141). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. uBlock produziu 3 linhas de bloqueio/redirecionamento, com regra concreta ||vtrk.dv.tech^, aplicada a https://vtrk.dv.tech/ (query preservada no HAR) (linha 2). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. Blacklight também contatou este domínio (2 entradas no seu HAR), mas não o incluiu nos domínios dos cartões de rastreadores/cookies/session replay. É diferença entre tráfego bruto e critérios dos cartões.

Evidências: monitor.har: log.entries[141]; blacklight.har: log.entries[135], [198]; ublock.har: log.entries[111]; ublock-logger.txt: linhas 2, 3, 5

## edigitalsurvey.com
1 pedidos; catálogo: sem classificação | Blacklight: 2 pedidos; categorias: nenhuma nos cartões | uBlock: 1 registros; 1 bloqueados/redirecionados

Firefox registrou 1 entradas deste domínio, por exemplo https://edigitalsurvey.com/l.php (query preservada no HAR) (HTTP 200, entrada 140). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. uBlock produziu 1 linhas de bloqueio/redirecionamento, com regra concreta ||edigitalsurvey.com^$3p, aplicada a https://edigitalsurvey.com/l.php (query preservada no HAR) (linha 9). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. Blacklight também contatou este domínio (2 entradas no seu HAR), mas não o incluiu nos domínios dos cartões de rastreadores/cookies/session replay. É diferença entre tráfego bruto e critérios dos cartões.

Evidências: monitor.har: log.entries[140]; blacklight.har: log.entries[150], [200]; ublock.har: log.entries[108]; ublock-logger.txt: linhas 9

## eu-1-id5-sync.com
2 pedidos; catálogo: sem classificação | Blacklight: 4 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 2 entradas deste domínio, por exemplo https://lbs.eu-1-id5-sync.com/lbs/v1 (HTTP 200, entrada 145). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight também contatou este domínio (4 entradas no seu HAR), mas não o incluiu nos domínios dos cartões de rastreadores/cookies/session replay. É diferença entre tráfego bruto e critérios dos cartões.

Evidências: monitor.har: log.entries[145], [146]; blacklight.har: log.entries[169], [170], [211], [212]

## google.com
1 pedidos; catálogo: sem classificação | Blacklight: 5 pedidos; categorias: ddg_join_ads | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 1 entradas deste domínio, por exemplo https://www.google.com/recaptcha/api2/aframe (HTTP 200, entrada 153). O monitor observou a conexão, mas não a rotulou como rastreador: google.com não está no catálogo demonstrativo de src/core.js. Blacklight a classifica por Tracker Radar; trata-se de diferença de classificação, não ausência de captura. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight associou o domínio às categorias ddg_join_ads; cookies de terceiros e rastreadores publicitários são categorias distintas.

Evidências: monitor.har: log.entries[153]; blacklight.har: log.entries[130], [131], [147], [157]; blacklight-resultados.json: cards ddg_join_ads

## googleadservices.com
0 pedidos; catálogo: sem classificação | Blacklight: 2 pedidos; categorias: ddg_join_ads | uBlock: 0 registros; 0 bloqueados/redirecionados

Este domínio não consta no HAR da execução M; isso limita a afirmação a esta amostra. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight associou o domínio às categorias ddg_join_ads; cookies de terceiros e rastreadores publicitários são categorias distintas. A ocorrência exclusiva do Blacklight está concretamente registrada em blacklight.har[140]: https://www.googleadservices.com/pagead/conversion/417091839/ (query preservada no HAR) HTTP 200. Não foi reproduzida no Firefox; não há base para atribuí-la a uma falha do catálogo, pois nem o HAR local contém o pedido. O iniciador registrado pelo Blacklight foi https://www.googletagmanager.com/gtag/js (query preservada no HAR) (entrada 140, campo _initiator). Isso identifica a cadeia executada nessa condição, sem presumir a mesma execução no Firefox.

Evidências: blacklight.har: log.entries[140], [142]; blacklight-resultados.json: cards ddg_join_ads

## googlesyndication.com
11 pedidos; catálogo: Google Ads | Blacklight: 14 pedidos; categorias: ddg_join_ads | uBlock: 4 registros; 4 bloqueados/redirecionados

Firefox registrou 11 entradas deste domínio, por exemplo https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js (HTTP 200, entrada 100). O catálogo do monitor identifica Google Ads nos hosts pagead2.googlesyndication.com, 3d5dfdb31b64a13720c4b19502a7cb57.safeframe.googlesyndication.com, tpc.googlesyndication.com. uBlock produziu 4 linhas de bloqueio/redirecionamento, com regra concreta googlesyndication_adsbygoogle.js:5, aplicada a https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js (linha 33). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. Blacklight associou o domínio às categorias ddg_join_ads; cookies de terceiros e rastreadores publicitários são categorias distintas.

Evidências: monitor.har: log.entries[100], [142], [148], [154]; blacklight.har: log.entries[111], [146], [158], [164]; ublock-logger.txt: linhas 33, 34, 35, 36; blacklight-resultados.json: cards ddg_join_ads

## googletagmanager.com
0 pedidos; catálogo: sem classificação | Blacklight: 1 pedidos; categorias: ddg_join_ads | uBlock: 0 registros; 0 bloqueados/redirecionados

Este domínio não consta no HAR da execução M; isso limita a afirmação a esta amostra. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight associou o domínio às categorias ddg_join_ads; cookies de terceiros e rastreadores publicitários são categorias distintas. A ocorrência exclusiva do Blacklight está concretamente registrada em blacklight.har[115]: https://www.googletagmanager.com/gtag/js (query preservada no HAR) HTTP 200. Não foi reproduzida no Firefox; não há base para atribuí-la a uma falha do catálogo, pois nem o HAR local contém o pedido. O iniciador registrado pelo Blacklight foi https://static.files.bbci.co.uk/bbcdotcom/web/20260922-091849-a8520cb5b4-web-3.22.0-3/_next/static/chunks/0gkzda.jd-xsx.js (entrada 115, campo _initiator). Isso identifica a cadeia executada nessa condição, sem presumir a mesma execução no Firefox.

Evidências: blacklight.har: log.entries[115]; blacklight-resultados.json: cards ddg_join_ads

## id5-sync.com
12 pedidos; catálogo: sem classificação | Blacklight: 10 pedidos; categorias: ddg_join_ads, cookies | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 12 entradas deste domínio, por exemplo https://cdn.id5-sync.com/api/1.0/id5-api.js (HTTP 200, entrada 126). O monitor observou a conexão, mas não a rotulou como rastreador: id5-sync.com não está no catálogo demonstrativo de src/core.js. Blacklight a classifica por Tracker Radar; trata-se de diferença de classificação, não ausência de captura. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight associou o domínio às categorias ddg_join_ads, cookies; cookies de terceiros e rastreadores publicitários são categorias distintas.

Evidências: monitor.har: log.entries[126], [139], [144], [159]; blacklight.har: log.entries[154], [161], [168], [210]; blacklight-resultados.json: cards ddg_join_ads, cookies

## imrworldwide.com
0 pedidos; catálogo: sem classificação | Blacklight: 3 pedidos; categorias: ddg_join_ads, cookies | uBlock: 0 registros; 0 bloqueados/redirecionados

Este domínio não consta no HAR da execução M; isso limita a afirmação a esta amostra. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight associou o domínio às categorias ddg_join_ads, cookies; cookies de terceiros e rastreadores publicitários são categorias distintas. A ocorrência exclusiva do Blacklight está concretamente registrada em blacklight.har[138]: https://secure-us.imrworldwide.com/cgi-bin/m (query preservada no HAR) HTTP 302. Não foi reproduzida no Firefox; não há base para atribuí-la a uma falha do catálogo, pois nem o HAR local contém o pedido. O iniciador registrado pelo Blacklight foi https://scripts.webcontentassessor.com/scripts/64ca3dfd44dd68a629e2e51a27e7ccd960974b5961e4ca2897139d14bf10be8b (entrada 138, campo _initiator). Isso identifica a cadeia executada nessa condição, sem presumir a mesma execução no Firefox.

Evidências: blacklight.har: log.entries[138], [148], [195]; blacklight-resultados.json: cards ddg_join_ads, cookies

## insightexpressai.com
0 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: ddg_join_ads, cookies | uBlock: 0 registros; 0 bloqueados/redirecionados

Este domínio não consta no HAR da execução M; isso limita a afirmação a esta amostra. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight associou o domínio às categorias ddg_join_ads, cookies; cookies de terceiros e rastreadores publicitários são categorias distintas. O cartão Blacklight inclui este domínio, porém o HAR do próprio Blacklight não contém pedido correspondente. Há uma diferença de cobertura entre os artefatos da mesma ferramenta; o cartão comprova a classificação, mas este HAR não permite afirmar status, conclusão ou causa da ausência local.

Evidências: blacklight-resultados.json: cards ddg_join_ads, cookies

## intentiq.com
3 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 3 entradas deste domínio, por exemplo https://sync.intentiq.com/profiles_engine/ProfilesEngineServlet (query preservada no HAR) (HTTP 302, entrada 274). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. O domínio não consta no HAR Blacklight desta amostra. A diferença de tráfego está comprovada, mas a causa individual não pode ser afirmada apenas com ausência; condições e horários diferem, conforme os metadados das duas execuções.

Evidências: monitor.har: log.entries[274], [275], [279]

## ipredictive.com
1 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 1 entradas deste domínio, por exemplo https://sync.ipredictive.com/d/sync/cookie/generic (query preservada no HAR) (HTTP 302, entrada 243). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. O domínio não consta no HAR Blacklight desta amostra. A diferença de tráfego está comprovada, mas a causa individual não pode ser afirmada apenas com ausência; condições e horários diferem, conforme os metadados das duas execuções.

Evidências: monitor.har: log.entries[243]

## kargo.com
1 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 1 entradas deste domínio, por exemplo https://crb.kargo.com/api/v1/dsync/PrebidServer (query preservada no HAR) (HTTP 302, entrada 341). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. O domínio não consta no HAR Blacklight desta amostra. A diferença de tráfego está comprovada, mas a causa individual não pode ser afirmada apenas com ausência; condições e horários diferem, conforme os metadados das duas execuções.

Evidências: monitor.har: log.entries[341]

## lijit.com
2 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 2 entradas deste domínio, por exemplo https://ce.lijit.com/merge (query preservada no HAR) (HTTP 302, entrada 250). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. O domínio não consta no HAR Blacklight desta amostra. A diferença de tráfego está comprovada, mas a causa individual não pode ser afirmada apenas com ausência; condições e horários diferem, conforme os metadados das duas execuções.

Evidências: monitor.har: log.entries[250], [270]

## linkedin.com
1 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 1 entradas deste domínio, por exemplo https://px.ads.linkedin.com/setuid (query preservada no HAR) (HTTP 200, entrada 253). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. O domínio não consta no HAR Blacklight desta amostra. A diferença de tráfego está comprovada, mas a causa individual não pode ser afirmada apenas com ausência; condições e horários diferem, conforme os metadados das duas execuções.

Evidências: monitor.har: log.entries[253]

## live-federated-id-alb-1756651342.eu-west-1.elb.amazonaws.com
0 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 2 registros; 0 bloqueados/redirecionados

Este domínio não consta no HAR da execução M; isso limita a afirmação a esta amostra. O logger uBlock tem 2 registros deste domínio, sem ação --/<< na amostra. A presença no monitor não implica que deva ser bloqueado; ver linhas 37, 41. O domínio não consta no HAR Blacklight desta amostra. A diferença de tráfego está comprovada, mas a causa individual não pode ser afirmada apenas com ausência; condições e horários diferem, conforme os metadados das duas execuções. A linha 37 é um alias DNS resolvido pelo uBlock: https://live-federated-id-alb-1756651342.eu-west-1.elb.amazonaws.com/, com aliasURL=https://federated-id.live.api.bbc.co.uk/v2/encryptforallthirdparties. O monitor observa o URL original e não resolve CNAME; essa é uma diferença concreta de representação/cobertura, não necessariamente uma conexão adicional.

Evidências: ublock-logger.txt: linhas 37, 41

## merequartz.com
0 pedidos; catálogo: sem classificação | Blacklight: 2 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Este domínio não consta no HAR da execução M; isso limita a afirmação a esta amostra. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight também contatou este domínio (2 entradas no seu HAR), mas não o incluiu nos domínios dos cartões de rastreadores/cookies/session replay. É diferença entre tráfego bruto e critérios dos cartões. A ocorrência exclusiva do Blacklight está concretamente registrada em blacklight.har[159]: https://merequartz.com/aadetect/px.gif (query preservada no HAR) HTTP 200. Não foi reproduzida no Firefox; não há base para atribuí-la a uma falha do catálogo, pois nem o HAR local contém o pedido.

Evidências: blacklight.har: log.entries[159], [167]

## mparticle.com
0 pedidos; catálogo: sem classificação | Blacklight: 3 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Este domínio não consta no HAR da execução M; isso limita a afirmação a esta amostra. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight também contatou este domínio (3 entradas no seu HAR), mas não o incluiu nos domínios dos cartões de rastreadores/cookies/session replay. É diferença entre tráfego bruto e critérios dos cartões. A ocorrência exclusiva do Blacklight está concretamente registrada em blacklight.har[93]: https://jssdkcdns.mparticle.com/JS/v2/eu1-ef76cdfb8673b34095fff2156cdfa7d8/config (query preservada no HAR) HTTP 200. Não foi reproduzida no Firefox; não há base para atribuí-la a uma falha do catálogo, pois nem o HAR local contém o pedido. O iniciador registrado pelo Blacklight foi https://static.files.bbci.co.uk/bbcdotcom/web/20260922-091849-a8520cb5b4-web-3.22.0-3/_next/static/chunks/0n-kjrsnwe2tb.js (entrada 93, campo _initiator). Isso identifica a cadeia executada nessa condição, sem presumir a mesma execução no Firefox.

Evidências: blacklight.har: log.entries[93], [116], [141]

## onaudience.com
1 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 1 entradas deste domínio, por exemplo https://pixel.onaudience.com/ (query preservada no HAR) (HTTP 302, entrada 314). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. O domínio não consta no HAR Blacklight desta amostra. A diferença de tráfego está comprovada, mas a causa individual não pode ser afirmada apenas com ausência; condições e horários diferem, conforme os metadados das duas execuções.

Evidências: monitor.har: log.entries[314]

## openx.net
3 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: ddg_join_ads | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 3 entradas deste domínio, por exemplo https://us-u.openx.net/w/1.0/cm (query preservada no HAR) (HTTP 302, entrada 199). O monitor observou a conexão, mas não a rotulou como rastreador: openx.net não está no catálogo demonstrativo de src/core.js. Blacklight a classifica por Tracker Radar; trata-se de diferença de classificação, não ausência de captura. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight associou o domínio às categorias ddg_join_ads; cookies de terceiros e rastreadores publicitários são categorias distintas. O cartão Blacklight inclui este domínio, porém o HAR do próprio Blacklight não contém pedido correspondente. Há uma diferença de cobertura entre os artefatos da mesma ferramenta; o cartão comprova a classificação, mas este HAR não permite afirmar status, conclusão ou causa da ausência local.

Evidências: monitor.har: log.entries[199], [210], [298]; blacklight-resultados.json: cards ddg_join_ads

## optimizely.com
4 pedidos; catálogo: sem classificação | Blacklight: 7 pedidos; categorias: cookies | uBlock: 2 registros; 1 bloqueados/redirecionados

Firefox registrou 4 entradas deste domínio, por exemplo https://cdn.optimizely.com/public/4621041136/s/bbcx_prod.js (HTTP 200, entrada 48). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. uBlock produziu 1 linhas de bloqueio/redirecionamento, com regra concreta ||optimizely.com/public/, aplicada a https://cdn.optimizely.com/public/4621041136/s/bbcx_prod.js (linha 211). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. Blacklight associou o domínio às categorias cookies; cookies de terceiros e rastreadores publicitários são categorias distintas.

Evidências: monitor.har: log.entries[48], [69], [74], [94]; blacklight.har: log.entries[2], [71], [79], [83]; ublock.har: log.entries[48], [75]; ublock-logger.txt: linhas 211; blacklight-resultados.json: cards cookies

## permutive.com
14 pedidos; catálogo: sem classificação | Blacklight: 7 pedidos; categorias: nenhuma nos cartões | uBlock: 1 registros; 1 bloqueados/redirecionados

Firefox registrou 14 entradas deste domínio, por exemplo https://cdn.permutive.com/e488cdb0-e7cb-4d91-9648-60d437d8e491-web.js (HTTP 200, entrada 103). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. uBlock produziu 1 linhas de bloqueio/redirecionamento, com regra concreta ||permutive.com^$3p, aplicada a https://cdn.permutive.com/e488cdb0-e7cb-4d91-9648-60d437d8e491-web.js (linha 26). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. Blacklight também contatou este domínio (7 entradas no seu HAR), mas não o incluiu nos domínios dos cartões de rastreadores/cookies/session replay. É diferença entre tráfego bruto e critérios dos cartões.

Evidências: monitor.har: log.entries[103], [124], [127], [128]; blacklight.har: log.entries[100], [120], [156], [187]; ublock.har: log.entries[95]; ublock-logger.txt: linhas 26

## piano.io
2 pedidos; catálogo: sem classificação | Blacklight: 3 pedidos; categorias: cookies | uBlock: 2 registros; 0 bloqueados/redirecionados

Firefox registrou 2 entradas deste domínio, por exemplo https://c2-eu.piano.io/xbuilder/experience/execute (query preservada no HAR) (HTTP 200, entrada 93). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O logger uBlock tem 2 registros deste domínio, sem ação --/<< na amostra. A presença no monitor não implica que deva ser bloqueado; ver linhas 4, 19. Blacklight associou o domínio às categorias cookies; cookies de terceiros e rastreadores publicitários são categorias distintas.

Evidências: monitor.har: log.entries[93], [149]; blacklight.har: log.entries[95], [149], [186]; ublock.har: log.entries[100], [112]; ublock-logger.txt: linhas 4, 19; blacklight-resultados.json: cards cookies

## primis.tech
1 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 1 entradas deste domínio, por exemplo https://live.primis.tech/live/liveCS.php (query preservada no HAR) (HTTP 301, entrada 264). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. O domínio não consta no HAR Blacklight desta amostra. A diferença de tráfego está comprovada, mas a causa individual não pode ser afirmada apenas com ausência; condições e horários diferem, conforme os metadados das duas execuções.

Evidências: monitor.har: log.entries[264]

## privacy-mgmt.com
8 pedidos; catálogo: sem classificação | Blacklight: 10 pedidos; categorias: nenhuma nos cartões | uBlock: 8 registros; 1 bloqueados/redirecionados

Firefox registrou 8 entradas deste domínio, por exemplo https://cdn.privacy-mgmt.com/unified/wrapperMessagingWithoutDetection.js (HTTP 200, entrada 72). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. uBlock produziu 1 linhas de bloqueio/redirecionamento, com regra concreta /v2/pv-data?, aplicada a https://cdn.privacy-mgmt.com/wrapper/v2/pv-data (query preservada no HAR) (linha 43). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. Blacklight também contatou este domínio (10 entradas no seu HAR), mas não o incluiu nos domínios dos cartões de rastreadores/cookies/session replay. É diferença entre tráfego bruto e critérios dos cartões.

Evidências: monitor.har: log.entries[72], [76], [77], [78]; blacklight.har: log.entries[80], [84], [85], [86]; ublock.har: log.entries[71], [76], [77], [78]; ublock-logger.txt: linhas 43

## prmutv.co
1 pedidos; catálogo: sem classificação | Blacklight: 1 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 1 entradas deste domínio, por exemplo https://e488cdb0-e7cb-4d91-9648-60d437d8e491.prmutv.co/v2.0/pxid (query preservada no HAR) (HTTP 200, entrada 123). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight também contatou este domínio (1 entradas no seu HAR), mas não o incluiu nos domínios dos cartões de rastreadores/cookies/session replay. É diferença entre tráfego bruto e critérios dos cartões.

Evidências: monitor.har: log.entries[123]; blacklight.har: log.entries[143]

## pubmatic.com
17 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: ddg_join_ads | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 17 entradas deste domínio, por exemplo https://image8.pubmatic.com/AdServer/ImgSync (query preservada no HAR) (HTTP 302, entrada 202). O monitor observou a conexão, mas não a rotulou como rastreador: pubmatic.com não está no catálogo demonstrativo de src/core.js. Blacklight a classifica por Tracker Radar; trata-se de diferença de classificação, não ausência de captura. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight associou o domínio às categorias ddg_join_ads; cookies de terceiros e rastreadores publicitários são categorias distintas. O cartão Blacklight inclui este domínio, porém o HAR do próprio Blacklight não contém pedido correspondente. Há uma diferença de cobertura entre os artefatos da mesma ferramenta; o cartão comprova a classificação, mas este HAR não permite afirmar status, conclusão ou causa da ausência local.

Evidências: monitor.har: log.entries[202], [217], [228], [266]; blacklight-resultados.json: cards ddg_join_ads

## qvdt3feo.com
2 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 2 entradas deste domínio, por exemplo https://qvdt3feo.com/sync (query preservada no HAR) (HTTP 302, entrada 291). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. O domínio não consta no HAR Blacklight desta amostra. A diferença de tráfego está comprovada, mas a causa individual não pode ser afirmada apenas com ausência; condições e horários diferem, conforme os metadados das duas execuções.

Evidências: monitor.har: log.entries[291], [322]

## rlcdn.com
3 pedidos; catálogo: sem classificação | Blacklight: 1 pedidos; categorias: ddg_join_ads | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 3 entradas deste domínio, por exemplo https://check.analytics.rlcdn.com/check/14523 (HTTP 200, entrada 177). O monitor observou a conexão, mas não a rotulou como rastreador: rlcdn.com não está no catálogo demonstrativo de src/core.js. Blacklight a classifica por Tracker Radar; trata-se de diferença de classificação, não ausência de captura. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight associou o domínio às categorias ddg_join_ads; cookies de terceiros e rastreadores publicitários são categorias distintas.

Evidências: monitor.har: log.entries[177], [237], [313]; blacklight.har: log.entries[242]; blacklight-resultados.json: cards ddg_join_ads

## rubiconproject.com
23 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: ddg_join_ads | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 23 entradas deste domínio, por exemplo https://secure-assets.rubiconproject.com/utils/xapi/multi-sync.html (query preservada no HAR) (HTTP 301, entrada 198). O monitor observou a conexão, mas não a rotulou como rastreador: rubiconproject.com não está no catálogo demonstrativo de src/core.js. Blacklight a classifica por Tracker Radar; trata-se de diferença de classificação, não ausência de captura. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight associou o domínio às categorias ddg_join_ads; cookies de terceiros e rastreadores publicitários são categorias distintas. O cartão Blacklight inclui este domínio, porém o HAR do próprio Blacklight não contém pedido correspondente. Há uma diferença de cobertura entre os artefatos da mesma ferramenta; o cartão comprova a classificação, mas este HAR não permite afirmar status, conclusão ou causa da ausência local.

Evidências: monitor.har: log.entries[198], [201], [208], [218]; blacklight-resultados.json: cards ddg_join_ads

## scorecardresearch.com
2 pedidos; catálogo: Comscore | Blacklight: 4 pedidos; categorias: cookies | uBlock: 1 registros; 1 bloqueados/redirecionados

Firefox registrou 2 entradas deste domínio, por exemplo https://sb.scorecardresearch.com/internal-cs/default/beacon.js (HTTP 200, entrada 111). O catálogo do monitor identifica Comscore nos hosts sb.scorecardresearch.com. uBlock produziu 1 linhas de bloqueio/redirecionamento, com regra concreta ||scorecardresearch.com^, aplicada a https://sb.scorecardresearch.com/internal-cs/default/beacon.js (linha 13). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. Blacklight associou o domínio às categorias cookies; cookies de terceiros e rastreadores publicitários são categorias distintas.

Evidências: monitor.har: log.entries[111], [117]; blacklight.har: log.entries[139], [151], [153], [201]; ublock.har: log.entries[106]; ublock-logger.txt: linhas 13; blacklight-resultados.json: cards cookies

## secretivesponge.com
0 pedidos; catálogo: sem classificação | Blacklight: 3 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Este domínio não consta no HAR da execução M; isso limita a afirmação a esta amostra. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight também contatou este domínio (3 entradas no seu HAR), mas não o incluiu nos domínios dos cartões de rastreadores/cookies/session replay. É diferença entre tráfego bruto e critérios dos cartões. A ocorrência exclusiva do Blacklight está concretamente registrada em blacklight.har[136]: https://secretivesponge.com/dist/qiwf1_xzb1hv6.module.js, HTTP 200. Não foi reproduzida no Firefox; não há base para atribuí-la a uma falha do catálogo, pois nem o HAR local contém o pedido. O iniciador registrado pelo Blacklight foi  (entrada 136, campo _initiator). Isso identifica a cadeia executada nessa condição, sem presumir a mesma execução no Firefox.

Evidências: blacklight.har: log.entries[136], [232], [236]

## semasio.net
2 pedidos; catálogo: sem classificação | Blacklight: 2 pedidos; categorias: ddg_join_ads, cookies | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 2 entradas deste domínio, por exemplo https://uipglob.semasio.net/id5/1/get (query preservada no HAR) (HTTP 302, entrada 226). O monitor observou a conexão, mas não a rotulou como rastreador: semasio.net não está no catálogo demonstrativo de src/core.js. Blacklight a classifica por Tracker Radar; trata-se de diferença de classificação, não ausência de captura. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight associou o domínio às categorias ddg_join_ads, cookies; cookies de terceiros e rastreadores publicitários são categorias distintas.

Evidências: monitor.har: log.entries[226], [246]; blacklight.har: log.entries[241], [245]; blacklight-resultados.json: cards ddg_join_ads, cookies

## simpli.fi
1 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 1 entradas deste domínio, por exemplo https://um.simpli.fi/pubmatic (query preservada no HAR) (HTTP 302, entrada 304). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. O domínio não consta no HAR Blacklight desta amostra. A diferença de tráfego está comprovada, mas a causa individual não pode ser afirmada apenas com ausência; condições e horários diferem, conforme os metadados das duas execuções.

Evidências: monitor.har: log.entries[304]

## sitescout.com
2 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 2 entradas deste domínio, por exemplo https://pixel-sync.sitescout.com/dmp/pixelSync (query preservada no HAR) (HTTP 302, entrada 205). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. O domínio não consta no HAR Blacklight desta amostra. A diferença de tráfego está comprovada, mas a causa individual não pode ser afirmada apenas com ausência; condições e horários diferem, conforme os metadados das duas execuções.

Evidências: monitor.har: log.entries[205], [212]

## speedcurve.com
1 pedidos; catálogo: sem classificação | Blacklight: 1 pedidos; categorias: nenhuma nos cartões | uBlock: 1 registros; 1 bloqueados/redirecionados

Firefox registrou 1 entradas deste domínio, por exemplo https://cdn.speedcurve.com/js/lux.js (query preservada no HAR) (HTTP 200, entrada 112). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. uBlock produziu 1 linhas de bloqueio/redirecionamento, com regra concreta ||speedcurve.com^$3p, aplicada a https://cdn.speedcurve.com/js/lux.js (query preservada no HAR) (linha 16). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. Blacklight também contatou este domínio (1 entradas no seu HAR), mas não o incluiu nos domínios dos cartões de rastreadores/cookies/session replay. É diferença entre tráfego bruto e critérios dos cartões.

Evidências: monitor.har: log.entries[112]; blacklight.har: log.entries[240]; ublock.har: log.entries[104]; ublock-logger.txt: linhas 16

## sportradarserving.com
2 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 2 entradas deste domínio, por exemplo https://a.sportradarserving.com/sync (query preservada no HAR) (HTTP 302, entrada 336). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. O domínio não consta no HAR Blacklight desta amostra. A diferença de tráfego está comprovada, mas a causa individual não pode ser afirmada apenas com ausência; condições e horários diferem, conforme os metadados das duas execuções.

Evidências: monitor.har: log.entries[336], [338]

## springserve.com
1 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 1 entradas deste domínio, por exemplo https://sync.springserve.com/usersync (query preservada no HAR) (HTTP 200, entrada 259). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. O domínio não consta no HAR Blacklight desta amostra. A diferença de tráfego está comprovada, mas a causa individual não pode ser afirmada apenas com ausência; condições e horários diferem, conforme os metadados das duas execuções.

Evidências: monitor.har: log.entries[259]

## stackadapt.com
2 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 2 entradas deste domínio, por exemplo https://sync.srv.stackadapt.com/sync (query preservada no HAR) (HTTP 302, entrada 290). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. O domínio não consta no HAR Blacklight desta amostra. A diferença de tráfego está comprovada, mas a causa individual não pode ser afirmada apenas com ausência; condições e horários diferem, conforme os metadados das duas execuções.

Evidências: monitor.har: log.entries[290], [310]

## tapad.com
3 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: ddg_join_ads | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 3 entradas deste domínio, por exemplo https://pixel.tapad.com/idsync/ex/push (query preservada no HAR) (HTTP 302, entrada 192). O monitor observou a conexão, mas não a rotulou como rastreador: tapad.com não está no catálogo demonstrativo de src/core.js. Blacklight a classifica por Tracker Radar; trata-se de diferença de classificação, não ausência de captura. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight associou o domínio às categorias ddg_join_ads; cookies de terceiros e rastreadores publicitários são categorias distintas. O cartão Blacklight inclui este domínio, porém o HAR do próprio Blacklight não contém pedido correspondente. Há uma diferença de cobertura entre os artefatos da mesma ferramenta; o cartão comprova a classificação, mas este HAR não permite afirmar status, conclusão ou causa da ausência local.

Evidências: monitor.har: log.entries[192], [194], [221]; blacklight-resultados.json: cards ddg_join_ads

## the-ozone-project.com
20 pedidos; catálogo: sem classificação | Blacklight: 9 pedidos; categorias: cookies | uBlock: 1 registros; 1 bloqueados/redirecionados

Firefox registrou 19 entradas deste domínio, por exemplo https://prebid.the-ozone-project.com/hw2/OZONEBBC4784/1500000107/current/ozpb.min.js (HTTP 200, entrada 102). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. uBlock produziu 1 linhas de bloqueio/redirecionamento, com regra concreta ||the-ozone-project.com^, aplicada a https://prebid.the-ozone-project.com/hw2/OZONEBBC4784/1500000107/current/ozpb.min.js (linha 27). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. Blacklight associou o domínio às categorias cookies; cookies de terceiros e rastreadores publicitários são categorias distintas.

Evidências: monitor.har: log.entries[102], [118], [119], [120]; blacklight.har: log.entries[99], [112], [113], [114]; ublock.har: log.entries[94]; ublock-logger.txt: linhas 27; blacklight-resultados.json: cards cookies

## tinypass.com
1 pedidos; catálogo: sem classificação | Blacklight: 1 pedidos; categorias: cookies | uBlock: 2 registros; 0 bloqueados/redirecionados

Firefox registrou 1 entradas deste domínio, por exemplo https://cdn.tinypass.com/api/tinypass.min.js (HTTP 200, entrada 2). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O logger uBlock tem 2 registros deste domínio, sem ação --/<< na amostra. A presença no monitor não implica que deva ser bloqueado; ver linhas 193, 210. Blacklight associou o domínio às categorias cookies; cookies de terceiros e rastreadores publicitários são categorias distintas.

Evidências: monitor.har: log.entries[2]; blacklight.har: log.entries[3]; ublock.har: log.entries[1]; ublock-logger.txt: linhas 193, 210; blacklight-resultados.json: cards cookies

## undertone.com
10 pedidos; catálogo: sem classificação | Blacklight: 1 pedidos; categorias: ddg_join_ads | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 10 entradas deste domínio, por exemplo https://cdn.undertone.com/js/usersync.html (query preservada no HAR) (HTTP 200, entrada 193). O monitor observou a conexão, mas não a rotulou como rastreador: undertone.com não está no catálogo demonstrativo de src/core.js. Blacklight a classifica por Tracker Radar; trata-se de diferença de classificação, não ausência de captura. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight associou o domínio às categorias ddg_join_ads; cookies de terceiros e rastreadores publicitários são categorias distintas.

Evidências: monitor.har: log.entries[193], [206], [214], [215]; blacklight.har: log.entries[258]; blacklight-resultados.json: cards ddg_join_ads

## webcontentassessor.com
2 pedidos; catálogo: sem classificação | Blacklight: 2 pedidos; categorias: nenhuma nos cartões | uBlock: 1 registros; 1 bloqueados/redirecionados

Firefox registrou 2 entradas deste domínio, por exemplo https://scripts.webcontentassessor.com/scripts/64ca3dfd44dd68a629e2e51a27e7ccd960974b5961e4ca2897139d14bf10be8b (HTTP 200, entrada 101). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. uBlock produziu 1 linhas de bloqueio/redirecionamento, com regra concreta ||webcontentassessor.com^, aplicada a https://scripts.webcontentassessor.com/scripts/64ca3dfd44dd68a629e2e51a27e7ccd960974b5961e4ca2897139d14bf10be8b (linha 31). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. Blacklight também contatou este domínio (2 entradas no seu HAR), mas não o incluiu nos domínios dos cartões de rastreadores/cookies/session replay. É diferença entre tráfego bruto e critérios dos cartões.

Evidências: monitor.har: log.entries[101], [155]; blacklight.har: log.entries[97], [213]; ublock.har: log.entries[93]; ublock-logger.txt: linhas 31

## yahoo.com
6 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: ddg_join_ads | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 6 entradas deste domínio, por exemplo https://ups.analytics.yahoo.com/ups/58545/occ (HTTP 302, entrada 204). O monitor observou a conexão, mas não a rotulou como rastreador: yahoo.com não está no catálogo demonstrativo de src/core.js. Blacklight a classifica por Tracker Radar; trata-se de diferença de classificação, não ausência de captura. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight associou o domínio às categorias ddg_join_ads; cookies de terceiros e rastreadores publicitários são categorias distintas. O cartão Blacklight inclui este domínio, porém o HAR do próprio Blacklight não contém pedido correspondente. Há uma diferença de cobertura entre os artefatos da mesma ferramenta; o cartão comprova a classificação, mas este HAR não permite afirmar status, conclusão ou causa da ausência local.

Evidências: monitor.har: log.entries[204], [211], [255], [306]; blacklight-resultados.json: cards ddg_join_ads
