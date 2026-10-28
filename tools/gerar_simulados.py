"""Gera os simulados de prova (SPSS): bases de dados (.csv e .sav), gabarito e explicações.

Uso:  pip install numpy scipy pandas pyreadstat
      python3 tools/gerar_simulados.py

Saídas:
  dados/simulados/<id>.csv e <id>.sav   bases para abrir no SPSS
  js/simulados/casos.js                 enunciados, questões, gabarito e explicações (lido pelo site)

O gabarito é calculado com spss_stats.py, que reproduz os resultados do SPSS 27+
(conferido com o exame da L-carnitina: W = 0,888, p = 0,017; r = -0,853; Levene = 1,342, p = 0,292).
As sementes estão fixas: rodar de novo produz exatamente os mesmos arquivos.
"""
import itertools
import json
import os

import numpy as np
import pandas as pd
import pyreadstat

import spss_stats as S

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ALPHA = 0.05
PAIRS = [(1, 3), (2, 3), (1, 4), (2, 4)]


# ---------------------------------------------------------------- formatação
def f(x, d=3):
    """Número no formato português (vírgula decimal)."""
    return f"{x:.{d}f}".replace(".", ",").replace("-", "−")


def fp(p):
    return "< 0,001" if p < 0.001 else f(p)


def spss_p(p):
    """Como o SPSS mostra o Sig.: .000 quando p < 0,0005."""
    s = f"{p:.3f}"
    return s[1:] if s.startswith("0") else s


def sp(x, d=3):
    s = f"{x:.{d}f}"
    return s.replace("0.", ".", 1) if s.startswith("0.") else s.replace("-0.", "-.", 1)


def table(title, head, rows, note=None):
    cols = [head] + rows
    w = [max(len(str(r[i])) for r in cols) for i in range(len(head))]
    line = lambda r: "  ".join(str(c).rjust(w[i]) if i else str(c).ljust(w[i]) for i, c in enumerate(r))
    sep = "-" * (sum(w) + 2 * (len(w) - 1))
    out = [title, sep, line(head), sep] + [line(r) for r in rows] + [sep]
    if note:
        out.append(note)
    return "\n".join(out)


# ---------------------------------------------------------------- campos
def num(fid, label, a, tol, unit=None, traps=(), lt=False, absval=False):
    tr = [{"v": round(float(v), 6), "tol": tol, "m": m} for v, m in traps if abs(v - a) > tol * 1.5]
    d = {"k": "num", "id": fid, "label": label, "a": round(float(a), 6), "tol": tol, "traps": tr}
    if unit:
        d["unit"] = unit
    if lt and a < 0.001:
        d["lt"] = True
    if absval:
        d["abs"] = True
    return d


def pnum(fid, label, p, traps=()):
    return num(fid, label, p, 0.0015, traps=traps, lt=True)


def choice(fid, label, options, a, traps=None):
    return {"k": "ch", "id": fid, "label": label, "o": options, "a": a, "traps": {str(k): v for k, v in (traps or {}).items()}}


def yesno(fid, label, yes, msg_wrong):
    return choice(fid, label, ["Sim", "Não"], 0 if yes else 1, {1 if yes else 0: msg_wrong})


def vf(fid, label, true, msg_wrong):
    return choice(fid, label, ["V", "F"], 0 if true else 1, {1 if true else 0: msg_wrong})


# ---------------------------------------------------------------- casos
CASES = [
    {
        "id": "s1", "file": "simulado1_beta_alanina",
        "title": "Beta-alanina e os 400 metros",
        "tema": "Desempenho esportivo", "n": 22, "seed0": 105,
        "story": [
            "Uma marca de suplementos esportivos desenvolveu uma bebida com **beta-alanina** que, supostamente, melhora o desempenho em provas de velocidade prolongada. Vinte e dois atletas de um clube de atletismo do Porto correram os **400 metros** em dois dias diferentes: num dia tomaram a bebida com beta-alanina e, no outro, uma bebida placebo de sabor idêntico. O tempo (em segundos) foi registrado nas duas condições.",
            "Também foi registrado se o atleta usava **sapatilhas de bicos** (1 = sim, 2 = não), o sexo (1 = masculino, 2 = feminino) e o tempo de treino em meses. Numa avaliação anterior, atletas do mesmo nível que consumiram uma bebida isotônica comum fizeram os 400 m em **58,0 segundos**, em média.",
        ],
        "vars": {
            "sexo": ("sexo", "Sexo do atleta", {1: "Masculino", 2: "Feminino"}),
            "cat": ("bicos", "Usa sapatilhas de bicos", {1: "Sim", 2: "Não"}),
            "A": ("tempo_beta", "Tempo nos 400 m (s) com bebida de beta-alanina"),
            "B": ("tempo_placebo", "Tempo nos 400 m (s) com bebida placebo"),
            "cov": ("meses_treino", "Tempo de treino (meses)"),
        },
        "unit": "s", "dec": 2,
        "Ashort": "com beta-alanina", "Bshort": "com placebo", "covshort": "meses de treino",
        "q2": "Qual a porcentagem de atletas que usaram sapatilhas de bicos?",
        "mu0": 58.0, "q3dir": "menor", "q3txt": "Os atletas que tomaram a bebida com beta-alanina foram **mais rápidos** (menor tempo) do que os atletas da avaliação anterior, que tomaram bebida isotônica (58,0 s)?",
        "q9txt": "Existe diferença entre os tempos médios nos 400 m com beta-alanina e com placebo?",
        "rec": {"name": "grupotreino", "label": "Grupo de tempo de treino", "cuts": [(None, 9, "até 9 meses"), (10, 11, "10 a 11 meses"), (12, 14, "12 a 14 meses"), (15, None, "15 meses ou mais")]},
        "q12txt": "Os treinadores querem saber se, **com a bebida placebo**, os tempos nos 400 m diferem entre os grupos de tempo de treino.",
        "gen": {"sizes": [5, 6, 6, 5], "covr": [(6, 9), (10, 11), (12, 14), (15, 18)], "base": 57.2, "slope": -0.55, "noiseA": 0.9,
                "delta": 1.1, "noiseD": 0.6, "sexeff": 0.0, "skewA": 0, "skewD": 0, "skewBgroup": None, "sdBgroup": None},
        "want": {"q3": True, "normA": True, "normCov": True, "pearson": True, "normD": True, "paired_sig": True,
                 "sex_sig": False, "lev_sex": False, "anova_ok": True, "global_sig": True},
    },
    {
        "id": "s2", "file": "simulado2_ginasio_app",
        "title": "Aplicativo de treino e frequência no ginásio",
        "tema": "Gestão de ginásios", "n": 24, "seed0": 3941,
        "story": [
            "Uma cadeia de ginásios (academias) lançou um **aplicativo de treino** com metas semanais e notificações, para aumentar a frequência dos sócios. Vinte e quatro sócios foram acompanhados: registrou-se o **número de idas ao ginásio por mês** no mês anterior à instalação do aplicativo e no terceiro mês de uso do aplicativo.",
            "Foram registrados também o sexo (1 = masculino, 2 = feminino), o **tipo de plano** (1 = mensal, 2 = anual) e a idade do sócio, em anos. Segundo um relatório do setor, os sócios de ginásios em Portugal vão ao ginásio, em média, **8 vezes por mês**.",
        ],
        "vars": {
            "sexo": ("sexo", "Sexo do sócio", {1: "Masculino", 2: "Feminino"}),
            "cat": ("plano", "Tipo de plano", {1: "Mensal", 2: "Anual"}),
            "A": ("idas_com_app", "Idas ao ginásio por mês com o aplicativo"),
            "B": ("idas_sem_app", "Idas ao ginásio por mês antes do aplicativo"),
            "cov": ("idade", "Idade (anos)"),
        },
        "unit": "idas", "dec": 0,
        "Ashort": "com o aplicativo", "Bshort": "antes do aplicativo", "covshort": "idade",
        "q2": "Qual a porcentagem de sócios com plano mensal?",
        "mu0": 8.0, "q3dir": "diferente", "q3txt": "A frequência mensal dos sócios **com o aplicativo** é diferente da média nacional do setor (8 idas por mês)?",
        "q9txt": "Existe diferença na frequência mensal antes e depois do aplicativo?",
        "rec": {"name": "faixaetaria", "label": "Faixa etária", "cuts": [(None, 25, "até 25 anos"), (26, 35, "26 a 35 anos"), (36, 45, "36 a 45 anos"), (46, None, "46 anos ou mais")]},
        "q12txt": "A direção quer saber se, **antes do aplicativo**, a frequência mensal diferia entre as faixas etárias.",
        "gen": {"sizes": [6, 6, 6, 6], "covr": [(19, 25), (26, 35), (36, 45), (46, 62)], "base": 10.0, "slope": 0.12, "noiseA": 1.8,
                "delta": -2.2, "noiseD": 1.0, "sexeff": 2.2, "skewA": 1, "skewD": 1, "skewBgroup": 0, "sdBgroup": None, "count": True},
        "want": {"q3": True, "normA": False, "pearson": False, "normD": False, "paired_sig": True,
                 "sex_sig": True, "lev_sex": False, "anova_ok": False, "global_sig": True},
    },
    {
        "id": "s3", "file": "simulado3_estadio_promocao",
        "title": "Promoção “Família no Estádio” e gasto dos adeptos",
        "tema": "Marketing esportivo", "n": 22, "seed0": 308,
        "story": [
            "O departamento de marketing de um clube de futebol criou a promoção **“Família no Estádio”**: em jogos selecionados, quem compra o bilhete ganha desconto no bar e na loja do clube. Vinte e dois adeptos com bilhete de época foram acompanhados em dois jogos da mesma época: um **com a promoção** e outro **sem a promoção**. Registrou-se o **gasto no estádio**, em euros (bar e loja, sem contar o bilhete).",
            "Registraram-se também o sexo (1 = masculino, 2 = feminino), se o adepto é **sócio do clube** (1 = sim, 2 = não) e há quantos anos tem bilhete de época. Na época anterior, o gasto médio por adepto em dias de jogo foi de **12 euros**.",
        ],
        "vars": {
            "sexo": ("sexo", "Sexo do adepto", {1: "Masculino", 2: "Feminino"}),
            "cat": ("socio", "É sócio do clube", {1: "Sim", 2: "Não"}),
            "A": ("gasto_promo", "Gasto no estádio (€) no jogo com promoção"),
            "B": ("gasto_normal", "Gasto no estádio (€) no jogo sem promoção"),
            "cov": ("anos_bilhete", "Anos com bilhete de época"),
        },
        "unit": "€", "dec": 2,
        "Ashort": "no jogo com promoção", "Bshort": "no jogo sem promoção", "covshort": "anos com bilhete de época",
        "q2": "Qual a porcentagem de adeptos que são sócios do clube?",
        "mu0": 12.0, "q3dir": "maior", "q3txt": "No jogo **com a promoção**, os adeptos gastaram **mais** do que a média da época anterior (12 €)?",
        "q9txt": "Existe diferença entre o gasto médio no jogo com promoção e no jogo sem promoção?",
        "rec": {"name": "grupoanos", "label": "Anos com bilhete de época (grupos)", "cuts": [(None, 2, "até 2 anos"), (3, 5, "3 a 5 anos"), (6, 10, "6 a 10 anos"), (11, None, "11 anos ou mais")]},
        "q12txt": "O clube quer saber se, **no jogo sem promoção**, o gasto difere conforme há quantos anos o adepto tem bilhete de época.",
        "gen": {"sizes": [5, 6, 6, 5], "covr": [(1, 2), (3, 5), (6, 10), (11, 20)], "base": 9.2, "slope": 0.42, "noiseA": 1.6,
                "delta": -2.4, "noiseD": 1.1, "sexeff": 0.0, "skewA": 1, "skewD": 0, "skewBgroup": None, "sdBgroup": None},
        "want": {"q3": False, "q3_trap": True, "normA": False, "pearson": False, "normD": True, "paired_sig": True,
                 "sex_sig": False, "lev_sex": False, "anova_ok": True, "global_sig": True},
    },
    {
        "id": "s4", "file": "simulado4_placa_carbono",
        "title": "Sapatilhas com placa de carbono nos 5 km",
        "tema": "Desempenho esportivo", "n": 24, "seed0": 710,
        "story": [
            "Uma loja de material de corrida quer saber se vale a pena apostar nas **sapatilhas com placa de carbono**. Vinte e quatro corredores amadores de um clube de corrida fizeram uma prova de **5 km** duas vezes, com uma semana de intervalo: uma vez com as sapatilhas de placa de carbono e outra com as suas sapatilhas habituais. O tempo foi registrado em **minutos**.",
            "Registraram-se ainda o sexo (1 = masculino, 2 = feminino), o **terreno habitual de treino** (1 = estrada, 2 = trilho) e os quilômetros corridos por semana. Segundo o clube, o tempo médio dos seus corredores nos 5 km é de **25 minutos**.",
        ],
        "vars": {
            "sexo": ("sexo", "Sexo do corredor", {1: "Masculino", 2: "Feminino"}),
            "cat": ("terreno", "Terreno habitual de treino", {1: "Estrada", 2: "Trilho"}),
            "A": ("tempo_carbono", "Tempo nos 5 km (min) com placa de carbono"),
            "B": ("tempo_habitual", "Tempo nos 5 km (min) com a sapatilha habitual"),
            "cov": ("km_semana", "Quilômetros corridos por semana"),
        },
        "unit": "min", "dec": 2,
        "Ashort": "com placa de carbono", "Bshort": "com a sapatilha habitual", "covshort": "km por semana",
        "q2": "Qual a porcentagem de corredores que treinam habitualmente em estrada?",
        "mu0": 25.0, "q3dir": "diferente", "q3txt": "O tempo médio nos 5 km **com placa de carbono** é diferente da média do clube (25 minutos)?",
        "q9txt": "Existe diferença entre os tempos nos 5 km com a placa de carbono e com a sapatilha habitual?",
        "rec": {"name": "grupokm", "label": "Volume semanal de treino", "cuts": [(None, 20, "até 20 km"), (21, 35, "21 a 35 km"), (36, 50, "36 a 50 km"), (51, None, "51 km ou mais")]},
        "q12txt": "O clube quer saber se, **com a sapatilha habitual**, os tempos diferem entre os grupos de volume semanal de treino.",
        "gen": {"sizes": [6, 6, 6, 6], "covr": [(10, 20), (21, 35), (36, 50), (51, 70)], "base": 23.9, "slope": -0.09, "noiseA": 1.0,
                "delta": 0.55, "noiseD": 0.25, "sexeff": 2.6, "sexsd": 3.0, "skewA": 0, "skewD": 1, "skewBgroup": 1, "sdBgroup": None},
        "want": {"q3": False, "normA": True, "normCov": True, "pearson": True, "normD": False, "paired_sig": True,
                 "sex_sig": True, "lev_sex": True, "anova_ok": False, "global_sig": True},
    },
    {
        "id": "s5", "file": "simulado5_reacao_guarda_redes",
        "title": "Realidade virtual e o tempo de reação dos guarda-redes",
        "tema": "Treino e tecnologia", "n": 22, "seed0": 507,
        "story": [
            "Uma empresa de tecnologia esportiva propõe um **aquecimento cognitivo com óculos de realidade virtual** para guarda-redes (goleiros). Vinte e dois guarda-redes de clubes de futebol e futsal fizeram um teste de **tempo de reação** (em milissegundos) em dois treinos: um com o aquecimento em realidade virtual e outro com o aquecimento tradicional.",
            "Registraram-se o sexo (1 = masculino, 2 = feminino), a **modalidade** (1 = futebol, 2 = futsal) e os anos de experiência como guarda-redes. Um estudo de referência indica que guarda-redes de nível semelhante têm tempo de reação médio de **250 ms**.",
        ],
        "vars": {
            "sexo": ("sexo", "Sexo do guarda-redes", {1: "Masculino", 2: "Feminino"}),
            "cat": ("modalidade", "Modalidade", {1: "Futebol", 2: "Futsal"}),
            "A": ("reacao_rv", "Tempo de reação (ms) com aquecimento em realidade virtual"),
            "B": ("reacao_trad", "Tempo de reação (ms) com aquecimento tradicional"),
            "cov": ("anos_exp", "Anos de experiência como guarda-redes"),
        },
        "unit": "ms", "dec": 0,
        "Ashort": "com realidade virtual", "Bshort": "com aquecimento tradicional", "covshort": "anos de experiência",
        "q2": "Qual a porcentagem de guarda-redes de futsal?", "q2code": 2,
        "mu0": 250.0, "q3dir": "menor", "q3txt": "Com o aquecimento em realidade virtual, os guarda-redes são **mais rápidos** (menor tempo de reação) do que a referência de 250 ms?",
        "q9txt": "Existe diferença entre o tempo de reação médio com realidade virtual e com aquecimento tradicional?",
        "rec": {"name": "grupoexp", "label": "Experiência (grupos)", "cuts": [(None, 3, "até 3 anos"), (4, 6, "4 a 6 anos"), (7, 9, "7 a 9 anos"), (10, None, "10 anos ou mais")]},
        "q12txt": "Os treinadores querem saber se, **com o aquecimento tradicional**, o tempo de reação difere entre os grupos de experiência.",
        "gen": {"sizes": [5, 6, 6, 5], "covr": [(1, 3), (4, 6), (7, 9), (10, 16)], "base": 238.0, "slope": -0.6, "noiseA": 13.0,
                "delta": 9.0, "noiseD": 6.0, "sexeff": 0.0, "skewA": 1, "skewD": 0, "skewBgroup": None, "sdBgroup": None, "flatB": True},
        "want": {"q3": True, "normA": False, "pearson": False, "normD": True, "paired_sig": True,
                 "sex_sig": False, "lev_sex": False, "anova_ok": True, "global_sig": False},
    },
]


# ---------------------------------------------------------------- dados
def generate(c, seed):
    g = c["gen"]
    rng = np.random.default_rng(seed)
    n = c["n"]
    cov = np.concatenate([rng.integers(lo, hi + 1, size=k) for (lo, hi), k in zip(g["covr"], g["sizes"])])
    grp = np.concatenate([[i + 1] * k for i, k in enumerate(g["sizes"])])
    sexo = rng.choice([1, 2], size=n)
    cat = rng.choice([1, 2], size=n)
    cm = cov.mean()
    if g.get("skewA"):
        eA = rng.exponential(g["noiseA"], n) - g["noiseA"]
    else:
        eA = rng.normal(0, g["noiseA"], n)
    sexsd = np.where(sexo == 2, g.get("sexsd", 1.0), 1.0)
    A = g["base"] + g["slope"] * (cov - cm) + g["sexeff"] * (sexo == 2) + eA * sexsd
    if g.get("skewD"):
        eD = rng.exponential(g["noiseD"] * 1.6, n) - g["noiseD"] * 1.6
        if rng.random() < 0.7:
            eD[rng.integers(n)] += g["noiseD"] * 5
    else:
        eD = rng.normal(0, g["noiseD"], n)
    B = A + g["delta"] + eD
    if g.get("flatB"):
        B = B - g["slope"] * (cov - cm) * 0.85
    if g.get("skewBgroup") is not None:
        k = g["skewBgroup"]
        m = np.where(grp == k + 1)[0]
        B[m[0]] += abs(g["delta"]) * 3 + g["noiseA"] * 2.5
    d = c["dec"]
    A, B = np.round(A, d), np.round(B, d)
    if g.get("count"):
        A, B = np.clip(A, 0, 30), np.clip(B, 0, 30)
    order = rng.permutation(n)
    df = pd.DataFrame({"id": np.arange(1, n + 1), "sexo": sexo[order], "cat": cat[order],
                       "A": A[order], "B": B[order], "cov": cov[order]})
    return df


def recode(c, cov):
    out = np.zeros(len(cov), int)
    for i, (lo, hi, _) in enumerate(c["rec"]["cuts"]):
        m = np.ones(len(cov), bool)
        if lo is not None:
            m &= cov >= lo
        if hi is not None:
            m &= cov <= hi
        out[m] = i + 1
    return out


def analyze(c, df):
    A, B, cov = df.A.values.astype(float), df.B.values.astype(float), df["cov"].values.astype(float)
    sx = df.sexo.values
    grp = recode(c, df["cov"].values)
    gB = [B[grp == k] for k in (1, 2, 3, 4)]
    R = {
        "pct_sexo": {k: 100 * np.mean(sx == k) for k in (1, 2)},
        "cnt_sexo": {k: int(np.sum(sx == k)) for k in (1, 2)},
        "pct_cat": {k: 100 * np.mean(df.cat.values == k) for k in (1, 2)},
        "cnt_cat": {k: int(np.sum(df.cat.values == k)) for k in (1, 2)},
        "dA": S.desc(A), "dB": S.desc(B), "dcov": S.desc(cov),
        "t1": S.one_sample_t(A, c["mu0"]),
        "sexA": S.ind_t(A[sx == 1], A[sx == 2]),
        "sexA_desc": {k: S.desc(A[sx == k]) for k in (1, 2)},
        "sexA_mw": S.mann_whitney_spss(A[sx == 1], A[sx == 2]),
        "sexB": {k: S.desc(B[sx == k]) for k in (1, 2)},
        "swA": S.shapiro(A), "ksA": S.ks_lilliefors_D(A), "swB": S.shapiro(B),
        "swCov": S.shapiro(cov),
        "pear": S.pearson(cov, A), "spear": S.spearman(cov, A),
        "swD": S.shapiro(A - B), "ksD": S.ks_lilliefors_D(A - B),
        "pt": S.paired_t(A, B), "wil": S.wilcoxon_spss(A, B), "indAB": S.ind_t(A, B),
        "grp": grp, "gcov": [S.desc(cov[grp == k]) for k in (1, 2, 3, 4)],
        "gB": [S.desc(x) for x in gB], "swG": [S.shapiro(x) for x in gB],
        "levG": S.levene_mean(*gB), "levGmed": S.levene_median(*gB),
        "anova": S.anova(gB), "kw": S.kruskal(gB), "tukey": S.tukey(gB), "dunn": S.dunn_spss(gB),
    }
    # LSD (comparações sem correção) para a armadilha do post-hoc
    from scipy import stats as st
    msw, df2 = R["anova"]["msw"], R["anova"]["df2"]
    R["lsd"] = {}
    for (i, j) in itertools.combinations((1, 2, 3, 4), 2):
        a, b = gB[i - 1], gB[j - 1]
        t = (a.mean() - b.mean()) / np.sqrt(msw * (1 / len(a) + 1 / len(b)))
        R["lsd"][(i, j)] = float(2 * st.t.sf(abs(t), df2))
    # Bonferroni do SPSS (ONEWAY /POSTHOC=BONFERRONI): p do LSD multiplicado pelas 6 comparações possíveis
    R["bonf"] = {pr: min(1.0, 6 * p) for pr, p in R["lsd"].items()}
    # decisões
    t1 = R["t1"]
    if c["q3dir"] == "diferente":
        R["q3p"] = t1["p2"]
    else:
        right_dir = (t1["mean"] < c["mu0"]) if c["q3dir"] == "menor" else (t1["mean"] > c["mu0"])
        R["q3p"] = t1["p2"] / 2 if right_dir else 1 - t1["p2"] / 2
        R["q3_rightdir"] = right_dir
    R["q3"] = R["q3p"] < ALPHA
    R["normA"] = R["swA"]["p"] > ALPHA
    R["normCov"] = R["swCov"]["p"] > ALPHA
    R["pearson"] = R["normA"] and R["normCov"]
    R["normD"] = R["swD"]["p"] > ALPHA
    R["paired_p"] = R["pt"]["p"] if R["normD"] else R["wil"]["p"]
    R["paired_sig"] = R["paired_p"] < ALPHA
    R["lev_sex"] = R["sexA"]["lev"]["p"] < ALPHA
    R["sex_p"] = R["sexA"]["p_we"] if R["lev_sex"] else R["sexA"]["p_st"]
    R["sex_sig"] = R["sex_p"] < ALPHA
    R["normG"] = all(s["p"] > ALPHA for s in R["swG"])
    R["homG"] = R["levG"]["p"] > ALPHA
    R["anova_ok"] = R["normG"] and R["homG"]
    R["global_p"] = R["anova"]["p"] if R["anova_ok"] else R["kw"]["p"]
    R["global_sig"] = R["global_p"] < ALPHA
    R["post"] = {pr: (R["tukey"][pr]["p"] if R["anova_ok"] else R["dunn"][pr]["adj"]) for pr in PAIRS}
    return R


def far(p, lo=0.025, hi=0.09):
    """p longe do limiar de 0,05, para que arredondamentos não mudem a decisão."""
    return not (lo < p < hi)


def accept(c, R):
    w = c["want"]
    if any(R["gcov"][k]["n"] < 4 for k in range(4)):
        return False
    checks = [
        R["q3"] == w["q3"], far(R["q3p"]),
        R["normA"] == w["normA"], far(R["swA"]["p"]),
        R["pearson"] == w["pearson"], far(R["swCov"]["p"]) or not w["pearson"],
        R["normD"] == w["normD"], far(R["swD"]["p"]),
        R["paired_sig"] == w["paired_sig"], far(R["paired_p"]),
        R["sex_sig"] == w["sex_sig"], far(R["sex_p"]), far(R["sexA"]["p_st"]), far(R["sexA"]["p_we"]),
        R["lev_sex"] == w["lev_sex"], far(R["sexA"]["lev"]["p"]),
        R["anova_ok"] == w["anova_ok"], all(far(s["p"]) for s in R["swG"]), far(R["levG"]["p"]),
        R["global_sig"] == w["global_sig"], far(R["global_p"]),
        all(far(p) for p in R["post"].values()),
        0.3 < R["pct_sexo"][1] / 100 < 0.7, 0.3 < R["pct_cat"][1] / 100 < 0.7,
        abs(R["pear"]["r"]) > 0.45, far(R["pear"]["p"], 0.02, 0.1), far(R["spear"]["p"], 0.02, 0.1),
    ]
    if w["normA"] is False:
        checks.append(R["swA"]["p"] < 0.02)
    if w.get("q3_trap"):
        checks += [not R["q3_rightdir"], R["t1"]["p2"] < 0.03]
    if w["global_sig"]:
        checks.append(any(p < ALPHA for p in R["post"].values()) and any(p > ALPHA for p in R["post"].values()))
    if not w["anova_ok"]:
        # nos casos não paramétricos, a armadilha 'Sig.' sem correção tem de dar outra decisão em pelo menos um par
        checks.append(any((R["dunn"][pr]["p"] < ALPHA) != (R["dunn"][pr]["adj"] < ALPHA) for pr in PAIRS))
    return all(checks)


def find(c):
    for seed in range(c["seed0"], c["seed0"] + 200000):
        df = generate(c, seed)
        R = analyze(c, df)
        if accept(c, R):
            return seed, df, R
    raise RuntimeError("nenhuma semente atende às condições de " + c["id"])


# ---------------------------------------------------------------- questões
def build_questions(c, R):
    V = c["vars"]
    sexo_n, cat_n, A_n, B_n, cov_n = V["sexo"][0], V["cat"][0], V["A"][0], V["B"][0], V["cov"][0]
    catlab = V["cat"][2]
    q2code = c.get("q2code", 1)
    other = 3 - q2code
    u, dec = c["unit"], c["dec"]
    rec = c["rec"]
    mtol = 0.01 if dec else 0.01
    Q = []

    # ---- Q1
    pm, pf = R["pct_sexo"][1], R["pct_sexo"][2]
    Q.append({
        "q": "Qual a porcentagem de indivíduos do sexo masculino e do sexo feminino nesta amostra?",
        "fields": [
            num("m", "Masculino", round(pm, 1), 0.06, "%", [(R["cnt_sexo"][1], "Você digitou a **frequência absoluta** (contagem de casos). A questão pede a porcentagem: use a coluna *Percent* (ou *Valid Percent*) da tabela de frequências."), (pf, "Você trocou os sexos: este é o valor do sexo **feminino**. Confira os rótulos (1 = Masculino, 2 = Feminino) em *Variable View › Values*.")]),
            num("f", "Feminino", round(pf, 1), 0.06, "%", [(R["cnt_sexo"][2], "Você digitou a **frequência absoluta**. Use a coluna *Percent*."), (pm, "Você trocou os sexos: este é o valor do sexo **masculino**.")]),
        ],
        "theory": [
            "Para uma variável **nominal** (como sexo), a descrição adequada é a **distribuição de frequências**: quantos casos há em cada categoria (frequência absoluta) e qual a porcentagem do total (frequência relativa). Média e desvio-padrão não fazem sentido para códigos 1 e 2: são rótulos, não quantidades.",
            "A porcentagem é $\\% = \\dfrac{n_{categoria}}{N} \\times 100$. No SPSS, *Percent* usa todos os casos e *Valid Percent* exclui os valores omissos; como esta base não tem omissos, as duas colunas coincidem.",
        ],
        "spss": {"menu": "Analyze › Descriptive Statistics › Frequencies… → coloque `" + sexo_n + "` em *Variable(s)* → OK",
                 "syntax": f"FREQUENCIES VARIABLES={sexo_n}\n  /ORDER=ANALYSIS."},
        "out": table(V["sexo"][1], ["", "Frequency", "Percent", "Valid Percent", "Cumulative Percent"],
                     [["Valid  Masculino", R["cnt_sexo"][1], f"{pm:.1f}", f"{pm:.1f}", f"{pm:.1f}"],
                      ["       Feminino", R["cnt_sexo"][2], f"{pf:.1f}", f"{pf:.1f}", "100.0"],
                      ["       Total", c["n"], "100.0", "100.0", ""]]),
        "sol": f"Há {R['cnt_sexo'][1]} homens e {R['cnt_sexo'][2]} mulheres em {c['n']} casos: {R['cnt_sexo'][1]}/{c['n']} × 100 = **{f(pm, 1)}%** masculino e {R['cnt_sexo'][2]}/{c['n']} × 100 = **{f(pf, 1)}%** feminino.",
    })

    # ---- Q2
    pc = R["pct_cat"][q2code]
    Q.append({
        "q": c["q2"],
        "fields": [num("p", "Porcentagem", round(pc, 1), 0.06, "%", [(R["cnt_cat"][q2code], "Você digitou a **contagem**, não a porcentagem."), (R["pct_cat"][other], f"Este é o valor da outra categoria (**{catlab[other]}**). Confira os códigos: " + ", ".join(f"{k} = {v}" for k, v in catlab.items()) + ".")])],
        "theory": ["Mesmo raciocínio da questão anterior: variável nominal → tabela de frequências. O cuidado aqui é **ler a categoria certa**: confira em *Variable View › Values* qual código corresponde a cada rótulo. Se ativar *View › Value Labels*, a *Data View* mostra os rótulos no lugar dos números."],
        "spss": {"menu": "Analyze › Descriptive Statistics › Frequencies… → `" + cat_n + "` → OK",
                 "syntax": f"FREQUENCIES VARIABLES={cat_n}\n  /ORDER=ANALYSIS."},
        "out": table(V["cat"][1], ["", "Frequency", "Percent", "Valid Percent"],
                     [[f"Valid  {catlab[1]}", R["cnt_cat"][1], f"{R['pct_cat'][1]:.1f}", f"{R['pct_cat'][1]:.1f}"],
                      [f"       {catlab[2]}", R["cnt_cat"][2], f"{R['pct_cat'][2]:.1f}", f"{R['pct_cat'][2]:.1f}"],
                      ["       Total", c["n"], "100.0", "100.0"]]),
        "sol": f"{R['cnt_cat'][q2code]} de {c['n']} casos na categoria **{catlab[q2code]}** → {R['cnt_cat'][q2code]}/{c['n']} × 100 = **{f(pc, 1)}%**.",
    })

    # ---- Q3
    t1 = R["t1"]
    mu0 = c["mu0"]
    dirw = c["q3dir"]
    p_ok = R["q3p"]
    traps = []
    if dirw == "diferente":
        traps.append((t1["p2"] / 2, "Você usou o p **unilateral** (*One-Sided p*). A pergunta é se a média é **diferente** (sem direção): a hipótese é bilateral e o p certo é o *Two-Sided p*."))
        h1 = f"$H_1: \\mu \\neq {f(mu0, 1)}$"
    else:
        sym = "<" if dirw == "menor" else ">"
        h1 = f"$H_1: \\mu {sym} {f(mu0, 1)}$"
        if R["q3_rightdir"]:
            traps.append((t1["p2"], "Você usou o p **bilateral** (*Two-Sided p*). A pergunta tem direção (" + ("menor" if dirw == "menor" else "maior") + " que a referência), então o teste é **unilateral**: como a média amostral está do lado previsto por $H_1$, o p unilateral é o bilateral dividido por 2 (*One-Sided p* no SPSS 27+)."))
        else:
            traps.append((t1["p2"] / 2, "Armadilha clássica! O *One-Sided p* do SPSS é calculado **na direção em que a média amostral caiu**. Aqui a média amostral foi " + ("maior" if t1["mean"] > mu0 else "menor") + " que " + f(mu0, 1) + ", ou seja, **no sentido oposto** ao da pergunta. Para a hipótese da pergunta, o p unilateral é $1 - p_{bilateral}/2$, um valor grande: não há evidência a favor de $H_1$."))
            traps.append((t1["p2"], "Você usou o p **bilateral**. A pergunta tem direção, então o teste é unilateral; e, como a média caiu do lado oposto ao de $H_1$, o p unilateral é $1 - p_{bilateral}/2$."))
    yes = R["q3"]
    if dirw != "diferente" and not R["q3_rightdir"]:
        yn_msg = "Olhe primeiro para a **direção**: a média amostral (" + f(t1["mean"], 2) + ") ficou do lado **oposto** ao que a pergunta propõe. Um p bilateral pequeno indica que a média difere de " + f(mu0, 1) + ", mas no sentido contrário; para a hipótese da pergunta a resposta é **Não**."
    elif yes:
        yn_msg = f"O p da hipótese da pergunta ({fp(p_ok)}) é menor que 0,05: rejeita-se $H_0$, ou seja, **Sim**."
    else:
        yn_msg = f"O p ({fp(p_ok)}) é maior que 0,05: não se rejeita $H_0$. Não há evidência de diferença, portanto **Não**."
    Q.append({
        "q": c["q3txt"],
        "fields": [
            yesno("yn", "Resposta", yes, yn_msg),
            num("t", "Valor de t", round(t1["t"], 3), 0.01, None, [(-t1["t"], "O sinal está trocado. No teste t de uma amostra, $t = (\\bar{x} - \\mu_0)/EP$: é negativo quando a média amostral é menor que o valor de teste."), (t1["mean"] - mu0, "Este é o *Mean Difference* ($\\bar{x} - \\mu_0$), não o t. O t divide essa diferença pelo erro-padrão.")]),
            pnum("p", "Valor de p (adequado à pergunta)", p_ok, traps),
        ],
        "theory": [
            f"Comparar a média de **uma amostra** com um **valor de referência conhecido** (aqui, {f(mu0, 1)} {u}, vindo de um estudo anterior) é o caso do **teste t de uma amostra** (*One-Sample T Test*). Não se trata de dois grupos medidos neste estudo: o valor de referência é um número fixo.",
            f"Hipóteses: $H_0: \\mu = {f(mu0, 1)}$ e {h1}. A estatística é $t = \\dfrac{{\\bar{{x}} - \\mu_0}}{{s/\\sqrt{{n}}}}$, com $n - 1$ graus de liberdade.",
            "**Unilateral ou bilateral?** Se a pergunta tem direção (\"mais rápido\", \"gasta mais\", \"menos eficiente\"), o teste é unilateral. O SPSS 27+ mostra *One-Sided p* e *Two-Sided p*. Atenção: o *One-Sided p* do SPSS é sempre metade do bilateral, **calculado na direção em que a média caiu**. Se a média caiu do lado oposto ao da sua hipótese, o p correto é $1 - p_{bilateral}/2$. Em versões antigas, que só mostram *Sig. (2-tailed)*, divida por 2 quando a direção bater.",
            "Pressuposto: normalidade da variável, ou amostra grande o suficiente para o Teorema do Limite Central. Com $n \\approx 20$ e assimetria moderada o t ainda é razoavelmente robusto; a alternativa não paramétrica é o teste de Wilcoxon de uma amostra.",
        ],
        "spss": {"menu": f"Analyze › Compare Means › One-Sample T Test… → `{A_n}` em *Test Variable(s)* → *Test Value* = {mu0:g} → OK",
                 "syntax": f"T-TEST\n  /TESTVAL={mu0:g}\n  /VARIABLES={A_n}\n  /CRITERIA=CI(.95)."},
        "out": table("One-Sample Statistics", ["", "N", "Mean", "Std. Deviation", "Std. Error Mean"],
                     [[A_n, c["n"], f"{t1['mean']:.4f}", f"{t1['sd']:.4f}", f"{t1['se']:.4f}"]]) + "\n\n" +
               table(f"One-Sample Test (Test Value = {mu0:g})", ["", "t", "df", "One-Sided p", "Two-Sided p", "Mean Difference"],
                     [[A_n, f"{t1['t']:.3f}", t1["df"], spss_p(t1["p1_obs"]), spss_p(t1["p2"]), f"{t1['diff']:.4f}"]]),
        "sol": f"Média = {f(t1['mean'], 2)} {u} (DP = {f(t1['sd'], 3)}), $t({t1['df']}) = {f(t1['t'], 3)}$, p bilateral = {fp(t1['p2'])}. " +
               ("Hipótese bilateral: p = " + fp(p_ok) + "." if dirw == "diferente" else
                ("A média está do lado previsto por $H_1$, então p unilateral = " + fp(t1["p2"]) + "/2 = **" + fp(p_ok) + "**." if R["q3_rightdir"] else
                 "A média está do lado **oposto** ao de $H_1$, então p unilateral = 1 − " + fp(t1["p2"]) + "/2 = **" + fp(p_ok) + "**.")) +
               (" Como p < 0,05, a resposta é **Sim**." if yes else " Como p > 0,05, a resposta é **Não**."),
    })

    # ---- Q4
    dB = R["dB"]
    Q.append({
        "q": f"Qual o valor da média e do desvio-padrão de **{V['B'][1].lower()}**?",
        "fields": [
            num("m", "Média", round(dB["mean"], 3), mtol, u, [(R["dA"]["mean"], f"Este é o valor da outra variável (`{A_n}`, {c['Ashort']}). A questão pede `{B_n}` ({c['Bshort']})."), (dB["median"], "Esta é a **mediana**, não a média.")]),
            num("dp", "Desvio-padrão", round(dB["sd"], 3), 0.01, u, [(dB["se"], "Você digitou o **erro-padrão da média** (*Std. Error*), não o desvio-padrão. O EP = DP/√n mede a incerteza da média; o DP mede a dispersão dos dados."), (dB["var"], "Você digitou a **variância**. O desvio-padrão é a raiz quadrada dela."), (R["dA"]["sd"], f"Este é o DP da outra variável (`{A_n}`)."), (dB["sd"] * np.sqrt((c['n'] - 1) / c['n']), "Você calculou o DP dividindo por $n$ (populacional). O SPSS, e a estatística inferencial, usam $n - 1$.")]),
        ],
        "theory": [
            "Para uma variável **quantitativa** (escala), a descrição básica é uma medida de tendência central (média) e uma de dispersão (desvio-padrão).",
            "$\\bar{x} = \\dfrac{\\sum x_i}{n}$ e $s = \\sqrt{\\dfrac{\\sum (x_i - \\bar{x})^2}{n - 1}}$. Divide-se por $n - 1$ porque a amostra estima a variância populacional e já \"gastou\" um grau de liberdade ao estimar a média (Módulo 1).",
            "Não confunda o **desvio-padrão** (dispersão dos dados) com o **erro-padrão da média** ($EP = s/\\sqrt{n}$, a precisão da média), que aparece logo ao lado na saída do *Explore*.",
        ],
        "spss": {"menu": f"Analyze › Descriptive Statistics › Descriptives… → `{B_n}` → OK (ou *Explore*, que mostra mais estatísticas)",
                 "syntax": f"DESCRIPTIVES VARIABLES={B_n}\n  /STATISTICS=MEAN STDDEV MIN MAX."},
        "out": table("Descriptive Statistics", ["", "N", "Minimum", "Maximum", "Mean", "Std. Deviation"],
                     [[B_n, c["n"], f"{dB['min']:.{dec}f}", f"{dB['max']:.{dec}f}", f"{dB['mean']:.4f}", f"{dB['sd']:.4f}"], ["Valid N (listwise)", c["n"], "", "", "", ""]]),
        "sol": f"Média = **{f(dB['mean'], 2)} {u}** e desvio-padrão = **{f(dB['sd'], 3)} {u}**.",
    })

    # ---- Q5
    sA = R["sexA"]
    lev_sig = R["lev_sex"]
    row_ok = 1 if lev_sig else 0
    p_sex = R["sex_p"]
    other_p = sA["p_st"] if lev_sig else sA["p_we"]
    Q.append({
        "q": f"Existe diferença entre os sexos no **{V['A'][1][0].lower() + V['A'][1][1:]}**?",
        "fields": [
            pnum("lev", "p do teste de Levene", sA["lev"]["p"], [(sA["p_st"], "Este é o p do **teste t**, não o do Levene. O Levene vem nas primeiras colunas da tabela (*F* e *Sig.*)."), (sA["lev"]["F"], "Este é o **F** do Levene; o campo pede o p (*Sig.*).")]),
            choice("row", "Linha da tabela a usar", ["Equal variances assumed (t de Student)", "Equal variances not assumed (t de Welch)"], row_ok,
                   {1 - row_ok: ("O Levene deu p < 0,05: as variâncias **não** são homogêneas, então use a linha *Equal variances not assumed* (Welch)." if lev_sig else "O Levene deu p > 0,05: não há evidência de variâncias diferentes, então use a linha *Equal variances assumed*.")}),
            pnum("p", "p do teste t", p_sex, [(other_p, "Você leu a **outra linha** da tabela. A escolha da linha depende do Levene: p do Levene " + ("< 0,05 → linha de baixo (Welch)." if lev_sig else "> 0,05 → linha de cima (variâncias iguais).")), (sA["lev"]["p"], "Este é o p do **Levene** (que testa variâncias, não médias). O p do teste t está em *Two-Sided p* / *Sig. (2-tailed)*."), (p_sex / 2, "Você usou o p unilateral. A pergunta (\"existe diferença?\") não tem direção: use o *Two-Sided p*.")]),
            yesno("yn", "Existe diferença?", R["sex_sig"], f"O p do teste t ({fp(p_sex)}) é " + ("menor que 0,05: rejeita-se $H_0$ de médias iguais → **Sim**." if R["sex_sig"] else "maior que 0,05: não se rejeita $H_0$ → **Não** há evidência de diferença.")),
        ],
        "theory": [
            "Dois **grupos independentes** (homens e mulheres são pessoas diferentes) e uma variável quantitativa → **teste t para amostras independentes**. $H_0: \\mu_M = \\mu_F$.",
            "O SPSS faz antes o **teste de Levene**, cuja $H_0$ é *variâncias iguais*. Se p do Levene > 0,05, use a linha *Equal variances assumed* (t de Student, com variância combinada). Se p < 0,05, use *Equal variances not assumed* (t de Welch, que corrige os graus de liberdade).",
            "Erro frequente: tomar o p do Levene como resposta. O Levene responde se as **variâncias** diferem; a pergunta é sobre as **médias**.",
            "Pressuposto adicional: normalidade em cada grupo. Se a variável fosse muito assimétrica, com grupos pequenos, a alternativa seria o **Mann-Whitney** (*Nonparametric Tests › Legacy Dialogs › 2 Independent Samples*)." +
            (f" Aqui, para conferência, o Mann-Whitney dá U = {f(R['sexA_mw']['U'], 1)}, p = {fp(R['sexA_mw']['p'])}." if not R["normA"] else ""),
        ],
        "spss": {"menu": f"Analyze › Compare Means › Independent-Samples T Test… → `{A_n}` em *Test Variable(s)*, `{sexo_n}` em *Grouping Variable* → *Define Groups*: 1 e 2 → OK",
                 "syntax": f"T-TEST GROUPS={sexo_n}(1 2)\n  /VARIABLES={A_n}\n  /CRITERIA=CI(.95)."},
        "out": table("Group Statistics", [sexo_n, "N", "Mean", "Std. Deviation"],
                     [["Masculino", R["sexA_desc"][1]["n"], f"{R['sexA_desc'][1]['mean']:.4f}", f"{R['sexA_desc'][1]['sd']:.4f}"],
                      ["Feminino", R["sexA_desc"][2]["n"], f"{R['sexA_desc'][2]['mean']:.4f}", f"{R['sexA_desc'][2]['sd']:.4f}"]]) + "\n\n" +
               table("Independent Samples Test (" + A_n + ")", ["", "Levene F", "Sig.", "t", "df", "Two-Sided p", "Mean Diff."],
                     [["Equal variances assumed", f"{sA['lev']['F']:.3f}", spss_p(sA["lev"]["p"]), f"{sA['t_st']:.3f}", sA["df_st"], spss_p(sA["p_st"]), f"{sA['diff']:.4f}"],
                      ["Equal variances not assumed", "", "", f"{sA['t_we']:.3f}", f"{sA['df_we']:.3f}", spss_p(sA["p_we"]), f"{sA['diff']:.4f}"]]),
        "sol": f"Levene: F = {f(sA['lev']['F'], 3)}, p = {fp(sA['lev']['p'])} → " + ("variâncias diferentes, linha de **Welch**" if lev_sig else "variâncias homogêneas, linha **Equal variances assumed**") +
               f". Teste t: p = **{fp(p_sex)}** → " + ("**existe** diferença entre os sexos." if R["sex_sig"] else "**não** há diferença significativa entre os sexos."),
    })

    # ---- Q6
    sb = R["sexB"]
    Q.append({
        "q": f"Qual a média e o desvio-padrão de **{V['B'][1][0].lower() + V['B'][1][1:]}**, para o sexo masculino e para o feminino?",
        "fields": [
            num("mm", "Masculino: média", round(sb[1]["mean"], 3), mtol, u, [(sb[2]["mean"], "Este é o valor do sexo **feminino**."), (R["sexA_desc"][1]["mean"], f"Este é o valor de `{A_n}`; a questão pede `{B_n}`.")]),
            num("dm", "Masculino: desvio-padrão", round(sb[1]["sd"], 3), 0.01, u, [(sb[1]["se"], "Você digitou o **erro-padrão**, não o DP."), (sb[2]["sd"], "Este é o DP do sexo **feminino**."), (R["sexA_desc"][1]["sd"], f"Este é o DP de `{A_n}`.")]),
            num("mf", "Feminino: média", round(sb[2]["mean"], 3), mtol, u, [(sb[1]["mean"], "Este é o valor do sexo **masculino**."), (R["sexA_desc"][2]["mean"], f"Este é o valor de `{A_n}`.")]),
            num("df", "Feminino: desvio-padrão", round(sb[2]["sd"], 3), 0.01, u, [(sb[2]["se"], "Você digitou o **erro-padrão**, não o DP."), (sb[1]["sd"], "Este é o DP do sexo **masculino**."), (R["sexA_desc"][2]["sd"], f"Este é o DP de `{A_n}`.")]),
        ],
        "theory": [
            "Descritivas **por grupo**: a mesma média e o mesmo DP da questão 4, mas calculados separadamente para cada categoria de outra variável. É o que se reporta sempre que se comparam grupos (e é a tabela *Group Statistics* do teste t).",
            "Há três caminhos no SPSS: *Compare Means › Means* (o mais direto), *Explore* com `sexo` em *Factor List*, ou *Data › Split File* seguido de *Descriptives*. Se usar *Split File*, lembre-se de **desligá-lo** depois (*Analyze all cases*), senão todas as análises seguintes sairão divididas por sexo.",
        ],
        "spss": {"menu": f"Analyze › Compare Means › Means… → `{B_n}` em *Dependent List*, `{sexo_n}` em *Independent List* → OK",
                 "syntax": f"MEANS TABLES={B_n} BY {sexo_n}\n  /CELLS=MEAN COUNT STDDEV."},
        "out": table("Report (" + B_n + ")", [sexo_n, "Mean", "N", "Std. Deviation"],
                     [["Masculino", f"{sb[1]['mean']:.4f}", sb[1]["n"], f"{sb[1]['sd']:.4f}"],
                      ["Feminino", f"{sb[2]['mean']:.4f}", sb[2]["n"], f"{sb[2]['sd']:.4f}"],
                      ["Total", f"{dB['mean']:.4f}", c["n"], f"{dB['sd']:.4f}"]]),
        "sol": f"Masculino: média **{f(sb[1]['mean'], 2)}**, DP **{f(sb[1]['sd'], 3)}**. Feminino: média **{f(sb[2]['mean'], 2)}**, DP **{f(sb[2]['sd'], 3)}** ({u}).",
    })

    # ---- Q7
    sw = R["swA"]
    Q.append({
        "q": f"A distribuição de **{V['A'][1][0].lower() + V['A'][1][1:]}** segue uma distribuição normal?",
        "fields": [
            yesno("yn", "Existe normalidade?", R["normA"], f"No Shapiro-Wilk, $H_0$ é *os dados vêm de uma distribuição normal*. p = {fp(sw['p'])} " + ("> 0,05: não se rejeita a normalidade → **Sim**." if R["normA"] else "< 0,05: rejeita-se a normalidade → **Não**. Cuidado com a inversão: aqui p pequeno é **mau sinal** para a normalidade.")),
            num("w", "Estatística (W de Shapiro-Wilk)", round(sw["W"], 3), 0.0015, None, [(R["ksA"], "Esta é a estatística do **Kolmogorov-Smirnov** (primeiras colunas da tabela). Com n < 50 usa-se a coluna **Shapiro-Wilk**."), (R["swB"]["W"], f"Este é o W de `{B_n}`; a questão pede `{A_n}`.")]),
            pnum("p", "Valor de p", sw["p"], [(R["swB"]["p"], f"Este é o p de `{B_n}`; a questão pede `{A_n}`.")]),
        ],
        "theory": [
            "O teste de **Shapiro-Wilk** verifica se a amostra é compatível com uma população normal. $H_0$: a distribuição é normal; $H_1$: não é. Ao contrário da maioria dos testes, aqui **queremos não rejeitar** $H_0$ (p > 0,05) para poder usar testes paramétricos.",
            "O SPSS mostra dois testes na tabela *Tests of Normality*: Kolmogorov-Smirnov (com correção de Lilliefors) e Shapiro-Wilk. Para amostras pequenas (n < 50) o **Shapiro-Wilk** é o recomendado, por ter mais poder.",
            "O W varia entre 0 e 1: quanto mais perto de 1, mais os dados ordenados se alinham com o que se esperaria de uma normal. Complemente sempre com o **Q-Q plot** (*Normal Q-Q Plot*, gerado pela opção *Normality plots with tests*): pontos longe da reta indicam afastamento da normalidade.",
        ],
        "spss": {"menu": f"Analyze › Descriptive Statistics › Explore… → `{A_n}` em *Dependent List* → *Plots…* → marque **Normality plots with tests** → Continue → OK",
                 "syntax": f"EXAMINE VARIABLES={A_n}\n  /PLOT BOXPLOT NPPLOT\n  /STATISTICS DESCRIPTIVES\n  /NOTOTAL."},
        "out": table("Tests of Normality", ["", "K-S Statistic", "df", "Sig.", "S-W Statistic", "df", "Sig."],
                     [[A_n, f"{R['ksA']:.3f}", c["n"], "...", f"{sw['W']:.3f}", c["n"], spss_p(sw["p"])]],
                     "a. Lilliefors Significance Correction"),
        "sol": f"Shapiro-Wilk: **W = {f(sw['W'], 3)}**, **p = {fp(sw['p'])}** → " + ("não se rejeita $H_0$: a distribuição pode ser considerada **normal**." if R["normA"] else "rejeita-se $H_0$: a distribuição **não é normal**."),
    })

    # ---- Q8
    pe, spr = R["pear"], R["spear"]
    use_p = R["pearson"]
    rr = pe if use_p else spr
    why_test = (f"`{A_n}` (p = {fp(R['swA']['p'])}) e `{cov_n}` (p = {fp(R['swCov']['p'])}) têm distribuição compatível com a normal no Shapiro-Wilk, então o coeficiente de **Pearson** é adequado." if use_p else
                f"`{A_n}` **não** tem distribuição normal (Shapiro-Wilk p = {fp(R['swA']['p'])}, questão 7), então o coeficiente adequado é o de **Spearman**, baseado em postos.")
    Q.append({
        "q": f"Faça um teste para avaliar a associação entre **{c['covshort']}** e **{V['A'][1][0].lower() + V['A'][1][1:]}**. Escolha a estatística mais adequada.",
        "fields": [
            choice("test", "Teste escolhido", ["Correlação de Pearson", "Correlação de Spearman"], 0 if use_p else 1, {1 if use_p else 0: why_test}),
            num("r", "Valor da correlação", round(rr["r"], 3), 0.005, None, [((spr if use_p else pe)["r"], "Este é o coeficiente do **outro** teste. " + why_test), (rr["r"] ** 2, "Você digitou o $r^2$ (coeficiente de determinação). A questão pede o próprio coeficiente de correlação."), (-rr["r"], "O sinal está trocado. Confira o sentido da relação no diagrama de dispersão.")]),
            pnum("p", "Valor de p", rr["p"], [((spr if use_p else pe)["p"], "Este é o p do **outro** coeficiente.")]),
        ],
        "theory": [
            "**Pearson** ($r$) mede associação **linear** entre duas variáveis quantitativas; pressupõe normalidade (bivariada) e é sensível a valores extremos. **Spearman** ($\\rho$) é a correlação de Pearson aplicada aos **postos**: mede associação **monotônica** e não exige normalidade.",
            "Regra prática da disciplina: verifique a normalidade das duas variáveis (Shapiro-Wilk). Se ambas forem normais, use Pearson; se pelo menos uma não for, use Spearman.",
            "Interpretação: o sinal dá o sentido (positivo: as duas crescem juntas; negativo: uma cresce enquanto a outra diminui) e o módulo dá a força (regra de bolso: < 0,3 fraca, 0,3 a 0,7 moderada, > 0,7 forte). $H_0$ do teste: $\\rho = 0$ na população.",
            "Correlação não é causalidade. Antes de tudo, olhe o diagrama de dispersão (*Graphs › Legacy Dialogs › Scatter/Dot*).",
        ],
        "spss": {"menu": "Analyze › Correlate › Bivariate… → `" + cov_n + "` e `" + A_n + "` em *Variables* → marque **" + ("Pearson" if use_p else "Spearman") + "** → OK. (Verifique a normalidade das duas antes, em *Explore*.)",
                 "syntax": (f"EXAMINE VARIABLES={cov_n} {A_n}\n  /PLOT NPPLOT\n  /NOTOTAL.\n\n" +
                            (f"CORRELATIONS\n  /VARIABLES={cov_n} {A_n}\n  /PRINT=TWOTAIL NOSIG." if use_p else
                             f"NONPAR CORR\n  /VARIABLES={cov_n} {A_n}\n  /PRINT=SPEARMAN TWOTAIL NOSIG."))},
        "out": table("Tests of Normality (Shapiro-Wilk)", ["", "Statistic", "df", "Sig."],
                     [[cov_n, f"{R['swCov']['W']:.3f}", c["n"], spss_p(R["swCov"]["p"])], [A_n, f"{R['swA']['W']:.3f}", c["n"], spss_p(R["swA"]["p"])]]) + "\n\n" +
               table("Correlations" if use_p else "Correlations (Spearman's rho)", ["", "", A_n],
                     [[cov_n, "Pearson Correlation" if use_p else "Correlation Coefficient", sp(rr["r"])], ["", "Sig. (2-tailed)", spss_p(rr["p"])], ["", "N", c["n"]]]),
        "sol": why_test + f" Resultado: **{'r' if use_p else 'ρ'} = {f(rr['r'], 3)}**, **p = {fp(rr['p'])}**: associação " +
               ("forte" if abs(rr["r"]) > 0.7 else "moderada") + (" positiva" if rr["r"] > 0 else " negativa") + " e significativa entre " + c["covshort"] + " e " + V["A"][1][0].lower() + V["A"][1][1:] + "." +
               (f" (Para comparação, o outro coeficiente daria {f((spr if use_p else pe)['r'], 3)}.)"),
    })

    # ---- Q9
    pt, wil, normD = R["pt"], R["wil"], R["normD"]
    p9 = R["paired_p"]
    opts9 = ["t para amostras emparelhadas", "Wilcoxon", "t para amostras independentes", "Mann-Whitney"]
    a9 = 0 if normD else 1
    tr9 = {2: "As duas medidas são das **mesmas pessoas** (cada participante foi medido nas duas condições), então as amostras são **emparelhadas**, não independentes.",
           3: "O Mann-Whitney é para grupos **independentes**. Aqui as mesmas pessoas foram medidas duas vezes: amostras emparelhadas."}
    tr9[1 - a9] = (f"As diferenças ({A_n} − {B_n}) seguem a normal (Shapiro-Wilk p = {fp(R['swD']['p'])}), então o teste paramétrico, **t emparelhado**, é o adequado." if normD else
                   f"As diferenças ({A_n} − {B_n}) **não** seguem a normal (Shapiro-Wilk p = {fp(R['swD']['p'])}), então o adequado é o não paramétrico, **Wilcoxon**.")
    Q.append({
        "q": c["q9txt"],
        "fields": [
            choice("test", "Teste escolhido", opts9, a9, tr9),
            yesno("yn", "Existe diferença?", R["paired_sig"], f"O p ({fp(p9)}) é " + ("menor que 0,05 → **Sim**." if R["paired_sig"] else "maior que 0,05 → **Não**.")),
            pnum("p", "Valor de p", p9, [((wil["p"] if normD else pt["p"]), "Este é o p do **outro** teste emparelhado. " + tr9[1 - a9]), (R["indAB"]["p_st"], "Este é o p de um t para amostras **independentes**, que ignora o emparelhamento."), (R["swD"]["p"], "Este é o p do Shapiro-Wilk das diferenças (o pressuposto), não do teste de comparação.")]),
            num("ma", f"Média {c['Ashort']}", round(R["dA"]["mean"], 3), mtol, u, [(R["dB"]["mean"], "Você trocou as condições.")]),
            num("mb", f"Média {c['Bshort']}", round(R["dB"]["mean"], 3), mtol, u, [(R["dA"]["mean"], "Você trocou as condições.")]),
        ],
        "theory": [
            "Cada participante foi medido **nas duas condições**: as observações estão emparelhadas. O teste analisa a **diferença** dentro de cada pessoa, o que remove a variação entre pessoas (atletas mais rápidos são rápidos nas duas condições) e dá muito mais poder do que comparar dois grupos independentes.",
            "O pressuposto do **t emparelhado** é a normalidade das **diferenças** (não de cada variável separadamente). Crie a variável diferença em *Transform › Compute Variable* e aplique o Shapiro-Wilk a ela. Se não for normal, use o **Wilcoxon** (postos sinalizados).",
            "$t = \\dfrac{\\bar{d}}{s_d/\\sqrt{n}}$, com $n - 1$ graus de liberdade, onde $d_i$ é a diferença de cada participante. O Wilcoxon ordena os $|d_i|$, soma os postos das diferenças positivas e das negativas e compara com o esperado sob $H_0$ (aproximação normal, Z).",
        ],
        "spss": {"menu": f"Transform › Compute Variable… (dif = {A_n} − {B_n}) → Explore com *Normality plots with tests*. Depois: " +
                 ("Analyze › Compare Means › Paired-Samples T Test… → par `" + A_n + "` / `" + B_n + "` → OK" if normD else
                  "Analyze › Nonparametric Tests › Legacy Dialogs › 2 Related Samples… → par `" + A_n + "` / `" + B_n + "` → marque **Wilcoxon** → OK"),
                 "syntax": f"COMPUTE dif={A_n}-{B_n}.\nEXECUTE.\nEXAMINE VARIABLES=dif\n  /PLOT NPPLOT\n  /NOTOTAL.\n\n" +
                           (f"T-TEST PAIRS={A_n} WITH {B_n} (PAIRED)\n  /CRITERIA=CI(.95)." if normD else
                            f"NPAR TESTS\n  /WILCOXON={A_n} WITH {B_n} (PAIRED)\n  /STATISTICS DESCRIPTIVES.")},
        "out": table("Tests of Normality (dif)", ["", "K-S Statistic", "Sig.", "S-W Statistic", "df", "Sig."], [["dif", f"{R['ksD']:.3f}", "...", f"{R['swD']['W']:.3f}", c["n"], spss_p(R["swD"]["p"])]]) + "\n\n" +
               table("Paired Samples Statistics", ["", "Mean", "N", "Std. Deviation"],
                     [[A_n, f"{R['dA']['mean']:.4f}", c["n"], f"{R['dA']['sd']:.4f}"], [B_n, f"{R['dB']['mean']:.4f}", c["n"], f"{R['dB']['sd']:.4f}"]]) + "\n\n" +
               (table("Paired Samples Test", ["", "Mean (dif)", "Std. Dev.", "t", "df", "Two-Sided p"],
                      [[f"{A_n} - {B_n}", f"{pt['dmean']:.4f}", f"{pt['dsd']:.4f}", f"{pt['t']:.3f}", pt["df"], spss_p(pt["p"])]]) if normD else
                table("Test Statistics (Wilcoxon)", ["", f"{B_n} - {A_n}"], [["Z", f"{wil['Z']:.3f}"], ["Asymp. Sig. (2-tailed)", spss_p(wil["p"])]])),
        "sol": f"As medidas são emparelhadas. Shapiro-Wilk das diferenças: p = {fp(R['swD']['p'])} → " +
               (f"normal → **t emparelhado**: $t({pt['df']}) = {f(pt['t'], 3)}$, **p = {fp(p9)}**." if normD else f"não normal → **Wilcoxon**: Z = {f(wil['Z'], 3)}, **p = {fp(p9)}**.") +
               f" Médias: {f(R['dA']['mean'], 2)} {u} ({c['Ashort']}) e {f(R['dB']['mean'], 2)} {u} ({c['Bshort']}). " + ("Há diferença significativa." if R["paired_sig"] else "Não há diferença significativa."),
    })

    # ---- Q10
    cuts = rec["cuts"]
    rec_txt = "; ".join(lab for _, _, lab in cuts)
    rr_sy = []
    for i, (lo, hi, _) in enumerate(cuts):
        a_ = "LOWEST" if lo is None else str(lo)
        b_ = "HIGHEST" if hi is None else str(hi)
        rr_sy.append(f"({a_} THRU {b_}={i + 1})")
    fields10 = []
    gc = R["gcov"]
    for k in range(4):
        fields10.append(num(f"n{k+1}", f"Grupo {k+1}: n", gc[k]["n"], 0.01, None, []))
        fields10.append(num(f"m{k+1}", f"Grupo {k+1}: média", round(gc[k]["mean"], 3), 0.01, None, []))
        fields10.append(num(f"s{k+1}", f"Grupo {k+1}: DP", round(gc[k]["sd"], 3), 0.01, None, [(gc[k]["sd"] / np.sqrt(gc[k]["n"]), "Você digitou o **erro-padrão**, não o DP.")]))
    Q.append({
        "q": f"Crie uma nova variável (**{rec['name']}**) com base em `{cov_n}`. Atribua os valores 1, 2, 3 e 4, respectivamente, a: {rec_txt}. Qual o tamanho, a média e o desvio-padrão de `{cov_n}` em cada grupo criado?",
        "fields": fields10, "grid": 3,
        "theory": [
            "**Recodificar** transforma uma variável quantitativa em categorias (classes). Use sempre *Recode into Different Variables*, para não destruir a variável original.",
            "Cuidado com os limites das classes: cada valor tem de cair em **uma e só uma** classe. Com valores inteiros, \"" + cuts[1][2] + "\" corresponde a `" + rr_sy[1].strip("()") + "`. Use `LOWEST` para a primeira classe e `HIGHEST` para a última.",
            "Depois de recodificar, dê rótulos aos códigos (*Variable View › Values*) e mude a medida da nova variável para **Nominal** ou **Ordinal**: alguns procedimentos (como o Kruskal-Wallis pelo menu *Independent Samples*) exigem isso.",
            "Confira sempre o resultado: o tamanho de cada grupo (n) mostra se a recodificação ficou certa. Se algum n não bater, revise os limites (o caso mais comum é um valor de fronteira cair na classe errada ou ficar *System Missing*).",
        ],
        "spss": {"menu": f"Transform › Recode into Different Variables… → `{cov_n}` → *Output Variable*: `{rec['name']}` → Change → *Old and New Values…*: Range, LOWEST through {cuts[0][1]} → 1; Range {cuts[1][0]} through {cuts[1][1]} → 2; Range {cuts[2][0]} through {cuts[2][1]} → 3; Range, {cuts[3][0]} through HIGHEST → 4 → Continue → OK. Depois: Analyze › Compare Means › Means… (`{cov_n}` BY `{rec['name']}`)",
                 "syntax": f"RECODE {cov_n} " + " ".join(rr_sy) + f" INTO {rec['name']}.\nVARIABLE LABELS {rec['name']} '{rec['label']}'.\nVALUE LABELS {rec['name']} " + " ".join(f"{i+1} '{lab}'" for i, (_, _, lab) in enumerate(cuts)) + f".\nVARIABLE LEVEL {rec['name']} (ORDINAL).\nEXECUTE.\n\nMEANS TABLES={cov_n} BY {rec['name']}\n  /CELLS=MEAN COUNT STDDEV."},
        "out": table("Report (" + cov_n + ")", [rec["name"], "Mean", "N", "Std. Deviation"],
                     [[f"{k+1} {cuts[k][2]}", f"{gc[k]['mean']:.4f}", gc[k]["n"], f"{gc[k]['sd']:.4f}"] for k in range(4)] +
                     [["Total", f"{R['dcov']['mean']:.4f}", c["n"], f"{R['dcov']['sd']:.4f}"]]),
        "sol": " · ".join(f"Grupo {k+1}: n = {gc[k]['n']}, média = {f(gc[k]['mean'], 2)}, DP = {f(gc[k]['sd'], 3)}" for k in range(4)) + ".",
    })

    # ---- Q11
    swG, lev, levm = R["swG"], R["levG"], R["levGmed"]
    bad = [str(k + 1) for k in range(4) if swG[k]["p"] <= ALPHA]
    fields11 = [yesno("norm", "Normalidade em todos os grupos?", R["normG"], ("Todos os grupos têm Shapiro-Wilk p > 0,05 → **Sim**." if R["normG"] else "Basta **um** grupo violar a normalidade: o grupo " + ", ".join(bad) + " tem Shapiro-Wilk p < 0,05 → **Não**."))]
    for k in range(4):
        fields11.append(pnum(f"p{k+1}", f"Grupo {k+1}: p do Shapiro-Wilk", swG[k]["p"], [(swG[k]["W"], "Este é o **W** (estatística), não o p (*Sig.*).")]))
    fields11 += [
        yesno("hom", "Homogeneidade das variâncias?", R["homG"], f"Levene p = {fp(lev['p'])} " + ("> 0,05 → não se rejeita a igualdade das variâncias → **Sim**." if R["homG"] else "< 0,05 → variâncias diferentes → **Não**.")),
        num("levF", "Estatística de Levene", round(lev["F"], 3), 0.01, None, [(levm["F"], "Este é o Levene **baseado na mediana** (*Based on Median*). Use a primeira linha, *Based on Mean*.")]),
        pnum("levp", "p do Levene", lev["p"], [(levm["p"], "Este é o p do Levene **baseado na mediana**. Use a linha *Based on Mean*.")]),
        yesno("ok", "Poderia efetuar a ANOVA?", R["anova_ok"], ("Normalidade em todos os grupos e variâncias homogêneas → os pressupostos estão cumpridos → **Sim**." if R["anova_ok"] else "A ANOVA exige **os dois** pressupostos. Como " + ("a normalidade" if not R["normG"] else "") + (" e " if (not R["normG"] and not R["homG"]) else "") + ("a homogeneidade" if not R["homG"] else "") + " não se verifica" + ("m" if (not R["normG"] and not R["homG"]) else "") + ", a resposta é **Não**: use a alternativa não paramétrica (Kruskal-Wallis).")),
    ]
    Q.append({
        "q": f"Verifique se a nova variável (**{rec['name']}**) cumpre os pressupostos necessários para efetuar uma ANOVA de `{B_n}`.",
        "fields": fields11, "grid": 1,
        "theory": [
            "A **ANOVA one-way** compara as médias de 3 ou mais grupos independentes. Pressupostos: (1) observações independentes; (2) **normalidade em cada grupo** (ou dos resíduos); (3) **homogeneidade das variâncias** (homocedasticidade).",
            "**Normalidade**: Shapiro-Wilk **por grupo** (em *Explore*, coloque a variável de grupo em *Factor List*). Um único grupo com p < 0,05 já compromete o pressuposto. Com grupos tão pequenos (4 a 6 casos) o teste tem pouco poder, por isso olhe também os Q-Q plots e os boxplots.",
            "**Homogeneidade**: teste de **Levene**, $H_0$: as variâncias são iguais em todos os grupos. No SPSS 27+ ele aparece em quatro linhas; use a primeira, *Based on Mean*.",
            "Se só a homogeneidade falhar (dados normais), a alternativa mais adequada é a **ANOVA de Welch** (*Options › Welch*), com post-hoc de Games-Howell. Se a normalidade falhar com grupos pequenos, use o **Kruskal-Wallis**.",
        ],
        "spss": {"menu": f"Analyze › Descriptive Statistics › Explore… → `{B_n}` em *Dependent List*, `{rec['name']}` em *Factor List* → *Plots*: Normality plots with tests → OK. Depois: Analyze › Compare Means › One-Way ANOVA… → *Options*: **Homogeneity of variance test**",
                 "syntax": f"EXAMINE VARIABLES={B_n} BY {rec['name']}\n  /PLOT BOXPLOT NPPLOT\n  /NOTOTAL.\n\nONEWAY {B_n} BY {rec['name']}\n  /STATISTICS DESCRIPTIVES HOMOGENEITY."},
        "out": table("Tests of Normality (" + B_n + ", Shapiro-Wilk)", [rec["name"], "Statistic", "df", "Sig."],
                     [[f"{k+1}", f"{swG[k]['W']:.3f}", R["gB"][k]["n"], spss_p(swG[k]["p"])] for k in range(4)]) + "\n\n" +
               table("Tests of Homogeneity of Variances", ["", "Levene Statistic", "df1", "df2", "Sig."],
                     [["Based on Mean", f"{lev['F']:.3f}", 3, c["n"] - 4, spss_p(lev["p"])], ["Based on Median", f"{levm['F']:.3f}", 3, c["n"] - 4, spss_p(levm["p"])], ["...", "", "", "", ""]]),
        "sol": "Shapiro-Wilk por grupo: " + "; ".join(f"grupo {k+1}: W = {f(swG[k]['W'], 3)}, p = {fp(swG[k]['p'])}" for k in range(4)) + ". " +
               f"Levene (*Based on Mean*): {f(lev['F'], 3)}, p = {fp(lev['p'])}. " +
               ("Pressupostos cumpridos → **pode** fazer a ANOVA." if R["anova_ok"] else "Pressupostos **não** cumpridos → **não** se deve fazer a ANOVA; use o Kruskal-Wallis."),
    })

    # ---- Q12
    an, kw = R["anova"], R["kw"]
    aok = R["anova_ok"]
    gp = R["global_p"]
    tr12 = {1 if aok else 0: ("Os pressupostos foram cumpridos (questão 11), então use a **ANOVA**, que tem mais poder do que o Kruskal-Wallis." if aok else "Os pressupostos da ANOVA **não** foram cumpridos (questão 11), então use o **Kruskal-Wallis**.")}
    Q.append({
        "q": c["q12txt"] + " Escolha o teste adequado (com base na questão anterior).",
        "fields": [
            choice("test", "Teste escolhido", ["ANOVA one-way", "Kruskal-Wallis"], 0 if aok else 1, tr12),
            num("stat", "Estatística do teste (F ou H)", round(an["F"] if aok else kw["H"], 3), 0.01, None, [((kw["H"] if aok else an["F"]), "Esta é a estatística do **outro** teste. " + tr12[1 if aok else 0])]),
            pnum("p", "Valor de p", gp, [((kw["p"] if aok else an["p"]), "Este é o p do **outro** teste. " + tr12[1 if aok else 0]), (R["levG"]["p"], "Este é o p do **Levene** (pressuposto), não do teste de comparação.")]),
            yesno("yn", "Existem diferenças entre os grupos?", R["global_sig"], f"p = {fp(gp)} " + ("< 0,05 → rejeita-se $H_0$ de igualdade → **Sim**, pelo menos um grupo difere." if R["global_sig"] else "> 0,05 → não se rejeita $H_0$ → **Não** há evidência de diferenças.")),
        ],
        "theory": [
            "**ANOVA one-way**: $H_0: \\mu_1 = \\mu_2 = \\mu_3 = \\mu_4$. $F = QM_{entre}/QM_{dentro}$, a razão entre a variação **entre** os grupos (sinal) e a variação **dentro** dos grupos (ruído). Sob $H_0$, $F \\approx 1$ (Módulo 8).",
            "**Kruskal-Wallis**: alternativa não paramétrica. Ordena todos os valores, calcula o posto médio de cada grupo e testa se as distribuições são iguais. A estatística H segue aproximadamente uma $\\chi^2$ com $k - 1$ graus de liberdade (Módulo 9).",
            "Um resultado significativo diz apenas que **pelo menos um** grupo difere de outro. Para saber quais, é preciso o post-hoc (próxima questão). Por que não vários testes t? Com 4 grupos há 6 pares, e o erro tipo I acumulado chegaria a cerca de 26%.",
        ],
        "spss": ({"menu": f"Analyze › Compare Means › One-Way ANOVA… → `{B_n}` em *Dependent List*, `{rec['name']}` em *Factor* → OK",
                  "syntax": f"ONEWAY {B_n} BY {rec['name']}\n  /STATISTICS DESCRIPTIVES HOMOGENEITY."} if aok else
                 {"menu": f"Analyze › Nonparametric Tests › Legacy Dialogs › K Independent Samples… → `{B_n}` em *Test Variable List*, `{rec['name']}` em *Grouping Variable* → *Define Range*: 1 a 4 → **Kruskal-Wallis H** → OK",
                  "syntax": f"NPAR TESTS\n  /K-W={B_n} BY {rec['name']}(1 4)."}),
        "out": (table("ANOVA (" + B_n + ")", ["", "Sum of Squares", "df", "Mean Square", "F", "Sig."],
                      [["Between Groups", f"{an['ssb']:.3f}", an["df1"], f"{an['msb']:.3f}", f"{an['F']:.3f}", spss_p(an["p"])],
                       ["Within Groups", f"{an['ssw']:.3f}", an["df2"], f"{an['msw']:.3f}", "", ""],
                       ["Total", f"{an['ssb'] + an['ssw']:.3f}", an["df1"] + an["df2"], "", "", ""]]) if aok else
                table("Ranks", [rec["name"], "N", "Mean Rank"], [[k + 1, R["gB"][k]["n"], f"{kw['mean_ranks'][k]:.2f}"] for k in range(4)]) + "\n\n" +
                table("Test Statistics (Kruskal-Wallis)", ["", B_n], [["Kruskal-Wallis H", f"{kw['H']:.3f}"], ["df", kw["df"]], ["Asymp. Sig.", spss_p(kw["p"])]])),
        "sol": (f"ANOVA: $F({an['df1']}, {an['df2']}) = {f(an['F'], 3)}$, **p = {fp(gp)}**, $\\eta^2 = {f(an['eta2'], 2)}$. " if aok else f"Kruskal-Wallis: $H({kw['df']}) = {f(kw['H'], 3)}$, **p = {fp(gp)}**. ") +
               ("Há diferença entre pelo menos dois grupos." if R["global_sig"] else "Não há diferença significativa entre os grupos."),
    })

    # ---- Q13
    post = R["post"]
    f13 = []
    vf_msg = lambda pv: f"p = {fp(pv)} " + ("< 0,05 → **V** (diferença significativa)." if pv < ALPHA else "> 0,05 → **F** (sem diferença significativa).")
    lsd_msg = "Este é o p **sem correção** (LSD, ou um t entre os dois grupos). O post-hoc existe justamente para corrigir o p pelas múltiplas comparações."
    if aok:
        # Depois da ANOVA a disciplina recomenda o Bonferroni; o Tukey também é aceito.
        # O aluno indica qual usou e os p são conferidos com esse método.
        f13.append({**choice("met", "Post-hoc usado", ["Bonferroni", "Tukey"], 0), "any": True})
    for (i, j) in PAIRS:
        pv = post[(i, j)]
        if aok:
            pb = R["bonf"][(i, j)]
            traps_t = [(R["lsd"][(i, j)], lsd_msg + " Use a coluna *Sig.* da tabela *Multiple Comparisons*, na linha do **Tukey HSD**."),
                       (pb, "Este é o p do **Bonferroni**, mas você indicou que usou o Tukey. Confira em que bloco da tabela *Multiple Comparisons* está lendo (o SPSS mostra um bloco por método).")]
            traps_b = [(R["lsd"][(i, j)], lsd_msg + " Use a coluna *Sig.* no bloco **Bonferroni** da tabela *Multiple Comparisons*."),
                       (R["lsd"][(i, j)] * 4, "Você multiplicou o p por 4 (as comparações pedidas). O SPSS multiplica pelas **6** comparações possíveis entre 4 grupos; use o valor que ele mostra."),
                       (pv, "Este é o p do **Tukey**, mas você indicou que usou o Bonferroni. Confira em que bloco da tabela *Multiple Comparisons* está lendo.")]
            fv = vf(f"s{i}{j}", f"Grupo {i} × grupo {j}: há diferença?", pb < ALPHA, vf_msg(pb))
            fv.update(dep="met", alt={"1": {"a": 0 if pv < ALPHA else 1, "traps": {str(1 if pv < ALPHA else 0): vf_msg(pv)}}})
            fpv = pnum(f"p{i}{j}", f"Grupo {i} × grupo {j}: valor de p", pb, traps_b)
            alt = pnum("x", "", pv, traps_t)
            fpv.update(dep="met", alt={"1": {k: alt[k] for k in ("a", "traps", "lt") if k in alt}})
            if "lt" in fpv and "lt" not in alt:
                fpv["alt"]["1"]["lt"] = False
            f13 += [fv, fpv]
        else:
            traps = [(R["dunn"][(i, j)]["p"], "Você usou a coluna **Sig.** (sem correção). Use **Adj. Sig.**, corrigida por Bonferroni para as 6 comparações."), (R["tukey"][(i, j)]["p"], "Este é o p do **Tukey**, que pressupõe a ANOVA. Como os pressupostos falharam, o post-hoc adequado são as comparações par a par do Kruskal-Wallis (Dunn-Bonferroni).")]
            f13.append(vf(f"s{i}{j}", f"Grupo {i} × grupo {j}: há diferença?", pv < ALPHA, vf_msg(pv)))
            f13.append(pnum(f"p{i}{j}", f"Grupo {i} × grupo {j}: valor de p", pv, traps))
    out13 = (table("Multiple Comparisons (" + B_n + ")", ["", "(I)", "(J)", "Mean Difference (I-J)", "Sig."],
                   [["Tukey HSD" if k == 0 else "", i, j, f"{R['tukey'][(i, j)]['diff']:.4f}", spss_p(R["tukey"][(i, j)]["p"])] for k, (i, j) in enumerate(sorted(R["tukey"]))] +
                   [["Bonferroni" if k == 0 else "", i, j, f"{R['tukey'][(i, j)]['diff']:.4f}", spss_p(R["bonf"][(i, j)])] for k, (i, j) in enumerate(sorted(R["bonf"]))],
                   "O SPSS mostra os blocos na ordem do diálogo (Tukey antes de Bonferroni). Leia o bloco do método que você escolheu.") if aok else
             table("Pairwise Comparisons (" + B_n + ")", ["Sample 1-Sample 2", "Test Statistic", "Std. Error", "Std. Test Statistic", "Sig.", "Adj. Sig."],
                   [[f"{i}-{j}", f"{R['dunn'][(i, j)]['stat']:.3f}", f"{R['dunn'][(i, j)]['se']:.3f}", f"{R['dunn'][(i, j)]['z']:.3f}", spss_p(R["dunn"][(i, j)]["p"]), spss_p(R["dunn"][(i, j)]["adj"])] for (i, j) in sorted(R["dunn"])],
                   "Significance values have been adjusted by the Bonferroni correction for multiple tests."))
    Q.append({
        "q": ("Em relação à questão anterior, aplique o teste *a posteriori* de **Bonferroni** (ou de Tukey; indique qual usou)" if aok else "Em relação à questão anterior, faça as **comparações múltiplas** (par a par) adequadas ao teste escolhido") +
             " e diga se, entre os grupos indicados, existem diferenças significativas (V ou F) e qual o valor de p.",
        "fields": f13, "grid": 2,
        "theory": [
            "Os testes **post-hoc** (*a posteriori*) comparam os grupos dois a dois, **corrigindo o p** para o número de comparações, de modo que o erro tipo I global fique em 5%.",
            "Depois da ANOVA, a disciplina recomenda o **Bonferroni**: ele pega o p de cada comparação sem correção (LSD) e multiplica pelo número de comparações, ou seja, cada par precisa de p < 0,05/6 ≈ 0,0083. É simples, vale para qualquer tipo de teste e é **conservador** (protege bem contra falsos positivos). Atenção: o SPSS multiplica sempre pelas **6** comparações possíveis entre 4 grupos, mesmo que você só vá olhar 4; vale o valor que o SPSS mostra na coluna *Sig.* do bloco Bonferroni.",
            "O **Tukey HSD** também é aceito aqui: foi feito para comparar **todos os pares** depois de uma ANOVA com variâncias homogêneas e costuma dar p um pouco menores que o Bonferroni (tem mais poder). Os dois controlam o erro tipo I global em 5%; quando discordam, é porque o p está perto do limite." if aok else "Depois da ANOVA, o padrão é o **Tukey HSD** (ou o Bonferroni, para poucas comparações específicas).",
            "Depois do Kruskal-Wallis, o SPSS faz o **teste de Dunn com correção de Bonferroni** (menu *Nonparametric Tests › Independent Samples*, opção *All pairwise*); use a coluna **Adj. Sig.**",
            ("Atenção: aqui a ANOVA **não** foi significativa (questão 12). Nesse caso, o normal é **não** fazer post-hoc: não há diferença global para explicar. Os valores servem para confirmar que nenhum par difere." if not R["global_sig"] else
             "O post-hoc só faz sentido quando o teste global (questão 12) é significativo. Pode acontecer de o teste global ser significativo e só um ou dois pares diferirem."),
        ],
        "spss": ({"menu": f"Analyze › Compare Means › One-Way ANOVA… → *Post Hoc…* → marque **Bonferroni** (ou **Tukey**) → Continue → OK",
                  "syntax": f"ONEWAY {B_n} BY {rec['name']}\n  /POSTHOC=BONFERRONI TUKEY ALPHA(0.05)."} if aok else
                 {"menu": f"Analyze › Nonparametric Tests › Independent Samples… → *Fields*: `{B_n}` em *Test Fields*, `{rec['name']}` em *Groups* (tem de estar como Nominal/Ordinal) → *Settings*: Customize tests → **Kruskal-Wallis 1-way ANOVA**, *Multiple comparisons: All pairwise* → Run. Dê duplo clique na tabela de resultados e escolha *Pairwise Comparisons*.",
                  "syntax": f"NPTESTS\n  /INDEPENDENT TEST ({B_n}) GROUP ({rec['name']})\n    KRUSKAL_WALLIS(COMPARE=PAIRWISE)\n  /CRITERIA ALPHA=0.05 CILEVEL=95."}),
        "out": out13,
        "sol": (" · ".join(f"{i} × {j}: p = {fp(post[(i, j)])} → {'V' if post[(i, j)] < ALPHA else 'F'}" for (i, j) in PAIRS) + "." if not aok else
                "**Bonferroni:** " + " · ".join(f"{i} × {j}: p = {fp(R['bonf'][(i, j)])} → {'V' if R['bonf'][(i, j)] < ALPHA else 'F'}" for (i, j) in PAIRS) + "." +
                " **Tukey** (também aceito): " + " · ".join(f"{i} × {j}: p = {fp(post[(i, j)])} → {'V' if post[(i, j)] < ALPHA else 'F'}" for (i, j) in PAIRS) + "."),
    })
    return Q


# ---------------------------------------------------------------- saída
def write_data(c, df):
    V = c["vars"]
    out = df.rename(columns={"sexo": V["sexo"][0], "cat": V["cat"][0], "A": V["A"][0], "B": V["B"][0], "cov": V["cov"][0]})
    d = c["dec"]
    for k in ("A", "B"):
        out[V[k][0]] = out[V[k][0]].astype(int) if d == 0 else out[V[k][0]].astype(float)
    os.makedirs(os.path.join(ROOT, "dados", "simulados"), exist_ok=True)
    base = os.path.join(ROOT, "dados", "simulados", c["file"])
    out.to_csv(base + ".csv", index=False)
    labels = {"id": "Identificação do participante", V["sexo"][0]: V["sexo"][1], V["cat"][0]: V["cat"][1],
              V["A"][0]: V["A"][1], V["B"][0]: V["B"][1], V["cov"][0]: V["cov"][1]}
    vlabels = {V["sexo"][0]: {float(k): v for k, v in V["sexo"][2].items()}, V["cat"][0]: {float(k): v for k, v in V["cat"][2].items()}}
    fmt = {"id": "F8.0", V["sexo"][0]: "F8.0", V["cat"][0]: "F8.0", V["cov"][0]: "F8.0",
           V["A"][0]: f"F8.{d}", V["B"][0]: f"F8.{d}"}
    meas = {"id": "nominal", V["sexo"][0]: "nominal", V["cat"][0]: "nominal", V["A"][0]: "scale", V["B"][0]: "scale", V["cov"][0]: "scale"}
    pyreadstat.write_sav(out, base + ".sav", file_label=c["title"], column_labels=labels, variable_value_labels=vlabels,
                         variable_format=fmt, variable_measure=meas)
    return [{"name": "id", "label": labels["id"], "type": "Nominal", "values": ""}] + [
        {"name": V[k][0], "label": V[k][1], "type": "Nominal" if k in ("sexo", "cat") else "Escala",
         "values": ", ".join(f"{a} = {b}" for a, b in V[k][2].items()) if k in ("sexo", "cat") else c["unit"] if k in ("A", "B") else ""}
        for k in ("sexo", "cat", "A", "B", "cov")]


def tidy(o):
    """Ajusta a redação de valores muito pequenos ("p = < 0,001" → "p < 0,001")."""
    if isinstance(o, dict):
        return {k: tidy(v) for k, v in o.items()}
    if isinstance(o, list):
        return [tidy(v) for v in o]
    if isinstance(o, str):
        for a, b in [("< 0,001/2", "(< 0,001)/2"), ("p = **< 0,001**", "**p < 0,001**"), ("= **< 0,001**", "**< 0,001**"),
                     ("p = < 0,001", "p < 0,001"), ("= < 0,001", "< 0,001"), ("p = **", "**p = ")]:
            o = o.replace(a, b)
    return o


def main():
    cases = []
    for c in CASES:
        seed, df, R = find(c)
        dic = write_data(c, df)
        cases.append({"id": c["id"], "title": c["title"], "tema": c["tema"], "n": c["n"], "file": c["file"],
                      "story": c["story"], "vars": dic, "questions": tidy(build_questions(c, R))})
        print(f"{c['id']}: semente {seed}")
    os.makedirs(os.path.join(ROOT, "js", "simulados"), exist_ok=True)
    with open(os.path.join(ROOT, "js", "simulados", "casos.js"), "w", encoding="utf-8") as fh:
        fh.write("/* Gerado por tools/gerar_simulados.py. Não edite à mão: altere o gerador e rode-o de novo. */\n")
        fh.write("const SIMULADOS = " + json.dumps(cases, ensure_ascii=False, indent=1) + ";\n")


if __name__ == "__main__":
    main()
