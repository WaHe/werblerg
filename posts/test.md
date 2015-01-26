Algorithm Complexity
--------------------
For some positive integer $N_0$ and some constant $c$,
$f(N) \in O(g(N)) \longleftrightarrow \forall N > N_0; f(N) \leq c \cdot g(N)$
$f(N) \in \Omega(g(N)) \longleftrightarrow \forall N > N_0; f(N) \geq c \cdot g(N)$

High Level Recurrence Solving
-----------------------------
Generate a recurrence tree. Will get a geometric sequence.
1. If the sequence decreases, the total work is proportional to the work done at the root node.
2. If the sequence increases, the total work is proportional to the number of leaves.
3. If the sequence stays the same, the total work is proportional to the number of levels times the amount of work done at each level.

Master Theorem
--------------
If $f(N)=af(N/b)+p(N)$ then:
1. If $p(N) \in O(N^{(\log_b a) - \epsilon})$ for some $\epsilon > 0$ then $f(N) \in \Theta(N^{\log_b a})$
2. If $p(N) \in \Theta(N^{\log_b a})$ then $f(N) \in \Theta(p(N) \log N)$
3. If $p(N) \in \Omega(N^{(\log_b a) + \epsilon})$ for some $\epsilon > 0$, and if $a \cdot p(N/b) \leq c \cdot p(N)$ for some $c < 1$ and for almost all $N$, then $f(N) \in \Theta(p(N))$
