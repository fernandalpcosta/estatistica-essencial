MODULES.push({
  id: "m4", n: 4, short: "Teste de hipóteses",
  title: "A lógica do teste de hipóteses",
  sub: "H₀ e H₁, p-valor, erros tipo I e II, poder, testes uni e bilaterais, e tamanho de efeito.",
  goals: [
    "Formular $H_0$ e $H_1$ a partir de uma pergunta de pesquisa",
    "Explicar o que o p-valor é, e principalmente o que ele não é",
    "Relacionar α, β, poder, tamanho de efeito e $n$",
    "Decidir entre teste unilateral e bilateral",
    "Reconhecer o problema das comparações múltiplas"
  ],
  blocks: [
    { h: "A analogia do tribunal" },
    { p: "Num julgamento, o réu é presumido **inocente** ($H_0$) até que as evidências tornem essa presunção difícil de sustentar. Se as provas são fracas, o veredito é 'não culpado', e não 'inocente comprovado'. No teste de hipóteses é igual: **não rejeitar $H_0$ não prova que $H_0$ é verdadeira**; só diz que os dados não trouxeram evidência suficiente contra ela." },
    { h: "As hipóteses" },
    { list: [
      "**$H_0$ (hipótese nula)**: a afirmação de 'nenhum efeito' ou 'nenhuma diferença', que fixa um valor para o parâmetro. Ex.: $\\mu_{trat} = \\mu_{placebo}$.",
      "**$H_1$ (hipótese alternativa)**: o que aceitamos se os dados forem incompatíveis com $H_0$. Pode ser bilateral ($\\neq$) ou unilateral ($>$ ou $<$).",
      "As hipóteses falam sempre de **parâmetros** da população ($\\mu$, $\\sigma^2$, $\\rho$), nunca de estatísticas da amostra."
    ] },
    { h: "A estatística de teste: sinal sobre ruído" },
    { f: "\\text{estatística} = \\frac{\\text{estimativa} - \\text{valor sob } H_0}{\\text{erro-padrão}} = \\frac{\\text{sinal}}{\\text{ruído}}" },
    { p: "Quase todo teste tem essa forma. O numerador mede o quanto os dados se afastam de $H_0$; o denominador mede o quanto esperaríamos que se afastassem **só por acaso**. É aqui que a variância (Módulo 1) entra: ela define o ruído. Se $H_0$ for verdadeira, sabemos a distribuição da estatística ($z$, $t$, $F$, $\\chi^2$; Módulo 2)." },
    { h: "O p-valor" },
    { box: "intuicao", t: "Definição", c: ["O p-valor é a probabilidade de obter uma estatística **tão ou mais extrema** que a observada, **supondo que $H_0$ seja verdadeira**.", "p pequeno = os dados seriam surpreendentes num mundo onde $H_0$ vale."] },
    { viz: "pvalor" },
    { box: "erro", t: "O que o p-valor NÃO é", c: [
      "Não é a probabilidade de $H_0$ ser verdadeira.",
      "Não é a probabilidade de o resultado ser 'devido ao acaso'.",
      "Não é a probabilidade de você estar cometendo um erro ao rejeitar $H_0$.",
      "Não mede o **tamanho** nem a **importância** do efeito.",
      "p > 0,05 não demonstra que não há efeito."
    ] },
    { h: "Decisão e os dois tipos de erro" },
    { p: "Antes de olhar os dados, fixamos um **nível de significância α** (geralmente 0,05). Se p ≤ α, rejeitamos $H_0$." },
    { table: { head: ["", "$H_0$ verdadeira", "$H_0$ falsa"], rows: [
      ["Rejeita $H_0$", "**Erro tipo I** (falso positivo), probabilidade α", "Decisão correta: **poder** = 1 − β"],
      ["Não rejeita $H_0$", "Decisão correta (1 − α)", "**Erro tipo II** (falso negativo), probabilidade β"]
    ] } },
    { h: "Poder do teste" },
    { p: "Poder é a probabilidade de detectar um efeito que **existe**. Ele aumenta com:" },
    { list: ["maior **tamanho de efeito** (diferença real maior)", "maior **$n$** (erro-padrão menor)", "menor **variabilidade** dos dados", "maior **α** (com o custo de mais falsos positivos)", "teste **unilateral** (se a direção estiver certa)", "desenho **pareado** (remove variação entre sujeitos; Módulo 6)"] },
    { viz: "poder" },
    { p: "Por convenção, planeja-se poder de 80% ou 90%. O cálculo do tamanho amostral **antes** do estudo exige estimar o tamanho de efeito esperado (de estudos anteriores ou do menor efeito clinicamente relevante)." },
    { h: "Unilateral ou bilateral?" },
    { list: [
      "**Bilateral** ($H_1$: $\\mu \\neq \\mu_0$): o padrão. Detecta diferenças em qualquer direção. α é dividido entre as duas caudas (2,5% em cada uma, para α = 5%).",
      "**Unilateral** ($H_1$: $\\mu > \\mu_0$): só se justifica se a direção foi definida **antes** dos dados e um efeito na direção oposta seria impossível ou irrelevante para a decisão. Toda a α fica numa cauda, então o valor crítico é menor (1,645 em vez de 1,96).",
      "Se a estatística estiver na direção prevista, o p unilateral é a metade do bilateral. Escolher o unilateral **depois** de ver os dados para 'conseguir' significância é uma forma de manipulação."
    ] },
    { h: "Significância estatística não é relevância" },
    { p: "Com $n$ enorme, diferenças minúsculas ficam significativas. Por isso é obrigatório reportar um **tamanho de efeito** e o seu IC. O mais comum para médias é o $d$ de Cohen:" },
    { f: "d = \\frac{\\bar{x}_1 - \\bar{x}_2}{s_p}", leg: [["s_p", "desvio-padrão combinado (pooled) dos dois grupos"], ["d", "a diferença em unidades de desvio-padrão; referências de Cohen: 0,2 pequeno, 0,5 médio, 0,8 grande"]] },
    { p: "As referências de Cohen são genéricas; o que importa é a relevância **na sua área**." },
    { h: "Comparações múltiplas" },
    { p: "Cada teste com α = 0,05 tem 5% de chance de falso positivo. Com $m$ testes independentes, a chance de **pelo menos um** falso positivo (*familywise error rate*) é:" },
    { f: "FWER = 1 - (1 - \\alpha)^m" },
    { p: "Com 10 testes: $1 - 0{,}95^{10} \\approx 0{,}40$. Correções: **Bonferroni** (usar α/m; simples e conservadora), **Holm** (sequencial; sempre pelo menos tão poderosa quanto Bonferroni) e **Benjamini-Hochberg** (controla a taxa de falsas descobertas, FDR, útil com muitos testes, como em genômica)." },
    { box: "erro", t: "p-hacking", c: ["Testar várias variáveis, subgrupos, transformações ou critérios de exclusão até algo dar p < 0,05, e reportar só isso, inflaciona os falsos positivos. A defesa é planejar a análise antes (pré-registro) e relatar tudo o que foi testado."] }
  ],
  pratica: {
    python: [
      { h: "p-valores a partir da estatística", code: `
from scipy import stats

z = 1.80
print("bilateral:", 2 * stats.norm.sf(abs(z)))      # 0.0719
print("unilateral (>):", stats.norm.sf(z))           # 0.0359

t, gl = 2.5, 15
print("t bilateral:", 2 * stats.t.sf(abs(t), gl))   # 0.0245
` },
      { h: "Poder e tamanho amostral", code: `
from statsmodels.stats.power import TTestIndPower

analise = TTestIndPower()
n = analise.solve_power(effect_size=0.5, alpha=0.05, power=0.80, alternative="two-sided")
print(f"n por grupo: {n:.1f}")       # ~63.8 -> 64 por grupo

poder = analise.power(effect_size=0.5, nobs1=30, alpha=0.05)
print(f"poder com 30 por grupo: {poder:.2f}")
` },
      { h: "Corrigindo comparações múltiplas", code: `
from statsmodels.stats.multitest import multipletests

pvals = [0.010, 0.020, 0.030, 0.040, 0.200]
for metodo in ("bonferroni", "holm", "fdr_bh"):
    rejeita, p_ajust, _, _ = multipletests(pvals, alpha=0.05, method=metodo)
    print(metodo, rejeita, p_ajust.round(3))
` }
    ],
    spss: [
      { h: "Análise de poder", p: "Disponível a partir do SPSS 27: escolha o teste, informe médias, desvios-padrão, α e o poder desejado, e o SPSS calcula o $n$. Uma alternativa gratuita e muito usada é o programa `G*Power`.", menu: "Analyze › Power Analysis › Means › Independent-Samples T Test…" },
      { h: "Probabilidade a partir de uma estatística", syntax: `
COMPUTE p_bilateral = 2 * (1 - CDF.NORMAL(ABS(1.80), 0, 1)).
COMPUTE p_t = 2 * (1 - CDF.T(ABS(2.5), 15)).
EXECUTE.
` }
    ]
  },
  ex: [
    { t: "mc", q: "Um teste resultou em p = 0,03. A interpretação correta é:", o: ["Se $H_0$ fosse verdadeira, haveria 3% de chance de obter um resultado tão ou mais extremo que o observado", "Há 3% de probabilidade de $H_0$ ser verdadeira", "Há 97% de probabilidade de o efeito ser real"], a: 0 },
    { t: "mc", q: "p = 0,20. O que concluir?", o: ["Não há evidência suficiente para rejeitar $H_0$", "$H_0$ é verdadeira", "O efeito é pequeno"], a: 0 },
    { t: "mc", q: "O erro tipo I é…", o: ["rejeitar $H_0$ quando ela é verdadeira", "não rejeitar $H_0$ quando ela é falsa", "usar o teste errado"], a: 0 },
    { t: "num", q: "Com 10 testes independentes a α = 0,05, qual é a probabilidade de pelo menos um falso positivo? (três casas)", a: 0.401, tol: 0.005 },
    { t: "num", q: "Pela correção de Bonferroni, qual α usar em cada uma de 5 comparações (α global = 0,05)?", a: 0.01, tol: 0.0001 },
    { t: "mc", q: "Em qual situação um teste unilateral é mais defensável?", o: ["Um protocolo pré-registrado testa se um novo método reduz o tempo de processamento; aumento não mudaria a decisão de não adotar", "O resultado bilateral deu p = 0,07 e o efeito foi na direção esperada", "Não se sabe se o tratamento ajuda ou atrapalha"], a: 0 },
    { t: "num", q: "Estatística $z = 1{,}80$. Qual é o p-valor bilateral? (três casas)", a: 0.072, tol: 0.002 },
    { t: "mc", q: "Com o mesmo $z = 1{,}80$, num teste unilateral **definido a priori** na direção observada, a α = 0,05…", o: ["rejeita $H_0$ (p ≈ 0,036)", "não rejeita $H_0$", "o p-valor é 0,144"], a: 0 },
    { t: "mc", q: "Mantendo o efeito e α, qual mudança aumenta o poder?", o: ["Aumentar o tamanho da amostra", "Reduzir o tamanho da amostra", "Trocar para um teste bilateral"], a: 0 },
    { t: "tf", q: "Se p > 0,05, podemos concluir que $H_0$ é verdadeira.", a: false },
    { t: "mc", q: "Pergunta: 'o novo fármaco reduz a pressão mais que o placebo?' Quais são as hipóteses de um teste unilateral?", o: ["$H_0$: $\\mu_{novo} \\geq \\mu_{placebo}$; $H_1$: $\\mu_{novo} < \\mu_{placebo}$", "$H_0$: $\\mu_{novo} < \\mu_{placebo}$; $H_1$: $\\mu_{novo} \\geq \\mu_{placebo}$", "$H_0$: $\\bar{x}_{novo} = \\bar{x}_{placebo}$; $H_1$: $\\bar{x}_{novo} \\neq \\bar{x}_{placebo}$"], a: 0, ex: "A terceira usa estatísticas ($\\bar{x}$); hipóteses são sobre parâmetros. Muitos textos escrevem $H_0$ com '=' mesmo no unilateral; o essencial é que $H_1$ expresse a direção." },
    { t: "mc", q: "Estudo com 100.000 pessoas: p < 0,001, mas $d = 0{,}02$. Conclusão:", o: ["A diferença é estatisticamente significativa, mas provavelmente irrelevante na prática", "O efeito é grande e importante", "O resultado é um erro tipo I"], a: 0 },
    { t: "num", q: "Se β = 0,20, qual é o poder do teste?", a: 0.8, tol: 0.001 }
  ]
});
