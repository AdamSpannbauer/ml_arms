# ML Arms

## 💪s that teach themselves motor skills right before your 👀

The arm(s) that can be seen in [the app/animation](https://adamspannbauer.github.io/ml_arms/) are created on page load.  The number of arms, number of arm segments, and 'learning' time can be adjusted by the sliders in the upper left.

### Phase 1 - Learning Phase

When the page loads, the arms do not know how to move to specific locations.  The arms have a 'childhood' where the joint angles are randomly updated so that the arms are flailing around.  During this random movement, the arms are repeatedly saving 2 pieces of information: (1) what location the end of the arm is at & (2) what joint angles lead to that position.  This information (i.e. the arm's 'knowledge') is displayed as the dots on the screen; the arms only know how to position themselves to move to a previously visited dot, the arms do not know how to move anywhere but the dots.

### Phase 2 - Goal Chasing Phase

After the learning phase the arms are programmed to try and reach out to the ball that appears on screen.  The arms still only know how to move to the dot locations.  However, the arms cannot jump to these locations; the joint angles are incrementally adjusted to move towards the known location.  During this incremental adjustment, the arms might pass through new locations.  If a new location is visited, it is saved as a known location for potential future use (see more details section for more info).

The ball that the arm reaches towards will follow the mouse, or move randomly if a mouse location is not available (or if the mouse location is too far away from the arm).

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
