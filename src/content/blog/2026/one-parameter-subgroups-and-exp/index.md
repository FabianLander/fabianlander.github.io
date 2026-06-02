---
title: "1-parameter subgroups of a Lie group all come from the exponential map"
date: 2026-05-04
description: "Where 1-parameter subgroups come from: the exponential map of the Lie algebra, with no metric required, and in practice just the matrix exponential."
draft: true
featured: false
subject:
  - differential geometry
  - lie groups
tags:
  - one-parameter subgroups
  - Lie groups
  - Lie algebras
  - exponential map
  - matrix exponential
---

Continuing the small series on one-parameter subgroups of isometries,
this one is a step back: where do 1-parameter subgroups come from in
the first place?

The fact:

> Every 1-parameter subgroup of a Lie group $G$ is of the form
> $t \mapsto \exp(tX)$ for a unique $X \in \mathfrak{g}$.

The rest of the post is just unpacking the words in that sentence:
what is $G$, what is $\mathfrak{g}$, what is $\exp$. The punchline at
the end: in every case I've ever cared about, $\exp$ is the matrix
exponential.

---

## Lie group

A *Lie group* is a smooth manifold $G$ together with smooth group
operations: multiplication $G \times G \to G$ and inversion
$G \to G$ are both smooth.

Examples I'll keep in mind:

- $GL_n(\mathbb{R})$, the invertible $n \times n$ real matrices.
- $O(n)$, $SO(n)$, $U(n)$, $SU(n)$, the orthogonal and unitary
  groups.

These are *matrix Lie groups*, and they're the only ones I ever
actually compute with.

## Lie algebra

The *Lie algebra* of $G$ is the tangent space at the identity:

$$
\mathfrak{g} := T_e G.
$$

That's the only piece I'll use here. (There's a Lie bracket on
$\mathfrak{g}$ that captures the non-commutativity of $G$, but I'm
skipping it for this post; it isn't load-bearing for the headline
fact, and it deserves its own entry.)

For matrix Lie groups, $\mathfrak{g}$ sits naturally inside
$M_n(\mathbb{R})$, the space of $n \times n$ matrices:

- $\mathfrak{gl}_n(\mathbb{R}) = M_n(\mathbb{R})$, all matrices.
- $\mathfrak{o}(n) = \mathfrak{so}(n)$, skew-symmetric matrices.

A matrix $A$ is *skew-symmetric* if $A^T = -A$. Diagonal entries are
zero, and entries across the diagonal are negatives of each other.
The reason these are $\mathfrak{so}(n)$ is a one-line differentiation:
a curve $R(t)$ in $SO(n)$ with $R(0) = I$ satisfies
$R(t)^T R(t) = I$, and differentiating at $t = 0$ gives
$R'(0)^T + R'(0) = 0$. So tangent vectors at the identity are exactly
the skew-symmetric matrices.

## The exponential map

A *1-parameter subgroup* of $G$ is a smooth homomorphism
$\gamma : \mathbb{R} \to G$, so $\gamma(s+t) = \gamma(s)\gamma(t)$
and $\gamma(0) = e$.

Differentiating at $0$ gives a tangent vector
$X = \gamma'(0) \in T_e G = \mathfrak{g}$.

The basic theorem:

> **Theorem (existence and uniqueness of $\gamma_X$).** For every
> $X \in \mathfrak{g}$ there is a unique 1-parameter subgroup
> $\gamma_X : \mathbb{R} \to G$ with $\gamma_X'(0) = X$.

The exponential map is

$$
\exp : \mathfrak{g} \longrightarrow G, \qquad \exp(X) := \gamma_X(1).
$$

That's the whole definition. No metric, no coordinates. Just the
unique 1-parameter subgroup with prescribed initial velocity, evaluated
at time $1$.

The headline fact follows immediately. Given any 1-parameter subgroup
$\gamma$, set $X = \gamma'(0)$. Then $t \mapsto \gamma(t)$ and
$t \mapsto \gamma_X(t) = \exp(tX)$ are both 1-parameter subgroups
with the same initial velocity, so by uniqueness they agree.

## Why the theorem is true

The whole post pivots on the existence-and-uniqueness theorem above.
Here is the sketch.

Every $X \in \mathfrak{g} = T_e G$ extends uniquely to a
*left-invariant* vector field $\tilde X$ on $G$, defined by

$$
\tilde X(g) := (dL_g)_e \, X,
$$

where $L_g(h) = gh$ is left multiplication by $g$. By construction
$\tilde X(e) = X$, and left-invariance is the statement that
$(dL_g) \tilde X = \tilde X \circ L_g$.

Two facts about $\tilde X$. First, it is smooth, since left
translation is smooth and we are pushing $X$ around by its
differential. Second, it is *complete*: its flow $\phi_t$ exists
for all $t \in \mathbb{R}$, not just on some small interval around
$0$.

Completeness is the part that's worth slowing down on, because for
generic vector fields it can fail. (On $\mathbb{R}$, the field
$x^2 \partial_x$ has integral curves that escape to infinity in
finite time.) For $\tilde X$, two pieces conspire to rule that out.

*Uniform local existence.* Standard ODE theory gives some
$\epsilon > 0$ such that $\phi_t(e)$ is defined for $|t| < \epsilon$.
Left-invariance promotes this to a uniform statement: the curve
$t \mapsto g \cdot \phi_t(e)$ is an integral curve of $\tilde X$
starting at $g$ (since $L_g$ takes integral curves of $\tilde X$ to
integral curves of $\tilde X$), so $\phi_t(g) = g \cdot \phi_t(e)$
is defined for $|t| < \epsilon$ at *every* $g \in G$. The same
$\epsilon$ works everywhere on the group, with no shrinkage as you
move around.

*Bootstrapping via the group property of flows.* Once we have the
flow on $(-\epsilon, \epsilon)$ globally on $G$, the relation
$\phi_{t+s} = \phi_t \circ \phi_s$ extends it. For any $t \in
\mathbb{R}$, choose $n$ large enough that $|t/n| < \epsilon$, and
define $\phi_t := \phi_{t/n}^n$. This is consistent (different
choices of $n$ agree on the overlap by the group law) and gives a
flow defined for all $t$.

That's what "completeness is automatic" means here: it falls out
from left-invariance plus standard ODE theory, with no further
hypotheses on $G$.

Let $\phi_t$ be the flow of $\tilde X$ and define $\gamma_X(t) :=
\phi_t(e)$. Left-invariance gives $L_g \circ \phi_t = \phi_t \circ
L_g$, so $\phi_t(g) = g \cdot \phi_t(e) = g \cdot \gamma_X(t)$. Then

$$
\gamma_X(s+t) = \phi_{s+t}(e) = \phi_t(\phi_s(e)) = \phi_t(\gamma_X(s))
= \gamma_X(s) \cdot \gamma_X(t).
$$

So $\gamma_X$ is a 1-parameter subgroup. Its initial velocity is
$\gamma_X'(0) = \tilde X(e) = X$.

Uniqueness: if $\eta : \mathbb{R} \to G$ is any 1-parameter subgroup
with $\eta'(0) = X$, differentiate $\eta(t+s) = \eta(t)\eta(s)$ in
$s$ at $s = 0$ to get $\eta'(t) = (dL_{\eta(t)})_e X = \tilde
X(\eta(t))$. So $\eta$ is also an integral curve of $\tilde X$
through $e$. Integral curves of a smooth vector field are unique,
so $\eta = \gamma_X$.

For a careful version of this argument, see Lee, *Introduction to
Smooth Manifolds* (2nd ed., 2013), Theorem 20.1 (one-parameter
subgroups are exactly the maximal integral curves of left-invariant
vector fields through the identity), which uses Theorem 9.18
(left-invariant vector fields on a Lie group are complete).

## Aside: it agrees with the Riemannian exponential

This definition didn't use a metric. But if you put a *bi-invariant*
Riemannian metric on $G$ (which exists e.g. when $G$ is compact),
geodesics through $e$ are exactly the 1-parameter subgroups. So the
Riemannian exponential at $e$ coincides with the Lie group
exponential.

Two "exp"s that I had encountered as separate objects (geodesic exp
on a Riemannian manifold, and the formula on Lie groups) are the
same map in this setting.

## The punchline: it's the matrix exponential

For any matrix Lie group $G \subseteq GL_n(\mathbb{R})$ with Lie
algebra $\mathfrak{g} \subseteq M_n(\mathbb{R})$, the abstract
exponential above coincides with the matrix exponential:

$$
\exp(X) = \sum_{k=0}^{\infty} \frac{X^k}{k!}.
$$

Every Lie group I've ever computed with is a matrix Lie group, so
this power series is the thing I actually use. The abstract definition
is conceptual scaffolding; the matrix exp is the calculation.
