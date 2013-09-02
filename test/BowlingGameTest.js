TestCase("BowlingGameTest", {
    setUp: function () {
        game =  new Game();
    },

    "testClutterGame": function(){
        this.rollMany(20,0);
         assertEquals(0, game.score());
    },

    "testAllOnes": function(){
        this.rollMany(20,1);
        assertEquals(20, game.score())
    },

     rollMany: function(n,pins){
        for(var i = 0; i<n; i++){
            game.roll(pins);
        }
    },

    "testPerfectGame":function(){
        this.rollMany(12,10);
        assertEquals(300, game.score());
    },

    "testOneStrike": function(){
        this.rollStrike();
        game.roll(3);
        game.roll(6);
        this.rollMany(17,0);
        assertEquals(28, game.score());

    },

    rollStrike: function(){
        game.roll(10);
    },

    "testOneSpare": function(){
        this.rollSpare();
        game.roll(3);
        this.rollMany(17,0);
        assertEquals(16, game.score());
    },

    rollSpare: function(){
        game.roll(5);
        game.roll(5);
    }

})