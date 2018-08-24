(function(){
    'use strict';
    var squareValue=function(position){
        var _this={};
        _this.text='';
        _this.disabled=false;
        _this.name=`square${position}`;
        _this.neighbours=[];
        _this.isInWinningLine=false;

        _this.setText=function(player){
            _this.text=player.symbol;
        };

        _this.disable=function(){
            _this.disabled=true
        };
        
        _this.addTo=function(player){
            player.squares.push(_this);
        }

        _this.setNeighbours=function(neighbours){
            _this.neighbours.push(neighbours);
        }
        return _this;
    };
    angular.module('myApp.game').value('SquareValue', squareValue);
})();