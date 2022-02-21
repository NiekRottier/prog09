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

                let oldKnightPos = gameState.knightPositions[i]

                // Move the knight in the copied gameState
                gameState.knightPositions[i] = move

                // Get the score of the above gameState
                let moveScore:number = this.minimax(gameState, king, knights, 0, true)

                gameState.knightPositions[i] = oldKnightPos

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

    static minimax(gameState:GameState, king:King, knights:Knight[], depth:number, isMaxi:boolean):number{
        let score:[number, boolean] = gameState.getScore(depth)

        // If someone won or the depth is finished
        if (score[1]) {
            return score[0]
        } else if (depth > 3) {     // Determines how deep the algorithm goes
            return 0
        }

        // If it's the maximizers turn
        if (isMaxi) {
            let bestScore = -Infinity

            // For each of the possible moves of the king in the gameStateCopy make it and retrieve the score of it
            king.getMoves(gameState.kingPos).forEach(kingMove => {
                let oldKingPos = gameState.kingPos

                gameState.kingPos = kingMove

                // Put the highest score in bestScore
                bestScore = Math.max(bestScore, this.minimax(gameState, king, knights, depth+1, !isMaxi)) 

                // Reset move
                gameState.kingPos = oldKingPos
            });

            return bestScore
        } else {
            let bestScore = +Infinity

            // For each of the possible moves of the knights in the gameStateCopy make it and retrieve the score of it
            for (let i = 0; i < knights.length; i++) {
                knights[i].getMoves(gameState.knightPositions[i]).forEach(knightMove => {
                    let oldKnightPos = gameState.knightPositions[i]

                    gameState.knightPositions[i] = knightMove

                    // Put the lowest score in bestScore
                    bestScore = Math.min(bestScore, this.minimax(gameState, king, knights, depth+1, !isMaxi))

                    gameState.knightPositions[i] = oldKnightPos
                });
            }

            return bestScore
        }
    }
}