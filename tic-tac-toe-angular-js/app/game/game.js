'use strict';

angular.module('myApp.game', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/game', {
    templateUrl: 'game/game.html',
    controller: 'GameCtrl'
  });
}])

.controller('GameCtrl', [function() {
  let vm=this;

  let getSquare=function(position){
    return{
      disabled:false,
      text:'',
      name:'square'+position
    };
  };

  let getBoard=function(){
    return{
      rows:[
        {
          squares:[getSquare(1),getSquare(2),getSquare(3)]
        },
        {
          squares:[getSquare(4),getSquare(5),getSquare(6)]
        },
        {
          squares:[getSquare(7),getSquare(8),getSquare(9)]
        }
      ]
    }
  };
  vm.board=getBoard();
  vm.turn='X';

  vm.play=function(player, square){
    square.text=player;
    square.disabled=true;
    switchTurn()
  };

  let switchTurn=function(){
    if(vm.turn=='X'){
      vm.turn='O';
      return;
    }
    vm.turn='X';
  };

}]);