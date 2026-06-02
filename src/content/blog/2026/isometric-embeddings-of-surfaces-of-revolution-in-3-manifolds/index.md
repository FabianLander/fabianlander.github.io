---
title: "Isometric embeddings of Surfaces of Revolution in 3-Manifolds"
date: '2026-02-26'
description: "We investigate in which homogeneous 3 Manifolds a given Riemannian surface with rotational symmetry can be embedded."
draft: true
featured: false
tags:
  - Geometry
  - Visualization
  - PhD projects
  - Steve Trettel
subject: []
---

Fix a rotationally symmetric Riemannian surface $(S,g)$.
Let $(u,\theta)$ be global coordinates, where $\theta$ is the coordinate preserved by rotation.

In these coordinates we can write

$$
ds^2 = E(u,\theta)du^2 + F(u,\theta)du\,d\theta + G(u,\theta)d\theta^2.
$$

If the coordinates are orthogonal, then the mixed term vanishes:
$$
F = 0.
$$
We assume this from now on.

Rotational symmetry further implies that the coefficients are independent of $\theta$. Hence

$$
ds^2 = E(u)du^2 + G(u)d\theta^2.
$$

---

## A motivating example: a quotient of $\mathbb H^2$

Consider $\mathbb H^2$ in the upper half-plane model with metric

$$
\frac{dx^2 + dy^2}{y^2}.
$$

If we quotient the $x$-direction by $\mathbb Z$ (or $2\pi\mathbb Z$), then the $x$-coordinate becomes periodic and plays the role of the rotational coordinate $\theta$.

So in coordinates
$$
(u,\theta) = (y,x),
$$
the metric is
$$
ds^2 = \frac{dy^2 + dx^2}{y^2}.
$$

This is a rotationally symmetric surface.

A natural question is:

> In which homogeneous 3-manifolds can this surface be embedded isometrically as a surface of revolution?

Before addressing that specific example, we first analyze the general situation.

---

## Arc-length parametrization

Assume now that the $u$-coordinate is arc-length parametrized.

Then the metric takes the form

$$
\boxed{ds^2 = du^2 + f(u)^2 d\theta^2}
$$

for some smooth function $f(u)$.

This is the general form of a rotationally symmetric metric in arc-length coordinates.

---

# Embedding into $\mathbb H^3$

Assume there exists an isometric embedding
$$
\Phi : (S,g) \to \mathbb H^3
$$
as a surface of revolution.

## Cylindrical coordinates on $\mathbb H^3$

Choose a geodesic $\gamma$ in $\mathbb H^3$.

* Let $h$ be arc-length along $\gamma$.
* Let $r$ be the distance to $\gamma$.
* Let $\psi$ be the angular coordinate around $\gamma$.

These are Fermi (cylindrical) coordinates around the axis $\gamma$.

In these coordinates the metric on $\mathbb H^3$ is

$$
g_{\mathbb H^3} = dr^2 + \cosh^2(r) dh^2 + \sinh^2(r) d\psi^2.
$$

A surface of revolution about $\gamma$ must be of the form

$$
\Phi(u,\theta) = (h(u), r(u), \theta).
$$

---

## Pullback metric

Compute the induced metric:

$$
\Phi^* g_{\mathbb H^3} = \big(h'(u)^2 \cosh^2(r(u)) + r'(u)^2\big) du^2 + \sinh^2(r(u)) d\theta^2.
$$

For an isometric embedding, we must have

$$
du^2 + f(u)^2 d\theta^2 = \Phi^* g_{\mathbb H^3}.
$$

This yields the system

$$
h'(u)^2 \cosh^2(r(u)) + r'(u)^2 = 1,
$$

$$
\sinh^2(r(u)) = f(u)^2.
$$

---

## Solving the system

From the second equation,

$$
r(u) = \operatorname{arcsinh}(f(u)).
$$

Differentiating,

$$
r'(u) = \frac{f'(u)}{\sqrt{1 + f(u)^2}}.
$$

Using $\cosh^2(r) = 1 + \sinh^2(r)$, we get

$$
\cosh^2(r(u)) = 1 + f(u)^2.
$$

Substitute into the first equation:

$$
\frac{f'(u)^2}{1 + f(u)^2} + (1 + f(u)^2) h'(u)^2 = 1.
$$

Solving for $h'(u)$,

$$
\boxed{
h'(u) = \frac{\sqrt{1 + f(u)^2 - f'(u)^2}}{1 + f(u)^2}.
}
$$

---

## Existence condition

This has a real solution if and only if

$$
\boxed{f'(u)^2 < 1 + f(u)^2 \quad \text{for all } u.}
$$

This is the necessary and sufficient condition for the metric
$$
du^2 + f(u)^2 d\theta^2
$$
to embed as a surface of revolution in $\mathbb H^3$.

---

# Embedding into $\mathbb H^3_{-\kappa^2}$

Now consider hyperbolic space of curvature $-\kappa^2$.

The cylindrical metric becomes

$$
g = dr^2 + \cosh^2(\kappa r) dh^2 + \frac{1}{\kappa^2}\sinh^2(\kappa r) d\psi^2.
$$

Proceeding exactly as before, we obtain

$$
h'(u)^2 \cosh^2(\kappa r(u)) + r'(u)^2 = 1,
$$

$$
f(u)^2 = \frac{1}{\kappa^2} \sinh^2(\kappa r(u)).
$$

Hence

$$
r(u) = \kappa^{-1}\operatorname{arcsinh}(\kappa f(u)),
$$

$$
r'(u) = \frac{f'(u)}{\sqrt{1 + \kappa^2 f(u)^2}},
$$

$$
\cosh^2(\kappa r(u)) = 1 + \kappa^2 f(u)^2.
$$

Substituting gives

$$
\boxed{
h'(u) = \frac{\sqrt{1 + \kappa^2 f(u)^2 - f'(u)^2}}
{1 + \kappa^2 f(u)^2}.
}
$$

---

## Existence condition

The embedding exists if and only if

$$
\boxed{
f'(u)^2 < 1 + \kappa^2 f(u)^2
\quad \text{for all } u.
}
$$

Notice:

* For $\kappa = 0$ (Euclidean space), this reduces to $f'^2 < 1$.
* Negative curvature makes the inequality weaker — hyperbolic space gives more room for embedding.

---

# Next: The spherical case $S^3_\kappa$

In the spherical case of curvature $+\kappa^2$, the cylindrical metric becomes

$$
g = dr^2 + \cos^2(\kappa r) dh^2 + \frac{1}{\kappa^2}\sin^2(\kappa r) d\psi^2.
$$

Repeating the same calculation leads to the system

$$
h'(u)^2 \cos^2(\kappa r(u)) + r'(u)^2 = 1,
$$

$$
f(u)^2 = \frac{1}{\kappa^2} \sin^2(\kappa r(u)).
$$

Solving gives

$$
r(u) = \kappa^{-1}\arcsin(\kappa f(u)),
$$

$$
r'(u) = \frac{f'(u)}{\sqrt{1 - \kappa^2 f(u)^2}},
$$

and therefore

$$
\boxed{
h'(u) = \frac{\sqrt{1 - \kappa^2 f(u)^2 - f'(u)^2}}
{1 - \kappa^2 f(u)^2}.
}
$$

---

## Spherical existence condition

$$
\boxed{
f'(u)^2 < 1 - \kappa^2 f(u)^2.
}
$$

Now the inequality is *stronger* — positive curvature restricts embeddings.

---

# Final summary

For a rotational metric
$$
ds^2 = du^2 + f(u)^2 d\theta^2,
$$
the embedding condition into a 3D space form of curvature $K$ is:

$$
\boxed{
f'(u)^2 < 1 + K f(u)^2.
}
$$

* $K = 0$ (Euclidean): $f'^2 < 1$
* $K < 0$ (Hyperbolic): $f'^2 < 1 + |K| f^2$
* $K > 0$ (Spherical): $f'^2 < 1 - K f^2$

So curvature appears only through a single inequality.

Lets now apply this to the specific example of the pseudosphere.

# What is the pseudosphere intrinsically?

In arc-length meridian coordinates it has metric

$$
\boxed{
ds^2 = du^2 + e^{-2u} d\theta^2.
}
$$

So for the pseudosphere,

$$
f(u) = e^{-u}, \qquad f'(u) = -e^{-u}.
$$

Notice:

$$
f'(u)^2 = e^{-2u} = f(u)^2.
$$

---

# Embedding into Euclidean space ($K=0$)

The condition for embedding as a surface of revolution in $\mathbb R^3$ is:

$$
f'(u)^2 < 1.
$$

Since $f'(u)^2 = e^{-2u}$, we need

$$
e^{-2u} < 1
\quad\Longleftrightarrow\quad
u > 0.
$$

So only the region $u>0$ embeds.

That corresponds exactly to the classical fact:

> The pseudosphere in $\mathbb R^3$ has a boundary circle and cannot be extended past it.

---

# Embedding into hyperbolic space $\mathbb H^3_{-\kappa^2}$

Now the condition becomes

$$
f'(u)^2 < 1 + \kappa^2 f(u)^2.
$$

Substitute $f'^2 = f^2$:

$$
f(u)^2 < 1 + \kappa^2 f(u)^2.
$$

Rearrange:

$$
(1-\kappa^2) f(u)^2 < 1.
$$

Now the geometry splits into cases.

---

## Case A: $\kappa^2 > 1$  (ambient curvature more negative than -1)

Then $1-\kappa^2 < 0$, so the inequality is automatically satisfied for **all $u$**.

The entire pseudosphere embeds.

In fact:

* If the ambient curvature matches exactly $K=-1$,
* the hyperbolic plane embeds totally geodesically in $\mathbb H^3$.

So negative curvature "helps."

---

## Case B: $\kappa^2 = 1$

The inequality becomes

$$
f(u)^2 < 1 + f(u)^2,
$$

which is always true.

Again, the whole surface embeds.

This is consistent: a surface of curvature $-1$ naturally sits inside $\mathbb H^3_{-1}$.

---

## Case C: $0 < \kappa^2 < 1$

Then $1-\kappa^2 > 0$, so we get

$$
f(u)^2 < \frac{1}{1-\kappa^2}.
$$

Since $f(u)=e^{-u}$,

$$
e^{-2u} < \frac{1}{1-\kappa^2}.
$$

So only

$$
u > -\frac12 \log\!\left(\frac{1}{1-\kappa^2}\right)
$$

embeds.

Only part of the pseudosphere embeds.

---

# Embedding into spherical space $S^3_\kappa$

The condition becomes

$$
f'(u)^2 < 1 - \kappa^2 f(u)^2.
$$

Substitute $f'^2 = f^2$:

$$
f(u)^2 < 1 - \kappa^2 f(u)^2.
$$

Rearrange:

$$
(1+\kappa^2) f(u)^2 < 1.
$$

So

$$
e^{-2u} < \frac{1}{1+\kappa^2}.
$$

Again only a bounded region of the surface embeds.

Positive curvature makes things even more restrictive.

---

# Big geometric picture

For a rotational metric $du^2 + f(u)^2 d\theta^2$, the embedding condition in curvature $K$ is

$$
f'(u)^2 < 1 + K f(u)^2.
$$

Now plug in the pseudosphere identity $f'^2 = f^2$:

$$
f(u)^2 < 1 + K f(u)^2.
$$

Rewriting:

$$
(1-K) f(u)^2 < 1.
$$

This single inequality explains everything.

---

# Conceptual interpretation

The pseudosphere has intrinsic curvature $-1$.

If the ambient space:

* has curvature $K < -1$,
  it "has room" for the entire surface.

* has curvature $K = -1$,
  the embedding fits perfectly.

* has curvature $-1 < K \le 0$,
  only part of the surface embeds.

* has $K>0$,
  even less can embed.

Negative ambient curvature helps; positive curvature fights against it.


TODO: the product manifolds $S^2 \times \mathbb R$ and $H^2 \times \mathbb R$ as well as Nil.