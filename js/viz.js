/* Visualizações interativas. Cada uma recebe um elemento hospedeiro e se desenha nele (SVG puro). */
const Viz = (function () {
  "use strict";
  const NS = "http://www.w3.org/2000/svg";
  const fmt = (x, d = 2) => Number.isFinite(x) ? (Math.abs(x) < 0.5 * 10 ** -d ? 0 : x).toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d }) : "—";
  const fmtP = (p) => p < 0.001 ? "< 0,001" : fmt(p, 3);

  function el(tag, attrs, kids) {
    const e = document.createElement(tag);
    for (const k in attrs || {}) {
      const v = attrs[k];
      if (v == null || v === false) continue;
      if (k === "text") e.textContent = v;
      else if (k === "class") e.className = v;
      else if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v === true ? "" : v);
    }
    [].concat(kids || []).forEach((c) => c != null && c !== false && e.appendChild(typeof c === "string" ? document.createTextNode(c) : c));
    return e;
  }
  function s(tag, attrs) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs || {}) if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    return e;
  }

  // Área de desenho com escalas lineares.
  function plot(host, o) {
    const W = o.w || 640, H = o.h || 260, m = Object.assign({ t: 12, r: 14, b: 30, l: 14 }, o.m || {});
    const svg = s("svg", { viewBox: `0 0 ${W} ${H}`, class: "viz-svg", role: "img", "aria-label": o.label || "Gráfico" });
    const X = (x) => m.l + (x - o.x0) / (o.x1 - o.x0) * (W - m.l - m.r);
    const Y = (y) => H - m.b - (y - o.y0) / (o.y1 - o.y0) * (H - m.t - m.b);
    host.appendChild(svg);
    const p = { svg, X, Y, W, H, m,
      add(e) { svg.appendChild(e); return e; },
      line(x1, y1, x2, y2, cls) { return p.add(s("line", { x1: X(x1), y1: Y(y1), x2: X(x2), y2: Y(y2), class: cls })); },
      path(pts, cls) { return p.add(s("path", { d: pts.map((q, i) => (i ? "L" : "M") + X(q[0]).toFixed(1) + " " + Y(q[1]).toFixed(1)).join(""), class: cls })); },
      area(pts, cls) {
        if (!pts.length) return null;
        const d = "M" + X(pts[0][0]) + " " + Y(o.y0) + pts.map((q) => "L" + X(q[0]).toFixed(1) + " " + Y(q[1]).toFixed(1)).join("") + "L" + X(pts[pts.length - 1][0]) + " " + Y(o.y0) + "Z";
        return p.add(s("path", { d, class: cls }));
      },
      circle(x, y, r, cls) { return p.add(s("circle", { cx: X(x), cy: Y(y), r, class: cls })); },
      text(x, y, t, cls, anchor) { const e = s("text", { x: X(x), y: Y(y), class: cls || "viz-label", "text-anchor": anchor || "middle" }); e.textContent = t; return p.add(e); },
      axisX(ticks, f) {
        p.add(s("line", { x1: m.l, x2: W - m.r, y1: H - m.b, y2: H - m.b, class: "viz-axis" }));
        ticks.forEach((t) => {
          p.add(s("line", { x1: X(t), x2: X(t), y1: H - m.b, y2: H - m.b + 4, class: "viz-axis" }));
          const e = s("text", { x: X(t), y: H - m.b + 18, class: "viz-tick", "text-anchor": "middle" }); e.textContent = f ? f(t) : String(t).replace(".", ","); svg.appendChild(e);
        });
      }
    };
    return p;
  }
  const range = (a, b, n) => Array.from({ length: n + 1 }, (_, i) => a + (b - a) * i / n);
  function ticks(a, b, n) {
    const step = niceStep((b - a) / (n || 6));
    const out = [];
    for (let t = Math.ceil(a / step) * step; t <= b + 1e-9; t += step) out.push(+t.toFixed(10));
    return out;
  }
  function niceStep(r) { const e = Math.pow(10, Math.floor(Math.log10(r))), f = r / e; return (f < 1.5 ? 1 : f < 3 ? 2 : f < 7 ? 5 : 10) * e; }
  function histogram(data, x0, x1, bins) {
    const w = (x1 - x0) / bins, c = new Array(bins).fill(0);
    data.forEach((v) => { const i = Math.floor((v - x0) / w); if (i >= 0 && i < bins) c[i]++; });
    return c.map((n, i) => ({ a: x0 + i * w, b: x0 + (i + 1) * w, dens: n / (data.length * w) }));
  }

  function slider(label, min, max, step, value, on, show) {
    const out = el("output", { text: show ? show(value) : String(value) });
    const inp = el("input", { type: "range", min, max, step, value, "aria-label": label });
    inp.addEventListener("input", () => { const v = +inp.value; out.textContent = show ? show(v) : String(v); on(v); });
    return el("label", { class: "ctl" }, [el("span", { class: "ctl-name", text: label }), inp, out]);
  }
  function select(label, opts, value, on) {
    const sel = el("select", { "aria-label": label }, opts.map((o) => el("option", { value: o[0], text: o[1], selected: o[0] === value })));
    sel.addEventListener("change", () => on(sel.value));
    return el("label", { class: "ctl" }, [el("span", { class: "ctl-name", text: label }), sel]);
  }
  const button = (t, on, cls) => el("button", { type: "button", class: "btn small " + (cls || ""), text: t, onclick: on });
  function frame(host, title, caption) {
    const box = el("figure", { class: "viz" });
    box.appendChild(el("figcaption", null, [el("strong", { text: title }), caption ? el("span", { text: " " + caption }) : null]));
    const controls = el("div", { class: "viz-controls" });
    const stage = el("div", { class: "viz-stage" });
    const readout = el("div", { class: "viz-readout", "aria-live": "polite" });
    box.append(controls, stage, readout);
    host.appendChild(box);
    return { controls, stage, readout };
  }
  function stats(readout, items) {
    readout.textContent = "";
    items.forEach((it) => readout.appendChild(el("span", { class: "stat" + (it[2] ? " " + it[2] : "") }, [el("small", { text: it[0] }), el("b", { text: it[1] })])));
  }

  /* 1. Variância: desvios e quadrados ----------------------------------- */
  function variancia(host) {
    const f = frame(host, "Variância como área média dos quadrados.", "Arraste os controles e veja os desvios (barras) virarem quadrados.");
    let vals = [6, 9, 10, 11, 12, 14];
    const presets = { pouco: [9, 10, 10, 11, 10, 10], muito: [2, 6, 10, 13, 15, 18], outlier: [8, 9, 10, 10, 11, 20] };
    const sliders = el("div", { class: "viz-grid" });
    function buildSliders() {
      sliders.textContent = "";
      vals.forEach((v, i) => sliders.appendChild(slider("x" + (i + 1), 0, 20, 1, v, (nv) => { vals[i] = nv; draw(); })));
    }
    f.controls.append(sliders, el("div", { class: "row" }, [
      button("Pouco espalhado", () => { vals = presets.pouco.slice(); buildSliders(); draw(); }),
      button("Muito espalhado", () => { vals = presets.muito.slice(); buildSliders(); draw(); }),
      button("Com outlier", () => { vals = presets.outlier.slice(); buildSliders(); draw(); })
    ]));
    function draw() {
      f.stage.textContent = "";
      const n = vals.length, m = Stats.mean(vals);
      const p = plot(f.stage, { x0: 0, x1: n + 1, y0: 0, y1: 20, h: 300, m: { l: 30, b: 16 }, label: "Pontos, média e quadrados dos desvios" });
      [0, 5, 10, 15, 20].forEach((t) => { p.line(0, t, n + 1, t, "viz-grid-line"); p.text(0, t, String(t), "viz-tick", "start").setAttribute("x", 2); });
      const unit = p.Y(0) - p.Y(1);
      vals.forEach((v, i) => {
        const x = i + 1, d = v - m;
        const side = Math.abs(d) * unit;
        const r = s("rect", { x: p.X(x), y: Math.min(p.Y(v), p.Y(m)), width: side, height: side, class: d >= 0 ? "viz-sq pos" : "viz-sq neg" });
        p.add(r);
        p.line(x, m, x, v, "viz-dev");
        p.circle(x, v, 6, "viz-pt");
      });
      p.line(0.3, m, n + 0.7, m, "viz-mean");
      p.text(n + 0.75, m + 0.4, "média", "viz-label", "start");
      const sq = vals.reduce((a, v) => a + (v - m) ** 2, 0);
      stats(f.readout, [["Média", fmt(m)], ["Soma dos desvios", fmt(vals.reduce((a, v) => a + v - m, 0))], ["SQ (soma dos quadrados)", fmt(sq)], ["s² = SQ/(n−1)", fmt(sq / (n - 1)), "hl"], ["s (desvio-padrão)", fmt(Math.sqrt(sq / (n - 1)))], ["SQ/n (viesado)", fmt(sq / n)]]);
    }
    buildSliders(); draw();
  }

  /* 2. Distribuições contínuas ------------------------------------------ */
  function dist(host) {
    const f = frame(host, "A família da normal.", "Compare a t com a normal e veja como χ² e F mudam com os graus de liberdade.");
    let fam = "t", df = 3, k = 4, d1 = 3, d2 = 20;
    const params = el("div", { class: "viz-grid" });
    f.controls.append(select("Distribuição", [["normal", "Normal padrão"], ["t", "t de Student"], ["chi2", "Qui-quadrado (χ²)"], ["f", "F de Snedecor"]], fam, (v) => { fam = v; build(); draw(); }), params);
    function build() {
      params.textContent = "";
      if (fam === "t") params.appendChild(slider("graus de liberdade (ν)", 1, 60, 1, df, (v) => { df = v; draw(); }));
      if (fam === "chi2") params.appendChild(slider("graus de liberdade (k)", 1, 30, 1, k, (v) => { k = v; draw(); }));
      if (fam === "f") { params.appendChild(slider("gl numerador (d₁)", 1, 20, 1, d1, (v) => { d1 = v; draw(); })); params.appendChild(slider("gl denominador (d₂)", 1, 80, 1, d2, (v) => { d2 = v; draw(); })); }
    }
    function draw() {
      f.stage.textContent = "";
      let x0, x1, pdf, info;
      if (fam === "normal" || fam === "t") {
        x0 = -4.5; x1 = 4.5; pdf = fam === "t" ? (x) => Stats.tPdf(x, df) : (x) => Stats.normPdf(x);
        info = fam === "t"
          ? [["Média", df > 1 ? "0" : "indefinida"], ["Variância", df > 2 ? fmt(df / (df - 2)) : "infinita"], ["t crítico (bilateral, 5%)", fmt(Stats.tInv(0.975, df), 3), "hl"], ["z crítico", "1,960"]]
          : [["Média", "0"], ["Variância", "1"], ["P(−1,96 < Z < 1,96)", "95%", "hl"]];
      } else if (fam === "chi2") {
        x1 = Math.max(12, k + 5 * Math.sqrt(2 * k)); x0 = 0; pdf = (x) => Stats.chi2Pdf(x, k);
        info = [["Média", String(k)], ["Variância", String(2 * k)], ["Valor crítico (5%)", fmt(invChi(0.95, k), 3), "hl"]];
      } else {
        x0 = 0; x1 = 5; pdf = (x) => Stats.fPdf(x, d1, d2);
        info = [["Média", d2 > 2 ? fmt(d2 / (d2 - 2)) : "indefinida"], ["Valor crítico (5%)", fmt(Stats.fInv(0.95, d1, d2), 3), "hl"], ["Sob H₀, F fica perto de", "1"]];
      }
      const xs = range(x0 + 1e-6, x1, 300), ys = xs.map(pdf);
      const ymax = Math.min(Math.max(...ys.filter(Number.isFinite)) * 1.1, fam === "f" || fam === "chi2" ? 1.2 : 0.5);
      const p = plot(f.stage, { x0, x1, y0: 0, y1: ymax, label: "Densidade" });
      p.axisX(ticks(x0, x1, 8));
      if (fam === "t") p.path(xs.map((x) => [x, Stats.normPdf(x)]), "viz-curve muted dashed");
      p.area(xs.map((x, i) => [x, Math.min(ys[i], ymax)]), "viz-fill a");
      p.path(xs.map((x, i) => [x, Math.min(ys[i], ymax)]), "viz-curve a");
      if (fam === "t") p.text(x1 - 0.2, ymax * 0.9, "tracejada: normal", "viz-label", "end");
      stats(f.readout, info);
    }
    const invChi = (pr, kk) => { let lo = 0, hi = 1000; for (let i = 0; i < 100; i++) { const mid = (lo + hi) / 2; if (Stats.chi2Cdf(mid, kk) < pr) lo = mid; else hi = mid; } return (lo + hi) / 2; };
    build(); draw();
  }

  /* 3. Teorema do Limite Central ---------------------------------------- */
  const POPS = {
    uniforme: { name: "Uniforme", draw: () => Math.random() * 10, mu: 5, sd: 10 / Math.sqrt(12), lo: 0, hi: 10 },
    exponencial: { name: "Exponencial (assimétrica)", draw: () => -Math.log(1 - Math.random()) * 2, mu: 2, sd: 2, lo: 0, hi: 12 },
    bimodal: { name: "Bimodal", draw: () => (Math.random() < 0.5 ? 3 : 7) + 0.8 * Stats.randn(), mu: 5, sd: Math.sqrt(0.64 + 4), lo: 0, hi: 10 },
    lognormal: { name: "Lognormal (muito assimétrica)", draw: () => Math.exp(0.9 * Stats.randn()), mu: Math.exp(0.405), sd: Math.sqrt((Math.exp(0.81) - 1) * Math.exp(0.81)), lo: 0, hi: 8 }
  };
  function tlc(host) {
    const f = frame(host, "Teorema do Limite Central.", "Escolha uma população nada normal e aumente n: a distribuição das médias vira um sino.");
    let pop = "exponencial", n = 2, means = [];
    const go = () => { const P = POPS[pop]; means = Array.from({ length: 3000 }, () => { let a = 0; for (let i = 0; i < n; i++) a += P.draw(); return a / n; }); draw(); };
    f.controls.append(
      select("População", Object.keys(POPS).map((k) => [k, POPS[k].name]), pop, (v) => { pop = v; go(); }),
      slider("tamanho da amostra (n)", 1, 100, 1, n, (v) => { n = v; go(); }),
      button("Sortear de novo", go)
    );
    function draw() {
      const P = POPS[pop];
      f.stage.textContent = "";
      const wrap = el("div", { class: "viz-two" });
      f.stage.appendChild(wrap);
      const left = el("div"), right = el("div");
      wrap.append(left, right);
      left.appendChild(el("p", { class: "viz-sub", text: "População (dados individuais)" }));
      right.appendChild(el("p", { class: "viz-sub", text: "Médias de 3.000 amostras de tamanho " + n }));
      const popData = Array.from({ length: 6000 }, P.draw);
      const h1 = histogram(popData, P.lo, P.hi, 40);
      const p1 = plot(left, { x0: P.lo, x1: P.hi, y0: 0, y1: Math.max(...h1.map((b) => b.dens)) * 1.15, w: 320, h: 200, label: "Histograma da população" });
      p1.axisX(ticks(P.lo, P.hi, 5));
      h1.forEach((b) => p1.add(s("rect", { x: p1.X(b.a), y: p1.Y(b.dens), width: Math.max(0, p1.X(b.b) - p1.X(b.a) - 1), height: p1.Y(0) - p1.Y(b.dens), class: "viz-bar muted" })));
      const se = P.sd / Math.sqrt(n);
      const h2 = histogram(means, P.lo, P.hi, 60);
      const peak = Math.max(Stats.normPdf(0, 0, se), ...h2.map((b) => b.dens)) * 1.1;
      const p2 = plot(right, { x0: P.lo, x1: P.hi, y0: 0, y1: peak, w: 320, h: 200, label: "Histograma das médias amostrais" });
      p2.axisX(ticks(P.lo, P.hi, 5));
      h2.forEach((b) => p2.add(s("rect", { x: p2.X(b.a), y: p2.Y(b.dens), width: Math.max(0, p2.X(b.b) - p2.X(b.a) - 1), height: p2.Y(0) - p2.Y(b.dens), class: "viz-bar a" })));
      p2.path(range(P.lo, P.hi, 200).map((x) => [x, Stats.normPdf(x, P.mu, se)]), "viz-curve b");
      const sdObs = Math.sqrt(Stats.variance(means));
      stats(f.readout, [["μ da população", fmt(P.mu)], ["σ da população", fmt(P.sd)], ["Média das médias", fmt(Stats.mean(means))], ["EP teórico = σ/√n", fmt(se), "hl"], ["DP observado das médias", fmt(sdObs)]]);
    }
    go();
  }

  /* 4. Intervalos de confiança ------------------------------------------ */
  function ic(host) {
    const f = frame(host, "O que '95% de confiança' quer dizer.", "Cada linha é um IC de uma amostra diferente. A linha vertical é a verdadeira μ = 50.");
    let n = 15, conf = 0.95, total = 0, hits = 0, last = [];
    const MU = 50, SIG = 10;
    function gen() {
      last = Array.from({ length: 40 }, () => {
        const x = Array.from({ length: n }, () => MU + SIG * Stats.randn());
        const m = Stats.mean(x), se = Math.sqrt(Stats.variance(x) / n), t = Stats.tInv(1 - (1 - conf) / 2, n - 1);
        return [m - t * se, m + t * se, m];
      });
      last.forEach((c) => { total++; if (c[0] <= MU && MU <= c[1]) hits++; });
      draw();
    }
    f.controls.append(
      slider("tamanho da amostra (n)", 3, 100, 1, n, (v) => { n = v; total = hits = 0; gen(); }),
      select("Confiança", [["0.9", "90%"], ["0.95", "95%"], ["0.99", "99%"]], String(conf), (v) => { conf = +v; total = hits = 0; gen(); }),
      button("Gerar mais 40 amostras", gen)
    );
    function draw() {
      f.stage.textContent = "";
      const p = plot(f.stage, { x0: 35, x1: 65, y0: 0, y1: 41, h: 360, label: "Intervalos de confiança" });
      p.axisX([35, 40, 45, 50, 55, 60, 65]);
      last.forEach((c, i) => {
        const ok = c[0] <= MU && MU <= c[1];
        p.line(Math.max(35, c[0]), i + 1, Math.min(65, c[1]), i + 1, ok ? "viz-ci" : "viz-ci miss");
        p.circle(c[2], i + 1, 2.5, ok ? "viz-pt small" : "viz-pt small miss");
      });
      p.line(MU, 0, MU, 41, "viz-mean");
      const miss = last.filter((c) => !(c[0] <= MU && MU <= c[1])).length;
      stats(f.readout, [["Nesta rodada, não contêm μ", String(miss) + " de 40"], ["Acumulado: contêm μ", fmt(100 * hits / total, 1) + "%", "hl"], ["Nível nominal", fmt(100 * conf, 0) + "%"]]);
    }
    gen();
  }

  /* 5. p-valor e região crítica ----------------------------------------- */
  function pvalor(host) {
    const f = frame(host, "p-valor: a área além da estatística observada.", "A área colorida é a probabilidade de algo tão ou mais extremo, se H₀ fosse verdadeira.");
    let fam = "z", df = 10, stat = 1.8, tail = "bi", alpha = 0.05;
    const dfBox = el("div");
    f.controls.append(
      select("Distribuição sob H₀", [["z", "Normal (z)"], ["t", "t de Student"]], fam, (v) => { fam = v; dfBox.hidden = v !== "t"; draw(); }),
      dfBox,
      slider("estatística observada", -4, 4, 0.01, stat, (v) => { stat = v; draw(); }, (v) => fmt(v)),
      select("Hipótese alternativa", [["bi", "Bilateral (≠)"], ["dir", "Unilateral à direita (>)"], ["esq", "Unilateral à esquerda (<)"]], tail, (v) => { tail = v; draw(); }),
      select("α", [["0.01", "0,01"], ["0.05", "0,05"], ["0.1", "0,10"]], String(alpha), (v) => { alpha = +v; draw(); })
    );
    dfBox.appendChild(slider("graus de liberdade", 1, 60, 1, df, (v) => { df = v; draw(); }));
    dfBox.hidden = true;
    function draw() {
      f.stage.textContent = "";
      const pdf = fam === "t" ? (x) => Stats.tPdf(x, df) : (x) => Stats.normPdf(x);
      const cdf = fam === "t" ? (x) => Stats.tCdf(x, df) : (x) => Stats.normCdf(x);
      const inv = fam === "t" ? (q) => Stats.tInv(q, df) : (q) => Stats.normInv(q);
      const p = plot(f.stage, { x0: -4.5, x1: 4.5, y0: 0, y1: 0.45, label: "Distribuição sob H0 com área do p-valor" });
      p.axisX([-4, -3, -2, -1, 0, 1, 2, 3, 4]);
      const xs = range(-4.5, 4.5, 360);
      let pval, crit;
      if (tail === "bi") {
        const a = Math.abs(stat);
        pval = 2 * (1 - cdf(a)); crit = inv(1 - alpha / 2);
        p.area(xs.filter((x) => x >= a).map((x) => [x, pdf(x)]), "viz-fill b");
        p.area(xs.filter((x) => x <= -a).map((x) => [x, pdf(x)]), "viz-fill b");
        [crit, -crit].forEach((c) => p.line(c, 0, c, 0.42, "viz-crit"));
      } else if (tail === "dir") {
        pval = 1 - cdf(stat); crit = inv(1 - alpha);
        p.area(xs.filter((x) => x >= stat).map((x) => [x, pdf(x)]), "viz-fill b");
        p.line(crit, 0, crit, 0.42, "viz-crit");
      } else {
        pval = cdf(stat); crit = inv(alpha);
        p.area(xs.filter((x) => x <= stat).map((x) => [x, pdf(x)]), "viz-fill b");
        p.line(crit, 0, crit, 0.42, "viz-crit");
      }
      p.path(xs.map((x) => [x, pdf(x)]), "viz-curve a");
      p.line(stat, 0, stat, pdf(stat) + 0.04, "viz-obs");
      p.text(stat, pdf(stat) + 0.06, "observado", "viz-label");
      const rej = pval <= alpha;
      stats(f.readout, [["p-valor", fmtP(pval), "hl"], ["Valor crítico", (tail === "bi" ? "±" : "") + fmt(Math.abs(crit), 3)], ["Decisão (α = " + fmt(alpha) + ")", rej ? "Rejeita H₀" : "Não rejeita H₀", rej ? "rej" : ""]]);
    }
    draw();
  }

  /* 6. Poder do teste ---------------------------------------------------- */
  function poder(host) {
    const f = frame(host, "Erro tipo I, tipo II e poder.", "Teste bilateral para duas médias independentes (aproximação normal).");
    let d = 0.5, n = 30, alpha = 0.05;
    f.controls.append(
      slider("tamanho do efeito (d de Cohen)", 0, 1.5, 0.05, d, (v) => { d = v; draw(); }, (v) => fmt(v)),
      slider("n por grupo", 4, 200, 1, n, (v) => { n = v; draw(); }),
      select("α", [["0.01", "0,01"], ["0.05", "0,05"], ["0.1", "0,10"]], String(alpha), (v) => { alpha = +v; draw(); })
    );
    function draw() {
      f.stage.textContent = "";
      const delta = d * Math.sqrt(n / 2), z = Stats.normInv(1 - alpha / 2);
      const x1 = Math.max(5, delta + 4);
      const p = plot(f.stage, { x0: -4, x1, y0: 0, y1: 0.45, label: "Distribuições sob H0 e H1" });
      p.axisX(ticks(-4, x1, 8));
      const xs = range(-4, x1, 400);
      p.area(xs.filter((x) => x >= z).map((x) => [x, Stats.normPdf(x, delta)]), "viz-fill ok");
      p.area(xs.filter((x) => x < z).map((x) => [x, Stats.normPdf(x, delta)]), "viz-fill warn");
      p.area(xs.filter((x) => x >= z).map((x) => [x, Stats.normPdf(x)]), "viz-fill b");
      p.area(xs.filter((x) => x <= -z).map((x) => [x, Stats.normPdf(x)]), "viz-fill b");
      p.path(xs.map((x) => [x, Stats.normPdf(x)]), "viz-curve a");
      p.path(xs.map((x) => [x, Stats.normPdf(x, delta)]), "viz-curve c");
      p.line(z, 0, z, 0.43, "viz-crit"); p.line(-z, 0, -z, 0.43, "viz-crit");
      p.text(0, 0.42, "H₀", "viz-label strong"); p.text(delta, 0.42, "H₁", "viz-label strong");
      const power = Stats.normCdf(delta - z) + Stats.normCdf(-delta - z);
      stats(f.readout, [["α (erro tipo I)", fmt(alpha)], ["β (erro tipo II)", fmt(1 - power), "warn"], ["Poder = 1 − β", fmt(power), "hl"], ["Deslocamento δ = d·√(n/2)", fmt(delta)]]);
    }
    draw();
  }

  /* 7. Gráfico Q-Q --------------------------------------------------------- */
  function qq(host) {
    const f = frame(host, "Lendo um gráfico Q-Q.", "Se os dados forem normais, os pontos seguem a diagonal.");
    let kind = "normal", n = 40, data = [];
    const gens = {
      normal: () => Stats.randn(),
      direita: () => -Math.log(1 - Math.random()),
      pesadas: () => Stats.randn() / Math.sqrt((Stats.randn() ** 2 + Stats.randn() ** 2 + Stats.randn() ** 2) / 3),
      leves: () => Math.random()
    };
    const hints = {
      normal: "Pontos sobre a reta, com pequena oscilação nas pontas: é o esperado.",
      direita: "Curva em forma de 'U' (côncava para cima): cauda longa à direita, assimetria positiva.",
      pesadas: "Formato de 'S' invertido: pontas fogem da reta para fora. Caudas mais pesadas que a normal.",
      leves: "Formato de 'S': pontas se achatam em direção à reta. Caudas mais leves que a normal."
    };
    const gen = () => { data = Array.from({ length: n }, gens[kind]); draw(); };
    f.controls.append(
      select("Formato dos dados", [["normal", "Normal"], ["direita", "Assimétrica à direita"], ["pesadas", "Caudas pesadas (t com 3 gl)"], ["leves", "Caudas leves (uniforme)"]], kind, (v) => { kind = v; gen(); }),
      slider("n", 10, 500, 5, n, (v) => { n = v; gen(); }),
      button("Nova amostra", gen)
    );
    function draw() {
      f.stage.textContent = "";
      const m = Stats.mean(data), sd = Math.sqrt(Stats.variance(data));
      const z = data.map((x) => (x - m) / sd).sort((a, b) => a - b);
      const th = z.map((_, i) => Stats.normInv((i + 1 - 0.375) / (n + 0.25)));
      const lim = Math.max(3.2, Math.min(6, Math.max(...z.map(Math.abs)) + 0.3));
      const p = plot(f.stage, { x0: -lim, x1: lim, y0: -lim, y1: lim, w: 420, h: 380, m: { l: 30, b: 30 }, label: "Gráfico Q-Q normal" });
      p.axisX(ticks(-lim, lim, 6));
      ticks(-lim, lim, 6).forEach((t) => p.text(-lim, t, String(t), "viz-tick", "start").setAttribute("x", 2));
      p.line(-lim, -lim, lim, lim, "viz-mean");
      z.forEach((v, i) => p.circle(th[i], v, n > 200 ? 2 : 3.5, "viz-pt small"));
      f.readout.textContent = "";
      f.readout.appendChild(el("p", { class: "viz-hint" }, [el("strong", { text: "Eixo x: " }), "quantis teóricos da normal. ", el("strong", { text: "Eixo y: " }), "quantis observados (padronizados). " + hints[kind]]));
    }
    gen();
  }

  /* 8. ANOVA: decomposição da variância ---------------------------------- */
  function anova(host) {
    const f = frame(host, "ANOVA: sinal (entre) versus ruído (dentro).", "Afaste as médias ou aumente o espalhamento e veja SQ e F mudarem.");
    let gap = 1, spread = 1, noise = [];
    const N = 10, K = 3;
    const fresh = () => { noise = Array.from({ length: K }, () => { const a = Array.from({ length: N }, Stats.randn); const m = Stats.mean(a); const sd = Math.sqrt(Stats.variance(a)); return a.map((x) => (x - m) / sd); }); draw(); };
    f.controls.append(
      slider("distância entre as médias", 0, 3, 0.05, gap, (v) => { gap = v; draw(); }, (v) => fmt(v)),
      slider("espalhamento dentro dos grupos", 0.2, 3, 0.05, spread, (v) => { spread = v; draw(); }, (v) => fmt(v)),
      button("Nova amostra", fresh)
    );
    function draw() {
      f.stage.textContent = "";
      const groups = noise.map((g, k) => g.map((e) => 10 + (k - 1) * gap + spread * e));
      const all = groups.flat(), gm = Stats.mean(all);
      const means = groups.map(Stats.mean);
      const sqe = groups.reduce((a, g, k) => a + g.length * (means[k] - gm) ** 2, 0);
      const sqd = groups.reduce((a, g, k) => a + g.reduce((b, x) => b + (x - means[k]) ** 2, 0), 0);
      const gle = K - 1, gld = all.length - K, qme = sqe / gle, qmd = sqd / gld, F = qme / qmd, pv = 1 - Stats.fCdf(F, gle, gld);
      const lo = Math.min(...all) - 1, hi = Math.max(...all) + 1;
      const p = plot(f.stage, { x0: 0, x1: 4, y0: lo, y1: hi, h: 280, m: { l: 10, b: 24 }, label: "Pontos por grupo" });
      groups.forEach((g, k) => {
        g.forEach((x, i) => p.circle(k + 1 + (i - N / 2) * 0.035, x, 4, "viz-pt g" + k));
        p.line(k + 0.65, means[k], k + 1.35, means[k], "viz-gmean g" + k);
        p.text(k + 1, lo + 0.2, "Grupo " + "ABC"[k], "viz-label");
      });
      p.line(0.3, gm, 3.7, gm, "viz-mean");
      p.text(3.72, gm, "média geral", "viz-label", "start");
      const bar = el("div", { class: "ss-bar", role: "img", "aria-label": "Proporção da SQ total" }, [
        el("span", { class: "between", style: `width:${100 * sqe / (sqe + sqd)}%`, text: "entre" }),
        el("span", { class: "within", style: `width:${100 * sqd / (sqe + sqd)}%`, text: "dentro" })
      ]);
      f.stage.appendChild(bar);
      stats(f.readout, [["SQ entre", fmt(sqe)], ["SQ dentro", fmt(sqd)], ["QM entre = SQ/" + gle, fmt(qme)], ["QM dentro = SQ/" + gld, fmt(qmd)], ["F = QMe / QMd", fmt(F), "hl"], ["p-valor", fmtP(pv)], ["η²", fmt(sqe / (sqe + sqd))]]);
    }
    fresh();
  }

  /* 9. Correlação e regressão -------------------------------------------- */
  function correlacao(host) {
    const f = frame(host, "Correlação e reta de mínimos quadrados.", "Mude ρ e n e veja r, r² e a reta. Experimente um outlier.");
    let rho = 0.6, n = 40, outlier = false, base = [];
    const fresh = () => { base = Array.from({ length: 200 }, () => [Stats.randn(), Stats.randn()]); draw(); };
    const chk = el("input", { type: "checkbox", onchange: (e) => { outlier = e.target.checked; draw(); } });
    f.controls.append(
      slider("correlação na população (ρ)", -1, 1, 0.05, rho, (v) => { rho = v; draw(); }, (v) => fmt(v)),
      slider("n", 5, 200, 1, n, (v) => { n = v; draw(); }),
      el("label", { class: "ctl check" }, [chk, el("span", { text: "Adicionar um outlier" })]),
      button("Nova amostra", fresh)
    );
    function draw() {
      f.stage.textContent = "";
      const pts = base.slice(0, n).map((q) => [50 + 10 * q[0], 50 + 10 * (rho * q[0] + Math.sqrt(1 - rho * rho) * q[1])]);
      if (outlier) pts.push([90, 10]);
      const xs = pts.map((q) => q[0]), ys = pts.map((q) => q[1]);
      const mx = Stats.mean(xs), my = Stats.mean(ys);
      let sxy = 0, sxx = 0, syy = 0;
      pts.forEach((q) => { sxy += (q[0] - mx) * (q[1] - my); sxx += (q[0] - mx) ** 2; syy += (q[1] - my) ** 2; });
      const r = sxy / Math.sqrt(sxx * syy), b1 = sxy / sxx, b0 = my - b1 * mx;
      const m = pts.length, t = r * Math.sqrt(m - 2) / Math.sqrt(1 - r * r), pv = 2 * (1 - Stats.tCdf(Math.abs(t), m - 2));
      const p = plot(f.stage, { x0: 10, x1: 95, y0: 0, y1: 100, h: 320, m: { l: 10, b: 28 }, label: "Diagrama de dispersão" });
      p.axisX([10, 30, 50, 70, 90]);
      pts.forEach((q, i) => p.circle(q[0], q[1], 3.5, outlier && i === pts.length - 1 ? "viz-pt miss" : "viz-pt small"));
      p.line(10, b0 + b1 * 10, 95, b0 + b1 * 95, "viz-reg");
      stats(f.readout, [["r de Pearson", fmt(r, 3), "hl"], ["r²", fmt(r * r, 3)], ["Reta", "ŷ = " + fmt(b0, 1) + " + " + fmt(b1, 3) + "·x"], ["t (gl = " + (m - 2) + ")", fmt(t)], ["p-valor", fmtP(pv)]]);
    }
    fresh();
  }

  /* 10. Fluxograma: qual teste usar? -------------------------------------- */
  const TREE = {
    inicio: { q: "Qual é o objetivo da análise?", o: [
      ["Comparar grupos (médias ou posições)", "ngrupos"],
      ["Comparar uma amostra com um valor de referência", "uma"],
      ["Associação entre duas variáveis categóricas", "cat"],
      ["Relação entre duas variáveis quantitativas", "rel"]] },
    uma: { q: "Que tipo de dado você tem?", o: [
      ["Quantitativo, aproximadamente normal (ou n grande)", "R:t1"],
      ["Quantitativo ou ordinal, claramente não normal e n pequeno", "R:wil1"],
      ["Proporções ou contagens por categoria", "R:aderencia"]] },
    ngrupos: { q: "Quantos grupos?", o: [["Dois", "dois"], ["Três ou mais", "kgrupos"]] },
    dois: { q: "Os grupos são independentes ou pareados (mesmos sujeitos / pares)?", o: [["Independentes", "dois_ind"], ["Pareados", "dois_par"]] },
    dois_ind: { q: "A variável é quantitativa e aproximadamente normal em cada grupo (ou n grande)?", o: [["Sim", "dois_var"], ["Não, ou é ordinal", "R:mw"]] },
    dois_var: { q: "As variâncias dos grupos são parecidas?", o: [["Sim, claramente", "R:student"], ["Não, ou não tenho certeza", "R:welch"]] },
    dois_par: { q: "As diferenças entre os pares são aproximadamente normais (ou n grande)?", o: [["Sim", "R:tpar"], ["Não, ou os dados são ordinais", "R:wilpar"]] },
    kgrupos: { q: "Os grupos são independentes ou medidas repetidas nos mesmos sujeitos?", o: [["Independentes", "k_desenho"], ["Medidas repetidas", "k_rep"]] },
    k_desenho: { q: "Quantos fatores ou covariáveis?", o: [["Um fator", "k_norm"], ["Dois fatores (ex.: dieta × sexo)", "R:twoway"], ["Um fator + covariável contínua", "R:ancova"]] },
    k_norm: { q: "Os resíduos/grupos são aproximadamente normais (ou n grande)?", o: [["Sim", "k_var"], ["Não, ou os dados são ordinais", "R:kw"]] },
    k_var: { q: "As variâncias dos grupos são homogêneas?", o: [["Sim", "R:anova"], ["Não", "R:welchanova"]] },
    k_rep: { q: "Os dados são aproximadamente normais?", o: [["Sim", "R:rmanova"], ["Não, ou ordinais", "R:friedman"]] },
    cat: { q: "As observações são independentes ou pareadas (antes/depois no mesmo sujeito)?", o: [["Independentes", "cat_esp"], ["Pareadas (tabela 2×2)", "R:mcnemar"]] },
    cat_esp: { q: "Todas as frequências esperadas são ≥ 5?", o: [["Sim", "R:qui"], ["Não", "R:fisher"]] },
    rel: { q: "A relação é linear, sem outliers fortes e com dados quantitativos?", o: [["Sim", "rel_obj"], ["Não: é monotônica, ordinal ou tem outliers", "R:spearman"]] },
    rel_obj: { q: "Você quer medir a força da associação ou prever Y a partir de X?", o: [["Medir a força", "R:pearson"], ["Prever / estimar o efeito de X", "R:regressao"]] }
  };
  const RESULTS = {
    t1: ["t de uma amostra", "m6", "stats.ttest_1samp(x, popmean=100)", "Analyze › Compare Means › One-Sample T Test"],
    wil1: ["Wilcoxon de uma amostra (ou teste do sinal)", "m7", "stats.wilcoxon(x - 100)", "Analyze › Nonparametric Tests › One Sample"],
    aderencia: ["Qui-quadrado de aderência (ou binomial)", "m10", "stats.chisquare(obs, f_exp=esp)", "Analyze › Nonparametric Tests › Legacy Dialogs › Chi-square"],
    mw: ["Mann-Whitney U", "m7", "stats.mannwhitneyu(a, b)", "Nonparametric Tests › Legacy Dialogs › 2 Independent Samples"],
    student: ["t de Student (variâncias iguais). O de Welch também serve e é mais seguro.", "m6", "stats.ttest_ind(a, b)", "Compare Means › Independent-Samples T Test (linha 'Equal variances assumed')"],
    welch: ["t de Welch", "m6", "stats.ttest_ind(a, b, equal_var=False)", "Compare Means › Independent-Samples T Test (linha 'not assumed')"],
    tpar: ["t pareado", "m6", "stats.ttest_rel(antes, depois)", "Compare Means › Paired-Samples T Test"],
    wilpar: ["Wilcoxon pareado (postos sinalizados)", "m7", "stats.wilcoxon(antes, depois)", "Nonparametric Tests › Legacy Dialogs › 2 Related Samples"],
    anova: ["ANOVA de um fator + post-hoc de Tukey", "m8", "stats.f_oneway(a, b, c)", "Compare Means › One-Way ANOVA"],
    welchanova: ["ANOVA de Welch + post-hoc de Games-Howell", "m9", "pg.welch_anova(dv='y', between='g', data=df)", "One-Way ANOVA › Options › Welch"],
    kw: ["Kruskal-Wallis + post-hoc de Dunn", "m9", "stats.kruskal(a, b, c)", "Nonparametric Tests › Legacy Dialogs › K Independent Samples"],
    twoway: ["ANOVA de dois fatores (com interação)", "m9", "ols('y ~ C(A) * C(B)', df)", "General Linear Model › Univariate"],
    ancova: ["ANCOVA", "m9", "pg.ancova(dv='y', covar='idade', between='g', data=df)", "General Linear Model › Univariate (Covariate)"],
    rmanova: ["ANOVA de medidas repetidas (verificar esfericidade)", "m9", "pg.rm_anova(dv='y', within='tempo', subject='id', data=df)", "General Linear Model › Repeated Measures"],
    friedman: ["Friedman", "m9", "stats.friedmanchisquare(t1, t2, t3)", "Nonparametric Tests › Legacy Dialogs › K Related Samples"],
    mcnemar: ["McNemar", "m10", "mcnemar(tabela, exact=True)", "Descriptive Statistics › Crosstabs › Statistics › McNemar"],
    qui: ["Qui-quadrado de independência + V de Cramér", "m10", "stats.chi2_contingency(tabela)", "Descriptive Statistics › Crosstabs › Statistics › Chi-square"],
    fisher: ["Teste exato de Fisher", "m10", "stats.fisher_exact(tabela)", "Crosstabs (para 2×2 o SPSS mostra o Fisher automaticamente)"],
    spearman: ["Correlação de Spearman (ou Kendall)", "m11", "stats.spearmanr(x, y)", "Analyze › Correlate › Bivariate › Spearman"],
    pearson: ["Correlação de Pearson", "m11", "stats.pearsonr(x, y)", "Analyze › Correlate › Bivariate › Pearson"],
    regressao: ["Regressão linear simples", "m11", "smf.ols('y ~ x', df).fit()", "Analyze › Regression › Linear"]
  };
  function fluxo(host) {
    const box = el("div", { class: "flow" });
    host.appendChild(box);
    let path = [];
    function draw() {
      box.textContent = "";
      const trail = el("ol", { class: "flow-trail" });
      path.forEach((st) => trail.appendChild(el("li", null, [el("span", { text: TREE[st.node].q + " " }), el("b", { text: st.answer })])));
      if (path.length) box.appendChild(trail);
      const cur = path.length ? path[path.length - 1].next : "inicio";
      if (cur.startsWith("R:")) {
        const r = RESULTS[cur.slice(2)];
        box.appendChild(el("div", { class: "flow-result" }, [
          el("p", { class: "eyebrow", text: "Teste indicado" }),
          el("h3", { text: r[0] }),
          el("p", null, [el("strong", { text: "Python: " }), el("code", { text: r[2] })]),
          el("p", null, [el("strong", { text: "SPSS: " }), r[3]]),
          el("a", { href: "#/m/" + r[1], text: "Rever o módulo correspondente →" })
        ]));
      } else {
        const node = TREE[cur];
        box.appendChild(el("p", { class: "flow-q", text: node.q }));
        box.appendChild(el("div", { class: "flow-opts" }, node.o.map((o) => el("button", { type: "button", class: "opt", text: o[0], onclick: () => { path.push({ node: cur, answer: o[0], next: o[1] }); draw(); } }))));
      }
      if (path.length) box.appendChild(el("div", { class: "row" }, [button("← Voltar", () => { path.pop(); draw(); }), button("Recomeçar", () => { path = []; draw(); })]));
    }
    draw();
  }

  const registry = { variancia, dist, tlc, ic, pvalor, poder, qq, anova, correlacao, fluxo };
  return { mount(name, host) { if (registry[name]) registry[name](host); } };
})();
