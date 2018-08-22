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
        expect(gameCtrl.turn).toBe('X');
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
    });

    describe('When player X plays',function(){
      fit('should give player O turn', inject(function($controller) {
        //arrange
        let player='X';

        let gameCtrl = $controller('GameCtrl');

        let square=gameCtrl.board.rows[0].squares[0]
        //act
        gameCtrl.play(player,square);

        //Assert
        expect(gameCtrl.turn).toBe('O');
      }));

      it('should mark square with X', inject(function($controller) {
        //arrange
        let player='X';

        let gameCtrl = $controller('GameCtrl');

        let square=gameCtrl.board.rows[0].squares[0]
        //act
        gameCtrl.play(player,square);

        //Assert
        expect(square.text).toBe('X');
      }));

      it('should disable square', inject(function($controller) {
        //arrange
        let player='X';

        let gameCtrl = $controller('GameCtrl');

        let square=gameCtrl.board.rows[0].squares[0]
        //act
        gameCtrl.play(player,square);

        //Assert
        expect(gameCtrl.board.rows[0].squares[0].disabled).toBe(true);
      }));
    });

    describe('When player O plays',function(){
      it('should give player X turn', inject(function($controller) {
        //arrange
        let player='O';

        let gameCtrl = $controller('GameCtrl');

        let square=gameCtrl.board.rows[0].squares[0]
        //act
        gameCtrl.play('X',gameCtrl.board.rows[1].squares[0]);
        gameCtrl.play(player,square);

        //Assert
        expect(gameCtrl.turn).toBe('X');
      }));

      
      it('should mark square with O', inject(function($controller) {
        //arrange
        let player='O';

        let gameCtrl = $controller('GameCtrl');

        let square=gameCtrl.board.rows[0].squares[0]
        //act
        gameCtrl.play(player,square);

        //Assert
        expect(square.text).toBe('O');
      }));

      it('should disable square', inject(function($controller) {
        //arrange
        let player='O';

        let gameCtrl = $controller('GameCtrl');

        let square=gameCtrl.board.rows[0].squares[0]
        //act
        gameCtrl.play(player,square);

        //Assert
        expect(gameCtrl.board.rows[0].squares[0].disabled).toBe(true);
      }));
    });
  });
});