MODULES.push({
  id: "m6", n: 6, short: "Testes t",
  title: "Comparando uma ou duas médias: os testes t",
  sub: "z × t, t de uma amostra, t de Student, t de Welch e t pareado, com tamanho de efeito e poder.",
  goals: [
    "Saber quando usar $z$ e quando usar $t$",
    "Calcular e interpretar os três testes $t$",
    "Escolher entre Student e Welch e entender por que Welch é um bom padrão",
    "Entender por que o desenho pareado é mais poderoso",
    "Reportar $d$ de Cohen e o IC da diferença"
  ],
  blocks: [
    { h: "z ou t?" },
    { p: "Se conhecêssemos $\\sigma$ da população, a estatística $(\\bar{x}-\\mu_0)/(\\sigma/\\sqrt{n})$ seria exatamente normal: é o **teste z**. Na prática, $\\sigma$ quase nunca é conhecido; usamos $s$, que tem sua própria variabilidade, e a estatística passa a seguir a **distribuição $t$** com $n - 1$ graus de liberdade (Módulo 2). Com $n$ grande, $t$ e $z$ praticamente coincidem, mas usar $t$ nunca é errado." },
    { h: "1. t de uma amostra" },
    { p: "Compara a média de uma amostra com um valor de referência $\\mu_0$ (um valor da literatura, um limite legal, um valor teórico)." },
    { f: "t = \\frac{\\bar{x} - \\mu_0}{s/\\sqrt{n}}, \\qquad gl = n - 1" },
    { box: "exemplo", t: "Glicemia de referência", c: ["$n = 16$, $\\bar{x} = 105$, $s = 8$, $\\mu_0 = 100$.", "EP $= 8/4 = 2$; $t = 5/2 = 2{,}5$; $gl = 15$; p (bilateral) $\\approx 0{,}025$.", "Rejeita-se $H_0$ a 5%: a média é maior que 100."] },
    { h: "2. t para duas amostras independentes" },
    { p: "Compara as médias de dois grupos distintos de sujeitos. O sinal é a diferença das médias; o ruído é o erro-padrão dessa diferença, que soma as incertezas das duas médias (Módulo 1)." },
    { h: "Versão de Student (variâncias iguais)" },
    { f: "s_p^2 = \\frac{(n_1-1)s_1^2 + (n_2-1)s_2^2}{n_1+n_2-2}, \\qquad t = \\frac{\\bar{x}_1-\\bar{x}_2}{s_p\\sqrt{\\frac{1}{n_1}+\\frac{1}{n_2}}}, \\qquad gl = n_1+n_2-2", leg: [["s_p^2", "variância combinada (pooled): média das variâncias ponderada pelos gl"]] },
    { h: "Versão de Welch (variâncias diferentes)" },
    { f: "t = \\frac{\\bar{x}_1-\\bar{x}_2}{\\sqrt{\\frac{s_1^2}{n_1}+\\frac{s_2^2}{n_2}}}", leg: [["gl", "aproximados pela fórmula de Welch-Satterthwaite (em geral não inteiros)"]] },
    { box: "dica", t: "Use Welch como padrão", c: ["Quando as variâncias são iguais, Welch e Student dão resultados quase idênticos. Quando são diferentes, principalmente com grupos de tamanhos diferentes, Student pode errar bastante a taxa de erro tipo I. Por isso, muitos autores recomendam Welch sempre, sem pré-teste de Levene. O R já usa Welch por padrão; no Python e no SPSS é preciso pedir."] },
    { box: "exemplo", t: "Dois grupos", c: [
      "Grupo A: $n = 10$, $\\bar{x} = 24$, $s = 4$. Grupo B: $n = 10$, $\\bar{x} = 20$, $s = 5$.",
      "$s_p^2 = (9 \\cdot 16 + 9 \\cdot 25)/18 = 20{,}5$; $s_p = 4{,}53$.",
      "EP $= 4{,}53 \\cdot \\sqrt{1/10 + 1/10} = 2{,}02$; $t = 4/2{,}02 = 1{,}98$; $gl = 18$; p $\\approx 0{,}064$.",
      "$d = 4/4{,}53 = 0{,}88$: efeito grande, mas não significativo. Com 10 por grupo, o estudo tinha pouco poder; a conclusão honesta é 'inconclusivo', não 'não há diferença'."
    ] },
    { h: "3. t pareado" },
    { p: "Usado quando cada observação de um grupo tem um par natural no outro: o mesmo sujeito antes e depois, olho direito e esquerdo, gêmeos, pares casados por idade e sexo. Calculamos a diferença de cada par e fazemos um **t de uma amostra nas diferenças** com $\\mu_0 = 0$." },
    { f: "t = \\frac{\\bar{d}}{s_d/\\sqrt{n}}, \\qquad gl = n - 1", leg: [["\\bar{d}", "média das diferenças"], ["s_d", "desvio-padrão das diferenças"], ["n", "número de **pares**"]] },
    { box: "intuicao", t: "Por que o pareamento aumenta o poder", c: ["Pessoas diferem muito entre si (idade, genética, hábitos). Num desenho independente, toda essa variação entre sujeitos entra no ruído. Ao trabalhar com diferenças dentro do mesmo sujeito, essa variação **se cancela**, e $s_d$ costuma ser bem menor que $s$ de cada grupo. Menor ruído → maior $t$ → mais poder com o mesmo número de pessoas."] },
    { box: "erro", t: "Analisar dados pareados como independentes", c: ["Usar o $t$ independente em dados antes/depois ignora a correlação entre as medidas: o erro-padrão fica errado e, em geral, perde-se muito poder. O contrário (parear o que não é pareado) também é erro."] },
    { h: "Tamanho de efeito e o que reportar" },
    { list: [
      "Independentes: $d = (\\bar{x}_1 - \\bar{x}_2)/s_p$. Com amostras pequenas, prefira o $g$ de Hedges (o $d$ com correção de viés).",
      "Pareado: $d_z = \\bar{d}/s_d$ (atenção: não é diretamente comparável ao $d$ de grupos independentes).",
      "Reporte sempre: médias e DPs por grupo, a diferença com IC 95%, $t$, gl, p e o tamanho de efeito. Ex.: *t*(18) = 1,98; p = 0,064; *d* = 0,88; IC 95% da diferença [−0,25; 8,25]."
    ] },
    { h: "Tamanho amostral" },
    { p: "Para detectar $d = 0{,}5$ com poder de 80% e α = 0,05 bilateral são necessários cerca de **64 sujeitos por grupo** no desenho independente. Para $d = 0{,}2$, cerca de 394 por grupo. Efeitos pequenos exigem amostras grandes." }
  ],
  pratica: {
    python: [
      { h: "Os três testes t com scipy", code: `
import numpy as np
from scipy import stats

# 1) Uma amostra
glicemia = np.array([98, 112, 104, 109, 101, 95, 115, 107, 103, 110, 99, 106, 108, 102, 111, 100])
print(stats.ttest_1samp(glicemia, popmean=100))

# 2) Duas amostras independentes: Welch (equal_var=False) e Student
a = np.array([28, 22, 25, 19, 30, 24, 21, 27, 23, 21])
b = np.array([18, 24, 15, 22, 19, 26, 14, 21, 17, 24])
print("Welch:  ", stats.ttest_ind(a, b, equal_var=False))
print("Student:", stats.ttest_ind(a, b, equal_var=True))

# 3) Pareado
antes = np.array([140, 135, 150, 128, 145, 138, 152, 141])
depois = np.array([132, 130, 141, 127, 136, 135, 145, 134])
print("Pareado:", stats.ttest_rel(antes, depois))

# Unilateral (H1: média de 'a' maior que a de 'b')
print(stats.ttest_ind(a, b, equal_var=False, alternative="greater"))
` },
      { h: "Com pingouin: IC, d de Cohen e poder numa tabela só", code: `
import numpy as np
import pingouin as pg

a = np.array([28, 22, 25, 19, 30, 24, 21, 27, 23, 21])
b = np.array([18, 24, 15, 22, 19, 26, 14, 21, 17, 24])
print(pg.ttest(a, b, correction=True))          # Welch
print(pg.ttest([140, 135, 150, 128], [132, 130, 141, 127], paired=True))
` },
      { h: "A partir de médias e desvios (sem os dados brutos)", code: `
from scipy import stats
import numpy as np

r = stats.ttest_ind_from_stats(mean1=24, std1=4, nobs1=10, mean2=20, std2=5, nobs2=10)
sp = np.sqrt((9 * 4**2 + 9 * 5**2) / 18)
print(r, "d =", round((24 - 20) / sp, 2))      # t = 1.98, p = 0.064, d = 0.88
` }
    ],
    spss: [
      { h: "t de uma amostra", menu: "Analyze › Compare Means › One-Sample T Test… (Test Value = 100)", syntax: `
T-TEST
  /TESTVAL=100
  /VARIABLES=glicemia
  /CRITERIA=CI(.95).
` },
      { h: "t independente", p: "Em *Grouping Variable*, defina os códigos dos dois grupos. A saída tem **duas linhas**: 'Equal variances assumed' (Student) e 'Equal variances not assumed' (Welch), além do teste de Levene. A partir da versão 27, o SPSS também calcula $d$ de Cohen e $g$ de Hedges (*Estimate effect sizes*).", menu: "Analyze › Compare Means › Independent-Samples T Test…", syntax: `
T-TEST GROUPS=grupo(1 2)
  /VARIABLES=y
  /ES DISPLAY(TRUE)
  /CRITERIA=CI(.95).
` },
      { h: "t pareado", p: "Os dados precisam estar em formato 'largo': uma coluna para cada momento.", menu: "Analyze › Compare Means › Paired-Samples T Test…", syntax: `
T-TEST PAIRS=antes WITH depois (PAIRED)
  /ES DISPLAY(TRUE)
  /CRITERIA=CI(.95).
` }
    ]
  },
  ex: [
    { t: "num", q: "$\\bar{x} = 52$, $\\mu_0 = 50$, $s = 6$, $n = 36$. Qual é a estatística $t$?", a: 2, tol: 0.001 },
    { t: "num", q: "Quantos graus de liberdade tem esse teste?", a: 35, tol: 0.001 },
    { t: "num", q: "$n_1 = n_2 = 10$, $s_1 = 4$, $s_2 = 5$. Qual é a variância combinada $s_p^2$?", a: 20.5, tol: 0.01 },
    { t: "num", q: "Com $\\bar{x}_1 = 24$ e $\\bar{x}_2 = 20$ nesses grupos, qual é o $t$ de Student? (duas casas)", a: 1.98, tol: 0.01 },
    { t: "mc", q: "Os mesmos 20 pacientes foram medidos antes e depois de um tratamento. Qual teste?", o: ["t pareado", "t independente de Welch", "t de uma amostra comparando com zero os valores 'depois'"], a: 0 },
    { t: "mc", q: "Dois grupos independentes com tamanhos bem diferentes (12 e 45) e DPs de 3 e 9. Qual versão do teste $t$?", o: ["Welch", "Student", "Pareado"], a: 0 },
    { t: "num", q: "Diferenças pareadas: $\\bar{d} = 3$, $s_d = 4$, $n = 16$ pares. Qual é o $t$?", a: 3, tol: 0.001 },
    { t: "num", q: "Médias 24 e 20, $s_p = 4{,}53$. Qual é o $d$ de Cohen? (duas casas)", a: 0.88, tol: 0.01 },
    { t: "mc", q: "Por que o desenho pareado costuma ter mais poder que o independente?", o: ["A variação entre sujeitos se cancela nas diferenças, reduzindo o ruído", "Porque tem mais graus de liberdade", "Porque não exige normalidade"], a: 0 },
    { t: "num", q: "Teste $t$ de Student com $n_1 = 12$ e $n_2 = 15$. Quantos gl?", a: 25, tol: 0.001 },
    { t: "mc", q: "Interprete a saída:", out: "t(18) = 1.98, p = 0.064, d = 0.88, IC 95% da diferença [-0.25; 8.25]", o: ["Não significativo a 5%, mas o efeito estimado é grande e o IC é largo: o estudo é inconclusivo, provavelmente por falta de poder", "Prova que os grupos são iguais", "Significativo, porque d > 0,8"], a: 0 },
    { t: "num", q: "O p bilateral foi 0,064. Se o teste unilateral tivesse sido definido **antes** e a diferença estivesse na direção prevista, qual seria o p?", a: 0.032, tol: 0.001 },
    { t: "mc", q: "Quando é adequado usar o teste $z$ em vez do $t$?", o: ["Quando o desvio-padrão populacional $\\sigma$ é conhecido", "Sempre que $n < 30$", "Quando os dados não são normais"], a: 0 },
    { t: "mc", q: "Na saída do SPSS para o $t$ independente, o Levene deu p = 0,01. Qual linha ler (se não usar Welch por padrão)?", o: ["Equal variances not assumed", "Equal variances assumed", "Nenhuma: é preciso usar ANOVA"], a: 0 }
  ]
});
