# Metodologia e limites — versão 1.0

## Unidade de análise

Uma navegação principal em uma aba define uma coleta. Recarregar substitui a coleta; redirects HTTP do mesmo requestId pertencem à mesma navegação. Pedidos atrasados permanecem associados ao estado de origem. Eventos de frames recebem a origem do remetente verificado pelo Firefox. Trocar de aba não mistura relatórios. Uma passagem rápida entre documentos preserva o indício de bounce no destino, não todos os relatórios anteriores.

Conexões são classificadas pelo eTLD+1 da Public Suffix List incluída no tldts (inclusive domínios privados, como github.io). Subdomínios da mesma organização são primeira parte; IPs/localhost usam o host. Não há resolução DNS para desmascarar CNAME. Terceiro não é sinônimo de rastreador. O catálogo pequeno em `src/core.js` é apenas demonstrativo e pode estar incompleto/desatualizado. A lista de bloqueio é independente desse catálogo.

## Cookies

Há quatro medidas diferentes, expostas no painel/JSON:

1. **Tentativas HTTP:** cada cabeçalho Set-Cookie, incluindo atualização/expiração; classificado por Domain ou host da resposta e por Expires/Max-Age. Não significa aceitação pelo Firefox.
2. **Tentativas JavaScript:** invocações do setter document.cookie. Conta operações, não cookies distintos; não retém valores nem comprova sucesso.
3. **Presentes:** inventário do cookieStoreId da aba, limitado aos domínios contatados e às partições compatíveis com o site de topo. Domínio, path, nome, store, firstPartyDomain e partitionKey compõem a identidade. Sessão/persistência vem da API Firefox.
4. **Novos desde baseline:** diferença de identidades contra snapshot assíncrono iniciado na navegação. Cookies precoces podem entrar nesse snapshot; atualização de um cookie já existente não cria nova identidade. `cookies.onChanged` complementa a observação, mas não informa a aba que originou a escrita.

Não é possível atribuir todas as mudanças de cookies com exatidão a uma aba usando somente essas APIs. Duas abas do mesmo site/store/partição podem contaminar atribuição. Feche abas concorrentes durante a avaliação. Cookies enviados a domínio que foi bloqueado podem ser preexistentes e aparecer no inventário; não declarar que foram transmitidos naquela requisição.

## HTML5 e canvas

Content scripts em document_start/all_frames exportam wrappers sobre métodos da página e preservam receptor, argumentos, retorno e exceções. Eventos contêm tipo, API, origem, frame, horário e resultado imediato, nunca valores armazenados. São cobertos Storage.getItem/setItem/removeItem/clear/key, IDBFactory e operações comuns IDBObjectStore; leituras de canvas 2D, WebGL e OffscreenCanvas no documento.

Snapshots apenas contam chaves de localStorage/sessionStorage. Escritas via `localStorage.chave = valor` podem escapar do registro de chamadas. IndexedDB retorna requisições/promessas que ainda podem falhar posteriormente; `success` significa retorno imediato, não commit. Workers/service workers e contextos não injetáveis não são instrumentados. Algumas chamadas ocorrem antes do observador ou são feitas por métodos substituídos. Não há bloqueio de storage, ruído de canvas ou remoção automática de parâmetros.

Canvas é **indício**, não diagnóstico: exportação de imagens, gráficos e editores também usam as APIs. O monitor não lê nem exporta os pixels, fingerprints ou conteúdo do banco.

## Cookie sync, parâmetros e bounce

- **Parâmetros:** nomes conhecidos na URL são eventos de baixa confiança. `utm_*` pode ser apenas atribuição de campanha; isso isoladamente não desconta pontos.
- **Correlação:** valores de 8–256 caracteres, alfanuméricos/underscore/ponto/hífen, em parâmetros identificadores são comparados com valores previamente vistos em cookies ou URLs da mesma coleta. Igualdade em sites registráveis distintos gera confiança média; o relatório guarda domínios, parâmetro e fonte, sem o valor. Não decodifica hash/base64 nem inspeciona POST. Coincidência é possível. Tentativas bloqueadas também podem produzir o indício de intenção; não afirmar transferência consumada.
- **Bounce HTTP:** duas transições consecutivas entre sites distintos no mesmo fluxo main_frame geram cadeia A→B→C (C pode ser A), com URLs/status. Login e pagamento podem ter a mesma forma.
- **Bounce entre documentos:** passagem A→B→C, com B observado por menos de 10s e duas trocas de site, é baixa confiança. Inclui navegação legítima; não comprova execução automática. Novas abas não são encadeadas. Exportar a coleta final.

## Hook/hijacking

Referências instrumentadas e fetch/WebSocket/XMLHttpRequest/eval/open são comparadas a cada 2s contra baseline obtida após instalar os próprios wrappers. Novas alterações de referências são registradas uma vez. Não há enumeração completa de todas as propriedades globais, memória do SO ou configurações internas do navegador. Alterações antes da baseline, curtas entre amostras ou fora da lista podem escapar.

Uma tentativa WebSocket é separada de handshake 101. O handshake terceiro é indício de canal; não mede duração nem mensagens. Polling requer pelo menos 6 requisições XHR/fetch/ping ao mesmo endpoint terceiro em uma janela observada de pelo menos 10s, excluindo cancelamentos do próprio monitor. Requisições que falharam por outra causa ainda podem indicar tentativa recorrente. Chats, cotações e aplicações colaborativas são falsos positivos plausíveis. Nenhum desses eventos prova sequestro.

No **js-leaks**, os wrappers do próprio monitor podem ser denunciados. Documentar cada API correspondente a `src/content.js`; não tratar o resultado como ataque nem tentar ocultar a extensão do teste. A baseline exclui as próprias alterações, não as de outros programas posteriores.

## Score

`score = max(0, 100 − soma(penalidades))`. Quanto maior, menor a exposição **observada**. A soma dos tetos é 100.

| Categoria | Regra | Teto | Justificativa |
|---|---|---:|---|
| Terceiros | 3 por domínio externo com resposta 2xx/3xx, sem erro nem bloqueio | 15 | Mais destinatários potenciais de dados |
| Catálogo | +5 por domínio terceiro identificado no catálogo com resposta | 20 | Acrescenta contexto ao compartilhamento |
| Cookies terceiros presentes | 2 sessão / 4 persistente | 20 | Persistência aumenta vínculo temporal |
| Storage terceiro | 2 por origem e família de API chamada com retorno normal | 10 | Estado adicional permite vínculo |
| Canvas | 10 se alguma leitura retorna normalmente | 10 | Potencial coleta de características |
| Correlação/bounce | 10 correlação + 5 bounce | 15 | Potencial transporte de identificadores |
| Hook/canal | 5 alteração de referência + 5 handshake WebSocket ou polling | 10 | Comportamentos que exigem investigação |

Pesos são escolhas didáticas documentadas, **sem calibração estatística**. Penalidades podem acumular sobre um mesmo domínio por evidências distintas. Requisições bloqueadas não contam como conexão respondida, mas seus sinais de intenção podem permanecer na categoria correlação/bounce. Cookies preexistentes podem continuar reduzindo a nota depois de bloquear um domínio. As proteções do navegador e de outras extensões alteram o que é observável.

Não criar categorias A/B/C para esse score: são conceitos da avaliação acadêmica, não graus de privacidade. Não traduzir automaticamente achados do Blacklight para nossa nota; comparar categorias, tempos e condições, mencionando explicitamente o que cada ferramenta consegue observar.

## Integridade e retenção

Não existe ponte pública postMessage para disparar mensagens privilegiadas. Mensagens de configuração só são aceitas de páginas internas da extensão; origens dos eventos vêm do remetente Firefox. Objetos controlados pela página não são serializados nos wrappers. APIs exportadas continuam visíveis e passíveis de interferência pelo site. A instrumentação não é um mecanismo à prova de adulteração.

Máximo de 3.000 entradas por lista por coleta, 500 identificadores temporários e 10.000 pedidos em andamento. Relatório sinaliza truncamento das listas do background; content scripts também limitam a emissão. URLs exportadas removem valores da query, credenciais e fragmentos; nomes/caminhos continuam observáveis para correlacionar com HAR. A memória termina ao fechar a aba/reiniciar; só regras persistem. Exportação é explícita.
