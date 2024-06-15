document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset-button');
    let currentPlayer = 'X';
    let gameActive = true;
    let boardState = ['', '', '', '', '', '', '', '', ''];

    
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    }); 

    resetButton.addEventListener('click', resetGame);
    
    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = cell.getAttribute('data-cell-index');

        if (boardState[cellIndex] === '' && gameActive) {
            cell.textContent = currentPlayer;
            boardState[cellIndex] = currentPlayer;
            checkGameStatus();
            togglePlayer();
        }
    } 
    
    function checkGameStatus() {
        const winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]             
        ];
        for (const condition of winningConditions) {
            const [a, b, c] = condition;
            if (boardState[a] !== '' && 
                boardState[a] === boardState[b] && 
                boardState[a] === boardState[c]) {
                status.textContent = `${currentPlayer} Wins!!`;
                gameActive = false;
                return;
            }
        }
        if (!boardState.includes('')) {
            status.textContent = "Tie! Game";
            gameActive = false;
            return;
        }
    }
    function togglePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function resetGame() {
        cells.forEach(cell => {
            cell.textContent = '';
        });
        status.textContent = '';
        currentPlayer = 'X';
        gameActive = true;
        boardState = ['', '', '', '', '', '', '', '', ''];
    }
});