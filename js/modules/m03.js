MODULES.push({
  id: "m3", n: 3, short: "Amostragem e TLC",
  title: "Distribuição amostral, TLC e intervalos de confiança",
  sub: "A ideia central da inferência: a média de uma amostra também varia, e sabemos como.",
  goals: [
    "Entender o que é uma distribuição amostral",
    "Distinguir desvio-padrão de erro-padrão",
    "Enunciar e visualizar o Teorema do Limite Central",
    "Calcular e interpretar corretamente um intervalo de confiança"
  ],
  blocks: [
    { h: "O experimento mental mais importante da estatística" },
    { p: "Imagine repetir o seu estudo infinitas vezes, cada vez com uma amostra nova de tamanho $n$, e anotar a média $\\bar{x}$ de cada uma. Esses valores formam a **distribuição amostral da média**. Ela não existe nos seus dados (você tem uma amostra só), mas a teoria nos diz como ela é, e todo teste e intervalo de confiança se baseia nela." },
    { h: "Erro-padrão" },
    { f: "EP(\\bar{x}) = \\frac{\\sigma}{\\sqrt{n}} \\approx \\frac{s}{\\sqrt{n}}", leg: [["EP", "erro-padrão: o desvio-padrão da distribuição amostral da média"], ["\\sqrt{n}", "a precisão cresce com a raiz de $n$, não com $n$"]] },
    { p: "Por que $\\sqrt{n}$? A média é uma soma dividida por $n$. A variância de uma soma de $n$ independentes é $n\\sigma^2$ (Módulo 1); dividindo por $n^2$, fica $\\sigma^2/n$. Tirando a raiz: $\\sigma/\\sqrt{n}$." },
    { table: { head: ["", "Desvio-padrão (DP)", "Erro-padrão (EP)"], rows: [
      ["Descreve", "O espalhamento dos **indivíduos**", "A incerteza da **estimativa** (ex.: da média)"],
      ["Com mais dados", "Estabiliza perto de $\\sigma$", "Diminui (∝ $1/\\sqrt{n}$)"],
      ["Use quando quer mostrar", "Como os pacientes variam", "Quão precisa é a média estimada"]
    ] } },
    { box: "erro", t: "Média ± EP para 'parecer' menos variável", c: ["Reportar média ± EP no lugar de média ± DP faz as barras ficarem menores, mas responde a outra pergunta. Para descrever a amostra, use DP. Para inferência sobre a média, prefira um intervalo de confiança."] },
    { h: "O Teorema do Limite Central (TLC)" },
    { p: "Se as observações são independentes e vêm de uma população com média $\\mu$ e variância $\\sigma^2$ finita, então, para $n$ grande, $\\bar{X}$ tem distribuição **aproximadamente normal**, seja qual for a forma da população:" },
    { f: "\\bar{X} \\;\\dot\\sim\\; N\\!\\left(\\mu,\\; \\frac{\\sigma^2}{n}\\right)" },
    { box: "atencao", t: "O TLC fala da média, não dos dados", c: ["Os **dados** continuam com a forma que têm (assimétricos, bimodais…). Quem fica normal é a **distribuição das médias**. 'n ≥ 30' é só uma regra prática: com populações muito assimétricas ou com caudas pesadas, pode ser preciso bem mais."] },
    { viz: "tlc" },
    { p: "O TLC é o motivo pelo qual testes $t$ e ANOVA funcionam razoavelmente bem mesmo quando os dados não são perfeitamente normais, desde que as amostras não sejam muito pequenas." },
    { h: "Intervalo de confiança para a média" },
    { f: "\\bar{x} \\pm t_{\\alpha/2,\\, n-1} \\cdot \\frac{s}{\\sqrt{n}}", leg: [["t_{\\alpha/2,\\,n-1}", "quantil da $t$ com $n-1$ gl (≈ 2 para 95% e $n$ moderado)"], ["s/\\sqrt{n}", "erro-padrão estimado"]] },
    { box: "exemplo", t: "IC 95% passo a passo", c: [
      "$n = 25$, $\\bar{x} = 120$, $s = 10$. EP $= 10/\\sqrt{25} = 2$.",
      "$t_{0{,}025;\\,24} = 2{,}064$. Margem $= 2{,}064 \\times 2 = 4{,}13$.",
      "IC 95%: [115,87; 124,13]."
    ] },
    { h: "O que '95% de confiança' significa (e o que não significa)" },
    { p: "O parâmetro $\\mu$ é fixo; quem varia é o intervalo. **95% dos intervalos construídos dessa forma**, em repetições do estudo, contêm $\\mu$. Para um intervalo já calculado, ou ele contém $\\mu$ ou não; não faz sentido (na estatística frequentista) dizer 'há 95% de probabilidade de $\\mu$ estar aqui'." },
    { viz: "ic" },
    { list: [
      "Mais confiança (99% em vez de 95%) → intervalo **mais largo**.",
      "Mais dados → intervalo mais estreito, mas só na proporção de $\\sqrt{n}$: para reduzir a margem pela metade, é preciso **quadruplicar** $n$.",
      "Mais variabilidade nos dados ($s$ maior) → intervalo mais largo."
    ] },
    { box: "dica", t: "IC e teste de hipóteses são duas faces da mesma moeda", c: ["Se o IC 95% para uma diferença de médias **não contém zero**, o teste bilateral correspondente rejeita $H_0$ ao nível de 5%. O IC dá mais informação: mostra também o tamanho plausível do efeito."] },
    { h: "Uma alternativa moderna: bootstrap" },
    { p: "Quando a fórmula não é confiável (amostras pequenas e assimétricas, estatísticas como a mediana), podemos **reamostrar com reposição** a própria amostra milhares de vezes e usar a variação da estatística entre as reamostras como estimativa da distribuição amostral." }
  ],
  pratica: {
    python: [
      { h: "Erro-padrão e IC para a média", code: `
import numpy as np
from scipy import stats

x = np.array([118, 125, 109, 131, 122, 117, 128, 120, 115, 126])
n = len(x)
ep = stats.sem(x)                 # s / sqrt(n), já com ddof=1
ic = stats.t.interval(0.95, df=n - 1, loc=x.mean(), scale=ep)
print(f"média = {x.mean():.2f}, EP = {ep:.2f}, IC95% = ({ic[0]:.2f}; {ic[1]:.2f})")
` },
      { h: "Simulando o TLC", code: `
import numpy as np

rng = np.random.default_rng(42)
for n in (2, 10, 50):
    medias = rng.exponential(scale=2, size=(10000, n)).mean(axis=1)
    print(n, round(medias.mean(), 3), round(medias.std(ddof=1), 3), "EP teórico:", round(2 / np.sqrt(n), 3))
` },
      { h: "IC por bootstrap (para a mediana)", code: `
import numpy as np
from scipy import stats

x = np.array([1.2, 0.8, 3.5, 2.2, 0.9, 7.1, 1.5, 2.8, 1.1, 4.0])
res = stats.bootstrap((x,), np.median, confidence_level=0.95, n_resamples=10000, random_state=1)
print(res.confidence_interval)
` }
    ],
    spss: [
      { h: "IC 95% para a média", p: "A tabela *Descriptives* do Explore traz a média, o erro-padrão e os limites do IC.", menu: "Analyze › Descriptive Statistics › Explore… › Statistics: Descriptives (Confidence Interval for Mean 95%)", syntax: `
EXAMINE VARIABLES=x
  /STATISTICS DESCRIPTIVES
  /CINTERVAL 95
  /PLOT NONE.
` },
      { h: "Bootstrap", p: "Em vários procedimentos (Descriptives, T Test, Explore) existe o botão **Bootstrap…**, que gera ICs por reamostragem. Requer o módulo de bootstrap, incluído em muitas licenças." }
    ]
  },
  ex: [
    { t: "num", q: "$s = 12$ e $n = 36$. Qual é o erro-padrão da média?", a: 2, tol: 0.001 },
    { t: "mc", q: "Para reduzir o erro-padrão pela metade, o tamanho da amostra deve ser…", o: ["multiplicado por 4", "multiplicado por 2", "dividido por 2"], a: 0 },
    { t: "num", q: "Com $n = 25$, quantas observações seriam necessárias para reduzir o EP pela metade?", a: 100, tol: 0.001 },
    { t: "mc", q: "Qual interpretação de um IC 95% está correta?", o: ["Se repetíssemos o estudo muitas vezes, 95% dos intervalos calculados assim conteriam $\\mu$", "Há 95% de probabilidade de $\\mu$ estar neste intervalo específico", "95% dos dados estão dentro do intervalo"], a: 0 },
    { t: "mc", q: "Você quer mostrar como a glicemia varia **entre os pacientes**. Qual medida reportar?", o: ["Desvio-padrão", "Erro-padrão", "Intervalo de confiança da média"], a: 0 },
    { t: "tf", q: "Pelo TLC, quando $n$ aumenta, os **dados** passam a ter distribuição normal.", a: false, ex: "Quem se aproxima da normal é a distribuição da **média amostral**." },
    { t: "num", q: "$\\bar{x} = 50$, $s = 8$, $n = 16$, $t_{0{,}025;15} = 2{,}131$. Qual é o limite **inferior** do IC 95%? (duas casas)", a: 45.74, tol: 0.02, ex: "EP = 8/4 = 2; margem = 2,131 × 2 = 4,262." },
    { t: "mc", q: "Mantendo os dados, passar de um IC 95% para um IC 99% torna o intervalo…", o: ["mais largo", "mais estreito", "igual"], a: 0 },
    { t: "mc", q: "A população tem distribuição exponencial (bem assimétrica). Com $n = 50$, a distribuição das médias amostrais é…", o: ["aproximadamente normal", "exponencial", "uniforme"], a: 0 },
    { t: "num", q: "$\\sigma = 15$ conhecido, $n = 100$. Qual é a margem de erro de um IC 95% usando $z = 1{,}96$? (duas casas)", a: 2.94, tol: 0.01 },
    { t: "tf", q: "Se o IC 95% para a diferença entre duas médias contém o zero, o teste bilateral correspondente não rejeita $H_0$ a 5%.", a: true },
    { t: "mc", q: "O erro-padrão diminui quando…", o: ["$n$ aumenta", "$\\sigma$ aumenta", "o nível de confiança aumenta"], a: 0 }
  ]
});
