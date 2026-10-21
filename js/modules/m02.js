MODULES.push({
  id: "m2", n: 2, short: "Distribuições",
  title: "Distribuições de probabilidade",
  sub: "A normal, o escore z e as três 'filhas' da normal que aparecem em todos os testes: t, χ² e F.",
  goals: [
    "Interpretar densidade e probabilidade como área",
    "Usar a normal e o escore $z$ (regra 68–95–99,7)",
    "Saber de onde vêm as distribuições $t$, $\\chi^2$ e $F$ e onde cada uma aparece",
    "Reconhecer binomial e Poisson"
  ],
  blocks: [
    { h: "Variável aleatória e distribuição" },
    { p: "Uma **variável aleatória** associa um número a cada resultado de um processo incerto. Sua **distribuição** diz quais valores são possíveis e com que probabilidade. Para variáveis contínuas usamos uma **função densidade** $f(x)$: a probabilidade é a **área** sob a curva num intervalo. Por isso, para uma variável contínua, $P(X = 170{,}000\\ldots) = 0$: só intervalos têm probabilidade positiva." },
    { h: "A distribuição normal" },
    { f: "f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}}\\, e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}", leg: [["\\mu", "média: posição do centro"], ["\\sigma", "desvio-padrão: largura da curva"]] },
    { p: "Ela aparece em toda parte porque muitas medidas resultam da **soma de muitos efeitos pequenos e independentes** (genes, ambiente, erro de medida). O Teorema do Limite Central (Módulo 3) formaliza isso." },
    { h: "Escore z: colocando tudo na mesma régua" },
    { f: "z = \\frac{x - \\mu}{\\sigma}", leg: [["z", "quantos desvios-padrão $x$ está acima (+) ou abaixo (−) da média"]] },
    { p: "Se $X \\sim N(\\mu, \\sigma^2)$, então $Z \\sim N(0, 1)$, a **normal padrão**. Toda pergunta sobre uma normal vira uma pergunta sobre $Z$." },
    { table: { head: ["Intervalo", "Área aproximada"], rows: [["$\\mu \\pm 1\\sigma$", "68%"], ["$\\mu \\pm 2\\sigma$", "95% (exatamente: $\\pm 1{,}96\\sigma$)"], ["$\\mu \\pm 3\\sigma$", "99,7%"]] } },
    { box: "exemplo", t: "QI acima de 130", c: ["QI segue aproximadamente $N(100, 15^2)$. Para $x = 130$: $z = (130 - 100)/15 = 2$.", "$P(Z > 2) \\approx 0{,}0228$: cerca de 2,3% da população. Pela regra 68–95–99,7: 95% ficam entre −2 e +2, sobram 5% nas duas caudas, ≈ 2,5% em cada uma."] },
    { h: "As filhas da normal" },
    { p: "Quando fazemos testes, não trabalhamos com os dados brutos, mas com **estatísticas** construídas a partir de normais. Três distribuições surgem naturalmente:" },
    { table: { head: ["Distribuição", "Como surge", "Onde aparece"], rows: [
      ["$\\chi^2_k$", "Soma de $k$ normais padrão ao quadrado: $Z_1^2 + \\dots + Z_k^2$", "Variância amostral: $(n-1)s^2/\\sigma^2 \\sim \\chi^2_{n-1}$; testes de tabelas de contingência"],
      ["$t_\\nu$", "$Z / \\sqrt{\\chi^2_\\nu/\\nu}$: uma normal dividida por uma estimativa do seu desvio-padrão", "Testes de médias quando $\\sigma$ é desconhecido (sempre, na prática)"],
      ["$F_{d_1, d_2}$", "Razão de duas $\\chi^2$ divididas pelos seus gl", "Razão de variâncias: ANOVA, regressão, teste de Levene"]
    ] } },
    { box: "intuicao", t: "Por que a t tem caudas mais pesadas?", c: ["Quando trocamos $\\sigma$ (fixo) por $s$ (que varia de amostra para amostra), adicionamos incerteza. Às vezes $s$ sai pequeno por acaso, e a estatística fica grande. Por isso valores extremos são mais prováveis do que na normal. Com mais graus de liberdade, $s$ fica mais estável e a $t$ converge para a normal."] },
    { viz: "dist" },
    { p: "Uma relação útil: $t_\\nu^2 = F_{1,\\nu}$. Um teste $t$ com dois grupos e uma ANOVA com dois grupos dão **exatamente** o mesmo p-valor (Módulo 8)." },
    { h: "Valores críticos que vale a pena conhecer" },
    { table: { head: ["", "α = 0,10", "α = 0,05", "α = 0,01"], rows: [
      ["$z$ bilateral", "1,645", "1,960", "2,576"],
      ["$z$ unilateral", "1,282", "1,645", "2,326"],
      ["$t$ bilateral, 10 gl", "1,812", "2,228", "3,169"],
      ["$t$ bilateral, 30 gl", "1,697", "2,042", "2,750"]
    ] } },
    { h: "Duas distribuições discretas" },
    { list: [
      "**Binomial** $B(n, p)$: número de sucessos em $n$ tentativas independentes com probabilidade $p$. Média $np$, variância $np(1-p)$. Ex.: número de pacientes que respondem ao tratamento entre 20.",
      "**Poisson** $(\\lambda)$: contagens de eventos raros num intervalo. Média = variância = $\\lambda$. Ex.: número de colônias numa placa, de mutações num trecho de DNA."
    ] },
    { box: "atencao", t: "Contagens não são normais", c: ["Com médias pequenas, contagens são discretas, não negativas e assimétricas. Quando a variância cresce com a média, transformações (raiz quadrada) ou modelos próprios para contagens (Poisson, binomial negativa) são mais adequados."] }
  ],
  pratica: {
    python: [
      { h: "Probabilidades e quantis com scipy.stats", p: "Cada distribuição tem `.pdf` (densidade), `.cdf` (área à esquerda), `.sf` (área à direita = 1 − cdf) e `.ppf` (quantil, o inverso da cdf).", code: `
from scipy import stats

# P(QI > 130) com QI ~ N(100, 15^2)
print(stats.norm.sf(130, loc=100, scale=15))      # 0.0228

# Valores críticos
print(stats.norm.ppf(0.975))                      # 1.96
print(stats.t.ppf(0.975, df=10))                  # 2.228
print(stats.chi2.ppf(0.95, df=1))                 # 3.841
print(stats.f.ppf(0.95, dfn=2, dfd=27))           # 3.354

# Binomial: P(exatamente 6 sucessos em 20, p = 0,3)
print(stats.binom.pmf(6, n=20, p=0.3))
print(stats.binom.mean(20, 0.3), stats.binom.var(20, 0.3))   # 6.0 4.2
` }
    ],
    spss: [
      { h: "Funções de distribuição no Compute", p: "O SPSS calcula probabilidades com funções `CDF.*` (área à esquerda) e quantis com `IDF.*`.", menu: "Transform › Compute Variable…", syntax: `
COMPUTE p_qi = 1 - CDF.NORMAL(130, 100, 15).
COMPUTE t_crit = IDF.T(0.975, 10).
COMPUTE chi_crit = IDF.CHISQ(0.95, 1).
COMPUTE p_binom = PDF.BINOM(6, 20, 0.3).
EXECUTE.
` }
    ]
  },
  ex: [
    { t: "num", q: "QI ~ $N(100, 15^2)$. Qual é o escore $z$ de um QI de 130?", a: 2, tol: 0.001 },
    { t: "num", q: "Qual é aproximadamente $P(Z > 2)$? (use 3 casas decimais)", a: 0.0228, tol: 0.003, ex: "O valor exato é 0,0228; pela regra 68–95–99,7 a estimativa é 0,025." },
    { t: "num", q: "Numa normal, que porcentagem dos dados fica entre $\\mu - \\sigma$ e $\\mu + \\sigma$?", a: 68, tol: 1, unit: "%" },
    { t: "mc", q: "Comparada à normal padrão, a distribuição $t$ com poucos graus de liberdade tem…", o: ["caudas mais pesadas", "caudas mais leves", "média diferente de zero"], a: 0 },
    { t: "mc", q: "A distribuição $t$ se aproxima da normal quando…", o: ["os graus de liberdade aumentam", "os graus de liberdade diminuem", "a média aumenta"], a: 0 },
    { t: "mc", q: "A distribuição $F$ surge naturalmente como…", o: ["razão entre duas variâncias", "soma de duas médias", "diferença entre duas proporções"], a: 0 },
    { t: "tf", q: "O quadrado de uma variável $t$ com $\\nu$ gl tem distribuição $F$ com 1 e $\\nu$ gl.", a: true },
    { t: "num", q: "Binomial com $n = 20$ e $p = 0{,}3$. Qual é a média?", a: 6, tol: 0.001 },
    { t: "num", q: "E a variância dessa binomial?", a: 4.2, tol: 0.01, ex: "$np(1-p) = 20 \\times 0{,}3 \\times 0{,}7$." },
    { t: "mc", q: "Altura é contínua. Qual é a probabilidade de alguém ter exatamente 170,000… cm?", o: ["Zero", "A densidade em 170", "Depende do desvio-padrão"], a: 0, ex: "Para variáveis contínuas, só intervalos têm probabilidade positiva." },
    { t: "num", q: "Qual é a média de uma distribuição $\\chi^2$ com 7 graus de liberdade?", a: 7, tol: 0.001 },
    { t: "num", q: "Qual é o valor crítico de $z$ para um teste bilateral com α = 0,05? (duas casas)", a: 1.96, tol: 0.01 },
    { t: "mc", q: "Num processo de Poisson com $\\lambda = 4$, a variância é…", o: ["4", "2", "16"], a: 0 }
  ]
});
