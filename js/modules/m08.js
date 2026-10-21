MODULES.push({
  id: "m8", n: 8, short: "ANOVA",
  title: "ANOVA: análise de variância",
  sub: "Comparar três ou mais médias decompondo a variância: a tabela da ANOVA, o teste F, tamanho de efeito e post-hoc.",
  goals: [
    "Explicar por que não se fazem vários testes $t$",
    "Montar a tabela da ANOVA à mão: SQ, gl, QM e F",
    "Interpretar F como razão sinal/ruído",
    "Calcular $\\eta^2$ e $\\omega^2$",
    "Escolher o teste post-hoc adequado"
  ],
  blocks: [
    { h: "Por que não vários testes t?" },
    { p: "Com 4 grupos há 6 pares possíveis. Fazendo 6 testes $t$ a α = 0,05, a chance de pelo menos um falso positivo sobe para $1 - 0{,}95^6 \\approx 0{,}26$ (Módulo 4). A ANOVA faz **um único teste global**:" },
    { f: "H_0: \\mu_1 = \\mu_2 = \\dots = \\mu_k \\qquad H_1: \\text{pelo menos uma média difere}" },
    { box: "atencao", t: "H₁ não diz 'todas diferentes'", c: ["Rejeitar $H_0$ só informa que **alguma** média difere de alguma outra. Para saber quais, são necessários testes post-hoc ou contrastes."] },
    { h: "O nome diz tudo: análise da variância" },
    { p: "Apesar de comparar **médias**, a ANOVA trabalha com **variâncias**. É a decomposição que vimos no Módulo 1:" },
    { f: "\\underbrace{\\sum_{j}\\sum_{i}(x_{ij}-\\bar{x})^2}_{SQ_{total}} = \\underbrace{\\sum_{j} n_j(\\bar{x}_j-\\bar{x})^2}_{SQ_{entre}} + \\underbrace{\\sum_{j}\\sum_{i}(x_{ij}-\\bar{x}_j)^2}_{SQ_{dentro}}", leg: [["\\bar{x}", "média geral"], ["\\bar{x}_j", "média do grupo $j$"], ["SQ_{entre}", "variação explicada pelos grupos (o **sinal**)"], ["SQ_{dentro}", "variação dentro dos grupos, ou residual (o **ruído**)"]] },
    { h: "Dos quadrados às variâncias: QM e F" },
    { p: "Dividindo cada SQ pelos seus graus de liberdade obtemos **quadrados médios** (QM), que são estimativas de variância:" },
    { table: { head: ["Fonte", "SQ", "gl", "QM = SQ/gl", "F"], rows: [
      ["Entre grupos", "$SQ_{entre}$", "$k - 1$", "$QM_{entre}$", "$QM_{entre}/QM_{dentro}$"],
      ["Dentro (resíduo)", "$SQ_{dentro}$", "$N - k$", "$QM_{dentro}$", ""],
      ["Total", "$SQ_{total}$", "$N - 1$", "", ""]
    ] } },
    { box: "intuicao", t: "Por que F ≈ 1 quando H₀ é verdadeira", c: [
      "$QM_{dentro}$ estima $\\sigma^2$ **sempre**, existam ou não diferenças entre grupos, porque só olha a variação de cada valor em torno da média do seu próprio grupo.",
      "$QM_{entre}$ estima $\\sigma^2$ **se $H_0$ for verdadeira**, porque aí as médias dos grupos só variam por acaso, com variância $\\sigma^2/n$. Se as médias realmente diferem, $QM_{entre}$ estima $\\sigma^2$ **mais** algo positivo.",
      "Logo, sob $H_0$, $F$ fica perto de 1; valores muito maiores que 1 são evidência contra $H_0$. A distribuição de referência é a $F_{k-1,\\,N-k}$."
    ] },
    { viz: "anova" },
    { box: "exemplo", t: "Tabela da ANOVA à mão", c: [
      "Três grupos de 4: A = {4, 5, 6, 5} (média 5), B = {7, 8, 6, 7} (média 7), C = {9, 10, 9, 8} (média 9). Média geral = 7.",
      "$SQ_{entre} = 4(5-7)^2 + 4(7-7)^2 + 4(9-7)^2 = 32$.",
      "$SQ_{dentro}$: em A, $1+0+1+0 = 2$; em B, $0+1+1+0 = 2$; em C, $0+1+0+1 = 2$. Total = 6.",
      "$QM_{entre} = 32/2 = 16$; $QM_{dentro} = 6/9 = 0{,}667$; $F = 24$; $F_{2,9}$ → p ≈ 0,0002."
    ] },
    { table: { head: ["Fonte", "SQ", "gl", "QM", "F", "p"], rows: [["Entre", "32", "2", "16,00", "24,0", "0,0002"], ["Dentro", "6", "9", "0,667", "", ""], ["Total", "38", "11", "", "", ""]] } },
    { h: "Tamanho de efeito" },
    { f: "\\eta^2 = \\frac{SQ_{entre}}{SQ_{total}} \\qquad \\omega^2 = \\frac{SQ_{entre} - (k-1)\\,QM_{dentro}}{SQ_{total} + QM_{dentro}}" },
    { p: "$\\eta^2$ é a proporção da variação total explicada pelos grupos (no exemplo, 32/38 = 0,84). É otimista (viesado para cima) em amostras pequenas; $\\omega^2$ corrige isso (0,79 no exemplo). Referências aproximadas: 0,01 pequeno, 0,06 médio, 0,14 grande." },
    { h: "Pressupostos" },
    { list: [
      "**Independência** das observações.",
      "**Normalidade dos resíduos** (ou de cada grupo). Com grupos de tamanho igual e $n$ moderado, a ANOVA é bastante robusta.",
      "**Homogeneidade de variâncias**. A violação é mais grave com tamanhos de grupo **desiguais**; nesse caso use a ANOVA de Welch (Módulo 9)."
    ] },
    { h: "Post-hoc: quais grupos diferem?" },
    { table: { head: ["Procedimento", "Quando usar"], rows: [
      ["**Tukey HSD**", "Todas as comparações par a par, variâncias homogêneas. O mais usado."],
      ["**Bonferroni / Holm**", "Poucas comparações escolhidas; Holm é sempre preferível ao Bonferroni puro."],
      ["**Dunnett**", "Comparar cada tratamento com **um controle**."],
      ["**Games-Howell**", "Todas as comparações quando as variâncias **não** são homogêneas."],
      ["**Scheffé**", "Qualquer contraste, inclusive combinações (ex.: média de A e B vs. C); muito conservador."]
    ] } },
    { box: "dica", t: "Contrastes planejados", c: ["Se as hipóteses específicas existiam **antes** da coleta (ex.: 'os dois tratamentos novos, juntos, diferem do padrão?'), use contrastes planejados: combinações das médias com pesos que somam zero, como (½, ½, −1). Testam exatamente a pergunta de interesse, com mais poder."] },
    { h: "Ligações com o que já vimos" },
    { list: ["Com **dois grupos**, a ANOVA e o $t$ de Student são o mesmo teste: $F = t^2$ e os p-valores são idênticos.", "A ANOVA é um caso particular do **modelo linear**: uma regressão com variáveis indicadoras para os grupos (Módulo 11)."] },
    { box: "erro", t: "Fazer post-hoc com F não significativo", c: ["Se o $F$ global não rejeita $H_0$, procurar diferenças par a par em seguida é, em geral, pescar resultados. A exceção são contrastes planejados a priori, que não dependem do $F$ global."] }
  ],
  pratica: {
    python: [
      { h: "ANOVA de um fator", code: `
from scipy import stats

A = [4, 5, 6, 5]
B = [7, 8, 6, 7]
C = [9, 10, 9, 8]
print(stats.f_oneway(A, B, C))      # F = 24.0, p = 0.00025
` },
      { h: "Tabela completa com statsmodels e post-hoc de Tukey", code: `
import pandas as pd
import statsmodels.api as sm
from statsmodels.formula.api import ols
from statsmodels.stats.multicomp import pairwise_tukeyhsd

df = pd.DataFrame({
    "y": [4, 5, 6, 5, 7, 8, 6, 7, 9, 10, 9, 8],
    "grupo": ["A"] * 4 + ["B"] * 4 + ["C"] * 4,
})
modelo = ols("y ~ C(grupo)", data=df).fit()
tabela = sm.stats.anova_lm(modelo, typ=2)
print(tabela)

tabela["eta2"] = tabela["sum_sq"] / tabela["sum_sq"].sum()
print(tabela)

print(pairwise_tukeyhsd(df["y"], df["grupo"]))
` },
      { h: "Com pingouin (efeito, Tukey e Games-Howell)", code: `
import pandas as pd
import pingouin as pg

df = pd.DataFrame({
    "y": [4, 5, 6, 5, 7, 8, 6, 7, 9, 10, 9, 8],
    "grupo": ["A"] * 4 + ["B"] * 4 + ["C"] * 4,
})
print(pg.anova(dv="y", between="grupo", data=df, detailed=True))   # inclui np2
print(pg.pairwise_tukey(dv="y", between="grupo", data=df))
print(pg.pairwise_gameshowell(dv="y", between="grupo", data=df))
` }
    ],
    spss: [
      { h: "ANOVA de um fator", p: "Em **Post Hoc** escolha Tukey (variâncias iguais) e Games-Howell (não iguais); em **Options** marque Descriptive, Homogeneity of variance test e Welch. A partir da versão 27, marque *Estimate effect size for overall tests* para obter $\\eta^2$ e $\\omega^2$.", menu: "Analyze › Compare Means › One-Way ANOVA…", syntax: `
ONEWAY y BY grupo
  /ES=OVERALL
  /STATISTICS DESCRIPTIVES HOMOGENEITY WELCH
  /PLOT MEANS
  /POSTHOC=TUKEY GH DUNNETT ALPHA(0.05).
` },
      { h: "Pelo modelo linear geral", p: "Dá a mesma ANOVA com mais opções (eta parcial, gráficos de perfil, contrastes).", menu: "Analyze › General Linear Model › Univariate…", syntax: `
UNIANOVA y BY grupo
  /POSTHOC=grupo(TUKEY GH)
  /PRINT=ETASQ DESCRIPTIVE HOMOGENEITY
  /DESIGN=grupo.
` }
    ]
  },
  ex: [
    { t: "num", q: "Com 4 grupos, fazendo todos os testes $t$ par a par a α = 0,05, qual é a chance de pelo menos um falso positivo? (três casas)", a: 0.265, tol: 0.005, ex: "6 comparações: $1 - 0{,}95^6$." },
    { t: "num", q: "Quantas comparações par a par existem entre 5 grupos?", a: 10, tol: 0.001, ex: "$k(k-1)/2 = 5 \\cdot 4/2$." },
    { t: "mc", q: "Na ANOVA, a hipótese alternativa é…", o: ["pelo menos uma média difere das demais", "todas as médias são diferentes entre si", "as variâncias são diferentes"], a: 0 },
    { t: "num", q: "ANOVA com $k = 4$ grupos e $N = 40$ observações. Quantos gl tem o fator (entre)?", a: 3, tol: 0.001 },
    { t: "num", q: "E quantos gl tem o resíduo (dentro)?", a: 36, tol: 0.001 },
    { t: "num", q: "$QM_{entre} = 30$ e $QM_{dentro} = 6$. Quanto vale $F$?", a: 5, tol: 0.001 },
    { t: "num", q: "$SQ_{entre} = 32$ e $SQ_{total} = 38$. Quanto vale $\\eta^2$? (três casas)", a: 0.842, tol: 0.005 },
    { t: "num", q: "Tabela: $SQ_{entre} = 60$ (gl 2), $SQ_{dentro} = 270$ (gl 27). Quanto vale $F$?", a: 3, tol: 0.001 },
    { t: "mc", q: "Um valor de $F$ próximo de 1 indica que…", o: ["a variação entre grupos é do tamanho esperado só pelo acaso", "as médias são muito diferentes", "as variâncias são heterogêneas"], a: 0 },
    { t: "mc", q: "Você quer comparar três tratamentos novos com um único grupo controle. Qual post-hoc?", o: ["Dunnett", "Scheffé", "Games-Howell"], a: 0 },
    { t: "mc", q: "As variâncias dos grupos são claramente diferentes. Qual post-hoc par a par usar?", o: ["Games-Howell", "Tukey HSD", "Nenhum"], a: 0 },
    { t: "tf", q: "Com apenas dois grupos, a ANOVA dá $F = t^2$ e o mesmo p-valor do teste $t$ de Student.", a: true },
    { t: "mc", q: "Interprete:", out: "F(2, 27) = 3.00, p = 0.066, eta2 = 0.18", o: ["Não se rejeita $H_0$ a 5%; não se fazem post-hoc exploratórios, mas o efeito estimado não é desprezível e o estudo pode ter pouco poder", "Rejeita-se $H_0$, porque $\\eta^2 > 0{,}14$", "Os três grupos são comprovadamente iguais"], a: 0 },
    { t: "mc", q: "Por que $QM_{dentro}$ é uma boa estimativa do ruído $\\sigma^2$ mesmo quando $H_0$ é falsa?", o: ["Porque mede só a variação de cada valor em torno da média do próprio grupo, que não depende das diferenças entre grupos", "Porque sempre vale 1", "Porque usa a média geral"], a: 0 }
  ]
});
