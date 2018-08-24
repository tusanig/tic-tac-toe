(function(){
    'use strict';
    var playerValue=function(symbol){
        let _this={};

        _this.symbol=symbol;
        _this.squares=[];
        _this.lines=[];
        _this.hasWon=false;
        _this.isOnTurn=false;

        _this.addSquare=function(square){
            _this.squares.push(square);
        };

        _this.addLine=function(line){
            _this.lines.push(line);
        };

        _this.checkWin=function(square){
            let winning = square.neighbours.find(n=>!n.find(ns=>_this.squares.indexOf(ns)<0));
            if(winning){
                winning[0].isInWinningLine=_this.symbol;
                winning[1].isInWinningLine=_this.symbol;
                square.isInWinningLine=_this.symbol;
            }
            _this.hasWon=!!square.neighbours.find(n=>!n.find(ns=>_this.squares.indexOf(ns)<0));
        };

        _this.toggleTurn=function(){
            _this.isOnTurn=!_this.isOnTurn;
        };

        return _this;
    };
    angular.module('myApp.game').value('PlayerValue', playerValue);
})();