# Sheaves, Cohomology, Divisors, and Line Bundles
## Based on Gunning's *Lectures on Riemann Surfaces* (1966)

This document summarizes chapters §2 (Sheaves), §3 (Cohomology), and §4 (Divisors and Line Bundles) from R. C. Gunning's *Lectures on Riemann Surfaces* (1966). The approach is "old school" — geometric, germ-based, and Čech-theoretic — with minimal abstraction from modern sheaf-theoretic language.

---

## §2. Sheaves

### a. Definition of Sheaves
A **sheaf** over a topological space $M$ is defined by:
- A topological space $\mathcal{J}$.
- A continuous projection $\pi: \mathcal{J} \to M$, which is a local homeomorphism (i.e., every point in $\mathcal{J}$ has a neighborhood homeomorphic via $\pi$ to an open set in $M$).
- For each point $p \in M$, the fiber $\mathcal{J}_p = \pi^{-1}(p)$ is an abelian group.
- Group operations (addition, inverse, zero) are continuous with respect to this topology.

Each $\mathcal{J}_p$ is called a **stalk**, and intuitively contains "germs" of sections at $p$.

### b. Sections and Presheaves
A **section** of $\mathcal{J}$ over an open set $U \subset M$ is a continuous map $s: U \to \mathcal{J}$ such that $\pi \circ s = \text{id}_U$.

The set of all sections over $U$ is denoted $\Gamma(U, \mathcal{J})$ and has a natural abelian group structure (pointwise addition).

A **presheaf** is the weaker notion assigning:
- To each open set $U$ a group $\mathcal{J}_U$.
- To each inclusion $V \subset U$, a restriction map $\rho_{UV}: \mathcal{J}_U \to \mathcal{J}_V$.
  
Presheaves generalize sections without imposing the locality and gluing conditions of sheaves.

### c. Completion of Presheaves to Sheaves
A presheaf is **complete** if:
1. (Identity of restrictions) If two sections agree on every set of a cover, they are equal globally.
2. (Gluing of sections) Compatible local data on overlaps can be glued into a global section.

Every complete presheaf defines a sheaf via a standard direct limit construction over neighborhoods of each point.

### d. Examples of Sheaves
- $\mathcal{O}$: holomorphic functions.
- $\mathcal{O}^*$: nowhere-vanishing holomorphic functions.
- $\mathcal{M}$: meromorphic functions.
- $\mathcal{C}^\infty$, $\mathcal{C}^0$: smooth and continuous functions.

The stalk of $\mathcal{O}$ at $p$ corresponds to convergent power series at $p$.

### e. Sheaf Homomorphisms and Exact Sequences
A **sheaf homomorphism** $\varphi: \mathcal{J} \to \mathcal{K}$ is a continuous map respecting the fibers and inducing group homomorphisms $\varphi_p: \mathcal{J}_p \to \mathcal{K}_p$ on each stalk.

Subsheaves and quotient sheaves are defined analogously to subgroups and quotient groups.

Important exact sequence example:
$$
0 \to \mathbb{Z} \to \mathcal{O} \xrightarrow{e^{2\pi i \cdot}} \mathcal{O}^* \to 0.
$$

---

## §3. Cohomology

### a. Čech Cohomology of a Covering
Given an open covering $\mathcal{U} = \{ U_\alpha \}$ of $M$, define the **nerve** $N(\mathcal{U})$ as the simplicial complex where simplices correspond to non-empty intersections $U_{\alpha_0} \cap \dots \cap U_{\alpha_q}$.

For a sheaf $\mathcal{J}$, a $q$-cochain assigns to each $q$-simplex $\sigma$ a section over $|\sigma|$ (the support of $\sigma$).

The **coboundary operator** $\delta$ maps $q$-cochains to $(q+1)$-cochains using alternating sums of restrictions.

Define:
- **Cocycles**: $\ker \delta$.
- **Coboundaries**: $\text{im}\, \delta$.

Cohomology of the cover:
$$
H^q(\mathcal{U}, \mathcal{J}) = \frac{\text{cocycles}}{\text{coboundaries}}.
$$

### b. Cohomology of a Space
Taking the direct limit over all refinements:
$$
H^q(M, \mathcal{J}) = \varinjlim_{\mathcal{U}} H^q(\mathcal{U}, \mathcal{J}).
$$

### c. Exact Sequences in Cohomology
For a short exact sequence of sheaves:
$$
0 \to \mathcal{J}' \to \mathcal{J} \to \mathcal{J}'' \to 0,
$$
we obtain a long exact sequence in cohomology, relating the cohomology groups of these sheaves.

### d. Fine Sheaves
A sheaf is **fine** if it admits partitions of unity subordinate to every locally finite cover.

For fine sheaves, higher cohomology vanishes:
$$
H^q(M, \mathcal{J}) = 0 \quad \text{for all} \quad q > 0.
$$

### e. Dolbeault Example (Old School)
On open $U \subset \mathbb{C}$:
$$
0 \to \mathcal{O} \to \mathcal{C}^\infty \xrightarrow{\bar{\partial}} \mathcal{C}^\infty \to 0
$$
resolves holomorphic functions by smooth ones.

Result: $H^1(U, \mathcal{O}) = 0$.

### f. Leray's Theorem
If a cover $\mathcal{U}$ is **Leray** for $\mathcal{J}$ (meaning $H^q(|\sigma|, \mathcal{J}) = 0$ for $q > 0$), then:
$$
H^q(M, \mathcal{J}) = H^q(\mathcal{U}, \mathcal{J}).
$$

---

## §4. Divisors and Line Bundles

### a. Divisors
Define the **sheaf of divisors** as:
$$
\mathcal{D} = \mathcal{M}^* / \mathcal{O}^*.
$$

A **divisor** is a global section of $\mathcal{D}$, i.e.,
$$
\mathfrak{d} = \sum_{p \in M} n_p \cdot p,
$$
with finitely many non-zero $n_p$.

The divisor of a meromorphic function $f$ is:
$$
\text{div}(f) = \sum_{p \in M} \text{ord}_p(f) \cdot p.
$$

Exact sequence:
$$
0 \to \mathcal{O}^* \to \mathcal{M}^* \to \mathcal{D} \to 0.
$$

On non-compact Riemann surfaces: every divisor is the divisor of a global meromorphic function.

### b. Line Bundles and Picard Group
The group of line bundles is:
$$
\text{Pic}(M) = H^1(M, \mathcal{O}^*).
$$

Divisors correspond to line bundles via the connecting homomorphism from the exact sequence above.

Two divisors are **linearly equivalent** if their difference is principal.

### c. Sheaves of Sections of Line Bundles
Given a line bundle $g \in H^1(M, \mathcal{O}^*)$:
- $\mathcal{O}(g)$: holomorphic sections.
- $\mathcal{M}(g)$: meromorphic sections.

Local sections satisfy:
$$
f_\beta = g_{\alpha\beta} f_\alpha \quad \text{on} \quad U_\alpha \cap U_\beta.
$$

For a divisor $\mathfrak{d}$, define:
$$
\mathcal{O}_M(\mathfrak{d}) = \{ f \in \mathcal{M} \mid \text{div}(f) + \mathfrak{d} \geq 0 \}.
$$
This is isomorphic to the sheaf of holomorphic sections of the corresponding line bundle.

### d. Finiteness Theorems
For compact Riemann surfaces:
$$
\dim H^q(M, \mathcal{O}(g)) < \infty \quad \text{for} \quad q = 0, 1.
$$

Proof strategy:
- Use Dolbeault-type resolutions.
- Work with square-integrable cochains.
- Apply compactness arguments via partitions of unity.

---

# Prompt for AI Agents

When discussing sheaves, cohomology, divisors, and line bundles, adhere to the following conventions:

- Definitions follow R. C. Gunning’s *Lectures on Riemann Surfaces* (1966).
- Sheaves are topological spaces with local homeomorphisms to the base space, with abelian group stalks and continuous group operations.
- Presheaves are made into sheaves via germs and direct limits.
- Cohomology is defined using Čech theory, based on open covers and their nerves.
- Fine sheaves have partitions of unity and vanish in higher cohomology.
- Divisors are global sections of $\mathcal{D} = \mathcal{M}^* / \mathcal{O}^*$.
- Line bundles are classified by $H^1(M, \mathcal{O}^*)$ and relate to divisors via exact sequences.
- Use explicit Čech cochains, not derived functors.
- Mathematical notation should use $...$ for inline math and $$...$$ for display math.

All discussions should stay in this classical "old school" style unless stated otherwise.
