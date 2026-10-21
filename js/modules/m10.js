MODULES.push({
  id: "m10", n: 10, short: "Categóricas",
  title: "Variáveis categóricas: qui-quadrado e Fisher",
  sub: "Testes para frequências: aderência, independência, exato de Fisher, McNemar e medidas de associação.",
  goals: [
    "Calcular frequências esperadas e a estatística $\\chi^2$",
    "Distinguir o teste de aderência do teste de independência",
    "Saber quando o qui-quadrado não é confiável e usar o exato de Fisher",
    "Medir a força da associação (phi, V de Cramér, razão de chances)",
    "Usar McNemar para dados categóricos pareados"
  ],
  blocks: [
    { h: "Dados de contagem" },
    { p: "Quando a resposta é categórica (melhorou/não melhorou, tipo sanguíneo), não há média nem variância no sentido usual: temos **frequências**. A pergunta passa a ser se as frequências observadas ($O$) se afastam do que esperaríamos ($E$) sob $H_0$." },
    { f: "\\chi^2 = \\sum \\frac{(O - E)^2}{E}", leg: [["O", "frequência observada em cada célula"], ["E", "frequência esperada sob $H_0$"]] },
    { p: "Cada parcela é um desvio ao quadrado padronizado pelo esperado. A mesma lógica de sempre: sinal (diferença entre observado e esperado) sobre ruído. Sob $H_0$, a soma segue aproximadamente uma distribuição $\\chi^2$ (Módulo 2)." },
    { h: "Teste de aderência (goodness of fit)" },
    { p: "Uma variável categórica; compara as frequências com uma distribuição teórica. Ex.: um dado é honesto? A proporção de genótipos segue 1:2:1? gl $= k - 1$ (menos 1 para cada parâmetro estimado dos dados)." },
    { h: "Teste de independência (tabela de contingência)" },
    { p: "Duas variáveis categóricas; $H_0$: são independentes (a distribuição de uma não depende da outra). Frequência esperada em cada célula:" },
    { f: "E_{ij} = \\frac{(\\text{total da linha } i)\\times(\\text{total da coluna } j)}{N}, \\qquad gl = (r-1)(c-1)" },
    { box: "exemplo", t: "Tratamento × melhora", c: [
      "Tratamento: 30 melhoraram, 20 não. Controle: 18 melhoraram, 32 não. $N = 100$; totais: 48 melhoraram, 52 não.",
      "Esperados: $50 \\times 48/100 = 24$ melhoras e 26 não-melhoras em cada grupo.",
      "$\\chi^2 = \\frac{6^2}{24} + \\frac{6^2}{26} + \\frac{6^2}{24} + \\frac{6^2}{26} = 5{,}77$, com 1 gl → p = 0,016.",
      "Razão de chances: $(30 \\times 32)/(20 \\times 18) = 2{,}67$. V de Cramér $= \\sqrt{5{,}77/100} = 0{,}24$."
    ] },
    { h: "Quando o qui-quadrado não funciona" },
    { list: [
      "A aproximação pela distribuição $\\chi^2$ exige frequências **esperadas** suficientes. Regra de Cochran: nenhuma célula com $E < 1$ e no máximo 20% das células com $E < 5$.",
      "Em tabelas 2×2 com esperados pequenos, use o **teste exato de Fisher**, que calcula a probabilidade exata a partir da distribuição hipergeométrica. Para tabelas maiores, há o Fisher-Freeman-Halton ou o qui-quadrado com p por simulação de Monte Carlo.",
      "A **correção de Yates** para 2×2 torna o teste mais conservador; hoje é pouco recomendada, já que o Fisher está disponível em qualquer software.",
      "As observações devem ser **independentes**: cada pessoa conta uma única vez na tabela."
    ] },
    { box: "erro", t: "Qui-quadrado em porcentagens", c: ["O teste deve ser feito com **contagens**. Aplicar a fórmula sobre porcentagens muda o resultado, porque a estatística depende do tamanho da amostra."] },
    { h: "O que fazer depois de um resultado significativo" },
    { p: "O $\\chi^2$ diz que há associação, mas não onde nem quão forte. Olhe os **resíduos padronizados ajustados** de cada célula (valores além de ±1,96 indicam células que contribuem para a associação) e reporte uma medida de efeito:" },
    { table: { head: ["Medida", "Uso", "Interpretação"], rows: [
      ["Phi ($\\varphi$)", "Tabelas 2×2", "De 0 a 1 (em 2×2 pode ter sinal)"],
      ["V de Cramér", "Qualquer tabela", "$V = \\sqrt{\\chi^2 / (N\\,(\\min(r,c)-1))}$, de 0 a 1"],
      ["Razão de chances (OR)", "2×2, estudos caso-controle e logística", "OR = 1: sem associação; reporte com IC 95%"],
      ["Risco relativo (RR)", "2×2, estudos de coorte e ensaios", "Razão das proporções de evento entre grupos"]
    ] } },
    { h: "Dados pareados: McNemar" },
    { p: "Mesmos sujeitos classificados duas vezes (sintoma antes/depois, dois testes diagnósticos na mesma amostra). Só os **pares discordantes** importam: os que mudaram de 'sim' para 'não' ($b$) e de 'não' para 'sim' ($c$). $H_0$: $b$ e $c$ são igualmente prováveis." },
    { f: "\\chi^2_{McNemar} = \\frac{(b - c)^2}{b + c}, \\quad gl = 1" }
  ],
  pratica: {
    python: [
      { h: "Independência, Fisher e medidas de efeito", code: `
import numpy as np
from scipy import stats
from scipy.stats.contingency import association, odds_ratio

tabela = np.array([[30, 20],    # tratamento: melhorou, não melhorou
                   [18, 32]])   # controle
res = stats.chi2_contingency(tabela, correction=False)
print(f"chi2 = {res.statistic:.2f}, gl = {res.dof}, p = {res.pvalue:.4f}")
print("esperados:", res.expected_freq)

print("Fisher:", stats.fisher_exact(tabela))
print("V de Cramér:", association(tabela, method="cramer"))
or_ = odds_ratio(tabela, kind="sample")   # razão de chances amostral: 2,67
print("OR:", or_.statistic, or_.confidence_interval())
` },
      { h: "Aderência e McNemar", code: `
from scipy import stats
from statsmodels.stats.contingency_tables import mcnemar

# Dado honesto? 120 lançamentos
obs = [25, 17, 15, 23, 24, 16]
print(stats.chisquare(obs))                 # esperado = 20 em cada face

# Antes (linhas) x depois (colunas): sim/não
pareado = [[40, 5],
           [15, 40]]
print(mcnemar(pareado, exact=True))
` }
    ],
    spss: [
      { h: "Tabela de contingência", p: "Em **Statistics**, marque Chi-square, Phi and Cramér's V e Risk (dá OR e RR em 2×2). Em **Cells**, marque Expected e Adjusted standardized residuals. Em tabelas 2×2 o SPSS mostra o teste exato de Fisher automaticamente.", menu: "Analyze › Descriptive Statistics › Crosstabs…", syntax: `
CROSSTABS
  /TABLES=grupo BY melhora
  /STATISTICS=CHISQ PHI RISK
  /CELLS=COUNT EXPECTED ROW ASRESID.
` },
      { h: "Aderência", menu: "Analyze › Nonparametric Tests › Legacy Dialogs › Chi-square…", syntax: `
NPAR TESTS
  /CHISQUARE=face
  /EXPECTED=EQUAL.
` },
      { h: "McNemar", syntax: `
CROSSTABS
  /TABLES=antes BY depois
  /STATISTICS=MCNEMAR
  /CELLS=COUNT.
` },
      { h: "Dados já resumidos em tabela", p: "Se você tem só as contagens, crie uma linha por célula com uma variável de frequência e use **Data › Weight Cases** antes do Crosstabs.", syntax: `
WEIGHT BY contagem.
` }
    ]
  },
  ex: [
    { t: "num", q: "Total da linha = 50, total da coluna = 48, $N = 100$. Qual é a frequência esperada da célula?", a: 24, tol: 0.001 },
    { t: "num", q: "Tabela 2×2: tratamento 30/20, controle 18/32. Calcule o $\\chi^2$ sem correção de Yates. (duas casas)", a: 5.77, tol: 0.01 },
    { t: "num", q: "Quantos graus de liberdade tem um teste de independência numa tabela 3×4?", a: 6, tol: 0.001 },
    { t: "mc", q: "Tabela 2×2 com duas células com frequência esperada abaixo de 5. Qual teste?", o: ["Exato de Fisher", "Qui-quadrado sem correção", "Teste t"], a: 0 },
    { t: "num", q: "$\\chi^2 = 5{,}77$, $N = 100$, tabela 2×2. Qual é o V de Cramér? (duas casas)", a: 0.24, tol: 0.005 },
    { t: "num", q: "Na mesma tabela (30/20 e 18/32), qual é a razão de chances? (duas casas)", a: 2.67, tol: 0.01 },
    { t: "mc", q: "Quer verificar se um dado é honesto lançando-o 120 vezes. Qual teste?", o: ["Qui-quadrado de aderência", "Qui-quadrado de independência", "McNemar"], a: 0 },
    { t: "num", q: "Quantos gl tem o teste de aderência para um dado de 6 faces?", a: 5, tol: 0.001 },
    { t: "mc", q: "Os mesmos pacientes responderam 'tem sintoma? sim/não' antes e depois do tratamento. Qual teste?", o: ["McNemar", "Qui-quadrado de independência", "Fisher"], a: 0 },
    { t: "tf", q: "Pode-se aplicar o teste qui-quadrado diretamente sobre porcentagens.", a: false },
    { t: "mc", q: "O $\\chi^2$ de independência deu p < 0,001. O que ele permite concluir?", o: ["Que existe associação entre as variáveis; para saber onde e quão forte, olhe resíduos e uma medida de efeito", "Que uma variável causa a outra", "Que a associação é forte"], a: 0 },
    { t: "num", q: "McNemar com $b = 15$ e $c = 5$ pares discordantes. Quanto vale a estatística $\\chi^2$?", a: 5, tol: 0.001, ex: "$(15-5)^2/(15+5) = 100/20$." }
  ]
});
