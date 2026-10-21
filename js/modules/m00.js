MODULES.push({
  id: "m0", n: 0, short: "Revisão",
  title: "Revisão: população, amostra e tendência central",
  sub: "O vocabulário mínimo e as medidas de centro, com atenção a quando cada uma engana.",
  goals: [
    "Distinguir população de amostra e parâmetro de estatística",
    "Classificar variáveis (nominal, ordinal, intervalar, razão) e entender por que isso decide o teste",
    "Escolher entre média, mediana e moda conforme a forma dos dados"
  ],
  blocks: [
    { h: "Por que precisamos de estatística inferencial?" },
    { p: "Quase nunca medimos todos os indivíduos que nos interessam. Medimos uma **amostra** e queremos dizer algo sobre a **população**. O problema é que outra amostra daria números um pouco diferentes: existe **variabilidade**. Toda a estatística inferencial é, no fundo, uma forma organizada de separar o que é padrão real do que é variação ao acaso." },
    { h: "População × amostra, parâmetro × estatística" },
    { p: "Um **parâmetro** descreve a população e é, em geral, desconhecido. Uma **estatística** é calculada na amostra e serve para estimar o parâmetro. A convenção é usar letras gregas para parâmetros e letras latinas para estatísticas." },
    { table: { head: ["Quantidade", "Parâmetro (população)", "Estatística (amostra)"], rows: [
      ["Média", "$\\mu$", "$\\bar{x}$"],
      ["Variância", "$\\sigma^2$", "$s^2$"],
      ["Desvio-padrão", "$\\sigma$", "$s$"],
      ["Proporção", "$\\pi$ ou $p$", "$\\hat{p}$"],
      ["Correlação", "$\\rho$", "$r$"],
      ["Tamanho", "$N$", "$n$"]
    ] } },
    { box: "atencao", t: "Uma estatística é uma variável aleatória", c: ["Se você repetir o estudo, $\\bar{x}$ muda. Essa ideia simples (a estatística tem uma distribuição própria) é a base de testes e intervalos de confiança. Vamos explorá-la no Módulo 3."] },
    { h: "Tipos de variável" },
    { table: { head: ["Tipo", "O que permite", "Exemplos"], rows: [
      ["Nominal", "Só igualdade/diferença", "Grupo sanguíneo, espécie, sexo"],
      ["Ordinal", "Ordem, mas distâncias não são iguais", "Escolaridade, escala Likert, estágio de um tumor"],
      ["Intervalar", "Distâncias iguais, zero arbitrário", "Temperatura em °C, ano do calendário"],
      ["Razão", "Distâncias iguais e zero absoluto", "Peso, altura, tempo de reação, concentração"]
    ] } },
    { p: "Variáveis quantitativas também podem ser **discretas** (contagens: número de filhos) ou **contínuas** (qualquer valor num intervalo: altura). A escala da variável é o primeiro filtro para escolher um teste: médias e variâncias só fazem sentido pleno em escalas intervalares ou de razão." },
    { h: "Medidas de tendência central" },
    { f: "\\bar{x} = \\frac{1}{n}\\sum_{i=1}^{n} x_i", leg: [["\\bar{x}", "média amostral"], ["n", "tamanho da amostra"], ["x_i", "i-ésima observação"]] },
    { list: [
      "**Média**: o ponto de equilíbrio dos dados. A soma dos desvios em relação a ela é sempre zero: $\\sum (x_i - \\bar{x}) = 0$.",
      "**Mediana**: o valor do meio dos dados ordenados (com $n$ par, a média dos dois centrais). Divide os dados em duas metades.",
      "**Moda**: o valor mais frequente. Útil para dados nominais e para identificar distribuições com mais de um pico."
    ] },
    { box: "intuicao", t: "Cada medida responde a uma pergunta de otimização", c: [
      "A **média** é o valor $c$ que minimiza $\\sum (x_i - c)^2$, a soma dos **quadrados** dos desvios.",
      "A **mediana** é o valor que minimiza $\\sum |x_i - c|$, a soma dos desvios **absolutos**.",
      "Por isso a média se aproxima dos valores extremos (um desvio grande, ao quadrado, pesa muito) e a mediana não. Essa ligação entre média e soma de quadrados reaparece em variância, ANOVA e regressão."
    ] },
    { box: "exemplo", t: "Um único valor extremo", c: [
      "Rendas mensais (em mil reais) de seis pessoas: 2, 2, 3, 3, 4, 50.",
      "Média $= 64/6 \\approx 10{,}67$. Mediana $= (3+3)/2 = 3$.",
      "A média descreve uma pessoa que não existe no grupo; a mediana representa melhor o 'típico'. Em distribuições **assimétricas à direita** (renda, tempo até um evento, concentração de poluentes) temos tipicamente moda < mediana < média."
    ] },
    { box: "erro", t: "Média de escala Likert", c: ["Calcular média de respostas 'discordo totalmente' a 'concordo totalmente' trata a distância entre categorias como igual, o que é uma suposição. É prática comum, mas deve ser justificada; mediana e testes baseados em postos são alternativas mais seguras para itens isolados."] }
  ],
  pratica: {
    python: [
      { h: "Média, mediana e moda", code: `
import numpy as np
import pandas as pd
from scipy import stats

renda = np.array([2, 2, 3, 3, 4, 50])
print("média:", renda.mean())
print("mediana:", np.median(renda))
print("moda:", stats.mode(renda, keepdims=False).mode)

# Com pandas, um resumo completo de uma vez
s = pd.Series(renda, name="renda")
print(s.describe())
` }
    ],
    spss: [
      { h: "Frequências e medidas de centro", menu: "Analyze › Descriptive Statistics › Frequencies… › Statistics: Mean, Median, Mode", syntax: `
FREQUENCIES VARIABLES=renda
  /STATISTICS=MEAN MEDIAN MODE
  /ORDER=ANALYSIS.
` },
      { h: "Definir o nível de medida", p: "Na aba *Variable View*, a coluna **Measure** (Scale, Ordinal, Nominal) diz ao SPSS que tipo de variável é. Vários menus só oferecem as opções adequadas quando isso está correto." }
    ]
  },
  ex: [
    { t: "mc", q: "Num estudo com 40 pacientes, a pressão sistólica média da amostra foi 128 mmHg. Esse número é…", o: ["uma estatística", "um parâmetro", "uma população"], a: 0, ex: "É calculado na amostra; estima o parâmetro $\\mu$." },
    { t: "mc", q: "Escolaridade (fundamental, médio, superior) é uma variável…", o: ["ordinal", "nominal", "intervalar", "de razão"], a: 0 },
    { t: "mc", q: "Temperatura em graus Celsius está em escala…", o: ["intervalar", "de razão", "ordinal"], a: 0, ex: "0 °C não significa 'ausência de temperatura'; 20 °C não é 'o dobro' de 10 °C." },
    { t: "num", q: "Calcule a média de 4, 8, 6, 5, 7.", a: 6, tol: 0.001 },
    { t: "num", q: "Calcule a mediana de 3, 9, 1, 7, 4, 10.", a: 5.5, tol: 0.001, ex: "Ordenados: 1, 3, 4, 7, 9, 10. Média dos dois centrais: (4 + 7)/2." },
    { t: "num", q: "Rendas: 2, 2, 3, 3, 4, 50. Qual é a média? (duas casas decimais)", a: 10.67, tol: 0.01 },
    { t: "mc", q: "Numa distribuição assimétrica à direita, em geral…", o: ["média > mediana", "média < mediana", "média = mediana"], a: 0, ex: "A cauda longa à direita 'puxa' a média." },
    { t: "tf", q: "A soma dos desvios em relação à média é sempre zero.", a: true },
    { t: "mc", q: "Para descrever a renda 'típica' de um bairro onde mora um bilionário, a melhor medida é…", o: ["a mediana", "a média", "a amplitude"], a: 0 },
    { t: "mc", q: "O símbolo $\\sigma^2$ representa…", o: ["a variância populacional", "a variância amostral", "o desvio-padrão amostral"], a: 0 },
    { t: "mc", q: "A média é o valor que minimiza…", o: ["a soma dos quadrados dos desvios", "a soma dos desvios absolutos", "o número de desvios positivos"], a: 0, ex: "A mediana minimiza a soma dos desvios absolutos." }
  ]
});
