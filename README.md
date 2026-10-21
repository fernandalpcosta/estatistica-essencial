# Estatística Essencial

Site de estudo de estatística para pós-graduação. O objetivo é **entender** a estatística, não só aplicar testes. A trilha vai da variância até a ANOVA e suas alternativas, com visualizações interativas, exercícios com correção imediata e acompanhamento do progresso.

## Conteúdo

| # | Módulo | Destaques |
|---|---|---|
| 0 | Revisão | População × amostra, tipos de variável, média × mediana × moda |
| 1 | Variância a fundo | Por que o quadrado, por que n − 1, graus de liberdade, decomposição da SQ |
| 2 | Distribuições | Normal, escore z, t, χ², F, binomial, Poisson |
| 3 | Amostragem e TLC | Erro-padrão × desvio-padrão, Teorema do Limite Central, IC, bootstrap |
| 4 | Teste de hipóteses | H₀/H₁, p-valor, erros tipo I e II, poder, uni × bilateral, tamanho de efeito, comparações múltiplas |
| 5 | Pressupostos | Shapiro-Wilk, KS-Lilliefors, Anderson-Darling, Q-Q, Levene, Bartlett, transformações |
| 6 | Testes t | z × t, uma amostra, Student, Welch, pareado, d de Cohen, tamanho amostral |
| 7 | Não paramétricos | Postos, Mann-Whitney, Wilcoxon, teste do sinal |
| 8 | ANOVA | Tabela SQ/gl/QM/F, η² e ω², post-hoc (Tukey, Dunnett, Games-Howell…) |
| 9 | Parentes da ANOVA | Welch, Kruskal-Wallis + Dunn, medidas repetidas + esfericidade, Friedman, dois fatores, ANCOVA, permutação |
| 10 | Categóricas | Qui-quadrado (aderência e independência), Fisher, McNemar, V de Cramér, OR |
| 11 | Correlação e regressão | Covariância, Pearson, Spearman, mínimos quadrados, R², resíduos, ANOVA como modelo linear |
| 12 | Qual teste usar? | Fluxograma interativo, tabela-resumo, estudos de caso, como relatar |

Cada módulo tem três abas:

- **Conceito**: intuição, fórmulas com legenda, exemplos resolvidos, erros comuns e visualizações interativas (10 no total).
- **Na prática**: como fazer em **Python** (adicional) e no **SPSS** (extra), com menus e sintaxe.
- **Exercícios**: 168 questões conceituais, de cálculo (com tolerância numérica) e de interpretação de saídas.

Há também um **simulado geral** (25 questões sorteadas) e a página **Meu progresso**, com notas por módulo, histórico de tentativas, módulos a revisar e exportação/importação do progresso em JSON.

## Como usar

É um site estático (HTML, CSS e JavaScript puros, sem build).

- **GitHub Pages:** Settings → Pages → *Deploy from a branch* → `main` / `(root)`. O site fica em `https://<usuário>.github.io/estatistica-essencial/`.
- **Localmente:** `python3 -m http.server` na pasta do projeto e abra http://localhost:8000.

O progresso fica salvo no `localStorage` do navegador.

## Estrutura

```
index.html
css/style.css
js/stats.js          funções de distribuição (normal, t, χ², F) para as visualizações
js/viz.js            visualizações interativas (SVG)
js/app.js            rotas, renderização, exercícios e progresso
js/modules/mNN.js    conteúdo de cada módulo
vendor/katex/        KaTeX 0.16.11 (MIT) para renderizar as fórmulas
```

### Editar ou acrescentar conteúdo

Cada arquivo `js/modules/mNN.js` adiciona um objeto a `MODULES`. Blocos de conteúdo aceitam `{h}`, `{p}`, `{f, leg}` (fórmula LaTeX com legenda), `{list}`, `{ol}`, `{table}`, `{box, t, c}` (intuicao, atencao, dica, exemplo, erro) e `{viz}`. No texto, use `$...$` para matemática, `**negrito**`, `*itálico*` e crases para código.

Exercícios:

```js
{ t: "mc",  q: "Pergunta", o: ["certa", "errada"], a: 0, ex: "explicação" }
{ t: "tf",  q: "Afirmação", a: false }
{ t: "num", q: "Calcule…", a: 2.5, tol: 0.01, unit: "%" }
// qualquer tipo aceita out: "saída de software" para questões de interpretação
```

Para um módulo novo, crie o arquivo e acrescente o `<script>` correspondente em `index.html`.

## Verificação

Todos os exemplos em Python foram executados com scipy 1.18, statsmodels 0.15 e pingouin 0.7, e os resultados numéricos do texto e dos exercícios foram conferidos com o scipy. A sintaxe do SPSS segue a versão 27 ou posterior; em caso de diferença, use o botão **Paste** do SPSS para gerar a sintaxe da sua versão.
