
        const board = document.getElementById('ticTacToeBoard');
        const message = document.getElementById('message');
        let currentPlayer = 'X';
        let gameBoard = ['', '', '', '', '', '', '', '', ''];
        let gameActive = true;

        function checkWinner() {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6]             // Diagonals
            ];

            for (const pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                    return gameBoard[a];
                }
            }

            return null;
        }

        function checkTie() {
            return gameBoard.every(cell => cell !== '');
        }

        function handleClick(index) {
            if (!gameActive || gameBoard[index] !== '') {
                return;
            }

            gameBoard[index] = currentPlayer;
            renderBoard();
            
            const winner = checkWinner();
            if (winner) {
                message.textContent = `${winner} wins!`;
                gameActive = false;
            } else if (checkTie()) {
                message.textContent = 'It\'s a tie!';
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                message.textContent = `Current player: ${currentPlayer}`;
            }
        }

        function renderBoard() {
            board.innerHTML = '';
            gameBoard.forEach((value, index) => {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.textContent = value;
                cell.addEventListener('click', () => handleClick(index));
                board.appendChild(cell);
            });
        }

        renderBoard();
        message.textContent = `Current player: ${currentPlayer}`;
   