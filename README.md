# ML Arms

## 💪s that teach themselves motor skills right before your 👀

The arm(s) that can be seen in [the app/animation](https://adamspannbauer.github.io/ml_arms/) are created on page load.  The number of segments and the lengths of those segments are random.

### Phase 1 - Learning

When the page loads, the arm(s) do not know how to move to specific locations.  The arm(s) have a 'childhood' where the joint angles are randomly updated so that the arm(s) is flailing around.  During this random movement, the arm is repeatedly saving 2 pieces of information: what location the end of the arm is at & what joint angles lead to that position.  This information (aka the arm's 'knowledge') is displayed as dots on screen; the arm only knows how to position itself to move to a dot, the arm does not know how to move anywhere besides the dots.

### Phase 2 - Reaching

After the learning phase the arm is programmed to try and reach out the mouse location.  The arm still only knows how to move to the dotted locations; however, the arm can't jump to one of these locations, the joint angles are incrementally adjusted to move towards the known location.  During this movement to a new location, the arm might pass through a new location, if this occurs, the location is saved to memory for potential future use.
