MODULES.push({
  id: "m5", n: 5, short: "Pressupostos",
  title: "Pressupostos e diagnóstico",
  sub: "Normalidade, homogeneidade de variâncias, independência e outliers: como verificar e o que fazer.",
  goals: [
    "Saber por que os pressupostos importam e qual é o mais crítico",
    "Ler um gráfico Q-Q e interpretar Shapiro-Wilk, Kolmogorov-Smirnov/Lilliefors e Anderson-Darling",
    "Entender o paradoxo do tamanho amostral nos testes de normalidade",
    "Verificar homogeneidade com Levene e Bartlett",
    "Escolher uma transformação ou uma alternativa ao teste"
  ],
  blocks: [
    { h: "Por que os pressupostos importam" },
    { p: "As distribuições $t$, $F$ e $\\chi^2$ que usamos para calcular p-valores foram deduzidas **supondo** certas condições. Se elas não valem, o p-valor calculado pode não corresponder à realidade: a taxa real de falsos positivos deixa de ser α, ou o poder despenca." },
    { table: { head: ["Pressuposto", "O que significa", "Gravidade da violação"], rows: [
      ["Independência", "Uma observação não informa sobre outra (sem medidas repetidas escondidas, agrupamentos, pseudorreplicação)", "**Alta**. Não se corrige escolhendo outro teste; é questão de desenho e de modelo"],
      ["Normalidade", "Os **resíduos** (ou cada grupo) vêm de uma normal", "Moderada; atenuada pelo TLC quando $n$ é razoável"],
      ["Homogeneidade de variâncias", "Os grupos têm a mesma variância populacional", "Moderada a alta, principalmente com grupos de tamanhos diferentes"]
    ] } },
    { box: "erro", t: "Testar a normalidade da variável inteira", c: ["No teste $t$ independente e na ANOVA, o pressuposto é de normalidade **dentro de cada grupo** (ou dos resíduos do modelo). A variável juntando todos os grupos pode ser bimodal justamente porque os grupos diferem, e isso não é problema nenhum."] },
    { h: "Verificação visual: histograma e gráfico Q-Q" },
    { p: "O gráfico Q-Q compara os quantis observados com os quantis que uma normal teria. Se os dados forem normais, os pontos ficam sobre a diagonal. Os desvios típicos:" },
    { list: ["**Curva em U** (côncava para cima): assimetria à direita.", "**Curva em ∩**: assimetria à esquerda.", "**S invertido** (pontas se afastam da reta para fora): caudas pesadas, mais valores extremos que a normal.", "**S**: caudas leves.", "Um ou dois pontos isolados longe da reta: possíveis outliers."] },
    { viz: "qq" },
    { h: "Testes formais de normalidade" },
    { p: "Todos têm **$H_0$: os dados vêm de uma distribuição normal**. p < α → rejeita a normalidade." },
    { table: { head: ["Teste", "Características", "Quando usar"], rows: [
      ["**Shapiro-Wilk**", "Compara os dados ordenados com o que se espera de uma normal; geralmente o mais poderoso", "Primeira escolha para $n$ pequeno a moderado (até alguns milhares)"],
      ["**Kolmogorov-Smirnov**", "Maior distância entre a distribuição acumulada empírica e a teórica. A versão clássica exige $\\mu$ e $\\sigma$ **conhecidos**", "Raramente na forma pura; com parâmetros estimados use a correção de **Lilliefors** (é o que o SPSS mostra)"],
      ["**Anderson-Darling**", "Como o KS, mas dá mais peso às caudas", "Quando os extremos importam"],
      ["D'Agostino-Pearson", "Combina assimetria e curtose", "$n$ moderado a grande"]
    ] } },
    { box: "atencao", t: "O paradoxo do tamanho amostral", c: [
      "Com **$n$ pequeno**, os testes têm pouco poder: dados bem assimétricos passam como 'normais'. Justamente quando a normalidade mais importa, o teste menos detecta o problema.",
      "Com **$n$ grande**, qualquer desvio minúsculo e irrelevante dá p < 0,05. Justamente quando o TLC já protege o teste $t$ e a ANOVA.",
      "Conclusão prática: combine o **gráfico**, o **teste** e o **contexto** (o que se sabe da variável, o tamanho da amostra). Nunca decida só pelo p-valor do Shapiro-Wilk."
    ] },
    { h: "Homogeneidade de variâncias" },
    { p: "$H_0$: as variâncias populacionais dos grupos são iguais." },
    { list: [
      "**Levene**: faz uma ANOVA nos desvios absolutos de cada valor em relação à média do grupo. Robusto a não normalidade. A variante de **Brown-Forsythe** usa a mediana e é ainda mais robusta.",
      "**Bartlett**: mais poderoso se os dados forem normais, mas muito sensível à não normalidade (pode acusar heterogeneidade que é, na verdade, falta de normalidade).",
      "**Teste F de duas variâncias**: muito sensível à não normalidade; evite como pré-teste."
    ] },
    { box: "dica", t: "Na dúvida, use a versão robusta do teste principal", c: ["Para dois grupos, o **t de Welch** não assume variâncias iguais e perde pouquíssimo poder quando elas são iguais. Muitos autores recomendam usá-lo sempre, em vez de decidir com base no Levene. O mesmo vale para a **ANOVA de Welch** (Módulo 9)."] },
    { h: "Outliers" },
    { p: "No boxplot, são marcados os pontos além de $Q_1 - 1{,}5 \\cdot AIQ$ ou $Q_3 + 1{,}5 \\cdot AIQ$. Um outlier pode ser erro de digitação (corrija), erro de medida (justifique e documente a exclusão) ou um valor legítimo (mantenha e considere métodos robustos). **Nunca** remova pontos só porque 'atrapalham' o resultado; relate as análises com e sem eles, se for o caso." },
    { h: "Transformações" },
    { table: { head: ["Transformação", "Quando ajuda", "Atenção"], rows: [
      ["$\\log(x)$", "Assimetria à direita, efeitos multiplicativos, variância que cresce com a média (concentrações, renda)", "Só para $x > 0$; a comparação passa a ser de médias geométricas (razões)"],
      ["$\\sqrt{x}$", "Contagens (variância ∝ média)", "Efeito mais suave que o log"],
      ["Box-Cox", "Escolhe a potência $\\lambda$ que mais aproxima os dados da normal", "Interpretação menos direta"],
      ["Postos", "Quando nada funciona: é a base dos testes não paramétricos (Módulo 7)", "Muda a hipótese testada"]
    ] } }
  ],
  pratica: {
    python: [
      { h: "Testes de normalidade", code: `
import numpy as np
from scipy import stats
from statsmodels.stats.diagnostic import lilliefors

rng = np.random.default_rng(1)
x = rng.exponential(scale=2, size=40)

print("Shapiro-Wilk:", stats.shapiro(x))
print("Lilliefors (KS com parâmetros estimados):", lilliefors(x, dist="norm"))
ad = stats.anderson(x, dist="norm")
print("Anderson-Darling:", ad.statistic, "valores críticos:", ad.critical_values)
print("D'Agostino-Pearson:", stats.normaltest(x))
` },
      { h: "Gráfico Q-Q", code: `
import matplotlib.pyplot as plt
import numpy as np
from scipy import stats

x = np.random.default_rng(1).exponential(scale=2, size=40)
stats.probplot(x, dist="norm", plot=plt)
plt.title("Q-Q normal")
plt.show()
` },
      { h: "Homogeneidade de variâncias", code: `
from scipy import stats

a = [12.1, 15.3, 11.0, 14.2, 13.5, 16.0]
b = [22.4, 9.1, 30.2, 14.8, 25.0, 8.3]
print("Levene (média):", stats.levene(a, b, center="mean"))
print("Brown-Forsythe (mediana):", stats.levene(a, b, center="median"))
print("Bartlett:", stats.bartlett(a, b))
` },
      { h: "Transformações", code: `
import numpy as np
from scipy import stats

x = np.random.default_rng(2).lognormal(mean=1, sigma=0.8, size=50)
print("antes:", stats.shapiro(x).pvalue)
print("log:", stats.shapiro(np.log(x)).pvalue)
x_bc, lam = stats.boxcox(x)
print("Box-Cox, lambda =", round(lam, 2), "p =", stats.shapiro(x_bc).pvalue)
` }
    ],
    spss: [
      { h: "Normalidade (Shapiro-Wilk, KS-Lilliefors e Q-Q)", p: "Marque **Normality plots with tests**. A tabela *Tests of Normality* traz o Kolmogorov-Smirnov (com correção de Lilliefors) e o Shapiro-Wilk, separados por grupo se você indicar um fator.", menu: "Analyze › Descriptive Statistics › Explore… › Plots: Normality plots with tests", syntax: `
EXAMINE VARIABLES=y BY grupo
  /PLOT BOXPLOT HISTOGRAM NPPLOT
  /STATISTICS DESCRIPTIVES
  /NOTOTAL.
` },
      { h: "Levene", p: "Aparece automaticamente no teste $t$ independente. Na ANOVA, peça em Options › Homogeneity of variance test.", syntax: `
ONEWAY y BY grupo
  /STATISTICS HOMOGENEITY.
` },
      { h: "Transformar uma variável", menu: "Transform › Compute Variable…", syntax: `
COMPUTE log_y = LN(y).
COMPUTE raiz_y = SQRT(y).
EXECUTE.
` }
    ]
  },
  ex: [
    { t: "mc", q: "Qual é a hipótese nula do teste de Shapiro-Wilk?", o: ["Os dados vêm de uma distribuição normal", "Os dados não são normais", "As variâncias são iguais"], a: 0 },
    { t: "mc", q: "Shapiro-Wilk com p = 0,003 (α = 0,05). Conclusão:", o: ["Rejeita-se a normalidade", "Os dados são normais", "O teste não é conclusivo por definição"], a: 0 },
    { t: "mc", q: "$n = 5.000$, Shapiro-Wilk com p < 0,001, mas o Q-Q plot é quase uma reta perfeita. O mais razoável é…", o: ["Considerar a normalidade adequada para fins práticos: com $n$ tão grande o teste detecta desvios irrelevantes", "Abandonar qualquer teste paramétrico", "Remover observações até o p passar de 0,05"], a: 0 },
    { t: "mc", q: "O teste de Kolmogorov-Smirnov aplicado com média e desvio-padrão estimados da própria amostra deve usar a correção de…", o: ["Lilliefors", "Bonferroni", "Welch"], a: 0 },
    { t: "mc", q: "No Q-Q plot, os pontos formam uma curva em 'U' (côncava para cima). Isso indica…", o: ["assimetria à direita", "assimetria à esquerda", "caudas leves"], a: 0 },
    { t: "mc", q: "Qual é a hipótese nula do teste de Levene?", o: ["As variâncias dos grupos são iguais", "As médias dos grupos são iguais", "Os dados são normais"], a: 0 },
    { t: "mc", q: "O teste de Bartlett é especialmente sensível a…", o: ["falta de normalidade", "tamanho amostral pequeno", "dados pareados"], a: 0 },
    { t: "mc", q: "No teste $t$ para dois grupos independentes, o pressuposto de normalidade se refere…", o: ["a cada grupo (ou aos resíduos)", "à variável com os dois grupos juntos", "apenas ao grupo controle"], a: 0 },
    { t: "mc", q: "Concentrações positivas e muito assimétricas à direita. Qual transformação tentar primeiro?", o: ["Logaritmo", "Elevar ao quadrado", "Somar uma constante"], a: 0 },
    { t: "num", q: "$Q_1 = 20$ e $Q_3 = 30$. Acima de que valor um ponto é marcado como outlier no boxplot?", a: 45, tol: 0.001, ex: "$Q_3 + 1{,}5 \\times (30 - 20)$." },
    { t: "tf", q: "Todos os outliers devem ser removidos antes da análise.", a: false },
    { t: "mc", q: "Qual pressuposto **não** se resolve escolhendo outro teste, e sim no desenho do estudo ou no modelo?", o: ["Independência das observações", "Normalidade", "Homogeneidade de variâncias"], a: 0 },
    { t: "mc", q: "Por que testes de normalidade com $n$ muito pequeno são pouco informativos?", o: ["Têm pouco poder: dados não normais muitas vezes passam como normais", "Sempre rejeitam a normalidade", "Não podem ser calculados com menos de 30 observações"], a: 0 }
  ]
});
