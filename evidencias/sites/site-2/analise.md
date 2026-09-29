# Comparação — Magazine Luiza

Fontes: HARs reais das três condições, relatório do monitor, logger uBlock e resultado oficial Blacklight. Nenhuma ausência é tomada automaticamente como bloqueio ou falso negativo.

## a.akamaiedge.net
0 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 33 registros; 0 bloqueados/redirecionados

Este domínio não consta no HAR da execução M; isso limita a afirmação a esta amostra. O logger uBlock tem 33 registros deste domínio, sem ação --/<< na amostra. A presença no monitor não implica que deva ser bloqueado; ver linhas 2, 4, 7. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox. A linha 2 é um alias DNS resolvido pelo uBlock: https://e326558.a.akamaiedge.net/, com aliasURL=https://federation.magazineluiza.com.br/graphql (query preservada no HAR) O monitor observa o URL original e não resolve CNAME; essa é uma diferença concreta de representação/cobertura, não necessariamente uma conexão adicional.

Evidências: ublock-logger.txt: linhas 2, 4, 7, 12, 35

## adnxs.com
2 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 2 entradas deste domínio, por exemplo https://ib.adnxs.com/setuid (query preservada no HAR) (HTTP 307, entrada 232). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox.

Evidências: monitor.har: log.entries[232], [239]

## ads-twitter.com
1 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 2 registros; 2 bloqueados/redirecionados

Firefox registrou 1 entradas deste domínio, por exemplo https://static.ads-twitter.com/uwt.js (HTTP 200, entrada 49). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. uBlock produziu 2 linhas de bloqueio/redirecionamento, com regra concreta ||ads-twitter.com^, aplicada a https://static.ads-twitter.com/uwt.js (linha 276). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox.

Evidências: monitor.har: log.entries[49]; ublock.har: log.entries[34], [48]; ublock-logger.txt: linhas 276, 306

## aedf1f689f9b4287e.awsglobalaccelerator.com
0 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 4 registros; 0 bloqueados/redirecionados

Este domínio não consta no HAR da execução M; isso limita a afirmação a esta amostra. O logger uBlock tem 4 registros deste domínio, sem ação --/<< na amostra. A presença no monitor não implica que deva ser bloqueado; ver linhas 95, 103, 105. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox. A linha 95 é um alias DNS resolvido pelo uBlock: https://aedf1f689f9b4287e.awsglobalaccelerator.com/, com aliasURL=https://app.securiti.ai/privaci/v1/consent/cookie/singleupload. O monitor observa o URL original e não resolve CNAME; essa é uma diferença concreta de representação/cobertura, não necessariamente uma conexão adicional.

Evidências: ublock-logger.txt: linhas 95, 103, 105, 140

## azioncdn.net
0 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 22 registros; 0 bloqueados/redirecionados

Este domínio não consta no HAR da execução M; isso limita a afirmação a esta amostra. O logger uBlock tem 22 registros deste domínio, sem ação --/<< na amostra. A presença no monitor não implica que deva ser bloqueado; ver linhas 107, 113, 115. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox. A linha 107 é um alias DNS resolvido pelo uBlock: https://3394488p.ha.azioncdn.net/, com aliasURL=https://site-content.magazineluiza.com.br/static/img/default/favicon-cc4cf323.png. O monitor observa o URL original e não resolve CNAME; essa é uma diferença concreta de representação/cobertura, não necessariamente uma conexão adicional.

Evidências: ublock-logger.txt: linhas 107, 113, 115, 117, 119

## azionedge.net
0 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 17 registros; 0 bloqueados/redirecionados

Este domínio não consta no HAR da execução M; isso limita a afirmação a esta amostra. O logger uBlock tem 17 registros deste domínio, sem ação --/<< na amostra. A presença no monitor não implica que deva ser bloqueado; ver linhas 146, 148, 150. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox. A linha 146 é um alias DNS resolvido pelo uBlock: https://i7y6ykysln.map.azionedge.net/, com aliasURL=https://assets.mlcdn.com.br/banner/campanhas/hotlink-utilidades.png. O monitor observa o URL original e não resolve CNAME; essa é uma diferença concreta de representação/cobertura, não necessariamente uma conexão adicional.

Evidências: ublock-logger.txt: linhas 146, 148, 150, 152, 154

## bing.com
7 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 1 registros; 1 bloqueados/redirecionados

Firefox registrou 7 entradas deste domínio, por exemplo https://bat.bing.com/bat.js (HTTP 200, entrada 63). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. uBlock produziu 1 linhas de bloqueio/redirecionamento, com regra concreta ||bat.bing.com^, aplicada a https://bat.bing.com/bat.js (linha 271). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox.

Evidências: monitor.har: log.entries[63], [155], [168], [169]; ublock.har: log.entries[54]; ublock-logger.txt: linhas 271

## btg360.com.br
0 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 1 registros; 1 bloqueados/redirecionados

Este domínio não consta no HAR da execução M; isso limita a afirmação a esta amostra. uBlock produziu 1 linhas de bloqueio/redirecionamento, com regra concreta ||btg360.com.br^$3p, aplicada a https://c.btg360.com.br/__client.gif (query preservada no HAR) (linha 77). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox.

Evidências: ublock.har: log.entries[190]; ublock-logger.txt: linhas 77

## cloudflare.com
0 pedidos; catálogo: sem classificação | Blacklight: 3 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Este domínio não consta no HAR da execução M; isso limita a afirmação a esta amostra. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight também contatou este domínio (3 entradas no seu HAR), mas não o incluiu nos domínios dos cartões de rastreadores/cookies/session replay. É diferença entre tráfego bruto e critérios dos cartões. A ocorrência exclusiva do Blacklight está concretamente registrada em blacklight.har[11]: https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.css, HTTP 200. Não foi reproduzida no Firefox; não há base para atribuí-la a uma falha do catálogo, pois nem o HAR local contém o pedido. O iniciador registrado pelo Blacklight foi https://atendimento.magazineluiza.com.br/hc/pt-br/ (entrada 11, campo _initiator). Isso identifica a cadeia executada nessa condição, sem presumir a mesma execução no Firefox.

Evidências: blacklight.har: log.entries[11], [12], [20]

## cloudflarestream.com
0 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 6 registros; 0 bloqueados/redirecionados

Este domínio não consta no HAR da execução M; isso limita a afirmação a esta amostra. O logger uBlock tem 6 registros deste domínio, sem ação --/<< na amostra. A presença no monitor não implica que deva ser bloqueado; ver linhas 110, 125, 126. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox.

Evidências: ublock.har: log.entries[95], [105], [128], [129]; ublock-logger.txt: linhas 110, 125, 126, 158, 194

## creativecdn.com
6 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 1 registros; 1 bloqueados/redirecionados

Firefox registrou 6 entradas deste domínio, por exemplo https://tags.creativecdn.com/msWukR4UlwKQouZSY8IT.js (HTTP 200, entrada 175). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. uBlock produziu 1 linhas de bloqueio/redirecionamento, com regra concreta ||creativecdn.com^, aplicada a https://tags.creativecdn.com/msWukR4UlwKQouZSY8IT.js (linha 251). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox.

Evidências: monitor.har: log.entries[175], [205], [210], [224]; ublock.har: log.entries[65]; ublock-logger.txt: linhas 251

## criteo.net
0 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 1 registros; 1 bloqueados/redirecionados

Este domínio não consta no HAR da execução M; isso limita a afirmação a esta amostra. uBlock produziu 1 linhas de bloqueio/redirecionamento, com regra concreta ||criteo.net^, aplicada a https://client-side-metrics.us5.us.criteo.net/iex (query preservada no HAR) (linha 75). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox.

Evidências: ublock.har: log.entries[191]; ublock-logger.txt: linhas 75

## d31wfa8az5rt1f.cloudfront.net
0 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 6 registros; 0 bloqueados/redirecionados

Este domínio não consta no HAR da execução M; isso limita a afirmação a esta amostra. O logger uBlock tem 6 registros deste domínio, sem ação --/<< na amostra. A presença no monitor não implica que deva ser bloqueado; ver linhas 142, 217, 221. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox. A linha 142 é um alias DNS resolvido pelo uBlock: https://d31wfa8az5rt1f.cloudfront.net/, com aliasURL=https://cdn-prod.securiti.ai/consent/cookie_banner/7923f79c-dd89-44df-bbc4-cc5a1f904fbf/0b729802-6884-47fb-b13a-da5dc5874f35/en.json. O monitor observa o URL original e não resolve CNAME; essa é uma diferença concreta de representação/cobertura, não necessariamente uma conexão adicional.

Evidências: ublock-logger.txt: linhas 142, 217, 221, 254, 264

## datadoghq-browser-agent.com
1 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 1 registros; 1 bloqueados/redirecionados

Firefox registrou 1 entradas deste domínio, por exemplo https://www.datadoghq-browser-agent.com/us5/v7/datadog-rum.js (HTTP 200, entrada 18). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. uBlock produziu 1 linhas de bloqueio/redirecionamento, com regra concreta ||datadoghq-browser-agent.com^$3p, aplicada a https://www.datadoghq-browser-agent.com/us5/v7/datadog-rum.js (linha 339). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox.

Evidências: monitor.har: log.entries[18]; ublock.har: log.entries[18]; ublock-logger.txt: linhas 339

## doubleclick.net
11 pedidos; catálogo: Google Ads | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 3 registros; 3 bloqueados/redirecionados

Firefox registrou 11 entradas deste domínio, por exemplo https://ad.doubleclick.net/ccm/s/collect (query preservada no HAR) (HTTP 204, entrada 51). O catálogo do monitor identifica Google Ads nos hosts ad.doubleclick.net, stats.g.doubleclick.net, googleads.g.doubleclick.net, 6590300.fls.doubleclick.net. uBlock produziu 3 linhas de bloqueio/redirecionamento, com regra concreta noop.txt, aplicada a https://ad.doubleclick.net/ccm/s/collect (query preservada no HAR) (linha 302). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox.

Evidências: monitor.har: log.entries[51], [71], [77], [86]; ublock-logger.txt: linhas 302, 303, 304

## dsca.akamaiedge.net
0 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 27 registros; 0 bloqueados/redirecionados

Este domínio não consta no HAR da execução M; isso limita a afirmação a esta amostra. O logger uBlock tem 27 registros deste domínio, sem ação --/<< na amostra. A presença no monitor não implica que deva ser bloqueado; ver linhas 223, 225, 244. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox. A linha 223 é um alias DNS resolvido pelo uBlock: https://e326558.dsca.akamaiedge.net/, com aliasURL=https://m.magazineluiza.com.br/mixer-web/static/v1.208.2/_next/static/chunks/6033.718869598469d016.js. O monitor observa o URL original e não resolve CNAME; essa é uma diferença concreta de representação/cobertura, não necessariamente uma conexão adicional.

Evidências: ublock-logger.txt: linhas 223, 225, 244, 283, 285

## facebook.com
1 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 1 entradas deste domínio, por exemplo https://www.facebook.com/tr/ (HTTP 200, entrada 167). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox.

Evidências: monitor.har: log.entries[167]

## facebook.net
2 pedidos; catálogo: Meta SDK | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 1 registros; 1 bloqueados/redirecionados

Firefox registrou 2 entradas deste domínio, por exemplo https://connect.facebook.net/en_US/fbevents.js (HTTP 200, entrada 56). O catálogo do monitor identifica Meta SDK nos hosts connect.facebook.net. uBlock produziu 1 linhas de bloqueio/redirecionamento, com regra concreta /fbevents.js, aplicada a https://connect.facebook.net/en_US/fbevents.js (linha 278). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox.

Evidências: monitor.har: log.entries[56], [151]; ublock.har: log.entries[53]; ublock-logger.txt: linhas 278

## go-mpulse.net
2 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 2 registros; 2 bloqueados/redirecionados

Firefox registrou 2 entradas deste domínio, por exemplo https://s.go-mpulse.net/boomerang/7NWWZ-QTX5S-W4TRK-CT6RN-DNXLL (HTTP 200, entrada 19). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. uBlock produziu 2 linhas de bloqueio/redirecionamento, com regra concreta ||go-mpulse.net^, aplicada a https://s.go-mpulse.net/boomerang/7NWWZ-QTX5S-W4TRK-CT6RN-DNXLL (linha 334). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox.

Evidências: monitor.har: log.entries[19], [67]; ublock.har: log.entries[19], [21]; ublock-logger.txt: linhas 334, 337

## google-analytics.com
0 pedidos; catálogo: sem classificação | Blacklight: 2 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Este domínio não consta no HAR da execução M; isso limita a afirmação a esta amostra. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight também contatou este domínio (2 entradas no seu HAR), mas não o incluiu nos domínios dos cartões de rastreadores/cookies/session replay. É diferença entre tráfego bruto e critérios dos cartões. A ocorrência exclusiva do Blacklight está concretamente registrada em blacklight.har[46]: https://www.google-analytics.com/g/collect (query preservada no HAR) HTTP 204. Não foi reproduzida no Firefox; não há base para atribuí-la a uma falha do catálogo, pois nem o HAR local contém o pedido. O iniciador registrado pelo Blacklight foi https://www.googletagmanager.com/gtag/js (query preservada no HAR) (entrada 46, campo _initiator). Isso identifica a cadeia executada nessa condição, sem presumir a mesma execução no Firefox.

Evidências: blacklight.har: log.entries[46], [58]

## google.com
47 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 2 registros; 2 bloqueados/redirecionados

Firefox registrou 47 entradas deste domínio, por exemplo https://www.google.com/ccm/collect (query preservada no HAR) (HTTP 200, entrada 50). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. uBlock produziu 2 linhas de bloqueio/redirecionamento, com regra concreta ||google.com/ccm/, aplicada a https://www.google.com/ccm/collect (query preservada no HAR) (linha 270). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox.

Evidências: monitor.har: log.entries[50], [69], [70], [76]; ublock.har: log.entries[35], [55]; ublock-logger.txt: linhas 270, 305

## google.com.br
4 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 4 entradas deste domínio, por exemplo https://www.google.com.br/ads/ga-audiences (query preservada no HAR) (HTTP 200, entrada 72). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox.

Evidências: monitor.har: log.entries[72], [78], [161], [163]

## googletagmanager.com
6 pedidos; catálogo: sem classificação | Blacklight: 2 pedidos; categorias: ddg_join_ads | uBlock: 9 registros; 7 bloqueados/redirecionados

Firefox registrou 6 entradas deste domínio, por exemplo https://www.googletagmanager.com/gtm.js (query preservada no HAR) (HTTP 200, entrada 20). O monitor observou a conexão, mas não a rotulou como rastreador: googletagmanager.com não está no catálogo demonstrativo de src/core.js. Blacklight a classifica por Tracker Radar; trata-se de diferença de classificação, não ausência de captura. uBlock produziu 7 linhas de bloqueio/redirecionamento, com regra concreta ||googletagmanager.com^, aplicada a https://www.googletagmanager.com/td (query preservada no HAR) (linha 301). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. Blacklight associou o domínio às categorias ddg_join_ads; cookies de terceiros e rastreadores publicitários são categorias distintas.

Evidências: monitor.har: log.entries[20], [47], [48], [73]; blacklight.har: log.entries[10], [33]; ublock.har: log.entries[20], [33], [36]; ublock-logger.txt: linhas 301, 308, 309, 310, 311; blacklight-resultados.json: cards ddg_join_ads

## hotjar.com
2 pedidos; catálogo: Hotjar | Blacklight: 1 pedidos; categorias: session_recorders | uBlock: 1 registros; 1 bloqueados/redirecionados

Firefox registrou 2 entradas deste domínio, por exemplo https://static.hotjar.com/c/hotjar-4936838.js (query preservada no HAR) (HTTP 200, entrada 66). O catálogo do monitor identifica Hotjar nos hosts static.hotjar.com, script.hotjar.com. uBlock produziu 1 linhas de bloqueio/redirecionamento, com regra concreta ||hotjar.com^, aplicada a https://static.hotjar.com/c/hotjar-4936838.js (query preservada no HAR) (linha 266). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. Blacklight associou o domínio às categorias session_recorders; cookies de terceiros e rastreadores publicitários são categorias distintas.

Evidências: monitor.har: log.entries[66], [144]; blacklight.har: log.entries[38]; ublock.har: log.entries[57]; ublock-logger.txt: linhas 266; blacklight-resultados.json: cards session_recorders

## hotjar.io
1 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 1 entradas deste domínio, por exemplo https://vc.hotjar.io/sessions/4936838 (query preservada no HAR) (HTTP 204, entrada 165). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox.

Evidências: monitor.har: log.entries[165]

## jquery.com
0 pedidos; catálogo: sem classificação | Blacklight: 3 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Este domínio não consta no HAR da execução M; isso limita a afirmação a esta amostra. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight também contatou este domínio (3 entradas no seu HAR), mas não o incluiu nos domínios dos cartões de rastreadores/cookies/session replay. É diferença entre tráfego bruto e critérios dos cartões. A ocorrência exclusiva do Blacklight está concretamente registrada em blacklight.har[14]: https://code.jquery.com/jquery-1.11.0.min.js, HTTP 200. Não foi reproduzida no Firefox; não há base para atribuí-la a uma falha do catálogo, pois nem o HAR local contém o pedido. O iniciador registrado pelo Blacklight foi https://atendimento.magazineluiza.com.br/hc/pt-br/ (entrada 14, campo _initiator). Isso identifica a cadeia executada nessa condição, sem presumir a mesma execução no Firefox.

Evidências: blacklight.har: log.entries[14], [15], [19]

## magazineluiza.com.br
105 pedidos; catálogo: sem classificação | Blacklight: 31 pedidos; categorias: nenhuma nos cartões | uBlock: 146 registros; 0 bloqueados/redirecionados

Firefox registrou 102 entradas deste domínio, por exemplo https://www.magazineluiza.com.br/ (HTTP 200, entrada 0). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O logger uBlock tem 146 registros deste domínio, sem ação --/<< na amostra. A presença no monitor não implica que deva ser bloqueado; ver linhas 1, 3, 5. Blacklight também contatou este domínio (31 entradas no seu HAR), mas não o incluiu nos domínios dos cartões de rastreadores/cookies/session replay. É diferença entre tráfego bruto e critérios dos cartões.

Evidências: monitor.har: log.entries[0], [1], [2], [3]; blacklight.har: log.entries[0], [1], [2], [7]; ublock.har: log.entries[0], [1], [2], [3]; ublock-logger.txt: linhas 1, 3, 5, 8, 11

## mlcdn.com.br
29 pedidos; catálogo: sem classificação | Blacklight: 11 pedidos; categorias: nenhuma nos cartões | uBlock: 37 registros; 0 bloqueados/redirecionados

Firefox registrou 29 entradas deste domínio, por exemplo https://wx.mlcdn.com.br/site/shared/services/cliente_ouro.png (HTTP 200, entrada 21). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O logger uBlock tem 37 registros deste domínio, sem ação --/<< na amostra. A presença no monitor não implica que deva ser bloqueado; ver linhas 114, 116, 118. Blacklight também contatou este domínio (11 entradas no seu HAR), mas não o incluiu nos domínios dos cartões de rastreadores/cookies/session replay. É diferença entre tráfego bruto e critérios dos cartões.

Evidências: monitor.har: log.entries[21], [22], [23], [24]; blacklight.har: log.entries[3], [4], [5], [6]; ublock.har: log.entries[49], [50], [51], [52]; ublock-logger.txt: linhas 114, 116, 118, 120, 122

## on.aws
1 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 1 entradas deste domínio, por exemplo https://od-18c216b54e2045bdbb2d2f70bc4834b0.ecs.us-east-2.on.aws/events (query preservada no HAR) (HTTP 200, entrada 166). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox.

Evidências: monitor.har: log.entries[166]

## pinimg.com
2 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 1 registros; 1 bloqueados/redirecionados

Firefox registrou 2 entradas deste domínio, por exemplo https://s.pinimg.com/ct/core.js (HTTP 200, entrada 57). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. uBlock produziu 1 linhas de bloqueio/redirecionamento, com regra concreta ||s.pinimg.com/ct/core.js, aplicada a https://s.pinimg.com/ct/core.js (linha 277). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox.

Evidências: monitor.har: log.entries[57], [68]; ublock.har: log.entries[47]; ublock-logger.txt: linhas 277

## pinterest.com
3 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 3 entradas deste domínio, por exemplo https://ct.pinterest.com/user/ (query preservada no HAR) (HTTP 200, entrada 80). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox.

Evidências: monitor.har: log.entries[80], [82], [173]

## questionpro.com
7 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 1 registros; 1 bloqueados/redirecionados

Firefox registrou 7 entradas deste domínio, por exemplo https://intercept-widget.questionpro.com/static/js/loader.js (HTTP 200, entrada 178). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. uBlock produziu 1 linhas de bloqueio/redirecionamento, com regra concreta ||questionpro.com^$3p,from=~questionpro.com.au|~questionpro.eu, aplicada a https://intercept-widget.questionpro.com/static/js/loader.js (linha 247). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox.

Evidências: monitor.har: log.entries[178], [180], [181], [184]; ublock.har: log.entries[67]; ublock-logger.txt: linhas 247

## securiti.ai
10 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 10 registros; 0 bloqueados/redirecionados

Firefox registrou 10 entradas deste domínio, por exemplo https://cdn-prod.securiti.ai/consent/cookie-consent.css (HTTP 200, entrada 64). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O logger uBlock tem 10 registros deste domínio, sem ação --/<< na amostra. A presença no monitor não implica que deva ser bloqueado; ver linhas 96, 104, 106. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox.

Evidências: monitor.har: log.entries[64], [65], [79], [103]; ublock.har: log.entries[58], [59], [63], [77]; ublock-logger.txt: linhas 96, 104, 106, 141, 143

## spotify.com
0 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 6 registros; 0 bloqueados/redirecionados

Este domínio não consta no HAR da execução M; isso limita a afirmação a esta amostra. O logger uBlock tem 6 registros deste domínio, sem ação --/<< na amostra. A presença no monitor não implica que deva ser bloqueado; ver linhas 26, 29, 31. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox.

Evidências: ublock.har: log.entries[359], [432], [447]; ublock-logger.txt: linhas 26, 29, 31, 46, 48

## t.co
5 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 5 entradas deste domínio, por exemplo https://t.co/1/i/adsctp (HTTP 200, entrada 152). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox.

Evidências: monitor.har: log.entries[152], [156], [158], [259]

## tiktok.com
9 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 6 registros; 6 bloqueados/redirecionados

Firefox registrou 9 entradas deste domínio, por exemplo https://analytics.tiktok.com/i18n/pixel/events.js (query preservada no HAR) (HTTP 200, entrada 244). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. uBlock produziu 6 linhas de bloqueio/redirecionamento, com regra concreta ||analytics.tiktok.com^, aplicada a https://analytics.tiktok.com/api/v2/pixel (linha 10). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox.

Evidências: monitor.har: log.entries[244], [245], [246], [248]; ublock.har: log.entries[344], [345], [348], [371]; ublock-logger.txt: linhas 10, 23, 24, 44, 56

## tiktokw.us
1 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 1 entradas deste domínio, por exemplo https://analytics-ipv6.tiktokw.us/ipv6/enrich_ipv6 (HTTP 200, entrada 247). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox.

Evidências: monitor.har: log.entries[247]

## topsortassets.com
6 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 15 registros; 0 bloqueados/redirecionados

Firefox registrou 6 entradas deste domínio, por exemplo https://topsortassets.com/asset_01m3cpjg50e9pbwaw2ybbypwjy.png (HTTP 200, entrada 84). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O logger uBlock tem 15 registros deste domínio, sem ação --/<< na amostra. A presença no monitor não implica que deva ser bloqueado; ver linhas 6, 9, 14. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox.

Evidências: monitor.har: log.entries[84], [189], [255], [264]; ublock.har: log.entries[71], [72], [73], [74]; ublock-logger.txt: linhas 6, 9, 14, 38, 70

## twitter.com
7 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Firefox registrou 5 entradas deste domínio, por exemplo https://analytics.twitter.com/1/i/adsctp (HTTP 200, entrada 153). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox.

Evidências: monitor.har: log.entries[153], [157], [159], [260]

## visualwebsiteoptimizer.com
6 pedidos; catálogo: sem classificação | Blacklight: 0 pedidos; categorias: nenhuma nos cartões | uBlock: 7 registros; 1 bloqueados/redirecionados

Firefox registrou 6 entradas deste domínio, por exemplo https://dev.visualwebsiteoptimizer.com/j.php (query preservada no HAR) (HTTP 200, entrada 177). O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo. uBlock produziu 1 linhas de bloqueio/redirecionamento, com regra concreta /v.gif?, aplicada a https://dev.visualwebsiteoptimizer.com/collect/v.gif (query preservada no HAR) (linha 99). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos. O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox.

Evidências: monitor.har: log.entries[177], [206], [207], [209]; ublock.har: log.entries[68], [149], [150], [151]; ublock-logger.txt: linhas 99

## zdassets.com
0 pedidos; catálogo: sem classificação | Blacklight: 6 pedidos; categorias: nenhuma nos cartões | uBlock: 0 registros; 0 bloqueados/redirecionados

Este domínio não consta no HAR da execução M; isso limita a afirmação a esta amostra. O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir. Blacklight também contatou este domínio (6 entradas no seu HAR), mas não o incluiu nos domínios dos cartões de rastreadores/cookies/session replay. É diferença entre tráfego bruto e critérios dos cartões. A ocorrência exclusiva do Blacklight está concretamente registrada em blacklight.har[8]: https://static.zdassets.com/hc/assets/application-b925b7498ff4356827db8a6064e91e2b.css, HTTP 200. Não foi reproduzida no Firefox; não há base para atribuí-la a uma falha do catálogo, pois nem o HAR local contém o pedido. O iniciador registrado pelo Blacklight foi https://atendimento.magazineluiza.com.br/hc/pt-br/ (entrada 8, campo _initiator). Isso identifica a cadeia executada nessa condição, sem presumir a mesma execução no Firefox.

Evidências: blacklight.har: log.entries[8], [34], [35], [39]
