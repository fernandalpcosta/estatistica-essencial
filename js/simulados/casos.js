/* Gerado por tools/gerar_simulados.py. Não edite à mão: altere o gerador e rode-o de novo. */
const SIMULADOS = [
 {
  "id": "s1",
  "title": "Beta-alanina e os 400 metros",
  "tema": "Desempenho esportivo",
  "n": 22,
  "file": "simulado1_beta_alanina",
  "story": [
   "Uma marca de suplementos esportivos desenvolveu uma bebida com **beta-alanina** que, supostamente, melhora o desempenho em provas de velocidade prolongada. Vinte e dois atletas de um clube de atletismo do Porto correram os **400 metros** em dois dias diferentes: num dia tomaram a bebida com beta-alanina e, no outro, uma bebida placebo de sabor idêntico. O tempo (em segundos) foi registrado nas duas condições.",
   "Também foi registrado se o atleta usava **sapatilhas de bicos** (1 = sim, 2 = não), o sexo (1 = masculino, 2 = feminino) e o tempo de treino em meses. Numa avaliação anterior, atletas do mesmo nível que consumiram uma bebida isotônica comum fizeram os 400 m em **58,0 segundos**, em média."
  ],
  "vars": [
   {
    "name": "id",
    "label": "Identificação do participante",
    "type": "Nominal",
    "values": ""
   },
   {
    "name": "sexo",
    "label": "Sexo do atleta",
    "type": "Nominal",
    "values": "1 = Masculino, 2 = Feminino"
   },
   {
    "name": "bicos",
    "label": "Usa sapatilhas de bicos",
    "type": "Nominal",
    "values": "1 = Sim, 2 = Não"
   },
   {
    "name": "tempo_beta",
    "label": "Tempo nos 400 m (s) com bebida de beta-alanina",
    "type": "Escala",
    "values": "s"
   },
   {
    "name": "tempo_placebo",
    "label": "Tempo nos 400 m (s) com bebida placebo",
    "type": "Escala",
    "values": "s"
   },
   {
    "name": "meses_treino",
    "label": "Tempo de treino (meses)",
    "type": "Escala",
    "values": ""
   }
  ],
  "questions": [
   {
    "q": "Qual a porcentagem de indivíduos do sexo masculino e do sexo feminino nesta amostra?",
    "fields": [
     {
      "k": "num",
      "id": "m",
      "label": "Masculino",
      "a": 50.0,
      "tol": 0.06,
      "traps": [
       {
        "v": 11.0,
        "tol": 0.06,
        "m": "Você digitou a **frequência absoluta** (contagem de casos). A questão pede a porcentagem: use a coluna *Percent* (ou *Valid Percent*) da tabela de frequências."
       }
      ],
      "unit": "%"
     },
     {
      "k": "num",
      "id": "f",
      "label": "Feminino",
      "a": 50.0,
      "tol": 0.06,
      "traps": [
       {
        "v": 11.0,
        "tol": 0.06,
        "m": "Você digitou a **frequência absoluta**. Use a coluna *Percent*."
       }
      ],
      "unit": "%"
     }
    ],
    "theory": [
     "Para uma variável **nominal** (como sexo), a descrição adequada é a **distribuição de frequências**: quantos casos há em cada categoria (frequência absoluta) e qual a porcentagem do total (frequência relativa). Média e desvio-padrão não fazem sentido para códigos 1 e 2: são rótulos, não quantidades.",
     "A porcentagem é $\\% = \\dfrac{n_{categoria}}{N} \\times 100$. No SPSS, *Percent* usa todos os casos e *Valid Percent* exclui os valores omissos; como esta base não tem omissos, as duas colunas coincidem."
    ],
    "spss": {
     "menu": "Analyze › Descriptive Statistics › Frequencies… → coloque `sexo` em *Variable(s)* → OK",
     "syntax": "FREQUENCIES VARIABLES=sexo\n  /ORDER=ANALYSIS."
    },
    "out": "Sexo do atleta\n-----------------------------------------------------------------------\n                  Frequency  Percent  Valid Percent  Cumulative Percent\n-----------------------------------------------------------------------\nValid  Masculino         11     50.0           50.0                50.0\n       Feminino          11     50.0           50.0               100.0\n       Total             22    100.0          100.0                    \n-----------------------------------------------------------------------",
    "sol": "Há 11 homens e 11 mulheres em 22 casos: 11/22 × 100 = **50,0%** masculino e 11/22 × 100 = **50,0%** feminino."
   },
   {
    "q": "Qual a porcentagem de atletas que usaram sapatilhas de bicos?",
    "fields": [
     {
      "k": "num",
      "id": "p",
      "label": "Porcentagem",
      "a": 54.5,
      "tol": 0.06,
      "traps": [
       {
        "v": 12.0,
        "tol": 0.06,
        "m": "Você digitou a **contagem**, não a porcentagem."
       },
       {
        "v": 45.454545,
        "tol": 0.06,
        "m": "Este é o valor da outra categoria (**Não**). Confira os códigos: 1 = Sim, 2 = Não."
       }
      ],
      "unit": "%"
     }
    ],
    "theory": [
     "Mesmo raciocínio da questão anterior: variável nominal → tabela de frequências. O cuidado aqui é **ler a categoria certa**: confira em *Variable View › Values* qual código corresponde a cada rótulo. Se ativar *View › Value Labels*, a *Data View* mostra os rótulos no lugar dos números."
    ],
    "spss": {
     "menu": "Analyze › Descriptive Statistics › Frequencies… → `bicos` → OK",
     "syntax": "FREQUENCIES VARIABLES=bicos\n  /ORDER=ANALYSIS."
    },
    "out": "Usa sapatilhas de bicos\n-----------------------------------------------\n              Frequency  Percent  Valid Percent\n-----------------------------------------------\nValid  Sim           12     54.5           54.5\n       Não           10     45.5           45.5\n       Total         22    100.0          100.0\n-----------------------------------------------",
    "sol": "12 de 22 casos na categoria **Sim** → 12/22 × 100 = **54,5%**."
   },
   {
    "q": "Os atletas que tomaram a bebida com beta-alanina foram **mais rápidos** (menor tempo) do que os atletas da avaliação anterior, que tomaram bebida isotônica (58,0 s)?",
    "fields": [
     {
      "k": "ch",
      "id": "yn",
      "label": "Resposta",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 0,
      "traps": {
       "1": "O p da hipótese da pergunta (0,020) é menor que 0,05: rejeita-se $H_0$, ou seja, **Sim**."
      }
     },
     {
      "k": "num",
      "id": "t",
      "label": "Valor de t",
      "a": -2.178,
      "tol": 0.01,
      "traps": [
       {
        "v": 2.178195,
        "tol": 0.01,
        "m": "O sinal está trocado. No teste t de uma amostra, $t = (\\bar{x} - \\mu_0)/EP$: é negativo quando a média amostral é menor que o valor de teste."
       },
       {
        "v": -0.894545,
        "tol": 0.01,
        "m": "Este é o *Mean Difference* ($\\bar{x} - \\mu_0$), não o t. O t divide essa diferença pelo erro-padrão."
       }
      ]
     },
     {
      "k": "num",
      "id": "p",
      "label": "Valor de p (adequado à pergunta)",
      "a": 0.020466,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.040932,
        "tol": 0.0015,
        "m": "Você usou o p **bilateral** (*Two-Sided p*). A pergunta tem direção (menor que a referência), então o teste é **unilateral**: como a média amostral está do lado previsto por $H_1$, o p unilateral é o bilateral dividido por 2 (*One-Sided p* no SPSS 27+)."
       }
      ]
     }
    ],
    "theory": [
     "Comparar a média de **uma amostra** com um **valor de referência conhecido** (aqui, 58,0 s, vindo de um estudo anterior) é o caso do **teste t de uma amostra** (*One-Sample T Test*). Não se trata de dois grupos medidos neste estudo: o valor de referência é um número fixo.",
     "Hipóteses: $H_0: \\mu = 58,0$ e $H_1: \\mu < 58,0$. A estatística é $t = \\dfrac{\\bar{x} - \\mu_0}{s/\\sqrt{n}}$, com $n - 1$ graus de liberdade.",
     "**Unilateral ou bilateral?** Se a pergunta tem direção (\"mais rápido\", \"gasta mais\", \"menos eficiente\"), o teste é unilateral. O SPSS 27+ mostra *One-Sided p* e *Two-Sided p*. Atenção: o *One-Sided p* do SPSS é sempre metade do bilateral, **calculado na direção em que a média caiu**. Se a média caiu do lado oposto ao da sua hipótese, o p correto é $1 - p_{bilateral}/2$. Em versões antigas, que só mostram *Sig. (2-tailed)*, divida por 2 quando a direção bater.",
     "Pressuposto: normalidade da variável, ou amostra grande o suficiente para o Teorema do Limite Central. Com $n \\approx 20$ e assimetria moderada o t ainda é razoavelmente robusto; a alternativa não paramétrica é o teste de Wilcoxon de uma amostra."
    ],
    "spss": {
     "menu": "Analyze › Compare Means › One-Sample T Test… → `tempo_beta` em *Test Variable(s)* → *Test Value* = 58 → OK",
     "syntax": "T-TEST\n  /TESTVAL=58\n  /VARIABLES=tempo_beta\n  /CRITERIA=CI(.95)."
    },
    "out": "One-Sample Statistics\n--------------------------------------------------------\n             N     Mean  Std. Deviation  Std. Error Mean\n--------------------------------------------------------\ntempo_beta  22  57.1055          1.9263           0.4107\n--------------------------------------------------------\n\nOne-Sample Test (Test Value = 58)\n-----------------------------------------------------------------\n                 t  df  One-Sided p  Two-Sided p  Mean Difference\n-----------------------------------------------------------------\ntempo_beta  -2.178  21         .020         .041          -0.8945\n-----------------------------------------------------------------",
    "sol": "Média = 57,11 s (DP = 1,926), $t(21) = −2,178$, p bilateral = 0,041. A média está do lado previsto por $H_1$, então p unilateral = 0,041/2 = **0,020**. Como p < 0,05, a resposta é **Sim**."
   },
   {
    "q": "Qual o valor da média e do desvio-padrão de **tempo nos 400 m (s) com bebida placebo**?",
    "fields": [
     {
      "k": "num",
      "id": "m",
      "label": "Média",
      "a": 58.261,
      "tol": 0.01,
      "traps": [
       {
        "v": 57.105455,
        "tol": 0.01,
        "m": "Este é o valor da outra variável (`tempo_beta`, com beta-alanina). A questão pede `tempo_placebo` (com placebo)."
       },
       {
        "v": 58.185,
        "tol": 0.01,
        "m": "Esta é a **mediana**, não a média."
       }
      ],
      "unit": "s"
     },
     {
      "k": "num",
      "id": "dp",
      "label": "Desvio-padrão",
      "a": 1.705,
      "tol": 0.01,
      "traps": [
       {
        "v": 0.363494,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão da média** (*Std. Error*), não o desvio-padrão. O EP = DP/√n mede a incerteza da média; o DP mede a dispersão dos dados."
       },
       {
        "v": 2.906812,
        "tol": 0.01,
        "m": "Você digitou a **variância**. O desvio-padrão é a raiz quadrada dela."
       },
       {
        "v": 1.926269,
        "tol": 0.01,
        "m": "Este é o DP da outra variável (`tempo_beta`)."
       },
       {
        "v": 1.665738,
        "tol": 0.01,
        "m": "Você calculou o DP dividindo por $n$ (populacional). O SPSS, e a estatística inferencial, usam $n - 1$."
       }
      ],
      "unit": "s"
     }
    ],
    "theory": [
     "Para uma variável **quantitativa** (escala), a descrição básica é uma medida de tendência central (média) e uma de dispersão (desvio-padrão).",
     "$\\bar{x} = \\dfrac{\\sum x_i}{n}$ e $s = \\sqrt{\\dfrac{\\sum (x_i - \\bar{x})^2}{n - 1}}$. Divide-se por $n - 1$ porque a amostra estima a variância populacional e já \"gastou\" um grau de liberdade ao estimar a média (Módulo 1).",
     "Não confunda o **desvio-padrão** (dispersão dos dados) com o **erro-padrão da média** ($EP = s/\\sqrt{n}$, a precisão da média), que aparece logo ao lado na saída do *Explore*."
    ],
    "spss": {
     "menu": "Analyze › Descriptive Statistics › Descriptives… → `tempo_placebo` → OK (ou *Explore*, que mostra mais estatísticas)",
     "syntax": "DESCRIPTIVES VARIABLES=tempo_placebo\n  /STATISTICS=MEAN STDDEV MIN MAX."
    },
    "out": "Descriptive Statistics\n-----------------------------------------------------------------\n                     N  Minimum  Maximum     Mean  Std. Deviation\n-----------------------------------------------------------------\ntempo_placebo       22    54.52    61.01  58.2614          1.7049\nValid N (listwise)  22                                           \n-----------------------------------------------------------------",
    "sol": "Média = **58,26 s** e desvio-padrão = **1,705 s**."
   },
   {
    "q": "Existe diferença entre os sexos no **tempo nos 400 m (s) com bebida de beta-alanina**?",
    "fields": [
     {
      "k": "num",
      "id": "lev",
      "label": "p do teste de Levene",
      "a": 0.964283,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.21996,
        "tol": 0.0015,
        "m": "Este é o p do **teste t**, não o do Levene. O Levene vem nas primeiras colunas da tabela (*F* e *Sig.*)."
       },
       {
        "v": 0.002056,
        "tol": 0.0015,
        "m": "Este é o **F** do Levene; o campo pede o p (*Sig.*)."
       }
      ]
     },
     {
      "k": "ch",
      "id": "row",
      "label": "Linha da tabela a usar",
      "o": [
       "Equal variances assumed (t de Student)",
       "Equal variances not assumed (t de Welch)"
      ],
      "a": 0,
      "traps": {
       "1": "O Levene deu p > 0,05: não há evidência de variâncias diferentes, então use a linha *Equal variances assumed*."
      }
     },
     {
      "k": "num",
      "id": "p",
      "label": "p do teste t",
      "a": 0.21996,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.964283,
        "tol": 0.0015,
        "m": "Este é o p do **Levene** (que testa variâncias, não médias). O p do teste t está em *Two-Sided p* / *Sig. (2-tailed)*."
       },
       {
        "v": 0.10998,
        "tol": 0.0015,
        "m": "Você usou o p unilateral. A pergunta (\"existe diferença?\") não tem direção: use o *Two-Sided p*."
       }
      ]
     },
     {
      "k": "ch",
      "id": "yn",
      "label": "Existe diferença?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 1,
      "traps": {
       "0": "O p do teste t (0,220) é maior que 0,05: não se rejeita $H_0$ → **Não** há evidência de diferença."
      }
     }
    ],
    "theory": [
     "Dois **grupos independentes** (homens e mulheres são pessoas diferentes) e uma variável quantitativa → **teste t para amostras independentes**. $H_0: \\mu_M = \\mu_F$.",
     "O SPSS faz antes o **teste de Levene**, cuja $H_0$ é *variâncias iguais*. Se p do Levene > 0,05, use a linha *Equal variances assumed* (t de Student, com variância combinada). Se p < 0,05, use *Equal variances not assumed* (t de Welch, que corrige os graus de liberdade).",
     "Erro frequente: tomar o p do Levene como resposta. O Levene responde se as **variâncias** diferem; a pergunta é sobre as **médias**.",
     "Pressuposto adicional: normalidade em cada grupo. Se a variável fosse muito assimétrica, com grupos pequenos, a alternativa seria o **Mann-Whitney** (*Nonparametric Tests › Legacy Dialogs › 2 Independent Samples*)."
    ],
    "spss": {
     "menu": "Analyze › Compare Means › Independent-Samples T Test… → `tempo_beta` em *Test Variable(s)*, `sexo` em *Grouping Variable* → *Define Groups*: 1 e 2 → OK",
     "syntax": "T-TEST GROUPS=sexo(1 2)\n  /VARIABLES=tempo_beta\n  /CRITERIA=CI(.95)."
    },
    "out": "Group Statistics\n--------------------------------------\nsexo        N     Mean  Std. Deviation\n--------------------------------------\nMasculino  11  57.6182          1.7751\nFeminino   11  56.5927          2.0156\n--------------------------------------\n\nIndependent Samples Test (tempo_beta)\n-----------------------------------------------------------------------------------\n                             Levene F  Sig.      t      df  Two-Sided p  Mean Diff.\n-----------------------------------------------------------------------------------\nEqual variances assumed         0.002  .964  1.266      20         .220      1.0255\nEqual variances not assumed                  1.266  19.686         .220      1.0255\n-----------------------------------------------------------------------------------",
    "sol": "Levene: F = 0,002, p = 0,964 → variâncias homogêneas, linha **Equal variances assumed**. Teste t: **p = 0,220** → **não** há diferença significativa entre os sexos."
   },
   {
    "q": "Qual a média e o desvio-padrão de **tempo nos 400 m (s) com bebida placebo**, para o sexo masculino e para o feminino?",
    "fields": [
     {
      "k": "num",
      "id": "mm",
      "label": "Masculino: média",
      "a": 58.624,
      "tol": 0.01,
      "traps": [
       {
        "v": 57.899091,
        "tol": 0.01,
        "m": "Este é o valor do sexo **feminino**."
       },
       {
        "v": 57.618182,
        "tol": 0.01,
        "m": "Este é o valor de `tempo_beta`; a questão pede `tempo_placebo`."
       }
      ],
      "unit": "s"
     },
     {
      "k": "num",
      "id": "dm",
      "label": "Masculino: desvio-padrão",
      "a": 1.628,
      "tol": 0.01,
      "traps": [
       {
        "v": 0.490911,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão**, não o DP."
       },
       {
        "v": 1.778946,
        "tol": 0.01,
        "m": "Este é o DP do sexo **feminino**."
       },
       {
        "v": 1.77515,
        "tol": 0.01,
        "m": "Este é o DP de `tempo_beta`."
       }
      ],
      "unit": "s"
     },
     {
      "k": "num",
      "id": "mf",
      "label": "Feminino: média",
      "a": 57.899,
      "tol": 0.01,
      "traps": [
       {
        "v": 58.623636,
        "tol": 0.01,
        "m": "Este é o valor do sexo **masculino**."
       },
       {
        "v": 56.592727,
        "tol": 0.01,
        "m": "Este é o valor de `tempo_beta`."
       }
      ],
      "unit": "s"
     },
     {
      "k": "num",
      "id": "df",
      "label": "Feminino: desvio-padrão",
      "a": 1.779,
      "tol": 0.01,
      "traps": [
       {
        "v": 0.536372,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão**, não o DP."
       },
       {
        "v": 1.628166,
        "tol": 0.01,
        "m": "Este é o DP do sexo **masculino**."
       },
       {
        "v": 2.01558,
        "tol": 0.01,
        "m": "Este é o DP de `tempo_beta`."
       }
      ],
      "unit": "s"
     }
    ],
    "theory": [
     "Descritivas **por grupo**: a mesma média e o mesmo DP da questão 4, mas calculados separadamente para cada categoria de outra variável. É o que se reporta sempre que se comparam grupos (e é a tabela *Group Statistics* do teste t).",
     "Há três caminhos no SPSS: *Compare Means › Means* (o mais direto), *Explore* com `sexo` em *Factor List*, ou *Data › Split File* seguido de *Descriptives*. Se usar *Split File*, lembre-se de **desligá-lo** depois (*Analyze all cases*), senão todas as análises seguintes sairão divididas por sexo."
    ],
    "spss": {
     "menu": "Analyze › Compare Means › Means… → `tempo_placebo` em *Dependent List*, `sexo` em *Independent List* → OK",
     "syntax": "MEANS TABLES=tempo_placebo BY sexo\n  /CELLS=MEAN COUNT STDDEV."
    },
    "out": "Report (tempo_placebo)\n--------------------------------------\nsexo          Mean   N  Std. Deviation\n--------------------------------------\nMasculino  58.6236  11          1.6282\nFeminino   57.8991  11          1.7789\nTotal      58.2614  22          1.7049\n--------------------------------------",
    "sol": "Masculino: média **58,62**, DP **1,628**. Feminino: média **57,90**, DP **1,779** (s)."
   },
   {
    "q": "A distribuição de **tempo nos 400 m (s) com bebida de beta-alanina** segue uma distribuição normal?",
    "fields": [
     {
      "k": "ch",
      "id": "yn",
      "label": "Existe normalidade?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 0,
      "traps": {
       "1": "No Shapiro-Wilk, $H_0$ é *os dados vêm de uma distribuição normal*. p = 0,526 > 0,05: não se rejeita a normalidade → **Sim**."
      }
     },
     {
      "k": "num",
      "id": "w",
      "label": "Estatística (W de Shapiro-Wilk)",
      "a": 0.962,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.125893,
        "tol": 0.0015,
        "m": "Esta é a estatística do **Kolmogorov-Smirnov** (primeiras colunas da tabela). Com n < 50 usa-se a coluna **Shapiro-Wilk**."
       },
       {
        "v": 0.967326,
        "tol": 0.0015,
        "m": "Este é o W de `tempo_placebo`; a questão pede `tempo_beta`."
       }
      ]
     },
     {
      "k": "num",
      "id": "p",
      "label": "Valor de p",
      "a": 0.526337,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.649252,
        "tol": 0.0015,
        "m": "Este é o p de `tempo_placebo`; a questão pede `tempo_beta`."
       }
      ]
     }
    ],
    "theory": [
     "O teste de **Shapiro-Wilk** verifica se a amostra é compatível com uma população normal. $H_0$: a distribuição é normal; $H_1$: não é. Ao contrário da maioria dos testes, aqui **queremos não rejeitar** $H_0$ (p > 0,05) para poder usar testes paramétricos.",
     "O SPSS mostra dois testes na tabela *Tests of Normality*: Kolmogorov-Smirnov (com correção de Lilliefors) e Shapiro-Wilk. Para amostras pequenas (n < 50) o **Shapiro-Wilk** é o recomendado, por ter mais poder.",
     "O W varia entre 0 e 1: quanto mais perto de 1, mais os dados ordenados se alinham com o que se esperaria de uma normal. Complemente sempre com o **Q-Q plot** (*Normal Q-Q Plot*, gerado pela opção *Normality plots with tests*): pontos longe da reta indicam afastamento da normalidade."
    ],
    "spss": {
     "menu": "Analyze › Descriptive Statistics › Explore… → `tempo_beta` em *Dependent List* → *Plots…* → marque **Normality plots with tests** → Continue → OK",
     "syntax": "EXAMINE VARIABLES=tempo_beta\n  /PLOT BOXPLOT NPPLOT\n  /STATISTICS DESCRIPTIVES\n  /NOTOTAL."
    },
    "out": "Tests of Normality\n------------------------------------------------------------\n            K-S Statistic  df  Sig.  S-W Statistic  df  Sig.\n------------------------------------------------------------\ntempo_beta          0.126  22   ...          0.962  22  .526\n------------------------------------------------------------\na. Lilliefors Significance Correction",
    "sol": "Shapiro-Wilk: **W = 0,962**, **p = 0,526** → não se rejeita $H_0$: a distribuição pode ser considerada **normal**."
   },
   {
    "q": "Faça um teste para avaliar a associação entre **meses de treino** e **tempo nos 400 m (s) com bebida de beta-alanina**. Escolha a estatística mais adequada.",
    "fields": [
     {
      "k": "ch",
      "id": "test",
      "label": "Teste escolhido",
      "o": [
       "Correlação de Pearson",
       "Correlação de Spearman"
      ],
      "a": 0,
      "traps": {
       "1": "`tempo_beta` (p = 0,526) e `meses_treino` (p = 0,310) têm distribuição compatível com a normal no Shapiro-Wilk, então o coeficiente de **Pearson** é adequado."
      }
     },
     {
      "k": "num",
      "id": "r",
      "label": "Valor da correlação",
      "a": -0.868,
      "tol": 0.005,
      "traps": [
       {
        "v": -0.878559,
        "tol": 0.005,
        "m": "Este é o coeficiente do **outro** teste. `tempo_beta` (p = 0,526) e `meses_treino` (p = 0,310) têm distribuição compatível com a normal no Shapiro-Wilk, então o coeficiente de **Pearson** é adequado."
       },
       {
        "v": 0.752842,
        "tol": 0.005,
        "m": "Você digitou o $r^2$ (coeficiente de determinação). A questão pede o próprio coeficiente de correlação."
       },
       {
        "v": 0.867665,
        "tol": 0.005,
        "m": "O sinal está trocado. Confira o sentido da relação no diagrama de dispersão."
       }
      ]
     },
     {
      "k": "num",
      "id": "p",
      "label": "Valor de p",
      "a": 0.0,
      "tol": 0.0015,
      "traps": [],
      "lt": true
     }
    ],
    "theory": [
     "**Pearson** ($r$) mede associação **linear** entre duas variáveis quantitativas; pressupõe normalidade (bivariada) e é sensível a valores extremos. **Spearman** ($\\rho$) é a correlação de Pearson aplicada aos **postos**: mede associação **monotônica** e não exige normalidade.",
     "Regra prática da disciplina: verifique a normalidade das duas variáveis (Shapiro-Wilk). Se ambas forem normais, use Pearson; se pelo menos uma não for, use Spearman.",
     "Interpretação: o sinal dá o sentido (positivo: as duas crescem juntas; negativo: uma cresce enquanto a outra diminui) e o módulo dá a força (regra de bolso: < 0,3 fraca, 0,3 a 0,7 moderada, > 0,7 forte). $H_0$ do teste: $\\rho = 0$ na população.",
     "Correlação não é causalidade. Antes de tudo, olhe o diagrama de dispersão (*Graphs › Legacy Dialogs › Scatter/Dot*)."
    ],
    "spss": {
     "menu": "Analyze › Correlate › Bivariate… → `meses_treino` e `tempo_beta` em *Variables* → marque **Pearson** → OK. (Verifique a normalidade das duas antes, em *Explore*.)",
     "syntax": "EXAMINE VARIABLES=meses_treino tempo_beta\n  /PLOT NPPLOT\n  /NOTOTAL.\n\nCORRELATIONS\n  /VARIABLES=meses_treino tempo_beta\n  /PRINT=TWOTAIL NOSIG."
    },
    "out": "Tests of Normality (Shapiro-Wilk)\n---------------------------------\n              Statistic  df  Sig.\n---------------------------------\nmeses_treino      0.950  22  .310\ntempo_beta        0.962  22  .526\n---------------------------------\n\nCorrelations\n---------------------------------------------\n                                   tempo_beta\n---------------------------------------------\nmeses_treino  Pearson Correlation       -.868\n                  Sig. (2-tailed)        .000\n                                N          22\n---------------------------------------------",
    "sol": "`tempo_beta` (p = 0,526) e `meses_treino` (p = 0,310) têm distribuição compatível com a normal no Shapiro-Wilk, então o coeficiente de **Pearson** é adequado. Resultado: **r = −0,868**, **p < 0,001**: associação forte negativa e significativa entre meses de treino e tempo nos 400 m (s) com bebida de beta-alanina. (Para comparação, o outro coeficiente daria −0,879.)"
   },
   {
    "q": "Existe diferença entre os tempos médios nos 400 m com beta-alanina e com placebo?",
    "fields": [
     {
      "k": "ch",
      "id": "test",
      "label": "Teste escolhido",
      "o": [
       "t para amostras emparelhadas",
       "Wilcoxon",
       "t para amostras independentes",
       "Mann-Whitney"
      ],
      "a": 0,
      "traps": {
       "2": "As duas medidas são das **mesmas pessoas** (cada participante foi medido nas duas condições), então as amostras são **emparelhadas**, não independentes.",
       "3": "O Mann-Whitney é para grupos **independentes**. Aqui as mesmas pessoas foram medidas duas vezes: amostras emparelhadas.",
       "1": "As diferenças (tempo_beta − tempo_placebo) seguem a normal (Shapiro-Wilk p = 0,767), então o teste paramétrico, **t emparelhado**, é o adequado."
      }
     },
     {
      "k": "ch",
      "id": "yn",
      "label": "Existe diferença?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 0,
      "traps": {
       "1": "O p (< 0,001) é menor que 0,05 → **Sim**."
      }
     },
     {
      "k": "num",
      "id": "p",
      "label": "Valor de p",
      "a": 0.0,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.041073,
        "tol": 0.0015,
        "m": "Este é o p de um t para amostras **independentes**, que ignora o emparelhamento."
       },
       {
        "v": 0.766769,
        "tol": 0.0015,
        "m": "Este é o p do Shapiro-Wilk das diferenças (o pressuposto), não do teste de comparação."
       }
      ],
      "lt": true
     },
     {
      "k": "num",
      "id": "ma",
      "label": "Média com beta-alanina",
      "a": 57.105,
      "tol": 0.01,
      "traps": [
       {
        "v": 58.261364,
        "tol": 0.01,
        "m": "Você trocou as condições."
       }
      ],
      "unit": "s"
     },
     {
      "k": "num",
      "id": "mb",
      "label": "Média com placebo",
      "a": 58.261,
      "tol": 0.01,
      "traps": [
       {
        "v": 57.105455,
        "tol": 0.01,
        "m": "Você trocou as condições."
       }
      ],
      "unit": "s"
     }
    ],
    "theory": [
     "Cada participante foi medido **nas duas condições**: as observações estão emparelhadas. O teste analisa a **diferença** dentro de cada pessoa, o que remove a variação entre pessoas (atletas mais rápidos são rápidos nas duas condições) e dá muito mais poder do que comparar dois grupos independentes.",
     "O pressuposto do **t emparelhado** é a normalidade das **diferenças** (não de cada variável separadamente). Crie a variável diferença em *Transform › Compute Variable* e aplique o Shapiro-Wilk a ela. Se não for normal, use o **Wilcoxon** (postos sinalizados).",
     "$t = \\dfrac{\\bar{d}}{s_d/\\sqrt{n}}$, com $n - 1$ graus de liberdade, onde $d_i$ é a diferença de cada participante. O Wilcoxon ordena os $|d_i|$, soma os postos das diferenças positivas e das negativas e compara com o esperado sob $H_0$ (aproximação normal, Z)."
    ],
    "spss": {
     "menu": "Transform › Compute Variable… (dif = tempo_beta − tempo_placebo) → Explore com *Normality plots with tests*. Depois: Analyze › Compare Means › Paired-Samples T Test… → par `tempo_beta` / `tempo_placebo` → OK",
     "syntax": "COMPUTE dif=tempo_beta-tempo_placebo.\nEXECUTE.\nEXAMINE VARIABLES=dif\n  /PLOT NPPLOT\n  /NOTOTAL.\n\nT-TEST PAIRS=tempo_beta WITH tempo_placebo (PAIRED)\n  /CRITERIA=CI(.95)."
    },
    "out": "Tests of Normality (dif)\n-------------------------------------------------\n     K-S Statistic  Sig.  S-W Statistic  df  Sig.\n-------------------------------------------------\ndif          0.121   ...          0.972  22  .767\n-------------------------------------------------\n\nPaired Samples Statistics\n------------------------------------------\n                  Mean   N  Std. Deviation\n------------------------------------------\ntempo_beta     57.1055  22          1.9263\ntempo_placebo  58.2614  22          1.7049\n------------------------------------------\n\nPaired Samples Test\n--------------------------------------------------------------------------\n                            Mean (dif)  Std. Dev.       t  df  Two-Sided p\n--------------------------------------------------------------------------\ntempo_beta - tempo_placebo     -1.1559     0.5524  -9.815  21         .000\n--------------------------------------------------------------------------",
    "sol": "As medidas são emparelhadas. Shapiro-Wilk das diferenças: p = 0,767 → normal → **t emparelhado**: $t(21) = −9,815$, **p < 0,001**. Médias: 57,11 s (com beta-alanina) e 58,26 s (com placebo). Há diferença significativa."
   },
   {
    "q": "Crie uma nova variável (**grupotreino**) com base em `meses_treino`. Atribua os valores 1, 2, 3 e 4, respectivamente, a: até 9 meses; 10 a 11 meses; 12 a 14 meses; 15 meses ou mais. Qual o tamanho, a média e o desvio-padrão de `meses_treino` em cada grupo criado?",
    "fields": [
     {
      "k": "num",
      "id": "n1",
      "label": "Grupo 1: n",
      "a": 5.0,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "m1",
      "label": "Grupo 1: média",
      "a": 8.2,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "s1",
      "label": "Grupo 1: DP",
      "a": 0.837,
      "tol": 0.01,
      "traps": [
       {
        "v": 0.374166,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão**, não o DP."
       }
      ]
     },
     {
      "k": "num",
      "id": "n2",
      "label": "Grupo 2: n",
      "a": 6.0,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "m2",
      "label": "Grupo 2: média",
      "a": 10.333,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "s2",
      "label": "Grupo 2: DP",
      "a": 0.516,
      "tol": 0.01,
      "traps": [
       {
        "v": 0.210819,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão**, não o DP."
       }
      ]
     },
     {
      "k": "num",
      "id": "n3",
      "label": "Grupo 3: n",
      "a": 6.0,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "m3",
      "label": "Grupo 3: média",
      "a": 13.0,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "s3",
      "label": "Grupo 3: DP",
      "a": 0.894,
      "tol": 0.01,
      "traps": [
       {
        "v": 0.365148,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão**, não o DP."
       }
      ]
     },
     {
      "k": "num",
      "id": "n4",
      "label": "Grupo 4: n",
      "a": 5.0,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "m4",
      "label": "Grupo 4: média",
      "a": 16.2,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "s4",
      "label": "Grupo 4: DP",
      "a": 0.837,
      "tol": 0.01,
      "traps": [
       {
        "v": 0.374166,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão**, não o DP."
       }
      ]
     }
    ],
    "grid": 3,
    "theory": [
     "**Recodificar** transforma uma variável quantitativa em categorias (classes). Use sempre *Recode into Different Variables*, para não destruir a variável original.",
     "Cuidado com os limites das classes: cada valor tem de cair em **uma e só uma** classe. Com valores inteiros, \"10 a 11 meses\" corresponde a `10 THRU 11=2`. Use `LOWEST` para a primeira classe e `HIGHEST` para a última.",
     "Depois de recodificar, dê rótulos aos códigos (*Variable View › Values*) e mude a medida da nova variável para **Nominal** ou **Ordinal**: alguns procedimentos (como o Kruskal-Wallis pelo menu *Independent Samples*) exigem isso.",
     "Confira sempre o resultado: o tamanho de cada grupo (n) mostra se a recodificação ficou certa. Se algum n não bater, revise os limites (o caso mais comum é um valor de fronteira cair na classe errada ou ficar *System Missing*)."
    ],
    "spss": {
     "menu": "Transform › Recode into Different Variables… → `meses_treino` → *Output Variable*: `grupotreino` → Change → *Old and New Values…*: Range, LOWEST through 9 → 1; Range 10 through 11 → 2; Range 12 through 14 → 3; Range, 15 through HIGHEST → 4 → Continue → OK. Depois: Analyze › Compare Means › Means… (`meses_treino` BY `grupotreino`)",
     "syntax": "RECODE meses_treino (LOWEST THRU 9=1) (10 THRU 11=2) (12 THRU 14=3) (15 THRU HIGHEST=4) INTO grupotreino.\nVARIABLE LABELS grupotreino 'Grupo de tempo de treino'.\nVALUE LABELS grupotreino 1 'até 9 meses' 2 '10 a 11 meses' 3 '12 a 14 meses' 4 '15 meses ou mais'.\nVARIABLE LEVEL grupotreino (ORDINAL).\nEXECUTE.\n\nMEANS TABLES=meses_treino BY grupotreino\n  /CELLS=MEAN COUNT STDDEV."
    },
    "out": "Report (meses_treino)\n-----------------------------------------------\ngrupotreino            Mean   N  Std. Deviation\n-----------------------------------------------\n1 até 9 meses        8.2000   5          0.8367\n2 10 a 11 meses     10.3333   6          0.5164\n3 12 a 14 meses     13.0000   6          0.8944\n4 15 meses ou mais  16.2000   5          0.8367\nTotal               11.9091  22          3.0380\n-----------------------------------------------",
    "sol": "Grupo 1: n = 5, média = 8,20, DP = 0,837 · Grupo 2: n = 6, média = 10,33, DP = 0,516 · Grupo 3: n = 6, média = 13,00, DP = 0,894 · Grupo 4: n = 5, média = 16,20, DP = 0,837."
   },
   {
    "q": "Verifique se a nova variável (**grupotreino**) cumpre os pressupostos necessários para efetuar uma ANOVA de `tempo_placebo`.",
    "fields": [
     {
      "k": "ch",
      "id": "norm",
      "label": "Normalidade em todos os grupos?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 0,
      "traps": {
       "1": "Todos os grupos têm Shapiro-Wilk p > 0,05 → **Sim**."
      }
     },
     {
      "k": "num",
      "id": "p1",
      "label": "Grupo 1: p do Shapiro-Wilk",
      "a": 0.548706,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.922883,
        "tol": 0.0015,
        "m": "Este é o **W** (estatística), não o p (*Sig.*)."
       }
      ]
     },
     {
      "k": "num",
      "id": "p2",
      "label": "Grupo 2: p do Shapiro-Wilk",
      "a": 0.282135,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.882794,
        "tol": 0.0015,
        "m": "Este é o **W** (estatística), não o p (*Sig.*)."
       }
      ]
     },
     {
      "k": "num",
      "id": "p3",
      "label": "Grupo 3: p do Shapiro-Wilk",
      "a": 0.666994,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.940966,
        "tol": 0.0015,
        "m": "Este é o **W** (estatística), não o p (*Sig.*)."
       }
      ]
     },
     {
      "k": "num",
      "id": "p4",
      "label": "Grupo 4: p do Shapiro-Wilk",
      "a": 0.487555,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.913281,
        "tol": 0.0015,
        "m": "Este é o **W** (estatística), não o p (*Sig.*)."
       }
      ]
     },
     {
      "k": "ch",
      "id": "hom",
      "label": "Homogeneidade das variâncias?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 0,
      "traps": {
       "1": "Levene p = 0,947 > 0,05 → não se rejeita a igualdade das variâncias → **Sim**."
      }
     },
     {
      "k": "num",
      "id": "levF",
      "label": "Estatística de Levene",
      "a": 0.119,
      "tol": 0.01,
      "traps": [
       {
        "v": 0.068875,
        "tol": 0.01,
        "m": "Este é o Levene **baseado na mediana** (*Based on Median*). Use a primeira linha, *Based on Mean*."
       }
      ]
     },
     {
      "k": "num",
      "id": "levp",
      "label": "p do Levene",
      "a": 0.94746,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.975791,
        "tol": 0.0015,
        "m": "Este é o p do Levene **baseado na mediana**. Use a linha *Based on Mean*."
       }
      ]
     },
     {
      "k": "ch",
      "id": "ok",
      "label": "Poderia efetuar a ANOVA?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 0,
      "traps": {
       "1": "Normalidade em todos os grupos e variâncias homogêneas → os pressupostos estão cumpridos → **Sim**."
      }
     }
    ],
    "grid": 1,
    "theory": [
     "A **ANOVA one-way** compara as médias de 3 ou mais grupos independentes. Pressupostos: (1) observações independentes; (2) **normalidade em cada grupo** (ou dos resíduos); (3) **homogeneidade das variâncias** (homocedasticidade).",
     "**Normalidade**: Shapiro-Wilk **por grupo** (em *Explore*, coloque a variável de grupo em *Factor List*). Um único grupo com p < 0,05 já compromete o pressuposto. Com grupos tão pequenos (4 a 6 casos) o teste tem pouco poder, por isso olhe também os Q-Q plots e os boxplots.",
     "**Homogeneidade**: teste de **Levene**, $H_0$: as variâncias são iguais em todos os grupos. No SPSS 27+ ele aparece em quatro linhas; use a primeira, *Based on Mean*.",
     "Se só a homogeneidade falhar (dados normais), a alternativa mais adequada é a **ANOVA de Welch** (*Options › Welch*), com post-hoc de Games-Howell. Se a normalidade falhar com grupos pequenos, use o **Kruskal-Wallis**."
    ],
    "spss": {
     "menu": "Analyze › Descriptive Statistics › Explore… → `tempo_placebo` em *Dependent List*, `grupotreino` em *Factor List* → *Plots*: Normality plots with tests → OK. Depois: Analyze › Compare Means › One-Way ANOVA… → *Options*: **Homogeneity of variance test**",
     "syntax": "EXAMINE VARIABLES=tempo_placebo BY grupotreino\n  /PLOT BOXPLOT NPPLOT\n  /NOTOTAL.\n\nONEWAY tempo_placebo BY grupotreino\n  /STATISTICS DESCRIPTIVES HOMOGENEITY."
    },
    "out": "Tests of Normality (tempo_placebo, Shapiro-Wilk)\n--------------------------------\ngrupotreino  Statistic  df  Sig.\n--------------------------------\n1                0.923   5  .549\n2                0.883   6  .282\n3                0.941   6  .667\n4                0.913   5  .488\n--------------------------------\n\nTests of Homogeneity of Variances\n-------------------------------------------------\n                 Levene Statistic  df1  df2  Sig.\n-------------------------------------------------\nBased on Mean               0.119    3   18  .947\nBased on Median             0.069    3   18  .976\n...                                              \n-------------------------------------------------",
    "sol": "Shapiro-Wilk por grupo: grupo 1: W = 0,923, p = 0,549; grupo 2: W = 0,883, p = 0,282; grupo 3: W = 0,941, p = 0,667; grupo 4: W = 0,913, p = 0,488. Levene (*Based on Mean*): 0,119, p = 0,947. Pressupostos cumpridos → **pode** fazer a ANOVA."
   },
   {
    "q": "Os treinadores querem saber se, **com a bebida placebo**, os tempos nos 400 m diferem entre os grupos de tempo de treino. Escolha o teste adequado (com base na questão anterior).",
    "fields": [
     {
      "k": "ch",
      "id": "test",
      "label": "Teste escolhido",
      "o": [
       "ANOVA one-way",
       "Kruskal-Wallis"
      ],
      "a": 0,
      "traps": {
       "1": "Os pressupostos foram cumpridos (questão 11), então use a **ANOVA**, que tem mais poder do que o Kruskal-Wallis."
      }
     },
     {
      "k": "num",
      "id": "stat",
      "label": "Estatística do teste (F ou H)",
      "a": 13.231,
      "tol": 0.01,
      "traps": [
       {
        "v": 14.583333,
        "tol": 0.01,
        "m": "Esta é a estatística do **outro** teste. Os pressupostos foram cumpridos (questão 11), então use a **ANOVA**, que tem mais poder do que o Kruskal-Wallis."
       }
      ]
     },
     {
      "k": "num",
      "id": "p",
      "label": "Valor de p",
      "a": 8.4e-05,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.94746,
        "tol": 0.0015,
        "m": "Este é o p do **Levene** (pressuposto), não do teste de comparação."
       }
      ],
      "lt": true
     },
     {
      "k": "ch",
      "id": "yn",
      "label": "Existem diferenças entre os grupos?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 0,
      "traps": {
       "1": "p < 0,001 < 0,05 → rejeita-se $H_0$ de igualdade → **Sim**, pelo menos um grupo difere."
      }
     }
    ],
    "theory": [
     "**ANOVA one-way**: $H_0: \\mu_1 = \\mu_2 = \\mu_3 = \\mu_4$. $F = QM_{entre}/QM_{dentro}$, a razão entre a variação **entre** os grupos (sinal) e a variação **dentro** dos grupos (ruído). Sob $H_0$, $F \\approx 1$ (Módulo 8).",
     "**Kruskal-Wallis**: alternativa não paramétrica. Ordena todos os valores, calcula o posto médio de cada grupo e testa se as distribuições são iguais. A estatística H segue aproximadamente uma $\\chi^2$ com $k - 1$ graus de liberdade (Módulo 9).",
     "Um resultado significativo diz apenas que **pelo menos um** grupo difere de outro. Para saber quais, é preciso o post-hoc (próxima questão). Por que não vários testes t? Com 4 grupos há 6 pares, e o erro tipo I acumulado chegaria a cerca de 26%."
    ],
    "spss": {
     "menu": "Analyze › Compare Means › One-Way ANOVA… → `tempo_placebo` em *Dependent List*, `grupotreino` em *Factor* → OK",
     "syntax": "ONEWAY tempo_placebo BY grupotreino\n  /STATISTICS DESCRIPTIVES HOMOGENEITY."
    },
    "out": "ANOVA (tempo_placebo)\n-------------------------------------------------------------\n                Sum of Squares  df  Mean Square       F  Sig.\n-------------------------------------------------------------\nBetween Groups          41.998   3       13.999  13.231  .000\nWithin Groups           19.045  18        1.058              \nTotal                   61.043  21                           \n-------------------------------------------------------------",
    "sol": "ANOVA: $F(3, 18) = 13,231$, **p < 0,001**, $\\eta^2 = 0,69$. Há diferença entre pelo menos dois grupos."
   },
   {
    "q": "Em relação à questão anterior, aplique o teste *a posteriori* de **Tukey** e diga se, entre os grupos indicados, existem diferenças significativas (V ou F) e qual o valor de p.",
    "fields": [
     {
      "k": "ch",
      "id": "s13",
      "label": "Grupo 1 × grupo 3: há diferença?",
      "o": [
       "V",
       "F"
      ],
      "a": 0,
      "traps": {
       "1": "p = 0,006 < 0,05 → **V** (diferença significativa)."
      }
     },
     {
      "k": "num",
      "id": "p13",
      "label": "Grupo 1 × grupo 3: valor de p",
      "a": 0.006209,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.001242,
        "tol": 0.0015,
        "m": "Este é o p **sem correção** (LSD ou um t entre os dois grupos). O Tukey ajusta o p para as múltiplas comparações; use a coluna *Sig.* da tabela *Multiple Comparisons* com o **Tukey HSD**."
       }
      ]
     },
     {
      "k": "ch",
      "id": "s23",
      "label": "Grupo 2 × grupo 3: há diferença?",
      "o": [
       "V",
       "F"
      ],
      "a": 1,
      "traps": {
       "0": "p = 0,486 > 0,05 → **F** (sem diferença significativa)."
      }
     },
     {
      "k": "num",
      "id": "p23",
      "label": "Grupo 2 × grupo 3: valor de p",
      "a": 0.485782,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.164008,
        "tol": 0.0015,
        "m": "Este é o p **sem correção** (LSD ou um t entre os dois grupos). O Tukey ajusta o p para as múltiplas comparações; use a coluna *Sig.* da tabela *Multiple Comparisons* com o **Tukey HSD**."
       }
      ]
     },
     {
      "k": "ch",
      "id": "s14",
      "label": "Grupo 1 × grupo 4: há diferença?",
      "o": [
       "V",
       "F"
      ],
      "a": 0,
      "traps": {
       "1": "p < 0,001 < 0,05 → **V** (diferença significativa)."
      }
     },
     {
      "k": "num",
      "id": "p14",
      "label": "Grupo 1 × grupo 4: valor de p",
      "a": 4.7e-05,
      "tol": 0.0015,
      "traps": [],
      "lt": true
     },
     {
      "k": "ch",
      "id": "s24",
      "label": "Grupo 2 × grupo 4: há diferença?",
      "o": [
       "V",
       "F"
      ],
      "a": 0,
      "traps": {
       "1": "p = 0,005 < 0,05 → **V** (diferença significativa)."
      }
     },
     {
      "k": "num",
      "id": "p24",
      "label": "Grupo 2 × grupo 4: valor de p",
      "a": 0.004615,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.000914,
        "tol": 0.0015,
        "m": "Este é o p **sem correção** (LSD ou um t entre os dois grupos). O Tukey ajusta o p para as múltiplas comparações; use a coluna *Sig.* da tabela *Multiple Comparisons* com o **Tukey HSD**."
       }
      ]
     }
    ],
    "grid": 2,
    "theory": [
     "Os testes **post-hoc** (*a posteriori*) comparam os grupos dois a dois, **corrigindo o p** para o número de comparações, de modo que o erro tipo I global fique em 5%.",
     "Depois da ANOVA, o **Tukey HSD** é o padrão quando as variâncias são homogêneas. Depois do Kruskal-Wallis, o SPSS faz o **teste de Dunn com correção de Bonferroni** (menu *Nonparametric Tests › Independent Samples*, opção *All pairwise*); use a coluna **Adj. Sig.**",
     "O post-hoc só faz sentido quando o teste global (questão 12) é significativo. Pode acontecer de o teste global ser significativo e só um ou dois pares diferirem."
    ],
    "spss": {
     "menu": "Analyze › Compare Means › One-Way ANOVA… → *Post Hoc…* → marque **Tukey** → Continue → OK",
     "syntax": "ONEWAY tempo_placebo BY grupotreino\n  /POSTHOC=TUKEY ALPHA(0.05)."
    },
    "out": "Multiple Comparisons (Tukey HSD, tempo_placebo)\n-------------------------------------\n(I)  (J)  Mean Difference (I-J)  Sig.\n-------------------------------------\n1      2                 1.5203  .105\n1      3                 2.3820  .006\n1      4                 3.9880  .000\n2      3                 0.8617  .486\n2      4                 2.4677  .005\n3      4                 1.6060  .081\n-------------------------------------",
    "sol": "1 × 3: p = 0,006 → V · 2 × 3: p = 0,486 → F · 1 × 4: p < 0,001 → V · 2 × 4: p = 0,005 → V."
   }
  ]
 },
 {
  "id": "s2",
  "title": "Aplicativo de treino e frequência no ginásio",
  "tema": "Gestão de ginásios",
  "n": 24,
  "file": "simulado2_ginasio_app",
  "story": [
   "Uma cadeia de ginásios (academias) lançou um **aplicativo de treino** com metas semanais e notificações, para aumentar a frequência dos sócios. Vinte e quatro sócios foram acompanhados: registrou-se o **número de idas ao ginásio por mês** no mês anterior à instalação do aplicativo e no terceiro mês de uso do aplicativo.",
   "Foram registrados também o sexo (1 = masculino, 2 = feminino), o **tipo de plano** (1 = mensal, 2 = anual) e a idade do sócio, em anos. Segundo um relatório do setor, os sócios de ginásios em Portugal vão ao ginásio, em média, **8 vezes por mês**."
  ],
  "vars": [
   {
    "name": "id",
    "label": "Identificação do participante",
    "type": "Nominal",
    "values": ""
   },
   {
    "name": "sexo",
    "label": "Sexo do sócio",
    "type": "Nominal",
    "values": "1 = Masculino, 2 = Feminino"
   },
   {
    "name": "plano",
    "label": "Tipo de plano",
    "type": "Nominal",
    "values": "1 = Mensal, 2 = Anual"
   },
   {
    "name": "idas_com_app",
    "label": "Idas ao ginásio por mês com o aplicativo",
    "type": "Escala",
    "values": "idas"
   },
   {
    "name": "idas_sem_app",
    "label": "Idas ao ginásio por mês antes do aplicativo",
    "type": "Escala",
    "values": "idas"
   },
   {
    "name": "idade",
    "label": "Idade (anos)",
    "type": "Escala",
    "values": ""
   }
  ],
  "questions": [
   {
    "q": "Qual a porcentagem de indivíduos do sexo masculino e do sexo feminino nesta amostra?",
    "fields": [
     {
      "k": "num",
      "id": "m",
      "label": "Masculino",
      "a": 58.3,
      "tol": 0.06,
      "traps": [
       {
        "v": 14.0,
        "tol": 0.06,
        "m": "Você digitou a **frequência absoluta** (contagem de casos). A questão pede a porcentagem: use a coluna *Percent* (ou *Valid Percent*) da tabela de frequências."
       },
       {
        "v": 41.666667,
        "tol": 0.06,
        "m": "Você trocou os sexos: este é o valor do sexo **feminino**. Confira os rótulos (1 = Masculino, 2 = Feminino) em *Variable View › Values*."
       }
      ],
      "unit": "%"
     },
     {
      "k": "num",
      "id": "f",
      "label": "Feminino",
      "a": 41.7,
      "tol": 0.06,
      "traps": [
       {
        "v": 10.0,
        "tol": 0.06,
        "m": "Você digitou a **frequência absoluta**. Use a coluna *Percent*."
       },
       {
        "v": 58.333333,
        "tol": 0.06,
        "m": "Você trocou os sexos: este é o valor do sexo **masculino**."
       }
      ],
      "unit": "%"
     }
    ],
    "theory": [
     "Para uma variável **nominal** (como sexo), a descrição adequada é a **distribuição de frequências**: quantos casos há em cada categoria (frequência absoluta) e qual a porcentagem do total (frequência relativa). Média e desvio-padrão não fazem sentido para códigos 1 e 2: são rótulos, não quantidades.",
     "A porcentagem é $\\% = \\dfrac{n_{categoria}}{N} \\times 100$. No SPSS, *Percent* usa todos os casos e *Valid Percent* exclui os valores omissos; como esta base não tem omissos, as duas colunas coincidem."
    ],
    "spss": {
     "menu": "Analyze › Descriptive Statistics › Frequencies… → coloque `sexo` em *Variable(s)* → OK",
     "syntax": "FREQUENCIES VARIABLES=sexo\n  /ORDER=ANALYSIS."
    },
    "out": "Sexo do sócio\n-----------------------------------------------------------------------\n                  Frequency  Percent  Valid Percent  Cumulative Percent\n-----------------------------------------------------------------------\nValid  Masculino         14     58.3           58.3                58.3\n       Feminino          10     41.7           41.7               100.0\n       Total             24    100.0          100.0                    \n-----------------------------------------------------------------------",
    "sol": "Há 14 homens e 10 mulheres em 24 casos: 14/24 × 100 = **58,3%** masculino e 10/24 × 100 = **41,7%** feminino."
   },
   {
    "q": "Qual a porcentagem de sócios com plano mensal?",
    "fields": [
     {
      "k": "num",
      "id": "p",
      "label": "Porcentagem",
      "a": 58.3,
      "tol": 0.06,
      "traps": [
       {
        "v": 14.0,
        "tol": 0.06,
        "m": "Você digitou a **contagem**, não a porcentagem."
       },
       {
        "v": 41.666667,
        "tol": 0.06,
        "m": "Este é o valor da outra categoria (**Anual**). Confira os códigos: 1 = Mensal, 2 = Anual."
       }
      ],
      "unit": "%"
     }
    ],
    "theory": [
     "Mesmo raciocínio da questão anterior: variável nominal → tabela de frequências. O cuidado aqui é **ler a categoria certa**: confira em *Variable View › Values* qual código corresponde a cada rótulo. Se ativar *View › Value Labels*, a *Data View* mostra os rótulos no lugar dos números."
    ],
    "spss": {
     "menu": "Analyze › Descriptive Statistics › Frequencies… → `plano` → OK",
     "syntax": "FREQUENCIES VARIABLES=plano\n  /ORDER=ANALYSIS."
    },
    "out": "Tipo de plano\n------------------------------------------------\n               Frequency  Percent  Valid Percent\n------------------------------------------------\nValid  Mensal         14     58.3           58.3\n       Anual          10     41.7           41.7\n       Total          24    100.0          100.0\n------------------------------------------------",
    "sol": "14 de 24 casos na categoria **Mensal** → 14/24 × 100 = **58,3%**."
   },
   {
    "q": "A frequência mensal dos sócios **com o aplicativo** é diferente da média nacional do setor (8 idas por mês)?",
    "fields": [
     {
      "k": "ch",
      "id": "yn",
      "label": "Resposta",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 0,
      "traps": {
       "1": "O p da hipótese da pergunta (< 0,001) é menor que 0,05: rejeita-se $H_0$, ou seja, **Sim**."
      }
     },
     {
      "k": "num",
      "id": "t",
      "label": "Valor de t",
      "a": 4.533,
      "tol": 0.01,
      "traps": [
       {
        "v": -4.533429,
        "tol": 0.01,
        "m": "O sinal está trocado. No teste t de uma amostra, $t = (\\bar{x} - \\mu_0)/EP$: é negativo quando a média amostral é menor que o valor de teste."
       },
       {
        "v": 3.166667,
        "tol": 0.01,
        "m": "Este é o *Mean Difference* ($\\bar{x} - \\mu_0$), não o t. O t divide essa diferença pelo erro-padrão."
       }
      ]
     },
     {
      "k": "num",
      "id": "p",
      "label": "Valor de p (adequado à pergunta)",
      "a": 0.000149,
      "tol": 0.0015,
      "traps": [],
      "lt": true
     }
    ],
    "theory": [
     "Comparar a média de **uma amostra** com um **valor de referência conhecido** (aqui, 8,0 idas, vindo de um estudo anterior) é o caso do **teste t de uma amostra** (*One-Sample T Test*). Não se trata de dois grupos medidos neste estudo: o valor de referência é um número fixo.",
     "Hipóteses: $H_0: \\mu = 8,0$ e $H_1: \\mu \\neq 8,0$. A estatística é $t = \\dfrac{\\bar{x} - \\mu_0}{s/\\sqrt{n}}$, com $n - 1$ graus de liberdade.",
     "**Unilateral ou bilateral?** Se a pergunta tem direção (\"mais rápido\", \"gasta mais\", \"menos eficiente\"), o teste é unilateral. O SPSS 27+ mostra *One-Sided p* e *Two-Sided p*. Atenção: o *One-Sided p* do SPSS é sempre metade do bilateral, **calculado na direção em que a média caiu**. Se a média caiu do lado oposto ao da sua hipótese, o p correto é $1 - p_{bilateral}/2$. Em versões antigas, que só mostram *Sig. (2-tailed)*, divida por 2 quando a direção bater.",
     "Pressuposto: normalidade da variável, ou amostra grande o suficiente para o Teorema do Limite Central. Com $n \\approx 20$ e assimetria moderada o t ainda é razoavelmente robusto; a alternativa não paramétrica é o teste de Wilcoxon de uma amostra."
    ],
    "spss": {
     "menu": "Analyze › Compare Means › One-Sample T Test… → `idas_com_app` em *Test Variable(s)* → *Test Value* = 8 → OK",
     "syntax": "T-TEST\n  /TESTVAL=8\n  /VARIABLES=idas_com_app\n  /CRITERIA=CI(.95)."
    },
    "out": "One-Sample Statistics\n----------------------------------------------------------\n               N     Mean  Std. Deviation  Std. Error Mean\n----------------------------------------------------------\nidas_com_app  24  11.1667          3.4220           0.6985\n----------------------------------------------------------\n\nOne-Sample Test (Test Value = 8)\n------------------------------------------------------------------\n                  t  df  One-Sided p  Two-Sided p  Mean Difference\n------------------------------------------------------------------\nidas_com_app  4.533  23         .000         .000           3.1667\n------------------------------------------------------------------",
    "sol": "Média = 11,17 idas (DP = 3,422), $t(23) = 4,533$, p bilateral < 0,001. Hipótese bilateral: p < 0,001. Como p < 0,05, a resposta é **Sim**."
   },
   {
    "q": "Qual o valor da média e do desvio-padrão de **idas ao ginásio por mês antes do aplicativo**?",
    "fields": [
     {
      "k": "num",
      "id": "m",
      "label": "Média",
      "a": 9.292,
      "tol": 0.01,
      "traps": [
       {
        "v": 11.166667,
        "tol": 0.01,
        "m": "Este é o valor da outra variável (`idas_com_app`, com o aplicativo). A questão pede `idas_sem_app` (antes do aplicativo)."
       },
       {
        "v": 8.0,
        "tol": 0.01,
        "m": "Esta é a **mediana**, não a média."
       }
      ],
      "unit": "idas"
     },
     {
      "k": "num",
      "id": "dp",
      "label": "Desvio-padrão",
      "a": 4.359,
      "tol": 0.01,
      "traps": [
       {
        "v": 0.889714,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão da média** (*Std. Error*), não o desvio-padrão. O EP = DP/√n mede a incerteza da média; o DP mede a dispersão dos dados."
       },
       {
        "v": 18.998188,
        "tol": 0.01,
        "m": "Você digitou a **variância**. O desvio-padrão é a raiz quadrada dela."
       },
       {
        "v": 3.422009,
        "tol": 0.01,
        "m": "Este é o DP da outra variável (`idas_com_app`)."
       },
       {
        "v": 4.266919,
        "tol": 0.01,
        "m": "Você calculou o DP dividindo por $n$ (populacional). O SPSS, e a estatística inferencial, usam $n - 1$."
       }
      ],
      "unit": "idas"
     }
    ],
    "theory": [
     "Para uma variável **quantitativa** (escala), a descrição básica é uma medida de tendência central (média) e uma de dispersão (desvio-padrão).",
     "$\\bar{x} = \\dfrac{\\sum x_i}{n}$ e $s = \\sqrt{\\dfrac{\\sum (x_i - \\bar{x})^2}{n - 1}}$. Divide-se por $n - 1$ porque a amostra estima a variância populacional e já \"gastou\" um grau de liberdade ao estimar a média (Módulo 1).",
     "Não confunda o **desvio-padrão** (dispersão dos dados) com o **erro-padrão da média** ($EP = s/\\sqrt{n}$, a precisão da média), que aparece logo ao lado na saída do *Explore*."
    ],
    "spss": {
     "menu": "Analyze › Descriptive Statistics › Descriptives… → `idas_sem_app` → OK (ou *Explore*, que mostra mais estatísticas)",
     "syntax": "DESCRIPTIVES VARIABLES=idas_sem_app\n  /STATISTICS=MEAN STDDEV MIN MAX."
    },
    "out": "Descriptive Statistics\n----------------------------------------------------------------\n                     N  Minimum  Maximum    Mean  Std. Deviation\n----------------------------------------------------------------\nidas_sem_app        24        4       21  9.2917          4.3587\nValid N (listwise)  24                                          \n----------------------------------------------------------------",
    "sol": "Média = **9,29 idas** e desvio-padrão = **4,359 idas**."
   },
   {
    "q": "Existe diferença entre os sexos no **idas ao ginásio por mês com o aplicativo**?",
    "fields": [
     {
      "k": "num",
      "id": "lev",
      "label": "p do teste de Levene",
      "a": 0.320103,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.010364,
        "tol": 0.0015,
        "m": "Este é o p do **teste t**, não o do Levene. O Levene vem nas primeiras colunas da tabela (*F* e *Sig.*)."
       },
       {
        "v": 1.03475,
        "tol": 0.0015,
        "m": "Este é o **F** do Levene; o campo pede o p (*Sig.*)."
       }
      ]
     },
     {
      "k": "ch",
      "id": "row",
      "label": "Linha da tabela a usar",
      "o": [
       "Equal variances assumed (t de Student)",
       "Equal variances not assumed (t de Welch)"
      ],
      "a": 0,
      "traps": {
       "1": "O Levene deu p > 0,05: não há evidência de variâncias diferentes, então use a linha *Equal variances assumed*."
      }
     },
     {
      "k": "num",
      "id": "p",
      "label": "p do teste t",
      "a": 0.010364,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.02244,
        "tol": 0.0015,
        "m": "Você leu a **outra linha** da tabela. A escolha da linha depende do Levene: p do Levene > 0,05 → linha de cima (variâncias iguais)."
       },
       {
        "v": 0.320103,
        "tol": 0.0015,
        "m": "Este é o p do **Levene** (que testa variâncias, não médias). O p do teste t está em *Two-Sided p* / *Sig. (2-tailed)*."
       },
       {
        "v": 0.005182,
        "tol": 0.0015,
        "m": "Você usou o p unilateral. A pergunta (\"existe diferença?\") não tem direção: use o *Two-Sided p*."
       }
      ]
     },
     {
      "k": "ch",
      "id": "yn",
      "label": "Existe diferença?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 0,
      "traps": {
       "1": "O p do teste t (0,010) é menor que 0,05: rejeita-se $H_0$ de médias iguais → **Sim**."
      }
     }
    ],
    "theory": [
     "Dois **grupos independentes** (homens e mulheres são pessoas diferentes) e uma variável quantitativa → **teste t para amostras independentes**. $H_0: \\mu_M = \\mu_F$.",
     "O SPSS faz antes o **teste de Levene**, cuja $H_0$ é *variâncias iguais*. Se p do Levene > 0,05, use a linha *Equal variances assumed* (t de Student, com variância combinada). Se p < 0,05, use *Equal variances not assumed* (t de Welch, que corrige os graus de liberdade).",
     "Erro frequente: tomar o p do Levene como resposta. O Levene responde se as **variâncias** diferem; a pergunta é sobre as **médias**.",
     "Pressuposto adicional: normalidade em cada grupo. Se a variável fosse muito assimétrica, com grupos pequenos, a alternativa seria o **Mann-Whitney** (*Nonparametric Tests › Legacy Dialogs › 2 Independent Samples*). Aqui, para conferência, o Mann-Whitney dá U = 20,5, p = 0,003."
    ],
    "spss": {
     "menu": "Analyze › Compare Means › Independent-Samples T Test… → `idas_com_app` em *Test Variable(s)*, `sexo` em *Grouping Variable* → *Define Groups*: 1 e 2 → OK",
     "syntax": "T-TEST GROUPS=sexo(1 2)\n  /VARIABLES=idas_com_app\n  /CRITERIA=CI(.95)."
    },
    "out": "Group Statistics\n--------------------------------------\nsexo        N     Mean  Std. Deviation\n--------------------------------------\nMasculino  14   9.7143          2.2678\nFeminino   10  13.2000          3.8239\n--------------------------------------\n\nIndependent Samples Test (idas_com_app)\n------------------------------------------------------------------------------------\n                             Levene F  Sig.       t      df  Two-Sided p  Mean Diff.\n------------------------------------------------------------------------------------\nEqual variances assumed         1.035  .320  -2.803      22         .010     -3.4857\nEqual variances not assumed                  -2.577  13.500         .022     -3.4857\n------------------------------------------------------------------------------------",
    "sol": "Levene: F = 1,035, p = 0,320 → variâncias homogêneas, linha **Equal variances assumed**. Teste t: **p = 0,010** → **existe** diferença entre os sexos."
   },
   {
    "q": "Qual a média e o desvio-padrão de **idas ao ginásio por mês antes do aplicativo**, para o sexo masculino e para o feminino?",
    "fields": [
     {
      "k": "num",
      "id": "mm",
      "label": "Masculino: média",
      "a": 8.5,
      "tol": 0.01,
      "traps": [
       {
        "v": 10.4,
        "tol": 0.01,
        "m": "Este é o valor do sexo **feminino**."
       },
       {
        "v": 9.714286,
        "tol": 0.01,
        "m": "Este é o valor de `idas_com_app`; a questão pede `idas_sem_app`."
       }
      ],
      "unit": "idas"
     },
     {
      "k": "num",
      "id": "dm",
      "label": "Masculino: desvio-padrão",
      "a": 4.31,
      "tol": 0.01,
      "traps": [
       {
        "v": 1.151921,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão**, não o DP."
       },
       {
        "v": 4.40202,
        "tol": 0.01,
        "m": "Este é o DP do sexo **feminino**."
       },
       {
        "v": 2.267787,
        "tol": 0.01,
        "m": "Este é o DP de `idas_com_app`."
       }
      ],
      "unit": "idas"
     },
     {
      "k": "num",
      "id": "mf",
      "label": "Feminino: média",
      "a": 10.4,
      "tol": 0.01,
      "traps": [
       {
        "v": 8.5,
        "tol": 0.01,
        "m": "Este é o valor do sexo **masculino**."
       },
       {
        "v": 13.2,
        "tol": 0.01,
        "m": "Este é o valor de `idas_com_app`."
       }
      ],
      "unit": "idas"
     },
     {
      "k": "num",
      "id": "df",
      "label": "Feminino: desvio-padrão",
      "a": 4.402,
      "tol": 0.01,
      "traps": [
       {
        "v": 1.392041,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão**, não o DP."
       },
       {
        "v": 4.310095,
        "tol": 0.01,
        "m": "Este é o DP do sexo **masculino**."
       },
       {
        "v": 3.823901,
        "tol": 0.01,
        "m": "Este é o DP de `idas_com_app`."
       }
      ],
      "unit": "idas"
     }
    ],
    "theory": [
     "Descritivas **por grupo**: a mesma média e o mesmo DP da questão 4, mas calculados separadamente para cada categoria de outra variável. É o que se reporta sempre que se comparam grupos (e é a tabela *Group Statistics* do teste t).",
     "Há três caminhos no SPSS: *Compare Means › Means* (o mais direto), *Explore* com `sexo` em *Factor List*, ou *Data › Split File* seguido de *Descriptives*. Se usar *Split File*, lembre-se de **desligá-lo** depois (*Analyze all cases*), senão todas as análises seguintes sairão divididas por sexo."
    ],
    "spss": {
     "menu": "Analyze › Compare Means › Means… → `idas_sem_app` em *Dependent List*, `sexo` em *Independent List* → OK",
     "syntax": "MEANS TABLES=idas_sem_app BY sexo\n  /CELLS=MEAN COUNT STDDEV."
    },
    "out": "Report (idas_sem_app)\n--------------------------------------\nsexo          Mean   N  Std. Deviation\n--------------------------------------\nMasculino   8.5000  14          4.3101\nFeminino   10.4000  10          4.4020\nTotal       9.2917  24          4.3587\n--------------------------------------",
    "sol": "Masculino: média **8,50**, DP **4,310**. Feminino: média **10,40**, DP **4,402** (idas)."
   },
   {
    "q": "A distribuição de **idas ao ginásio por mês com o aplicativo** segue uma distribuição normal?",
    "fields": [
     {
      "k": "ch",
      "id": "yn",
      "label": "Existe normalidade?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 1,
      "traps": {
       "0": "No Shapiro-Wilk, $H_0$ é *os dados vêm de uma distribuição normal*. p = 0,001 < 0,05: rejeita-se a normalidade → **Não**. Cuidado com a inversão: aqui p pequeno é **mau sinal** para a normalidade."
      }
     },
     {
      "k": "num",
      "id": "w",
      "label": "Estatística (W de Shapiro-Wilk)",
      "a": 0.833,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.186089,
        "tol": 0.0015,
        "m": "Esta é a estatística do **Kolmogorov-Smirnov** (primeiras colunas da tabela). Com n < 50 usa-se a coluna **Shapiro-Wilk**."
       },
       {
        "v": 0.843241,
        "tol": 0.0015,
        "m": "Este é o W de `idas_sem_app`; a questão pede `idas_com_app`."
       }
      ]
     },
     {
      "k": "num",
      "id": "p",
      "label": "Valor de p",
      "a": 0.001073,
      "tol": 0.0015,
      "traps": []
     }
    ],
    "theory": [
     "O teste de **Shapiro-Wilk** verifica se a amostra é compatível com uma população normal. $H_0$: a distribuição é normal; $H_1$: não é. Ao contrário da maioria dos testes, aqui **queremos não rejeitar** $H_0$ (p > 0,05) para poder usar testes paramétricos.",
     "O SPSS mostra dois testes na tabela *Tests of Normality*: Kolmogorov-Smirnov (com correção de Lilliefors) e Shapiro-Wilk. Para amostras pequenas (n < 50) o **Shapiro-Wilk** é o recomendado, por ter mais poder.",
     "O W varia entre 0 e 1: quanto mais perto de 1, mais os dados ordenados se alinham com o que se esperaria de uma normal. Complemente sempre com o **Q-Q plot** (*Normal Q-Q Plot*, gerado pela opção *Normality plots with tests*): pontos longe da reta indicam afastamento da normalidade."
    ],
    "spss": {
     "menu": "Analyze › Descriptive Statistics › Explore… → `idas_com_app` em *Dependent List* → *Plots…* → marque **Normality plots with tests** → Continue → OK",
     "syntax": "EXAMINE VARIABLES=idas_com_app\n  /PLOT BOXPLOT NPPLOT\n  /STATISTICS DESCRIPTIVES\n  /NOTOTAL."
    },
    "out": "Tests of Normality\n--------------------------------------------------------------\n              K-S Statistic  df  Sig.  S-W Statistic  df  Sig.\n--------------------------------------------------------------\nidas_com_app          0.186  24   ...          0.833  24  .001\n--------------------------------------------------------------\na. Lilliefors Significance Correction",
    "sol": "Shapiro-Wilk: **W = 0,833**, **p = 0,001** → rejeita-se $H_0$: a distribuição **não é normal**."
   },
   {
    "q": "Faça um teste para avaliar a associação entre **idade** e **idas ao ginásio por mês com o aplicativo**. Escolha a estatística mais adequada.",
    "fields": [
     {
      "k": "ch",
      "id": "test",
      "label": "Teste escolhido",
      "o": [
       "Correlação de Pearson",
       "Correlação de Spearman"
      ],
      "a": 1,
      "traps": {
       "0": "`idas_com_app` **não** tem distribuição normal (Shapiro-Wilk p = 0,001, questão 7), então o coeficiente adequado é o de **Spearman**, baseado em postos."
      }
     },
     {
      "k": "num",
      "id": "r",
      "label": "Valor da correlação",
      "a": 0.801,
      "tol": 0.005,
      "traps": [
       {
        "v": 0.70908,
        "tol": 0.005,
        "m": "Este é o coeficiente do **outro** teste. `idas_com_app` **não** tem distribuição normal (Shapiro-Wilk p = 0,001, questão 7), então o coeficiente adequado é o de **Spearman**, baseado em postos."
       },
       {
        "v": 0.641398,
        "tol": 0.005,
        "m": "Você digitou o $r^2$ (coeficiente de determinação). A questão pede o próprio coeficiente de correlação."
       },
       {
        "v": -0.800873,
        "tol": 0.005,
        "m": "O sinal está trocado. Confira o sentido da relação no diagrama de dispersão."
       }
      ]
     },
     {
      "k": "num",
      "id": "p",
      "label": "Valor de p",
      "a": 3e-06,
      "tol": 0.0015,
      "traps": [],
      "lt": true
     }
    ],
    "theory": [
     "**Pearson** ($r$) mede associação **linear** entre duas variáveis quantitativas; pressupõe normalidade (bivariada) e é sensível a valores extremos. **Spearman** ($\\rho$) é a correlação de Pearson aplicada aos **postos**: mede associação **monotônica** e não exige normalidade.",
     "Regra prática da disciplina: verifique a normalidade das duas variáveis (Shapiro-Wilk). Se ambas forem normais, use Pearson; se pelo menos uma não for, use Spearman.",
     "Interpretação: o sinal dá o sentido (positivo: as duas crescem juntas; negativo: uma cresce enquanto a outra diminui) e o módulo dá a força (regra de bolso: < 0,3 fraca, 0,3 a 0,7 moderada, > 0,7 forte). $H_0$ do teste: $\\rho = 0$ na população.",
     "Correlação não é causalidade. Antes de tudo, olhe o diagrama de dispersão (*Graphs › Legacy Dialogs › Scatter/Dot*)."
    ],
    "spss": {
     "menu": "Analyze › Correlate › Bivariate… → `idade` e `idas_com_app` em *Variables* → marque **Spearman** → OK. (Verifique a normalidade das duas antes, em *Explore*.)",
     "syntax": "EXAMINE VARIABLES=idade idas_com_app\n  /PLOT NPPLOT\n  /NOTOTAL.\n\nNONPAR CORR\n  /VARIABLES=idade idas_com_app\n  /PRINT=SPEARMAN TWOTAIL NOSIG."
    },
    "out": "Tests of Normality (Shapiro-Wilk)\n---------------------------------\n              Statistic  df  Sig.\n---------------------------------\nidade             0.937  24  .142\nidas_com_app      0.833  24  .001\n---------------------------------\n\nCorrelations (Spearman's rho)\n--------------------------------------------\n                                idas_com_app\n--------------------------------------------\nidade  Correlation Coefficient          .801\n               Sig. (2-tailed)          .000\n                             N            24\n--------------------------------------------",
    "sol": "`idas_com_app` **não** tem distribuição normal (Shapiro-Wilk p = 0,001, questão 7), então o coeficiente adequado é o de **Spearman**, baseado em postos. Resultado: **ρ = 0,801**, **p < 0,001**: associação forte positiva e significativa entre idade e idas ao ginásio por mês com o aplicativo. (Para comparação, o outro coeficiente daria 0,709.)"
   },
   {
    "q": "Existe diferença na frequência mensal antes e depois do aplicativo?",
    "fields": [
     {
      "k": "ch",
      "id": "test",
      "label": "Teste escolhido",
      "o": [
       "t para amostras emparelhadas",
       "Wilcoxon",
       "t para amostras independentes",
       "Mann-Whitney"
      ],
      "a": 1,
      "traps": {
       "2": "As duas medidas são das **mesmas pessoas** (cada participante foi medido nas duas condições), então as amostras são **emparelhadas**, não independentes.",
       "3": "O Mann-Whitney é para grupos **independentes**. Aqui as mesmas pessoas foram medidas duas vezes: amostras emparelhadas.",
       "0": "As diferenças (idas_com_app − idas_sem_app) **não** seguem a normal (Shapiro-Wilk p < 0,001), então o adequado é o não paramétrico, **Wilcoxon**."
      }
     },
     {
      "k": "ch",
      "id": "yn",
      "label": "Existe diferença?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 0,
      "traps": {
       "1": "O p (0,003) é menor que 0,05 → **Sim**."
      }
     },
     {
      "k": "num",
      "id": "p",
      "label": "Valor de p",
      "a": 0.003339,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.006286,
        "tol": 0.0015,
        "m": "Este é o p do **outro** teste emparelhado. As diferenças (idas_com_app − idas_sem_app) **não** seguem a normal (Shapiro-Wilk p < 0,001), então o adequado é o não paramétrico, **Wilcoxon**."
       },
       {
        "v": 0.104204,
        "tol": 0.0015,
        "m": "Este é o p de um t para amostras **independentes**, que ignora o emparelhamento."
       },
       {
        "v": 1e-06,
        "tol": 0.0015,
        "m": "Este é o p do Shapiro-Wilk das diferenças (o pressuposto), não do teste de comparação."
       }
      ]
     },
     {
      "k": "num",
      "id": "ma",
      "label": "Média com o aplicativo",
      "a": 11.167,
      "tol": 0.01,
      "traps": [
       {
        "v": 9.291667,
        "tol": 0.01,
        "m": "Você trocou as condições."
       }
      ],
      "unit": "idas"
     },
     {
      "k": "num",
      "id": "mb",
      "label": "Média antes do aplicativo",
      "a": 9.292,
      "tol": 0.01,
      "traps": [
       {
        "v": 11.166667,
        "tol": 0.01,
        "m": "Você trocou as condições."
       }
      ],
      "unit": "idas"
     }
    ],
    "theory": [
     "Cada participante foi medido **nas duas condições**: as observações estão emparelhadas. O teste analisa a **diferença** dentro de cada pessoa, o que remove a variação entre pessoas (atletas mais rápidos são rápidos nas duas condições) e dá muito mais poder do que comparar dois grupos independentes.",
     "O pressuposto do **t emparelhado** é a normalidade das **diferenças** (não de cada variável separadamente). Crie a variável diferença em *Transform › Compute Variable* e aplique o Shapiro-Wilk a ela. Se não for normal, use o **Wilcoxon** (postos sinalizados).",
     "$t = \\dfrac{\\bar{d}}{s_d/\\sqrt{n}}$, com $n - 1$ graus de liberdade, onde $d_i$ é a diferença de cada participante. O Wilcoxon ordena os $|d_i|$, soma os postos das diferenças positivas e das negativas e compara com o esperado sob $H_0$ (aproximação normal, Z)."
    ],
    "spss": {
     "menu": "Transform › Compute Variable… (dif = idas_com_app − idas_sem_app) → Explore com *Normality plots with tests*. Depois: Analyze › Nonparametric Tests › Legacy Dialogs › 2 Related Samples… → par `idas_com_app` / `idas_sem_app` → marque **Wilcoxon** → OK",
     "syntax": "COMPUTE dif=idas_com_app-idas_sem_app.\nEXECUTE.\nEXAMINE VARIABLES=dif\n  /PLOT NPPLOT\n  /NOTOTAL.\n\nNPAR TESTS\n  /WILCOXON=idas_com_app WITH idas_sem_app (PAIRED)\n  /STATISTICS DESCRIPTIVES."
    },
    "out": "Tests of Normality (dif)\n-------------------------------------------------\n     K-S Statistic  Sig.  S-W Statistic  df  Sig.\n-------------------------------------------------\ndif          0.308   ...          0.614  24  .000\n-------------------------------------------------\n\nPaired Samples Statistics\n-----------------------------------------\n                 Mean   N  Std. Deviation\n-----------------------------------------\nidas_com_app  11.1667  24          3.4220\nidas_sem_app   9.2917  24          4.3587\n-----------------------------------------\n\nTest Statistics (Wilcoxon)\n---------------------------------------------------\n                        idas_sem_app - idas_com_app\n---------------------------------------------------\nZ                                            -2.935\nAsymp. Sig. (2-tailed)                         .003\n---------------------------------------------------",
    "sol": "As medidas são emparelhadas. Shapiro-Wilk das diferenças: p < 0,001 → não normal → **Wilcoxon**: Z = −2,935, **p = 0,003**. Médias: 11,17 idas (com o aplicativo) e 9,29 idas (antes do aplicativo). Há diferença significativa."
   },
   {
    "q": "Crie uma nova variável (**faixaetaria**) com base em `idade`. Atribua os valores 1, 2, 3 e 4, respectivamente, a: até 25 anos; 26 a 35 anos; 36 a 45 anos; 46 anos ou mais. Qual o tamanho, a média e o desvio-padrão de `idade` em cada grupo criado?",
    "fields": [
     {
      "k": "num",
      "id": "n1",
      "label": "Grupo 1: n",
      "a": 6.0,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "m1",
      "label": "Grupo 1: média",
      "a": 21.5,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "s1",
      "label": "Grupo 1: DP",
      "a": 1.225,
      "tol": 0.01,
      "traps": [
       {
        "v": 0.5,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão**, não o DP."
       }
      ]
     },
     {
      "k": "num",
      "id": "n2",
      "label": "Grupo 2: n",
      "a": 6.0,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "m2",
      "label": "Grupo 2: média",
      "a": 30.667,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "s2",
      "label": "Grupo 2: DP",
      "a": 3.615,
      "tol": 0.01,
      "traps": [
       {
        "v": 1.47573,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão**, não o DP."
       }
      ]
     },
     {
      "k": "num",
      "id": "n3",
      "label": "Grupo 3: n",
      "a": 6.0,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "m3",
      "label": "Grupo 3: média",
      "a": 40.5,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "s3",
      "label": "Grupo 3: DP",
      "a": 3.391,
      "tol": 0.01,
      "traps": [
       {
        "v": 1.384437,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão**, não o DP."
       }
      ]
     },
     {
      "k": "num",
      "id": "n4",
      "label": "Grupo 4: n",
      "a": 6.0,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "m4",
      "label": "Grupo 4: média",
      "a": 54.667,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "s4",
      "label": "Grupo 4: DP",
      "a": 5.317,
      "tol": 0.01,
      "traps": [
       {
        "v": 2.170509,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão**, não o DP."
       }
      ]
     }
    ],
    "grid": 3,
    "theory": [
     "**Recodificar** transforma uma variável quantitativa em categorias (classes). Use sempre *Recode into Different Variables*, para não destruir a variável original.",
     "Cuidado com os limites das classes: cada valor tem de cair em **uma e só uma** classe. Com valores inteiros, \"26 a 35 anos\" corresponde a `26 THRU 35=2`. Use `LOWEST` para a primeira classe e `HIGHEST` para a última.",
     "Depois de recodificar, dê rótulos aos códigos (*Variable View › Values*) e mude a medida da nova variável para **Nominal** ou **Ordinal**: alguns procedimentos (como o Kruskal-Wallis pelo menu *Independent Samples*) exigem isso.",
     "Confira sempre o resultado: o tamanho de cada grupo (n) mostra se a recodificação ficou certa. Se algum n não bater, revise os limites (o caso mais comum é um valor de fronteira cair na classe errada ou ficar *System Missing*)."
    ],
    "spss": {
     "menu": "Transform › Recode into Different Variables… → `idade` → *Output Variable*: `faixaetaria` → Change → *Old and New Values…*: Range, LOWEST through 25 → 1; Range 26 through 35 → 2; Range 36 through 45 → 3; Range, 46 through HIGHEST → 4 → Continue → OK. Depois: Analyze › Compare Means › Means… (`idade` BY `faixaetaria`)",
     "syntax": "RECODE idade (LOWEST THRU 25=1) (26 THRU 35=2) (36 THRU 45=3) (46 THRU HIGHEST=4) INTO faixaetaria.\nVARIABLE LABELS faixaetaria 'Faixa etária'.\nVALUE LABELS faixaetaria 1 'até 25 anos' 2 '26 a 35 anos' 3 '36 a 45 anos' 4 '46 anos ou mais'.\nVARIABLE LEVEL faixaetaria (ORDINAL).\nEXECUTE.\n\nMEANS TABLES=idade BY faixaetaria\n  /CELLS=MEAN COUNT STDDEV."
    },
    "out": "Report (idade)\n----------------------------------------------\nfaixaetaria           Mean   N  Std. Deviation\n----------------------------------------------\n1 até 25 anos      21.5000   6          1.2247\n2 26 a 35 anos     30.6667   6          3.6148\n3 36 a 45 anos     40.5000   6          3.3912\n4 46 anos ou mais  54.6667   6          5.3166\nTotal              36.8333  24         13.0206\n----------------------------------------------",
    "sol": "Grupo 1: n = 6, média = 21,50, DP = 1,225 · Grupo 2: n = 6, média = 30,67, DP = 3,615 · Grupo 3: n = 6, média = 40,50, DP = 3,391 · Grupo 4: n = 6, média = 54,67, DP = 5,317."
   },
   {
    "q": "Verifique se a nova variável (**faixaetaria**) cumpre os pressupostos necessários para efetuar uma ANOVA de `idas_sem_app`.",
    "fields": [
     {
      "k": "ch",
      "id": "norm",
      "label": "Normalidade em todos os grupos?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 1,
      "traps": {
       "0": "Basta **um** grupo violar a normalidade: o grupo 1, 3 tem Shapiro-Wilk p < 0,05 → **Não**."
      }
     },
     {
      "k": "num",
      "id": "p1",
      "label": "Grupo 1: p do Shapiro-Wilk",
      "a": 0.002595,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.665093,
        "tol": 0.0015,
        "m": "Este é o **W** (estatística), não o p (*Sig.*)."
       }
      ]
     },
     {
      "k": "num",
      "id": "p2",
      "label": "Grupo 2: p do Shapiro-Wilk",
      "a": 0.317256,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.889822,
        "tol": 0.0015,
        "m": "Este é o **W** (estatística), não o p (*Sig.*)."
       }
      ]
     },
     {
      "k": "num",
      "id": "p3",
      "label": "Grupo 3: p do Shapiro-Wilk",
      "a": 0.004039,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.682677,
        "tol": 0.0015,
        "m": "Este é o **W** (estatística), não o p (*Sig.*)."
       }
      ]
     },
     {
      "k": "num",
      "id": "p4",
      "label": "Grupo 4: p do Shapiro-Wilk",
      "a": 0.488955,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.917701,
        "tol": 0.0015,
        "m": "Este é o **W** (estatística), não o p (*Sig.*)."
       }
      ]
     },
     {
      "k": "ch",
      "id": "hom",
      "label": "Homogeneidade das variâncias?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 0,
      "traps": {
       "1": "Levene p = 0,099 > 0,05 → não se rejeita a igualdade das variâncias → **Sim**."
      }
     },
     {
      "k": "num",
      "id": "levF",
      "label": "Estatística de Levene",
      "a": 2.39,
      "tol": 0.01,
      "traps": [
       {
        "v": 0.859709,
        "tol": 0.01,
        "m": "Este é o Levene **baseado na mediana** (*Based on Median*). Use a primeira linha, *Based on Mean*."
       }
      ]
     },
     {
      "k": "num",
      "id": "levp",
      "label": "p do Levene",
      "a": 0.099001,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.478067,
        "tol": 0.0015,
        "m": "Este é o p do Levene **baseado na mediana**. Use a linha *Based on Mean*."
       }
      ]
     },
     {
      "k": "ch",
      "id": "ok",
      "label": "Poderia efetuar a ANOVA?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 1,
      "traps": {
       "0": "A ANOVA exige **os dois** pressupostos. Como a normalidade não se verifica, a resposta é **Não**: use a alternativa não paramétrica (Kruskal-Wallis)."
      }
     }
    ],
    "grid": 1,
    "theory": [
     "A **ANOVA one-way** compara as médias de 3 ou mais grupos independentes. Pressupostos: (1) observações independentes; (2) **normalidade em cada grupo** (ou dos resíduos); (3) **homogeneidade das variâncias** (homocedasticidade).",
     "**Normalidade**: Shapiro-Wilk **por grupo** (em *Explore*, coloque a variável de grupo em *Factor List*). Um único grupo com p < 0,05 já compromete o pressuposto. Com grupos tão pequenos (4 a 6 casos) o teste tem pouco poder, por isso olhe também os Q-Q plots e os boxplots.",
     "**Homogeneidade**: teste de **Levene**, $H_0$: as variâncias são iguais em todos os grupos. No SPSS 27+ ele aparece em quatro linhas; use a primeira, *Based on Mean*.",
     "Se só a homogeneidade falhar (dados normais), a alternativa mais adequada é a **ANOVA de Welch** (*Options › Welch*), com post-hoc de Games-Howell. Se a normalidade falhar com grupos pequenos, use o **Kruskal-Wallis**."
    ],
    "spss": {
     "menu": "Analyze › Descriptive Statistics › Explore… → `idas_sem_app` em *Dependent List*, `faixaetaria` em *Factor List* → *Plots*: Normality plots with tests → OK. Depois: Analyze › Compare Means › One-Way ANOVA… → *Options*: **Homogeneity of variance test**",
     "syntax": "EXAMINE VARIABLES=idas_sem_app BY faixaetaria\n  /PLOT BOXPLOT NPPLOT\n  /NOTOTAL.\n\nONEWAY idas_sem_app BY faixaetaria\n  /STATISTICS DESCRIPTIVES HOMOGENEITY."
    },
    "out": "Tests of Normality (idas_sem_app, Shapiro-Wilk)\n--------------------------------\nfaixaetaria  Statistic  df  Sig.\n--------------------------------\n1                0.665   6  .003\n2                0.890   6  .317\n3                0.683   6  .004\n4                0.918   6  .489\n--------------------------------\n\nTests of Homogeneity of Variances\n-------------------------------------------------\n                 Levene Statistic  df1  df2  Sig.\n-------------------------------------------------\nBased on Mean               2.390    3   20  .099\nBased on Median             0.860    3   20  .478\n...                                              \n-------------------------------------------------",
    "sol": "Shapiro-Wilk por grupo: grupo 1: W = 0,665, p = 0,003; grupo 2: W = 0,890, p = 0,317; grupo 3: W = 0,683, p = 0,004; grupo 4: W = 0,918, p = 0,489. Levene (*Based on Mean*): 2,390, p = 0,099. Pressupostos **não** cumpridos → **não** se deve fazer a ANOVA; use o Kruskal-Wallis."
   },
   {
    "q": "A direção quer saber se, **antes do aplicativo**, a frequência mensal diferia entre as faixas etárias. Escolha o teste adequado (com base na questão anterior).",
    "fields": [
     {
      "k": "ch",
      "id": "test",
      "label": "Teste escolhido",
      "o": [
       "ANOVA one-way",
       "Kruskal-Wallis"
      ],
      "a": 1,
      "traps": {
       "0": "Os pressupostos da ANOVA **não** foram cumpridos (questão 11), então use o **Kruskal-Wallis**."
      }
     },
     {
      "k": "num",
      "id": "stat",
      "label": "Estatística do teste (F ou H)",
      "a": 11.433,
      "tol": 0.01,
      "traps": [
       {
        "v": 4.102485,
        "tol": 0.01,
        "m": "Esta é a estatística do **outro** teste. Os pressupostos da ANOVA **não** foram cumpridos (questão 11), então use o **Kruskal-Wallis**."
       }
      ]
     },
     {
      "k": "num",
      "id": "p",
      "label": "Valor de p",
      "a": 0.009599,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.02019,
        "tol": 0.0015,
        "m": "Este é o p do **outro** teste. Os pressupostos da ANOVA **não** foram cumpridos (questão 11), então use o **Kruskal-Wallis**."
       },
       {
        "v": 0.099001,
        "tol": 0.0015,
        "m": "Este é o p do **Levene** (pressuposto), não do teste de comparação."
       }
      ]
     },
     {
      "k": "ch",
      "id": "yn",
      "label": "Existem diferenças entre os grupos?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 0,
      "traps": {
       "1": "p = 0,010 < 0,05 → rejeita-se $H_0$ de igualdade → **Sim**, pelo menos um grupo difere."
      }
     }
    ],
    "theory": [
     "**ANOVA one-way**: $H_0: \\mu_1 = \\mu_2 = \\mu_3 = \\mu_4$. $F = QM_{entre}/QM_{dentro}$, a razão entre a variação **entre** os grupos (sinal) e a variação **dentro** dos grupos (ruído). Sob $H_0$, $F \\approx 1$ (Módulo 8).",
     "**Kruskal-Wallis**: alternativa não paramétrica. Ordena todos os valores, calcula o posto médio de cada grupo e testa se as distribuições são iguais. A estatística H segue aproximadamente uma $\\chi^2$ com $k - 1$ graus de liberdade (Módulo 9).",
     "Um resultado significativo diz apenas que **pelo menos um** grupo difere de outro. Para saber quais, é preciso o post-hoc (próxima questão). Por que não vários testes t? Com 4 grupos há 6 pares, e o erro tipo I acumulado chegaria a cerca de 26%."
    ],
    "spss": {
     "menu": "Analyze › Nonparametric Tests › Legacy Dialogs › K Independent Samples… → `idas_sem_app` em *Test Variable List*, `faixaetaria` em *Grouping Variable* → *Define Range*: 1 a 4 → **Kruskal-Wallis H** → OK",
     "syntax": "NPAR TESTS\n  /K-W=idas_sem_app BY faixaetaria(1 4)."
    },
    "out": "Ranks\n-------------------------\nfaixaetaria  N  Mean Rank\n-------------------------\n1            6       7.00\n2            6      11.75\n3            6      11.00\n4            6      20.25\n-------------------------\n\nTest Statistics (Kruskal-Wallis)\n------------------------------\n                  idas_sem_app\n------------------------------\nKruskal-Wallis H        11.433\ndf                           3\nAsymp. Sig.               .010\n------------------------------",
    "sol": "Kruskal-Wallis: $H(3) = 11,433$, **p = 0,010**. Há diferença entre pelo menos dois grupos."
   },
   {
    "q": "Em relação à questão anterior, faça as **comparações múltiplas** (par a par) adequadas ao teste escolhido e diga se, entre os grupos indicados, existem diferenças significativas (V ou F) e qual o valor de p.",
    "fields": [
     {
      "k": "ch",
      "id": "s13",
      "label": "Grupo 1 × grupo 3: há diferença?",
      "o": [
       "V",
       "F"
      ],
      "a": 1,
      "traps": {
       "0": "p = 1,000 > 0,05 → **F** (sem diferença significativa)."
      }
     },
     {
      "k": "num",
      "id": "p13",
      "label": "Grupo 1 × grupo 3: valor de p",
      "a": 1.0,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.321655,
        "tol": 0.0015,
        "m": "Você usou a coluna **Sig.** (sem correção). Use **Adj. Sig.**, corrigida por Bonferroni para as 6 comparações."
       }
      ]
     },
     {
      "k": "ch",
      "id": "s23",
      "label": "Grupo 2 × grupo 3: há diferença?",
      "o": [
       "V",
       "F"
      ],
      "a": 1,
      "traps": {
       "0": "p = 1,000 > 0,05 → **F** (sem diferença significativa)."
      }
     },
     {
      "k": "num",
      "id": "p23",
      "label": "Grupo 2 × grupo 3: valor de p",
      "a": 1.0,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.852582,
        "tol": 0.0015,
        "m": "Você usou a coluna **Sig.** (sem correção). Use **Adj. Sig.**, corrigida por Bonferroni para as 6 comparações."
       },
       {
        "v": 0.988948,
        "tol": 0.0015,
        "m": "Este é o p do **Tukey**, que pressupõe a ANOVA. Como os pressupostos falharam, o post-hoc adequado são as comparações par a par do Kruskal-Wallis (Dunn-Bonferroni)."
       }
      ]
     },
     {
      "k": "ch",
      "id": "s14",
      "label": "Grupo 1 × grupo 4: há diferença?",
      "o": [
       "V",
       "F"
      ],
      "a": 0,
      "traps": {
       "1": "p = 0,006 < 0,05 → **V** (diferença significativa)."
      }
     },
     {
      "k": "num",
      "id": "p14",
      "label": "Grupo 1 × grupo 4: valor de p",
      "a": 0.006165,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.001027,
        "tol": 0.0015,
        "m": "Você usou a coluna **Sig.** (sem correção). Use **Adj. Sig.**, corrigida por Bonferroni para as 6 comparações."
       },
       {
        "v": 0.040238,
        "tol": 0.0015,
        "m": "Este é o p do **Tukey**, que pressupõe a ANOVA. Como os pressupostos falharam, o post-hoc adequado são as comparações par a par do Kruskal-Wallis (Dunn-Bonferroni)."
       }
      ]
     },
     {
      "k": "ch",
      "id": "s24",
      "label": "Grupo 2 × grupo 4: há diferença?",
      "o": [
       "V",
       "F"
      ],
      "a": 1,
      "traps": {
       "0": "p = 0,211 > 0,05 → **F** (sem diferença significativa)."
      }
     },
     {
      "k": "num",
      "id": "p24",
      "label": "Grupo 2 × grupo 4: valor de p",
      "a": 0.211221,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.035204,
        "tol": 0.0015,
        "m": "Você usou a coluna **Sig.** (sem correção). Use **Adj. Sig.**, corrigida por Bonferroni para as 6 comparações."
       },
       {
        "v": 0.065023,
        "tol": 0.0015,
        "m": "Este é o p do **Tukey**, que pressupõe a ANOVA. Como os pressupostos falharam, o post-hoc adequado são as comparações par a par do Kruskal-Wallis (Dunn-Bonferroni)."
       }
      ]
     }
    ],
    "grid": 2,
    "theory": [
     "Os testes **post-hoc** (*a posteriori*) comparam os grupos dois a dois, **corrigindo o p** para o número de comparações, de modo que o erro tipo I global fique em 5%.",
     "Depois da ANOVA, o **Tukey HSD** é o padrão quando as variâncias são homogêneas. Depois do Kruskal-Wallis, o SPSS faz o **teste de Dunn com correção de Bonferroni** (menu *Nonparametric Tests › Independent Samples*, opção *All pairwise*); use a coluna **Adj. Sig.**",
     "O post-hoc só faz sentido quando o teste global (questão 12) é significativo. Pode acontecer de o teste global ser significativo e só um ou dois pares diferirem."
    ],
    "spss": {
     "menu": "Analyze › Nonparametric Tests › Independent Samples… → *Fields*: `idas_sem_app` em *Test Fields*, `faixaetaria` em *Groups* (tem de estar como Nominal/Ordinal) → *Settings*: Customize tests → **Kruskal-Wallis 1-way ANOVA**, *Multiple comparisons: All pairwise* → Run. Dê duplo clique na tabela de resultados e escolha *Pairwise Comparisons*.",
     "syntax": "NPTESTS\n  /INDEPENDENT TEST (idas_sem_app) GROUP (faixaetaria)\n    KRUSKAL_WALLIS(COMPARE=PAIRWISE)\n  /CRITERIA ALPHA=0.05 CILEVEL=95."
    },
    "out": "Pairwise Comparisons (idas_sem_app)\n-----------------------------------------------------------------------------------\nSample 1-Sample 2  Test Statistic  Std. Error  Std. Test Statistic  Sig.  Adj. Sig.\n-----------------------------------------------------------------------------------\n1-2                        -4.750       4.036               -1.177  .239      1.000\n1-3                        -4.000       4.036               -0.991  .322      1.000\n1-4                       -13.250       4.036               -3.283  .001       .006\n2-3                         0.750       4.036                0.186  .853      1.000\n2-4                        -8.500       4.036               -2.106  .035       .211\n3-4                        -9.250       4.036               -2.292  .022       .131\n-----------------------------------------------------------------------------------\nSignificance values have been adjusted by the Bonferroni correction for multiple tests.",
    "sol": "1 × 3: p = 1,000 → F · 2 × 3: p = 1,000 → F · 1 × 4: p = 0,006 → V · 2 × 4: p = 0,211 → F."
   }
  ]
 },
 {
  "id": "s3",
  "title": "Promoção “Família no Estádio” e gasto dos adeptos",
  "tema": "Marketing esportivo",
  "n": 22,
  "file": "simulado3_estadio_promocao",
  "story": [
   "O departamento de marketing de um clube de futebol criou a promoção **“Família no Estádio”**: em jogos selecionados, quem compra o bilhete ganha desconto no bar e na loja do clube. Vinte e dois adeptos com bilhete de época foram acompanhados em dois jogos da mesma época: um **com a promoção** e outro **sem a promoção**. Registrou-se o **gasto no estádio**, em euros (bar e loja, sem contar o bilhete).",
   "Registraram-se também o sexo (1 = masculino, 2 = feminino), se o adepto é **sócio do clube** (1 = sim, 2 = não) e há quantos anos tem bilhete de época. Na época anterior, o gasto médio por adepto em dias de jogo foi de **12 euros**."
  ],
  "vars": [
   {
    "name": "id",
    "label": "Identificação do participante",
    "type": "Nominal",
    "values": ""
   },
   {
    "name": "sexo",
    "label": "Sexo do adepto",
    "type": "Nominal",
    "values": "1 = Masculino, 2 = Feminino"
   },
   {
    "name": "socio",
    "label": "É sócio do clube",
    "type": "Nominal",
    "values": "1 = Sim, 2 = Não"
   },
   {
    "name": "gasto_promo",
    "label": "Gasto no estádio (€) no jogo com promoção",
    "type": "Escala",
    "values": "€"
   },
   {
    "name": "gasto_normal",
    "label": "Gasto no estádio (€) no jogo sem promoção",
    "type": "Escala",
    "values": "€"
   },
   {
    "name": "anos_bilhete",
    "label": "Anos com bilhete de época",
    "type": "Escala",
    "values": ""
   }
  ],
  "questions": [
   {
    "q": "Qual a porcentagem de indivíduos do sexo masculino e do sexo feminino nesta amostra?",
    "fields": [
     {
      "k": "num",
      "id": "m",
      "label": "Masculino",
      "a": 45.5,
      "tol": 0.06,
      "traps": [
       {
        "v": 10.0,
        "tol": 0.06,
        "m": "Você digitou a **frequência absoluta** (contagem de casos). A questão pede a porcentagem: use a coluna *Percent* (ou *Valid Percent*) da tabela de frequências."
       },
       {
        "v": 54.545455,
        "tol": 0.06,
        "m": "Você trocou os sexos: este é o valor do sexo **feminino**. Confira os rótulos (1 = Masculino, 2 = Feminino) em *Variable View › Values*."
       }
      ],
      "unit": "%"
     },
     {
      "k": "num",
      "id": "f",
      "label": "Feminino",
      "a": 54.5,
      "tol": 0.06,
      "traps": [
       {
        "v": 12.0,
        "tol": 0.06,
        "m": "Você digitou a **frequência absoluta**. Use a coluna *Percent*."
       },
       {
        "v": 45.454545,
        "tol": 0.06,
        "m": "Você trocou os sexos: este é o valor do sexo **masculino**."
       }
      ],
      "unit": "%"
     }
    ],
    "theory": [
     "Para uma variável **nominal** (como sexo), a descrição adequada é a **distribuição de frequências**: quantos casos há em cada categoria (frequência absoluta) e qual a porcentagem do total (frequência relativa). Média e desvio-padrão não fazem sentido para códigos 1 e 2: são rótulos, não quantidades.",
     "A porcentagem é $\\% = \\dfrac{n_{categoria}}{N} \\times 100$. No SPSS, *Percent* usa todos os casos e *Valid Percent* exclui os valores omissos; como esta base não tem omissos, as duas colunas coincidem."
    ],
    "spss": {
     "menu": "Analyze › Descriptive Statistics › Frequencies… → coloque `sexo` em *Variable(s)* → OK",
     "syntax": "FREQUENCIES VARIABLES=sexo\n  /ORDER=ANALYSIS."
    },
    "out": "Sexo do adepto\n-----------------------------------------------------------------------\n                  Frequency  Percent  Valid Percent  Cumulative Percent\n-----------------------------------------------------------------------\nValid  Masculino         10     45.5           45.5                45.5\n       Feminino          12     54.5           54.5               100.0\n       Total             22    100.0          100.0                    \n-----------------------------------------------------------------------",
    "sol": "Há 10 homens e 12 mulheres em 22 casos: 10/22 × 100 = **45,5%** masculino e 12/22 × 100 = **54,5%** feminino."
   },
   {
    "q": "Qual a porcentagem de adeptos que são sócios do clube?",
    "fields": [
     {
      "k": "num",
      "id": "p",
      "label": "Porcentagem",
      "a": 31.8,
      "tol": 0.06,
      "traps": [
       {
        "v": 7.0,
        "tol": 0.06,
        "m": "Você digitou a **contagem**, não a porcentagem."
       },
       {
        "v": 68.181818,
        "tol": 0.06,
        "m": "Este é o valor da outra categoria (**Não**). Confira os códigos: 1 = Sim, 2 = Não."
       }
      ],
      "unit": "%"
     }
    ],
    "theory": [
     "Mesmo raciocínio da questão anterior: variável nominal → tabela de frequências. O cuidado aqui é **ler a categoria certa**: confira em *Variable View › Values* qual código corresponde a cada rótulo. Se ativar *View › Value Labels*, a *Data View* mostra os rótulos no lugar dos números."
    ],
    "spss": {
     "menu": "Analyze › Descriptive Statistics › Frequencies… → `socio` → OK",
     "syntax": "FREQUENCIES VARIABLES=socio\n  /ORDER=ANALYSIS."
    },
    "out": "É sócio do clube\n-----------------------------------------------\n              Frequency  Percent  Valid Percent\n-----------------------------------------------\nValid  Sim            7     31.8           31.8\n       Não           15     68.2           68.2\n       Total         22    100.0          100.0\n-----------------------------------------------",
    "sol": "7 de 22 casos na categoria **Sim** → 7/22 × 100 = **31,8%**."
   },
   {
    "q": "No jogo **com a promoção**, os adeptos gastaram **mais** do que a média da época anterior (12 €)?",
    "fields": [
     {
      "k": "ch",
      "id": "yn",
      "label": "Resposta",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 1,
      "traps": {
       "0": "Olhe primeiro para a **direção**: a média amostral (8,46) ficou do lado **oposto** ao que a pergunta propõe. Um p bilateral pequeno indica que a média difere de 12,0, mas no sentido contrário; para a hipótese da pergunta a resposta é **Não**."
      }
     },
     {
      "k": "num",
      "id": "t",
      "label": "Valor de t",
      "a": -7.127,
      "tol": 0.01,
      "traps": [
       {
        "v": 7.126951,
        "tol": 0.01,
        "m": "O sinal está trocado. No teste t de uma amostra, $t = (\\bar{x} - \\mu_0)/EP$: é negativo quando a média amostral é menor que o valor de teste."
       },
       {
        "v": -3.543636,
        "tol": 0.01,
        "m": "Este é o *Mean Difference* ($\\bar{x} - \\mu_0$), não o t. O t divide essa diferença pelo erro-padrão."
       }
      ]
     },
     {
      "k": "num",
      "id": "p",
      "label": "Valor de p (adequado à pergunta)",
      "a": 1.0,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.0,
        "tol": 0.0015,
        "m": "Armadilha clássica! O *One-Sided p* do SPSS é calculado **na direção em que a média amostral caiu**. Aqui a média amostral foi menor que 12,0, ou seja, **no sentido oposto** ao da pergunta. Para a hipótese da pergunta, o p unilateral é $1 - p_{bilateral}/2$, um valor grande: não há evidência a favor de $H_1$."
       },
       {
        "v": 0.0,
        "tol": 0.0015,
        "m": "Você usou o p **bilateral**. A pergunta tem direção, então o teste é unilateral; e, como a média caiu do lado oposto ao de $H_1$, o p unilateral é $1 - p_{bilateral}/2$."
       }
      ]
     }
    ],
    "theory": [
     "Comparar a média de **uma amostra** com um **valor de referência conhecido** (aqui, 12,0 €, vindo de um estudo anterior) é o caso do **teste t de uma amostra** (*One-Sample T Test*). Não se trata de dois grupos medidos neste estudo: o valor de referência é um número fixo.",
     "Hipóteses: $H_0: \\mu = 12,0$ e $H_1: \\mu > 12,0$. A estatística é $t = \\dfrac{\\bar{x} - \\mu_0}{s/\\sqrt{n}}$, com $n - 1$ graus de liberdade.",
     "**Unilateral ou bilateral?** Se a pergunta tem direção (\"mais rápido\", \"gasta mais\", \"menos eficiente\"), o teste é unilateral. O SPSS 27+ mostra *One-Sided p* e *Two-Sided p*. Atenção: o *One-Sided p* do SPSS é sempre metade do bilateral, **calculado na direção em que a média caiu**. Se a média caiu do lado oposto ao da sua hipótese, o p correto é $1 - p_{bilateral}/2$. Em versões antigas, que só mostram *Sig. (2-tailed)*, divida por 2 quando a direção bater.",
     "Pressuposto: normalidade da variável, ou amostra grande o suficiente para o Teorema do Limite Central. Com $n \\approx 20$ e assimetria moderada o t ainda é razoavelmente robusto; a alternativa não paramétrica é o teste de Wilcoxon de uma amostra."
    ],
    "spss": {
     "menu": "Analyze › Compare Means › One-Sample T Test… → `gasto_promo` em *Test Variable(s)* → *Test Value* = 12 → OK",
     "syntax": "T-TEST\n  /TESTVAL=12\n  /VARIABLES=gasto_promo\n  /CRITERIA=CI(.95)."
    },
    "out": "One-Sample Statistics\n--------------------------------------------------------\n              N    Mean  Std. Deviation  Std. Error Mean\n--------------------------------------------------------\ngasto_promo  22  8.4564          2.3322           0.4972\n--------------------------------------------------------\n\nOne-Sample Test (Test Value = 12)\n------------------------------------------------------------------\n                  t  df  One-Sided p  Two-Sided p  Mean Difference\n------------------------------------------------------------------\ngasto_promo  -7.127  21         .000         .000          -3.5436\n------------------------------------------------------------------",
    "sol": "Média = 8,46 € (DP = 2,332), $t(21) = −7,127$, p bilateral < 0,001. A média está do lado **oposto** ao de $H_1$, então p unilateral = 1 − (< 0,001)/2 = **1,000**. Como p > 0,05, a resposta é **Não**."
   },
   {
    "q": "Qual o valor da média e do desvio-padrão de **gasto no estádio (€) no jogo sem promoção**?",
    "fields": [
     {
      "k": "num",
      "id": "m",
      "label": "Média",
      "a": 5.617,
      "tol": 0.01,
      "traps": [
       {
        "v": 8.456364,
        "tol": 0.01,
        "m": "Este é o valor da outra variável (`gasto_promo`, no jogo com promoção). A questão pede `gasto_normal` (no jogo sem promoção)."
       },
       {
        "v": 5.365,
        "tol": 0.01,
        "m": "Esta é a **mediana**, não a média."
       }
      ],
      "unit": "€"
     },
     {
      "k": "num",
      "id": "dp",
      "label": "Desvio-padrão",
      "a": 2.738,
      "tol": 0.01,
      "traps": [
       {
        "v": 0.583655,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão da média** (*Std. Error*), não o desvio-padrão. O EP = DP/√n mede a incerteza da média; o DP mede a dispersão dos dados."
       },
       {
        "v": 7.494375,
        "tol": 0.01,
        "m": "Você digitou a **variância**. O desvio-padrão é a raiz quadrada dela."
       },
       {
        "v": 2.332151,
        "tol": 0.01,
        "m": "Este é o DP da outra variável (`gasto_promo`)."
       },
       {
        "v": 2.674644,
        "tol": 0.01,
        "m": "Você calculou o DP dividindo por $n$ (populacional). O SPSS, e a estatística inferencial, usam $n - 1$."
       }
      ],
      "unit": "€"
     }
    ],
    "theory": [
     "Para uma variável **quantitativa** (escala), a descrição básica é uma medida de tendência central (média) e uma de dispersão (desvio-padrão).",
     "$\\bar{x} = \\dfrac{\\sum x_i}{n}$ e $s = \\sqrt{\\dfrac{\\sum (x_i - \\bar{x})^2}{n - 1}}$. Divide-se por $n - 1$ porque a amostra estima a variância populacional e já \"gastou\" um grau de liberdade ao estimar a média (Módulo 1).",
     "Não confunda o **desvio-padrão** (dispersão dos dados) com o **erro-padrão da média** ($EP = s/\\sqrt{n}$, a precisão da média), que aparece logo ao lado na saída do *Explore*."
    ],
    "spss": {
     "menu": "Analyze › Descriptive Statistics › Descriptives… → `gasto_normal` → OK (ou *Explore*, que mostra mais estatísticas)",
     "syntax": "DESCRIPTIVES VARIABLES=gasto_normal\n  /STATISTICS=MEAN STDDEV MIN MAX."
    },
    "out": "Descriptive Statistics\n----------------------------------------------------------------\n                     N  Minimum  Maximum    Mean  Std. Deviation\n----------------------------------------------------------------\ngasto_normal        22     1.15    10.55  5.6168          2.7376\nValid N (listwise)  22                                          \n----------------------------------------------------------------",
    "sol": "Média = **5,62 €** e desvio-padrão = **2,738 €**."
   },
   {
    "q": "Existe diferença entre os sexos no **gasto no estádio (€) no jogo com promoção**?",
    "fields": [
     {
      "k": "num",
      "id": "lev",
      "label": "p do teste de Levene",
      "a": 0.659501,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.60617,
        "tol": 0.0015,
        "m": "Este é o p do **teste t**, não o do Levene. O Levene vem nas primeiras colunas da tabela (*F* e *Sig.*)."
       },
       {
        "v": 0.200032,
        "tol": 0.0015,
        "m": "Este é o **F** do Levene; o campo pede o p (*Sig.*)."
       }
      ]
     },
     {
      "k": "ch",
      "id": "row",
      "label": "Linha da tabela a usar",
      "o": [
       "Equal variances assumed (t de Student)",
       "Equal variances not assumed (t de Welch)"
      ],
      "a": 0,
      "traps": {
       "1": "O Levene deu p > 0,05: não há evidência de variâncias diferentes, então use a linha *Equal variances assumed*."
      }
     },
     {
      "k": "num",
      "id": "p",
      "label": "p do teste t",
      "a": 0.60617,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.659501,
        "tol": 0.0015,
        "m": "Este é o p do **Levene** (que testa variâncias, não médias). O p do teste t está em *Two-Sided p* / *Sig. (2-tailed)*."
       },
       {
        "v": 0.303085,
        "tol": 0.0015,
        "m": "Você usou o p unilateral. A pergunta (\"existe diferença?\") não tem direção: use o *Two-Sided p*."
       }
      ]
     },
     {
      "k": "ch",
      "id": "yn",
      "label": "Existe diferença?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 1,
      "traps": {
       "0": "O p do teste t (0,606) é maior que 0,05: não se rejeita $H_0$ → **Não** há evidência de diferença."
      }
     }
    ],
    "theory": [
     "Dois **grupos independentes** (homens e mulheres são pessoas diferentes) e uma variável quantitativa → **teste t para amostras independentes**. $H_0: \\mu_M = \\mu_F$.",
     "O SPSS faz antes o **teste de Levene**, cuja $H_0$ é *variâncias iguais*. Se p do Levene > 0,05, use a linha *Equal variances assumed* (t de Student, com variância combinada). Se p < 0,05, use *Equal variances not assumed* (t de Welch, que corrige os graus de liberdade).",
     "Erro frequente: tomar o p do Levene como resposta. O Levene responde se as **variâncias** diferem; a pergunta é sobre as **médias**.",
     "Pressuposto adicional: normalidade em cada grupo. Se a variável fosse muito assimétrica, com grupos pequenos, a alternativa seria o **Mann-Whitney** (*Nonparametric Tests › Legacy Dialogs › 2 Independent Samples*). Aqui, para conferência, o Mann-Whitney dá U = 57,0, p = 0,843."
    ],
    "spss": {
     "menu": "Analyze › Compare Means › Independent-Samples T Test… → `gasto_promo` em *Test Variable(s)*, `sexo` em *Grouping Variable* → *Define Groups*: 1 e 2 → OK",
     "syntax": "T-TEST GROUPS=sexo(1 2)\n  /VARIABLES=gasto_promo\n  /CRITERIA=CI(.95)."
    },
    "out": "Group Statistics\n-------------------------------------\nsexo        N    Mean  Std. Deviation\n-------------------------------------\nMasculino  10  8.1660          2.4234\nFeminino   12  8.6983          2.3319\n-------------------------------------\n\nIndependent Samples Test (gasto_promo)\n------------------------------------------------------------------------------------\n                             Levene F  Sig.       t      df  Two-Sided p  Mean Diff.\n------------------------------------------------------------------------------------\nEqual variances assumed         0.200  .660  -0.524      20         .606     -0.5323\nEqual variances not assumed                  -0.522  18.995         .608     -0.5323\n------------------------------------------------------------------------------------",
    "sol": "Levene: F = 0,200, p = 0,660 → variâncias homogêneas, linha **Equal variances assumed**. Teste t: **p = 0,606** → **não** há diferença significativa entre os sexos."
   },
   {
    "q": "Qual a média e o desvio-padrão de **gasto no estádio (€) no jogo sem promoção**, para o sexo masculino e para o feminino?",
    "fields": [
     {
      "k": "num",
      "id": "mm",
      "label": "Masculino: média",
      "a": 5.134,
      "tol": 0.01,
      "traps": [
       {
        "v": 6.019167,
        "tol": 0.01,
        "m": "Este é o valor do sexo **feminino**."
       },
       {
        "v": 8.166,
        "tol": 0.01,
        "m": "Este é o valor de `gasto_promo`; a questão pede `gasto_normal`."
       }
      ],
      "unit": "€"
     },
     {
      "k": "num",
      "id": "dm",
      "label": "Masculino: desvio-padrão",
      "a": 2.284,
      "tol": 0.01,
      "traps": [
       {
        "v": 0.722108,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão**, não o DP."
       },
       {
        "v": 3.106862,
        "tol": 0.01,
        "m": "Este é o DP do sexo **feminino**."
       },
       {
        "v": 2.423364,
        "tol": 0.01,
        "m": "Este é o DP de `gasto_promo`."
       }
      ],
      "unit": "€"
     },
     {
      "k": "num",
      "id": "mf",
      "label": "Feminino: média",
      "a": 6.019,
      "tol": 0.01,
      "traps": [
       {
        "v": 5.134,
        "tol": 0.01,
        "m": "Este é o valor do sexo **masculino**."
       },
       {
        "v": 8.698333,
        "tol": 0.01,
        "m": "Este é o valor de `gasto_promo`."
       }
      ],
      "unit": "€"
     },
     {
      "k": "num",
      "id": "df",
      "label": "Feminino: desvio-padrão",
      "a": 3.107,
      "tol": 0.01,
      "traps": [
       {
        "v": 0.896874,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão**, não o DP."
       },
       {
        "v": 2.283507,
        "tol": 0.01,
        "m": "Este é o DP do sexo **masculino**."
       },
       {
        "v": 2.331944,
        "tol": 0.01,
        "m": "Este é o DP de `gasto_promo`."
       }
      ],
      "unit": "€"
     }
    ],
    "theory": [
     "Descritivas **por grupo**: a mesma média e o mesmo DP da questão 4, mas calculados separadamente para cada categoria de outra variável. É o que se reporta sempre que se comparam grupos (e é a tabela *Group Statistics* do teste t).",
     "Há três caminhos no SPSS: *Compare Means › Means* (o mais direto), *Explore* com `sexo` em *Factor List*, ou *Data › Split File* seguido de *Descriptives*. Se usar *Split File*, lembre-se de **desligá-lo** depois (*Analyze all cases*), senão todas as análises seguintes sairão divididas por sexo."
    ],
    "spss": {
     "menu": "Analyze › Compare Means › Means… → `gasto_normal` em *Dependent List*, `sexo` em *Independent List* → OK",
     "syntax": "MEANS TABLES=gasto_normal BY sexo\n  /CELLS=MEAN COUNT STDDEV."
    },
    "out": "Report (gasto_normal)\n-------------------------------------\nsexo         Mean   N  Std. Deviation\n-------------------------------------\nMasculino  5.1340  10          2.2835\nFeminino   6.0192  12          3.1069\nTotal      5.6168  22          2.7376\n-------------------------------------",
    "sol": "Masculino: média **5,13**, DP **2,284**. Feminino: média **6,02**, DP **3,107** (€)."
   },
   {
    "q": "A distribuição de **gasto no estádio (€) no jogo com promoção** segue uma distribuição normal?",
    "fields": [
     {
      "k": "ch",
      "id": "yn",
      "label": "Existe normalidade?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 1,
      "traps": {
       "0": "No Shapiro-Wilk, $H_0$ é *os dados vêm de uma distribuição normal*. p = 0,018 < 0,05: rejeita-se a normalidade → **Não**. Cuidado com a inversão: aqui p pequeno é **mau sinal** para a normalidade."
      }
     },
     {
      "k": "num",
      "id": "w",
      "label": "Estatística (W de Shapiro-Wilk)",
      "a": 0.89,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.227846,
        "tol": 0.0015,
        "m": "Esta é a estatística do **Kolmogorov-Smirnov** (primeiras colunas da tabela). Com n < 50 usa-se a coluna **Shapiro-Wilk**."
       },
       {
        "v": 0.968157,
        "tol": 0.0015,
        "m": "Este é o W de `gasto_normal`; a questão pede `gasto_promo`."
       }
      ]
     },
     {
      "k": "num",
      "id": "p",
      "label": "Valor de p",
      "a": 0.018453,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.668424,
        "tol": 0.0015,
        "m": "Este é o p de `gasto_normal`; a questão pede `gasto_promo`."
       }
      ]
     }
    ],
    "theory": [
     "O teste de **Shapiro-Wilk** verifica se a amostra é compatível com uma população normal. $H_0$: a distribuição é normal; $H_1$: não é. Ao contrário da maioria dos testes, aqui **queremos não rejeitar** $H_0$ (p > 0,05) para poder usar testes paramétricos.",
     "O SPSS mostra dois testes na tabela *Tests of Normality*: Kolmogorov-Smirnov (com correção de Lilliefors) e Shapiro-Wilk. Para amostras pequenas (n < 50) o **Shapiro-Wilk** é o recomendado, por ter mais poder.",
     "O W varia entre 0 e 1: quanto mais perto de 1, mais os dados ordenados se alinham com o que se esperaria de uma normal. Complemente sempre com o **Q-Q plot** (*Normal Q-Q Plot*, gerado pela opção *Normality plots with tests*): pontos longe da reta indicam afastamento da normalidade."
    ],
    "spss": {
     "menu": "Analyze › Descriptive Statistics › Explore… → `gasto_promo` em *Dependent List* → *Plots…* → marque **Normality plots with tests** → Continue → OK",
     "syntax": "EXAMINE VARIABLES=gasto_promo\n  /PLOT BOXPLOT NPPLOT\n  /STATISTICS DESCRIPTIVES\n  /NOTOTAL."
    },
    "out": "Tests of Normality\n-------------------------------------------------------------\n             K-S Statistic  df  Sig.  S-W Statistic  df  Sig.\n-------------------------------------------------------------\ngasto_promo          0.228  22   ...          0.890  22  .018\n-------------------------------------------------------------\na. Lilliefors Significance Correction",
    "sol": "Shapiro-Wilk: **W = 0,890**, **p = 0,018** → rejeita-se $H_0$: a distribuição **não é normal**."
   },
   {
    "q": "Faça um teste para avaliar a associação entre **anos com bilhete de época** e **gasto no estádio (€) no jogo com promoção**. Escolha a estatística mais adequada.",
    "fields": [
     {
      "k": "ch",
      "id": "test",
      "label": "Teste escolhido",
      "o": [
       "Correlação de Pearson",
       "Correlação de Spearman"
      ],
      "a": 1,
      "traps": {
       "0": "`gasto_promo` **não** tem distribuição normal (Shapiro-Wilk p = 0,018, questão 7), então o coeficiente adequado é o de **Spearman**, baseado em postos."
      }
     },
     {
      "k": "num",
      "id": "r",
      "label": "Valor da correlação",
      "a": 0.89,
      "tol": 0.005,
      "traps": [
       {
        "v": 0.952384,
        "tol": 0.005,
        "m": "Este é o coeficiente do **outro** teste. `gasto_promo` **não** tem distribuição normal (Shapiro-Wilk p = 0,018, questão 7), então o coeficiente adequado é o de **Spearman**, baseado em postos."
       },
       {
        "v": 0.792386,
        "tol": 0.005,
        "m": "Você digitou o $r^2$ (coeficiente de determinação). A questão pede o próprio coeficiente de correlação."
       },
       {
        "v": -0.890161,
        "tol": 0.005,
        "m": "O sinal está trocado. Confira o sentido da relação no diagrama de dispersão."
       }
      ]
     },
     {
      "k": "num",
      "id": "p",
      "label": "Valor de p",
      "a": 0.0,
      "tol": 0.0015,
      "traps": [],
      "lt": true
     }
    ],
    "theory": [
     "**Pearson** ($r$) mede associação **linear** entre duas variáveis quantitativas; pressupõe normalidade (bivariada) e é sensível a valores extremos. **Spearman** ($\\rho$) é a correlação de Pearson aplicada aos **postos**: mede associação **monotônica** e não exige normalidade.",
     "Regra prática da disciplina: verifique a normalidade das duas variáveis (Shapiro-Wilk). Se ambas forem normais, use Pearson; se pelo menos uma não for, use Spearman.",
     "Interpretação: o sinal dá o sentido (positivo: as duas crescem juntas; negativo: uma cresce enquanto a outra diminui) e o módulo dá a força (regra de bolso: < 0,3 fraca, 0,3 a 0,7 moderada, > 0,7 forte). $H_0$ do teste: $\\rho = 0$ na população.",
     "Correlação não é causalidade. Antes de tudo, olhe o diagrama de dispersão (*Graphs › Legacy Dialogs › Scatter/Dot*)."
    ],
    "spss": {
     "menu": "Analyze › Correlate › Bivariate… → `anos_bilhete` e `gasto_promo` em *Variables* → marque **Spearman** → OK. (Verifique a normalidade das duas antes, em *Explore*.)",
     "syntax": "EXAMINE VARIABLES=anos_bilhete gasto_promo\n  /PLOT NPPLOT\n  /NOTOTAL.\n\nNONPAR CORR\n  /VARIABLES=anos_bilhete gasto_promo\n  /PRINT=SPEARMAN TWOTAIL NOSIG."
    },
    "out": "Tests of Normality (Shapiro-Wilk)\n---------------------------------\n              Statistic  df  Sig.\n---------------------------------\nanos_bilhete      0.878  22  .011\ngasto_promo       0.890  22  .018\n---------------------------------\n\nCorrelations (Spearman's rho)\n--------------------------------------------------\n                                       gasto_promo\n--------------------------------------------------\nanos_bilhete  Correlation Coefficient         .890\n                      Sig. (2-tailed)         .000\n                                    N           22\n--------------------------------------------------",
    "sol": "`gasto_promo` **não** tem distribuição normal (Shapiro-Wilk p = 0,018, questão 7), então o coeficiente adequado é o de **Spearman**, baseado em postos. Resultado: **ρ = 0,890**, **p < 0,001**: associação forte positiva e significativa entre anos com bilhete de época e gasto no estádio (€) no jogo com promoção. (Para comparação, o outro coeficiente daria 0,952.)"
   },
   {
    "q": "Existe diferença entre o gasto médio no jogo com promoção e no jogo sem promoção?",
    "fields": [
     {
      "k": "ch",
      "id": "test",
      "label": "Teste escolhido",
      "o": [
       "t para amostras emparelhadas",
       "Wilcoxon",
       "t para amostras independentes",
       "Mann-Whitney"
      ],
      "a": 0,
      "traps": {
       "2": "As duas medidas são das **mesmas pessoas** (cada participante foi medido nas duas condições), então as amostras são **emparelhadas**, não independentes.",
       "3": "O Mann-Whitney é para grupos **independentes**. Aqui as mesmas pessoas foram medidas duas vezes: amostras emparelhadas.",
       "1": "As diferenças (gasto_promo − gasto_normal) seguem a normal (Shapiro-Wilk p = 0,368), então o teste paramétrico, **t emparelhado**, é o adequado."
      }
     },
     {
      "k": "ch",
      "id": "yn",
      "label": "Existe diferença?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 0,
      "traps": {
       "1": "O p (< 0,001) é menor que 0,05 → **Sim**."
      }
     },
     {
      "k": "num",
      "id": "p",
      "label": "Valor de p",
      "a": 0.0,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.368472,
        "tol": 0.0015,
        "m": "Este é o p do Shapiro-Wilk das diferenças (o pressuposto), não do teste de comparação."
       }
      ],
      "lt": true
     },
     {
      "k": "num",
      "id": "ma",
      "label": "Média no jogo com promoção",
      "a": 8.456,
      "tol": 0.01,
      "traps": [
       {
        "v": 5.616818,
        "tol": 0.01,
        "m": "Você trocou as condições."
       }
      ],
      "unit": "€"
     },
     {
      "k": "num",
      "id": "mb",
      "label": "Média no jogo sem promoção",
      "a": 5.617,
      "tol": 0.01,
      "traps": [
       {
        "v": 8.456364,
        "tol": 0.01,
        "m": "Você trocou as condições."
       }
      ],
      "unit": "€"
     }
    ],
    "theory": [
     "Cada participante foi medido **nas duas condições**: as observações estão emparelhadas. O teste analisa a **diferença** dentro de cada pessoa, o que remove a variação entre pessoas (atletas mais rápidos são rápidos nas duas condições) e dá muito mais poder do que comparar dois grupos independentes.",
     "O pressuposto do **t emparelhado** é a normalidade das **diferenças** (não de cada variável separadamente). Crie a variável diferença em *Transform › Compute Variable* e aplique o Shapiro-Wilk a ela. Se não for normal, use o **Wilcoxon** (postos sinalizados).",
     "$t = \\dfrac{\\bar{d}}{s_d/\\sqrt{n}}$, com $n - 1$ graus de liberdade, onde $d_i$ é a diferença de cada participante. O Wilcoxon ordena os $|d_i|$, soma os postos das diferenças positivas e das negativas e compara com o esperado sob $H_0$ (aproximação normal, Z)."
    ],
    "spss": {
     "menu": "Transform › Compute Variable… (dif = gasto_promo − gasto_normal) → Explore com *Normality plots with tests*. Depois: Analyze › Compare Means › Paired-Samples T Test… → par `gasto_promo` / `gasto_normal` → OK",
     "syntax": "COMPUTE dif=gasto_promo-gasto_normal.\nEXECUTE.\nEXAMINE VARIABLES=dif\n  /PLOT NPPLOT\n  /NOTOTAL.\n\nT-TEST PAIRS=gasto_promo WITH gasto_normal (PAIRED)\n  /CRITERIA=CI(.95)."
    },
    "out": "Tests of Normality (dif)\n-------------------------------------------------\n     K-S Statistic  Sig.  S-W Statistic  df  Sig.\n-------------------------------------------------\ndif          0.136   ...          0.953  22  .368\n-------------------------------------------------\n\nPaired Samples Statistics\n----------------------------------------\n                Mean   N  Std. Deviation\n----------------------------------------\ngasto_promo   8.4564  22          2.3322\ngasto_normal  5.6168  22          2.7376\n----------------------------------------\n\nPaired Samples Test\n--------------------------------------------------------------------------\n                            Mean (dif)  Std. Dev.       t  df  Two-Sided p\n--------------------------------------------------------------------------\ngasto_promo - gasto_normal      2.8395     1.2582  10.586  21         .000\n--------------------------------------------------------------------------",
    "sol": "As medidas são emparelhadas. Shapiro-Wilk das diferenças: p = 0,368 → normal → **t emparelhado**: $t(21) = 10,586$, **p < 0,001**. Médias: 8,46 € (no jogo com promoção) e 5,62 € (no jogo sem promoção). Há diferença significativa."
   },
   {
    "q": "Crie uma nova variável (**grupoanos**) com base em `anos_bilhete`. Atribua os valores 1, 2, 3 e 4, respectivamente, a: até 2 anos; 3 a 5 anos; 6 a 10 anos; 11 anos ou mais. Qual o tamanho, a média e o desvio-padrão de `anos_bilhete` em cada grupo criado?",
    "fields": [
     {
      "k": "num",
      "id": "n1",
      "label": "Grupo 1: n",
      "a": 5.0,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "m1",
      "label": "Grupo 1: média",
      "a": 1.8,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "s1",
      "label": "Grupo 1: DP",
      "a": 0.447,
      "tol": 0.01,
      "traps": [
       {
        "v": 0.2,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão**, não o DP."
       }
      ]
     },
     {
      "k": "num",
      "id": "n2",
      "label": "Grupo 2: n",
      "a": 6.0,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "m2",
      "label": "Grupo 2: média",
      "a": 3.667,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "s2",
      "label": "Grupo 2: DP",
      "a": 0.816,
      "tol": 0.01,
      "traps": [
       {
        "v": 0.333333,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão**, não o DP."
       }
      ]
     },
     {
      "k": "num",
      "id": "n3",
      "label": "Grupo 3: n",
      "a": 6.0,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "m3",
      "label": "Grupo 3: média",
      "a": 7.833,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "s3",
      "label": "Grupo 3: DP",
      "a": 1.722,
      "tol": 0.01,
      "traps": [
       {
        "v": 0.703167,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão**, não o DP."
       }
      ]
     },
     {
      "k": "num",
      "id": "n4",
      "label": "Grupo 4: n",
      "a": 5.0,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "m4",
      "label": "Grupo 4: média",
      "a": 14.8,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "s4",
      "label": "Grupo 4: DP",
      "a": 3.271,
      "tol": 0.01,
      "traps": [
       {
        "v": 1.462874,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão**, não o DP."
       }
      ]
     }
    ],
    "grid": 3,
    "theory": [
     "**Recodificar** transforma uma variável quantitativa em categorias (classes). Use sempre *Recode into Different Variables*, para não destruir a variável original.",
     "Cuidado com os limites das classes: cada valor tem de cair em **uma e só uma** classe. Com valores inteiros, \"3 a 5 anos\" corresponde a `3 THRU 5=2`. Use `LOWEST` para a primeira classe e `HIGHEST` para a última.",
     "Depois de recodificar, dê rótulos aos códigos (*Variable View › Values*) e mude a medida da nova variável para **Nominal** ou **Ordinal**: alguns procedimentos (como o Kruskal-Wallis pelo menu *Independent Samples*) exigem isso.",
     "Confira sempre o resultado: o tamanho de cada grupo (n) mostra se a recodificação ficou certa. Se algum n não bater, revise os limites (o caso mais comum é um valor de fronteira cair na classe errada ou ficar *System Missing*)."
    ],
    "spss": {
     "menu": "Transform › Recode into Different Variables… → `anos_bilhete` → *Output Variable*: `grupoanos` → Change → *Old and New Values…*: Range, LOWEST through 2 → 1; Range 3 through 5 → 2; Range 6 through 10 → 3; Range, 11 through HIGHEST → 4 → Continue → OK. Depois: Analyze › Compare Means › Means… (`anos_bilhete` BY `grupoanos`)",
     "syntax": "RECODE anos_bilhete (LOWEST THRU 2=1) (3 THRU 5=2) (6 THRU 10=3) (11 THRU HIGHEST=4) INTO grupoanos.\nVARIABLE LABELS grupoanos 'Anos com bilhete de época (grupos)'.\nVALUE LABELS grupoanos 1 'até 2 anos' 2 '3 a 5 anos' 3 '6 a 10 anos' 4 '11 anos ou mais'.\nVARIABLE LEVEL grupoanos (ORDINAL).\nEXECUTE.\n\nMEANS TABLES=anos_bilhete BY grupoanos\n  /CELLS=MEAN COUNT STDDEV."
    },
    "out": "Report (anos_bilhete)\n----------------------------------------------\ngrupoanos             Mean   N  Std. Deviation\n----------------------------------------------\n1 até 2 anos        1.8000   5          0.4472\n2 3 a 5 anos        3.6667   6          0.8165\n3 6 a 10 anos       7.8333   6          1.7224\n4 11 anos ou mais  14.8000   5          3.2711\nTotal               6.9091  22          5.2182\n----------------------------------------------",
    "sol": "Grupo 1: n = 5, média = 1,80, DP = 0,447 · Grupo 2: n = 6, média = 3,67, DP = 0,816 · Grupo 3: n = 6, média = 7,83, DP = 1,722 · Grupo 4: n = 5, média = 14,80, DP = 3,271."
   },
   {
    "q": "Verifique se a nova variável (**grupoanos**) cumpre os pressupostos necessários para efetuar uma ANOVA de `gasto_normal`.",
    "fields": [
     {
      "k": "ch",
      "id": "norm",
      "label": "Normalidade em todos os grupos?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 0,
      "traps": {
       "1": "Todos os grupos têm Shapiro-Wilk p > 0,05 → **Sim**."
      }
     },
     {
      "k": "num",
      "id": "p1",
      "label": "Grupo 1: p do Shapiro-Wilk",
      "a": 0.209229,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.854519,
        "tol": 0.0015,
        "m": "Este é o **W** (estatística), não o p (*Sig.*)."
       }
      ]
     },
     {
      "k": "num",
      "id": "p2",
      "label": "Grupo 2: p do Shapiro-Wilk",
      "a": 0.470028,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.91499,
        "tol": 0.0015,
        "m": "Este é o **W** (estatística), não o p (*Sig.*)."
       }
      ]
     },
     {
      "k": "num",
      "id": "p3",
      "label": "Grupo 3: p do Shapiro-Wilk",
      "a": 0.332911,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.892762,
        "tol": 0.0015,
        "m": "Este é o **W** (estatística), não o p (*Sig.*)."
       }
      ]
     },
     {
      "k": "num",
      "id": "p4",
      "label": "Grupo 4: p do Shapiro-Wilk",
      "a": 0.658569,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.938956,
        "tol": 0.0015,
        "m": "Este é o **W** (estatística), não o p (*Sig.*)."
       }
      ]
     },
     {
      "k": "ch",
      "id": "hom",
      "label": "Homogeneidade das variâncias?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 0,
      "traps": {
       "1": "Levene p = 0,669 > 0,05 → não se rejeita a igualdade das variâncias → **Sim**."
      }
     },
     {
      "k": "num",
      "id": "levF",
      "label": "Estatística de Levene",
      "a": 0.527,
      "tol": 0.01,
      "traps": [
       {
        "v": 0.125104,
        "tol": 0.01,
        "m": "Este é o Levene **baseado na mediana** (*Based on Median*). Use a primeira linha, *Based on Mean*."
       }
      ]
     },
     {
      "k": "num",
      "id": "levp",
      "label": "p do Levene",
      "a": 0.669079,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.944033,
        "tol": 0.0015,
        "m": "Este é o p do Levene **baseado na mediana**. Use a linha *Based on Mean*."
       }
      ]
     },
     {
      "k": "ch",
      "id": "ok",
      "label": "Poderia efetuar a ANOVA?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 0,
      "traps": {
       "1": "Normalidade em todos os grupos e variâncias homogêneas → os pressupostos estão cumpridos → **Sim**."
      }
     }
    ],
    "grid": 1,
    "theory": [
     "A **ANOVA one-way** compara as médias de 3 ou mais grupos independentes. Pressupostos: (1) observações independentes; (2) **normalidade em cada grupo** (ou dos resíduos); (3) **homogeneidade das variâncias** (homocedasticidade).",
     "**Normalidade**: Shapiro-Wilk **por grupo** (em *Explore*, coloque a variável de grupo em *Factor List*). Um único grupo com p < 0,05 já compromete o pressuposto. Com grupos tão pequenos (4 a 6 casos) o teste tem pouco poder, por isso olhe também os Q-Q plots e os boxplots.",
     "**Homogeneidade**: teste de **Levene**, $H_0$: as variâncias são iguais em todos os grupos. No SPSS 27+ ele aparece em quatro linhas; use a primeira, *Based on Mean*.",
     "Se só a homogeneidade falhar (dados normais), a alternativa mais adequada é a **ANOVA de Welch** (*Options › Welch*), com post-hoc de Games-Howell. Se a normalidade falhar com grupos pequenos, use o **Kruskal-Wallis**."
    ],
    "spss": {
     "menu": "Analyze › Descriptive Statistics › Explore… → `gasto_normal` em *Dependent List*, `grupoanos` em *Factor List* → *Plots*: Normality plots with tests → OK. Depois: Analyze › Compare Means › One-Way ANOVA… → *Options*: **Homogeneity of variance test**",
     "syntax": "EXAMINE VARIABLES=gasto_normal BY grupoanos\n  /PLOT BOXPLOT NPPLOT\n  /NOTOTAL.\n\nONEWAY gasto_normal BY grupoanos\n  /STATISTICS DESCRIPTIVES HOMOGENEITY."
    },
    "out": "Tests of Normality (gasto_normal, Shapiro-Wilk)\n------------------------------\ngrupoanos  Statistic  df  Sig.\n------------------------------\n1              0.855   5  .209\n2              0.915   6  .470\n3              0.893   6  .333\n4              0.939   5  .659\n------------------------------\n\nTests of Homogeneity of Variances\n-------------------------------------------------\n                 Levene Statistic  df1  df2  Sig.\n-------------------------------------------------\nBased on Mean               0.527    3   18  .669\nBased on Median             0.125    3   18  .944\n...                                              \n-------------------------------------------------",
    "sol": "Shapiro-Wilk por grupo: grupo 1: W = 0,855, p = 0,209; grupo 2: W = 0,915, p = 0,470; grupo 3: W = 0,893, p = 0,333; grupo 4: W = 0,939, p = 0,659. Levene (*Based on Mean*): 0,527, p = 0,669. Pressupostos cumpridos → **pode** fazer a ANOVA."
   },
   {
    "q": "O clube quer saber se, **no jogo sem promoção**, o gasto difere conforme há quantos anos o adepto tem bilhete de época. Escolha o teste adequado (com base na questão anterior).",
    "fields": [
     {
      "k": "ch",
      "id": "test",
      "label": "Teste escolhido",
      "o": [
       "ANOVA one-way",
       "Kruskal-Wallis"
      ],
      "a": 0,
      "traps": {
       "1": "Os pressupostos foram cumpridos (questão 11), então use a **ANOVA**, que tem mais poder do que o Kruskal-Wallis."
      }
     },
     {
      "k": "num",
      "id": "stat",
      "label": "Estatística do teste (F ou H)",
      "a": 10.005,
      "tol": 0.01,
      "traps": [
       {
        "v": 13.086957,
        "tol": 0.01,
        "m": "Esta é a estatística do **outro** teste. Os pressupostos foram cumpridos (questão 11), então use a **ANOVA**, que tem mais poder do que o Kruskal-Wallis."
       }
      ]
     },
     {
      "k": "num",
      "id": "p",
      "label": "Valor de p",
      "a": 0.000419,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.004452,
        "tol": 0.0015,
        "m": "Este é o p do **outro** teste. Os pressupostos foram cumpridos (questão 11), então use a **ANOVA**, que tem mais poder do que o Kruskal-Wallis."
       },
       {
        "v": 0.669079,
        "tol": 0.0015,
        "m": "Este é o p do **Levene** (pressuposto), não do teste de comparação."
       }
      ],
      "lt": true
     },
     {
      "k": "ch",
      "id": "yn",
      "label": "Existem diferenças entre os grupos?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 0,
      "traps": {
       "1": "p < 0,001 < 0,05 → rejeita-se $H_0$ de igualdade → **Sim**, pelo menos um grupo difere."
      }
     }
    ],
    "theory": [
     "**ANOVA one-way**: $H_0: \\mu_1 = \\mu_2 = \\mu_3 = \\mu_4$. $F = QM_{entre}/QM_{dentro}$, a razão entre a variação **entre** os grupos (sinal) e a variação **dentro** dos grupos (ruído). Sob $H_0$, $F \\approx 1$ (Módulo 8).",
     "**Kruskal-Wallis**: alternativa não paramétrica. Ordena todos os valores, calcula o posto médio de cada grupo e testa se as distribuições são iguais. A estatística H segue aproximadamente uma $\\chi^2$ com $k - 1$ graus de liberdade (Módulo 9).",
     "Um resultado significativo diz apenas que **pelo menos um** grupo difere de outro. Para saber quais, é preciso o post-hoc (próxima questão). Por que não vários testes t? Com 4 grupos há 6 pares, e o erro tipo I acumulado chegaria a cerca de 26%."
    ],
    "spss": {
     "menu": "Analyze › Compare Means › One-Way ANOVA… → `gasto_normal` em *Dependent List*, `grupoanos` em *Factor* → OK",
     "syntax": "ONEWAY gasto_normal BY grupoanos\n  /STATISTICS DESCRIPTIVES HOMOGENEITY."
    },
    "out": "ANOVA (gasto_normal)\n-------------------------------------------------------------\n                Sum of Squares  df  Mean Square       F  Sig.\n-------------------------------------------------------------\nBetween Groups          98.382   3       32.794  10.005  .000\nWithin Groups           58.999  18        3.278              \nTotal                  157.382  21                           \n-------------------------------------------------------------",
    "sol": "ANOVA: $F(3, 18) = 10,005$, **p < 0,001**, $\\eta^2 = 0,63$. Há diferença entre pelo menos dois grupos."
   },
   {
    "q": "Em relação à questão anterior, aplique o teste *a posteriori* de **Tukey** e diga se, entre os grupos indicados, existem diferenças significativas (V ou F) e qual o valor de p.",
    "fields": [
     {
      "k": "ch",
      "id": "s13",
      "label": "Grupo 1 × grupo 3: há diferença?",
      "o": [
       "V",
       "F"
      ],
      "a": 0,
      "traps": {
       "1": "p = 0,021 < 0,05 → **V** (diferença significativa)."
      }
     },
     {
      "k": "num",
      "id": "p13",
      "label": "Grupo 1 × grupo 3: valor de p",
      "a": 0.021132,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.004463,
        "tol": 0.0015,
        "m": "Este é o p **sem correção** (LSD ou um t entre os dois grupos). O Tukey ajusta o p para as múltiplas comparações; use a coluna *Sig.* da tabela *Multiple Comparisons* com o **Tukey HSD**."
       }
      ]
     },
     {
      "k": "ch",
      "id": "s23",
      "label": "Grupo 2 × grupo 3: há diferença?",
      "o": [
       "V",
       "F"
      ],
      "a": 1,
      "traps": {
       "0": "p = 0,263 > 0,05 → **F** (sem diferença significativa)."
      }
     },
     {
      "k": "num",
      "id": "p23",
      "label": "Grupo 2 × grupo 3: valor de p",
      "a": 0.263215,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.073708,
        "tol": 0.0015,
        "m": "Este é o p **sem correção** (LSD ou um t entre os dois grupos). O Tukey ajusta o p para as múltiplas comparações; use a coluna *Sig.* da tabela *Multiple Comparisons* com o **Tukey HSD**."
       }
      ]
     },
     {
      "k": "ch",
      "id": "s14",
      "label": "Grupo 1 × grupo 4: há diferença?",
      "o": [
       "V",
       "F"
      ],
      "a": 0,
      "traps": {
       "1": "p < 0,001 < 0,05 → **V** (diferença significativa)."
      }
     },
     {
      "k": "num",
      "id": "p14",
      "label": "Grupo 1 × grupo 4: valor de p",
      "a": 0.000384,
      "tol": 0.0015,
      "traps": [],
      "lt": true
     },
     {
      "k": "ch",
      "id": "s24",
      "label": "Grupo 2 × grupo 4: há diferença?",
      "o": [
       "V",
       "F"
      ],
      "a": 0,
      "traps": {
       "1": "p = 0,005 < 0,05 → **V** (diferença significativa)."
      }
     },
     {
      "k": "num",
      "id": "p24",
      "label": "Grupo 2 × grupo 4: valor de p",
      "a": 0.005187,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.001031,
        "tol": 0.0015,
        "m": "Este é o p **sem correção** (LSD ou um t entre os dois grupos). O Tukey ajusta o p para as múltiplas comparações; use a coluna *Sig.* da tabela *Multiple Comparisons* com o **Tukey HSD**."
       }
      ]
     }
    ],
    "grid": 2,
    "theory": [
     "Os testes **post-hoc** (*a posteriori*) comparam os grupos dois a dois, **corrigindo o p** para o número de comparações, de modo que o erro tipo I global fique em 5%.",
     "Depois da ANOVA, o **Tukey HSD** é o padrão quando as variâncias são homogêneas. Depois do Kruskal-Wallis, o SPSS faz o **teste de Dunn com correção de Bonferroni** (menu *Nonparametric Tests › Independent Samples*, opção *All pairwise*); use a coluna **Adj. Sig.**",
     "O post-hoc só faz sentido quando o teste global (questão 12) é significativo. Pode acontecer de o teste global ser significativo e só um ou dois pares diferirem."
    ],
    "spss": {
     "menu": "Analyze › Compare Means › One-Way ANOVA… → *Post Hoc…* → marque **Tukey** → Continue → OK",
     "syntax": "ONEWAY gasto_normal BY grupoanos\n  /POSTHOC=TUKEY ALPHA(0.05)."
    },
    "out": "Multiple Comparisons (Tukey HSD, gasto_normal)\n-------------------------------------\n(I)  (J)  Mean Difference (I-J)  Sig.\n-------------------------------------\n1      2                -1.5760  .493\n1      3                -3.5610  .021\n1      4                -5.8600  .000\n2      3                -1.9850  .263\n2      4                -4.2840  .005\n3      4                -2.2990  .192\n-------------------------------------",
    "sol": "1 × 3: p = 0,021 → V · 2 × 3: p = 0,263 → F · 1 × 4: p < 0,001 → V · 2 × 4: p = 0,005 → V."
   }
  ]
 },
 {
  "id": "s4",
  "title": "Sapatilhas com placa de carbono nos 5 km",
  "tema": "Desempenho esportivo",
  "n": 24,
  "file": "simulado4_placa_carbono",
  "story": [
   "Uma loja de material de corrida quer saber se vale a pena apostar nas **sapatilhas com placa de carbono**. Vinte e quatro corredores amadores de um clube de corrida fizeram uma prova de **5 km** duas vezes, com uma semana de intervalo: uma vez com as sapatilhas de placa de carbono e outra com as suas sapatilhas habituais. O tempo foi registrado em **minutos**.",
   "Registraram-se ainda o sexo (1 = masculino, 2 = feminino), o **terreno habitual de treino** (1 = estrada, 2 = trilho) e os quilômetros corridos por semana. Segundo o clube, o tempo médio dos seus corredores nos 5 km é de **25 minutos**."
  ],
  "vars": [
   {
    "name": "id",
    "label": "Identificação do participante",
    "type": "Nominal",
    "values": ""
   },
   {
    "name": "sexo",
    "label": "Sexo do corredor",
    "type": "Nominal",
    "values": "1 = Masculino, 2 = Feminino"
   },
   {
    "name": "terreno",
    "label": "Terreno habitual de treino",
    "type": "Nominal",
    "values": "1 = Estrada, 2 = Trilho"
   },
   {
    "name": "tempo_carbono",
    "label": "Tempo nos 5 km (min) com placa de carbono",
    "type": "Escala",
    "values": "min"
   },
   {
    "name": "tempo_habitual",
    "label": "Tempo nos 5 km (min) com a sapatilha habitual",
    "type": "Escala",
    "values": "min"
   },
   {
    "name": "km_semana",
    "label": "Quilômetros corridos por semana",
    "type": "Escala",
    "values": ""
   }
  ],
  "questions": [
   {
    "q": "Qual a porcentagem de indivíduos do sexo masculino e do sexo feminino nesta amostra?",
    "fields": [
     {
      "k": "num",
      "id": "m",
      "label": "Masculino",
      "a": 41.7,
      "tol": 0.06,
      "traps": [
       {
        "v": 10.0,
        "tol": 0.06,
        "m": "Você digitou a **frequência absoluta** (contagem de casos). A questão pede a porcentagem: use a coluna *Percent* (ou *Valid Percent*) da tabela de frequências."
       },
       {
        "v": 58.333333,
        "tol": 0.06,
        "m": "Você trocou os sexos: este é o valor do sexo **feminino**. Confira os rótulos (1 = Masculino, 2 = Feminino) em *Variable View › Values*."
       }
      ],
      "unit": "%"
     },
     {
      "k": "num",
      "id": "f",
      "label": "Feminino",
      "a": 58.3,
      "tol": 0.06,
      "traps": [
       {
        "v": 14.0,
        "tol": 0.06,
        "m": "Você digitou a **frequência absoluta**. Use a coluna *Percent*."
       },
       {
        "v": 41.666667,
        "tol": 0.06,
        "m": "Você trocou os sexos: este é o valor do sexo **masculino**."
       }
      ],
      "unit": "%"
     }
    ],
    "theory": [
     "Para uma variável **nominal** (como sexo), a descrição adequada é a **distribuição de frequências**: quantos casos há em cada categoria (frequência absoluta) e qual a porcentagem do total (frequência relativa). Média e desvio-padrão não fazem sentido para códigos 1 e 2: são rótulos, não quantidades.",
     "A porcentagem é $\\% = \\dfrac{n_{categoria}}{N} \\times 100$. No SPSS, *Percent* usa todos os casos e *Valid Percent* exclui os valores omissos; como esta base não tem omissos, as duas colunas coincidem."
    ],
    "spss": {
     "menu": "Analyze › Descriptive Statistics › Frequencies… → coloque `sexo` em *Variable(s)* → OK",
     "syntax": "FREQUENCIES VARIABLES=sexo\n  /ORDER=ANALYSIS."
    },
    "out": "Sexo do corredor\n-----------------------------------------------------------------------\n                  Frequency  Percent  Valid Percent  Cumulative Percent\n-----------------------------------------------------------------------\nValid  Masculino         10     41.7           41.7                41.7\n       Feminino          14     58.3           58.3               100.0\n       Total             24    100.0          100.0                    \n-----------------------------------------------------------------------",
    "sol": "Há 10 homens e 14 mulheres em 24 casos: 10/24 × 100 = **41,7%** masculino e 14/24 × 100 = **58,3%** feminino."
   },
   {
    "q": "Qual a porcentagem de corredores que treinam habitualmente em estrada?",
    "fields": [
     {
      "k": "num",
      "id": "p",
      "label": "Porcentagem",
      "a": 50.0,
      "tol": 0.06,
      "traps": [
       {
        "v": 12.0,
        "tol": 0.06,
        "m": "Você digitou a **contagem**, não a porcentagem."
       }
      ],
      "unit": "%"
     }
    ],
    "theory": [
     "Mesmo raciocínio da questão anterior: variável nominal → tabela de frequências. O cuidado aqui é **ler a categoria certa**: confira em *Variable View › Values* qual código corresponde a cada rótulo. Se ativar *View › Value Labels*, a *Data View* mostra os rótulos no lugar dos números."
    ],
    "spss": {
     "menu": "Analyze › Descriptive Statistics › Frequencies… → `terreno` → OK",
     "syntax": "FREQUENCIES VARIABLES=terreno\n  /ORDER=ANALYSIS."
    },
    "out": "Terreno habitual de treino\n-------------------------------------------------\n                Frequency  Percent  Valid Percent\n-------------------------------------------------\nValid  Estrada         12     50.0           50.0\n       Trilho          12     50.0           50.0\n       Total           24    100.0          100.0\n-------------------------------------------------",
    "sol": "12 de 24 casos na categoria **Estrada** → 12/24 × 100 = **50,0%**."
   },
   {
    "q": "O tempo médio nos 5 km **com placa de carbono** é diferente da média do clube (25 minutos)?",
    "fields": [
     {
      "k": "ch",
      "id": "yn",
      "label": "Resposta",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 1,
      "traps": {
       "0": "O p (0,612) é maior que 0,05: não se rejeita $H_0$. Não há evidência de diferença, portanto **Não**."
      }
     },
     {
      "k": "num",
      "id": "t",
      "label": "Valor de t",
      "a": 0.515,
      "tol": 0.01,
      "traps": [
       {
        "v": -0.514737,
        "tol": 0.01,
        "m": "O sinal está trocado. No teste t de uma amostra, $t = (\\bar{x} - \\mu_0)/EP$: é negativo quando a média amostral é menor que o valor de teste."
       },
       {
        "v": 0.330417,
        "tol": 0.01,
        "m": "Este é o *Mean Difference* ($\\bar{x} - \\mu_0$), não o t. O t divide essa diferença pelo erro-padrão."
       }
      ]
     },
     {
      "k": "num",
      "id": "p",
      "label": "Valor de p (adequado à pergunta)",
      "a": 0.611648,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.305824,
        "tol": 0.0015,
        "m": "Você usou o p **unilateral** (*One-Sided p*). A pergunta é se a média é **diferente** (sem direção): a hipótese é bilateral e o p certo é o *Two-Sided p*."
       }
      ]
     }
    ],
    "theory": [
     "Comparar a média de **uma amostra** com um **valor de referência conhecido** (aqui, 25,0 min, vindo de um estudo anterior) é o caso do **teste t de uma amostra** (*One-Sample T Test*). Não se trata de dois grupos medidos neste estudo: o valor de referência é um número fixo.",
     "Hipóteses: $H_0: \\mu = 25,0$ e $H_1: \\mu \\neq 25,0$. A estatística é $t = \\dfrac{\\bar{x} - \\mu_0}{s/\\sqrt{n}}$, com $n - 1$ graus de liberdade.",
     "**Unilateral ou bilateral?** Se a pergunta tem direção (\"mais rápido\", \"gasta mais\", \"menos eficiente\"), o teste é unilateral. O SPSS 27+ mostra *One-Sided p* e *Two-Sided p*. Atenção: o *One-Sided p* do SPSS é sempre metade do bilateral, **calculado na direção em que a média caiu**. Se a média caiu do lado oposto ao da sua hipótese, o p correto é $1 - p_{bilateral}/2$. Em versões antigas, que só mostram *Sig. (2-tailed)*, divida por 2 quando a direção bater.",
     "Pressuposto: normalidade da variável, ou amostra grande o suficiente para o Teorema do Limite Central. Com $n \\approx 20$ e assimetria moderada o t ainda é razoavelmente robusto; a alternativa não paramétrica é o teste de Wilcoxon de uma amostra."
    ],
    "spss": {
     "menu": "Analyze › Compare Means › One-Sample T Test… → `tempo_carbono` em *Test Variable(s)* → *Test Value* = 25 → OK",
     "syntax": "T-TEST\n  /TESTVAL=25\n  /VARIABLES=tempo_carbono\n  /CRITERIA=CI(.95)."
    },
    "out": "One-Sample Statistics\n-----------------------------------------------------------\n                N     Mean  Std. Deviation  Std. Error Mean\n-----------------------------------------------------------\ntempo_carbono  24  25.3304          3.1447           0.6419\n-----------------------------------------------------------\n\nOne-Sample Test (Test Value = 25)\n-------------------------------------------------------------------\n                   t  df  One-Sided p  Two-Sided p  Mean Difference\n-------------------------------------------------------------------\ntempo_carbono  0.515  23         .306         .612           0.3304\n-------------------------------------------------------------------",
    "sol": "Média = 25,33 min (DP = 3,145), $t(23) = 0,515$, p bilateral = 0,612. Hipótese bilateral: p = 0,612. Como p > 0,05, a resposta é **Não**."
   },
   {
    "q": "Qual o valor da média e do desvio-padrão de **tempo nos 5 km (min) com a sapatilha habitual**?",
    "fields": [
     {
      "k": "num",
      "id": "m",
      "label": "Média",
      "a": 26.168,
      "tol": 0.01,
      "traps": [
       {
        "v": 25.330417,
        "tol": 0.01,
        "m": "Este é o valor da outra variável (`tempo_carbono`, com placa de carbono). A questão pede `tempo_habitual` (com a sapatilha habitual)."
       },
       {
        "v": 25.96,
        "tol": 0.01,
        "m": "Esta é a **mediana**, não a média."
       }
      ],
      "unit": "min"
     },
     {
      "k": "num",
      "id": "dp",
      "label": "Desvio-padrão",
      "a": 3.059,
      "tol": 0.01,
      "traps": [
       {
        "v": 0.624395,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão da média** (*Std. Error*), não o desvio-padrão. O EP = DP/√n mede a incerteza da média; o DP mede a dispersão dos dados."
       },
       {
        "v": 9.356854,
        "tol": 0.01,
        "m": "Você digitou a **variância**. O desvio-padrão é a raiz quadrada dela."
       },
       {
        "v": 3.14472,
        "tol": 0.01,
        "m": "Este é o DP da outra variável (`tempo_carbono`)."
       },
       {
        "v": 2.994493,
        "tol": 0.01,
        "m": "Você calculou o DP dividindo por $n$ (populacional). O SPSS, e a estatística inferencial, usam $n - 1$."
       }
      ],
      "unit": "min"
     }
    ],
    "theory": [
     "Para uma variável **quantitativa** (escala), a descrição básica é uma medida de tendência central (média) e uma de dispersão (desvio-padrão).",
     "$\\bar{x} = \\dfrac{\\sum x_i}{n}$ e $s = \\sqrt{\\dfrac{\\sum (x_i - \\bar{x})^2}{n - 1}}$. Divide-se por $n - 1$ porque a amostra estima a variância populacional e já \"gastou\" um grau de liberdade ao estimar a média (Módulo 1).",
     "Não confunda o **desvio-padrão** (dispersão dos dados) com o **erro-padrão da média** ($EP = s/\\sqrt{n}$, a precisão da média), que aparece logo ao lado na saída do *Explore*."
    ],
    "spss": {
     "menu": "Analyze › Descriptive Statistics › Descriptives… → `tempo_habitual` → OK (ou *Explore*, que mostra mais estatísticas)",
     "syntax": "DESCRIPTIVES VARIABLES=tempo_habitual\n  /STATISTICS=MEAN STDDEV MIN MAX."
    },
    "out": "Descriptive Statistics\n-----------------------------------------------------------------\n                     N  Minimum  Maximum     Mean  Std. Deviation\n-----------------------------------------------------------------\ntempo_habitual      24    22.01    33.22  26.1675          3.0589\nValid N (listwise)  24                                           \n-----------------------------------------------------------------",
    "sol": "Média = **26,17 min** e desvio-padrão = **3,059 min**."
   },
   {
    "q": "Existe diferença entre os sexos no **tempo nos 5 km (min) com placa de carbono**?",
    "fields": [
     {
      "k": "num",
      "id": "lev",
      "label": "p do teste de Levene",
      "a": 0.018721,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.001804,
        "tol": 0.0015,
        "m": "Este é o p do **teste t**, não o do Levene. O Levene vem nas primeiras colunas da tabela (*F* e *Sig.*)."
       },
       {
        "v": 6.44394,
        "tol": 0.0015,
        "m": "Este é o **F** do Levene; o campo pede o p (*Sig.*)."
       }
      ]
     },
     {
      "k": "ch",
      "id": "row",
      "label": "Linha da tabela a usar",
      "o": [
       "Equal variances assumed (t de Student)",
       "Equal variances not assumed (t de Welch)"
      ],
      "a": 1,
      "traps": {
       "0": "O Levene deu p < 0,05: as variâncias **não** são homogêneas, então use a linha *Equal variances not assumed* (Welch)."
      }
     },
     {
      "k": "num",
      "id": "p",
      "label": "p do teste t",
      "a": 0.000789,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.018721,
        "tol": 0.0015,
        "m": "Este é o p do **Levene** (que testa variâncias, não médias). O p do teste t está em *Two-Sided p* / *Sig. (2-tailed)*."
       }
      ],
      "lt": true
     },
     {
      "k": "ch",
      "id": "yn",
      "label": "Existe diferença?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 0,
      "traps": {
       "1": "O p do teste t (< 0,001) é menor que 0,05: rejeita-se $H_0$ de médias iguais → **Sim**."
      }
     }
    ],
    "theory": [
     "Dois **grupos independentes** (homens e mulheres são pessoas diferentes) e uma variável quantitativa → **teste t para amostras independentes**. $H_0: \\mu_M = \\mu_F$.",
     "O SPSS faz antes o **teste de Levene**, cuja $H_0$ é *variâncias iguais*. Se p do Levene > 0,05, use a linha *Equal variances assumed* (t de Student, com variância combinada). Se p < 0,05, use *Equal variances not assumed* (t de Welch, que corrige os graus de liberdade).",
     "Erro frequente: tomar o p do Levene como resposta. O Levene responde se as **variâncias** diferem; a pergunta é sobre as **médias**.",
     "Pressuposto adicional: normalidade em cada grupo. Se a variável fosse muito assimétrica, com grupos pequenos, a alternativa seria o **Mann-Whitney** (*Nonparametric Tests › Legacy Dialogs › 2 Independent Samples*)."
    ],
    "spss": {
     "menu": "Analyze › Compare Means › Independent-Samples T Test… → `tempo_carbono` em *Test Variable(s)*, `sexo` em *Grouping Variable* → *Define Groups*: 1 e 2 → OK",
     "syntax": "T-TEST GROUPS=sexo(1 2)\n  /VARIABLES=tempo_carbono\n  /CRITERIA=CI(.95)."
    },
    "out": "Group Statistics\n--------------------------------------\nsexo        N     Mean  Std. Deviation\n--------------------------------------\nMasculino  10  23.1330          1.1743\nFeminino   14  26.9000          3.1897\n--------------------------------------\n\nIndependent Samples Test (tempo_carbono)\n------------------------------------------------------------------------------------\n                             Levene F  Sig.       t      df  Two-Sided p  Mean Diff.\n------------------------------------------------------------------------------------\nEqual variances assumed         6.444  .019  -3.548      22         .002     -3.7670\nEqual variances not assumed                  -4.051  17.492         .001     -3.7670\n------------------------------------------------------------------------------------",
    "sol": "Levene: F = 6,444, p = 0,019 → variâncias diferentes, linha de **Welch**. Teste t: **p < 0,001** → **existe** diferença entre os sexos."
   },
   {
    "q": "Qual a média e o desvio-padrão de **tempo nos 5 km (min) com a sapatilha habitual**, para o sexo masculino e para o feminino?",
    "fields": [
     {
      "k": "num",
      "id": "mm",
      "label": "Masculino: média",
      "a": 24.412,
      "tol": 0.01,
      "traps": [
       {
        "v": 27.421429,
        "tol": 0.01,
        "m": "Este é o valor do sexo **feminino**."
       },
       {
        "v": 23.133,
        "tol": 0.01,
        "m": "Este é o valor de `tempo_carbono`; a questão pede `tempo_habitual`."
       }
      ],
      "unit": "min"
     },
     {
      "k": "num",
      "id": "dm",
      "label": "Masculino: desvio-padrão",
      "a": 1.967,
      "tol": 0.01,
      "traps": [
       {
        "v": 0.622007,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão**, não o DP."
       },
       {
        "v": 3.132421,
        "tol": 0.01,
        "m": "Este é o DP do sexo **feminino**."
       },
       {
        "v": 1.174347,
        "tol": 0.01,
        "m": "Este é o DP de `tempo_carbono`."
       }
      ],
      "unit": "min"
     },
     {
      "k": "num",
      "id": "mf",
      "label": "Feminino: média",
      "a": 27.421,
      "tol": 0.01,
      "traps": [
       {
        "v": 24.412,
        "tol": 0.01,
        "m": "Este é o valor do sexo **masculino**."
       },
       {
        "v": 26.9,
        "tol": 0.01,
        "m": "Este é o valor de `tempo_carbono`."
       }
      ],
      "unit": "min"
     },
     {
      "k": "num",
      "id": "df",
      "label": "Feminino: desvio-padrão",
      "a": 3.132,
      "tol": 0.01,
      "traps": [
       {
        "v": 0.837175,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão**, não o DP."
       },
       {
        "v": 1.966959,
        "tol": 0.01,
        "m": "Este é o DP do sexo **masculino**."
       },
       {
        "v": 3.189702,
        "tol": 0.01,
        "m": "Este é o DP de `tempo_carbono`."
       }
      ],
      "unit": "min"
     }
    ],
    "theory": [
     "Descritivas **por grupo**: a mesma média e o mesmo DP da questão 4, mas calculados separadamente para cada categoria de outra variável. É o que se reporta sempre que se comparam grupos (e é a tabela *Group Statistics* do teste t).",
     "Há três caminhos no SPSS: *Compare Means › Means* (o mais direto), *Explore* com `sexo` em *Factor List*, ou *Data › Split File* seguido de *Descriptives*. Se usar *Split File*, lembre-se de **desligá-lo** depois (*Analyze all cases*), senão todas as análises seguintes sairão divididas por sexo."
    ],
    "spss": {
     "menu": "Analyze › Compare Means › Means… → `tempo_habitual` em *Dependent List*, `sexo` em *Independent List* → OK",
     "syntax": "MEANS TABLES=tempo_habitual BY sexo\n  /CELLS=MEAN COUNT STDDEV."
    },
    "out": "Report (tempo_habitual)\n--------------------------------------\nsexo          Mean   N  Std. Deviation\n--------------------------------------\nMasculino  24.4120  10          1.9670\nFeminino   27.4214  14          3.1324\nTotal      26.1675  24          3.0589\n--------------------------------------",
    "sol": "Masculino: média **24,41**, DP **1,967**. Feminino: média **27,42**, DP **3,132** (min)."
   },
   {
    "q": "A distribuição de **tempo nos 5 km (min) com placa de carbono** segue uma distribuição normal?",
    "fields": [
     {
      "k": "ch",
      "id": "yn",
      "label": "Existe normalidade?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 0,
      "traps": {
       "1": "No Shapiro-Wilk, $H_0$ é *os dados vêm de uma distribuição normal*. p = 0,093 > 0,05: não se rejeita a normalidade → **Sim**."
      }
     },
     {
      "k": "num",
      "id": "w",
      "label": "Estatística (W de Shapiro-Wilk)",
      "a": 0.929,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.136014,
        "tol": 0.0015,
        "m": "Esta é a estatística do **Kolmogorov-Smirnov** (primeiras colunas da tabela). Com n < 50 usa-se a coluna **Shapiro-Wilk**."
       },
       {
        "v": 0.955466,
        "tol": 0.0015,
        "m": "Este é o W de `tempo_habitual`; a questão pede `tempo_carbono`."
       }
      ]
     },
     {
      "k": "num",
      "id": "p",
      "label": "Valor de p",
      "a": 0.093472,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.35424,
        "tol": 0.0015,
        "m": "Este é o p de `tempo_habitual`; a questão pede `tempo_carbono`."
       }
      ]
     }
    ],
    "theory": [
     "O teste de **Shapiro-Wilk** verifica se a amostra é compatível com uma população normal. $H_0$: a distribuição é normal; $H_1$: não é. Ao contrário da maioria dos testes, aqui **queremos não rejeitar** $H_0$ (p > 0,05) para poder usar testes paramétricos.",
     "O SPSS mostra dois testes na tabela *Tests of Normality*: Kolmogorov-Smirnov (com correção de Lilliefors) e Shapiro-Wilk. Para amostras pequenas (n < 50) o **Shapiro-Wilk** é o recomendado, por ter mais poder.",
     "O W varia entre 0 e 1: quanto mais perto de 1, mais os dados ordenados se alinham com o que se esperaria de uma normal. Complemente sempre com o **Q-Q plot** (*Normal Q-Q Plot*, gerado pela opção *Normality plots with tests*): pontos longe da reta indicam afastamento da normalidade."
    ],
    "spss": {
     "menu": "Analyze › Descriptive Statistics › Explore… → `tempo_carbono` em *Dependent List* → *Plots…* → marque **Normality plots with tests** → Continue → OK",
     "syntax": "EXAMINE VARIABLES=tempo_carbono\n  /PLOT BOXPLOT NPPLOT\n  /STATISTICS DESCRIPTIVES\n  /NOTOTAL."
    },
    "out": "Tests of Normality\n---------------------------------------------------------------\n               K-S Statistic  df  Sig.  S-W Statistic  df  Sig.\n---------------------------------------------------------------\ntempo_carbono          0.136  24   ...          0.929  24  .093\n---------------------------------------------------------------\na. Lilliefors Significance Correction",
    "sol": "Shapiro-Wilk: **W = 0,929**, **p = 0,093** → não se rejeita $H_0$: a distribuição pode ser considerada **normal**."
   },
   {
    "q": "Faça um teste para avaliar a associação entre **km por semana** e **tempo nos 5 km (min) com placa de carbono**. Escolha a estatística mais adequada.",
    "fields": [
     {
      "k": "ch",
      "id": "test",
      "label": "Teste escolhido",
      "o": [
       "Correlação de Pearson",
       "Correlação de Spearman"
      ],
      "a": 0,
      "traps": {
       "1": "`tempo_carbono` (p = 0,093) e `km_semana` (p = 0,227) têm distribuição compatível com a normal no Shapiro-Wilk, então o coeficiente de **Pearson** é adequado."
      }
     },
     {
      "k": "num",
      "id": "r",
      "label": "Valor da correlação",
      "a": -0.554,
      "tol": 0.005,
      "traps": [
       {
        "v": -0.59256,
        "tol": 0.005,
        "m": "Este é o coeficiente do **outro** teste. `tempo_carbono` (p = 0,093) e `km_semana` (p = 0,227) têm distribuição compatível com a normal no Shapiro-Wilk, então o coeficiente de **Pearson** é adequado."
       },
       {
        "v": 0.307416,
        "tol": 0.005,
        "m": "Você digitou o $r^2$ (coeficiente de determinação). A questão pede o próprio coeficiente de correlação."
       },
       {
        "v": 0.554451,
        "tol": 0.005,
        "m": "O sinal está trocado. Confira o sentido da relação no diagrama de dispersão."
       }
      ]
     },
     {
      "k": "num",
      "id": "p",
      "label": "Valor de p",
      "a": 0.004929,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.00228,
        "tol": 0.0015,
        "m": "Este é o p do **outro** coeficiente."
       }
      ]
     }
    ],
    "theory": [
     "**Pearson** ($r$) mede associação **linear** entre duas variáveis quantitativas; pressupõe normalidade (bivariada) e é sensível a valores extremos. **Spearman** ($\\rho$) é a correlação de Pearson aplicada aos **postos**: mede associação **monotônica** e não exige normalidade.",
     "Regra prática da disciplina: verifique a normalidade das duas variáveis (Shapiro-Wilk). Se ambas forem normais, use Pearson; se pelo menos uma não for, use Spearman.",
     "Interpretação: o sinal dá o sentido (positivo: as duas crescem juntas; negativo: uma cresce enquanto a outra diminui) e o módulo dá a força (regra de bolso: < 0,3 fraca, 0,3 a 0,7 moderada, > 0,7 forte). $H_0$ do teste: $\\rho = 0$ na população.",
     "Correlação não é causalidade. Antes de tudo, olhe o diagrama de dispersão (*Graphs › Legacy Dialogs › Scatter/Dot*)."
    ],
    "spss": {
     "menu": "Analyze › Correlate › Bivariate… → `km_semana` e `tempo_carbono` em *Variables* → marque **Pearson** → OK. (Verifique a normalidade das duas antes, em *Explore*.)",
     "syntax": "EXAMINE VARIABLES=km_semana tempo_carbono\n  /PLOT NPPLOT\n  /NOTOTAL.\n\nCORRELATIONS\n  /VARIABLES=km_semana tempo_carbono\n  /PRINT=TWOTAIL NOSIG."
    },
    "out": "Tests of Normality (Shapiro-Wilk)\n----------------------------------\n               Statistic  df  Sig.\n----------------------------------\nkm_semana          0.946  24  .227\ntempo_carbono      0.929  24  .093\n----------------------------------\n\nCorrelations\n---------------------------------------------\n                                tempo_carbono\n---------------------------------------------\nkm_semana  Pearson Correlation          -.554\n               Sig. (2-tailed)           .005\n                             N             24\n---------------------------------------------",
    "sol": "`tempo_carbono` (p = 0,093) e `km_semana` (p = 0,227) têm distribuição compatível com a normal no Shapiro-Wilk, então o coeficiente de **Pearson** é adequado. Resultado: **r = −0,554**, **p = 0,005**: associação moderada negativa e significativa entre km por semana e tempo nos 5 km (min) com placa de carbono. (Para comparação, o outro coeficiente daria −0,593.)"
   },
   {
    "q": "Existe diferença entre os tempos nos 5 km com a placa de carbono e com a sapatilha habitual?",
    "fields": [
     {
      "k": "ch",
      "id": "test",
      "label": "Teste escolhido",
      "o": [
       "t para amostras emparelhadas",
       "Wilcoxon",
       "t para amostras independentes",
       "Mann-Whitney"
      ],
      "a": 1,
      "traps": {
       "2": "As duas medidas são das **mesmas pessoas** (cada participante foi medido nas duas condições), então as amostras são **emparelhadas**, não independentes.",
       "3": "O Mann-Whitney é para grupos **independentes**. Aqui as mesmas pessoas foram medidas duas vezes: amostras emparelhadas.",
       "0": "As diferenças (tempo_carbono − tempo_habitual) **não** seguem a normal (Shapiro-Wilk p < 0,001), então o adequado é o não paramétrico, **Wilcoxon**."
      }
     },
     {
      "k": "ch",
      "id": "yn",
      "label": "Existe diferença?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 0,
      "traps": {
       "1": "O p (< 0,001) é menor que 0,05 → **Sim**."
      }
     },
     {
      "k": "num",
      "id": "p",
      "label": "Valor de p",
      "a": 1.8e-05,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.35479,
        "tol": 0.0015,
        "m": "Este é o p de um t para amostras **independentes**, que ignora o emparelhamento."
       }
      ],
      "lt": true
     },
     {
      "k": "num",
      "id": "ma",
      "label": "Média com placa de carbono",
      "a": 25.33,
      "tol": 0.01,
      "traps": [
       {
        "v": 26.1675,
        "tol": 0.01,
        "m": "Você trocou as condições."
       }
      ],
      "unit": "min"
     },
     {
      "k": "num",
      "id": "mb",
      "label": "Média com a sapatilha habitual",
      "a": 26.168,
      "tol": 0.01,
      "traps": [
       {
        "v": 25.330417,
        "tol": 0.01,
        "m": "Você trocou as condições."
       }
      ],
      "unit": "min"
     }
    ],
    "theory": [
     "Cada participante foi medido **nas duas condições**: as observações estão emparelhadas. O teste analisa a **diferença** dentro de cada pessoa, o que remove a variação entre pessoas (atletas mais rápidos são rápidos nas duas condições) e dá muito mais poder do que comparar dois grupos independentes.",
     "O pressuposto do **t emparelhado** é a normalidade das **diferenças** (não de cada variável separadamente). Crie a variável diferença em *Transform › Compute Variable* e aplique o Shapiro-Wilk a ela. Se não for normal, use o **Wilcoxon** (postos sinalizados).",
     "$t = \\dfrac{\\bar{d}}{s_d/\\sqrt{n}}$, com $n - 1$ graus de liberdade, onde $d_i$ é a diferença de cada participante. O Wilcoxon ordena os $|d_i|$, soma os postos das diferenças positivas e das negativas e compara com o esperado sob $H_0$ (aproximação normal, Z)."
    ],
    "spss": {
     "menu": "Transform › Compute Variable… (dif = tempo_carbono − tempo_habitual) → Explore com *Normality plots with tests*. Depois: Analyze › Nonparametric Tests › Legacy Dialogs › 2 Related Samples… → par `tempo_carbono` / `tempo_habitual` → marque **Wilcoxon** → OK",
     "syntax": "COMPUTE dif=tempo_carbono-tempo_habitual.\nEXECUTE.\nEXAMINE VARIABLES=dif\n  /PLOT NPPLOT\n  /NOTOTAL.\n\nNPAR TESTS\n  /WILCOXON=tempo_carbono WITH tempo_habitual (PAIRED)\n  /STATISTICS DESCRIPTIVES."
    },
    "out": "Tests of Normality (dif)\n-------------------------------------------------\n     K-S Statistic  Sig.  S-W Statistic  df  Sig.\n-------------------------------------------------\ndif          0.243   ...          0.615  24  .000\n-------------------------------------------------\n\nPaired Samples Statistics\n-------------------------------------------\n                   Mean   N  Std. Deviation\n-------------------------------------------\ntempo_carbono   25.3304  24          3.1447\ntempo_habitual  26.1675  24          3.0589\n-------------------------------------------\n\nTest Statistics (Wilcoxon)\n------------------------------------------------------\n                        tempo_habitual - tempo_carbono\n------------------------------------------------------\nZ                                               -4.286\nAsymp. Sig. (2-tailed)                            .000\n------------------------------------------------------",
    "sol": "As medidas são emparelhadas. Shapiro-Wilk das diferenças: p < 0,001 → não normal → **Wilcoxon**: Z = −4,286, **p < 0,001**. Médias: 25,33 min (com placa de carbono) e 26,17 min (com a sapatilha habitual). Há diferença significativa."
   },
   {
    "q": "Crie uma nova variável (**grupokm**) com base em `km_semana`. Atribua os valores 1, 2, 3 e 4, respectivamente, a: até 20 km; 21 a 35 km; 36 a 50 km; 51 km ou mais. Qual o tamanho, a média e o desvio-padrão de `km_semana` em cada grupo criado?",
    "fields": [
     {
      "k": "num",
      "id": "n1",
      "label": "Grupo 1: n",
      "a": 6.0,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "m1",
      "label": "Grupo 1: média",
      "a": 14.333,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "s1",
      "label": "Grupo 1: DP",
      "a": 3.011,
      "tol": 0.01,
      "traps": [
       {
        "v": 1.229273,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão**, não o DP."
       }
      ]
     },
     {
      "k": "num",
      "id": "n2",
      "label": "Grupo 2: n",
      "a": 6.0,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "m2",
      "label": "Grupo 2: média",
      "a": 27.5,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "s2",
      "label": "Grupo 2: DP",
      "a": 4.889,
      "tol": 0.01,
      "traps": [
       {
        "v": 1.995829,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão**, não o DP."
       }
      ]
     },
     {
      "k": "num",
      "id": "n3",
      "label": "Grupo 3: n",
      "a": 6.0,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "m3",
      "label": "Grupo 3: média",
      "a": 41.0,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "s3",
      "label": "Grupo 3: DP",
      "a": 4.98,
      "tol": 0.01,
      "traps": [
       {
        "v": 2.03306,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão**, não o DP."
       }
      ]
     },
     {
      "k": "num",
      "id": "n4",
      "label": "Grupo 4: n",
      "a": 6.0,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "m4",
      "label": "Grupo 4: média",
      "a": 56.0,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "s4",
      "label": "Grupo 4: DP",
      "a": 4.733,
      "tol": 0.01,
      "traps": [
       {
        "v": 1.932184,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão**, não o DP."
       }
      ]
     }
    ],
    "grid": 3,
    "theory": [
     "**Recodificar** transforma uma variável quantitativa em categorias (classes). Use sempre *Recode into Different Variables*, para não destruir a variável original.",
     "Cuidado com os limites das classes: cada valor tem de cair em **uma e só uma** classe. Com valores inteiros, \"21 a 35 km\" corresponde a `21 THRU 35=2`. Use `LOWEST` para a primeira classe e `HIGHEST` para a última.",
     "Depois de recodificar, dê rótulos aos códigos (*Variable View › Values*) e mude a medida da nova variável para **Nominal** ou **Ordinal**: alguns procedimentos (como o Kruskal-Wallis pelo menu *Independent Samples*) exigem isso.",
     "Confira sempre o resultado: o tamanho de cada grupo (n) mostra se a recodificação ficou certa. Se algum n não bater, revise os limites (o caso mais comum é um valor de fronteira cair na classe errada ou ficar *System Missing*)."
    ],
    "spss": {
     "menu": "Transform › Recode into Different Variables… → `km_semana` → *Output Variable*: `grupokm` → Change → *Old and New Values…*: Range, LOWEST through 20 → 1; Range 21 through 35 → 2; Range 36 through 50 → 3; Range, 51 through HIGHEST → 4 → Continue → OK. Depois: Analyze › Compare Means › Means… (`km_semana` BY `grupokm`)",
     "syntax": "RECODE km_semana (LOWEST THRU 20=1) (21 THRU 35=2) (36 THRU 50=3) (51 THRU HIGHEST=4) INTO grupokm.\nVARIABLE LABELS grupokm 'Volume semanal de treino'.\nVALUE LABELS grupokm 1 'até 20 km' 2 '21 a 35 km' 3 '36 a 50 km' 4 '51 km ou mais'.\nVARIABLE LEVEL grupokm (ORDINAL).\nEXECUTE.\n\nMEANS TABLES=km_semana BY grupokm\n  /CELLS=MEAN COUNT STDDEV."
    },
    "out": "Report (km_semana)\n--------------------------------------------\ngrupokm             Mean   N  Std. Deviation\n--------------------------------------------\n1 até 20 km      14.3333   6          3.0111\n2 21 a 35 km     27.5000   6          4.8888\n3 36 a 50 km     41.0000   6          4.9800\n4 51 km ou mais  56.0000   6          4.7329\nTotal            34.7083  24         16.3667\n--------------------------------------------",
    "sol": "Grupo 1: n = 6, média = 14,33, DP = 3,011 · Grupo 2: n = 6, média = 27,50, DP = 4,889 · Grupo 3: n = 6, média = 41,00, DP = 4,980 · Grupo 4: n = 6, média = 56,00, DP = 4,733."
   },
   {
    "q": "Verifique se a nova variável (**grupokm**) cumpre os pressupostos necessários para efetuar uma ANOVA de `tempo_habitual`.",
    "fields": [
     {
      "k": "ch",
      "id": "norm",
      "label": "Normalidade em todos os grupos?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 1,
      "traps": {
       "0": "Basta **um** grupo violar a normalidade: o grupo 4 tem Shapiro-Wilk p < 0,05 → **Não**."
      }
     },
     {
      "k": "num",
      "id": "p1",
      "label": "Grupo 1: p do Shapiro-Wilk",
      "a": 0.966904,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.98334,
        "tol": 0.0015,
        "m": "Este é o **W** (estatística), não o p (*Sig.*)."
       }
      ]
     },
     {
      "k": "num",
      "id": "p2",
      "label": "Grupo 2: p do Shapiro-Wilk",
      "a": 0.422892,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.907926,
        "tol": 0.0015,
        "m": "Este é o **W** (estatística), não o p (*Sig.*)."
       }
      ]
     },
     {
      "k": "num",
      "id": "p3",
      "label": "Grupo 3: p do Shapiro-Wilk",
      "a": 0.424399,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.908159,
        "tol": 0.0015,
        "m": "Este é o **W** (estatística), não o p (*Sig.*)."
       }
      ]
     },
     {
      "k": "num",
      "id": "p4",
      "label": "Grupo 4: p do Shapiro-Wilk",
      "a": 0.010425,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.721878,
        "tol": 0.0015,
        "m": "Este é o **W** (estatística), não o p (*Sig.*)."
       }
      ]
     },
     {
      "k": "ch",
      "id": "hom",
      "label": "Homogeneidade das variâncias?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 0,
      "traps": {
       "1": "Levene p = 0,378 > 0,05 → não se rejeita a igualdade das variâncias → **Sim**."
      }
     },
     {
      "k": "num",
      "id": "levF",
      "label": "Estatística de Levene",
      "a": 1.086,
      "tol": 0.01,
      "traps": [
       {
        "v": 0.194808,
        "tol": 0.01,
        "m": "Este é o Levene **baseado na mediana** (*Based on Median*). Use a primeira linha, *Based on Mean*."
       }
      ]
     },
     {
      "k": "num",
      "id": "levp",
      "label": "p do Levene",
      "a": 0.377791,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.89869,
        "tol": 0.0015,
        "m": "Este é o p do Levene **baseado na mediana**. Use a linha *Based on Mean*."
       }
      ]
     },
     {
      "k": "ch",
      "id": "ok",
      "label": "Poderia efetuar a ANOVA?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 1,
      "traps": {
       "0": "A ANOVA exige **os dois** pressupostos. Como a normalidade não se verifica, a resposta é **Não**: use a alternativa não paramétrica (Kruskal-Wallis)."
      }
     }
    ],
    "grid": 1,
    "theory": [
     "A **ANOVA one-way** compara as médias de 3 ou mais grupos independentes. Pressupostos: (1) observações independentes; (2) **normalidade em cada grupo** (ou dos resíduos); (3) **homogeneidade das variâncias** (homocedasticidade).",
     "**Normalidade**: Shapiro-Wilk **por grupo** (em *Explore*, coloque a variável de grupo em *Factor List*). Um único grupo com p < 0,05 já compromete o pressuposto. Com grupos tão pequenos (4 a 6 casos) o teste tem pouco poder, por isso olhe também os Q-Q plots e os boxplots.",
     "**Homogeneidade**: teste de **Levene**, $H_0$: as variâncias são iguais em todos os grupos. No SPSS 27+ ele aparece em quatro linhas; use a primeira, *Based on Mean*.",
     "Se só a homogeneidade falhar (dados normais), a alternativa mais adequada é a **ANOVA de Welch** (*Options › Welch*), com post-hoc de Games-Howell. Se a normalidade falhar com grupos pequenos, use o **Kruskal-Wallis**."
    ],
    "spss": {
     "menu": "Analyze › Descriptive Statistics › Explore… → `tempo_habitual` em *Dependent List*, `grupokm` em *Factor List* → *Plots*: Normality plots with tests → OK. Depois: Analyze › Compare Means › One-Way ANOVA… → *Options*: **Homogeneity of variance test**",
     "syntax": "EXAMINE VARIABLES=tempo_habitual BY grupokm\n  /PLOT BOXPLOT NPPLOT\n  /NOTOTAL.\n\nONEWAY tempo_habitual BY grupokm\n  /STATISTICS DESCRIPTIVES HOMOGENEITY."
    },
    "out": "Tests of Normality (tempo_habitual, Shapiro-Wilk)\n----------------------------\ngrupokm  Statistic  df  Sig.\n----------------------------\n1            0.983   6  .967\n2            0.908   6  .423\n3            0.908   6  .424\n4            0.722   6  .010\n----------------------------\n\nTests of Homogeneity of Variances\n-------------------------------------------------\n                 Levene Statistic  df1  df2  Sig.\n-------------------------------------------------\nBased on Mean               1.086    3   20  .378\nBased on Median             0.195    3   20  .899\n...                                              \n-------------------------------------------------",
    "sol": "Shapiro-Wilk por grupo: grupo 1: W = 0,983, p = 0,967; grupo 2: W = 0,908, p = 0,423; grupo 3: W = 0,908, p = 0,424; grupo 4: W = 0,722, p = 0,010. Levene (*Based on Mean*): 1,086, p = 0,378. Pressupostos **não** cumpridos → **não** se deve fazer a ANOVA; use o Kruskal-Wallis."
   },
   {
    "q": "O clube quer saber se, **com a sapatilha habitual**, os tempos diferem entre os grupos de volume semanal de treino. Escolha o teste adequado (com base na questão anterior).",
    "fields": [
     {
      "k": "ch",
      "id": "test",
      "label": "Teste escolhido",
      "o": [
       "ANOVA one-way",
       "Kruskal-Wallis"
      ],
      "a": 1,
      "traps": {
       "0": "Os pressupostos da ANOVA **não** foram cumpridos (questão 11), então use o **Kruskal-Wallis**."
      }
     },
     {
      "k": "num",
      "id": "stat",
      "label": "Estatística do teste (F ou H)",
      "a": 10.024,
      "tol": 0.01,
      "traps": [
       {
        "v": 4.984812,
        "tol": 0.01,
        "m": "Esta é a estatística do **outro** teste. Os pressupostos da ANOVA **não** foram cumpridos (questão 11), então use o **Kruskal-Wallis**."
       }
      ]
     },
     {
      "k": "num",
      "id": "p",
      "label": "Valor de p",
      "a": 0.01836,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.009628,
        "tol": 0.0015,
        "m": "Este é o p do **outro** teste. Os pressupostos da ANOVA **não** foram cumpridos (questão 11), então use o **Kruskal-Wallis**."
       },
       {
        "v": 0.377791,
        "tol": 0.0015,
        "m": "Este é o p do **Levene** (pressuposto), não do teste de comparação."
       }
      ]
     },
     {
      "k": "ch",
      "id": "yn",
      "label": "Existem diferenças entre os grupos?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 0,
      "traps": {
       "1": "p = 0,018 < 0,05 → rejeita-se $H_0$ de igualdade → **Sim**, pelo menos um grupo difere."
      }
     }
    ],
    "theory": [
     "**ANOVA one-way**: $H_0: \\mu_1 = \\mu_2 = \\mu_3 = \\mu_4$. $F = QM_{entre}/QM_{dentro}$, a razão entre a variação **entre** os grupos (sinal) e a variação **dentro** dos grupos (ruído). Sob $H_0$, $F \\approx 1$ (Módulo 8).",
     "**Kruskal-Wallis**: alternativa não paramétrica. Ordena todos os valores, calcula o posto médio de cada grupo e testa se as distribuições são iguais. A estatística H segue aproximadamente uma $\\chi^2$ com $k - 1$ graus de liberdade (Módulo 9).",
     "Um resultado significativo diz apenas que **pelo menos um** grupo difere de outro. Para saber quais, é preciso o post-hoc (próxima questão). Por que não vários testes t? Com 4 grupos há 6 pares, e o erro tipo I acumulado chegaria a cerca de 26%."
    ],
    "spss": {
     "menu": "Analyze › Nonparametric Tests › Legacy Dialogs › K Independent Samples… → `tempo_habitual` em *Test Variable List*, `grupokm` em *Grouping Variable* → *Define Range*: 1 a 4 → **Kruskal-Wallis H** → OK",
     "syntax": "NPAR TESTS\n  /K-W=tempo_habitual BY grupokm(1 4)."
    },
    "out": "Ranks\n---------------------\ngrupokm  N  Mean Rank\n---------------------\n1        6      19.50\n2        6      13.33\n3        6       9.83\n4        6       7.33\n---------------------\n\nTest Statistics (Kruskal-Wallis)\n--------------------------------\n                  tempo_habitual\n--------------------------------\nKruskal-Wallis H          10.024\ndf                             3\nAsymp. Sig.                 .018\n--------------------------------",
    "sol": "Kruskal-Wallis: $H(3) = 10,024$, **p = 0,018**. Há diferença entre pelo menos dois grupos."
   },
   {
    "q": "Em relação à questão anterior, faça as **comparações múltiplas** (par a par) adequadas ao teste escolhido e diga se, entre os grupos indicados, existem diferenças significativas (V ou F) e qual o valor de p.",
    "fields": [
     {
      "k": "ch",
      "id": "s13",
      "label": "Grupo 1 × grupo 3: há diferença?",
      "o": [
       "V",
       "F"
      ],
      "a": 1,
      "traps": {
       "0": "p = 0,107 > 0,05 → **F** (sem diferença significativa)."
      }
     },
     {
      "k": "num",
      "id": "p13",
      "label": "Grupo 1 × grupo 3: valor de p",
      "a": 0.107204,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.017867,
        "tol": 0.0015,
        "m": "Você usou a coluna **Sig.** (sem correção). Use **Adj. Sig.**, corrigida por Bonferroni para as 6 comparações."
       },
       {
        "v": 0.036817,
        "tol": 0.0015,
        "m": "Este é o p do **Tukey**, que pressupõe a ANOVA. Como os pressupostos falharam, o post-hoc adequado são as comparações par a par do Kruskal-Wallis (Dunn-Bonferroni)."
       }
      ]
     },
     {
      "k": "ch",
      "id": "s23",
      "label": "Grupo 2 × grupo 3: há diferença?",
      "o": [
       "V",
       "F"
      ],
      "a": 1,
      "traps": {
       "0": "p = 1,000 > 0,05 → **F** (sem diferença significativa)."
      }
     },
     {
      "k": "num",
      "id": "p23",
      "label": "Grupo 2 × grupo 3: valor de p",
      "a": 1.0,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.391164,
        "tol": 0.0015,
        "m": "Você usou a coluna **Sig.** (sem correção). Use **Adj. Sig.**, corrigida por Bonferroni para as 6 comparações."
       },
       {
        "v": 0.893906,
        "tol": 0.0015,
        "m": "Este é o p do **Tukey**, que pressupõe a ANOVA. Como os pressupostos falharam, o post-hoc adequado são as comparações par a par do Kruskal-Wallis (Dunn-Bonferroni)."
       }
      ]
     },
     {
      "k": "ch",
      "id": "s14",
      "label": "Grupo 1 × grupo 4: há diferença?",
      "o": [
       "V",
       "F"
      ],
      "a": 0,
      "traps": {
       "1": "p = 0,017 < 0,05 → **V** (diferença significativa)."
      }
     },
     {
      "k": "num",
      "id": "p14",
      "label": "Grupo 1 × grupo 4: valor de p",
      "a": 0.017246,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.002874,
        "tol": 0.0015,
        "m": "Você usou a coluna **Sig.** (sem correção). Use **Adj. Sig.**, corrigida por Bonferroni para as 6 comparações."
       },
       {
        "v": 0.008122,
        "tol": 0.0015,
        "m": "Este é o p do **Tukey**, que pressupõe a ANOVA. Como os pressupostos falharam, o post-hoc adequado são as comparações par a par do Kruskal-Wallis (Dunn-Bonferroni)."
       }
      ]
     },
     {
      "k": "ch",
      "id": "s24",
      "label": "Grupo 2 × grupo 4: há diferença?",
      "o": [
       "V",
       "F"
      ],
      "a": 1,
      "traps": {
       "0": "p = 0,849 > 0,05 → **F** (sem diferença significativa)."
      }
     },
     {
      "k": "num",
      "id": "p24",
      "label": "Grupo 2 × grupo 4: valor de p",
      "a": 0.849349,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.141558,
        "tol": 0.0015,
        "m": "Você usou a coluna **Sig.** (sem correção). Use **Adj. Sig.**, corrigida por Bonferroni para as 6 comparações."
       },
       {
        "v": 0.514046,
        "tol": 0.0015,
        "m": "Este é o p do **Tukey**, que pressupõe a ANOVA. Como os pressupostos falharam, o post-hoc adequado são as comparações par a par do Kruskal-Wallis (Dunn-Bonferroni)."
       }
      ]
     }
    ],
    "grid": 2,
    "theory": [
     "Os testes **post-hoc** (*a posteriori*) comparam os grupos dois a dois, **corrigindo o p** para o número de comparações, de modo que o erro tipo I global fique em 5%.",
     "Depois da ANOVA, o **Tukey HSD** é o padrão quando as variâncias são homogêneas. Depois do Kruskal-Wallis, o SPSS faz o **teste de Dunn com correção de Bonferroni** (menu *Nonparametric Tests › Independent Samples*, opção *All pairwise*); use a coluna **Adj. Sig.**",
     "O post-hoc só faz sentido quando o teste global (questão 12) é significativo. Pode acontecer de o teste global ser significativo e só um ou dois pares diferirem."
    ],
    "spss": {
     "menu": "Analyze › Nonparametric Tests › Independent Samples… → *Fields*: `tempo_habitual` em *Test Fields*, `grupokm` em *Groups* (tem de estar como Nominal/Ordinal) → *Settings*: Customize tests → **Kruskal-Wallis 1-way ANOVA**, *Multiple comparisons: All pairwise* → Run. Dê duplo clique na tabela de resultados e escolha *Pairwise Comparisons*.",
     "syntax": "NPTESTS\n  /INDEPENDENT TEST (tempo_habitual) GROUP (grupokm)\n    KRUSKAL_WALLIS(COMPARE=PAIRWISE)\n  /CRITERIA ALPHA=0.05 CILEVEL=95."
    },
    "out": "Pairwise Comparisons (tempo_habitual)\n-----------------------------------------------------------------------------------\nSample 1-Sample 2  Test Statistic  Std. Error  Std. Test Statistic  Sig.  Adj. Sig.\n-----------------------------------------------------------------------------------\n1-2                         6.167       4.082                1.511  .131       .785\n1-3                         9.667       4.082                2.368  .018       .107\n1-4                        12.167       4.082                2.981  .003       .017\n2-3                         3.500       4.082                0.858  .391      1.000\n2-4                         6.000       4.082                1.470  .142       .849\n3-4                         2.500       4.082                0.613  .540      1.000\n-----------------------------------------------------------------------------------\nSignificance values have been adjusted by the Bonferroni correction for multiple tests.",
    "sol": "1 × 3: p = 0,107 → F · 2 × 3: p = 1,000 → F · 1 × 4: p = 0,017 → V · 2 × 4: p = 0,849 → F."
   }
  ]
 },
 {
  "id": "s5",
  "title": "Realidade virtual e o tempo de reação dos guarda-redes",
  "tema": "Treino e tecnologia",
  "n": 22,
  "file": "simulado5_reacao_guarda_redes",
  "story": [
   "Uma empresa de tecnologia esportiva propõe um **aquecimento cognitivo com óculos de realidade virtual** para guarda-redes (goleiros). Vinte e dois guarda-redes de clubes de futebol e futsal fizeram um teste de **tempo de reação** (em milissegundos) em dois treinos: um com o aquecimento em realidade virtual e outro com o aquecimento tradicional.",
   "Registraram-se o sexo (1 = masculino, 2 = feminino), a **modalidade** (1 = futebol, 2 = futsal) e os anos de experiência como guarda-redes. Um estudo de referência indica que guarda-redes de nível semelhante têm tempo de reação médio de **250 ms**."
  ],
  "vars": [
   {
    "name": "id",
    "label": "Identificação do participante",
    "type": "Nominal",
    "values": ""
   },
   {
    "name": "sexo",
    "label": "Sexo do guarda-redes",
    "type": "Nominal",
    "values": "1 = Masculino, 2 = Feminino"
   },
   {
    "name": "modalidade",
    "label": "Modalidade",
    "type": "Nominal",
    "values": "1 = Futebol, 2 = Futsal"
   },
   {
    "name": "reacao_rv",
    "label": "Tempo de reação (ms) com aquecimento em realidade virtual",
    "type": "Escala",
    "values": "ms"
   },
   {
    "name": "reacao_trad",
    "label": "Tempo de reação (ms) com aquecimento tradicional",
    "type": "Escala",
    "values": "ms"
   },
   {
    "name": "anos_exp",
    "label": "Anos de experiência como guarda-redes",
    "type": "Escala",
    "values": ""
   }
  ],
  "questions": [
   {
    "q": "Qual a porcentagem de indivíduos do sexo masculino e do sexo feminino nesta amostra?",
    "fields": [
     {
      "k": "num",
      "id": "m",
      "label": "Masculino",
      "a": 54.5,
      "tol": 0.06,
      "traps": [
       {
        "v": 12.0,
        "tol": 0.06,
        "m": "Você digitou a **frequência absoluta** (contagem de casos). A questão pede a porcentagem: use a coluna *Percent* (ou *Valid Percent*) da tabela de frequências."
       },
       {
        "v": 45.454545,
        "tol": 0.06,
        "m": "Você trocou os sexos: este é o valor do sexo **feminino**. Confira os rótulos (1 = Masculino, 2 = Feminino) em *Variable View › Values*."
       }
      ],
      "unit": "%"
     },
     {
      "k": "num",
      "id": "f",
      "label": "Feminino",
      "a": 45.5,
      "tol": 0.06,
      "traps": [
       {
        "v": 10.0,
        "tol": 0.06,
        "m": "Você digitou a **frequência absoluta**. Use a coluna *Percent*."
       },
       {
        "v": 54.545455,
        "tol": 0.06,
        "m": "Você trocou os sexos: este é o valor do sexo **masculino**."
       }
      ],
      "unit": "%"
     }
    ],
    "theory": [
     "Para uma variável **nominal** (como sexo), a descrição adequada é a **distribuição de frequências**: quantos casos há em cada categoria (frequência absoluta) e qual a porcentagem do total (frequência relativa). Média e desvio-padrão não fazem sentido para códigos 1 e 2: são rótulos, não quantidades.",
     "A porcentagem é $\\% = \\dfrac{n_{categoria}}{N} \\times 100$. No SPSS, *Percent* usa todos os casos e *Valid Percent* exclui os valores omissos; como esta base não tem omissos, as duas colunas coincidem."
    ],
    "spss": {
     "menu": "Analyze › Descriptive Statistics › Frequencies… → coloque `sexo` em *Variable(s)* → OK",
     "syntax": "FREQUENCIES VARIABLES=sexo\n  /ORDER=ANALYSIS."
    },
    "out": "Sexo do guarda-redes\n-----------------------------------------------------------------------\n                  Frequency  Percent  Valid Percent  Cumulative Percent\n-----------------------------------------------------------------------\nValid  Masculino         12     54.5           54.5                54.5\n       Feminino          10     45.5           45.5               100.0\n       Total             22    100.0          100.0                    \n-----------------------------------------------------------------------",
    "sol": "Há 12 homens e 10 mulheres em 22 casos: 12/22 × 100 = **54,5%** masculino e 10/22 × 100 = **45,5%** feminino."
   },
   {
    "q": "Qual a porcentagem de guarda-redes de futsal?",
    "fields": [
     {
      "k": "num",
      "id": "p",
      "label": "Porcentagem",
      "a": 54.5,
      "tol": 0.06,
      "traps": [
       {
        "v": 12.0,
        "tol": 0.06,
        "m": "Você digitou a **contagem**, não a porcentagem."
       },
       {
        "v": 45.454545,
        "tol": 0.06,
        "m": "Este é o valor da outra categoria (**Futebol**). Confira os códigos: 1 = Futebol, 2 = Futsal."
       }
      ],
      "unit": "%"
     }
    ],
    "theory": [
     "Mesmo raciocínio da questão anterior: variável nominal → tabela de frequências. O cuidado aqui é **ler a categoria certa**: confira em *Variable View › Values* qual código corresponde a cada rótulo. Se ativar *View › Value Labels*, a *Data View* mostra os rótulos no lugar dos números."
    ],
    "spss": {
     "menu": "Analyze › Descriptive Statistics › Frequencies… → `modalidade` → OK",
     "syntax": "FREQUENCIES VARIABLES=modalidade\n  /ORDER=ANALYSIS."
    },
    "out": "Modalidade\n-------------------------------------------------\n                Frequency  Percent  Valid Percent\n-------------------------------------------------\nValid  Futebol         10     45.5           45.5\n       Futsal          12     54.5           54.5\n       Total           22    100.0          100.0\n-------------------------------------------------",
    "sol": "12 de 22 casos na categoria **Futsal** → 12/22 × 100 = **54,5%**."
   },
   {
    "q": "Com o aquecimento em realidade virtual, os guarda-redes são **mais rápidos** (menor tempo de reação) do que a referência de 250 ms?",
    "fields": [
     {
      "k": "ch",
      "id": "yn",
      "label": "Resposta",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 0,
      "traps": {
       "1": "O p da hipótese da pergunta (< 0,001) é menor que 0,05: rejeita-se $H_0$, ou seja, **Sim**."
      }
     },
     {
      "k": "num",
      "id": "t",
      "label": "Valor de t",
      "a": -5.412,
      "tol": 0.01,
      "traps": [
       {
        "v": 5.412359,
        "tol": 0.01,
        "m": "O sinal está trocado. No teste t de uma amostra, $t = (\\bar{x} - \\mu_0)/EP$: é negativo quando a média amostral é menor que o valor de teste."
       },
       {
        "v": -13.272727,
        "tol": 0.01,
        "m": "Este é o *Mean Difference* ($\\bar{x} - \\mu_0$), não o t. O t divide essa diferença pelo erro-padrão."
       }
      ]
     },
     {
      "k": "num",
      "id": "p",
      "label": "Valor de p (adequado à pergunta)",
      "a": 1.1e-05,
      "tol": 0.0015,
      "traps": [],
      "lt": true
     }
    ],
    "theory": [
     "Comparar a média de **uma amostra** com um **valor de referência conhecido** (aqui, 250,0 ms, vindo de um estudo anterior) é o caso do **teste t de uma amostra** (*One-Sample T Test*). Não se trata de dois grupos medidos neste estudo: o valor de referência é um número fixo.",
     "Hipóteses: $H_0: \\mu = 250,0$ e $H_1: \\mu < 250,0$. A estatística é $t = \\dfrac{\\bar{x} - \\mu_0}{s/\\sqrt{n}}$, com $n - 1$ graus de liberdade.",
     "**Unilateral ou bilateral?** Se a pergunta tem direção (\"mais rápido\", \"gasta mais\", \"menos eficiente\"), o teste é unilateral. O SPSS 27+ mostra *One-Sided p* e *Two-Sided p*. Atenção: o *One-Sided p* do SPSS é sempre metade do bilateral, **calculado na direção em que a média caiu**. Se a média caiu do lado oposto ao da sua hipótese, o p correto é $1 - p_{bilateral}/2$. Em versões antigas, que só mostram *Sig. (2-tailed)*, divida por 2 quando a direção bater.",
     "Pressuposto: normalidade da variável, ou amostra grande o suficiente para o Teorema do Limite Central. Com $n \\approx 20$ e assimetria moderada o t ainda é razoavelmente robusto; a alternativa não paramétrica é o teste de Wilcoxon de uma amostra."
    ],
    "spss": {
     "menu": "Analyze › Compare Means › One-Sample T Test… → `reacao_rv` em *Test Variable(s)* → *Test Value* = 250 → OK",
     "syntax": "T-TEST\n  /TESTVAL=250\n  /VARIABLES=reacao_rv\n  /CRITERIA=CI(.95)."
    },
    "out": "One-Sample Statistics\n--------------------------------------------------------\n            N      Mean  Std. Deviation  Std. Error Mean\n--------------------------------------------------------\nreacao_rv  22  236.7273         11.5023           2.4523\n--------------------------------------------------------\n\nOne-Sample Test (Test Value = 250)\n----------------------------------------------------------------\n                t  df  One-Sided p  Two-Sided p  Mean Difference\n----------------------------------------------------------------\nreacao_rv  -5.412  21         .000         .000         -13.2727\n----------------------------------------------------------------",
    "sol": "Média = 236,73 ms (DP = 11,502), $t(21) = −5,412$, p bilateral < 0,001. A média está do lado previsto por $H_1$, então p unilateral = (< 0,001)/2 **< 0,001**. Como p < 0,05, a resposta é **Sim**."
   },
   {
    "q": "Qual o valor da média e do desvio-padrão de **tempo de reação (ms) com aquecimento tradicional**?",
    "fields": [
     {
      "k": "num",
      "id": "m",
      "label": "Média",
      "a": 244.318,
      "tol": 0.01,
      "traps": [
       {
        "v": 236.727273,
        "tol": 0.01,
        "m": "Este é o valor da outra variável (`reacao_rv`, com realidade virtual). A questão pede `reacao_trad` (com aquecimento tradicional)."
       },
       {
        "v": 244.0,
        "tol": 0.01,
        "m": "Esta é a **mediana**, não a média."
       }
      ],
      "unit": "ms"
     },
     {
      "k": "num",
      "id": "dp",
      "label": "Desvio-padrão",
      "a": 12.718,
      "tol": 0.01,
      "traps": [
       {
        "v": 2.711517,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão da média** (*Std. Error*), não o desvio-padrão. O EP = DP/√n mede a incerteza da média; o DP mede a dispersão dos dados."
       },
       {
        "v": 161.751082,
        "tol": 0.01,
        "m": "Você digitou a **variância**. O desvio-padrão é a raiz quadrada dela."
       },
       {
        "v": 11.502305,
        "tol": 0.01,
        "m": "Este é o DP da outra variável (`reacao_rv`)."
       },
       {
        "v": 12.42573,
        "tol": 0.01,
        "m": "Você calculou o DP dividindo por $n$ (populacional). O SPSS, e a estatística inferencial, usam $n - 1$."
       }
      ],
      "unit": "ms"
     }
    ],
    "theory": [
     "Para uma variável **quantitativa** (escala), a descrição básica é uma medida de tendência central (média) e uma de dispersão (desvio-padrão).",
     "$\\bar{x} = \\dfrac{\\sum x_i}{n}$ e $s = \\sqrt{\\dfrac{\\sum (x_i - \\bar{x})^2}{n - 1}}$. Divide-se por $n - 1$ porque a amostra estima a variância populacional e já \"gastou\" um grau de liberdade ao estimar a média (Módulo 1).",
     "Não confunda o **desvio-padrão** (dispersão dos dados) com o **erro-padrão da média** ($EP = s/\\sqrt{n}$, a precisão da média), que aparece logo ao lado na saída do *Explore*."
    ],
    "spss": {
     "menu": "Analyze › Descriptive Statistics › Descriptives… → `reacao_trad` → OK (ou *Explore*, que mostra mais estatísticas)",
     "syntax": "DESCRIPTIVES VARIABLES=reacao_trad\n  /STATISTICS=MEAN STDDEV MIN MAX."
    },
    "out": "Descriptive Statistics\n------------------------------------------------------------------\n                     N  Minimum  Maximum      Mean  Std. Deviation\n------------------------------------------------------------------\nreacao_trad         22      227      276  244.3182         12.7181\nValid N (listwise)  22                                            \n------------------------------------------------------------------",
    "sol": "Média = **244,32 ms** e desvio-padrão = **12,718 ms**."
   },
   {
    "q": "Existe diferença entre os sexos no **tempo de reação (ms) com aquecimento em realidade virtual**?",
    "fields": [
     {
      "k": "num",
      "id": "lev",
      "label": "p do teste de Levene",
      "a": 0.209434,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.183144,
        "tol": 0.0015,
        "m": "Este é o p do **teste t**, não o do Levene. O Levene vem nas primeiras colunas da tabela (*F* e *Sig.*)."
       },
       {
        "v": 1.681907,
        "tol": 0.0015,
        "m": "Este é o **F** do Levene; o campo pede o p (*Sig.*)."
       }
      ]
     },
     {
      "k": "ch",
      "id": "row",
      "label": "Linha da tabela a usar",
      "o": [
       "Equal variances assumed (t de Student)",
       "Equal variances not assumed (t de Welch)"
      ],
      "a": 0,
      "traps": {
       "1": "O Levene deu p > 0,05: não há evidência de variâncias diferentes, então use a linha *Equal variances assumed*."
      }
     },
     {
      "k": "num",
      "id": "p",
      "label": "p do teste t",
      "a": 0.183144,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.174883,
        "tol": 0.0015,
        "m": "Você leu a **outra linha** da tabela. A escolha da linha depende do Levene: p do Levene > 0,05 → linha de cima (variâncias iguais)."
       },
       {
        "v": 0.209434,
        "tol": 0.0015,
        "m": "Este é o p do **Levene** (que testa variâncias, não médias). O p do teste t está em *Two-Sided p* / *Sig. (2-tailed)*."
       },
       {
        "v": 0.091572,
        "tol": 0.0015,
        "m": "Você usou o p unilateral. A pergunta (\"existe diferença?\") não tem direção: use o *Two-Sided p*."
       }
      ]
     },
     {
      "k": "ch",
      "id": "yn",
      "label": "Existe diferença?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 1,
      "traps": {
       "0": "O p do teste t (0,183) é maior que 0,05: não se rejeita $H_0$ → **Não** há evidência de diferença."
      }
     }
    ],
    "theory": [
     "Dois **grupos independentes** (homens e mulheres são pessoas diferentes) e uma variável quantitativa → **teste t para amostras independentes**. $H_0: \\mu_M = \\mu_F$.",
     "O SPSS faz antes o **teste de Levene**, cuja $H_0$ é *variâncias iguais*. Se p do Levene > 0,05, use a linha *Equal variances assumed* (t de Student, com variância combinada). Se p < 0,05, use *Equal variances not assumed* (t de Welch, que corrige os graus de liberdade).",
     "Erro frequente: tomar o p do Levene como resposta. O Levene responde se as **variâncias** diferem; a pergunta é sobre as **médias**.",
     "Pressuposto adicional: normalidade em cada grupo. Se a variável fosse muito assimétrica, com grupos pequenos, a alternativa seria o **Mann-Whitney** (*Nonparametric Tests › Legacy Dialogs › 2 Independent Samples*). Aqui, para conferência, o Mann-Whitney dá U = 39,0, p = 0,165."
    ],
    "spss": {
     "menu": "Analyze › Compare Means › Independent-Samples T Test… → `reacao_rv` em *Test Variable(s)*, `sexo` em *Grouping Variable* → *Define Groups*: 1 e 2 → OK",
     "syntax": "T-TEST GROUPS=sexo(1 2)\n  /VARIABLES=reacao_rv\n  /CRITERIA=CI(.95)."
    },
    "out": "Group Statistics\n---------------------------------------\nsexo        N      Mean  Std. Deviation\n---------------------------------------\nMasculino  12  239.7500         12.2558\nFeminino   10  233.1000          9.9158\n---------------------------------------\n\nIndependent Samples Test (reacao_rv)\n-----------------------------------------------------------------------------------\n                             Levene F  Sig.      t      df  Two-Sided p  Mean Diff.\n-----------------------------------------------------------------------------------\nEqual variances assumed         1.682  .209  1.379      20         .183      6.6500\nEqual variances not assumed                  1.407  19.992         .175      6.6500\n-----------------------------------------------------------------------------------",
    "sol": "Levene: F = 1,682, p = 0,209 → variâncias homogêneas, linha **Equal variances assumed**. Teste t: **p = 0,183** → **não** há diferença significativa entre os sexos."
   },
   {
    "q": "Qual a média e o desvio-padrão de **tempo de reação (ms) com aquecimento tradicional**, para o sexo masculino e para o feminino?",
    "fields": [
     {
      "k": "num",
      "id": "mm",
      "label": "Masculino: média",
      "a": 244.583,
      "tol": 0.01,
      "traps": [
       {
        "v": 244.0,
        "tol": 0.01,
        "m": "Este é o valor do sexo **feminino**."
       },
       {
        "v": 239.75,
        "tol": 0.01,
        "m": "Este é o valor de `reacao_rv`; a questão pede `reacao_trad`."
       }
      ],
      "unit": "ms"
     },
     {
      "k": "num",
      "id": "dm",
      "label": "Masculino: desvio-padrão",
      "a": 14.712,
      "tol": 0.01,
      "traps": [
       {
        "v": 4.247028,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão**, não o DP."
       },
       {
        "v": 10.614456,
        "tol": 0.01,
        "m": "Este é o DP do sexo **feminino**."
       },
       {
        "v": 12.255796,
        "tol": 0.01,
        "m": "Este é o DP de `reacao_rv`."
       }
      ],
      "unit": "ms"
     },
     {
      "k": "num",
      "id": "mf",
      "label": "Feminino: média",
      "a": 244.0,
      "tol": 0.01,
      "traps": [
       {
        "v": 244.583333,
        "tol": 0.01,
        "m": "Este é o valor do sexo **masculino**."
       },
       {
        "v": 233.1,
        "tol": 0.01,
        "m": "Este é o valor de `reacao_rv`."
       }
      ],
      "unit": "ms"
     },
     {
      "k": "num",
      "id": "df",
      "label": "Feminino: desvio-padrão",
      "a": 10.614,
      "tol": 0.01,
      "traps": [
       {
        "v": 3.356586,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão**, não o DP."
       },
       {
        "v": 14.712137,
        "tol": 0.01,
        "m": "Este é o DP do sexo **masculino**."
       },
       {
        "v": 9.915756,
        "tol": 0.01,
        "m": "Este é o DP de `reacao_rv`."
       }
      ],
      "unit": "ms"
     }
    ],
    "theory": [
     "Descritivas **por grupo**: a mesma média e o mesmo DP da questão 4, mas calculados separadamente para cada categoria de outra variável. É o que se reporta sempre que se comparam grupos (e é a tabela *Group Statistics* do teste t).",
     "Há três caminhos no SPSS: *Compare Means › Means* (o mais direto), *Explore* com `sexo` em *Factor List*, ou *Data › Split File* seguido de *Descriptives*. Se usar *Split File*, lembre-se de **desligá-lo** depois (*Analyze all cases*), senão todas as análises seguintes sairão divididas por sexo."
    ],
    "spss": {
     "menu": "Analyze › Compare Means › Means… → `reacao_trad` em *Dependent List*, `sexo` em *Independent List* → OK",
     "syntax": "MEANS TABLES=reacao_trad BY sexo\n  /CELLS=MEAN COUNT STDDEV."
    },
    "out": "Report (reacao_trad)\n---------------------------------------\nsexo           Mean   N  Std. Deviation\n---------------------------------------\nMasculino  244.5833  12         14.7121\nFeminino   244.0000  10         10.6145\nTotal      244.3182  22         12.7181\n---------------------------------------",
    "sol": "Masculino: média **244,58**, DP **14,712**. Feminino: média **244,00**, DP **10,614** (ms)."
   },
   {
    "q": "A distribuição de **tempo de reação (ms) com aquecimento em realidade virtual** segue uma distribuição normal?",
    "fields": [
     {
      "k": "ch",
      "id": "yn",
      "label": "Existe normalidade?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 1,
      "traps": {
       "0": "No Shapiro-Wilk, $H_0$ é *os dados vêm de uma distribuição normal*. p = 0,019 < 0,05: rejeita-se a normalidade → **Não**. Cuidado com a inversão: aqui p pequeno é **mau sinal** para a normalidade."
      }
     },
     {
      "k": "num",
      "id": "w",
      "label": "Estatística (W de Shapiro-Wilk)",
      "a": 0.89,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.207026,
        "tol": 0.0015,
        "m": "Esta é a estatística do **Kolmogorov-Smirnov** (primeiras colunas da tabela). Com n < 50 usa-se a coluna **Shapiro-Wilk**."
       },
       {
        "v": 0.945791,
        "tol": 0.0015,
        "m": "Este é o W de `reacao_trad`; a questão pede `reacao_rv`."
       }
      ]
     },
     {
      "k": "num",
      "id": "p",
      "label": "Valor de p",
      "a": 0.018809,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.260041,
        "tol": 0.0015,
        "m": "Este é o p de `reacao_trad`; a questão pede `reacao_rv`."
       }
      ]
     }
    ],
    "theory": [
     "O teste de **Shapiro-Wilk** verifica se a amostra é compatível com uma população normal. $H_0$: a distribuição é normal; $H_1$: não é. Ao contrário da maioria dos testes, aqui **queremos não rejeitar** $H_0$ (p > 0,05) para poder usar testes paramétricos.",
     "O SPSS mostra dois testes na tabela *Tests of Normality*: Kolmogorov-Smirnov (com correção de Lilliefors) e Shapiro-Wilk. Para amostras pequenas (n < 50) o **Shapiro-Wilk** é o recomendado, por ter mais poder.",
     "O W varia entre 0 e 1: quanto mais perto de 1, mais os dados ordenados se alinham com o que se esperaria de uma normal. Complemente sempre com o **Q-Q plot** (*Normal Q-Q Plot*, gerado pela opção *Normality plots with tests*): pontos longe da reta indicam afastamento da normalidade."
    ],
    "spss": {
     "menu": "Analyze › Descriptive Statistics › Explore… → `reacao_rv` em *Dependent List* → *Plots…* → marque **Normality plots with tests** → Continue → OK",
     "syntax": "EXAMINE VARIABLES=reacao_rv\n  /PLOT BOXPLOT NPPLOT\n  /STATISTICS DESCRIPTIVES\n  /NOTOTAL."
    },
    "out": "Tests of Normality\n-----------------------------------------------------------\n           K-S Statistic  df  Sig.  S-W Statistic  df  Sig.\n-----------------------------------------------------------\nreacao_rv          0.207  22   ...          0.890  22  .019\n-----------------------------------------------------------\na. Lilliefors Significance Correction",
    "sol": "Shapiro-Wilk: **W = 0,890**, **p = 0,019** → rejeita-se $H_0$: a distribuição **não é normal**."
   },
   {
    "q": "Faça um teste para avaliar a associação entre **anos de experiência** e **tempo de reação (ms) com aquecimento em realidade virtual**. Escolha a estatística mais adequada.",
    "fields": [
     {
      "k": "ch",
      "id": "test",
      "label": "Teste escolhido",
      "o": [
       "Correlação de Pearson",
       "Correlação de Spearman"
      ],
      "a": 1,
      "traps": {
       "0": "`reacao_rv` **não** tem distribuição normal (Shapiro-Wilk p = 0,019, questão 7), então o coeficiente adequado é o de **Spearman**, baseado em postos."
      }
     },
     {
      "k": "num",
      "id": "r",
      "label": "Valor da correlação",
      "a": -0.524,
      "tol": 0.005,
      "traps": [
       {
        "v": -0.509993,
        "tol": 0.005,
        "m": "Este é o coeficiente do **outro** teste. `reacao_rv` **não** tem distribuição normal (Shapiro-Wilk p = 0,019, questão 7), então o coeficiente adequado é o de **Spearman**, baseado em postos."
       },
       {
        "v": 0.274058,
        "tol": 0.005,
        "m": "Você digitou o $r^2$ (coeficiente de determinação). A questão pede o próprio coeficiente de correlação."
       },
       {
        "v": 0.523505,
        "tol": 0.005,
        "m": "O sinal está trocado. Confira o sentido da relação no diagrama de dispersão."
       }
      ]
     },
     {
      "k": "num",
      "id": "p",
      "label": "Valor de p",
      "a": 0.012406,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.015317,
        "tol": 0.0015,
        "m": "Este é o p do **outro** coeficiente."
       }
      ]
     }
    ],
    "theory": [
     "**Pearson** ($r$) mede associação **linear** entre duas variáveis quantitativas; pressupõe normalidade (bivariada) e é sensível a valores extremos. **Spearman** ($\\rho$) é a correlação de Pearson aplicada aos **postos**: mede associação **monotônica** e não exige normalidade.",
     "Regra prática da disciplina: verifique a normalidade das duas variáveis (Shapiro-Wilk). Se ambas forem normais, use Pearson; se pelo menos uma não for, use Spearman.",
     "Interpretação: o sinal dá o sentido (positivo: as duas crescem juntas; negativo: uma cresce enquanto a outra diminui) e o módulo dá a força (regra de bolso: < 0,3 fraca, 0,3 a 0,7 moderada, > 0,7 forte). $H_0$ do teste: $\\rho = 0$ na população.",
     "Correlação não é causalidade. Antes de tudo, olhe o diagrama de dispersão (*Graphs › Legacy Dialogs › Scatter/Dot*)."
    ],
    "spss": {
     "menu": "Analyze › Correlate › Bivariate… → `anos_exp` e `reacao_rv` em *Variables* → marque **Spearman** → OK. (Verifique a normalidade das duas antes, em *Explore*.)",
     "syntax": "EXAMINE VARIABLES=anos_exp reacao_rv\n  /PLOT NPPLOT\n  /NOTOTAL.\n\nNONPAR CORR\n  /VARIABLES=anos_exp reacao_rv\n  /PRINT=SPEARMAN TWOTAIL NOSIG."
    },
    "out": "Tests of Normality (Shapiro-Wilk)\n------------------------------\n           Statistic  df  Sig.\n------------------------------\nanos_exp       0.924  22  .092\nreacao_rv      0.890  22  .019\n------------------------------\n\nCorrelations (Spearman's rho)\n--------------------------------------------\n                                   reacao_rv\n--------------------------------------------\nanos_exp  Correlation Coefficient      -.524\n                  Sig. (2-tailed)       .012\n                                N         22\n--------------------------------------------",
    "sol": "`reacao_rv` **não** tem distribuição normal (Shapiro-Wilk p = 0,019, questão 7), então o coeficiente adequado é o de **Spearman**, baseado em postos. Resultado: **ρ = −0,524**, **p = 0,012**: associação moderada negativa e significativa entre anos de experiência e tempo de reação (ms) com aquecimento em realidade virtual. (Para comparação, o outro coeficiente daria −0,510.)"
   },
   {
    "q": "Existe diferença entre o tempo de reação médio com realidade virtual e com aquecimento tradicional?",
    "fields": [
     {
      "k": "ch",
      "id": "test",
      "label": "Teste escolhido",
      "o": [
       "t para amostras emparelhadas",
       "Wilcoxon",
       "t para amostras independentes",
       "Mann-Whitney"
      ],
      "a": 0,
      "traps": {
       "2": "As duas medidas são das **mesmas pessoas** (cada participante foi medido nas duas condições), então as amostras são **emparelhadas**, não independentes.",
       "3": "O Mann-Whitney é para grupos **independentes**. Aqui as mesmas pessoas foram medidas duas vezes: amostras emparelhadas.",
       "1": "As diferenças (reacao_rv − reacao_trad) seguem a normal (Shapiro-Wilk p = 0,789), então o teste paramétrico, **t emparelhado**, é o adequado."
      }
     },
     {
      "k": "ch",
      "id": "yn",
      "label": "Existe diferença?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 0,
      "traps": {
       "1": "O p (< 0,001) é menor que 0,05 → **Sim**."
      }
     },
     {
      "k": "num",
      "id": "p",
      "label": "Valor de p",
      "a": 4e-06,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.044023,
        "tol": 0.0015,
        "m": "Este é o p de um t para amostras **independentes**, que ignora o emparelhamento."
       },
       {
        "v": 0.78863,
        "tol": 0.0015,
        "m": "Este é o p do Shapiro-Wilk das diferenças (o pressuposto), não do teste de comparação."
       }
      ],
      "lt": true
     },
     {
      "k": "num",
      "id": "ma",
      "label": "Média com realidade virtual",
      "a": 236.727,
      "tol": 0.01,
      "traps": [
       {
        "v": 244.318182,
        "tol": 0.01,
        "m": "Você trocou as condições."
       }
      ],
      "unit": "ms"
     },
     {
      "k": "num",
      "id": "mb",
      "label": "Média com aquecimento tradicional",
      "a": 244.318,
      "tol": 0.01,
      "traps": [
       {
        "v": 236.727273,
        "tol": 0.01,
        "m": "Você trocou as condições."
       }
      ],
      "unit": "ms"
     }
    ],
    "theory": [
     "Cada participante foi medido **nas duas condições**: as observações estão emparelhadas. O teste analisa a **diferença** dentro de cada pessoa, o que remove a variação entre pessoas (atletas mais rápidos são rápidos nas duas condições) e dá muito mais poder do que comparar dois grupos independentes.",
     "O pressuposto do **t emparelhado** é a normalidade das **diferenças** (não de cada variável separadamente). Crie a variável diferença em *Transform › Compute Variable* e aplique o Shapiro-Wilk a ela. Se não for normal, use o **Wilcoxon** (postos sinalizados).",
     "$t = \\dfrac{\\bar{d}}{s_d/\\sqrt{n}}$, com $n - 1$ graus de liberdade, onde $d_i$ é a diferença de cada participante. O Wilcoxon ordena os $|d_i|$, soma os postos das diferenças positivas e das negativas e compara com o esperado sob $H_0$ (aproximação normal, Z)."
    ],
    "spss": {
     "menu": "Transform › Compute Variable… (dif = reacao_rv − reacao_trad) → Explore com *Normality plots with tests*. Depois: Analyze › Compare Means › Paired-Samples T Test… → par `reacao_rv` / `reacao_trad` → OK",
     "syntax": "COMPUTE dif=reacao_rv-reacao_trad.\nEXECUTE.\nEXAMINE VARIABLES=dif\n  /PLOT NPPLOT\n  /NOTOTAL.\n\nT-TEST PAIRS=reacao_rv WITH reacao_trad (PAIRED)\n  /CRITERIA=CI(.95)."
    },
    "out": "Tests of Normality (dif)\n-------------------------------------------------\n     K-S Statistic  Sig.  S-W Statistic  df  Sig.\n-------------------------------------------------\ndif          0.132   ...          0.973  22  .789\n-------------------------------------------------\n\nPaired Samples Statistics\n-----------------------------------------\n                 Mean   N  Std. Deviation\n-----------------------------------------\nreacao_rv    236.7273  22         11.5023\nreacao_trad  244.3182  22         12.7181\n-----------------------------------------\n\nPaired Samples Test\n-----------------------------------------------------------------------\n                         Mean (dif)  Std. Dev.       t  df  Two-Sided p\n-----------------------------------------------------------------------\nreacao_rv - reacao_trad     -7.5909     5.7376  -6.205  21         .000\n-----------------------------------------------------------------------",
    "sol": "As medidas são emparelhadas. Shapiro-Wilk das diferenças: p = 0,789 → normal → **t emparelhado**: $t(21) = −6,205$, **p < 0,001**. Médias: 236,73 ms (com realidade virtual) e 244,32 ms (com aquecimento tradicional). Há diferença significativa."
   },
   {
    "q": "Crie uma nova variável (**grupoexp**) com base em `anos_exp`. Atribua os valores 1, 2, 3 e 4, respectivamente, a: até 3 anos; 4 a 6 anos; 7 a 9 anos; 10 anos ou mais. Qual o tamanho, a média e o desvio-padrão de `anos_exp` em cada grupo criado?",
    "fields": [
     {
      "k": "num",
      "id": "n1",
      "label": "Grupo 1: n",
      "a": 5.0,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "m1",
      "label": "Grupo 1: média",
      "a": 1.4,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "s1",
      "label": "Grupo 1: DP",
      "a": 0.894,
      "tol": 0.01,
      "traps": [
       {
        "v": 0.4,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão**, não o DP."
       }
      ]
     },
     {
      "k": "num",
      "id": "n2",
      "label": "Grupo 2: n",
      "a": 6.0,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "m2",
      "label": "Grupo 2: média",
      "a": 5.333,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "s2",
      "label": "Grupo 2: DP",
      "a": 0.816,
      "tol": 0.01,
      "traps": [
       {
        "v": 0.333333,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão**, não o DP."
       }
      ]
     },
     {
      "k": "num",
      "id": "n3",
      "label": "Grupo 3: n",
      "a": 6.0,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "m3",
      "label": "Grupo 3: média",
      "a": 7.833,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "s3",
      "label": "Grupo 3: DP",
      "a": 0.983,
      "tol": 0.01,
      "traps": [
       {
        "v": 0.401386,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão**, não o DP."
       }
      ]
     },
     {
      "k": "num",
      "id": "n4",
      "label": "Grupo 4: n",
      "a": 5.0,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "m4",
      "label": "Grupo 4: média",
      "a": 13.4,
      "tol": 0.01,
      "traps": []
     },
     {
      "k": "num",
      "id": "s4",
      "label": "Grupo 4: DP",
      "a": 2.191,
      "tol": 0.01,
      "traps": [
       {
        "v": 0.979796,
        "tol": 0.01,
        "m": "Você digitou o **erro-padrão**, não o DP."
       }
      ]
     }
    ],
    "grid": 3,
    "theory": [
     "**Recodificar** transforma uma variável quantitativa em categorias (classes). Use sempre *Recode into Different Variables*, para não destruir a variável original.",
     "Cuidado com os limites das classes: cada valor tem de cair em **uma e só uma** classe. Com valores inteiros, \"4 a 6 anos\" corresponde a `4 THRU 6=2`. Use `LOWEST` para a primeira classe e `HIGHEST` para a última.",
     "Depois de recodificar, dê rótulos aos códigos (*Variable View › Values*) e mude a medida da nova variável para **Nominal** ou **Ordinal**: alguns procedimentos (como o Kruskal-Wallis pelo menu *Independent Samples*) exigem isso.",
     "Confira sempre o resultado: o tamanho de cada grupo (n) mostra se a recodificação ficou certa. Se algum n não bater, revise os limites (o caso mais comum é um valor de fronteira cair na classe errada ou ficar *System Missing*)."
    ],
    "spss": {
     "menu": "Transform › Recode into Different Variables… → `anos_exp` → *Output Variable*: `grupoexp` → Change → *Old and New Values…*: Range, LOWEST through 3 → 1; Range 4 through 6 → 2; Range 7 through 9 → 3; Range, 10 through HIGHEST → 4 → Continue → OK. Depois: Analyze › Compare Means › Means… (`anos_exp` BY `grupoexp`)",
     "syntax": "RECODE anos_exp (LOWEST THRU 3=1) (4 THRU 6=2) (7 THRU 9=3) (10 THRU HIGHEST=4) INTO grupoexp.\nVARIABLE LABELS grupoexp 'Experiência (grupos)'.\nVALUE LABELS grupoexp 1 'até 3 anos' 2 '4 a 6 anos' 3 '7 a 9 anos' 4 '10 anos ou mais'.\nVARIABLE LEVEL grupoexp (ORDINAL).\nEXECUTE.\n\nMEANS TABLES=anos_exp BY grupoexp\n  /CELLS=MEAN COUNT STDDEV."
    },
    "out": "Report (anos_exp)\n----------------------------------------------\ngrupoexp              Mean   N  Std. Deviation\n----------------------------------------------\n1 até 3 anos        1.4000   5          0.8944\n2 4 a 6 anos        5.3333   6          0.8165\n3 7 a 9 anos        7.8333   6          0.9832\n4 10 anos ou mais  13.4000   5          2.1909\nTotal               6.9545  22          4.4345\n----------------------------------------------",
    "sol": "Grupo 1: n = 5, média = 1,40, DP = 0,894 · Grupo 2: n = 6, média = 5,33, DP = 0,816 · Grupo 3: n = 6, média = 7,83, DP = 0,983 · Grupo 4: n = 5, média = 13,40, DP = 2,191."
   },
   {
    "q": "Verifique se a nova variável (**grupoexp**) cumpre os pressupostos necessários para efetuar uma ANOVA de `reacao_trad`.",
    "fields": [
     {
      "k": "ch",
      "id": "norm",
      "label": "Normalidade em todos os grupos?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 0,
      "traps": {
       "1": "Todos os grupos têm Shapiro-Wilk p > 0,05 → **Sim**."
      }
     },
     {
      "k": "num",
      "id": "p1",
      "label": "Grupo 1: p do Shapiro-Wilk",
      "a": 0.22564,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.85927,
        "tol": 0.0015,
        "m": "Este é o **W** (estatística), não o p (*Sig.*)."
       }
      ]
     },
     {
      "k": "num",
      "id": "p2",
      "label": "Grupo 2: p do Shapiro-Wilk",
      "a": 0.825319,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.960726,
        "tol": 0.0015,
        "m": "Este é o **W** (estatística), não o p (*Sig.*)."
       }
      ]
     },
     {
      "k": "num",
      "id": "p3",
      "label": "Grupo 3: p do Shapiro-Wilk",
      "a": 0.50165,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.919484,
        "tol": 0.0015,
        "m": "Este é o **W** (estatística), não o p (*Sig.*)."
       }
      ]
     },
     {
      "k": "num",
      "id": "p4",
      "label": "Grupo 4: p do Shapiro-Wilk",
      "a": 0.115693,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.81948,
        "tol": 0.0015,
        "m": "Este é o **W** (estatística), não o p (*Sig.*)."
       }
      ]
     },
     {
      "k": "ch",
      "id": "hom",
      "label": "Homogeneidade das variâncias?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 0,
      "traps": {
       "1": "Levene p = 0,263 > 0,05 → não se rejeita a igualdade das variâncias → **Sim**."
      }
     },
     {
      "k": "num",
      "id": "levF",
      "label": "Estatística de Levene",
      "a": 1.444,
      "tol": 0.01,
      "traps": [
       {
        "v": 1.108366,
        "tol": 0.01,
        "m": "Este é o Levene **baseado na mediana** (*Based on Median*). Use a primeira linha, *Based on Mean*."
       }
      ]
     },
     {
      "k": "num",
      "id": "levp",
      "label": "p do Levene",
      "a": 0.263197,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.371587,
        "tol": 0.0015,
        "m": "Este é o p do Levene **baseado na mediana**. Use a linha *Based on Mean*."
       }
      ]
     },
     {
      "k": "ch",
      "id": "ok",
      "label": "Poderia efetuar a ANOVA?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 0,
      "traps": {
       "1": "Normalidade em todos os grupos e variâncias homogêneas → os pressupostos estão cumpridos → **Sim**."
      }
     }
    ],
    "grid": 1,
    "theory": [
     "A **ANOVA one-way** compara as médias de 3 ou mais grupos independentes. Pressupostos: (1) observações independentes; (2) **normalidade em cada grupo** (ou dos resíduos); (3) **homogeneidade das variâncias** (homocedasticidade).",
     "**Normalidade**: Shapiro-Wilk **por grupo** (em *Explore*, coloque a variável de grupo em *Factor List*). Um único grupo com p < 0,05 já compromete o pressuposto. Com grupos tão pequenos (4 a 6 casos) o teste tem pouco poder, por isso olhe também os Q-Q plots e os boxplots.",
     "**Homogeneidade**: teste de **Levene**, $H_0$: as variâncias são iguais em todos os grupos. No SPSS 27+ ele aparece em quatro linhas; use a primeira, *Based on Mean*.",
     "Se só a homogeneidade falhar (dados normais), a alternativa mais adequada é a **ANOVA de Welch** (*Options › Welch*), com post-hoc de Games-Howell. Se a normalidade falhar com grupos pequenos, use o **Kruskal-Wallis**."
    ],
    "spss": {
     "menu": "Analyze › Descriptive Statistics › Explore… → `reacao_trad` em *Dependent List*, `grupoexp` em *Factor List* → *Plots*: Normality plots with tests → OK. Depois: Analyze › Compare Means › One-Way ANOVA… → *Options*: **Homogeneity of variance test**",
     "syntax": "EXAMINE VARIABLES=reacao_trad BY grupoexp\n  /PLOT BOXPLOT NPPLOT\n  /NOTOTAL.\n\nONEWAY reacao_trad BY grupoexp\n  /STATISTICS DESCRIPTIVES HOMOGENEITY."
    },
    "out": "Tests of Normality (reacao_trad, Shapiro-Wilk)\n-----------------------------\ngrupoexp  Statistic  df  Sig.\n-----------------------------\n1             0.859   5  .226\n2             0.961   6  .825\n3             0.919   6  .502\n4             0.819   5  .116\n-----------------------------\n\nTests of Homogeneity of Variances\n-------------------------------------------------\n                 Levene Statistic  df1  df2  Sig.\n-------------------------------------------------\nBased on Mean               1.444    3   18  .263\nBased on Median             1.108    3   18  .372\n...                                              \n-------------------------------------------------",
    "sol": "Shapiro-Wilk por grupo: grupo 1: W = 0,859, p = 0,226; grupo 2: W = 0,961, p = 0,825; grupo 3: W = 0,919, p = 0,502; grupo 4: W = 0,819, p = 0,116. Levene (*Based on Mean*): 1,444, p = 0,263. Pressupostos cumpridos → **pode** fazer a ANOVA."
   },
   {
    "q": "Os treinadores querem saber se, **com o aquecimento tradicional**, o tempo de reação difere entre os grupos de experiência. Escolha o teste adequado (com base na questão anterior).",
    "fields": [
     {
      "k": "ch",
      "id": "test",
      "label": "Teste escolhido",
      "o": [
       "ANOVA one-way",
       "Kruskal-Wallis"
      ],
      "a": 0,
      "traps": {
       "1": "Os pressupostos foram cumpridos (questão 11), então use a **ANOVA**, que tem mais poder do que o Kruskal-Wallis."
      }
     },
     {
      "k": "num",
      "id": "stat",
      "label": "Estatística do teste (F ou H)",
      "a": 0.967,
      "tol": 0.01,
      "traps": [
       {
        "v": 2.465675,
        "tol": 0.01,
        "m": "Esta é a estatística do **outro** teste. Os pressupostos foram cumpridos (questão 11), então use a **ANOVA**, que tem mais poder do que o Kruskal-Wallis."
       }
      ]
     },
     {
      "k": "num",
      "id": "p",
      "label": "Valor de p",
      "a": 0.429753,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.481526,
        "tol": 0.0015,
        "m": "Este é o p do **outro** teste. Os pressupostos foram cumpridos (questão 11), então use a **ANOVA**, que tem mais poder do que o Kruskal-Wallis."
       },
       {
        "v": 0.263197,
        "tol": 0.0015,
        "m": "Este é o p do **Levene** (pressuposto), não do teste de comparação."
       }
      ]
     },
     {
      "k": "ch",
      "id": "yn",
      "label": "Existem diferenças entre os grupos?",
      "o": [
       "Sim",
       "Não"
      ],
      "a": 1,
      "traps": {
       "0": "p = 0,430 > 0,05 → não se rejeita $H_0$ → **Não** há evidência de diferenças."
      }
     }
    ],
    "theory": [
     "**ANOVA one-way**: $H_0: \\mu_1 = \\mu_2 = \\mu_3 = \\mu_4$. $F = QM_{entre}/QM_{dentro}$, a razão entre a variação **entre** os grupos (sinal) e a variação **dentro** dos grupos (ruído). Sob $H_0$, $F \\approx 1$ (Módulo 8).",
     "**Kruskal-Wallis**: alternativa não paramétrica. Ordena todos os valores, calcula o posto médio de cada grupo e testa se as distribuições são iguais. A estatística H segue aproximadamente uma $\\chi^2$ com $k - 1$ graus de liberdade (Módulo 9).",
     "Um resultado significativo diz apenas que **pelo menos um** grupo difere de outro. Para saber quais, é preciso o post-hoc (próxima questão). Por que não vários testes t? Com 4 grupos há 6 pares, e o erro tipo I acumulado chegaria a cerca de 26%."
    ],
    "spss": {
     "menu": "Analyze › Compare Means › One-Way ANOVA… → `reacao_trad` em *Dependent List*, `grupoexp` em *Factor* → OK",
     "syntax": "ONEWAY reacao_trad BY grupoexp\n  /STATISTICS DESCRIPTIVES HOMOGENEITY."
    },
    "out": "ANOVA (reacao_trad)\n------------------------------------------------------------\n                Sum of Squares  df  Mean Square      F  Sig.\n------------------------------------------------------------\nBetween Groups         471.539   3      157.180  0.967  .430\nWithin Groups         2925.233  18      162.513             \nTotal                 3396.773  21                          \n------------------------------------------------------------",
    "sol": "ANOVA: $F(3, 18) = 0,967$, **p = 0,430**, $\\eta^2 = 0,14$. Não há diferença significativa entre os grupos."
   },
   {
    "q": "Em relação à questão anterior, aplique o teste *a posteriori* de **Tukey** e diga se, entre os grupos indicados, existem diferenças significativas (V ou F) e qual o valor de p.",
    "fields": [
     {
      "k": "ch",
      "id": "s13",
      "label": "Grupo 1 × grupo 3: há diferença?",
      "o": [
       "V",
       "F"
      ],
      "a": 1,
      "traps": {
       "0": "p = 0,848 > 0,05 → **F** (sem diferença significativa)."
      }
     },
     {
      "k": "num",
      "id": "p13",
      "label": "Grupo 1 × grupo 3: valor de p",
      "a": 0.848076,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.427504,
        "tol": 0.0015,
        "m": "Este é o p **sem correção** (LSD ou um t entre os dois grupos). O Tukey ajusta o p para as múltiplas comparações; use a coluna *Sig.* da tabela *Multiple Comparisons* com o **Tukey HSD**."
       }
      ]
     },
     {
      "k": "ch",
      "id": "s23",
      "label": "Grupo 2 × grupo 3: há diferença?",
      "o": [
       "V",
       "F"
      ],
      "a": 1,
      "traps": {
       "0": "p = 0,526 > 0,05 → **F** (sem diferença significativa)."
      }
     },
     {
      "k": "num",
      "id": "p23",
      "label": "Grupo 2 × grupo 3: valor de p",
      "a": 0.526277,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.184088,
        "tol": 0.0015,
        "m": "Este é o p **sem correção** (LSD ou um t entre os dois grupos). O Tukey ajusta o p para as múltiplas comparações; use a coluna *Sig.* da tabela *Multiple Comparisons* com o **Tukey HSD**."
       }
      ]
     },
     {
      "k": "ch",
      "id": "s14",
      "label": "Grupo 1 × grupo 4: há diferença?",
      "o": [
       "V",
       "F"
      ],
      "a": 1,
      "traps": {
       "0": "p = 0,809 > 0,05 → **F** (sem diferença significativa)."
      }
     },
     {
      "k": "num",
      "id": "p14",
      "label": "Grupo 1 × grupo 4: valor de p",
      "a": 0.808526,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.383633,
        "tol": 0.0015,
        "m": "Este é o p **sem correção** (LSD ou um t entre os dois grupos). O Tukey ajusta o p para as múltiplas comparações; use a coluna *Sig.* da tabela *Multiple Comparisons* com o **Tukey HSD**."
       }
      ]
     },
     {
      "k": "ch",
      "id": "s24",
      "label": "Grupo 2 × grupo 4: há diferença?",
      "o": [
       "V",
       "F"
      ],
      "a": 1,
      "traps": {
       "0": "p = 0,493 > 0,05 → **F** (sem diferença significativa)."
      }
     },
     {
      "k": "num",
      "id": "p24",
      "label": "Grupo 2 × grupo 4: valor de p",
      "a": 0.493248,
      "tol": 0.0015,
      "traps": [
       {
        "v": 0.167608,
        "tol": 0.0015,
        "m": "Este é o p **sem correção** (LSD ou um t entre os dois grupos). O Tukey ajusta o p para as múltiplas comparações; use a coluna *Sig.* da tabela *Multiple Comparisons* com o **Tukey HSD**."
       }
      ]
     }
    ],
    "grid": 2,
    "theory": [
     "Os testes **post-hoc** (*a posteriori*) comparam os grupos dois a dois, **corrigindo o p** para o número de comparações, de modo que o erro tipo I global fique em 5%.",
     "Depois da ANOVA, o **Tukey HSD** é o padrão quando as variâncias são homogêneas. Depois do Kruskal-Wallis, o SPSS faz o **teste de Dunn com correção de Bonferroni** (menu *Nonparametric Tests › Independent Samples*, opção *All pairwise*); use a coluna **Adj. Sig.**",
     "Atenção: aqui a ANOVA **não** foi significativa (questão 12). Nesse caso, o normal é **não** fazer post-hoc: não há diferença global para explicar. Os valores servem para confirmar que nenhum par difere."
    ],
    "spss": {
     "menu": "Analyze › Compare Means › One-Way ANOVA… → *Post Hoc…* → marque **Tukey** → Continue → OK",
     "syntax": "ONEWAY reacao_trad BY grupoexp\n  /POSTHOC=TUKEY ALPHA(0.05)."
    },
    "out": "Multiple Comparisons (Tukey HSD, reacao_trad)\n-------------------------------------\n(I)  (J)  Mean Difference (I-J)  Sig.\n-------------------------------------\n1      2                -3.9000  .957\n1      3                 6.2667  .848\n1      4                 7.2000  .809\n2      3                10.1667  .526\n2      4                11.1000  .493\n3      4                 0.9333  .999\n-------------------------------------",
    "sol": "1 × 3: p = 0,848 → F · 2 × 3: p = 0,526 → F · 1 × 4: p = 0,809 → F · 2 × 4: p = 0,493 → F."
   }
  ]
 }
];
