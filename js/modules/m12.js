MODULES.push({
  id: "m12", n: 12, short: "Qual teste usar?",
  title: "Qual teste usar? Síntese e estudos de caso",
  sub: "Um fluxograma interativo, uma tabela-resumo e quatro análises completas, da pergunta ao relatório.",
  goals: [
    "Escolher o teste a partir do objetivo, do tipo de variável e do desenho",
    "Seguir uma sequência completa de análise: descrever, verificar pressupostos, testar, medir o efeito, relatar",
    "Redigir resultados de forma completa e honesta"
  ],
  blocks: [
    { h: "As quatro perguntas que decidem o teste" },
    { ol: [
      "**Qual é o objetivo?** Comparar grupos, comparar com um valor de referência, associar categorias, ou relacionar variáveis quantitativas.",
      "**Que tipo de variável é a resposta?** Quantitativa (intervalar/razão), ordinal ou nominal (Módulo 0).",
      "**Qual é o desenho?** Quantos grupos? São independentes ou pareados/medidas repetidas? (Módulos 6 e 9)",
      "**Os pressupostos são razoáveis?** Normalidade dos resíduos (considerando o $n$), homogeneidade de variâncias, independência (Módulo 5)."
    ] },
    { h: "Fluxograma interativo" },
    { viz: "fluxo" },
    { h: "Tabela-resumo" },
    { table: { head: ["Objetivo", "Desenho", "Paramétrico", "Alternativa"], rows: [
      ["Média vs. valor de referência", "1 amostra", "t de uma amostra", "Wilcoxon de uma amostra / sinal"],
      ["Comparar 2 grupos", "Independentes", "t de Welch (ou Student)", "Mann-Whitney U"],
      ["Comparar 2 condições", "Pareados", "t pareado", "Wilcoxon pareado / sinal"],
      ["Comparar 3+ grupos", "Independentes", "ANOVA (+ Tukey) / Welch (+ Games-Howell)", "Kruskal-Wallis (+ Dunn)"],
      ["Comparar 3+ condições", "Medidas repetidas", "ANOVA de MR (+ GG/HF)", "Friedman"],
      ["Dois fatores", "Independentes", "ANOVA de dois fatores", "Permutação / modelos robustos"],
      ["Grupos ajustando covariável", "Independentes", "ANCOVA", "—"],
      ["Associação de categorias", "Independentes", "Qui-quadrado", "Exato de Fisher"],
      ["Associação de categorias", "Pareados", "McNemar", "McNemar exato"],
      ["Relação entre quantitativas", "—", "Pearson / regressão", "Spearman / Kendall"]
    ] } },
    { h: "Um roteiro de análise que vale para todos" },
    { ol: [
      "Defina a pergunta, $H_0$, $H_1$ e α **antes** de olhar os dados (e, se possível, calcule o poder ou o $n$ necessário).",
      "Explore e descreva: tabelas, médias e DPs (ou medianas e AIQ) por grupo, gráficos.",
      "Verifique os pressupostos com gráficos e, se quiser, testes, pesando o tamanho da amostra.",
      "Escolha o teste e aplique-o.",
      "Calcule o tamanho de efeito e o IC.",
      "Se houver mais de dois grupos e o teste global for significativo, faça post-hoc com correção.",
      "Relate tudo: o que foi feito, os números completos e a interpretação prática."
    ] },
    { h: "Estudo de caso 1: três dietas" },
    { box: "exemplo", t: "Perda de peso (kg) em três dietas, 20 pessoas por dieta, grupos independentes (dados ilustrativos)", c: [
      "**Pergunta**: a perda média de peso difere entre as dietas? $H_0$: $\\mu_A = \\mu_B = \\mu_C$.",
      "**Descrição**: A 3,1 (DP 1,2); B 4,0 (DP 1,3); C 5,6 (DP 2,9).",
      "**Pressupostos**: Q-Q dos resíduos razoável; Levene p = 0,002 e DP de C mais que o dobro dos outros → variâncias heterogêneas.",
      "**Teste**: ANOVA de Welch, F(2; 35,1) = 7,9; p = 0,001. **Post-hoc** de Games-Howell: C difere de A (p = 0,002) e de B (p = 0,048); A e B não diferem (p = 0,07).",
      "**Relato**: 'A perda de peso diferiu entre as dietas (ANOVA de Welch, F(2; 35,1) = 7,9, p = 0,001). A dieta C produziu maior perda que A e B (Games-Howell), embora com maior variabilidade entre os participantes.'"
    ] },
    { h: "Estudo de caso 2: ansiedade antes e depois" },
    { box: "exemplo", t: "Escore de ansiedade em 12 participantes antes e depois de uma intervenção (dados ilustrativos)", c: [
      "**Desenho**: pareado (mesmas pessoas). Diferenças muito assimétricas, com dois valores extremos, e $n$ pequeno.",
      "**Teste**: Wilcoxon dos postos sinalizados, em vez do $t$ pareado.",
      "**Relato**: 'Os escores diminuíram após a intervenção (mediana 18 → 12; Wilcoxon, W = 6, p = 0,01, correlação bisserial de postos = 0,85).'"
    ] },
    { h: "Estudo de caso 3: vacina e infecção" },
    { box: "exemplo", t: "Infecção (sim/não) em vacinados e não vacinados", c: [
      "**Desenho**: duas variáveis categóricas, observações independentes → tabela 2×2.",
      "**Verificação**: se alguma frequência esperada for < 5, use o exato de Fisher; caso contrário, o qui-quadrado.",
      "**Relato**: reporte as proporções de infecção em cada grupo, o teste, a razão de chances ou o risco relativo **com IC 95%**."
    ] },
    { h: "Estudo de caso 4: horas de estudo e nota" },
    { box: "exemplo", t: "40 estudantes: horas de estudo semanais e nota final (dados ilustrativos)", c: [
      "**Gráfico primeiro**: dispersão aproximadamente linear, sem outliers fortes.",
      "**Força da associação**: Pearson $r = 0{,}52$, p < 0,001; $r^2 = 0{,}27$.",
      "**Previsão**: regressão $\\widehat{nota} = 4{,}1 + 0{,}35 \\cdot horas$: cada hora a mais por semana associa-se a 0,35 ponto a mais, em média. Verifique os resíduos.",
      "**Cuidado**: é um estudo observacional; não prova que estudar mais **causa** notas maiores (motivação pode ser um confundidor)."
    ] },
    { h: "Como relatar (estilo APA, adaptado)" },
    { list: [
      "Teste $t$: *t*(gl) = valor, p = valor, *d* = valor, IC 95% da diferença [li; ls].",
      "ANOVA: *F*(gl₁, gl₂) = valor, p = valor, η² ou ω² = valor; depois, os post-hoc.",
      "Qui-quadrado: χ²(gl, *N* = n) = valor, p = valor, V = valor.",
      "Correlação: *r*(gl) = valor, p = valor.",
      "Reporte p com 2 ou 3 casas (p = 0,032), use 'p < 0,001' para valores muito pequenos e nunca escreva 'p = 0,000'."
    ] },
    { box: "dica", t: "Agora, o simulado", c: ["O simulado geral sorteia 25 questões de todos os módulos. Use a página **Meu progresso** para ver em que módulos você ainda está abaixo de 70% e o que vale revisar."] }
  ],
  pratica: {
    python: [
      { h: "Um roteiro completo em Python (caso das dietas)", code: `
import numpy as np
import pandas as pd
import pingouin as pg
from scipy import stats

rng = np.random.default_rng(10)
df = pd.DataFrame({
    "dieta": np.repeat(["A", "B", "C"], 20),
    "perda": np.concatenate([rng.normal(3.1, 1.2, 20), rng.normal(4.0, 1.3, 20), rng.normal(5.6, 2.9, 20)]),
})

# 1) Descrever
print(df.groupby("dieta")["perda"].agg(["count", "mean", "std", "median"]))

# 2) Pressupostos
for nome, g in df.groupby("dieta"):
    print(nome, "Shapiro p =", round(stats.shapiro(g["perda"]).pvalue, 3))
print(pg.homoscedasticity(df, dv="perda", group="dieta"))   # Levene

# 3) Teste adequado + efeito
print(pg.welch_anova(dv="perda", between="dieta", data=df))
print(pg.pairwise_gameshowell(dv="perda", between="dieta", data=df))
` }
    ],
    spss: [
      { h: "O mesmo roteiro no SPSS", syntax: `
* 1) Descrever e verificar pressupostos.
EXAMINE VARIABLES=perda BY dieta
  /PLOT BOXPLOT NPPLOT
  /STATISTICS DESCRIPTIVES
  /NOTOTAL.

* 2) Teste, homogeneidade, Welch e post-hoc.
ONEWAY perda BY dieta
  /ES=OVERALL
  /STATISTICS DESCRIPTIVES HOMOGENEITY WELCH
  /POSTHOC=TUKEY GH ALPHA(0.05).
` }
    ]
  },
  ex: [
    { t: "mc", q: "Tempo de reação em dois grupos independentes, 40 por grupo, dados aproximadamente normais, variâncias diferentes. Qual teste?", o: ["t de Welch", "t pareado", "Mann-Whitney obrigatoriamente"], a: 0 },
    { t: "mc", q: "Satisfação (Likert 1–5) em pacientes de três hospitais diferentes. Qual teste?", o: ["Kruskal-Wallis", "ANOVA de medidas repetidas", "McNemar"], a: 0 },
    { t: "mc", q: "Peso de 15 pacientes medido no início, aos 3 e aos 6 meses; resíduos normais. Qual análise?", o: ["ANOVA de medidas repetidas", "ANOVA de um fator para grupos independentes", "Qui-quadrado"], a: 0 },
    { t: "mc", q: "Fumante (sim/não) × câncer de pulmão (sim/não) em 400 pessoas, todos os esperados > 5. Qual teste?", o: ["Qui-quadrado de independência", "t de Student", "Spearman"], a: 0 },
    { t: "mc", q: "Mesma tabela 2×2, mas uma célula tem frequência esperada 2. Qual teste?", o: ["Exato de Fisher", "Qui-quadrado com correção de Yates obrigatoriamente", "McNemar"], a: 0 },
    { t: "mc", q: "Comparar a glicemia média de uma amostra com o valor de referência 100 mg/dL. Qual teste?", o: ["t de uma amostra", "t pareado", "ANOVA"], a: 0 },
    { t: "mc", q: "Dor antes e depois de um procedimento em 10 pacientes; as diferenças são muito assimétricas. Qual teste?", o: ["Wilcoxon dos postos sinalizados", "t independente", "Kruskal-Wallis"], a: 0 },
    { t: "mc", q: "Efeito de 3 tipos de fertilizante e 2 regimes de irrigação na produção, incluindo se o efeito do fertilizante depende da irrigação. Qual análise?", o: ["ANOVA de dois fatores com interação", "Duas ANOVAs de um fator separadas", "Correlação de Pearson"], a: 0 },
    { t: "mc", q: "Relação entre idade e pressão arterial, relação linear e sem outliers, querendo prever a pressão. Qual análise?", o: ["Regressão linear simples", "Qui-quadrado", "Mann-Whitney"], a: 0 },
    { t: "mc", q: "Quatro tratamentos aplicados aos mesmos sujeitos, resposta ordinal. Qual teste?", o: ["Friedman", "Kruskal-Wallis", "ANOVA de Welch"], a: 0 },
    { t: "mc", q: "Comparar três dietas controlando o peso inicial dos participantes. Qual análise?", o: ["ANCOVA", "Friedman", "McNemar"], a: 0 },
    { t: "mc", q: "Verificar se a proporção de canhotos numa amostra difere dos 10% esperados na população. Qual teste?", o: ["Qui-quadrado de aderência (ou teste binomial)", "Qui-quadrado de independência", "t de Student"], a: 0 },
    { t: "mc", q: "Qual destas frases de relato está completa e correta?", o: ["t(38) = 2,45; p = 0,019; d = 0,77; IC 95% da diferença [0,4; 4,1]", "O resultado foi significativo (p = 0,000)", "p < 0,05, portanto o efeito é grande"], a: 0 }
  ]
});
