/* Estatística Essencial: roteador, renderização dos módulos, exercícios e progresso. */
(function () {
  "use strict";

  const STORE = "estatistica-essencial-v1";
  const PASS = 70;
  const app = document.getElementById("app");
  const byId = (id) => MODULES.find((m) => m.id === id);

  /* ---------- Progresso (localStorage) ---------- */
  function load() {
    try { const d = JSON.parse(localStorage.getItem(STORE)); if (d && d.attempts) return d; } catch (e) {}
    return { attempts: {}, read: {} };
  }
  let P = load();
  if (!P.read) P.read = {};
  function persist() { try { localStorage.setItem(STORE, JSON.stringify(P)); } catch (e) {} }
  function addAttempt(key, score, total) {
    (P.attempts[key] = P.attempts[key] || []).push({ d: Date.now(), s: Math.round(100 * score / total), n: total });
    persist();
  }
  const best = (key) => { const a = P.attempts[key]; return a && a.length ? Math.max(...a.map((x) => x.s)) : null; };
  const last = (key) => { const a = P.attempts[key]; return a && a.length ? a[a.length - 1].s : null; };
  const status = (id) => { const b = best(id); return b == null ? (P.read[id] ? "read" : "new") : b >= PASS ? "done" : "tried"; };

  /* ---------- Helpers ---------- */
  function h(tag, attrs, kids) {
    const e = document.createElement(tag);
    for (const k in attrs || {}) {
      const v = attrs[k];
      if (v == null || v === false) continue;
      if (k === "class") e.className = v;
      else if (k === "text") e.textContent = v;
      else if (k === "html") e.innerHTML = v;
      else if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v === true ? "" : v);
    }
    [].concat(kids || []).forEach((c) => c != null && c !== false && e.appendChild(typeof c === "string" ? document.createTextNode(c) : c));
    return e;
  }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  function tex(src, display) {
    if (window.katex) {
      try { return katex.renderToString(src, { displayMode: display, throwOnError: false, output: "htmlAndMathml" }); } catch (e) {}
    }
    return "<code class=\"tex\">" + esc(src) + "</code>";
  }
  // Marcação leve: $$…$$, $…$, **negrito**, *itálico*, `código`.
  function md(s) {
    const math = [];
    const keep = (html) => { math.push(html); return "\u0000" + (math.length - 1) + "\u0000"; };
    let t = String(s)
      .replace(/`([^`]+)`/g, (_, c) => keep("<code>" + esc(c) + "</code>"))
      .replace(/\$\$([\s\S]+?)\$\$/g, (_, m) => keep(tex(m, true)))
      .replace(/\$([^$\n]+?)\$/g, (_, m) => keep(tex(m, false)));
    t = esc(t)
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^*])\*([^*\s][^*]*?)\*/g, "$1<em>$2</em>");
    return t.replace(/\u0000(\d+)\u0000/g, (_, i) => math[+i]);
  }
  const M = (tag, s, attrs) => h(tag, Object.assign({ html: md(s) }, attrs || {}));
  const fmt = (x, d) => Number(x).toLocaleString("pt-BR", { maximumFractionDigits: d == null ? 4 : d });
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  function mount(nodes, title, nav) {
    app.textContent = "";
    [].concat(nodes).forEach((n) => n && app.appendChild(n));
    document.title = title ? title + " · Estatística Essencial" : "Estatística Essencial";
    document.querySelectorAll(".topnav a").forEach((a) => a.classList.toggle("on", a.dataset.nav === nav));
    window.scrollTo(0, 0);
    const h1 = app.querySelector("h1");
    if (h1) { h1.setAttribute("tabindex", "-1"); h1.focus({ preventScroll: true }); }
  }
  const crumbs = (items) => h("nav", { class: "crumbs", "aria-label": "Trilha" }, items.map((it, i) =>
    i < items.length - 1 ? h("span", null, [h("a", { href: it[1], text: it[0] }), h("span", { class: "sep", "aria-hidden": "true", text: "›" })]) : h("span", { "aria-current": "page", text: it[0] })));
  const badge = (id) => {
    const st = status(id), b = best(id);
    const label = { new: "Novo", read: "Estudado", tried: "Melhor: " + b + "%", done: "✓ " + b + "%" }[st];
    return h("span", { class: "badge " + st, text: label });
  };

  /* ---------- Blocos de conteúdo ---------- */
  function block(b) {
    if (b.h) return M("h3", b.h, { class: "blk-h" });
    if (b.p) return M("p", b.p);
    if (b.f) {
      const wrap = h("div", { class: "formula" }, [h("div", { class: "formula-tex", html: tex(b.f, true) })]);
      if (b.leg) wrap.appendChild(h("dl", { class: "legend" }, b.leg.flatMap((l) => [h("dt", { html: tex(l[0], false) }), M("dd", l[1])])));
      return wrap;
    }
    if (b.list) return h("ul", { class: "blk-list" }, b.list.map((x) => M("li", x)));
    if (b.ol) return h("ol", { class: "blk-list" }, b.ol.map((x) => M("li", x)));
    if (b.table) return h("div", { class: "table-wrap" }, h("table", null, [
      h("thead", null, h("tr", null, b.table.head.map((c) => M("th", c, { scope: "col" })))),
      h("tbody", null, b.table.rows.map((r) => h("tr", null, r.map((c, i) => M(i === 0 ? "th" : "td", c, i === 0 ? { scope: "row" } : null)))))
    ]));
    if (b.box) {
      const names = { intuicao: "Intuição", atencao: "Atenção", dica: "Dica", exemplo: "Exemplo resolvido", erro: "Erro comum" };
      return h("aside", { class: "box " + b.box }, [h("p", { class: "box-kind", text: names[b.box] || "" }), b.t ? M("h4", b.t) : null].concat((b.c || []).map((x) => typeof x === "string" ? M("p", x) : block(x))));
    }
    if (b.viz) { const host = h("div", { class: "viz-host" }); setTimeout(() => Viz.mount(b.viz, host), 0); return host; }
    if (b.pre) return h("pre", { class: "output" }, h("code", { text: b.pre }));
    return null;
  }

  function codeBlock(code, lang) {
    const pre = h("pre", { class: "code " + lang }, h("code", { text: code.replace(/^\n+|\s+$/g, "") }));
    const btn = h("button", { type: "button", class: "copy", text: "Copiar", onclick: async () => {
      try { await navigator.clipboard.writeText(pre.textContent); btn.textContent = "Copiado"; setTimeout(() => { btn.textContent = "Copiar"; }, 1500); } catch (e) { btn.textContent = "Selecione e copie"; }
    } });
    return h("div", { class: "code-wrap" }, [h("div", { class: "code-head" }, [h("span", { text: lang === "python" ? "Python" : "Sintaxe SPSS" }), btn]), pre]);
  }

  /* ---------- Páginas ---------- */
  function pageHome() {
    const done = MODULES.filter((m) => status(m.id) === "done").length;
    const next = MODULES.find((m) => status(m.id) !== "done") || MODULES[MODULES.length - 1];
    const phases = [
      ["Fundamentos", ["m0", "m1", "m2", "m3"]],
      ["Inferência", ["m4", "m5"]],
      ["Comparando grupos", ["m6", "m7", "m8", "m9"]],
      ["Outras relações e síntese", ["m10", "m11", "m12"]]
    ];
    return mount([
      h("section", { class: "hero" }, [
        h("p", { class: "eyebrow", text: "Estatística para pós-graduação" }),
        h("h1", null, ["Entender a estatística, ", h("span", { class: "accent", text: "não só aplicar testes" })]),
        h("p", { class: "lead", text: "Uma trilha em 13 módulos, da variância até a ANOVA e suas alternativas. Cada módulo tem conceito com intuição, visualizações interativas, exercícios com correção imediata e como fazer em Python e SPSS." }),
        h("div", { class: "hero-cta" }, [
          h("a", { class: "btn main", href: "#/m/" + next.id, text: done ? "Continuar: " + next.short + " →" : "Começar pelo Módulo 0 →" }),
          h("a", { class: "btn", href: "#/progresso", text: "Meu progresso (" + done + "/" + MODULES.length + ")" })
        ])
      ]),
      ...phases.map((ph) => h("section", { class: "phase" }, [
        h("h2", { class: "section-title", text: ph[0] }),
        h("div", { class: "cards" }, ph[1].map(byId).filter(Boolean).map((m) => h("a", { class: "mod-card", href: "#/m/" + m.id }, [
          h("span", { class: "mod-num", text: String(m.n) }),
          h("div", null, [h("h3", { text: m.title }), h("p", { text: m.sub }), badge(m.id)])
        ])))
      ])),
      h("a", { class: "test-card", href: "#/simulado" }, [h("div", null, [h("h3", { text: "Simulado geral" }), h("p", { text: "25 questões sorteadas de todos os módulos." })]), h("span", { class: "badge " + (best("simulado") >= PASS ? "done" : "new"), text: best("simulado") != null ? "Melhor: " + best("simulado") + "%" : "Começar" })])
    ], null, "home");
  }

  function pageModule(m, tab) {
    const base = "#/m/" + m.id;
    const tabs = [["conceito", "Conceito"], ["pratica", "Na prática"], ["exercicios", "Exercícios (" + m.ex.length + ")"]];
    const idx = MODULES.indexOf(m), prev = MODULES[idx - 1], next = MODULES[idx + 1];
    let body;
    if (tab === "pratica") body = practice(m);
    else if (tab === "exercicios") { body = h("div", { class: "quiz-host" }); runQuiz(body, m.ex, m.id, next ? ["Próximo módulo", "#/m/" + next.id] : ["Simulado geral", "#/simulado"], ["Rever o conceito", base]); }
    else {
      body = h("article", { class: "concept" }, [
        h("section", { class: "goals" }, [h("h2", { text: "Ao final deste módulo você vai…" }), h("ul", null, m.goals.map((g) => M("li", g)))])
      ].concat(m.blocks.map(block)).concat([
        h("div", { class: "cta-row" }, [
          h("button", { type: "button", class: "btn", text: P.read[m.id] ? "✓ Marcado como estudado" : "Marcar como estudado", onclick: (e) => { P.read[m.id] = Date.now(); persist(); e.target.textContent = "✓ Marcado como estudado"; } }),
          h("a", { class: "btn main", href: base + "/exercicios", text: "Fazer os exercícios →" })
        ])
      ]));
    }
    return mount([
      crumbs([["Início", "#/"], ["Módulo " + m.n]]),
      h("header", { class: "page-head" }, [h("p", { class: "eyebrow", text: "Módulo " + m.n + " de " + (MODULES.length - 1) }), h("h1", { text: m.title }), h("p", { class: "lead", text: m.sub }), badge(m.id)]),
      h("div", { class: "tabs", role: "tablist" }, tabs.map((t) => h("a", { role: "tab", href: base + (t[0] === "conceito" ? "" : "/" + t[0]), "aria-selected": tab === t[0] ? "true" : "false", text: t[1] }))),
      body,
      h("nav", { class: "pager", "aria-label": "Módulos" }, [
        prev ? h("a", { href: "#/m/" + prev.id, text: "← " + prev.short }) : h("span"),
        next ? h("a", { href: "#/m/" + next.id, text: next.short + " →" }) : h("a", { href: "#/simulado", text: "Simulado geral →" })
      ])
    ], m.title, m.id === "m12" ? "fluxo" : "mods");
  }

  function practice(m) {
    const pr = m.pratica || { python: [], spss: [] };
    const out = h("div", { class: "practice" });
    out.appendChild(h("p", { class: "note", html: md("Este conteúdo é **complementar**: o foco do curso é entender os conceitos. Os exemplos em Python usam `numpy`, `scipy`, `pandas`, `statsmodels` e `pingouin` (`pip install scipy statsmodels pingouin`). Os menus do SPSS seguem a interface em inglês (versão 27 ou posterior). Dica: em qualquer janela do SPSS, o botão **Paste** gera a sintaxe exata da sua versão.") }));
    const sec = (title, items, lang) => h("section", { class: "panel" }, [h("h2", { text: title })].concat(items.map((it) => h("div", { class: "pr-item" }, [
      it.h ? M("h3", it.h) : null,
      it.p ? M("p", it.p) : null,
      it.menu ? h("p", { class: "menu" }, [h("span", { class: "menu-k", text: "Menu: " }), h("span", { text: it.menu })]) : null,
      it.code ? codeBlock(it.code, lang) : null,
      it.syntax ? codeBlock(it.syntax, "spss") : null,
      it.out ? h("pre", { class: "output" }, h("code", { text: it.out })) : null
    ]))));
    if (pr.python && pr.python.length) out.appendChild(sec("Python (adicional)", pr.python, "python"));
    if (pr.spss && pr.spss.length) out.appendChild(sec("SPSS (extra)", pr.spss, "spss"));
    return out;
  }

  function pageProgress() {
    const rows = MODULES.map((m) => {
      const a = P.attempts[m.id] || [];
      return h("tr", null, [
        h("th", { scope: "row" }, h("a", { href: "#/m/" + m.id, text: m.n + ". " + m.short })),
        h("td", { text: P.read[m.id] ? "✓" : "—" }),
        h("td", { text: String(a.length) }),
        h("td", { text: best(m.id) != null ? best(m.id) + "%" : "—" }),
        h("td", { text: last(m.id) != null ? last(m.id) + "%" : "—" }),
        h("td", null, spark(a))
      ]);
    });
    const done = MODULES.filter((m) => status(m.id) === "done").length;
    const tried = MODULES.filter((m) => best(m.id) != null);
    const avg = tried.length ? Math.round(tried.reduce((s, m) => s + best(m.id), 0) / tried.length) : null;
    const weak = MODULES.filter((m) => status(m.id) === "tried");
    const allAtt = Object.values(P.attempts).flat().sort((a, b) => a.d - b.d);
    const fileIn = h("input", { type: "file", accept: "application/json", hidden: true, onchange: (e) => importFile(e.target.files[0]) });
    return mount([
      crumbs([["Início", "#/"], ["Meu progresso"]]),
      h("header", { class: "page-head" }, [h("p", { class: "eyebrow", text: "Acompanhamento" }), h("h1", { text: "Meu progresso" }), h("p", { class: "lead", text: "Um módulo conta como concluído quando você acerta pelo menos " + PASS + "% dos exercícios. Os dados ficam salvos só neste navegador; use exportar/importar para levar para outro aparelho." })]),
      h("div", { class: "kpis" }, [
        kpi("Módulos concluídos", done + " / " + MODULES.length),
        kpi("Média das melhores notas", avg != null ? avg + "%" : "—"),
        kpi("Tentativas no total", String(allAtt.length)),
        kpi("Simulado (melhor)", best("simulado") != null ? best("simulado") + "%" : "—")
      ]),
      h("div", { class: "bar big", role: "img", "aria-label": done + " de " + MODULES.length + " módulos concluídos" }, h("i", { style: "width:" + (100 * done / MODULES.length) + "%" })),
      weak.length ? h("section", { class: "panel" }, [h("h2", { text: "Para revisar" }), h("p", { text: "Você já tentou estes módulos mas ainda não chegou a " + PASS + "%:" }), h("ul", null, weak.map((m) => h("li", null, h("a", { href: "#/m/" + m.id, text: m.n + ". " + m.title + " (melhor: " + best(m.id) + "%)" }))))]) : null,
      allAtt.length > 1 ? h("section", { class: "panel" }, [h("h2", { text: "Evolução das notas" }), h("p", { class: "small", text: "Cada ponto é uma tentativa, em ordem cronológica (todos os módulos e simulados)." }), timeline(allAtt)]) : null,
      h("section", { class: "panel" }, [h("h2", { text: "Por módulo" }), h("div", { class: "table-wrap" }, h("table", { class: "progress-table" }, [
        h("thead", null, h("tr", null, ["Módulo", "Estudado", "Tentativas", "Melhor", "Última", "Histórico"].map((c) => h("th", { scope: "col", text: c })))),
        h("tbody", null, rows)
      ]))]),
      h("section", { class: "panel" }, [h("h2", { text: "Backup" }), h("div", { class: "row wrap" }, [
        h("button", { type: "button", class: "btn", text: "Exportar progresso (.json)", onclick: exportFile }),
        h("button", { type: "button", class: "btn", text: "Importar progresso", onclick: () => fileIn.click() }), fileIn,
        h("button", { type: "button", class: "btn danger", text: "Apagar tudo", onclick: () => { if (confirm("Apagar todo o progresso salvo neste navegador?")) { P = { attempts: {}, read: {} }; persist(); route(); } } })
      ])])
    ], "Meu progresso", "prog");
  }
  const kpi = (l, v) => h("div", { class: "kpi" }, [h("span", { text: l }), h("b", { text: v })]);
  function spark(a) {
    if (!a.length) return h("span", { class: "small", text: "—" });
    const W = 120, H = 28, NS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`); svg.setAttribute("class", "spark"); svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Notas: " + a.map((x) => x.s + "%").join(", "));
    const pts = a.slice(-12).map((x, i, arr) => [arr.length === 1 ? W / 2 : 4 + i * (W - 8) / (arr.length - 1), H - 3 - x.s / 100 * (H - 6)]);
    const pass = document.createElementNS(NS, "line");
    pass.setAttribute("x1", 0); pass.setAttribute("x2", W); pass.setAttribute("y1", H - 3 - PASS / 100 * (H - 6)); pass.setAttribute("y2", H - 3 - PASS / 100 * (H - 6)); pass.setAttribute("class", "spark-pass");
    svg.appendChild(pass);
    const path = document.createElementNS(NS, "polyline");
    path.setAttribute("points", pts.map((q) => q.join(",")).join(" ")); path.setAttribute("class", "spark-line");
    svg.appendChild(path);
    pts.forEach((q) => { const c = document.createElementNS(NS, "circle"); c.setAttribute("cx", q[0]); c.setAttribute("cy", q[1]); c.setAttribute("r", 2.5); c.setAttribute("class", "spark-dot"); svg.appendChild(c); });
    return svg;
  }
  function timeline(all) {
    const W = 640, H = 160, NS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`); svg.setAttribute("class", "viz-svg"); svg.setAttribute("role", "img"); svg.setAttribute("aria-label", "Evolução das notas");
    const X = (i) => 30 + i * (W - 40) / Math.max(1, all.length - 1), Y = (v) => H - 20 - v / 100 * (H - 30);
    [0, 50, PASS, 100].forEach((v) => {
      const l = document.createElementNS(NS, "line"); l.setAttribute("x1", 30); l.setAttribute("x2", W - 10); l.setAttribute("y1", Y(v)); l.setAttribute("y2", Y(v)); l.setAttribute("class", v === PASS ? "spark-pass" : "viz-grid-line"); svg.appendChild(l);
      const t = document.createElementNS(NS, "text"); t.setAttribute("x", 0); t.setAttribute("y", Y(v) + 4); t.setAttribute("class", "viz-tick"); t.textContent = v + "%"; svg.appendChild(t);
    });
    const pl = document.createElementNS(NS, "polyline"); pl.setAttribute("points", all.map((a, i) => X(i) + "," + Y(a.s)).join(" ")); pl.setAttribute("class", "spark-line"); svg.appendChild(pl);
    all.forEach((a, i) => { const c = document.createElementNS(NS, "circle"); c.setAttribute("cx", X(i)); c.setAttribute("cy", Y(a.s)); c.setAttribute("r", 3.5); c.setAttribute("class", "spark-dot"); svg.appendChild(c); });
    return svg;
  }
  function exportFile() {
    const blob = new Blob([JSON.stringify(P, null, 2)], { type: "application/json" });
    const a = h("a", { href: URL.createObjectURL(blob), download: "estatistica-essencial-progresso.json" });
    document.body.appendChild(a); a.click(); a.remove();
  }
  function importFile(file) {
    if (!file) return;
    file.text().then((t) => {
      const d = JSON.parse(t);
      if (!d || typeof d.attempts !== "object") throw new Error("formato");
      P = { attempts: d.attempts, read: d.read || {} }; persist(); route();
    }).catch(() => alert("Arquivo inválido. Use um arquivo exportado por este site."));
  }

  function pageSimulado() {
    const pool = MODULES.flatMap((m) => m.ex.map((e) => Object.assign({ from: m.n }, e)));
    const host = h("div", { class: "quiz-host" });
    runQuiz(host, shuffle(pool).slice(0, 25), "simulado", ["Meu progresso", "#/progresso"], ["Início", "#/"]);
    return mount([
      crumbs([["Início", "#/"], ["Simulado geral"]]),
      h("header", { class: "page-head" }, [h("p", { class: "eyebrow", text: "Avaliação" }), h("h1", { text: "Simulado geral" }), h("p", { class: "lead", text: "25 questões sorteadas de todos os módulos. Cada questão indica de qual módulo veio, para você saber o que revisar." })]),
      host
    ], "Simulado geral", "sim");
  }

  /* ---------- Exercícios ---------- */
  function parseNum(s) {
    const t = String(s).trim().replace(/\s/g, "").replace("%", "");
    const norm = /,\d*$/.test(t) || (t.includes(",") && !t.includes(".")) ? t.replace(/\./g, "").replace(",", ".") : t.replace(/,/g, "");
    return norm === "" ? NaN : Number(norm);
  }
  function runQuiz(host, items, key, nextLink, backLink) {
    let qs, i, score, wrong;
    const reset = () => { qs = items.map((e) => e.t === "mc" ? Object.assign({}, e, { order: e.keep ? e.o.map((_, k) => k) : shuffle(e.o.map((_, k) => k)) }) : e); i = 0; score = 0; wrong = []; render(); };

    function render() {
      host.textContent = "";
      if (i >= qs.length) return end();
      const q = qs[i];
      let answered = false;
      const fb = h("div", { class: "feedback", role: "status", "aria-live": "polite" });
      const next = h("button", { type: "button", class: "btn main", hidden: true, text: i < qs.length - 1 ? "Próxima →" : "Ver resultado", onclick: () => { i++; render(); } });
      const card = h("div", { class: "quiz-card" }, [
        h("div", { class: "quiz-meta" }, [h("span", { text: "Questão " + (i + 1) + " de " + qs.length + (q.from != null ? " · Módulo " + q.from : "") }), h("span", { text: "Acertos: " + score })]),
        h("div", { class: "bar thin" }, h("i", { style: "width:" + (100 * i / qs.length) + "%" })),
        M("div", q.q, { class: "prompt" }),
        q.out ? h("pre", { class: "output" }, h("code", { text: q.out })) : null
      ]);
      function finish(ok, msg) {
        if (answered) return;
        answered = true;
        if (ok) score++; else wrong.push(q);
        fb.className = "feedback " + (ok ? "ok" : "no");
        fb.innerHTML = "<strong>" + (ok ? "Correto!" : "Não foi dessa vez.") + "</strong> " + (msg ? md(msg) : "");
        if (q.ex) fb.appendChild(M("p", q.ex, { class: "why" }));
        next.hidden = false;
        next.focus();
      }
      if (q.t === "mc" || q.t === "tf") {
        const opts = q.t === "tf" ? ["Verdadeiro", "Falso"] : q.o;
        const order = q.t === "tf" ? [0, 1] : q.order;
        const right = q.t === "tf" ? (q.a ? 0 : 1) : q.a;
        const box = h("div", { class: "options" });
        order.forEach((oi) => {
          const b = h("button", { type: "button", class: "opt", html: md(opts[oi]), onclick: () => {
            if (answered) return;
            box.querySelectorAll("button").forEach((x) => { x.disabled = true; });
            b.classList.add(oi === right ? "right" : "wrong");
            if (oi !== right) box.querySelectorAll("button")[order.indexOf(right)].classList.add("right");
            finish(oi === right, oi === right ? "" : "Resposta: " + opts[right] + ".");
          } });
          box.appendChild(b);
        });
        card.appendChild(box);
      } else if (q.t === "num") {
        const inp = h("input", { type: "text", inputmode: "decimal", class: "answer", autocomplete: "off", "aria-label": "Sua resposta" });
        const tol = q.tol != null ? q.tol : Math.max(Math.abs(q.a) * 0.01, 0.005);
        const check = () => {
          if (answered) return;
          const v = parseNum(inp.value);
          if (!Number.isFinite(v)) { inp.focus(); inp.setAttribute("aria-invalid", "true"); return; }
          const ok = Math.abs(v - q.a) <= tol + 1e-12;
          inp.disabled = true; btn.disabled = true;
          inp.classList.add(ok ? "right" : "wrong");
          finish(ok, (ok ? "" : "Resposta: ") + (ok ? "Valor esperado: " : "") + fmt(q.a) + (q.unit ? " " + q.unit : "") + ".");
        };
        inp.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); check(); } });
        const btn = h("button", { type: "button", class: "btn main", text: "Conferir", onclick: check });
        card.appendChild(h("div", { class: "fill-row" }, [inp, q.unit ? h("span", { class: "unit", text: q.unit }) : null, btn]));
        card.appendChild(h("p", { class: "small", text: "Use vírgula ou ponto para decimais. Tolerância: ±" + fmt(tol) + "." }));
        setTimeout(() => inp.focus(), 0);
      }
      card.append(fb, h("div", { class: "row" }, next));
      host.appendChild(card);
    }

    function end() {
      const pct = Math.round(100 * score / qs.length);
      addAttempt(key, score, qs.length);
      const msg = pct >= 90 ? "Excelente domínio do conteúdo." : pct >= PASS ? "Módulo concluído! Revise as questões que errou." : pct >= 50 ? "Quase lá. Releia o conceito e tente de novo." : "Vale a pena voltar ao conceito antes de tentar de novo.";
      host.appendChild(h("div", { class: "quiz-card end" }, [
        h("p", { class: "big", text: pct + "%" }),
        h("p", { class: "end-msg", text: score + " de " + qs.length + " corretas. " + msg }),
        wrong.length ? h("details", { class: "review" }, [h("summary", { text: "Revisar as " + wrong.length + " questões erradas" }), h("ol", null, wrong.map((q) => h("li", null, [
          M("div", q.q), q.out ? h("pre", { class: "output" }, h("code", { text: q.out })) : null,
          h("p", { class: "ans", html: "<strong>Resposta:</strong> " + md(q.t === "num" ? fmt(q.a) + (q.unit ? " " + q.unit : "") : q.t === "tf" ? (q.a ? "Verdadeiro" : "Falso") : q.o[q.a]) }),
          q.ex ? M("p", q.ex, { class: "why" }) : null
        ])))]) : null,
        h("div", { class: "row wrap" }, [
          h("button", { type: "button", class: "btn", text: "Tentar de novo", onclick: reset }),
          h("a", { class: "btn", href: backLink[1], text: backLink[0] }),
          h("a", { class: "btn main", href: nextLink[1], text: nextLink[0] + " →" })
        ])
      ]));
    }
    reset();
  }

  /* ---------- Rotas ---------- */
  function route() {
    const parts = (location.hash || "#/").replace(/^#\/?/, "").split("/").filter(Boolean);
    if (parts[0] === "m" && byId(parts[1])) return pageModule(byId(parts[1]), parts[2] || "conceito");
    if (parts[0] === "progresso") return pageProgress();
    if (parts[0] === "simulado") return pageSimulado();
    return pageHome();
  }
  window.addEventListener("hashchange", route);
  // KaTeX carrega em paralelo; redesenha quando chegar.
  const kt = document.getElementById("katex-js");
  if (kt && !window.katex) kt.addEventListener("load", () => route());
  route();
})();
