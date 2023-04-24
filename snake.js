const promptMessage = "Are you ready to play the game? then use arrow keys to play";

if (confirm(promptMessage)) {

function init() {
    //accessing canvas
    canvas = document.getElementById('mycanvas');
    // board size and heigth
    W = H = canvas.width = canvas.height = 800;
    // to draw on canvas 
    pen = canvas.getContext('2d');
    cs = 66;
    // food 
    food = getRandomFood();
    
    game_over = false;
    score = 0;
    //Create a Image Object for food
    food_img = new Image();
    food_img.src = "apple.png";

    trophy = new Image();
    trophy.src = "trophy.png";


    // create snake object
    snake = {
        // number of cells
        init_len: 1,
        color: "blue",
        // empty array
        cells: [],
        direction: "right",
        createSnake: function () {
            //  based on initial length
            for (var i = this.init_len; i > 0; i--) {
                this.cells.push({ x: i, y: 0 });
            }
        },
        drawSnake: function () {
            for (var i = 0; i < this.cells.length; i++) {
                // color of snake
                pen.fillStyle = this.color;
                // cs-3 gap btw cells cs: cellsize x:coordinate y: coordinate of each cell
                pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs - 3, cs - 3);
            }
        },
        updateSnake: function () {
            // pop the last elem and push into front head of the snake  to make the movement
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            //check if the snake has eaten food, increase the length of the snake and 
            //generate new food object
            // food eaten increase the size of the snake
            if (headX == food.x && headY == food.y) {
                console.log("Food eaten");
                food = getRandomFood();
                score++;


            }
            else {
                //  last elem pop and placed in the front 
                this.cells.pop();
            }

            var nextX, nextY;
            if (this.direction == "right") {
                nextX = headX + 1; //move right
                nextY = headY;
            }
            else if (this.direction == "left") {
                nextX = headX - 1;
                nextY = headY;
            }
            else if (this.direction == "down") {
                nextX = headX;
                nextY = headY + 1;
            }
            else {
                nextX = headX;
                nextY = headY - 1;
            }

            this.cells.unshift({ x: nextX, y: nextY });
            /* prevents snake from going out*/
            var last_x = Math.round(W / cs);
            var last_y = Math.round(H / cs);

            if (this.cells[0].y < 0 || this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y) {
                game_over = true;
            }

        }
    };
    snake.createSnake();
    // add keyboard event 
    function keyPressed(e) {
        //Conditional Statments
        if (e.key == "ArrowRight") {
            snake.direction = "right";
        }
        else if (e.key == "ArrowLeft") {
            snake.direction = "left";
        }
        else if (e.key == "ArrowDown") {
            snake.direction = "down";
        }
        else {
            snake.direction = "up";
        }
        console.log(snake.direction);
    }


    document.addEventListener('keydown', keyPressed);

}



function draw() {
    pen.clearRect(0, 0, W, H);
    snake.drawSnake();
    // draw food on the board
    // pen.fillStyle=food.color;
    // pen.fillRect(food.x * cs, food.y * cs, cs, cs);
    pen.fillStyle = food.color;
    pen.drawImage(food_img, food.x * cs, food.y * cs, cs, cs);
    pen.drawImage(trophy, 18, 20, cs, cs);
    pen.fillStyle = "blue";
    pen.font = "20px Roboto"
    pen.fillText(score, 50, 50);

}
function update() {
    // to remove the element deleted from last not to show on screen use erase


    snake.updateSnake();
}

// place the food object , food can be present in the entire canvas     (W-cellsize)/cellsize : each cell i can access x,
// (H-cellsize)/cellsize y
function getRandomFood() {

    var foodX = Math.round(Math.random() * (W - cs) / cs);
    var foodY = Math.round(Math.random() * (H - cs) / cs);

    var food = {
        x: foodX,
        y: foodY,
        color: "red",
    }
    return food;

}
function gameloop() {
    if (game_over == true) {
        clearInterval(f);
        alert("Game Over and score is "+score);
        return;
    }
    draw();
    update();
}
init();
var f = setInterval(gameloop, 100)

// datastructre used to store cell is array
// when user pressed down arrow we will pop the last elemnt and add in downward direction repeat
  
} else {
    // If the user cancels, do nothing or take some other action
    alert("Thanks for joining ")
}