---
layout: post
title: "A primer on interval exchange transformations and Rauzy induction"
date: 2024-11-21 16:00:00 +0100
categories: dilationsurfaces rauzy-veech-induction
permalink: "/rauzy-veech-induction.html"
excerpt: "An introduction to Interval Exchange Transformations (IETs) and their properties, focusing on how we can understand them through Rauzy-Veech induction."
---
<!-- <div style="text-align: center;">
    <img src="assets/images/Rauzy-Veech/RV_Teichmflow.png" alt="Alt text" width="600" />
</div> -->


$$ 
\newcommand{\vec}[1]{\mathbf{#1}}
\newcommand{\RR}[1]{\mathbb{R}^{#1}}
\newcommand{\RR}{\mathbb{R}}
\newcommand{\pitop}{\pi^{\text{top}}}
\newcommand{\pibot}{\pi^{\text{bot}}}
\newcommand{\alphatop}{\alpha^{\text{top}}}
\newcommand{\alphabot}{\alpha^{\text{bot}}}
\newcommand{\Acal}{\mathcal{A}}
\newcommand{\RV}{\mathcal{RV}}
\newcommand{\lambdab}{\left(\lambda_{i}\right)}
$$

<!-- $\gdef\Acal{\mathcal{A}}$
$\gdef\pitop{\pi^{\text{top}}}$
$\gdef\pibot{\pi^{\text{bot}}}$
$\gdef\alphatop{\alpha^{\text{top}}}$
$\gdef\alphabot{\alpha^{\text{bot}}}$
$\gdef\RV{\mathcal{RV}}$
$\gdef\lambdab{\left(\lambda_{i}\right)}$
$\gdef\RR{\mathbb{R}}$ -->

# Introduction

<!-- Let's first have an informal discussion on what Interval Exchange Transformations (IETs) are. Later we will (also with not too much rigour) introduce mathematical notation and objects that describes them. When we talk about an IET, we mean a map from an Interval $I$ to itself, that takes a finite partition and shuffles it. Here is a picture of an IET where the partition consists of four segments. -->

Let's start with an informal definition Interval Exchange Transformations (IETs). Later on, we'll gently delve into the mathematical notation and concepts that describe them—nothing too heavy, just enough to spark our curiosity. When we talk about an IET, we're referring to a map from an interval $I$ to itself that takes a finite partition and gives it a good shuffle. Here's an illustration of an IET in action, where the partition is made up of four (colored) segments.

<div style="text-align: center; margin-top: 50px; margin-bottom: 50px; display: flex; flex-direction: column; align-items: center;">
    <img src="assets/images/Rauzy-Veech/informalIET.png" alt="Alt text" width="600" />
    <br>
    <span style="font-style: italic; font-size: 14px; color: grey;">Cartoon of an IET using four colored segments of different lengths.</span>
</div>

This shuffling is purely about rearranging the pieces using translations — no flipping or stretching allowed.


<div style="text-align: center; margin-top: 50px; margin-bottom: 50px; display: flex; flex-direction: column; align-items: center;">
    <img src="assets/images/Rauzy-Veech/flipStretch.png" alt="Alt text" width="600" />
        <br>
    <span style="font-size: 14px; color: grey;">No flips or stretches allowed.</span>
</div>

We can repeatedly apply an IET to the interval. The following picture illustrates that. We label the pieces (segments) between the cuts $A$, $B$, $C$, and $D$ and use the colors to keep track of the initial partition. Note that the initial segments might get cut-up at some point, for instance in the second iteration the blue segment (initially labeled with the letter $A$). It can also happen that a segment merges back together; in the third iteration the blue segment merged together with the previous order (but at a different position). 

<div style="text-align: center; margin-top: 50px; margin-bottom: 50px;">
    <img src="assets/images/Rauzy-Veech/iterateInformal.png" alt="Alt text" width="400" />
        <br>
    <span style="font-size: 14px; color: grey;"> Iterating an IET three times. </span>
</div>

Focusing on one point $p$ on the interval, we associate a sequence of letters by remembering the labels it visits. This sequence is called the **symbolic** **orbit** or the **symbolic** **code** or simply **code**.

<div style="text-align: center; margin-top: 50px; margin-bottom: 50px;">
    <img src="assets/images/Rauzy-Veech/symbolicCodeInformal.png" alt="Alt text" width="400" />
        <br>
    <span style="font-size: 14px; color: grey;">The code of $p$ starts with $CBBA\dots$ .</span>
</div>

And that's where the plot thickens and compelling questions emerge:
- Will there be pieces that find their way back home, staying fixed or eventually returning to their original spot?
- Will the colors blend together?
- Will the code of a point (or even a whole neighborhood) have a certain predictable pattern?

Note that in the example, the rightmost (green) segment gets mapped to itself and has no interesting behaviour, or in other words, it is completely predictable and doesn't interact with the rest of the interval. Analyzing that IET boils down to ignoring that segment and just focus on the IET with the three segments. Such IETs are called **reducible**. Here is another IET that naturally splits into two separate IETs.

<div style="text-align: center; margin-top: 50px; margin-bottom: 50px;">
    <img src="assets/images/Rauzy-Veech/reducibleInformal.png" alt="Alt text" width="400" />
        <br>
    <span style="font-size: 14px; color: grey;">This is a reducible IET that can be split into two independent (irreducible) IETs.</span>
</div>

# Defining IETs

The data that describe an IET with $d > 1$ segments consists of the (relative) lengths of the segments and a permutation that tells us how to rearrange the pieces. There are two common ways of encoding this rearrangement. Some authors <span style="color: #8B0000;">\[references\]</span> like to use numbers $1,\dots,d$ to label the segments ($1$ for the leftmost and $d$ for the rightmost segment) and then use permutations $\pi: \\{1, \dots, d\\} \rightarrow \\{1, \dots, d\\}$ to encode the shuffling. Another (very similar) way is to use any set $\Acal$ consisting of $d$ symbols, called **alphabet**, and define two linear orders on $\Acal$ which then define the permutation in these symbols. We will use the latter convention. 

Let's consider an example similar to the first picture of this post for $d = 3$. We tacitly used the symbols $A,B,C,D$ in that order for our IET,  so let's take $\Acal := \\{ A,B,C,D\\}$. To change things up let us now pick a different ordering of $\Acal$ via

$$
\pitop = \begin{pmatrix} B & C & A & D \\ 1 & 2 & 3 & 4  \end{pmatrix} \qquad  \text{ and } \qquad \pibot = \begin{pmatrix} C & A & D & B \\ 1 & 2 & 3 & 4  \end{pmatrix}.
$$

Here $\pitop$ defines how we label the partition initially (the top interval in the picture) and $\pibot$ defines the rearranging of those labelled segments (the labeling in the bottom interval in the picture).
So we label the segments from left to right with $B,C,A,D$ and then rearrange them to $C,A,D,B$. Here is a picture where the lengths of the segments are given by $\lambda = (1,\frac{3}{2}, 1, \frac{1}{2})$. 

More generally we denote the lenghts by $\lambda = \lambdab_{i \in \Acal} \in \mathbb{R}^d_+$ using the order on $\Acal$ that is defined via $\pitop$.
The total length of the interval is therefore $\vert \lambda \vert_1= \sum_{i\in \Acal} \vert \lambda_i \vert$.

Note that the picture would look qualitatively the same when we multipliy $\lambda$ by any constant greater than $0$ since this would only have the effect of stretching the interval without changing the relative lengths of the pieces. 

<div style="text-align: center; margin-top: 50px; margin-bottom: 50px;">
    <img src="assets/images/Rauzy-Veech/codingExample.png" alt="Alt text" width="400" />
        <br>
    <span style="font-size: 14px; color: grey;"> Example of a coding for an IET using the alphabet $\Acal = \{A,B,C,D\}$. </span>
</div>

The permutation that describes the IET is therefore 

$$
\pi = \pitop \circ (\pibot)^{-1} = \begin{pmatrix} B & C & A & D \\ C & A & D & B  \end{pmatrix}.
$$

We can read this as: segments are initially identified as \(B, C, A, D\) and subsequently rearranged into the order \(C, A, B, D\).

You might have wondered what happens to the boundary points of the segments. We will consider only partitions where the "segments" are non-empty intervals of the form $[a,b)$. Usually segments are (spaces homeomophic to) closed intervals. For instance, in the previous picture, the leftmost point of the segment $C$ gets mapped to $0 \in [0,\vert \lambda \vert_1 )$.

We denote the endpoints of the subintervals of the partitions in the domain and image (the "top"- and "bottom"- interval) by $\alphatop_0, \alphatop_1, \dots, \alphatop_d$ and $\alphabot_0, \alphabot_1, \dots, \alphabot_d$which are defined as

$$
\alpha_k^\text{top} = \sum_{i:\pi^{\text{top}}(i)\le k} \lambda_i \quad \text{and} \quad \alpha_k^\text{bot} = \sum_{i:\pi^{\text{bot}}(i)\le k} \lambda_i.
$$

We denote our open(!) subintervals by

$$
I^\text{top}_i = (\alphatop_{\pitop(i) - 1}, \alphatop_{\pitop(i)} ) \quad \text{and} \quad I^\text{bot}_i = (\alphabot_{\pibot(i) - 1}, \alphabot_{\pibot(i)} ).
$$

Here is a picture of our example with all the data and notation associated to it:

<div style="text-align: center; margin-top: 50px; margin-bottom: 50px;">
    <img src="assets/images/Rauzy-Veech/fullDataExample.png" alt="Alt text" width="1000" />
        <br>
    <span style="font-size: 14px; color: grey;">The defining quantities and notation.</span>
</div>

We call $\alpha_1^\text{top}, \dots , \alpha_{d-1}^\text{top}$ and $\alpha_1^\text{bot}, \dots , \alpha_{d-1}^\text{bot}$ the **top** and **bottom singularities** of the interval exchange transformation $T_{(\pi,\lambda)}$.

## Rauzy-Veech Induction for $d = 2$

# Generalized Rotations

Lets label our segments $A,B$. or $d=2$ there is only one non-trivial permutation; the transposition $\pi: A\mapsto B, B\mapsto A$. So we are not mentioning $\pi$ in our notation. Given $(\lambda_{A}, \lambda_{B}) \in \RR_+^2$ the map $T_{\lambda} = T_{(\lambda_A,\lambda_B)}$ is given by 



$$
\begin{aligned}
T_\lambda: [0,\lambda_A + \lambda_B] &\rightarrow [0,\lambda_A + \lambda_B] \\
x &\mapsto 
\begin{cases} 
x + \lambda_B & \text{if } x < \lambda_A \\
x - \lambda_A & \text{if } x > \lambda_A, \\
\text{undefined} & \text{if } x = \lambda_A.
\end{cases} \\ 
\end{aligned}
$$


<div style="text-align: center; margin-top: 50px; margin-bottom: 50px;">
    <img src="assets/images/Rauzy-Veech/d_equals_2.png" alt="Alt text" width="400" />
        <br>
    <span style="font-size: 14px; color: grey;">IET with one break point.</span>
</div>

Clearly, undoing this transformation, means swapping the pieces back to their original position. This is is exactly the map $T_{(\lambda_B, \lambda_a)}$ (mind the order). So 

$$(T_{(\lambda_A, \lambda_B)})^{-1} = T_{(\lambda_B, \lambda_A)}.$$

This is a generalization of the IETs that emerge for circle rotations. A circle rotation by angle $\alpha$ is yields the IET $T_{(1-\alpha, \alpha)}.$ <span style="color: #8B0000;">[ELABORATE]</span>


# Rauzy-Veech Induction

Rauzy-Veech Induction is a process that iteratively modifies an IET whilst preserving important dynamical properties. This technique, named after Gérard Rauzy and William Veech, involves repeatedly applying a transformation to an IET to obtain a sequence of IETs, each derived from the previous one through a specific operation based on the lengths $\lambda = (\lambda_A, \lambda_B)$.

Given $T_\lambda$, the map $\mathcal{RV}(T_\lambda)$ is the interval exchange induced on $[0,\vert \lambda \vert_1 - min \\{\lambda_A, \lambda_B\\}]$ via one of the two following "cut" operations:

- **Top induction**: 
    
    If $\lambda_A < \lambda_B$, we set   

    $$\mathcal{RV}(T_{(\lambda_A,\lambda_B)}) = T_{(\lambda_A, \lambda_B - \lambda_A)}.$$ 

    Or if we identify $\lambda \in \RR_+^2$ with $T_\lambda$, we set 

    $$\mathcal{RV}(\lambda) =  \begin{pmatrix} 1 & 0 \\ -1 & 1   \end{pmatrix}\lambda.$$

    Here is a picture that illustrates this cut operation:

    <div style="text-align: center; margin-top: 50px; margin-bottom: 50px;">
    <img src="assets/images/Rauzy-Veech/topInduction_d_2.png" alt="Alt text" width="250" />
        <br>
    <span style="font-size: 14px; color: grey;">Top induction cuts off a piece from the top interval.</span>
    </div>

- **Bot induction**: 
    
    If $\lambda_A > \lambda_B$, we set   

    $$\mathcal{RV}(T_{(\lambda_A,\lambda_B)}) = T_{(\lambda_A - \lambda_B, \lambda_B)}.$$ 

    Or if we identify $\lambda \in \RR_+^2$ with $T_\lambda$, we set 

    $$\mathcal{RV}(\lambda) =  \begin{pmatrix} 1 & -1 \\ 0 & 1   \end{pmatrix}\lambda.$$

    Here is a picture that illustrates this cut operation:

    <div style="text-align: center; margin-top: 50px; margin-bottom: 50px;">
    <img src="assets/images/Rauzy-Veech/botInduction_d_2.png" alt="Alt text" width="250" />
        <br>
    <span style="font-size: 14px; color: grey;">Bot induction cuts off a piece from the bottom interval.</span>
    </div>

Rauzy Veech induction is not defined for $\lambda_A = \lambda_B$. 



Lets investigate how the codes of the two Interval exchanges are related. 
<span style="color: #8B0000;">ADD:
If $\lambda_A$ and $\lambda_B$ are rational multiples of each other then we can apply this induction finitely many times. If they are rationally independent, then we can perform Rauzy-Veech induction infinitely many times and the lengths of the induced intervals tend to $0$.
</span>

For brevity let's denote $T' = \RV (T) : I' \rightarrow I'$ for some IET $T = T_{(\lambda_A,\lambda_B)}: I\rightarrow I$. Note that if we pick a point $x$ in $I'$ it will also be in $I$, so if we look at the code $c = c(x)$ of $x$ under $T'$ (for example $c = ABAABAAB...$), then it is reasonable to ask what the code of $x$ under $T$ looks like. The following lemma is a nice result that answers this question. 
<div class="theorem">
    <strong>Lemma.</strong> Let $T' = \mathcal{RV}(T)$ and $c \in \Acal^\mathbb{N}$ a coding for a point $x\in I'$. If a top induction was performed to obtain $T'$, then the coding for $T$ is given by the substitution rule
    $$
    \begin{aligned}
    \sigma^\text{top}: 
    \begin{cases} 
    A \mapsto AB, \\
    B \mapsto B
    \end{cases} \\ 
    \end{aligned}
    $$
    If a bot induction was performed to obtain $T'$, then the coding for $T$ is given by the substitution rule
    $$
    \begin{aligned}
    \sigma^\text{bot}: 
    \begin{cases} 
    A \mapsto A, \\
    B \mapsto AB
    \end{cases} \\ 
    \end{aligned}
    $$

<div class="proof">
<strong>Proof.</strong> We show only the top-case.... 

        
Here is an illustration of that fact for the Bot-Case. 

<div style="text-align: center; margin-top: 50px; margin-bottom: 50px;">
<img src="assets/images/Rauzy-Veech/codeMapSigma2.png" alt="Alt text" width="800" />
    <br>
<span style="font-size: 14px; color: grey;">
<br>
Illustration of the substitution rule $\sigma^\text{bot}$ for an IET $T$ with one corresponding Rauzy-Veech (Bot-)induction step $T' = \mathcal{RV}(T)$. We enter $I_B$ one step earlier under $T'$ than under $T$, i.e. $B \mapsto AB$.</span>
</div>
    &#x25A0;
</div>
</div>




<div class="theorem">
    <strong>Lemma.</strong> Let $T' = \mathcal{RV}(T)$ and $c \in \Acal^\mathbb{N}$ a coding for a point $x\in I'$. If a top induction was performed to obtain $T'$, then the coding for $T$ is given by the substitution rule
    $$
    \begin{aligned}
    \sigma^\text{top}: 
    \begin{cases} 
    A \mapsto AB, \\
    B \mapsto B
    \end{cases} \\ 
    \end{aligned}
    $$
    If a bot induction was performed to obtain $T'$, then the coding for $T$ is given by the substitution rule
    $$
    \begin{aligned}
    \sigma^\text{bot}: 
    \begin{cases} 
    A \mapsto A, \\
    B \mapsto AB
    \end{cases} \\ 
    \end{aligned}
    $$

    <div class="proof">
    <strong>Proof.</strong> We show only the top-case.... 
        
        &#x25A0;
    </div>
</div>

<!-- <span style="color: #8B0000;">TODO: \[references\], lingo (Use any or all of: segments, slices, subintervalls, chunks, fragments, blocs)</span> -->



<div class="theorem">
    <strong>Proposition.</strong> 
    <div class="proof">
    <strong>Proof.</strong>   
        
        &#x25A0;
    </div>
</div>

# Rauzy Induction and Suspensions of Flat Tori

Interval exchange transformation arise in the study of translation surfaces. In this section we focus on so called flat tori. Think of them as parallelograms (of area 1) in the plane where we glue parallel sides together. One very nice property of translation surfaces is that we have a notion of direction. That means that independent of where we are on the surface we can consistently point in given direction $\theta$.

<span style="color: #8B0000;">TODO: Say more for absolute beginners.</span>

Given an interval exchange transformation $T_{(\lambda_A, \lambda_B)}$, we can construct a flat torus whose poincare map of a horizontal embedded interval under the vertical flow is $T_{(\lambda_A, \lambda_B)}$. For $\lambda = (\lambda_A, \lambda_B)$ choose $(\tau_A, \tau_B)$ such that the parallelogram spanned by $\zeta_A = (\lambda_A, \tau_A)$ and $\zeta_B = (\lambda_B, \tau_B)$ has area $1$.

<div style="text-align: center; margin-top: 50px; margin-bottom: 50px;">
<img src="assets/images/Rauzy-Veech/suspensionVectors_d_2.png" alt="Alt text" width="600" />
    <br>
<span style="font-size: 14px; color: grey;">
<br>
Illustration of the substitution rule $\sigma^\text{bot}$ for an IET $T$ with one corresponding Rauzy-Veech (Bot-)induction step $T' = \mathcal{RV}(T)$. We enter $I_B$ one step earlier under $T'$ than under $T$, i.e. $B \mapsto AB$.</span>
</div>

<!-- Informally, an interval exchange transformation (IET) is a predetermined shuffling of (finitely many) segments in an Interval. We are particularly interested in exploring the dynamical properties that emerge from the repeated application of such transformations. -->


<!-- ## Interval exchange transformations
We label our segments using elements of a set, called alphabet, $\Acal$ with $d > 1$ elements. Let $\lambda = (\lambda_i)_{i\in \mathcal{A}}$ be a vector of positive real numbers describing the lengths of our segments. Consider bijections $\pi^{\text{top}}$ and $\pi^{\text{bot}}$ which will define two orderings of our segments. The permutation $\pi^{\text{top}}$ describes the initial ordering and $\pi^{\text{bot}}$ descibes the ordering afterwards. This data defines a map which we call an Interval Exchange Transformation (IET) denoted by $T_2$, where $\pi$ only contains the combinatorial data of the shuffling, i.e. $\pi =   \pi^{\text{bot}} \circ (\pi^{\text{top}})^{-1}$. We denote by $\alpha_k$ the position of the endpoint of the $k$-th segment, i.e.
  -->




<!-- Identifying the unit circle $S^1$ with $\mathbb{R} / \mathbb{Z}$ we define a rotation of angle $\alpha$ via the map

$$
\begin{align}
T_\alpha: \mathbb{R} / \mathbb{Z} &\rightarrow \mathbb{R} / \mathbb{Z}, \\
x &\mapsto x + \alpha \text{ (mod 1) }
\end{align}
$$ -->

<!-- We define a rotation of angle $\alpha$ by

$$
\begin{aligned}
T_\alpha : [0,
1] &\rightarrow [0,1] \\
x &\mapsto 
\begin{cases} 
x + \alpha & \text{if } x < 1 - \alpha, \\
x +\alpha -1 & \text{if } x > 1 - \alpha, \\
\text{undefined} & \text{if } x = 1 - \alpha.
\end{cases} \\ 
\end{aligned}
$$ -->

<!-- $$
\begin{aligned}
T_\alpha : [0,1] &\rightarrow [0,1] \\
x &\mapsto 
\begin{cases} 
x + \alpha & \text{if } x < 1 - \alpha, \\
x +\alpha -1 & \text{if } x > 1 - \alpha, \\
\text{undefined} & \text{if } x = 1 - \alpha.
\end{cases}
\end{aligned}
$$ -->

