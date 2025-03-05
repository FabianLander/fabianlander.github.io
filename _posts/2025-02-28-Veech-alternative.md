---
layout: post
title: "Reading Seminar: Translation Surfaces and Rational Billiards - The Veech Alternative"
date: 2025-02-28 08:00:00 +0100
categories: translation-surfaces
permalink: "veech_alternative"
excerpt: "These seminar notes explore Vorobets' approach to prove a remarkable property of translation surfaces first identified by W. Veech. We examine the geometric perspective on planar structures, interval exchange transformations, and rational billiards, focusing on the dichotomy in geodesic flow behavior: trajectories are either periodic or uniformly distributed."
---

<style>
.thm {
  margin: 1.5em 0;
  padding-left: 1em;
  border-left: 2px solid #555;
}
.thm-title {
  font-weight: bold;
}
.thm-content {
  margin-top: 0.5em;
}
</style>

This post serves as lecture notes from our reading seminar at MPI MiS, where we are exploring the dynamical behaviors of geodesic flows on translation surfaces through a study of:

Ya. B. Vorobets, "Planar structures and billiards in rational polygons: the Veech alternative," *Russian Mathematical Surveys*, 1996, Volume 51, Issue 5, 779-817.

The Veech alternative presents a remarkable dichotomy in the behavior of geodesic flows on certain translation surfaces: for any fixed direction, either all infinite trajectories are uniformly distributed, or all trajectories are periodic. 

<div style="background-color: #f8f9fa; border-left: 4px solid #6c757d; padding: 15px; margin: 20px 0; border-radius: 4px;">
<strong>Note:</strong> These notes reflect my understanding of our discussions – if it were a game of telephone, consider this the final whisper. All errors and bad phrasings are surely mine, all brilliant insights belong to the speakers and authors of the reference material.
</div>

## Session 1 (Held by ...), February 26th: Translation Structures and their connection to Billiards in Rational Polygons

## Session 2 (Fabian Lander), March 5th: Interval Exchange Transformations and Elementary Translation surfaces

Last time we saw that the geodesic flow on the phase space $\Phi \subset M \times S^1$ preserves the measure $\mu \times \lambda$ where $\mu$ is the Lebesgue measure on $M$ (induced by the flat structure $\omega$) and $\lambda$ is the Lebesgue measure on $S^1$. In particular, if we fix a direction, we have a measure-preserving dynamical system on a full measure subset of $M$. For simplicity, we will continue to denote this subset as $M$.

Today we will connect this dynamical system to another closely related family of dynamical systems called *Interval Exchange Transformations*, or *IETs* for short.

### Defining Interval Exchange Transformations

Given an interval $I = [a,b] \subset \RR$ and points $S= \\{x_1, \dots, x_m \\}$ where $a < x_1 < x_2 < \dots < x_m < b$, an *IET* is a map $T: I\setminus S \rightarrow I$ that acts as a translation (shift) on each of the components of $I\setminus S$.

Various definitions appear in the literature. Some use half-open intervals (either left- or right-open) and require $T$ to be left- or right-continuous, meaning $T$ shifts the half-open "components." Regardless of these technical differences, the fundamental concept remains the same: We partition the interval into finitely many pieces and then rearrange them via translations.

<img src="/assets/svgs/veech_alternative/IETBasic.svg" alt="Illustration of an Interval Exchange Transformation" style="width: 60%; display: block; margin: 0 auto;">

We call the set $S$ the set of singularities, break points, saddles, or discontinuities. By including the preimages of break points back into $S$, we can see that powers of an *IET* are themselves *IETs*. 

<img src="/assets/svgs/veech_alternative/IterateIET.svg" alt="Illustration of two iterations of an Interval Exchange Transformation" style="width: 60%; display: block; margin: 0 auto;">

A crucial element in analyzing the dynamical properties of IETs is the set $C(T)$, which consists of points $x\in I$ that are mapped into $S$ in both forward and backward time:

$$
C(T) = \{ x \in I \mid \exists n_1 > 0, \exists n_2 < 0 : T^{n_1}x, T^{n_2}x \in S \}
$$

This set is clearly finite, because the map is injective and a point that "connects" two break points is unique (and there are finitely many break points).

Another useful point of view is the following:
This set is finite because of the connection between IETs and translation surfaces - specifically, points in $C(T)$ correspond to saddle connections in the suspension of the IET. Since a translation surface has finitely many saddle connections in any given direction, $C(T)$ must be finite as well.


<!-- TODO: find an argument that doesn't use Saddle connections. This should be some simple combinatorical argument... -->

### Foundational Results on IETs

The following key results about IETs come from:
* [1] M. Keane, "Interval exchange transformations", *Math. Z.* **141** (1975), 25-31.
* [2] M. D. Boshernitzan, "Rank two interval exchange transformations", *Ergodic Theory Dynamical Systems* **8** (1988), 379-394.

<div class="thm">
<div class="thm-title">Theorem 1 [2].</div>
<div class="thm-content">
We can find unique $T$-invariant sets $K_1, \dots, K_l$ consisting of unions of components of $I\setminus C(T)$ where each of the $K_i$'s is of one of the two types:
<br>
1. $K_i$ consists of intervals of same length that are cyclically permuted (we say that $K_i$ is a periodic component)
<br>
2. $T$ restricted to $K_i$ is minimal, i.e., every orbit $\{T^n x \}_{n\in \mathbb{N}}$ is dense in $K_i$ (we say that $K_i$ is a minimal component)
</div>
</div>

This directly implies:

<div class="thm">
<div class="thm-title">Theorem 2 [1].</div>
<div class="thm-content">
If $C(T) = \emptyset$, then $T$ is either the identity or minimal.
</div>
</div>

Lastly, we have a theorem regarding ergodic measures:

<div class="thm">
<div class="thm-title">Theorem 3 [1].</div>
<div class="thm-content">
Any aperiodic (that is, not having periodic components) interval exchange transformation has only finitely many ergodic invariant normalized Borel measures.
</div>
</div>

In the next section, we'll explore how these interval exchange transformations relate to the geodesic flows on translation surfaces, providing a powerful tool for understanding their dynamics.

### IETs and Translation Surfaces

We will now discuss how we can obtain an IET from a Translation surface $(M, \omega)$.

Ingredients for an IET:
- A geodesic segment $I$ on $M$ (which may contain a singular point)
- A direction $v\in S^1$

We define $T$ as the first return map of the flow from $I$ in direction $v$. Before proving that this is indeed well-defined, let's examine a simple example:

Consider a translation surface (e.g., a torus) together with a horizontal geodesic segment. The first return map is not defined if we flow into a singularity. So we take the "preimages" of all possible flow lines in direction $v$ emanating from singularities as well as the preimages of the boundary points of our segment:

<img src="/assets/svgs/veech_alternative/flatTorusFirstReturnExample.svg" alt="Illustration of a geodesic segment on a torus with preimages of singularities." style="width: 80%; display: block; margin: 0 auto;">

Note that since we only have removable singularities in this example, there is only one preimage per singularity. In general, the number of preimages could be up to the sum of all multiplicities of singularities.  This partitions the segment into components which get mapped back to $I$ via translation:

<img src="/assets/svgs/veech_alternative/flatTorusFirstReturnExample.svg" alt="Illustration of a geodesic segment on a torus with preimages of singularities." style="width: 80%; display: block; margin: 0 auto;">

Now we will state and prove a general result about the first return map on translation surfaces, which will formally establish that our map is indeed an IET (and in particular well-defined).

<div class="thm">
<div class="thm-title">Proposition 4.</div>
<div class="thm-content">
The map $T$ is an IET where the number of singularities is bounded by a constant which only depends on the flat structure of $M$. Any trajectory from $x\in I$ in direction $v$ returns to $I$ or hits a singular point in a time span bounded above by a constant independent of $x$.
</div>
</div> 

<div class="proof">
Let $ S = \\{ x_1, \dots, x_m \\}$ be all the points in $I$ such that their trajectory hits a saddle point or one of the two boundary points of $I$. Take a component $J$ of the partition $I\setminus{S}$. 

<img src="/assets/svgs/veech_alternative/FirstReturnSketch.svg" alt="A sketch on the partition of $I$." style="width: 40%; display: block; margin: 0 auto;">

By Poincaré's recurrence theorem, this set will eventually return to $I$ (I will elaborate on this application below). So the first return map is well-defined. By construction, all of $J$ must return to the interior of $I$ at the same time (otherwise this would contradict the definition of $S$). Since our flow preserves the length of our segment, $J$ has to be mapped back to $I$ by a translation. 

The trajectory of $J$ forms a rectangle which has area at most that of the whole surface. Therefore, the time until the first return (or equivalently, the distance traveled) is less than $\text{Area}(M)/|J|$.

<img src="/assets/svgs/veech_alternative/FirstReturnJArea.svg" alt="A sketch on the trajectory of $J$ and its cylinder." style="width: 40%; display: block; margin: 0 auto;">

</div>

### Application of Poincaré's Recurrence Theorem to IETs

Poincaré's recurrence theorem is a fundamental result in measure-preserving dynamical systems. It states that for any measure-preserving transformation $T$ on a probability space $(X, \mathcal{B}, \mu)$ and any measurable set $A \in \mathcal{B}$, almost every point in $A$ returns to $A$ under iterations of $T$. More precisely, for almost every $x \in A$, there exists $n > 0$ such that $T^n(x) \in A$.

<img src="/assets/svgs/veech_alternative/PoincareThickenedIntervall.svg" alt="Poincare recurrence on a thickened interval." style="width: 60%; display: block; margin: 0 auto;">


In our context of geodesic flows on translation surfaces, we can apply this theorem to the geodesic flow in a given direction (for a fixed time) because it preserves the Lebesgue measure on the translation surface $(M, \omega)$ and M has finite area.

We can apply the theorem to our interval $I$ essentially because it has positive measure with respect to the cross-sectional measure. More concretely, we can thicken our Interval in direction $v$ into a rectangle. Since preserves rectangles, returning to our rectangle with base $J$ implies that $J$ returns to $J$ at some point in time.
Therefore, almost every point in our interval $J \subset I \setminus S$ must eventually return to $I$ under the geodesic flow in direction $v$.

### Saddle Connections and Minimal Components

A *saddle connection* of a translation surface is a geodesic segment joining two singular points which doesn't contain singular points in its interior. Note that in our previous construction of *IETs* on translation surfaces, saddle connections in the direction $v$ play the same role as the set $C(T)$.

<div class="thm">
<div class="thm-title">Proposition 5.</div>
<div class="thm-content">
The flow in a direction $v$ on a translation surface $M$ can be represented as a special flow under an IET with return time that is constant on each of the exchange intervals.
</div>
</div> 

This proposition means that we can fully understand the geodesic flow on $M$ in direction $v$ by studying an appropriate IET on a transverse segment (or collection of segments).

<div class="proof">
The surface $M$ has finitely many periodic domains, because each periodic orbit has a neighborhood of periodic orbits whose boundaries are saddle connections in direction $v$. Let's call these domains $D_1, \dots, D_m$. 

If their closure doesn't cover $M$, we take a point in the complement and connect two domains by a segment orthogonal to $v$ (without singularities in its interior). This segment defines an IET. By continuing this process, we obtain finitely many segments with disjoint domains whose closure covers $M$.

For each segment, the return time of points in the same exchange interval is constant, making this a "special flow" under the IET.
</div>

An important insight: When we construct an IET from a geodesic flow, we can actually reconstruct the translation surface if we keep track of additional data - specifically, which segment neighbors which segment and how long each segment travels along its trajectory until it returns. This "suspension" of the IET recreates the original surface.

Now that we can analyze the dynamical behavior of the geodesic flow in a given direction by looking at a suitable IET, we can reformulate our theorems in the context of translation surfaces.

<div class="thm">
<div class="thm-title">Proposition 6.</div>
<div class="thm-content">
Let $D_1, \dots, D_m$ be the invariant domains into which $M$ partitions. Then either $D_i$ is a cylinder of periodic trajectories, or the geodesic flow in direction $v$ restricted to $D_i$ is minimal. The number of domains is bounded by a constant independent of $v$. 
</div>
</div> 

<div class="proof">
This is a direct application of Proposition 5 together with Theorem 1. The number of domains is bounded because the number of saddle connections in any direction is bounded by the sum of all multiplicities of all saddle connections. Therefore, combinatorially there is a finite number of possible segments that can connect domains and thus a bounded number of minimal and periodic components.
</div>
 
A direct consequence is the following theorem:

<div class="thm">
<div class="thm-title">Proposition 7.</div>
<div class="thm-content">
If a translation surface $(M,\omega)$ doesn't have saddle connections in a given direction, then either the flow in that direction is minimal on all of $M$ or consists of a single cylinder of periodic trajectories.
</div>
</div>  

Lastly, we can adapt Theorem 3 to the setting of translation surfaces:

<div class="thm">
<div class="thm-title">Proposition 8.</div>
<div class="thm-content">
If the flow on a translation surface in a given direction is aperiodic, then there are only finitely many normalized Borel measures on $M$ that are invariant and ergodic with respect to this flow.
</div>
</div>


### Translation surfaces out of IETs (suspensions)

It is very easy to build a translation surface with a segment out of an IET such that the vertical flow induces the same IET on the segment. This picture should tell the whole story:

<img src="/assets/svgs/veech_alternative/IETSuspension.svg" alt="Suspension." style="width: 60%; display: block; margin: 0 auto;">

### Elementary Translation Surfaces

After exploring interval exchange transformations, let's examine some fundamental properties of translation surfaces and their singularities.

<div class="thm">
<div class="thm-title">Theorem 9.</div>
<div class="thm-content">
For a translation structure $\omega$ on a surface $M$ with singular points of multiplicities $m_1, \ldots, m_k$ and Euler characteristic $\chi$:

$$
-\chi = \sum_{i=1}^{k}(m_i - 1).
$$
</div>
</div>

<div class="proof">
We may assume $\omega$ has singular points since the formula remains invariant when adding or removing singularities.

Using triangulations with vertices at singular points (possible by Lemma 10), and applying Euler's formula with $v = k$ vertices, $e$ edges, and $f$ faces where $3f = 2e$, we get $-\chi = f/2 - k$.

The sum of angles in all triangles equals $\pi f$, which also equals the sum of angles at singular points: $\sum_{i=1}^{k} 2\pi m_i$. Therefore $f/2 = \sum_{i=1}^{k} m_i$, giving us $-\chi = \sum_{i=1}^{k} (m_i - 1)$.
</div>

This theorem gives us several immediate insights:

- No translation structures exist on spheres, as $\chi = 2$ would require negative values for $\sum(m_i - 1)$
- On a torus ($\chi = 0$), only removable singularities (with $m_i = 1$) are possible
- Surfaces with genus $g > 1$ must have at least one non-removable singularity

The simplest non-trivial translation surfaces occur on tori. Let $v_1, v_2$ be linearly independent vectors in $\RR^2$. The quotient space $\TT_{v_1, v_2} = \RR^2/(\mathbb{Z}v_1 \oplus \mathbb{Z}v_2)$ naturally inherits a translation structure without singularities, creating what we call a *flat torus*.

<div class="thm">
<div class="thm-title">Proposition 11.</div>
<div class="thm-content">
Every translation structure on a torus is isomorphic to a flat torus possibly with finitely many added removable singular points.
</div>
</div>

<div class="proof">
For a translation structure $\omega$ without singular points on a torus $M$, we'll construct a periodic trajectory.

Choose a point $p \in M$ and a geodesic segment $I$ starting at $p$ in some direction. Draw a perpendicular trajectory from $p$ that intersects $I$ at point $q$. Let $s_1$ and $s_2$ be the distances along $I$ and the perpendicular, respectively.

A trajectory from $p$ in direction $-s_1v_1 + s_2v_2$ is periodic. This creates a "pencil" of parallel periodic trajectories all with the same length $l_1$.

Drawing a perpendicular segment $J$ to this pencil with length equal to the pencil's width, and analyzing how trajectories intersect, we can construct a second direction of periodic flow. These two directions together establish an isomorphism between $\omega$ and a flat torus $\TT_{l_1e_1, v_2}$.
</div>

On flat tori, the geodesic flow behaves in a perfectly dichotomous manner:
- In directions parallel to vectors in $\mathbb{Z}v_1 \oplus \mathbb{Z}v_2$, all trajectories are periodic
- In all other directions, the flow is ergodic (every trajectory is dense)

This clean dichotomy motivates the following definition:

<div class="thm">
<div class="thm-title">Definition 7.</div>
<div class="thm-content">
A translation structure is <em>elementary</em> if the flow in any direction is either completely ergodic or consists only of periodic components.
</div>
</div>

This elementary property is the essence of the Veech alternative we're studying—the remarkable "all-or-nothing" behavior of geodesic flows on certain translation surfaces.