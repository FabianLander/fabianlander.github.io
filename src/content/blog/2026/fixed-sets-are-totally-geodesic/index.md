---
title: "Fixed sets of isometries are totally geodesic"
date: 2026-05-11
description: "Why pointwise fixed sets of isometries of a Riemannian manifold are automatically totally geodesic submanifolds."
draft: true
featured: false
subject:
  - geometry
tags:
  - riemannian-geometry
  - isometries
  - totally-geodesic
  - fixed-points
---

Here is a fact I keep using: if $\phi$ is an isometry of a Riemannian manifold $M$, then every connected component of its fixed point set $\mathrm{Fix}(\phi) = \{p \in M : \phi(p) = p\}$ is a totally geodesic submanifold of $M$.

## The proof

Let $p \in \mathrm{Fix}(\phi)$. Since $\phi$ is an isometry that fixes $p$, the differential $d\phi_p : T_p M \to T_p M$ is a linear isometry of the tangent space. Let $V \subseteq T_p M$ be its $+1$-eigenspace.

The exponential map intertwines $\phi$ and $d\phi_p$ on a neighborhood of $p$:
$$
\phi \circ \exp_p = \exp_p \circ \, d\phi_p.
$$
This is because $\phi$ sends geodesics to geodesics, and the geodesic through $p$ with initial velocity $w$ is sent to the geodesic through $\phi(p) = p$ with initial velocity $d\phi_p(w)$. So on a normal neighborhood, a point $\exp_p(w)$ is fixed by $\phi$ if and only if $w$ is fixed by $d\phi_p$, i.e. $w \in V$. Hence near $p$, the fixed set is $\exp_p(V \cap U)$: a submanifold with $T_p \mathrm{Fix}(\phi) = V$.

Now take $v \in V$. The geodesic $\gamma(t) = \exp_p(tv)$ is sent by $\phi$ to a geodesic with the same initial point $p$ and the same initial velocity $d\phi_p(v) = v$. Uniqueness gives $\phi \circ \gamma = \gamma$, so $\gamma$ stays in the fixed set. Geodesics tangent to the fixed set stay in the fixed set: this is totally geodesic.

## Pointwise vs. setwise

"Fixed by $\phi$" means *pointwise* fixed: $\phi(p) = p$ for every $p$ in the submanifold. Setwise invariance ($\phi(N) = N$) is much weaker and does not imply totally geodesic.

A counterexample: take a small circle $C$ on $S^2$, a circle of latitude that isn't the equator. Rotation about the axis through the poles is an isometry of $S^2$ that preserves $C$ setwise, but $C$ is not totally geodesic (small circles aren't geodesics).
