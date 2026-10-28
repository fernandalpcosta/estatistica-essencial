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

Há também a página **Meu progresso**, com notas por módulo e por simulado, histórico de tentativas, módulos a revisar e exportação/importação do progresso em JSON.

## Simulados de prova (SPSS)

Cinco casos completos no formato da prova de Estatística (modelo: exame da L-carnitina), para treinar no SPSS:

| # | Caso | Decisões que o caso exige |
|---|---|---|
| 1 | Beta-alanina e os 400 metros | t unilateral; Pearson; t emparelhado; ANOVA + Tukey |
| 2 | Aplicativo de treino e frequência no ginásio | t bilateral; Spearman; Wilcoxon; Kruskal-Wallis + Dunn |
| 3 | Promoção “Família no Estádio” e gasto dos adeptos | unilateral com média do lado oposto; Spearman; t emparelhado; ANOVA + Tukey |
| 4 | Sapatilhas com placa de carbono nos 5 km | t de Welch (Levene significativo); Pearson; Wilcoxon; Kruskal-Wallis + Dunn |
| 5 | Realidade virtual e o tempo de reação dos guarda-redes | t unilateral; Spearman; t emparelhado; ANOVA não significativa |

Cada caso tem 13 questões abertas (frequências, descritivas, t de uma amostra, t independente, normalidade, correlação, teste emparelhado, recodificação, pressupostos, ANOVA/Kruskal-Wallis e post-hoc). A base de dados vem em `.sav` e `.csv` (`dados/simulados/`). O aluno digita os valores obtidos no SPSS; ao conferir, cada resposta errada mostra **por que** provavelmente errou (p bilateral no lugar do unilateral, linha errada do Levene, erro-padrão no lugar do desvio-padrão, Sig. sem correção de Bonferroni…), a teoria, o caminho no SPSS (menu e sintaxe) e a saída esperada.

Há ainda o **teste geral de conhecimentos** (25 questões conceituais sorteadas de todos os módulos).

### Regerar os simulados

As bases, o gabarito e as explicações são gerados por `tools/gerar_simulados.py`, que calcula tudo com `tools/spss_stats.py` (mesmos métodos do SPSS 27+: Shapiro-Wilk de Royston, Levene pela média, Tukey HSD, Wilcoxon e Dunn-Bonferroni com correção de empates). O cálculo foi conferido com a base do exame da L-carnitina. Para alterar um caso, edite o gerador e rode:

```
pip install numpy scipy pandas pyreadstat
python3 tools/gerar_simulados.py
```

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
js/simulados/casos.js  simulados de prova (gerado por tools/gerar_simulados.py)
dados/simulados/     bases de dados dos simulados (.sav e .csv)
tools/               gerador dos simulados e funções estatísticas equivalentes às do SPSS
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
