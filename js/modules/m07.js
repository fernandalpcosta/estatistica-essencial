MODULES.push({
  id: "m7", n: 7, short: "Não paramétricos",
  title: "Alternativas não paramétricas",
  sub: "Testes baseados em postos: o que realmente comparam, quando usar e o que se perde.",
  goals: [
    "Transformar dados em postos (inclusive com empates)",
    "Aplicar e interpretar Mann-Whitney, Wilcoxon pareado e teste do sinal",
    "Entender o que esses testes comparam (nem sempre é a mediana!)",
    "Pesar ganhos e perdas em relação aos testes paramétricos"
  ],
  blocks: [
    { h: "A ideia: trocar valores por postos" },
    { p: "Ordenamos todas as observações e substituímos cada valor pela sua **posição** (posto, ou *rank*). O menor recebe 1, o seguinte 2, e assim por diante. Valores empatados recebem a **média** dos postos que ocupariam. Assim, um valor extremo deixa de pesar mais que os outros: 50 e 5.000 podem virar simplesmente 'o maior'." },
    { box: "exemplo", t: "Postos com empate", c: ["Dados: 4, 7, 7, 9. Os dois 7 ocupariam os postos 2 e 3; ambos recebem 2,5. Postos: 1; 2,5; 2,5; 4."] },
    { p: "A distribuição da estatística de teste sob $H_0$ depende só de como os postos se distribuem, não da forma da população. Por isso esses testes são chamados **não paramétricos** ou de **distribuição livre**." },
    { h: "Mann-Whitney U (duas amostras independentes)" },
    { p: "Alternativa ao $t$ independente. Juntam-se os dois grupos, atribuem-se postos e soma-se os postos de cada grupo ($R_1$, $R_2$)." },
    { f: "U_1 = R_1 - \\frac{n_1(n_1+1)}{2}, \\qquad U_2 = n_1 n_2 - U_1", leg: [["U_1", "número de pares (um de cada grupo) em que o valor do grupo 1 é maior que o do grupo 2"]] },
    { box: "exemplo", t: "Calculando U", c: [
      "A = {3, 5, 8}, B = {6, 9, 10, 12}. Ordenando tudo: 3(A), 5(A), 6(B), 8(A), 9(B), 10(B), 12(B).",
      "Postos de A: 1, 2, 4 → $R_A = 7$. $U_A = 7 - 3 \\cdot 4/2 = 1$. $U_B = 3 \\cdot 4 - 1 = 11$.",
      "Só 1 dos 12 pares (8 > 6) favorece A. Com amostras tão pequenas, porém, o p exato é 0,11."
    ] },
    { box: "atencao", t: "O que o Mann-Whitney testa de fato", c: [
      "$H_0$: é igualmente provável que uma observação ao acaso do grupo 1 seja maior ou menor que uma do grupo 2, ou seja, $P(X > Y) = 0{,}5$.",
      "Ele só pode ser lido como **comparação de medianas** se as duas distribuições tiverem a **mesma forma e dispersão**, diferindo apenas na posição. Grupos com variâncias muito diferentes podem dar resultado significativo mesmo com medianas iguais."
    ] },
    { h: "Wilcoxon dos postos sinalizados (amostras pareadas)" },
    { p: "Alternativa ao $t$ pareado. Calculam-se as diferenças de cada par, descartam-se as diferenças nulas, ordenam-se os **valores absolutos** e devolve-se a cada posto o sinal da diferença. A estatística $W$ é a soma dos postos positivos (ou o menor dos dois somatórios). Supõe que a distribuição das diferenças seja **simétrica**; sob essa condição, testa se a mediana das diferenças é zero." },
    { h: "Teste do sinal" },
    { p: "Ainda mais simples: só olha se cada diferença é positiva ou negativa e testa, com a distribuição binomial, se as duas são igualmente prováveis. Quase nenhum pressuposto (nem simetria), mas pouco poder, porque descarta a magnitude das diferenças." },
    { h: "Quanto se perde (ou se ganha)?" },
    { p: "Se os dados forem de fato normais, o Wilcoxon/Mann-Whitney precisa de apenas cerca de **5% mais observações** que o teste $t$ para ter o mesmo poder (eficiência relativa assintótica de $3/\\pi \\approx 0{,}955$). Com distribuições de caudas pesadas ou com outliers, eles podem ser **muito mais** poderosos que o $t$. O teste do sinal, sob normalidade, tem eficiência de apenas $2/\\pi \\approx 0{,}64$." },
    { table: { head: ["Situação", "Paramétrico", "Não paramétrico"], rows: [
      ["2 grupos independentes", "t de Student / Welch", "Mann-Whitney U"],
      ["2 medidas pareadas", "t pareado", "Wilcoxon pareado (ou teste do sinal)"],
      ["1 amostra vs. valor", "t de uma amostra", "Wilcoxon de uma amostra"],
      ["3+ grupos independentes", "ANOVA", "Kruskal-Wallis (Módulo 9)"],
      ["3+ medidas repetidas", "ANOVA de medidas repetidas", "Friedman (Módulo 9)"]
    ] } },
    { h: "Quando usar" },
    { list: ["Variável **ordinal** (escalas, escores, rankings).", "Amostras **pequenas** com clara falta de normalidade.", "Presença de **outliers** legítimos que não se quer remover.", "Desconfiança da escala de medida (as distâncias entre valores não são confiáveis)."] },
    { box: "erro", t: "'Não paramétrico não tem pressupostos'", c: ["Ainda exigem **independência** das observações (ou dos pares). O Mann-Whitney é sensível a diferenças de dispersão e o Wilcoxon pareado pressupõe simetria das diferenças. E a hipótese testada é diferente: não é sobre médias."] },
    { h: "Tamanho de efeito" },
    { list: ["$r = Z/\\sqrt{N}$, com $Z$ da aproximação normal da estatística e $N$ o total de observações.", "**Correlação bisserial de postos** (*rank-biserial*), entre −1 e 1.", "**Probabilidade de superioridade**: $U_1/(n_1 n_2)$, a chance de um valor do grupo 1 superar um do grupo 2. É muito fácil de comunicar."] }
  ],
  pratica: {
    python: [
      { h: "Mann-Whitney, Wilcoxon e sinal", code: `
import numpy as np
from scipy import stats

a = [3, 5, 8]
b = [6, 9, 10, 12]
print(stats.rankdata([4, 7, 7, 9]))                       # [1.  2.5 2.5 4. ]
print(stats.mannwhitneyu(a, b, alternative="two-sided"))  # U = 1, p = 0.114

antes = np.array([7, 5, 8, 6, 9, 7, 6, 8, 5, 7])
depois = np.array([5, 4, 6, 6, 6, 5, 3, 7, 4, 5])
print(stats.wilcoxon(antes, depois))                      # postos sinalizados

# Teste do sinal = teste binomial nos sinais das diferenças
d = antes - depois
positivos, n_validos = int((d > 0).sum()), int((d != 0).sum())
print(stats.binomtest(positivos, n_validos, p=0.5))
` },
      { h: "Com pingouin: tamanhos de efeito incluídos", code: `
import pingouin as pg

print(pg.mwu([3, 5, 8], [6, 9, 10, 12]))    # RBC (rank-biserial) e CLES (prob. de superioridade)
print(pg.wilcoxon([7, 5, 8, 6, 9, 7], [5, 4, 6, 6, 6, 5]))
` }
    ],
    spss: [
      { h: "Mann-Whitney", menu: "Analyze › Nonparametric Tests › Legacy Dialogs › 2 Independent Samples… (Mann-Whitney U)", syntax: `
NPAR TESTS
  /M-W= y BY grupo(1 2)
  /MISSING ANALYSIS.
` },
      { h: "Wilcoxon pareado e teste do sinal", menu: "Analyze › Nonparametric Tests › Legacy Dialogs › 2 Related Samples… (Wilcoxon, Sign)", syntax: `
NPAR TESTS
  /WILCOXON=antes WITH depois (PAIRED)
  /SIGN=antes WITH depois (PAIRED)
  /MISSING ANALYSIS.
` },
      { h: "Interface nova", p: "Em **Analyze › Nonparametric Tests › Independent Samples / Related Samples** o SPSS escolhe o teste automaticamente e mostra um resumo com a decisão. Os *Legacy Dialogs* mostram mais detalhes (postos médios, somas de postos, Z)." }
    ]
  },
  ex: [
    { t: "num", q: "Qual é o posto do valor 8 no conjunto {3, 5, 6, 8, 9}?", a: 4, tol: 0.001 },
    { t: "num", q: "No conjunto {4, 7, 7, 9}, qual posto recebe cada valor 7?", a: 2.5, tol: 0.001 },
    { t: "num", q: "A = {3, 5, 8}, B = {6, 9, 10, 12}. Calcule $U_A$.", a: 1, tol: 0.001 },
    { t: "mc", q: "Qual é a alternativa não paramétrica ao $t$ para duas amostras independentes?", o: ["Mann-Whitney U", "Wilcoxon dos postos sinalizados", "Kruskal-Wallis"], a: 0 },
    { t: "mc", q: "E ao $t$ pareado?", o: ["Wilcoxon dos postos sinalizados", "Mann-Whitney U", "Qui-quadrado"], a: 0 },
    { t: "mc", q: "Em sentido estrito, o Mann-Whitney testa se…", o: ["uma observação ao acaso de um grupo tende a ser maior que uma do outro", "as médias são iguais", "as variâncias são iguais"], a: 0, ex: "Só vira comparação de medianas se as distribuições tiverem a mesma forma e dispersão." },
    { t: "num", q: "Sob normalidade, a eficiência relativa assintótica do Wilcoxon/Mann-Whitney em relação ao $t$ é $3/\\pi$. Quanto é isso, em %? (uma casa)", a: 95.5, tol: 0.2, unit: "%" },
    { t: "tf", q: "Testes não paramétricos não têm pressupostos.", a: false },
    { t: "mc", q: "Satisfação medida numa escala Likert de 5 pontos, comparando dois grupos independentes. Qual teste?", o: ["Mann-Whitney U", "t pareado", "Teste z"], a: 0 },
    { t: "mc", q: "O teste do sinal usa…", o: ["apenas o sinal (+ ou −) de cada diferença", "os postos das diferenças absolutas", "a média das diferenças"], a: 0 },
    { t: "num", q: "Mann-Whitney com $Z = 2{,}4$ e $N = 36$. Qual é o tamanho de efeito $r = Z/\\sqrt{N}$?", a: 0.4, tol: 0.005 },
    { t: "mc", q: "Os dados são normais e o $n$ é razoável. Usar Mann-Whitney em vez de $t$…", o: ["custa pouco poder (cerca de 5% de eficiência)", "é sempre errado", "dá mais poder"], a: 0 },
    { t: "mc", q: "O Wilcoxon pareado pressupõe que…", o: ["a distribuição das diferenças seja simétrica", "os dados sejam normais", "as variâncias dos dois momentos sejam iguais"], a: 0 }
  ]
});
