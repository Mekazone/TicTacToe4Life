document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const message = document.getElementById("message");
    const restartBtn = document.getElementById("restartBtn");
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    // Create the game board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", () => handleCellClick(i));
        board.appendChild(cell);
    }

    // Handle cell click
    function handleCellClick(index) {
        if (gameBoard[index] === "" && !checkWinner()) {
            gameBoard[index] = currentPlayer;
            renderBoard();
            if (checkWinner()) {
                message.textContent = `${currentPlayer} wins!`;
            } else if (checkDraw()) {
                message.textContent = "It's a draw!";
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                message.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    // Render the game board
    function renderBoard() {
        gameBoard.forEach((value, index) => {
            const cell = board.children[index];
            cell.textContent = value;
        });
    }

    // Check for a winner
    function checkWinner() {
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        return winningConditions.some(combination => {
            return combination.every(index => gameBoard[index] === currentPlayer);
        });
    }

    // Check for a draw
    function checkDraw() {
        return gameBoard.every(cell => cell !== "");
    }

    // Restart the game
    restartBtn.addEventListener("click", () => {
        currentPlayer = "X";
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        renderBoard();
        message.textContent = `Player ${currentPlayer}'s turn`;
    });
});
