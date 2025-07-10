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
<strong>Note:</strong> These notes reflect my understanding of our discussions – if it were a game of telephone, consider this the final whisper. All errors and clunky phrasings are surely mine; all good ideas belong to the speakers and authors of the reference material.
</div>

## <u>Session 1</u> (Jiajun Shi), February 26th: Translation Structures and their connection to Billiards in Rational Polygons

## <u>Session 2</u> (Fabian Lander), March 5th: Interval Exchange Transformations and Elementary Translation surfaces

Last time we saw that the geodesic flow on the phase space $\Phi \subset M \times S^1$ preserves the measure $\mu \times \lambda$ where $\mu$ is the Lebesgue measure on $M$ (induced by the flat structure $\omega$) and $\lambda$ is the Lebesgue measure on $S^1$. In particular, if we fix a direction, we have a measure-preserving dynamical system on a full measure subset of $M$. For simplicity, we will continue to denote this subset as $M$.

Today we will connect this dynamical system to another closely related family of dynamical systems called *Interval Exchange Transformations*, or *IETs* for short.

### Defining Interval Exchange Transformations

Given an interval $I = [a,b] \subset \RR$ and points $S= \\{x_1, \dots, x_m \\}$ where $a < x_1 < x_2 < \dots < x_m < b$, an *IET* is a map $T: I\setminus S \rightarrow I$ that acts as a translation (shift) on each of the components of $I\setminus S$.

Various definitions appear in the literature. Some use half-open intervals (either left- or right-open) and require $T$ to be left- or right-continuous, meaning $T$ shifts the half-open "components". This makes $T$ a bijection on the half open interval. 

Regardless of these technical differences, the fundamental concept remains the same: We partition the interval into finitely many pieces and then rearrange them via translations.

<img src="/assets/svgs/veech_alternative/IETBasic.svg" alt="Illustration of an Interval Exchange Transformation" style="width: 60%; display: block; margin: 0 auto;">

We call the set $S$ the set of singularities, break points, saddles, or discontinuities. By including the preimages of break points back into $S$, we can see that powers of an *IET* are themselves *IETs*. 

<img src="/assets/svgs/veech_alternative/IterateIET.svg" alt="Illustration of two iterations of an Interval Exchange Transformation" style="width: 60%; display: block; margin: 0 auto;">

A crucial element in analyzing the dynamical properties of IETs is the set $C(T)$, which consists of points $x\in I$ that are mapped into $S$ in both forward and backward time:

$$
C(T) = \{ x \in I \mid \exists n_1 > 0, \exists n_2 < 0 : T^{n_1}x, T^{n_2}x \in S \}
$$

This set is clearly finite, because any sequence $s_1, T(s_1), ..., T^n (s_1) = s_2$ that connect two break points $s_1, s_2$ is unique (here we view $T$ as a bijection on the half open interval) and there are only finitely many possible combinations of breakpoints.

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

Consider a translation surface (e.g., a torus) together with a horizontal geodesic segment. The first return map is not defined if we flow into a singularity. So we take the "preimages" of all possible flow lines in direction $v$ emanating from singularities as well as the preimages of the boundary points of our segment (careful there is a mistake in the picture, however a posteriori the idea still works):

<img src="/assets/svgs/veech_alternative/flatTorusFirstReturnExample.svg" alt="Illustration of a geodesic segment on a torus with preimages of singularities." style="width: 40%; display: block; margin: 0 auto;">

Note that since we only have removable singularities in this example, there is only one preimage per singularity. In general, the number of preimages could be up to the sum of all multiplicities of singularities.  This partitions the segment into components which get mapped back to $I$ via translation:

<img src="/assets/svgs/veech_alternative/flatTorusFirstReturnExampleIET.svg" alt="Illustration of a geodesic segment on a torus with preimages of singularities." style="width: 40%; display: block; margin: 0 auto;">

Now we will state and prove a general result about the first return map on translation surfaces, which will formally establish that our map is indeed an IET (and in particular well-defined).

<div class="thm">
<div class="thm-title">Proposition 4.</div>
<div class="thm-content">
The map $T$ is an IET where the number of singularities is bounded by a constant which only depends on the flat structure of $M$. Any trajectory from $x\in I$ in direction $v$ returns to $I$ or hits a singular point in a time span bounded above by a constant independent of $x$.
</div>
</div> 

<div class="proof">
Let $ S = \\{ x_1, \dots, x_m \\}$ be all the points in $I$ such that their trajectory hits a saddle point or one of the two boundary points of $I$ without intersecting the segment itself before. Equivalently, we can send $m_i$ - many rays in direction $v$ from every saddle point $s_i$ and collect the first hit with the segment (if there is one). Take a component $J$ of the partition $I\setminus{S}$. 

<img src="/assets/svgs/veech_alternative/FirstReturnSketch.svg" alt="A sketch on the partition of $I$." style="width: 40%; display: block; margin: 0 auto;">

By Poincaré's recurrence theorem, this set will eventually return to $I$ (I will elaborate on this application below). So the first return map is well-defined. By construction, all of $J$ must return to the interior of $I$ at the same time (otherwise this would contradict the definition of $S$). Since our flow preserves the length and orientation of our segment, $J$ has to be mapped back to $I$ by a translation. 

The trajectory of $J$ forms a rectangle which has area at most that of the whole surface. Therefore, the time until the first return (or equivalently, the distance traveled) is less than $\text{Area}(M)/|J|$.

<img src="/assets/svgs/veech_alternative/FirstReturnJArea.svg" alt="A sketch on the trajectory of $J$ and its cylinder." style="width: 40%; display: block; margin: 0 auto;">

</div>

### Application of Poincaré's Recurrence Theorem to IETs

Poincaré's recurrence theorem is a fundamental result in measure-preserving dynamical systems. It states that for any measure-preserving transformation $T$ on a probability space $(X, \mathcal{B}, \mu)$ and any measurable set $A \in \mathcal{B}$, almost every point in $A$ returns to $A$ under iterations of $T$. More precisely, for almost every $x \in A$, there exists $n > 0$ such that $T^n(x) \in A$.

<img src="/assets/svgs/veech_alternative/PoincareThickenedInterval.svg" alt="Poincare recurrence on a thickened interval." style="width: 60%; display: block; margin: 0 auto;">

In the context of geodesic flows on translation surfaces, we can apply this theorem because the geodesic flow in a fixed direction preserves the Lebesgue measure on the translation surface $(M, \omega)$, and $M$ has finite area.

We can apply the theorem to our interval $I$ because it has positive measure with respect to the measure transverse to the flow direction $v$. More specifically, we can thicken our interval in direction $v$ to form a rectangle. Since the geodesic flow preserves rectangles, returning to our initial rectangle with base $J$ implies that the interval $J$ must return to itself at some point.
Therefore, the whole component $J \subset I \setminus S$ returns to $I$ under flow.
This leads us to the following important observation:
<div class="thm">
<div class="thm-title">Remark</div>
<div class="thm-content">
The first return map on a segment $I$ is defined for every point, except for the finitely many ones that map into saddle points before returning.
</div>
</div>

### Saddle Connections and Minimal Components

A *saddle connection* of a translation surface is a geodesic segment joining two singular points which doesn't contain singular points in its interior. Notice that in our previous construction of *IETs* on translation surfaces, saddle connections in the direction $v$ play precisely the same role as the set $C(T)$ we discussed earlier.

<div class="thm">
<div class="thm-title">Proposition 5.</div>
<div class="thm-content">
The flow in a direction $v$ on a translation surface $M$ can be represented as a flow under an IET with return time that is constant on each of the exchange intervals.
</div>
</div> 

In essence, this means we can fully understand the geodesic flow on $M$ in any given direction $v$ by examining an appropriate IET on a transverse segment (or collection of segments). This powerful connection allows us to transfer our intuition between these two perspectives.

<div class="proof">
The surface $M$ contains finitely many periodic domains, as each periodic orbit has a neighborhood of periodic orbits whose boundaries consist of saddle connections in direction $v$. Let's denote these domains as $D_1, \dots, D_m$. For each such periodic domain, we can naturally define geodesic segments orthogonal to $v$ whose induced IET captures the dynamics of the geodesic flow.

If the closure of these domains doesn't cover all of $M$, consider a geodesic segment $I$ in the complement. Its induced IET must be minimal (by Theorem 1). 
<br>
We claim that the closure of the image of $I$ under the geodesic flow is bounded by (a concatenation of) saddle connections. To prove this, consider the complement of the periodic domains after removing all saddle connections in direction $v$. We can cover this region with open rectangles whose heights are aligned with direction $v$ and whose bases are orthogonal to $v$.
<br>
The key insight is that flow lines originating from each rectangle have a dense image within that rectangle. Consequently, any two overlapping rectangles must have identical images under the geodesic flow. This implies that the boundary of each minimal component consists of (concatenations of) saddle connections.
<br>
Since there are only finitely many possible combinations of concatenated saddle connections in a given direction, we have only finitely many minimal components. We can now collect geodesic segments from each component (both periodic and minimal) and view them collectively as a single IET that fully characterizes the dynamics of the geodesic flow, as every flow line passes through one of these segments after a finite amount of time.
</div>

Here's a key insight worth highlighting: When constructing an IET from a geodesic flow, we can actually reconstruct the original translation surface if we carefully track additional data—specifically, which segment neighbors which segment after the first return (permutation data), how long each segment travels along its trajectory until it returns, and the distances between the saddle connections and the break points. This "suspension" of the IET effectively recreates the original surface geometry.

Now that we can analyze the dynamical behavior of the geodesic flow in any direction by examining a suitable IET, we can reformulate our earlier theorems in the context of translation surfaces.

<div class="thm">
<div class="thm-title">Proposition 6.</div>
<div class="thm-content">
Let $D_1, \dots, D_m$ be the invariant domains into which $M$ partitions. Then either $D_i$ is a cylinder of periodic trajectories, or the geodesic flow in direction $v$ restricted to $D_i$ is minimal. The number of domains is bounded by a constant independent of $v$. 
</div>
</div> 

<div class="proof">
This follows directly from Proposition 5 in conjunction with Theorem 1. The number of domains is bounded because the number of saddle connections in any direction is bounded by the sum of all multiplicities of all saddle connections. Therefore, combinatorially, there exists only a finite number of possible segments that can connect domains, yielding a bounded number of minimal and periodic components.
</div>
 
A beautiful consequence of this analysis is the following theorem:

<div class="thm">
<div class="thm-title">Proposition 7.</div>
<div class="thm-content">
If a translation surface $(M,\omega)$ doesn't have saddle connections in a given direction, then either the flow in that direction is minimal on all of $M$ or consists of a single cylinder of periodic trajectories.
</div>
</div>  

Finally, we can adapt Theorem 3 to the setting of translation surfaces:

<div class="thm">
<div class="thm-title">Proposition 8.</div>
<div class="thm-content">
If the flow on a translation surface in a given direction is aperiodic, then there are only finitely many normalized Borel measures on $M$ that are invariant and ergodic with respect to this flow.
</div>
</div>


### Translation Surfaces out of IETs (Suspensions)

The reverse construction—building a translation surface from an IET—is remarkably straightforward. We can create a translation surface with a segment such that the vertical flow induces the same IET on that segment. The following illustration captures the essence of this construction:

<img src="/assets/svgs/veech_alternative/IETSuspension.svg" alt="Suspension of an IET creating a translation surface." style="width: 60%; display: block; margin: 0 auto;">

## <u>Session 2.5</u> (Fabian Lander), March 12th: "Decomposing" a translation surfaces into IETs and defining elementary translation surfaces


### Elementary Translation Surfaces

Now that we understand the connection between translation surfaces and interval exchange transformations, let's explore some fundamental properties of translation surfaces, particularly the relationship between their topology and the singularities they contain.

<div class="thm">
<div class="thm-title">Theorem 9.</div>
<div class="thm-content">
Let $\omega$ be a translation structure on a surface $M$, let $m_1, \ldots, m_k$ be the multiplicities of its singular points, and let $\chi$ be the Euler characteristic of $M$. Then

$$
-\chi = \sum_{i=1}^{k}(m_i - 1).
$$
</div>
</div>

<div class="proof">
Both parts of this formula do not change when (removable) singular points are added or deleted, so we may assume that $\omega$ has (potentialy removable) singular points.

First, we need the following lemma:

<div class="thm">
<div class="thm-title">Lemma 10. (Existence of geodesic triangulations with singular vertices.)</div>
<div class="thm-content">
If $\omega$ has singular points, then every set of pairwise non-intersecting (that is, without common interior points) saddle connections can be complemented to a triangulation of $M$ whose vertices are singular points, whose edges are saddle connections, and whose faces are triangles not containing singular points in their interior ($\omega$-triangles).
</div>
</div>

Let $v$, $e$, $f$ be the numbers of vertices, edges and faces of an arbitrary triangulation of $M$ as described in Lemma 10. Clearly, $v = k$ (the number of singular points) and $3f = 2e$ (since each face has 3 edges, and each edge belongs to 2 faces), so Euler's formula $\chi = v - e + f$ implies that $-\chi = f/2 - k$.

The sum of all angles of all faces in the triangulation is equal to $\pi f$. On the other hand, it is equal to the sum of the full angles at the singular points of $\omega$, that is, $\sum_{i=1}^{k} 2\pi m_i$. Hence: $f/2 = \sum_{i=1}^{k} m_i$ and $-\chi = f/2 - k = \sum_{i=1}^{k} (m_i - 1)$, as required.
</div>

This theorem has several interesting consequences:

1. There do not exist translation structures on the sphere. This is because for a sphere, $\chi = 2$, which would require $\sum_{i=1}^{k}(m_i - 1) = -2$. Since $m_i \geq 1$ for all $i$ (as singularities must have multiplicity at least 1), this equation cannot be satisfied.

2. Translation structures on a torus can have removable singularities only. For a torus, $\chi = 0$, so we need $\sum_{i=1}^{k}(m_i - 1) = 0$. This is only possible if all singularities have multiplicity exactly 1, making them removable.

3. A translation structure on a surface of genus $g > 1$ must have at least one non-removable singularity, as $\chi = 2-2g < 0$ requires at least one $m_i > 1$.

Let's explore the second consequence in more detail. Let $v_1, v_2$ be linearly independent vectors in $\RR^2$. By $\TT_{v_1, v_2}$ we denote the quotient space of $\RR^2$ by the subgroup $\mathbb{Z}v_1 \oplus \mathbb{Z}v_2$. Then $\TT_{v_1, v_2}$ is a torus, the canonical projection $\pi: \RR^2 \to \TT_{v_1, v_2}$ is a local homeomorphism, and the continuous maps from domains in $\TT_{v_1, v_2}$ into $\RR^2$ that are right inverse to $\pi$ define on $\TT_{v_1, v_2}$ a translation structure without singular points. This structure is called a *flat torus*. 

It turns out that every translation structure on a torus can be obtained in this manner, which is formalized in the following proposition:

<div class="thm">
<div class="thm-title">Proposition 11.</div>
<div class="thm-content">
An arbitrary translation structure on a torus is isomorphic to a planar torus to which are added finitely many removable singular points.
</div>
</div>

<div class="proof">
By Theorem 9 it suffices to prove that a translation structure $\omega$ without singular points on a torus $M$ is isomorphic to a planar torus. We will first show that $\omega$ has a periodic trajectory.

Let $x \in M$ and let $I$ be a geodesic interval starting at $x$ in an arbitrary direction $v_1$. The trajectory emitted from $x$ in a direction $v_2$ perpendicular to $v_1$ intersects $I$ at a point $x'$. We denote by $s_1$, $s_2$ the distances to be travelled along $I$ and along the trajectory, respectively, from $x$ to $x'$.

  <br>
  <br>
<img src="/assets/svgs/veech_alternative/torusProofSketch.svg" alt="Suspension of an IET creating a translation surface." style="width: 60%; display: block; margin: 0 auto;">
  <br>

As can be readily seen, the trajectory emitted from $x$ in a direction $e_1$ parallel to $-s_1v_1 + s_2v_2$ is periodic. By Proposition 7, the whole surface $M$ is a single pencil of periodic trajectories in the direction $e_1$, having the same length $l_1$.

We draw the geodesic interval $J$ in a direction $e_2$ perpendicular to $e_1$ whose length is the width $w_1$ of the pencil of periodic trajectories in the direction $e_1$. The end-points $x$ and $x''$ of this interval belong to the same trajectory of the pencil; all other trajectories intersect $J$ just once.

Let $l_2$ be the distance from $x''$ to $x$ when moving along the direction $e_1$. Then the trajectories parallel to $v_2 = w_1e_2 + l_2e_1$ form a pencil of periodic trajectories of length $|v_2|$. The trajectories from the pencils parallel to $e_1$ and $v_2$ intersect one another just once. This implies that the translation structure $\omega$ is isomorphic to the planar torus $\TT_{l_1e_1, v_2}$.
</div>

It is well known that on $\TT_{v_1, v_2}$, flows parallel to vectors in $\mathbb{Z}v_1 \oplus \mathbb{Z}v_2$ are periodic, while flows in all other directions are strongly ergodic. This dichotomy represents the simplest possible dynamical behavior for geodesic flows on translation surfaces.

<div class="thm">
<div class="thm-title">Definition.</div>
<div class="thm-content">
A translation structure $\omega$ on a surface $M$ is said to be <em>elementary</em> if the flow on $M$ in an arbitrary direction is either strongly ergodic or has only periodic components.
</div>
</div>

This definition captures a key aspect of the Veech alternative that we're working toward—the dichotomy in the behavior of geodesic flows, where for any given direction, the flow is either completely periodic or completely ergodic with no "intermediate" behavior.


## <u>Session 3</u> (Magali Jay), March 19th: The Stabilizer of a Planar Structure

Let $\omega$ be a translation surface. Given an element $a\in \SL(2,\RR)$ we define $a\omega$ as the translation surface obtained by post-composing charts $(U_\alpha, f_\alpha)$ of $\omega$ with $a$, i.e. $(U_\alpha, a\circ f_\alpha)$. This defines an action on the space of translation structures and we denote by $\Gamma(\omega)$ the stabilizer subgroup of $\omega$, i.e.,

$$\Gamma(\omega) = \{a\in \SL(2,\RR) \, \vert \, a\omega \text{ is isomorphic to } \omega\}.$$

The goal for this talk is to prove:

<div class="thm">
<div class="thm-title">Proposition 12.</div>
<div class="thm-content">
$\Gamma(\omega)$ is a discrete non-uniform subgroup of $\SL(2,\RR)$.
</div>
</div>

Given a saddle connection, we can cover its interior with a single chart. The image of the saddle connection will be a straight (open) line segment. A *development* of a saddle connection is a vector $v\in\RR^2$ that corresponds to the difference of endpoints of the oriented line segment. So every saddle connection has two developments: $v$ and $-v$. We define $SC(\omega)$ to be the multiset containing all developments of all saddle connections. (A multiset is a set where we also remember how often an element occurs. This can be encoded using a map from the set into the positive integers.)

<div class="thm">
<div class="thm-title">Proposition 13.</div>
<div class="thm-content">
The set of directions of $SC(\omega)$ is everywhere dense in the unit circle $\SS^1$. However, $SC(\omega) \subset \RR^2$ has no limit points.
</div>
</div> 

<div class="proof">
Take $v\in \SS^1$ and let $\epsilon >0$. Consider a singularity $A$ and a segment of length $s>0$ going from $A$ in a direction orthogonal to $v$. We call the endpoint $A'$ and denote the segment by $I$. We can send a ray in direction $v$ from $A$. We assume that this ray never hits a singularity (otherwise we would be done since $v$ would be the direction of a saddle connection). In particular, we can record the length of the trajectory until the first return to $I$ (see the Remark in the last session). The first return time from any point on $I$ has a lower bound $L$. So if we look at the $n$-th return of $A$, which we denote by $A_n$, the distance $l_n$ travelled by $A$ is at least $nL$. 

<img src="/assets/svgs/veech_alternative/denseDirections.svg" alt="Sketch of all the elements involved." style="width: 90%; display: block; margin: 0 auto;">

Now imagine dragging the point $A_n$ to $A$. This results in a saddle connection from $A$ to itself in a direction that differs from $v$ at most by $\theta = \arctan (\frac{s}{nL})$ which is arbitrarily small for large $n\in\NN$. Note that if we would encounter a saddle point $B$ somewhere on the segments whilst sliding, this would give us a saddle connection between $A$ and $B$ which will have a direction even closer to $v$. 

This proves the first claim.

For the second claim, we first note that $0 \in \RR^2$ is not an accumulation point of $SC(\omega)$ because the length of saddle connections of $\omega$ is bounded from below. Now let $v\in SC(\omega)$. We draw a segment in direction $v$ of length $|v|$ from every saddle point. Since there are only finitely many saddle points, the flow in an orthogonal direction $v^\perp$ needs time at least $t>0$ to go from one segment to another one (in forward or backward time). This gives us the existence of a neighborhood $U$ of the union of all the segments that doesn't contain any saddle points other than the ones already contained in the segments themselves. 

<img src="/assets/svgs/veech_alternative/epsilonNbhdShortestSaddleConnection.svg" alt="Sketch of all the elements involved." style="width: 70%; display: block; margin: 0 auto;">

This in turn implies that a development $u$ that is close to $v$ from a saddle point is contained in this neighborhood. This concludes the proof.
</div>

We denote the minimal length of saddle connections in a translaiton structure $\omega$ by $m(\omega)$. For fixed $\omega$, we define the map 

$$
\begin{align*}
d: \GL(2,\RR) &\longrightarrow \RR \\
a &\longmapsto m(a\omega)
\end{align*}
$$


<div class="thm">
<div class="thm-title">Proposition 14.</div>
The map $d$ is coninuous and bounded on $\SL(2,\RR)$.
<div class="thm-content">
</div>
</div> 

<div class="proof">
Let $v\in\RR^2$ be a development of the shortest saddle connection of $a\omega$, so $|v| = d(a)$. Then for $b\in \GL(2,\RR)$ we have 

$$
(ba\inv)v \in SC(b\omega)
$$

and 

$$
d(b) \le |ba\inv v| \le \Vert ba\inv \Vert \cdot d(a),
$$

where $\Vert \cdot \Vert$ denotes the operator norm on $\GL(2,\RR)$. Exchanging the roles of $a$ and $b$, we get

$$
\Vert ab\inv \Vert\inv \cdot d(a) \le d(b) \le \Vert ba\inv \Vert \cdot d(a).
$$

So if $a\rightarrow b$ then $\Vert ab\inv  \Vert \rightarrow 1$ and $d(b) \rightarrow d(a)$ which proves the continuity of $d$. Acting on $\omega$ by an element of $\SL(2,\RR)$ doesn't change the area $S$ of $\omega$. To show that $d$ is bounded on $\SL(2,\RR)$, we will prove that $m(a\omega) \le \sqrt{2\text{Area}(a\omega)} = \sqrt{2\text{Area}(\omega)}$. For this, take a segment $I$ of length $\sqrt{S}$ in an arbitrary direction, and starting in some singular point $A$. We assume that this segment doesn't contain a saddle point besides $A$. Drawing another segment of length $\sqrt{S}$ orthogonal to $I$, also with no other singularities, gives rise to a rectangle of area $S$. We are going to assume that this rectangle contains no singularity since otherwise we would have a saddle connection of length at most $\sqrt{S}$. Now consider a maximal segment $J$ in $I$ on which the first return time of the flow orthogonal to $I$ is constant. This return time is at most $\sqrt{S}$. The boundary of $J$ maps back to $I$. 

<img src="/assets/svgs/veech_alternative/wholeSurfaceRectangle.svg" alt="Sketch directions close to v." style="width: 50%; display: block; margin: 0 auto;">

Since by assumption $I$ doesn't contain another singularity, the "leftmost" point of $J$ has to be mapped to $A$ which give a saddle connection from $A$ to $A$ of length less than $\sqrt{S}$. 
</div>


<div class="thm">
<div class="thm-title">Proposition 15.</div>
$\Gamma(\omega)$ is a non-uniform discrete subgroup of $\SL(2,\RR)$.
<div class="thm-content">
</div>
</div> 

By non-uniform we mean that the quotient $\SL(2,\RR)/\Gamma(\omega)$ is non-compact.

<div class = "proof">
To show discreteness, assume that there is a sequence $a_n \in \Gamma(\omega)$ that converges to $a$. Then the shortest saddle connection of $a_n\omega$ accumulates on the shortest saddle connection of $a\omega$. However this is not possible since $SC(a\omega) = SC(\omega)$ for all $a\in \Gamma(\omega)$ and $SC(\omega)$ is discrete. 

To show that $\Gamma(\omega)\\SL(2,\RR)$ is non-compact, let $v\in SC(\omega)$ and $a\in\SL(2,\RR)$ such that $|av| \le \frac{1}{2}|v|$. Then

$$
| a^nv| \le  \frac{1}{2^n}|v| \rightarrow 0,
$$

i.e. $d(a^n) \rightarrow 0$.
If $\SL(2,\RR)/\Gamma(\omega)$ were compact, we could find a sequence $\gamma_n \in \Gamma(\omega)$ such that $a^n\gamma_n \rightarrow b$. 
</div>

## <u>Session 4</u> (Jiajun Shi), March 24th: Veech's Theorem

We will assume that the translation structure $\omega$ has singular points (see the discussion in the section about Elementary translation surfaces after Theorem 9). The goal is to prove the following theorem:

<div class="thm">
<div class="thm-title">Theorem 16 (the Veech alternative).</div>
<div class="thm-content">
If $\Gamma(\omega)$ is a lattice in $\SL(2,\RR)$, then $\omega$ is elementary. Furthermore, the following are equivalent:
<div style="padding-left: 1.5em; margin-top: 0.5em;">
  <div style="margin-bottom: 0.3em;">(i) trajectories in direction $v$ are periodic</div>
  <div style="margin-bottom: 0.3em;">(ii) there exists an $a\in\Gamma(\omega)$ such that $av=v$</div>
  <div style="margin-bottom: 0.3em;">(iii) there exists a saddle connection parallel to $v$</div>
</div>
</div>
</div>

To prove this theorem, we will need the following key lemma originally from 

<div style="font-size: 0.9em; margin-top: 1em; margin-bottom: 1em; padding-left: 1.5em;">
H. Masur, "Hausdorff dimension of the set of nonergodic foliations of a quadratic differential", <i>Duke Math. J.</i> 66 (1992), 387-442.
</div>

In Vorobets it is cited as follows:

<div class="thm">
<div class="thm-title">Masur's Lemma.</div>
<div class="thm-content">
Suppose that the planar structure $\omega$ has singular points and is such that $m(g^t\omega) \to 0$ as $t \to +\infty$, where
$$g^t = \begin{pmatrix} e^{t/2} & 0 \\ 0 & e^{-t/2} \end{pmatrix} \in \SL(2, \RR).$$
Then the flow in the vertical direction is strongly ergodic.
</div>
</div>

Later we will show how this result follows from another Theorem from the late 80's. 

(There is more to write for this session.)

## <u>Session 5</u> (Fabian Lander), March (?): Masur's Lemma

Let $T$ be an IET on $I = [a,b]$ and $a_0 = a, a_1, \dots, a_k = b$ be the break points of $T$. Denote by $\varepsilon (T)$ the length of the shortest interval(s) of this partition. For each $n\in \NN$ we write $\varepsilon_n(T) = \varepsilon(T^n)$.

<div class="thm">
<div class="thm-title">Theorem.</div>
<div class="thm-content">
If $n\varepsilon_n(T)$ does not converge to 0 as $n\rightarrow \infty$ and $T$ is minimal, then $T$ is strongly ergodic.
</div>
</div>

For a proof we refer to :

<div style="font-size: 0.9em; margin-top: 1em; margin-bottom: 1em; padding-left: 1.5em;">
W. A. Veech, "Boshernitzan's criterion for unique ergodicity of an interval exchange
transformation", <i>Ergodic Theory Dynamical Systems</i> 7 (1987), 149-153.
</div>
and 
<div style="font-size: 0.9em; margin-top: 1em; margin-bottom: 1em; padding-left: 1.5em;">
M. D. Boshernitzan, “Rank two interval exchange transformations”, Ergodic Theory Dynamical Systems 8 (1988), 379-394.
</div>