MODULES.push({
  id: "m9", n: 9, short: "Parentes da ANOVA",
  title: "Parentes e alternativas da ANOVA",
  sub: "Welch, Kruskal-Wallis, medidas repetidas, Friedman, ANOVA de dois fatores, ANCOVA e testes de permutação.",
  goals: [
    "Escolher a ANOVA de Welch quando as variâncias diferem",
    "Usar Kruskal-Wallis com post-hoc de Dunn",
    "Entender esfericidade e as correções da ANOVA de medidas repetidas; usar Friedman",
    "Interpretar efeitos principais e interação numa ANOVA de dois fatores",
    "Saber para que servem a ANCOVA e os testes de permutação"
  ],
  blocks: [
    { h: "1. ANOVA de Welch (variâncias diferentes)" },
    { p: "Assim como o $t$ de Welch, pondera cada grupo pelo inverso da sua variância ($n_j/s_j^2$) e ajusta os graus de liberdade do denominador. Controla bem o erro tipo I quando as variâncias e os tamanhos de grupo diferem, e perde pouco poder quando as variâncias são iguais. O post-hoc correspondente é o **Games-Howell**. A ANOVA de **Brown-Forsythe** (para médias, não confundir com a variante do Levene) é outra alternativa robusta." },
    { h: "2. Kruskal-Wallis (alternativa não paramétrica)" },
    { p: "Generaliza o Mann-Whitney para $k$ grupos: junta todos os dados, atribui postos e verifica se os postos médios dos grupos diferem mais do que o acaso permitiria. A estatística $H$ segue aproximadamente uma $\\chi^2$ com $k - 1$ gl." },
    { f: "H = \\frac{12}{N(N+1)}\\sum_{j=1}^{k}\\frac{R_j^2}{n_j} - 3(N+1)", leg: [["R_j", "soma dos postos do grupo $j$"], ["N", "total de observações"]] },
    { list: ["Post-hoc: **teste de Dunn** com correção (Holm ou Bonferroni). Fazer vários Mann-Whitney sem correção infla o erro tipo I.", "Tamanho de efeito: $\\eta^2_H = (H - k + 1)/(N - k)$ ou $\\varepsilon^2 = H/(N-1)$.", "Mesma ressalva do Mann-Whitney: só compara medianas se as distribuições tiverem formas parecidas."] },
    { h: "3. ANOVA de medidas repetidas" },
    { p: "Os **mesmos sujeitos** são medidos em três ou mais condições ou momentos. Como no $t$ pareado, a variação entre sujeitos é retirada do ruído:" },
    { f: "SQ_{total} = SQ_{sujeitos} + SQ_{\\text{condição}} + SQ_{erro}", leg: [["SQ_{sujeitos}", "diferenças estáveis entre pessoas (removidas do denominador)"], ["SQ_{erro}", "ruído que sobra: interação sujeito × condição"]] },
    { box: "atencao", t: "Esfericidade", c: [
      "Pressuposto específico: as **variâncias das diferenças** entre todos os pares de condições devem ser iguais (Var(T1−T2) = Var(T1−T3) = Var(T2−T3)). Com só duas condições, é automaticamente satisfeito.",
      "**Teste de Mauchly**: $H_0$ é que há esfericidade. Tem pouco poder com $n$ pequeno e é sensível a não normalidade, então muitos preferem olhar diretamente a estimativa $\\varepsilon$.",
      "Correções multiplicam os gl por $\\varepsilon$ (entre $1/(k-1)$ e 1): **Greenhouse-Geisser** (mais conservadora; recomendada se $\\varepsilon < 0{,}75$) e **Huynh-Feldt** (menos conservadora, para $\\varepsilon$ maior)."
    ] },
    { p: "Alternativa moderna: **modelos lineares mistos**, que lidam com dados faltantes, tempos irregulares e estruturas de correlação mais realistas sem exigir esfericidade." },
    { h: "4. Friedman (medidas repetidas, não paramétrico)" },
    { p: "Atribui postos **dentro de cada sujeito** (ex.: a pior condição para aquele sujeito recebe 1) e compara as somas de postos entre condições. A estatística segue aproximadamente $\\chi^2_{k-1}$. Post-hoc: Wilcoxon pareado com correção de Holm, ou testes de Nemenyi/Conover." },
    { h: "5. ANOVA de dois fatores" },
    { p: "Dois fatores ao mesmo tempo (ex.: dieta × sexo). O modelo estima três efeitos: o **efeito principal de A**, o **efeito principal de B** e a **interação A × B**." },
    { f: "SQ_{total} = SQ_A + SQ_B + SQ_{A \\times B} + SQ_{erro}", leg: [["gl_{A\\times B}", "$(a-1)(b-1)$, com $a$ e $b$ níveis"]] },
    { box: "intuicao", t: "Interação", c: [
      "Há interação quando o efeito de um fator **depende** do nível do outro. Ex.: a dieta reduz o peso nos homens, mas não nas mulheres.",
      "No gráfico de perfis (média por combinação), linhas **paralelas** indicam ausência de interação; linhas que se afastam ou se cruzam sugerem interação.",
      "**Interprete a interação primeiro.** Se ela for importante, falar do 'efeito da dieta' em geral pode ser enganoso; analise os **efeitos simples** (o efeito de A dentro de cada nível de B)."
    ] },
    { p: "Com grupos de tamanhos diferentes (desenho desbalanceado), o tipo de soma de quadrados importa: o SPSS usa o **Tipo III** por padrão; muitos estatísticos preferem o **Tipo II** quando não há interação. Desenhos balanceados evitam esse problema." },
    { h: "6. ANCOVA" },
    { p: "Combina ANOVA e regressão: compara grupos **ajustando** por uma covariável contínua (ex.: comparar três dietas controlando o peso inicial). Pode reduzir o ruído (aumentar o poder) e corrigir desequilíbrios. Pressuposto adicional: **homogeneidade das inclinações** (a relação covariável → resposta é a mesma em todos os grupos; verifica-se testando a interação grupo × covariável). A covariável não deve ser afetada pelo tratamento." },
    { h: "7. Testes de permutação e bootstrap" },
    { p: "Se $H_0$ diz que o grupo não importa, os rótulos dos grupos são **intercambiáveis**. Embaralhamos os rótulos milhares de vezes, recalculamos a estatística ($F$, diferença de médias…) e vemos com que frequência um valor tão extremo quanto o observado aparece. Exige pouquíssimos pressupostos e serve para qualquer estatística. O bootstrap (Módulo 3) complementa com intervalos de confiança." },
    { table: { head: ["Situação", "Teste"], rows: [
      ["k grupos independentes, normal, variâncias iguais", "ANOVA + Tukey"],
      ["k grupos independentes, normal, variâncias diferentes", "ANOVA de Welch + Games-Howell"],
      ["k grupos independentes, não normal ou ordinal", "Kruskal-Wallis + Dunn"],
      ["k medidas repetidas, normal", "ANOVA de medidas repetidas (+ GG/HF)"],
      ["k medidas repetidas, não normal ou ordinal", "Friedman"],
      ["Dois fatores", "ANOVA de dois fatores (com interação)"],
      ["Grupos + covariável contínua", "ANCOVA"],
      ["Pressupostos duvidosos, qualquer estatística", "Teste de permutação"]
    ] } }
  ],
  pratica: {
    python: [
      { h: "Welch e Kruskal-Wallis com post-hoc", code: `
import pandas as pd
import pingouin as pg
import scikit_posthocs as sp
from scipy import stats

df = pd.DataFrame({
    "y": [12, 14, 11, 13, 15, 20, 28, 16, 25, 31, 30, 35, 22, 41, 38],
    "g": ["A"] * 5 + ["B"] * 5 + ["C"] * 5,
})
print(pg.welch_anova(dv="y", between="g", data=df))
print(pg.pairwise_gameshowell(dv="y", between="g", data=df))

grupos = [d["y"].values for _, d in df.groupby("g")]
print(stats.kruskal(*grupos))
print(sp.posthoc_dunn(df, val_col="y", group_col="g", p_adjust="holm"))
` },
      { h: "Medidas repetidas e Friedman", p: "Formato 'longo': uma linha por sujeito × momento.", code: `
import pandas as pd
import pingouin as pg
from scipy import stats

longo = pd.DataFrame({
    "id": list(range(1, 9)) * 3,
    "tempo": ["t1"] * 8 + ["t2"] * 8 + ["t3"] * 8,
    "y": [10, 12, 9, 11, 13, 10, 12, 11,
          12, 14, 11, 12, 15, 13, 13, 12,
          15, 16, 13, 15, 18, 15, 16, 14],
})
print(pg.sphericity(data=longo, dv="y", within="tempo", subject="id"))
print(pg.rm_anova(data=longo, dv="y", within="tempo", subject="id", correction=True))

largo = longo.pivot(index="id", columns="tempo", values="y")
print(stats.friedmanchisquare(largo["t1"], largo["t2"], largo["t3"]))
` },
      { h: "Dois fatores, ANCOVA e permutação", code: `
import numpy as np
import pandas as pd
import pingouin as pg
import statsmodels.api as sm
from statsmodels.formula.api import ols
from scipy import stats

rng = np.random.default_rng(3)
df = pd.DataFrame({
    "dieta": np.repeat(["controle", "nova"], 20),
    "sexo": np.tile(np.repeat(["F", "M"], 10), 2),
    "peso_ini": rng.normal(80, 8, 40),
})
efeito = np.where((df["dieta"] == "nova") & (df["sexo"] == "M"), -4, 0)
df["perda"] = 0.05 * df["peso_ini"] + efeito + rng.normal(0, 2, 40)

modelo = ols("perda ~ C(dieta) * C(sexo)", data=df).fit()
print(sm.stats.anova_lm(modelo, typ=2))                   # efeitos principais e interação

print(pg.ancova(data=df, dv="perda", covar="peso_ini", between="dieta"))

a = df.loc[df["dieta"] == "nova", "perda"].values
b = df.loc[df["dieta"] == "controle", "perda"].values
dif = lambda x, y, axis: np.mean(x, axis=axis) - np.mean(y, axis=axis)
print(stats.permutation_test((a, b), dif, n_resamples=9999, random_state=0).pvalue)
` }
    ],
    spss: [
      { h: "ANOVA de Welch", menu: "Analyze › Compare Means › One-Way ANOVA… › Options: Welch, Brown-Forsythe; Post Hoc: Games-Howell", syntax: `
ONEWAY y BY g
  /STATISTICS HOMOGENEITY WELCH BROWNFORSYTHE
  /POSTHOC=GH ALPHA(0.05).
` },
      { h: "Kruskal-Wallis e Friedman", p: "Na interface nova (**Nonparametric Tests › Independent Samples**), o SPSS mostra as comparações par a par de Dunn com p ajustado ao clicar no resultado.", menu: "Analyze › Nonparametric Tests › Legacy Dialogs › K Independent Samples / K Related Samples", syntax: `
NPAR TESTS
  /K-W=y BY g(1 3).

NPAR TESTS
  /FRIEDMAN=t1 t2 t3.
` },
      { h: "ANOVA de medidas repetidas", p: "Dados em formato largo (uma coluna por momento). A saída traz o teste de Mauchly e as linhas *Sphericity Assumed*, *Greenhouse-Geisser* e *Huynh-Feldt*.", menu: "Analyze › General Linear Model › Repeated Measures…", syntax: `
GLM t1 t2 t3
  /WSFACTOR=tempo 3 Polynomial
  /EMMEANS=TABLES(tempo) COMPARE ADJ(BONFERRONI)
  /PRINT=ETASQ DESCRIPTIVE
  /WSDESIGN=tempo.
` },
      { h: "Dois fatores e ANCOVA", menu: "Analyze › General Linear Model › Univariate… (Fixed Factors; Covariate)", syntax: `
UNIANOVA perda BY dieta sexo
  /PLOT=PROFILE(dieta*sexo)
  /PRINT=ETASQ DESCRIPTIVE HOMOGENEITY
  /DESIGN=dieta sexo dieta*sexo.

UNIANOVA perda BY dieta WITH peso_ini
  /EMMEANS=TABLES(dieta) WITH(peso_ini=MEAN)
  /PRINT=ETASQ
  /DESIGN=peso_ini dieta.
` }
    ]
  },
  ex: [
    { t: "mc", q: "Três grupos independentes, dados aproximadamente normais, mas variâncias bem diferentes e tamanhos desiguais. Qual teste?", o: ["ANOVA de Welch", "ANOVA clássica", "Friedman"], a: 0 },
    { t: "mc", q: "Escores ordinais de dor em quatro grupos independentes. Qual teste?", o: ["Kruskal-Wallis", "ANOVA de medidas repetidas", "t pareado"], a: 0 },
    { t: "num", q: "No Kruskal-Wallis com $k = 4$ grupos, quantos gl tem a $\\chi^2$ de referência?", a: 3, tol: 0.001 },
    { t: "mc", q: "Qual é o post-hoc usual após um Kruskal-Wallis significativo?", o: ["Teste de Dunn com correção", "Tukey HSD", "Vários Mann-Whitney sem correção"], a: 0 },
    { t: "mc", q: "Os mesmos 15 pacientes medidos em três momentos, dados normais. Qual análise?", o: ["ANOVA de medidas repetidas", "ANOVA de um fator para grupos independentes", "Kruskal-Wallis"], a: 0 },
    { t: "mc", q: "O pressuposto de esfericidade diz que…", o: ["as variâncias das diferenças entre todos os pares de condições são iguais", "todas as médias são iguais", "os resíduos são normais"], a: 0 },
    { t: "mc", q: "Mauchly significativo e $\\varepsilon = 0{,}62$. O que fazer?", o: ["Usar a correção de Greenhouse-Geisser", "Ignorar e ler a linha 'Sphericity Assumed'", "Trocar por Kruskal-Wallis"], a: 0 },
    { t: "num", q: "Correção de Greenhouse-Geisser com $\\varepsilon = 0{,}6$ sobre gl originais (2; 38). Qual é o novo gl do numerador?", a: 1.2, tol: 0.001 },
    { t: "mc", q: "Alternativa não paramétrica à ANOVA de medidas repetidas:", o: ["Friedman", "Mann-Whitney", "Levene"], a: 0 },
    { t: "mc", q: "Numa ANOVA dieta × sexo, a interação é significativa. Isso significa que…", o: ["o efeito da dieta depende do sexo (e vice-versa)", "dieta e sexo são correlacionados", "os dois efeitos principais são significativos"], a: 0 },
    { t: "num", q: "ANOVA de dois fatores com 3 níveis de A e 2 de B. Quantos gl tem a interação?", a: 2, tol: 0.001 },
    { t: "mc", q: "Para que serve a ANCOVA?", o: ["Comparar grupos ajustando por uma covariável contínua", "Comparar variâncias", "Testar normalidade"], a: 0 },
    { t: "mc", q: "Qual é a ideia central de um teste de permutação?", o: ["Se $H_0$ vale, os rótulos dos grupos são intercambiáveis; embaralhá-los gera a distribuição da estatística sob $H_0$", "Repetir o experimento com novos sujeitos", "Remover os outliers um a um"], a: 0 },
    { t: "mc", q: "No gráfico de perfis de uma ANOVA de dois fatores, linhas paralelas indicam…", o: ["ausência de interação", "interação forte", "que um fator não tem efeito"], a: 0 }
  ]
});
