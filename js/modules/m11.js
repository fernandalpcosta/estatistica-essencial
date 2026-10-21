MODULES.push({
  id: "m11", n: 11, short: "Correlação e regressão",
  title: "Correlação e regressão linear simples",
  sub: "Covariância, Pearson e Spearman, mínimos quadrados, R², pressupostos, e a ANOVA vista como modelo linear.",
  goals: [
    "Entender a covariância como extensão da variância",
    "Calcular e interpretar $r$ de Pearson, $r^2$ e Spearman",
    "Ajustar e interpretar uma reta de regressão",
    "Verificar os pressupostos pelos resíduos",
    "Ver que teste $t$ e ANOVA são casos do modelo linear"
  ],
  blocks: [
    { h: "Da variância à covariância" },
    { p: "A variância é a média de $(x_i-\\bar{x})(x_i-\\bar{x})$. Trocando o segundo fator por $y$, temos a **covariância**: mede se $x$ e $y$ tendem a estar, ao mesmo tempo, acima (ou abaixo) das suas médias." },
    { f: "\\operatorname{cov}(x, y) = \\frac{1}{n-1}\\sum (x_i-\\bar{x})(y_i-\\bar{y})" },
    { p: "Positiva: crescem juntas. Negativa: quando uma sobe a outra desce. O problema é a unidade (cm × kg), que torna o valor difícil de interpretar. A solução é padronizar." },
    { h: "Correlação de Pearson" },
    { f: "r = \\frac{\\operatorname{cov}(x,y)}{s_x\\,s_y} = \\frac{\\sum (x_i-\\bar{x})(y_i-\\bar{y})}{\\sqrt{\\sum (x_i-\\bar{x})^2\\,\\sum (y_i-\\bar{y})^2}}", leg: [["r", "entre −1 e 1; mede a força da relação **linear**"]] },
    { list: [
      "$r = 0$ significa ausência de relação **linear**; pode haver uma relação curva forte (ex.: em U).",
      "É muito sensível a outliers: um único ponto pode criar ou destruir uma correlação (o quarteto de Anscombe tem quatro conjuntos com o mesmo $r$ e gráficos completamente diferentes). **Sempre olhe o gráfico de dispersão.**",
      "Teste de $H_0$: $\\rho = 0$: $t = r\\sqrt{n-2}/\\sqrt{1-r^2}$, com $n - 2$ gl.",
      "$r^2$ é a proporção da variância de $y$ explicada pela relação linear com $x$."
    ] },
    { viz: "correlacao" },
    { h: "Spearman e Kendall" },
    { p: "O **$\\rho$ de Spearman** é a correlação de Pearson calculada sobre os **postos**: mede relação **monotônica** (sempre crescente ou sempre decrescente, não necessariamente linear), é robusto a outliers e serve para dados ordinais. O **$\\tau$ de Kendall** conta pares concordantes e discordantes; é preferível com amostras pequenas e muitos empates." },
    { box: "erro", t: "Correlação não implica causalidade", c: ["Uma correlação pode vir de uma **terceira variável** (confundidor: venda de sorvete e afogamentos sobem juntos no verão), de **causalidade reversa** ou simplesmente do acaso quando se testam muitas correlações. Conclusões causais exigem desenho experimental ou métodos específicos."] },
    { h: "Regressão linear simples" },
    { p: "A correlação é simétrica; a regressão tem direção: queremos **prever** $y$ a partir de $x$, ou estimar quanto $y$ muda quando $x$ aumenta uma unidade." },
    { f: "y_i = \\beta_0 + \\beta_1 x_i + \\varepsilon_i, \\qquad \\varepsilon_i \\sim N(0, \\sigma^2)" },
    { p: "Os **mínimos quadrados** escolhem a reta que minimiza a soma dos quadrados dos resíduos $\\sum (y_i - \\hat{y}_i)^2$. De novo, a mesma ideia da média (Módulo 0) e da variância (Módulo 1):" },
    { f: "b_1 = \\frac{\\sum (x_i-\\bar{x})(y_i-\\bar{y})}{\\sum (x_i-\\bar{x})^2} = r\\,\\frac{s_y}{s_x}, \\qquad b_0 = \\bar{y} - b_1\\bar{x}", leg: [["b_1", "inclinação: variação esperada em $y$ por unidade de $x$"], ["b_0", "intercepto: valor previsto quando $x = 0$ (nem sempre faz sentido prático)"]] },
    { box: "exemplo", t: "Passo a passo", c: [
      "$x$ = 1, 2, 3, 4, 5; $y$ = 2, 4, 5, 4, 5. Médias: $\\bar{x} = 3$, $\\bar{y} = 4$.",
      "Produtos dos desvios: $(−2)(−2) + (−1)(0) + 0 + (1)(0) + (2)(1) = 6$. $\\sum (x_i-\\bar{x})^2 = 10$. $\\sum (y_i-\\bar{y})^2 = 6$.",
      "$b_1 = 6/10 = 0{,}6$; $b_0 = 4 - 0{,}6 \\times 3 = 2{,}2$. Reta: $\\hat{y} = 2{,}2 + 0{,}6x$.",
      "$r = 6/\\sqrt{10 \\times 6} = 0{,}775$; $r^2 = 0{,}60$: 60% da variação de $y$ é explicada por $x$."
    ] },
    { h: "A decomposição aparece de novo" },
    { f: "\\underbrace{\\sum (y_i-\\bar{y})^2}_{SQ_{total}} = \\underbrace{\\sum (\\hat{y}_i-\\bar{y})^2}_{SQ_{\\text{regressão}}} + \\underbrace{\\sum (y_i-\\hat{y}_i)^2}_{SQ_{\\text{resíduo}}}, \\qquad R^2 = \\frac{SQ_{\\text{regressão}}}{SQ_{total}}" },
    { p: "A tabela de ANOVA da regressão testa $H_0$: $\\beta_1 = 0$ com $F = QM_{reg}/QM_{res}$. Com um preditor, esse $F$ é igual ao quadrado do $t$ da inclinação." },
    { h: "Pressupostos (LINE) e diagnóstico pelos resíduos" },
    { list: [
      "**L**inearidade: a relação média é uma reta. Gráfico de resíduos × valores ajustados sem curvas.",
      "**I**ndependência dos erros (cuidado com dados ao longo do tempo).",
      "**N**ormalidade dos resíduos (Q-Q plot dos resíduos; importa mais para ICs e testes com $n$ pequeno).",
      "**E**qual variância (homocedasticidade): no gráfico de resíduos, uma 'nuvem' de largura constante. Formato de **funil** indica heterocedasticidade."
    ] },
    { h: "Teste t e ANOVA também são regressões" },
    { p: "Codifique o grupo como uma variável indicadora: 0 = controle, 1 = tratamento. Na regressão $y = \\beta_0 + \\beta_1 \\cdot grupo$, $\\beta_0$ é a média do controle e $\\beta_1$ é a **diferença de médias**. O teste do $\\beta_1$ é exatamente o $t$ de Student. Com $k$ grupos e $k-1$ indicadoras, o $F$ da regressão é o $F$ da ANOVA. Todo o curso cabe num único arcabouço: o **modelo linear geral**, que se estende para várias variáveis (regressão múltipla, ANCOVA) e para respostas não normais (modelos lineares generalizados, como a regressão logística)." }
  ],
  pratica: {
    python: [
      { h: "Correlações", code: `
import numpy as np
from scipy import stats

x = np.array([1, 2, 3, 4, 5])
y = np.array([2, 4, 5, 4, 5])
print("Pearson:", stats.pearsonr(x, y))      # r = 0.775
print("Spearman:", stats.spearmanr(x, y))
print("Kendall:", stats.kendalltau(x, y))
` },
      { h: "Regressão com statsmodels", code: `
import pandas as pd
import statsmodels.formula.api as smf

df = pd.DataFrame({"x": [1, 2, 3, 4, 5], "y": [2, 4, 5, 4, 5]})
modelo = smf.ols("y ~ x", data=df).fit()
print(modelo.summary())              # b0 = 2.2, b1 = 0.6, R2 = 0.60
print(modelo.predict(pd.DataFrame({"x": [6]})))   # 5.8

residuos = modelo.resid
ajustados = modelo.fittedvalues
# Para o diagnóstico: plt.scatter(ajustados, residuos); plt.axhline(0)
` },
      { h: "O teste t como regressão", code: `
import pandas as pd
import statsmodels.formula.api as smf
from scipy import stats

df = pd.DataFrame({
    "y": [28, 22, 25, 19, 30, 24, 18, 24, 15, 22, 19, 26],
    "grupo": [1] * 6 + [0] * 6,
})
print(smf.ols("y ~ grupo", data=df).fit().params)        # inclinação = diferença de médias
print(stats.ttest_ind(df.y[df.grupo == 1], df.y[df.grupo == 0]))
print(smf.ols("y ~ grupo", data=df).fit().tvalues)       # mesmo t
` }
    ],
    spss: [
      { h: "Correlações", menu: "Analyze › Correlate › Bivariate… (Pearson, Kendall's tau-b, Spearman)", syntax: `
CORRELATIONS
  /VARIABLES=x y
  /PRINT=TWOTAIL NOSIG.

NONPAR CORR
  /VARIABLES=x y
  /PRINT=BOTH TWOTAIL.
` },
      { h: "Regressão linear", p: "Em **Plots**, coloque `*ZRESID` no eixo Y e `*ZPRED` no X para o gráfico de resíduos, e marque o histograma e o gráfico de probabilidade normal dos resíduos.", menu: "Analyze › Regression › Linear…", syntax: `
REGRESSION
  /STATISTICS COEFF OUTS CI(95) R ANOVA
  /DEPENDENT y
  /METHOD=ENTER x
  /SCATTERPLOT=(*ZRESID ,*ZPRED)
  /RESIDUALS HISTOGRAM(ZRESID) NORMPROB(ZRESID).
` }
    ]
  },
  ex: [
    { t: "num", q: "$x$ = 1, 2, 3, 4, 5 e $y$ = 2, 4, 5, 4, 5. Qual é a inclinação $b_1$?", a: 0.6, tol: 0.001 },
    { t: "num", q: "E o intercepto $b_0$?", a: 2.2, tol: 0.001 },
    { t: "num", q: "Qual é o $r$ de Pearson desses dados? (três casas)", a: 0.775, tol: 0.005 },
    { t: "num", q: "E o $r^2$? (duas casas)", a: 0.6, tol: 0.005 },
    { t: "num", q: "Com a reta $\\hat{y} = 2{,}2 + 0{,}6x$, qual é o valor previsto para $x = 6$?", a: 5.8, tol: 0.001 },
    { t: "mc", q: "$r = 0$ significa que…", o: ["não há relação **linear** (pode haver relação não linear)", "as variáveis são independentes", "não há nenhuma relação"], a: 0 },
    { t: "mc", q: "A relação é monotônica mas claramente curva, e há um outlier. Que correlação usar?", o: ["Spearman", "Pearson", "Covariância"], a: 0 },
    { t: "num", q: "$r = 0{,}5$ com $n = 27$. Qual é a estatística $t$ do teste de $H_0$: $\\rho = 0$? (duas casas)", a: 2.89, tol: 0.01, ex: "$t = 0{,}5\\sqrt{25}/\\sqrt{1 - 0{,}25}$." },
    { t: "mc", q: "$r^2 = 0{,}36$ significa que…", o: ["36% da variância de $y$ é explicada pela relação linear com $x$", "36% das observações estão sobre a reta", "a inclinação é 0,36"], a: 0 },
    { t: "mc", q: "O gráfico de resíduos × ajustados tem formato de funil. Isso indica…", o: ["heterocedasticidade", "relação perfeitamente linear", "normalidade dos resíduos"], a: 0 },
    { t: "mc", q: "Numa regressão de $y$ numa indicadora de grupo (0/1), a inclinação é…", o: ["a diferença entre as médias dos grupos", "a correlação entre os grupos", "a média geral"], a: 0 },
    { t: "tf", q: "Uma correlação forte e significativa entre duas variáveis demonstra que uma causa a outra.", a: false },
    { t: "mc", q: "Qual é a relação entre covariância e variância?", o: ["A variância é a covariância de uma variável com ela mesma", "São a mesma coisa para quaisquer variáveis", "A covariância é a raiz da variância"], a: 0 }
  ]
});
