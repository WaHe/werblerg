Algorithm Complexity
====================
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


Bits and Bytes
==============
Integer Representation
----------------------

### Two's complement
* Negation of a positive number `n` is `~(n - 1)`
* Easy way to calculate: determine decimal form like a positive number, but value of highest power of two is negative.
* Largest representable number is $2^{b-1} - 1$, smallest is $-2^{b-1}$
* Example: `5 = 0b00000101, -5 = 0b1111011`

### Unsigned
* Largest representable number is $2^{b-1}$, smallest is zero.
* If leftmost bit is zero, then value is the same as a signed integer

Floating Point Representation
-----------------------------

### IEEE 754
* Given a sign $s \in \{0, 1\}$, mantissa $m \in [1, 2)$, and exponent $e$: $(-1)^s \cdot m \cdot e$
* Positive/negative infinity is exponent of all ones with mantissa of all zeroes.
* Zero corresponds to exponent of all zeroes
* Machine epsilon: smallest number `e` such that `1 + e != 1`
* 32 bit format: `[1 sign bit] [8 exponent bits] [23 fraction bits]`, $e = $ exponent $-127$
* 64 bit format: `[1 sign bit] [11 exponent bits] [52 fraction bits]`, $e = $ exponent $-1023$

Using Integers As Sets
----------------------
* Union: `a | b`
* Intersection: `a & b`
* Subtraction: `a & ~b`
* Set negation: `0xFFFFFFFF ^ a` (for 32 bit integers)
* Set bit: `a |= 1 << bit_number`
* Clear bit: `a &= ~(1 << bit_number)`
* Test bit: `a & 1 << bit_number != 0`

Tricks
------
* Get lowest set bit: `x & ~(x - 1)`
* Determine if a number is a power of two: 'x & (x - 1) == 0'

Bit Shifting
------------
* Arithmetic shift: shift bits to the left, adding zeroes to the right. Shifting bits to the right, add the value of the most significant bit on the left (this preserves the sign for a two's complement integer value).
* Logical shift: shift bits to right or left using zeroes to fill empty spaces.
* Arithmetic shifts are used for signed numbers in C/C++

Hexadecimal Numbers
-------------------
* Each value 0-f can be represented using four bits


Sorting
=======
Mergesort
---------
### Algorithm
Recursively split into halves until only single elements exist. Combine halves such that the new combination is sorted.

    int[] mergeSort (int[] data) {
       if (data.Length == 1)
          return data;
       int middle = data.Length / 2;
       int[] left = mergeSort(subArray(data, 0, middle - 1));
       int[] right = mergeSort(subArray(data, middle, data.Length - 1));
       int[] result = new int[data.Length];
       int dPtr = 0;
       int lPtr = 0;
       int rPtr = 0;
       while (dPtr < data.Length) {
          if (lPtr == left.Length) {
             result[dPtr] = right[rPtr];
             rPtr++;         
          } else if (rPtr == right.Length) {
             result[dPtr] = left[lPtr];
             lPtr++;
          } else if (left[lPtr] < right[rPtr]) {
             result[dPtr] = left[lPtr];
             lPtr++;
          } else {
             result[dPtr] = right[rPtr];
             rPtr++;         
          }
          dPtr++;
       }
       return result;
    }

### Properties
* Average/best/worst case are all $O(n \log n)$
* $O(n)$ worst case space complexity
* Common optimization: if largest value of left half is smaller than the smallest value of the right half, then most of the merge step can be skipped
* Natural merge sort: first detect all runs (contiguous groups of already-sorted elements), merge runs
* Stable sort

Heapsort
--------
### Algorithm
Create an empty heap data structure. Add all the elements to the heap. Remove all the elements from the heap and return them in order.

    Heap h = new Heap();
    for (int i = 0; i < data.Length; i++)
       h.Add(data[i]);
    int[] result = new int[data.Length];
    for (int i = 0; i < data.Length; i++)
       data[i] = h.RemoveLowest();

### Properties
* Average/best/worst case are all $O(n \log n)$


Quicksort
---------
### Algorithm
Pick a pivot in the array. Swap pivot with rightmost value. Iterate through, swapping items that are smaller than the pivot to the left of the pivot. Do the same thing with the half to the left of the pivot and the half to the right of the pivot.

    Array quickSort(Array data) {
       if (Array.Length <= 1)
          return;
       pivot = Array[Array.Length / 2]; //choose the center element to be the pivot
       Array left = new Array();
       Array right = new Array();
       for (int i = 0; i < Array.Length; i++)
          if (i != Array.Length / 2) {
             if (Array[i] <= pivot)
                left.Add(Array[i]);
             else
                right.Add(Array[i]);
          }
       return concatenate(quickSort(left), pivot, quickSort(right));
    }

### Properties
* Best/average case $O(n \log n)$, worst case $O(n^2)$
* Pivot selection is important
    * Selecting the first element as the pivot will cause the worst-case running time on an already sorted list
    * A decent pick is the median of the first, middle, and last element
* "Dutch national flag problem" solution for many values equal to the pivot (basically keep a left section less than the pivot, right section greater than the pivot, AND a middle section that's equal to the pivot)
* Not stable

Insertion Sort
--------------
### Algorithm
For each element in the array, find the spot to the left (which is already sorted) to insert that element such that that part of the list remains sorted.
    
    for (int i = 0; i <= data.Length; i++) {
       int j = i;
       while (j > 0 && data[i] < data[j - 1])
          j--;
       int tmp = data[i];
       for (int k = i; k > j; k--)
          data[k] = data[k - 1];
       data[j] = tmp;
    }

### Properties
* Best/worst/average case $O(n^2)$
* Good for small $n$ because of its small constant
* Stable sort
* Online (can sort list as it is received)


Radix Sort
----------
### Algorithm
Take the least siginificant digit of each key (or group of bits), group the keys based on that digit, keeping the order of keys, repeat the same process with the next, more significant digit.

    from math import log
     
    def getDigit(num, base, digit_num):
        # pulls the selected digit
        return (num // base ** digit_num) % base  
     
    def makeBlanks(size):
        # create a list of empty lists to hold the split by digit
        return [[] for _ in xrange(size)]  
     
    def split(a_list, base, digit_num):
        buckets = makeBlanks(base)
        for num in a_list:
            # append the number to the list selected by the digit
            buckets[getDigit(num, base, digit_num)].append(num)  
        return buckets
     
    # concatenate the lists back in order for the next step
    def merge(a_list): 
        new_list = []
        for sublist in a_list:
           new_list.extend(sublist)
        return new_list
     
    def maxAbs(a_list):
        # largest abs value element of a list
        return max(abs(num) for num in a_list)  
     
    def radixSort(a_list, base):
        # there are as many passes as there are digits in the longest number
        passes = int(round(log(maxAbs(a_list), base)) + 1) 
        new_list = a_list[:]
        for digit_num in range(passes):
            new_list = merge(split(new_list, base, digit_num))
        return new_list

### Properties
* Worst case $O(k \cdot n)$, where all keys have $k$ or fewer "digits"
* Worst case $O(k + n)$ space complexity


Data Structures
===============

Arrays
------
Very simple data structures, just a contiguous block of memory.

### Properties
* Access at index: $O(1)$
* Insert/delete (requires resize): $O(n)$
* Concatenate: $O(n + m)$


Linked Lists
------------
Data is stored in nodes which have pointers to other nodes, frequently the next node and the previous node (doubly linked list).

### Properties
* Access/insert/remove at index (requires list traversal): $O(n)$
* Access/insert/remove at start or end of list (start/end pointers are stored): $O(1)$
* Concatenate: $O(1)$

Queue
-----
"First in, first out" data structure. Often implemented using a linked list, which gives $O(1)$ queueing and dequeueing.

### Implementation using two stacks
* Keep one stack as an "inbox" stack, and one stack as an "outbox" stack.
* To queue: push into the inbox stack ($O(1)$)
* To dequeue: pop off the outbox stack if it's not empty, otherwise pop off the inbox stack into the outbox stack until it's empty (average case $O(1)$, worst case $O(n)$)

### Implementation using an array
* Create array that is at least as large as the expected number of elements that will be in the queue at any one time
* Store the index of the start and end of the queue
* To queue: add the new value to the array at the start index and increment the start index (average case $O(1)$, worst case $O(n)$ when the queue has to be resized)
* To dequeue: return the value at the end index and increment the end index ($O(1)$)

Stack
-----
"First in, last out" data structure. Often implemented using a linked list, which gives $O(1)$ pushing and popping.

### Implementation using an array
* Create array that is at least as large as the expected number of elements that will be in the stack at any one time
* Store index of the top of the stack
* To push: add the new value to the array at the top index and increment the top index (average case $O(1)$, worst case $O(n)$ when the stack has to be resized)
* To pop: return the value at the top index and decrement the end index ($O(1)$)

Hashtables
----------
### Implementation with arrays
* Start with a hash function of some sort. Examples
    * Add all the characters in a string, modulo length of hash table
    * Modulo an int with the length of the hash table
* Make an array of some size that is the length of the hash table
* Fill the hash with arrays
* Insert items into the array of arrays, collisions are stored in the array with the shared index
* Resize 2nd dimension of arrays as needed

### Collision resolution
* Separate chaining: store collisions in the same array index, keeping a list in that index
* Open addressing: store collisions in next index. If there's already something in that index, go ahead and try the next one until there's an open space.
    * Linear probing: iterate forward one by one until an open space is found
    * Quadratic probing: add quadratic function to current index until an open space is found

Trees
-----
### Traversal
* BFS: Add nodes to a queue, go down level by level
* DFS: Add nodes to a stack, go down until a leaf is hit, then go back and try another path
* In-order: Traverse left, then visit, then traverse right. In binary search tree, visits in order from least to greatest.
* Pre-order: visit, traverse left, then traverse right.
* Post-order: traverse left, traverse right, then visit

### Manipulation algorithms

### AVL Trees
* $O(\log n)$ search, insert, delete
* Heights of the two child subtrees differ by at most 1
* Balance = height(left subtree) - height(right subtree)
* Insertion
    * Check node's ancestors to make sure AVL rules are still being followed
    * If balance factor is less than -1 or greater than +1, then node is unbalanced

Code for insertion

    if (balance_factor(L) == 2) { //The left column
      let P=left_child(L)
      if (balance_factor(P) == -1) { //The "Left Right Case"
         rotate_left(P) //reduce to "Left Left Case"
      }
      //Left Left Case
      rotate_right(L);
    } else { // balance_factor(L) == -2, the right column
      let P=right_child(L)
      if (balance_factor(P) == 1) { //The "Right Left Case"
         rotate_right(P) //reduce to "Right Right Case"
      }
      //Right Right Case
      rotate_left(L);
    }

For deletion: Node X has value to be deleted, Y is node that takes X's place, an Z is the node that is actually removed from the tree
1. If X is a leaf or only has one child, skip to step 5 (node Z is node X)
2. Determine node Y by finding largest node in left sub-tree
3. Replace node X with node Y (only changing values)
4. Choose Z to be old node X
5. Attach subtree of Z to its parent, updating root if Z is root
6. Delete Z
7. Recalculate balance factors as needed
8. Fix balancing as described in insertion. Additionally, if the balance factor for the tree is 2 and the left subtree has a balance factor of 0, then a right rotation needts to be performed (mirror is true)


### Heaps
* Tree that satisfies "heap property:" if A is a parent node of B, then the key of A is ordered "before" B (so for example, in a min heap, the key of A is less than the key of B)
* Efficient implementation of a priority queue
* Binary heap implementation using an array
    * First element is the root, next two elements are children, and so on
    * Children of the node at index $n$ are at positions $2n+1$ and $2n+2$ (for zero-indexed array)
    * Insert: $O(\log n)$
    * Extract min: $O(\log n)$
    * Delete: $O(\log n)$
* Fibonacci heap:
    * Insert: $O(1)$
    * Extract min: $O(\log n)$
    * Delete: $O(\log n)$


Graphs
------
### Representation
* Objects and pointers (basically adjacency list): store a list of node objects, store an list of pointers to adjacent nodes
    * Pros
        * Nice and OO-friendly way of looking at a graph
        * Directly represents the nature of the graph
        * Can store additional information about each node on the node itself
        * More space-efficient for sparse graph (not very many edges)
        * Good for listing neighbor nodes
    * Cons
        * Determining if two vertices are adjacent is linear
* Adjacency matrix: 2D matrix where rows and columns represent nodes, and boolean or integer values represent edges
    * Pros
        * Fast for determining if two nodes are neighbors
        * Space efficient when using lots of edges
    * Cons
        * $O(|V|)$ for listing a node's neighbors
        * Have to store additional graph data separately

### Traversal
* DFS
    * Uses a stack data structure. Push nodes onto the stack as they're encountered
    * Used to find connected components
* BFS
    * Uses a queue data structure
    * Can be used to find shortest paths with edge weights of 1
    * 
* Tradeoffs
    * BFS preferable when node we're searching for is close to the root of the tree
    * DFS is more space-efficient
    * For wide graph, use DFS, for tall graph, use BFS, that way less memory is used

### Pathfinding
* Dijkstra's
* A*

### Cycle detection
* Run DFS on a graph. If the algorithm ever considers an edge that leads to a node that was already visited, then there is a cycle in the graph.

Other Data Structures
---------------------
### Bloom filters

### Rainbow tables


NP-Complete problems
====================
Definitions
-----------
* NP = non-deterministic polynomial time, i.e. the set containing decision problems where "yes" instances are accepted in polynomial time.
* NP-complete: problem can be verified in polynomial time, but solution cannot be determined in polynomial time
Problems
--------
* Traveling salesman: given a bunch of cities and the distances between them, what is the shortest route that visits every city?
* Knapsack: given a bag with a certain weight capacity and a bunch of items of different weights, what's the number of each item to include in the bag to achieve the maximum total weight that is less than the capacity?


Mathematics
===========
* $(n \choose k)$: the number of ways to choose $k$ items out of a set of $n$
* $n!$: the number of permutations of $n$ distinct objects (e.g. the number of ways of arranging 52 playing cards is $52!$)
* Expectation of a random variable: the sum of the products of the probabilities of a particular value and that value
* Conditional probability: $P(A|B)= \frac{P(A \cap B)}{P(B)}$
TODO: Discrete math problems and how to solve them. Counting, probability. Combinatorics and probability basics


Operating Systems
=================
Process
-------
* An instance of a computer program
* Calling "fork" creates a copy of a process that becomes a child process
    * Child has separate address space with exact copy of parent's memory
* Required resources:
    * Image of machine code associated with the program
    * Memory address space
    * File descriptor for the allocated resources
    * Security attributes (process owner, process permissions)
    * Processor state (stored in memory while the processor is executing other processes)
* Communicate with each other through inter-process communication
    * Pipe: two ends, one read-only, one write-only. Referenced by a file descriptor.

Thread
------
* A component of a process
* Multiple threads can exist concurrently in a process and share memory
* Threads share process state and memory
* Will physically run concurrently on multi-core hardware
* Less resource-intensive than processes
* Cons: prone to synchronization issues, and a crashing thread crashes the entire process

Concurrency Issues
------------------
### Deadlock
* Occurs when two tasks waiting for the other's lock to become available

### Livelock
* Occurs two tasks constantly trying to make the lock available to the other
* Example is two people running into each other over and over again in a hallway

### Resource leak
* A process never releases a resource it acquires

### Starvation
* Occurs when a process cannot gain access to a necessary locked resource

Locks
-----
### Definition
* Basically a variable set by a thread/process/etc. that prevents another process from using a resource at the same time
* Typically requires hardware support, atomic lock operations to be successful (two tasks might try to set the lock simultaneously)

### Semaphore
* Stores a number of resources, the number of open resources and the processes using the resources (may require other mechanisms to keep track of which resources are open)
* Binary semaphore (also called a mutex): either 1 or 0, locked or unlocked state 

Mutual Exclusion
----------------
* Concept that two concurrent processes cannot be in their critical section at the same time to prevent race conditions
* Critical section: piece of code that requires access to a shared resource
* Race condition: behavior of a system is dependent on the sequence or timing of uncontrollable events (results in non-deterministic behavior)


Context Switching
------------------
* Process of storing and restoring state of a process
* Intensive operation
* Steps
    1. Current processor state is stored
        * Stores all registers in use by the process, including PC and OS-specific data
        * Usually stored in the "process control block"
    2. Determine next process by checking "ready queue" and process/thread priority
    3. Loads state for new process
        * Loads PC, memory, etc.
    3. Begins execution of new process


Google Research
===============
Google File System (GFS)
------------------------

Google Bigtable
---------------

Google MapReduce
----------------

Google Spanner
--------------

Google Chubby
-------------