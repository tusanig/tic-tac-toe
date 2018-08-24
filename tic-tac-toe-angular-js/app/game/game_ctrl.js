(function () {
    'use strict';
    let gameController = function (playerValue, squareValue, $http, $q) {

        let getBoard=function(){
            var board={
                rows:[{
                    squares:[]
                }]
            };

            var square1=squareValue(1);
            board.rows[0].squares.push(square1);
            var square2=squareValue(2);
            board.rows[0].squares.push(square2);
            var square3=squareValue(3);
            board.rows[0].squares.push(square3);
            board.rows.push({squares:[]});

            var square4=squareValue(4);
            board.rows[1].squares.push(square4);
            var square5=squareValue(5);
            board.rows[1].squares.push(square5);
            var square6=squareValue(6);
            board.rows[1].squares.push(square6);
            board.rows.push({squares:[]});

            var square7=squareValue(7);
            board.rows[2].squares.push(square7);
            var square8=squareValue(8);
            board.rows[2].squares.push(square8);
            var square9=squareValue(9);
            board.rows[2].squares.push(square9);

            square1.setNeighbours([square2,square3]);
            square1.setNeighbours([square4,square7]);
            square1.setNeighbours([square5,square9]);

            square2.setNeighbours([square1,square3]);
            square2.setNeighbours([square5,square8]);

            square3.setNeighbours([square5,square7]);
            square3.setNeighbours([square1,square2]);
            square3.setNeighbours([square6,square9]);

            square4.setNeighbours([square1,square7]);
            square4.setNeighbours([square5,square6]);

            square5.setNeighbours([square1,square9]);
            square5.setNeighbours([square6,square4]);
            square5.setNeighbours([square3,square7]);
            square5.setNeighbours([square2,square8]);

            square6.setNeighbours([square9,square3]);
            square6.setNeighbours([square5,square4]);

            square7.setNeighbours([square5,square3]);
            square7.setNeighbours([square4,square1]);
            square7.setNeighbours([square8,square9]);

            square8.setNeighbours([square9,square7]);
            square8.setNeighbours([square5,square2]);

            square9.setNeighbours([square5,square1]);
            square9.setNeighbours([square7,square8]);
            square9.setNeighbours([square6,square3]);

            return board;
        }

        let vm = this;

        let 
        getBoard1=function(){
            let deferred=$q.defer();
            let serviceBaseUri='localhost/'
            $http.get('file:///N:/Katas/tic-tac-toe/tic-tac-toe-angular-js/app/game/files/grid.json')
            .then(function(data){
                deferred.resolve(data.data);
            })
            .catch(function(error){
                deferred.reject(error);
            });
            return deferred.promise;
        }
        
        vm.initialise=function(){
            var board=getBoard1();
            vm.board=getBoard();
            vm.player1=playerValue('X');
            vm.player2=playerValue('O');
            vm.player1.toggleTurn();
            vm.currentPlayer=vm.player1;
            vm.selectedSquareMessage='';
            vm.inProgress=true;
            vm.players=[vm.player1,vm.player2]
            vm.status=`Player ${vm.player1.symbol} turn`;
        };

        vm.initialise();

        vm.play=function(player, square){
            var players=[vm.player1,vm.player2];

            if(square.disabled){
                if(!vm.inProgress){
                    return;
                }
                vm.selectedSquareMessage=`${square.name} is taken, please choose again`;
                return;
            }

            vm.selectedSquareMessage='';
            vm.player1.toggleTurn();
            vm.player2.toggleTurn();
            square.setText(player);
            square.disable();
            player.addSquare(square);
            player.checkWin(square);
            vm.currentPlayer=players.find(p=>p!=player)
            if(player.hasWon){
                endGame(player);
                return;
            };
            updateStatus(player);
        };

        let endGame=function(player){
            vm.board.rows[0].squares[0].disable();
            vm.board.rows[0].squares[1].disable();
            vm.board.rows[0].squares[2].disable();
            vm.board.rows[1].squares[0].disable();
            vm.board.rows[1].squares[1].disable();
            vm.board.rows[1].squares[2].disable();
            vm.board.rows[2].squares[0].disable();
            vm.board.rows[2].squares[1].disable();
            vm.board.rows[2].squares[2].disable();
            vm.status=`Player ${player.symbol} has won!!!`;
            vm.inProgress=false;
        };

        let updateStatus=function(player){
            let initiallyAvailableSquares=vm.board.rows.length*vm.board.rows[0].squares.length;
            let takenSquares=vm.player1.squares.length+vm.player2.squares.length;
            let availableSquares=initiallyAvailableSquares-takenSquares;
            if(!availableSquares){
                vm.inProgress=false;
                vm.status='Draw!!!';
                return;
            }
            var currentPlayer=vm.players.find(p=>p!=player);
            vm.status=`Player ${currentPlayer.symbol} turn`;
        }
        
    };
    angular.module('myApp.game').controller('GameCtrl', gameController);
    gameController.$inject=['PlayerValue','SquareValue', '$http', '$q'];
})();