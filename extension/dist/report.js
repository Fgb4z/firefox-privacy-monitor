(() => {
  // src/report.js
  var $ = (id) => document.getElementById(id);
  var tabId;
  var current;
  var set = (id, value) => {
    $(id).textContent = value;
  };
  function node(tag, text) {
    const el = document.createElement(tag);
    el.textContent = text;
    return el;
  }
  function empty(id, text = "Nenhuma observa\xE7\xE3o nesta coleta.") {
    const el = node("p", text);
    el.className = "empty";
    $(id).replaceChildren(el);
  }
  function item(container, title, detail) {
    const el = document.createElement("div");
    el.className = "item";
    el.append(node("strong", title), node("small", detail));
    $(container).append(el);
  }
  function tableRow(id, cells) {
    const tr = document.createElement("tr");
    for (const cell of cells) {
      const td = document.createElement("td");
      td.append(typeof cell === "string" ? document.createTextNode(cell) : cell);
      tr.append(td);
    }
    $(id).append(tr);
  }
  async function refresh() {
    try {
      current = await browser.runtime.sendMessage({ type: "report", tabId });
      if (!current) {
        set("status", "Sem coleta para esta aba. Recarregue uma p\xE1gina HTTP(S) com a extens\xE3o ativa e clique em Atualizar. P\xE1ginas internas do Firefox e alguns dom\xEDnios protegidos n\xE3o permitem instrumenta\xE7\xE3o.");
        return;
      }
      const r = current;
      set("page-title", r.url);
      set("capture", `In\xEDcio: ${new Date(r.startedAt).toLocaleString("pt-BR")} \xB7 captura: ${new Date(r.capturedAt).toLocaleTimeString("pt-BR")}`);
      set("score", r.score.value);
      set("domains", new Set(r.requests.filter((x) => x.thirdParty).map((x) => x.domain)).size);
      set("blocked", r.requests.filter((x) => x.blocked).length);
      set("cookies", r.cookies.length);
      set("attempts", r.cookieAttempts.length + r.events.filter((e) => e.kind === "cookie-write").length);
      set("status", [...r.warnings, ...r.truncated ? ["Limite de registros atingido: coleta parcial."] : []].join(" "));
      for (const id of ["network-rows", "requests-list", "cookie-rows", "cookie-attempts", "storage-list", "signals-list", "score-list"]) $(id).replaceChildren();
      const groups = /* @__PURE__ */ new Map();
      for (const request of r.requests) {
        if (!groups.has(request.domain)) groups.set(request.domain, []);
        groups.get(request.domain).push(request);
      }
      for (const [domain, requests] of [...groups].sort((a, b) => b[1].length - a[1].length)) {
        const button = node("button", r.rules.includes(domain) ? "Na lista" : "Bloquear");
        button.disabled = r.rules.includes(domain);
        button.addEventListener("click", () => saveRules([...$("rules").value.split("\n").map((x) => x.trim()).filter(Boolean), domain]));
        const first = requests[0];
        tableRow("network-rows", [domain, `${first.thirdParty ? "Terceira" : "Primeira"} parte${first.tracker ? ` \xB7 ${first.tracker}` : " \xB7 sem classifica\xE7\xE3o no cat\xE1logo"}`, `${requests.length} / ${requests.filter((x) => x.blocked).length}`, button]);
      }
      for (const req of r.requests.slice(-300)) item("requests-list", `${req.type} \xB7 ${req.blocked ? "BLOQUEADO PELO MONITOR" : req.error || req.status || "pendente"} \xB7 ${req.domain}`, `${new Date(req.time).toISOString()} \xB7 requestId ${req.id} \xB7 ${req.url}`);
      const cookieCounts = [true, false].flatMap((third) => [true, false].map((session) => `${r.cookies.filter((c) => c.thirdParty === third && c.session === session).length} ${third ? "terceira" : "primeira"} parte / ${session ? "sess\xE3o" : "persistentes"}`));
      set("cookie-summary", `${cookieCounts.join(" \xB7 ")}. Novos desde baseline: ${r.cookies.filter((c) => c.newSinceBaseline === true).length}. Altera\xE7\xF5es de dom\xEDnio observadas: ${r.cookieChanges.length} (atribui\xE7\xE3o \xE0 aba incerta).`);
      for (const c of r.cookies) tableRow("cookie-rows", [`${c.name} \xB7 ${c.domain}`, c.thirdParty ? "Terceira" : "Primeira", c.session ? "Sess\xE3o" : "Persistente", `${c.partitionKey?.topLevelSite || "Sem parti\xE7\xE3o expl\xEDcita"} \xB7 ${c.newSinceBaseline === null ? "baseline indispon\xEDvel" : c.newSinceBaseline ? "novo" : "j\xE1 no baseline"}`]);
      for (const c of r.cookieAttempts) item("cookie-attempts", `${c.name} \xB7 ${c.domain} \xB7 ${c.session ? "sess\xE3o" : "persistente"}`, `Set-Cookie \xB7 ${c.thirdParty ? "terceira" : "primeira"} parte \xB7 requestId ${c.requestId} \xB7 ${c.url} \xB7 aceita\xE7\xE3o n\xE3o determinada${c.deletion ? " \xB7 expira\xE7\xE3o/remo\xE7\xE3o" : ""}`);
      for (const e of r.events.filter((e2) => e2.kind === "cookie-write")) item("cookie-attempts", `document.cookie \xB7 ${e.detail}`, `${e.frameOrigin} \xB7 frame ${e.frameId} \xB7 tentativa; aceita\xE7\xE3o n\xE3o determinada`);
      const aggregates = /* @__PURE__ */ new Map();
      for (const e of r.events.filter((e2) => ["storage", "storage-snapshot", "coverage"].includes(e2.kind))) {
        const key = JSON.stringify([e.kind, e.api, e.frameOrigin, e.outcome]);
        const old = aggregates.get(key);
        aggregates.set(key, { ...e, count: (old?.count || 0) + 1 });
      }
      for (const e of aggregates.values()) item("storage-list", `${e.api} \xB7 ${e.outcome} \xB7 ${e.count} observa\xE7\xF5es`, `${e.frameOrigin} \xB7 frame ${e.frameId} \xB7 ${e.thirdParty ? "terceira" : "primeira"} parte \xB7 ${e.detail}`);
      for (const s of r.signals) item("signals-list", `${s.kind} \xB7 confian\xE7a ${s.confidence || "evento de rede"}`, JSON.stringify(s));
      const distinct = /* @__PURE__ */ new Map();
      for (const e of r.events.filter((e2) => ["canvas", "hook"].includes(e2.kind))) {
        const key = `${e.kind}:${e.api}:${e.frameOrigin}`;
        const old = distinct.get(key);
        distinct.set(key, { ...e, count: (old?.count || 0) + 1 });
      }
      for (const e of distinct.values()) item("signals-list", `${e.kind} \xB7 ${e.api} \xB7 ${e.count} observa\xE7\xF5es`, `${e.frameOrigin} \xB7 ${e.detail}`);
      for (const id of ["storage-list", "signals-list", "requests-list", "cookie-attempts"]) if (!$(id).children.length) empty(id);
      for (const row of r.score.rows) {
        const el = document.createElement("div");
        el.className = "penalty";
        const label = node("span", row.label);
        label.append(node("small", row.rule));
        el.append(label, node("b", `\u2212${row.penalty}`));
        $("score-list").append(el);
      }
      const covered = new Set(r.events.filter((e) => e.kind === "coverage" && e.outcome === "ready").map((e) => e.frameId));
      set("coverage", `Score v${r.score.version} \xB7 ${covered.size} frames com instrumenta\xE7\xE3o confirmada. Workers e APIs n\xE3o instrumentadas ficam fora desta observa\xE7\xE3o. ${r.truncated ? "Amostra truncada." : ""}`);
    } catch (e) {
      set("status", e.message);
    }
  }
  async function saveRules(rules) {
    try {
      const saved = await browser.runtime.sendMessage({ type: "save-rules", rules });
      $("rules").value = saved.join("\n");
      await refresh();
      set("status", "Lista salva. Recarregue a p\xE1gina observada para medir o bloqueio.");
    } catch (e) {
      set("status", e.message);
    }
  }
  $("refresh").addEventListener("click", refresh);
  $("save-rules").addEventListener("click", () => saveRules($("rules").value.split("\n").map((x) => x.trim()).filter(Boolean)));
  $("expand").addEventListener("click", () => browser.tabs.create({ url: browser.runtime.getURL(`ui/report.html?tab=${tabId}`) }));
  $("print").addEventListener("click", () => window.print());
  $("export").addEventListener("click", async () => {
    await refresh();
    if (!current) return;
    const url = URL.createObjectURL(new Blob([JSON.stringify(current, null, 2)], { type: "application/json" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `privacy-monitor-${current.id}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1e3);
  });
  (async () => {
    const param = new URL(location.href).searchParams.get("tab");
    if (param) tabId = Number(param);
    else {
      const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
      tabId = tab?.id;
    }
    $("rules").value = (await browser.runtime.sendMessage({ type: "rules" })).join("\n");
    await refresh();
  })().catch((e) => set("status", e.message));
})();
