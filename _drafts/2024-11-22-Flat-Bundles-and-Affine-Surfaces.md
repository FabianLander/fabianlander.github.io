---
layout: post
title: "Affine Surfaces and Flat Bundles"
date: 2024-11-19 08:28:00 +0100
categories: [dilationsurfaces, affine surfaces]
permalink: "/affine-surfaces-and-flat-bundles.html"
excerpt: "We learn about flat line bundles and affines surfaces arising as sections of a certain complex line bundle."
# banner_image: /assets/images/img.png
---
<!-- Translation surfaces can be defined using polygons in the plane, or as a $(G,X)-$structure ( $G =$ translations, $X=\CC$ ), or via holomorphic sections of the cotantent bundle. Affine surfaces can also be readily defined as polygons of as $(G,X)$-structures.
Our goal is to understand how we can get affine surfaces as sections of some, to be determined, bundle. These will be holomorphic (or meromorphic) sections of a certain complex line bundle. We will first develop the local theory and consider the punctured unit disc and flat line bundles over it. -->

Translation surfaces have several equivalent definitions: they can be constructed from polygons in the plane, realized as $(G,X)$-structures (where $G$ is the group of translations and $X = \CC$), or described via holomorphic sections of the cotangent bundle. Similarly, affine surfaces admit both a polygonal description and a $(G,X)$-structure interpretation.
In this post, we to characterize affine surfacse as holomorphic (or meromorphic) sections of a certain complex line bundle. 
<!-- We begin by developing the local theory, focusing our attention on flat line bundles over the punctured unit disc. -->

Let's remind ourselves of what vector bundles are and some basic properties. 

# 1 Vector bundles

A vector bundle is a smooth family of vector spaces. More precisely:

## 1.1. Trivializations

A vector bundle is a smooth family of vector spaces. More precisely, if $M$ is a manifold, a vector bundle over $M$ is a manifold $E$ together with a submersion $p : E \to M$ such that every fiber $p^{-1}(m)$, $m \in M$, has a structure of a $\mathbf{K}$-vector space ($\mathbf{K} = \mathbf{R}$ or $\mathbf{C}$) "varying smoothly" with $m$. The shortest way to make precise this last property is to assume local triviality: given $m \in M$, there is an open neighborhood $U$ of $m$ in $M$ and a diffeomorphism (a trivialization)

$$\psi_U : p^{-1}(U) \to U \times \mathbf{K}^d,$$

such that

(1) $\mathrm{pr}_1 \circ \psi_U = p$ (where $\mathrm{pr}_1 : U \times \mathbf{K}^d \to U \mid (m', v) \mapsto m'$)
(2) for each $m'$ in $U$, $\psi_U$ restricts to a linear isomorphism between $p^{-1}(m')$ and $\mathrm{pr}_1^{-1}(m') = \{m'\} \times \mathbf{K}^d$. 

## 1.2. Changes of Trivializations

If $\psi_U$ and $\psi_V$ are two trivializations defined on $p^{-1}(U)$ and $p^{-1}(V)$ respectively (and $U$ and $V$ are open subsets of $M$) then there exists a smooth map (the change of trivializations)

$$g_{U,V} : U \cap V \longrightarrow \mathrm{GL}_d(\mathbf{K})$$

such that

$$\psi_U \circ \psi_V^{-1} : U \cap V \times \mathbf{K}^d \longrightarrow U \cap V \times \mathbf{K}^d$$
$$(m,v) \longmapsto (m,g_{U,V}(m) \cdot v).$$
Sometimes a vectorbundle is denoted by 

$$ V \hookrightarrow E \rightarrow M$$

which is borrowing the notation from short exact sequences.

<!-- ## 1.2. Changes of Trivializations

If $\psi_U$ and $\psi_V$ are two trivializations defined on $p^{-1}(U)$ and $p^{-1}(V)$ respectively (and $U$ and $V$ are open subsets of $M$) then:

<div class="Lemma">
The <b>change of trivializations</b> is a smooth map
$$ g_{U,V} : U \cap V \longrightarrow \mathrm{GL}_d(\mathbf{K}) $$
such that
$$ \psi_U \circ \psi_V^{-1} : U \cap V \times \mathbf{K}^d \longrightarrow U \cap V \times \mathbf{K}^d $$
$$ (m,v) \longmapsto (m,g_{U,V}(m) \cdot v). $$
</div> -->

If $\psi_W$ is a third trivialization, then the 2 new changes of trivializations $g_{U,W}$ and $g_{V,W}$ are part of a compatibility condition (also called "cocycle" condition):

$$ g_{U,V}(m)g_{V,W}(m) = g_{U,W}(m) \quad \forall m \in U \cap V \cap W. \quad \text{(COMP)} $$

This follows from the equality $\psi_U \circ \psi_V^{-1} \circ \psi_V \circ \psi_W^{-1} = \psi_U \circ \psi_W^{-1}$.

It turns out that these properties deterimine the vector bundle completely.

## 1.3. An equivalent definition 
Given an open covering $\mathcal{U}$ of $M$ and for every $U$ and $V$ in $\mathcal{U}$ a smooth map $$g_{U,V} : U \cap V \to \mathrm{GL}_d(\mathbf{K})$$ such that the relation (COMP) is satisfied for all $U, V$ and $W$ in $\mathcal{U}$, then there exists a unique vector bundle $E$  (up to isomorphism) over $M$ with trivializations 
$\set{\psi_U}$ 
whose transition functions are the maps $g_{U,V}$.

## Flat bundles

We call a bundle flat if it admits a bundle atlas in which all the transition functions are constant. More precisely:

<div class="definition">
    A vector bundle $ V \rightarrow E \rightarrow X $ is <b>flat</b> if there is an open cover $\mathcal{U} = \{U_\alpha\}$ of $X$ and an atlas $\mathcal{A} = \{ \phi_\alpha: \pi\inv(U_\alpha) \rightarrow U_\alpha \times V \}$ such that all transition functions 
    $$ \tau_{\alpha, \beta} : U_\alpha \cap U_\beta \rightarrow \Aut(V)$$ 
    are locally constant<!-- and if they fullfil the following compatibility condition: If $U_\alpha, U_\beta, U_\gamma \in \mathcal(U)$ such that all possible intersections are simply connected, then  -->. We call such a (maximal) atlas a <b>flat structure</b> on $E$.
</div>

A notion of equivalence is the following.

<div class="definition">
   Two flat bundles are <b>equivalent</b> if there is a bundle isomorphism between them that in flat trivializtions is locally constant.
</div>

<!-- A definition which I saw less often but helped me to better understand flat bundles uses the notion of a 'flat frame'. I wrote this flat frame in quotation marks because a which basically fixes some reference frame and then calls all other frames that differ to the initial frame by a constant morphism equivalent.

<div class="definition">
    Let $E$ be a vector bundle with an smooth vector bundle atlas $\mathcal{A} = \{ \phi_\alpha: \pi\inv(U_\alpha) \rightarrow U_\alpha \times V \}$. We call $E$ flat, if for all $\alpha$ there is an equivalence class of smooth sections $[\sigma_\alpha : U_\alpha \rightarrow \mathcal{F}(V)]$ where $\sigma_\alpha \sim \sigma'_\alpha$ if $\sigma_\alpha = g\sigma'_\alpha$ for some $g\in GL(V)$.
</div>

Note that any section can be called flat in this definition. The point is that we set a reference frame which we *call* flat. -->


Flat bundles have natural holonomy representation; a map

$$\chi : \pi_1(X, p) \rightarrow \Aut(L_p)$$

it is defined as follows. For any loop $\gamma$ based at p, we cover it by finitely many open sets $U_1, \dots, U_N$. We define 

$$\chi(\gamma)= \tau_{N,N-1}(\gamma(t_N)) \dots \tau_{1,0}(\gamma(t_1)).$$

To show that this is well defined, we first want to show that $\chi(\gamma)$ does not depend on the choice of $U_1,...,U_N$ or on the subdivision $t_1, ...,t_N$. Given two different covers of $\gamma$ and subdivisions of $[0,1]$ we can construct a refinement of both. So if we show that inserting an open set $U'$ into our cover, say between $t_i$ and $t_{i+1}$, does not change the value of $\chi(\gamma)$, then we're done.
Lets fix the $t_i$'s for now and consider a different cover $U'_1, ..., U'_N$. Every $\gamma(t_i)$ is now contained in $$U_{i-1}\cap U_{i}$$ and  $$U'_{i-1}\cap U'_i$$. Because of the compatibility condition ...
The image of a homotopy is compact and we can therefore cover it by finitely many open sets. During the homotopy we might adjust the subdivision and cover of the curve, but this doesn't change $$\chi(\gamma)$$.

Isomorphic line bundles have the same holonomy representation up to conjugation (coming from the change of the initial and final open set). This establishes the following lemma.

<div class="lemma">
If E and $E'$ are two isomorphic flat bundles, then their two corresponding holonomy representations $\chi$ and $\chi'$ are conjugate to each other, i.e. $\chi' = g \chi g\inv$ for some $g\in \Aut(V)$. We get a map

$$\frac{\{\text{flat bundles } V \rightarrow E \rightarrow X\} }{\text{isomorphism}} \rightarrow \frac{\Hom (\pi_1(X,p), GL(V))}{\text{conjugacy}} $$
</div>


Note that changing the open set $U_1 = U_N$ results a conjugate holonomy. Later we will look at $V = \CC$ with $\Aut (V) = \CC^*$ which is abelian. Therefore, there will be no need to consider conjugacy classes of representations.
<!-- <div class="proof">
...
</div> -->

## Holonomy determines the flat bundle

In turns out that given a homomorphism $\chi: \pi_1(X,p) \rightarrow Aut(V)$ we can construct a flat bundle whose holonomy representation is $\chi$. In other words, the map in the previous Lemma is actually a bijection. For this we consider the trivial bundle (with the obvious flat structure)

$$\widetilde{X} \times \KK^d $$

where $\widetilde{X}$ denotes the universal cover of $X$.
We define an action of $\Gamma = \pi_1(X,x_0)$ by:

$$
\gamma \cdot (\widetilde{x}, v) = (\gamma \cdot \widetilde{x}, \chi(\gamma)v)
$$

where $$\gamma \cdot \widetilde{x}$$ is the action by the deckgroup.

We argue that the quotient 

$$
L_\chi = (\widetilde{X} \times \KK^d )/ \Gamma
$$

is a flat bundle over $\widetilde{X} / \Gamma = X$:

$$
\KK^d \hookrightarrow L_\chi \xrightarrow{p} X,
$$

where $p$ denotes the submersion that projects onto the class of the first component, i.e. $$p([x,v]) = [x],$$ (the brackets denote the classes resulting from the action of $\Gamma$ on either $\widetilde{X} \times \KK^d $ or on $\widetilde{X}$).

Since the action is free, we have that $$p\inv ([x]) = \{[(x,v)] : v \in \KK^d \} \cong \KK^d.$$ Similarly, for a small enough neighborhood $U$ of $x$, we can choose some lift $\widetilde{U} \subset \widetilde{X}$ of $U \subset X$ and establish a trivialisation $p\inv (U) \cong \widetilde{U} \times \KK^d \cong U\times \KK^d$. (This uses the fact, that $$ q:\widetilde{X} \xrightarrow{} \widetilde{X}/\Gamma = X$$ is a covering map.) 
In other words, we send each point of $p\inv (U)$ to its representant whose first component is equal to $\widetilde{x}$.

More explicitly:

$$
\begin{align*}
L_\chi \ni [(x,v)] \mapsto (\gamma \cdot x, \chi(\gamma)v),
\end{align*}
$$

where $\gamma$ is the unique element that sends $x$ to $\widetilde{x}$ or in other words, we send each point of $p\inv (U)$ to its representant whose first component is equal to $\widetilde{x}$.


<!-- Because $$ q:\widetilde{X} \xrightarrow{} \widetilde{X}/\Gamma = X$$ is a covering map, given $\widetilde{x} \in \widetilde{X} $, we can find a neighborhood $\widetilde{U}$ of $\widetilde{x}$ such that $\gamma \widetilde{U}\cap \widetilde{U} = \emptyset$ for all $\gamma \neq e$. 
With this in mind we now construct local trivializations for $L_\chi$:  -->
 
Changing a trivialisation means choosing a different lift of $U$. We take two lifts $\widetilde{U}_1$ and $\widetilde{U}_2$ and denote the two coresponding trivialisations by $\psi_1$ and $\psi_2$. Let $\gamma \in \Gamma$ be the unique element such that $\gamma \cdot \widetilde{U}_1 = \widetilde{U}_2$, which implies that the second component also transforms via $\chi(\gamma)$. Here is a diagram which shows all the maps involved. 

<img src="/assets/images/Flat-Bundles/transitionMapDiagram.jpeg" width="400" style="display: block; margin: 0 auto;" alt="Picture of the generated SVG">

From top to bottom, first the inverse maps are the choice of lifts in the first component and second the projections to $L_\chi$ given by the action of $\Gamma$. 

Given $(x,v) \in U\times \KK^d$, the map $\psi_2 \circ \psi_1\inv$ looks like

$$
\begin{align*}
(x,v) \mapsto (\widetilde{x}_1, v) \mapsto &[(\widetilde{x}_1, v)] \\ =  &[(\widetilde{x}_2, \chi(\gamma)v)] \mapsto (\widetilde{x}_2, \chi(\gamma)v) \mapsto (x,\chi(\gamma)v)

\end{align*}
$$

So we get

$$
\psi_2 \circ \psi_1\inv ([x],v) = ([x],\chi(\gamma)v),
$$

which didn't depend on $x\in U$. Hence, $L_\chi$ is a flat bundle whose holonomy representation is $\chi$.

We now show that any flat bundle with holonomy $\chi$ is isomorpic to $L_\chi$.

TODO: Flesh out the following: Let $E$ be a flat bundle over $X$ with holonmy $\chi$ (its equivalence class). We can pull this bundle back to a flat bundle $\widetilde{E}$ over $\widetilde{X}$. The resulting bundle is equiped with an action of $\pi(X,x_0)$ (see the beginning of the paragraph ) and is trivial, i.e. $\widetilde{E} \cong \widetilde{X} \times V$. The action has the form 


$$
\gamma\cdot (x,v) = (\gamma \cdot x,  \chi(\gamma)v)
$$

<!-- To see that, fix a trivialization of a neighborhood of $\widetilde{x}_0\in \widetilde{X}$. For any $\widetilde{x}\in \widetilde{X}$ we have a unique path (up to homotopy) from $\widetilde{x}_0$ to $\widetilde{x}$ -->

## Punctured Disc

We consider a simple example and use it to start changing the perspective to holomorphic bundles and sections. Take 

$$X = \CC^* = \CC \setminus \{0\}$$ 

whose universal covering map is 

$$\exp : \CC \rightarrow \CC^* .$$

Let $L$ be some flat complex line bundle, i.e.

$$
\CC \hookrightarrow L \xrightarrow{p} \CC^*,
$$

and let 

$$\chi : \pi(\CC^*, z_0) \rightarrow \Aut(L_p) \cong \CC^*$$

be its holonomy (note that $\Aut(L_p)$ is abelian), where we send the generator $\gamma$, which is a positively oriented loop around $0$, to $a\in \CC^*$ . This determines our bundle up to isomorphism and we thus have 

$$
L \cong (\CC \times \CC) /_{ (z,w) \sim ( \gamma \cdot z, \chi(\gamma)w)}.
$$

(Note that the covering space and the fiber are both isomorphic to $\CC$ and the automorphisms of the fibers and the base space are both isomorphic to $\CC^*$. Maybe we should stick to the symbols before.)

<div class="lemma">
Let $m$ be the complex number such that $\exp(2\pi i m) = a$. Then every holomorphic section of $L$ is of the form 
$$
z^m f(z),
$$
where $z$ denotes the standard coordinate of $\CC^*$.
</div>


<!-- <div class="exampls">
Example content here.
</div> -->

<!-- <div class="theorem">
Theorem content here 
</div> -->