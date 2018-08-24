'use strict';

describe('myApp.game module', function() {

  beforeEach(module('myApp.game'));

  describe('game controller', function(){
    describe('When starting new game',function(){
      it('should give player X turn', inject(function($controller) {
        //arrange
        let gameCtrl = $controller('GameCtrl');

        //act

        //Assert
        expect(gameCtrl.player1.isOnTurn).toBe(true);
      }));

      it('should enable all squares', inject(function($controller) {
        //arrange
        let gameCtrl = $controller('GameCtrl');

        //act
        //Assert
        expect(gameCtrl.board.rows[0].squares[0].disabled).toBe(false);
        expect(gameCtrl.board.rows[0].squares[1].disabled).toBe(false);
        expect(gameCtrl.board.rows[0].squares[2].disabled).toBe(false);
        expect(gameCtrl.board.rows[1].squares[0].disabled).toBe(false);
        expect(gameCtrl.board.rows[1].squares[1].disabled).toBe(false);
        expect(gameCtrl.board.rows[1].squares[2].disabled).toBe(false);
        expect(gameCtrl.board.rows[2].squares[0].disabled).toBe(false);
        expect(gameCtrl.board.rows[2].squares[1].disabled).toBe(false);
        expect(gameCtrl.board.rows[2].squares[2].disabled).toBe(false);
      }));

      it('should not add any square to any player', inject(function($controller) {
        //arrange
        let gameCtrl = $controller('GameCtrl');

        let player1=gameCtrl.player1;
        let player2=gameCtrl.player2;
        //act
        //Assert
        expect(player1.squares.length).toBe(0);
        expect(player2.squares.length).toBe(0);
      }));
    });

    describe('When player X plays',function(){
      it('should give player O turn', inject(function($controller) {
        //arrange
        let gameCtrl = $controller('GameCtrl');
        let square=gameCtrl.board.rows[0].squares[0]

        //act
        gameCtrl.play(gameCtrl.player1,square);

        //Assert
        expect(gameCtrl.player2.isOnTurn).toBe(true);
        expect(gameCtrl.player1.isOnTurn).toBe(false);
      }));

      it('should mark square with X', inject(function($controller) {
        //arrange
        let gameCtrl = $controller('GameCtrl');

        let player=gameCtrl.player1;
        let square=gameCtrl.board.rows[0].squares[0]
        //act
        gameCtrl.play(player,square);

        //Assert
        expect(square.text).toBe('X');
      }));

      it('should disable square', inject(function($controller) {
        //arrange
        let gameCtrl = $controller('GameCtrl');

        let player=gameCtrl.player1;
        let square=gameCtrl.board.rows[0].squares[0];
        //act
        gameCtrl.play(player,square);

        //Assert
        expect(gameCtrl.board.rows[0].squares[0].disabled).toBe(true);
      }));

      it('should add square to player X', inject(function($controller) {
        //arrange
        let gameCtrl = $controller('GameCtrl');

        let player1=gameCtrl.player1;
        let square=gameCtrl.board.rows[0].squares[0];
        //act
        gameCtrl.play(player1,square);
        //Assert
        expect(player1.squares.length).toBe(1);
      }));
    });

    describe('When player O plays',function(){
      it('should give player X turn', inject(function($controller) {
        //arrange
        let gameCtrl = $controller('GameCtrl');

        let player1=gameCtrl.player1;
        let square1=gameCtrl.board.rows[0].squares[0];
        let player=gameCtrl.player2;
        let square=gameCtrl.board.rows[0].squares[1];
        //act
        gameCtrl.play(player1, square1);
        gameCtrl.play(player,square);

        //Assert
        expect(player1.isOnTurn).toBe(true);
      }));

      it('should mark square with O', inject(function($controller) {
        //arrange
        let gameCtrl = $controller('GameCtrl');

        let player=gameCtrl.player2;
        let square=gameCtrl.board.rows[0].squares[0]
        //act
        gameCtrl.play(player,square);

        //Assert
        expect(square.text).toBe('O');
      }));

      it('should disable square', inject(function($controller) {
        //arrange
        let gameCtrl = $controller('GameCtrl');

        let player=gameCtrl.player2;
        let square=gameCtrl.board.rows[0].squares[0]
        //act
        gameCtrl.play(player,square);

        //Assert
        expect(gameCtrl.board.rows[0].squares[0].disabled).toBe(true);
      }));

      it('should add square to player O', inject(function($controller) {
        //arrange
        let gameCtrl = $controller('GameCtrl');

        let player2=gameCtrl.player2;
        let square=gameCtrl.board.rows[0].squares[0];
        //act
        gameCtrl.play(player2,square);
        //Assert
        expect(player2.squares.length).toBe(1);
      }));
    });

    describe('When player X wins',function(){
      it('should declare X as winner', inject(function($controller) {
        //arrange
        let gameCtrl = $controller('GameCtrl');

        let player1=gameCtrl.player1;
        let player2=gameCtrl.player2;
        //act
        gameCtrl.play(player1,gameCtrl.board.rows[0].squares[0]);
        gameCtrl.play(player2,gameCtrl.board.rows[1].squares[0]);
        gameCtrl.play(player1,gameCtrl.board.rows[0].squares[1]);
        gameCtrl.play(player2,gameCtrl.board.rows[2].squares[0]);
        gameCtrl.play(player1,gameCtrl.board.rows[0].squares[2]);

        //Assert
        expect(player1.hasWon).toBe(true);
      }));

      it('should declare X as winner', inject(function($controller) {
        //arrange
        let gameCtrl = $controller('GameCtrl');

        let player1=gameCtrl.player1;
        let player2=gameCtrl.player2;
        //act
        gameCtrl.play(player1,gameCtrl.board.rows[0].squares[0]);
        gameCtrl.play(player2,gameCtrl.board.rows[0].squares[1]);
        gameCtrl.play(player1,gameCtrl.board.rows[0].squares[2]);
        gameCtrl.play(player2,gameCtrl.board.rows[1].squares[0]);
        gameCtrl.play(player1,gameCtrl.board.rows[1].squares[1]);
        gameCtrl.play(player2,gameCtrl.board.rows[1].squares[2]);
        gameCtrl.play(player1,gameCtrl.board.rows[2].squares[0]);
        gameCtrl.play(player2,gameCtrl.board.rows[2].squares[1]);
        gameCtrl.play(player1,gameCtrl.board.rows[2].squares[2]);

        //Assert
        expect(player1.hasWon).toBe(true);
      }));

      it('should disable all squares', inject(function($controller) {
        //arrange
        let gameCtrl = $controller('GameCtrl');

        let player1=gameCtrl.player1;
        let player2=gameCtrl.player2;
        //act
        gameCtrl.play(player1,gameCtrl.board.rows[0].squares[0]);
        gameCtrl.play(player2,gameCtrl.board.rows[1].squares[0]);
        gameCtrl.play(player1,gameCtrl.board.rows[0].squares[1]);
        gameCtrl.play(player2,gameCtrl.board.rows[2].squares[0]);
        gameCtrl.play(player1,gameCtrl.board.rows[0].squares[2]);
        //Assert
        expect(gameCtrl.board.rows[0].squares[0].disabled).toBe(true);
        expect(gameCtrl.board.rows[0].squares[1].disabled).toBe(true);
        expect(gameCtrl.board.rows[0].squares[2].disabled).toBe(true);
        expect(gameCtrl.board.rows[1].squares[0].disabled).toBe(true);
        expect(gameCtrl.board.rows[1].squares[1].disabled).toBe(true);
        expect(gameCtrl.board.rows[1].squares[2].disabled).toBe(true);
        expect(gameCtrl.board.rows[2].squares[0].disabled).toBe(true);
        expect(gameCtrl.board.rows[2].squares[1].disabled).toBe(true);
        expect(gameCtrl.board.rows[2].squares[2].disabled).toBe(true);
      }));
    });

    describe('When player O wins',function(){
      it('should declare O as winner', inject(function($controller) {
        //arrange
        let gameCtrl = $controller('GameCtrl');

        let player1=gameCtrl.player1;
        let player2=gameCtrl.player2;
        //act
        gameCtrl.play(player1,gameCtrl.board.rows[0].squares[0]);
        gameCtrl.play(player2,gameCtrl.board.rows[0].squares[1]);
        gameCtrl.play(player1,gameCtrl.board.rows[0].squares[2]);
        gameCtrl.play(player2,gameCtrl.board.rows[1].squares[1]);
        gameCtrl.play(player1,gameCtrl.board.rows[1].squares[0]);
        gameCtrl.play(player2,gameCtrl.board.rows[2].squares[1]);
        //Assert
        expect(player2.hasWon).toBe(true);
      }));

      it('should disable all squares', inject(function($controller) {
        //arrange
        let gameCtrl = $controller('GameCtrl');

        let player1=gameCtrl.player1;
        let player2=gameCtrl.player2;
        //act
        gameCtrl.play(player1,gameCtrl.board.rows[0].squares[0]);
        gameCtrl.play(player2,gameCtrl.board.rows[0].squares[1]);
        gameCtrl.play(player1,gameCtrl.board.rows[0].squares[2]);
        gameCtrl.play(player2,gameCtrl.board.rows[1].squares[1]);
        gameCtrl.play(player1,gameCtrl.board.rows[1].squares[0]);
        gameCtrl.play(player2,gameCtrl.board.rows[2].squares[1]);
        //Assert
        expect(gameCtrl.board.rows[0].squares[0].disabled).toBe(true);
        expect(gameCtrl.board.rows[0].squares[1].disabled).toBe(true);
        expect(gameCtrl.board.rows[0].squares[2].disabled).toBe(true);
        expect(gameCtrl.board.rows[1].squares[0].disabled).toBe(true);
        expect(gameCtrl.board.rows[1].squares[1].disabled).toBe(true);
        expect(gameCtrl.board.rows[1].squares[2].disabled).toBe(true);
        expect(gameCtrl.board.rows[2].squares[0].disabled).toBe(true);
        expect(gameCtrl.board.rows[2].squares[1].disabled).toBe(true);
        expect(gameCtrl.board.rows[2].squares[2].disabled).toBe(true);
      }));
    });

    describe('When no player wins',function(){
      it('should not declare any player as winner', inject(function($controller) {
        //arrange
        let gameCtrl = $controller('GameCtrl');

        let player1=gameCtrl.player1;
        let player2=gameCtrl.player2;
        //act
        gameCtrl.play(player1,gameCtrl.board.rows[0].squares[0]);
        gameCtrl.play(player2,gameCtrl.board.rows[1].squares[1]);
        gameCtrl.play(player1,gameCtrl.board.rows[0].squares[2]);
        gameCtrl.play(player2,gameCtrl.board.rows[0].squares[1]);
        gameCtrl.play(player1,gameCtrl.board.rows[2].squares[1]);
        gameCtrl.play(player2,gameCtrl.board.rows[2].squares[2]);
        gameCtrl.play(player1,gameCtrl.board.rows[2].squares[0]);
        gameCtrl.play(player2,gameCtrl.board.rows[1].squares[0]);
        gameCtrl.play(player1,gameCtrl.board.rows[1].squares[2]);
        //Assert
        expect(player1.hasWon).toBe(false);
        expect(player2.hasWon).toBe(false);
      }));
    });

    describe('When player selects an already selected square',function(){
      it('should not switch turns', inject(function($controller) {
        //arrange
        let gameCtrl = $controller('GameCtrl');

        let player1=gameCtrl.player1;
        let player2=gameCtrl.player2;
        //act
        gameCtrl.play(player1,gameCtrl.board.rows[0].squares[0]);
        gameCtrl.play(player2,gameCtrl.board.rows[0].squares[0]);
        //Assert
        expect(player1.isOnTurn).toBe(false);
        expect(player2.isOnTurn).toBe(true);
      }));

      it('should not switch turns', inject(function($controller) {
        //arrange
        let gameCtrl = $controller('GameCtrl');

        let player1=gameCtrl.player1;
        let player2=gameCtrl.player2;
        //act
        gameCtrl.play(player1,gameCtrl.board.rows[0].squares[1]);
        gameCtrl.play(player2,gameCtrl.board.rows[0].squares[0]);
        gameCtrl.play(player1,gameCtrl.board.rows[0].squares[0]);
        //Assert
        expect(player1.isOnTurn).toBe(true);
        expect(player2.isOnTurn).toBe(false);
      }));

      it('should not change text', inject(function($controller) {
        //arrange
        let gameCtrl = $controller('GameCtrl');

        let player1=gameCtrl.player1;
        let player2=gameCtrl.player2;
        let square=gameCtrl.board.rows[0].squares[0];
        //act
        gameCtrl.play(player1,square);
        gameCtrl.play(player2,square);
        //Assert
        expect(square.text).toBe('X');
      }));

      it('should not change text', inject(function($controller) {
        //arrange
        let gameCtrl = $controller('GameCtrl');

        let player1=gameCtrl.player1;
        let player2=gameCtrl.player2;
        let square=gameCtrl.board.rows[0].squares[0];
        //act
        gameCtrl.play(player1,gameCtrl.board.rows[0].squares[1]);
        gameCtrl.play(player2,square);
        gameCtrl.play(player1,square);
        //Assert
        expect(square.text).toBe('O');
      }));

      it('should not add square to player', inject(function($controller) {
        //arrange
        let gameCtrl = $controller('GameCtrl');

        let player1=gameCtrl.player1;
        let player2=gameCtrl.player2;
        let square=gameCtrl.board.rows[0].squares[0];
        //act
        gameCtrl.play(player1,square);
        gameCtrl.play(player2,square);
        //Assert
        expect(player2.squares.length).toBe(0);
      }));

      it('should not add square to player', inject(function($controller) {
        //arrange
        let gameCtrl = $controller('GameCtrl');

        let player1=gameCtrl.player1;
        let player2=gameCtrl.player2;
        let square=gameCtrl.board.rows[0].squares[0];
        //act
        gameCtrl.play(player2,square);
        gameCtrl.play(player1,square);
        //Assert
        expect(player1.squares.length).toBe(0);
      }));
    });
  });
});