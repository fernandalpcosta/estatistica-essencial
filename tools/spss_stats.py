"""Estatísticas calculadas como o SPSS as apresenta (versão 27 ou posterior).

Usado por gerar_simulados.py para produzir o gabarito dos simulados de prova.
"""
import itertools
import numpy as np
from scipy import stats


def desc(x):
    x = np.asarray(x, float)
    n = len(x)
    sd = x.std(ddof=1)
    return {"n": n, "mean": x.mean(), "sd": sd, "se": sd / np.sqrt(n), "var": sd ** 2,
            "median": float(np.median(x)), "min": x.min(), "max": x.max()}


def shapiro(x):
    w, p = stats.shapiro(np.asarray(x, float))
    return {"W": float(w), "p": float(p)}


def ks_lilliefors_D(x):
    """Estatística D do Kolmogorov-Smirnov (correção de Lilliefors), como na tabela Tests of Normality."""
    x = np.sort(np.asarray(x, float))
    n = len(x)
    z = stats.norm.cdf((x - x.mean()) / x.std(ddof=1))
    i = np.arange(1, n + 1)
    return float(max(np.max(i / n - z), np.max(z - (i - 1) / n)))


def one_sample_t(x, mu0):
    x = np.asarray(x, float)
    r = stats.ttest_1samp(x, mu0)
    d = desc(x)
    return {"t": float(r.statistic), "df": len(x) - 1, "p2": float(r.pvalue),
            "p1_obs": float(r.pvalue) / 2, "diff": d["mean"] - mu0, **d}


def levene_mean(*groups):
    f, p = stats.levene(*groups, center="mean")
    return {"F": float(f), "p": float(p)}


def levene_median(*groups):
    f, p = stats.levene(*groups, center="median")
    return {"F": float(f), "p": float(p)}


def ind_t(a, b):
    lev = levene_mean(a, b)
    st = stats.ttest_ind(a, b, equal_var=True)
    we = stats.ttest_ind(a, b, equal_var=False)
    na, nb = len(a), len(b)
    va, vb = np.var(a, ddof=1), np.var(b, ddof=1)
    df_w = (va / na + vb / nb) ** 2 / ((va / na) ** 2 / (na - 1) + (vb / nb) ** 2 / (nb - 1))
    return {"lev": lev, "t_st": float(st.statistic), "p_st": float(st.pvalue), "df_st": na + nb - 2,
            "t_we": float(we.statistic), "p_we": float(we.pvalue), "df_we": float(df_w),
            "diff": float(np.mean(a) - np.mean(b))}


def pearson(x, y):
    r, p = stats.pearsonr(x, y)
    return {"r": float(r), "p": float(p)}


def spearman(x, y):
    r, p = stats.spearmanr(x, y)
    return {"r": float(r), "p": float(p)}


def paired_t(a, b):
    r = stats.ttest_rel(a, b)
    d = np.asarray(a, float) - np.asarray(b, float)
    return {"t": float(r.statistic), "p": float(r.pvalue), "df": len(d) - 1,
            "dmean": d.mean(), "dsd": d.std(ddof=1)}


def wilcoxon_spss(a, b):
    """Wilcoxon (Legacy Dialogs › 2 Related Samples): aproximação normal, correção de empates,
    sem correção de continuidade, diferenças nulas descartadas. Z é dado pelo SPSS com sinal negativo."""
    d = np.asarray(b, float) - np.asarray(a, float)
    d = d[d != 0]
    n = len(d)
    rk = stats.rankdata(np.abs(d))
    wpos, wneg = rk[d > 0].sum(), rk[d < 0].sum()
    _, cnt = np.unique(np.abs(d), return_counts=True)
    var = n * (n + 1) * (2 * n + 1) / 24 - (cnt ** 3 - cnt).sum() / 48
    z = (min(wpos, wneg) - n * (n + 1) / 4) / np.sqrt(var)
    return {"Z": float(z), "p": float(2 * stats.norm.sf(abs(z))), "n_eff": n,
            "w_neg": float(wneg), "w_pos": float(wpos)}


def mann_whitney_spss(a, b):
    u = stats.mannwhitneyu(a, b, alternative="two-sided", method="asymptotic", use_continuity=False)
    na, nb = len(a), len(b)
    U = min(u.statistic, na * nb - u.statistic)
    allv = np.concatenate([a, b])
    _, cnt = np.unique(allv, return_counts=True)
    N = na + nb
    var = na * nb / 12 * ((N + 1) - (cnt ** 3 - cnt).sum() / (N * (N - 1)))
    z = (U - na * nb / 2) / np.sqrt(var)
    return {"U": float(U), "Z": float(z), "p": float(u.pvalue)}


def anova(groups):
    f = stats.f_oneway(*groups)
    k, N = len(groups), sum(len(g) for g in groups)
    allv = np.concatenate(groups)
    ssb = sum(len(g) * (np.mean(g) - allv.mean()) ** 2 for g in groups)
    ssw = sum(((np.asarray(g) - np.mean(g)) ** 2).sum() for g in groups)
    return {"F": float(f.statistic), "p": float(f.pvalue), "df1": k - 1, "df2": N - k,
            "ssb": float(ssb), "ssw": float(ssw), "msb": ssb / (k - 1), "msw": ssw / (N - k),
            "eta2": float(ssb / (ssb + ssw))}


def tukey(groups):
    r = stats.tukey_hsd(*groups)
    out = {}
    for i, j in itertools.combinations(range(len(groups)), 2):
        out[(i + 1, j + 1)] = {"diff": float(np.mean(groups[i]) - np.mean(groups[j])), "p": float(r.pvalue[i, j])}
    return out


def kruskal(groups):
    h, p = stats.kruskal(*groups)
    allv = np.concatenate(groups)
    rk = stats.rankdata(allv)
    idx = np.cumsum([0] + [len(g) for g in groups])
    mr = [float(rk[idx[i]:idx[i + 1]].mean()) for i in range(len(groups))]
    return {"H": float(h), "p": float(p), "df": len(groups) - 1, "mean_ranks": mr}


def dunn_spss(groups):
    """Comparações múltiplas do Kruskal-Wallis no SPSS (Nonparametric Tests › Independent Samples):
    teste de Dunn com correção de Bonferroni."""
    allv = np.concatenate(groups)
    N = len(allv)
    _, cnt = np.unique(allv, return_counts=True)
    base = N * (N + 1) / 12 - (cnt ** 3 - cnt).sum() / (12 * (N - 1))
    mr = kruskal(groups)["mean_ranks"]
    k = len(groups)
    m = k * (k - 1) / 2
    out = {}
    for i, j in itertools.combinations(range(k), 2):
        se = np.sqrt(base * (1 / len(groups[i]) + 1 / len(groups[j])))
        z = (mr[i] - mr[j]) / se
        p = 2 * stats.norm.sf(abs(z))
        out[(i + 1, j + 1)] = {"stat": mr[i] - mr[j], "se": float(se), "z": float(z), "p": float(p), "adj": float(min(1, p * m))}
    return out
