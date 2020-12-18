# ML Arms

## 💪s that teach themselves motor skills right before your 👀

The arm(s) that can be seen in [the app/animation](https://adamspannbauer.github.io/ml_arms/) are created on page load.  The number of segments and the lengths of those segments are random.  The number of arms and arm segments can be adjusted by sliders.

### Phase 1 - Learning

When the page loads, the arm(s) do not know how to move to specific locations.  The arm(s) have a 'childhood' where the joint angles are randomly updated so that the arm(s) is flailing around.  During this random movement, the arm is repeatedly saving 2 pieces of information: what location the end of the arm is at & what joint angles lead to that position.  This information (aka the arm's 'knowledge') is displayed as dots on screen; the arm only knows how to position itself to move to a dot, the arm does not know how to move anywhere besides the dots.

### Phase 2 - Reaching

After the learning phase the arm is programmed to try and reach out the mouse location.  The arm still only knows how to move to the dotted locations; however, the arm can't jump to one of these locations, the joint angles are incrementally adjusted to move towards the known location.  During this movement to a new location, the arm might pass through a new location, if this occurs, the location is saved to memory for potential future use.

### More details on the process

During the learning stage, a snapshot of data is saved each frame. The data saved is:

* The location of the tip of the arm (`x` and `y`)
* The angle at each joint (`a_1`, `a_2`, ..., `a_n`). 

Example knowledge after learning phase with 2 frames of data shown below (not real data).


|  x |  y | a_1 |...| a_n |
|:--:|:--:|:---:|:-:|:---:|
| 10 |  1 | 0.1 |...| 2.7 |
|  9 | 10 | 1.3 |...| 4.3 |


After learning, a goal is given for the arm to reach to; let's call represent this goal's position with `goal_x` & `goal_y`.  The `goal_x` and `goal_y` are compared to every `x` and `y` recorded in the knowledge base, and the closest record to the goal is retreieved.  

For example, lets say `goal_x = 8` and `goal_y = 10` and the example table of data above is our knowledge base.  With this data & goal we would retrieve the 2nd record since its `x = 9` & `y = 10` is the closest record to our `goal_x = 8` & `goal_y = 10`.  The angles from this retrieved record are told to the arm.

The arm adjusts its joints towards the angles given, but it can only adjust towards those goals at a restricted rate (i.e. the arm isn't teleported to the given anlges).  While adjusting to the given angles, the arm inevitably passes through new locations, these new locations and angles are saved just like in the learning phase.

Note, the process of comparing to every record in the database is inefficient, implementing some data structure (like a [k-d tree](https://en.wikipedia.org/wiki/K-d_tree)) could lead to more efficient process... but ¯\\\_(ツ)\_/¯
