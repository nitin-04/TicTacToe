// Select all elements with the class "box" representing the Tic-Tac-Toe grid cells
let boxes = document.querySelectorAll(".box");

// Select the reset button and new game button by their respective IDs
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");

// Select the message container and message area for displaying winner messages
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// This variable tracks the current turn: true for Player O, false for Player X
let turnO = true; // Player O starts by default
let gameEnded = false; // Flag to track if the game has ended

// Define all possible winning patterns in the Tic-Tac-Toe game
const winPatterns = [
    [0, 1, 2],  // Top row
    [0, 3, 6],  // Left column
    [0, 4, 8],  // Diagonal (top-left to bottom-right)
    [1, 4, 7],  // Middle column
    [2, 5, 8],  // Right column
    [2, 4, 6],  // Diagonal (top-right to bottom-left)
    [3, 4, 5],  // Middle row
    [6, 7, 8],  // Bottom row
];

// Reset the game state to initial values (start a new game)
const resetGame = () => {
    turnO = true;      // Player O always starts first
    gameEnded = false; // Reset the game ended flag
    enableBoxes();     // Enable all boxes to allow new clicks
    msgContainer.classList.add("hide"); // Hide the winner message
};

// Add click event listeners to each box (grid cell)
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // Prevent any interaction if the game has ended
        if (gameEnded) return;  

        // Check whose turn it is and mark the box with either "O" or "X"
        if (turnO) {
            box.innerText = "O"; // Player O's turn
            turnO = false;       // Switch to Player X's turn
        } else {
            box.innerText = "X"; // Player X's turn
            turnO = true;        // Switch back to Player O's turn
        }
        box.disabled = true; // Disable the box so it can't be clicked again
        checkWinner();       // Check if this move resulted in a win
    });
});

// Disable all boxes once the game has been won or reset
const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true); // Disable each box
};

// Re-enable all boxes and reset their text to empty for a new game
const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false; // Enable each box
        box.innerText = "";   // Clear the text inside each box
    });
};

// Display the winner's message and disable further moves
const showWinner = (winner) => {
    msg.innerText = `Player [${winner}] Won the Game...`; // Show winner message
    msgContainer.classList.remove("hide"); // Make message container visible
    disableBoxes(); // Disable all boxes since the game is over
    gameEnded = true; // Mark the game as ended
};

// Check if the game is a draw (all boxes are filled without a winner)
const checkDraw = () => {
    return [...boxes].every(box => box.innerText !== ""); // Returns true if all boxes are filled
};

// Check for a winner or draw after each turn
const checkWinner = () => {
    let hasWinner = false; // Flag to track if there's a winner
    for (let pattern of winPatterns) {
        // Extract the values of the three positions in the current winning pattern
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        // Check if all three boxes in this pattern are filled and have the same value
        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val); // If there's a winner, display the winner message
                hasWinner = true;    // Set the winner flag to true
                break; // Exit loop as we found a winner
            }
        }
    }
    // If there's no winner and the boxes are all filled, declare a draw
    if (!hasWinner && checkDraw()) {
        msg.innerText = "It's a Draw!"; // Show draw message
        msgContainer.classList.remove("hide"); // Make message container visible
        gameEnded = true; // Mark the game as ended
    }
};

// Attach event listeners to reset and new game buttons
newGameBtn.addEventListener("click", resetGame); // Reset the game when the "New Game" button is clicked
resetbtn.addEventListener("click", resetGame);    // Reset the game when the "Reset" button is clicked
