---
title: "Geodesics on quadrics are 2-plane slices"
date: 2026-05-07
description: "A clean general fact about geodesics of level sets of non-degenerate quadratic forms"
draft: true
featured: false
subject:
  - geometry
tags:
  - quadratic-forms
  - gram-matrix
  - geodesics
  - quadrics
---

We will derive a clean way to think about geodesics of regular level sets of quadratic forms. 

The conclusion will be that the geodesic on the quadric through $p$ in direction $v$ is the intersection of the quadric with the 2-plane $\mathrm{span}(p, v)$. Geodesics are flat slices.

## Setup

Let $q$ be a non-degenerate quadratic form on $\R^n$, with associated symmetric bilinear form $\langle \cdot, \cdot \rangle_q$. Fix a regular value $\ell$ and let
$$
L = q^{-1}(\ell) \subseteq \R^n
$$
be the level set, equipped with the (possibly indefinite) metric induced by $\langle \cdot, \cdot \rangle_q$. This is the quadric. Different choices of $q$ and $\ell$ give spheres, hyperboloids, the de Sitter and anti-de Sitter quadrics, and so on.

Pick a point $p \in L$ and a tangent vector $v \in T_p L$. Differentiating $q(p) = \ell$ along curves at $p$ gives $T_p L = p^\perp$, so $\langle p, v \rangle_q = 0$ automatically. Assume $v$ is not $q$-null, $q(v) \neq 0$, and let
$$
\Pi := \mathrm{span}(p, v) \subseteq \R^n.
$$

## Gram matrices

Given vectors $w_1, \ldots, w_k$ in a vector space carrying a symmetric bilinear form $\langle \cdot, \cdot \rangle$, their **Gram matrix** is the $k \times k$ matrix
$$
G_{ij} = \langle w_i, w_j \rangle.
$$
It is the matrix of the form $\langle \cdot, \cdot \rangle$ restricted to $\mathrm{span}(w_1, \ldots, w_k)$, expressed in the basis $(w_1, \ldots, w_k)$. The fact we will use:

> $G$ is invertible if and only if $\langle \cdot, \cdot \rangle$ is non-degenerate on the span of the $w_i$.

For our basis $(p, v)$ of $\Pi$,
$$
G = \begin{pmatrix} \langle p, p \rangle_q & \langle p, v \rangle_q \\ \langle v, p \rangle_q & \langle v, v \rangle_q \end{pmatrix}
  = \begin{pmatrix} \ell & 0 \\ 0 & q(v) \end{pmatrix}.
$$
The off-diagonals vanish because $v$ is tangent to $L$ at $p$. So $\det G = \ell \cdot q(v) \neq 0$, and $q$ is non-degenerate on $\Pi$.

## The reflection through $\Pi$

Non-degeneracy of $q|_\Pi$ gives $\Pi \cap \Pi^\perp = \{0\}$. To see this, suppose $w \in \Pi \cap \Pi^\perp$. Being in $\Pi^\perp$ means $\langle w, u \rangle_q = 0$ for every $u \in \Pi$. Since $w$ itself lies in $\Pi$, it is a vector in $\Pi$ that pairs trivially with every vector in $\Pi$. Non-degeneracy of $q|_\Pi$ says that the only such vector is zero, so $w = 0$.

The same reasoning works at the matrix level: $w \in \Pi \cap \Pi^\perp$ means the coordinate vector of $w$ in the basis $(p, v)$ is in the kernel of the Gram matrix $G$, and we computed $\det G = \ell \cdot q(v) \neq 0$.

Combined with $\dim \Pi^\perp = n - \dim \Pi$ (which uses non-degeneracy of $q$ on all of $\R^n$), this yields the orthogonal decomposition
$$
\R^n = \Pi \oplus \Pi^\perp.
$$
Hence there is a unique $q$-isometry $R_\Pi \in O(q)$ acting as the identity on $\Pi$ and as $-\mathrm{id}$ on $\Pi^\perp$, the reflection through $\Pi$.

Since $R_\Pi \in O(q)$, it preserves every level set of $q$, hence restricts to an isometry of $L$. Its fixed set on $L$ is $\Pi \cap L$.

## Fixed sets are totally geodesic

The fixed set of an isometry of a (pseudo-)Riemannian manifold is totally geodesic — see [Fixed sets of isometries are totally geodesic](/posts/2026/fixed-sets-are-totally-geodesic/) for the proof.

A dimension count
$$
\dim(\Pi \cap L) = \dim \Pi + \dim L - n = 2 + (n-1) - n = 1
$$
shows $\Pi \cap L$ is 1-dimensional near $p$. It passes through $p$ with tangent $v$, so it is the geodesic.

## Conclusion

$$
\text{The geodesic of } L \text{ through } p \text{ in direction } v \ =\ L \cap \mathrm{span}(p, v).
$$

For specific quadrics this gives the familiar pictures: great circles on the sphere, geodesics in the hyperboloid model of $\mathbb{H}^n$ as intersections of the hyperboloid with 2-planes through the origin, and conic sections on de Sitter space.
