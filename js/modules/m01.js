MODULES.push({
  id: "m1", n: 1, short: "Variância",
  title: "Variância a fundo",
  sub: "O que a variância mede, por que elevamos ao quadrado, por que dividimos por n − 1, e como ela se decompõe.",
  goals: [
    "Explicar com suas palavras o que é a variância e para que ela serve",
    "Justificar o quadrado dos desvios e o denominador $n - 1$",
    "Calcular variância, desvio-padrão, coeficiente de variação e medidas robustas",
    "Entender a decomposição da soma de quadrados, que é a base da ANOVA"
  ],
  blocks: [
    { h: "O problema: medir o espalhamento" },
    { p: "Os conjuntos {10, 10, 10} e {0, 10, 20} têm a mesma média (10), mas são completamente diferentes. Precisamos de um número que diga **quanto os dados se afastam do centro**. Esse número é o que, nos testes, vai representar o **ruído**: a variação que existiria mesmo sem efeito nenhum." },
    { h: "Primeira tentativa: a média dos desvios" },
    { p: "O desvio de cada observação é $x_i - \\bar{x}$. Mas a soma dos desvios é sempre zero (os positivos e negativos se cancelam), então a média dos desvios não serve. É preciso eliminar o sinal. Há duas opções naturais: o **valor absoluto** ou o **quadrado**." },
    { h: "Por que o quadrado?" },
    { list: [
      "**Matemática conveniente**: $x^2$ é derivável em todo ponto; $|x|$ não é em zero. Isso faz a teoria (mínimos quadrados, distribuições amostrais) funcionar de forma elegante.",
      "**Coerência com a média**: a média é exatamente o valor que minimiza a soma dos quadrados (Módulo 0). Média e variância formam um par natural.",
      "**Aditividade**: para variáveis independentes, $\\operatorname{Var}(X+Y) = \\operatorname{Var}(X) + \\operatorname{Var}(Y)$. Desvios absolutos não somam assim. É essa propriedade que permite **decompor** a variação total em partes.",
      "**Geometria**: a soma de quadrados é o quadrado de uma distância euclidiana (Pitágoras em $n$ dimensões)."
    ] },
    { box: "intuicao", t: "A variância é uma área média", c: [
      "Desenhe, para cada ponto, um quadrado cujo lado é o seu desvio em relação à média. A variância é (quase) a **área média desses quadrados**. Pontos longe da média geram quadrados enormes: por isso a variância é sensível a valores extremos.",
      "Experimente abaixo."
    ] },
    { viz: "variancia" },
    { h: "As fórmulas" },
    { f: "\\sigma^2 = \\frac{1}{N}\\sum_{i=1}^{N}(x_i-\\mu)^2 \\qquad s^2 = \\frac{1}{n-1}\\sum_{i=1}^{n}(x_i-\\bar{x})^2", leg: [["\\sigma^2", "variância da população (média conhecida $\\mu$)"], ["s^2", "variância amostral (estimador de $\\sigma^2$)"], ["\\sum (x_i-\\bar{x})^2", "soma dos quadrados (SQ), em inglês *sum of squares*"]] },
    { p: "O **desvio-padrão** é a raiz quadrada da variância: $s = \\sqrt{s^2}$. Ele volta à unidade original dos dados (a variância de alturas em cm está em cm²), por isso é a medida que reportamos para descrever espalhamento." },
    { h: "Por que n − 1?" },
    { p: "Se conhecêssemos $\\mu$, dividiríamos por $n$. Mas usamos $\\bar{x}$, que foi calculada **com os mesmos dados**. A média amostral está sempre no 'centro' da amostra, então os desvios em torno de $\\bar{x}$ são, em média, **menores** do que os desvios em torno da verdadeira $\\mu$. Dividir por $n$ subestimaria $\\sigma^2$ sistematicamente." },
    { box: "intuicao", t: "Graus de liberdade", c: [
      "Depois de calcular $\\bar{x}$, só $n - 1$ desvios são livres: o último é determinado, porque todos precisam somar zero. Com $n = 3$ e desvios $-2$ e $+5$, o terceiro **tem** de ser $-3$.",
      "Cada parâmetro estimado a partir dos dados 'consome' um grau de liberdade. Essa ideia volta em todos os testes: $t$ com $n-1$ gl, ANOVA com $k-1$ e $N-k$ gl, qui-quadrado com $(r-1)(c-1)$ gl."
    ] },
    { p: "Formalmente, $E[s^2] = \\sigma^2$: com $n - 1$, o estimador é **não viesado** (correção de Bessel). Curiosidade: $s$ ainda é levemente viesado para $\\sigma$, porque a raiz não é linear, mas o efeito é pequeno." },
    { box: "exemplo", t: "Passo a passo", c: [
      "Dados: 4, 8, 6, 5, 7. Média $= 30/5 = 6$.",
      "Desvios: $-2, 2, 0, -1, 1$ (somam zero ✓).",
      "Quadrados: $4, 4, 0, 1, 1$. SQ $= 10$.",
      "$s^2 = 10/(5-1) = 2{,}5$ e $s = \\sqrt{2{,}5} \\approx 1{,}58$."
    ] },
    { h: "Propriedades que você vai usar" },
    { table: { head: ["Transformação", "Efeito na média", "Efeito na variância"], rows: [
      ["Somar uma constante $c$", "$\\bar{x} + c$", "não muda"],
      ["Multiplicar por $a$", "$a\\bar{x}$", "$a^2 s^2$"],
      ["Soma de independentes $X+Y$", "$\\mu_X+\\mu_Y$", "$\\sigma^2_X+\\sigma^2_Y$"],
      ["Diferença de independentes $X-Y$", "$\\mu_X-\\mu_Y$", "$\\sigma^2_X+\\sigma^2_Y$ (soma!)"]
    ] } },
    { box: "atencao", t: "A variância de uma diferença soma", c: ["Comparar dois grupos independentes envolve $\\bar{x}_1 - \\bar{x}_2$, e as incertezas das duas médias **se somam**. É por isso que o erro-padrão do teste $t$ independente tem a forma $\\sqrt{s_1^2/n_1 + s_2^2/n_2}$ (Módulo 6)."] },
    { h: "Outras medidas de dispersão" },
    { list: [
      "**Coeficiente de variação**: $CV = s/\\bar{x}$ (em %). Compara variabilidade entre variáveis de escalas diferentes. Só faz sentido em escala de razão, com médias positivas.",
      "**Amplitude interquartil (AIQ/IQR)**: $Q_3 - Q_1$, a largura dos 50% centrais. Robusta a outliers; é a base do boxplot.",
      "**Desvio absoluto mediano (MAD)**: mediana de $|x_i - \\text{mediana}|$. Muito robusta.",
      "**Amplitude**: máximo − mínimo. Simples, mas depende só de dois valores (os mais extremos)."
    ] },
    { h: "A ideia que leva à ANOVA: a variação se decompõe" },
    { p: "Imagine dois grupos: A = {2, 4, 6} e B = {8, 10, 12}. A média geral é 7. Podemos perguntar quanto da variação total se deve à **diferença entre os grupos** e quanto à **variação dentro de cada grupo**." },
    { f: "\\underbrace{\\sum_{ij}(x_{ij}-\\bar{x})^2}_{\\text{SQ total}=70} = \\underbrace{\\sum_j n_j(\\bar{x}_j-\\bar{x})^2}_{\\text{SQ entre}=54} + \\underbrace{\\sum_{ij}(x_{ij}-\\bar{x}_j)^2}_{\\text{SQ dentro}=16}" },
    { p: "Aqui, 54/70 ≈ 77% da variação total é explicada pela pertença ao grupo. Essa decomposição só é possível porque usamos quadrados. Guarde essa ideia: no Módulo 8 ela vira o teste $F$." }
  ],
  pratica: {
    python: [
      { h: "Cuidado com o ddof", p: "O `numpy` divide por $n$ por padrão (`ddof=0`). O `pandas` divide por $n - 1$ (`ddof=1`). Para a variância amostral, use sempre `ddof=1` no numpy.", code: `
import numpy as np
import pandas as pd
from scipy import stats

x = np.array([4, 8, 6, 5, 7])
print(np.var(x))            # 2.0  -> divide por n (populacional)
print(np.var(x, ddof=1))    # 2.5  -> divide por n-1 (amostral)
print(np.std(x, ddof=1))    # 1.58
print(pd.Series(x).var())   # 2.5  (pandas já usa n-1)

print("CV (%):", 100 * np.std(x, ddof=1) / x.mean())
print("IQR:", stats.iqr(x))
print("MAD:", stats.median_abs_deviation(x))
` },
      { h: "Decompondo a soma de quadrados", code: `
import numpy as np

grupos = {"A": np.array([2, 4, 6]), "B": np.array([8, 10, 12])}
todos = np.concatenate(list(grupos.values()))
media_geral = todos.mean()

sq_total = ((todos - media_geral) ** 2).sum()
sq_entre = sum(len(g) * (g.mean() - media_geral) ** 2 for g in grupos.values())
sq_dentro = sum(((g - g.mean()) ** 2).sum() for g in grupos.values())
print(sq_total, sq_entre, sq_dentro)   # 70.0 54.0 16.0
` }
    ],
    spss: [
      { h: "Variância e desvio-padrão", p: "O SPSS sempre usa $n - 1$.", menu: "Analyze › Descriptive Statistics › Descriptives… › Options: Std. deviation, Variance, Range", syntax: `
DESCRIPTIVES VARIABLES=x
  /STATISTICS=MEAN STDDEV VARIANCE RANGE MIN MAX.
` },
      { h: "Medidas robustas (IQR, quartis)", menu: "Analyze › Descriptive Statistics › Explore…", syntax: `
EXAMINE VARIABLES=x
  /PLOT BOXPLOT
  /STATISTICS DESCRIPTIVES
  /PERCENTILES(25,50,75).
` }
    ]
  },
  ex: [
    { t: "num", q: "Calcule a variância amostral $s^2$ de 4, 8, 6, 5, 7.", a: 2.5, tol: 0.01 },
    { t: "num", q: "E o desvio-padrão $s$ desses mesmos dados? (duas casas)", a: 1.58, tol: 0.01 },
    { t: "num", q: "Dados: 2, 4, 6, 8. Qual é a variância amostral? (duas casas)", a: 6.67, tol: 0.01, ex: "Média 5; SQ = 9 + 1 + 1 + 9 = 20; $s^2 = 20/3$." },
    { t: "mc", q: "Qual é a melhor justificativa para elevar os desvios ao quadrado?", o: ["Elimina o sinal e permite somar variâncias de variáveis independentes, o que torna possível decompor a variação", "Faz a variância ficar na mesma unidade dos dados", "Diminui a influência de valores extremos"], a: 0, ex: "A variância fica na unidade ao quadrado, e o quadrado **aumenta** o peso dos extremos." },
    { t: "mc", q: "Por que dividimos por $n - 1$ na variância amostral?", o: ["Porque os desvios em torno de $\\bar{x}$ tendem a ser menores que em torno de $\\mu$; dividir por $n$ subestimaria $\\sigma^2$", "Para que o desvio-padrão fique na mesma unidade dos dados", "Porque a primeira observação nunca é usada"], a: 0 },
    { t: "mc", q: "Alturas medidas em cm. Em que unidade está a variância?", o: ["cm²", "cm", "Não tem unidade"], a: 0 },
    { t: "tf", q: "Somar 10 a todos os valores de um conjunto de dados aumenta a variância.", a: false, ex: "Todos se deslocam juntos; os desvios em relação à média não mudam." },
    { t: "num", q: "A variância de um conjunto é 4. Se multiplicarmos todos os valores por 3, qual será a nova variância?", a: 36, tol: 0.01, ex: "$\\operatorname{Var}(aX) = a^2\\operatorname{Var}(X) = 9 \\times 4$." },
    { t: "num", q: "Média 50 e desvio-padrão 5. Qual é o coeficiente de variação, em %?", a: 10, tol: 0.01, unit: "%" },
    { t: "mc", q: "Qual medida de dispersão é mais robusta a outliers?", o: ["Amplitude interquartil", "Variância", "Amplitude total"], a: 0 },
    { t: "mc", q: "$X$ e $Y$ são independentes, com $\\operatorname{Var}(X)=4$ e $\\operatorname{Var}(Y)=9$. Quanto vale $\\operatorname{Var}(X - Y)$?", o: ["13", "5", "−5", "36"], a: 0, ex: "As variâncias se somam também na diferença." },
    { t: "num", q: "Grupos A = {1, 3, 5} e B = {7, 9, 11}. Calcule a **SQ entre** grupos.", a: 54, tol: 0.01, ex: "Médias 3 e 9, média geral 6: $3(3-6)^2 + 3(9-6)^2 = 27 + 27$." },
    { t: "num", q: "Nos mesmos grupos, quanto vale a **SQ dentro**?", a: 16, tol: 0.01, ex: "Em cada grupo: $(−2)^2 + 0 + 2^2 = 8$; somando os dois grupos, 16." }
  ]
});
