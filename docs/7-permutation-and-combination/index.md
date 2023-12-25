---
slug: /permutation-and-combination
sidebar_position: 7
---

# Permutation & Combination


## Permutation
Permutations, refer to the arrangements of objects where the order matters.

$$
^nP_r= \frac{n!}{(n−r)!}
$$

<br />


:::info[]

There's a subtle difference between backtracking and permutations: in permutations, once an element is used, it can't be reused. Hence, in backtracking, we can't use techniques like a visited array or mask.

:::

<br />

## Combination
Combinations, on the other hand, represent selections of items where the order doesn't matter. 


$$
^nC_r= \frac{n!}{r!(n−r)!}
$$


:::info[]

There's a distinction between permutations and combinations in code. In permutations, we need to restart from the beginning of an array each time, whereas in combinations, we can begin from the specified index element onward.

:::