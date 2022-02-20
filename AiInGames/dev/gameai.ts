/// <reference path="knight.ts" />

class GameAI {
    // let the AI choose a move, and update both the
    // knight and the gamestate
    
    public static moveKnight(king:King, knights: Knight[], gameState:GameState) {
        let t0 = performance.now();

        let bestMove = this.findBestMove(king, knights, gameState)

        console.log(`Knight nr. ${bestMove[0]+1} to [${bestMove[1]}]`);

        gameState.knightPositions[bestMove[0]] = bestMove[1];
        knights[bestMove[0]].setPosition(bestMove[1]);

        let t1 = performance.now();
        console.log("AI move took " + (t1 - t0) + " milliseconds.");
    }

    static findBestMove(king:King, knights:Knight[], gameState:GameState) {
        console.log('Finding the best move');

        // [knight, [x, y]]
        let bestMove: [number, [number, number]] = [1,[1,1]]
        let bestScore = +Infinity

        // For every knight for every move they could make call minimax()
        for (let i = 0; i < knights.length; i++) {
            console.log('Knight nr. ' + (i+1));

            knights[i].getMoves().forEach(move => {
                // Copy the gameState
                let gameStateCopy:GameState = gameState.copy()

                // Move the knight in the copied gameState
                gameStateCopy.knightPositions[i] = move

                // Get the score of the above gameState
                let moveScore:number = this.minimax(gameStateCopy, king, knights, 0, true)

                // console.log(moveScore);

                // If the score of this move is higher than previous moves update bestMove & bestScore
                if (moveScore < bestScore) {
                    bestMove = [i, move]
                    bestScore = moveScore
                }
            })
        }

        console.log(bestScore);

        return bestMove
    }

    static minimax(gameStateCopy:GameState, king:King, knights:Knight[], depth:number, isMaxi:boolean):number{
        let score:[number, boolean] = gameStateCopy.getScore()

        // If someone won or the depth is finished
        if (score[0] === 100) {
            // console.log('King can win with this move: ' +gameStateCopy.kingPos)
            return 100
        } else if (score[0] === -100) {
            // console.log('Knights can win with this move: ' +gameStateCopy.knightPositions)
            return -100
        } else if (depth > 4) {     // Determines how deep the algorithm goes
            return 0
        }

        // If it's the maximizers turn
        if (isMaxi) {
            let bestScore = -Infinity

            // For each of the possible moves of the king in the gameStateCopy make it and retrieve the score of it
            king.getMoves(gameStateCopy.kingPos).forEach(kingMove => {
                gameStateCopy.kingPos = kingMove

                // Put the highest score in bestScore
                bestScore = Math.max(bestScore, this.minimax(gameStateCopy, king, knights, depth+1, !isMaxi)) 
            });

            // console.log('isMaxi | Depth: '+depth+' | Score: '+bestScore);
            return bestScore - depth
        } else {
            let bestScore = +Infinity

            // For each of the possible moves of the knights in the gameStateCopy make it and retrieve the score of it
            for (let i = 0; i < knights.length; i++) {
                knights[i].getMoves(gameStateCopy.knightPositions[i]).forEach(knightMove => {
                    gameStateCopy.knightPositions[i] = knightMove

                    // Put the lowest score in bestScore
                    bestScore = Math.min(bestScore, this.minimax(gameStateCopy, king, knights, depth+1, !isMaxi))
                });
            }

            // console.log('isNotMaxi | Depth: '+depth+' | Score: '+bestScore);
            return bestScore + depth
        }
    }
}