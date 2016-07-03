/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    /* Serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information required for smooth animation.
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        lastTime = Date.now();
        main();
    }

    /* Called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data.
     */
    function update(dt) {
        updateEntities(dt);
    }

    /* Called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for the
     * player and token objects.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
        token.update();
    }

    /* Initially draws the "game level", it will then call
     * the renderEntities, renderPoints, renderLives, and renderGameOver
     * functions.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
        renderEntities();
        renderPoints();
        renderLives();
        renderGameOver();
    }

    /* Called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy, player, and token entities within app.js.
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

       player.render();
       token.render();
    }

    /* Called by the render function.  Renders current points counter.
     */
    function renderPoints() {
        ctx.clearRect(250, 0, 260, 50);
        ctx.fillStyle = 'black';
        ctx.font = '22px Arial';
        ctx.fillText(('Score: ' + player.points), 380, 45);
    }

    /* Called by the render function.  Renders current lives counter.
     */
    function renderLives() {
        ctx.clearRect(0, 0, 250, 50);
        ctx.fillStyle = 'black';
        ctx.font = '22px Arial';
        ctx.fillText(('Lives: ' + player.lives), 25, 45);
    }

    /* Called by the render function.  Checks to see if there are no
     * player lives left.  If so, game over screen renders.
     */
    function renderGameOver() {
        if (player.lives === 0) {
            var grd = ctx.createLinearGradient(0, 0, 500, 606);
            grd.addColorStop(0, '#b3b3ff');
            grd.addColorStop(1, '#b3e6cc');
            ctx.fillStyle = grd;
            ctx.globalAlpha = 0.8;
            ctx.fillRect(0, 0, 505, 606);
            ctx.globalAlpha = 1;
            ctx.fillStyle = 'navy';
            ctx.font = '30px Arial';
            ctx.fillText('GAME OVER', 160, 250);
            ctx.font = '24px Arial';
            ctx.fillText(('Final Score: ' + player.points), 165, 300);
            ctx.fillText(('"n" for new game'), 165, 350);
        }
    }

    /* Load all of the images needed to draw game level.
     * Set init as the callback method, so that when
     * the images are properly loaded the game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
        'images/Heart.png',
        'images/Gem-Blue.png',
        'images/Gem-Green.png',
        'images/Gem-Orange.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable
     */
    global.ctx = ctx;
})(this);
