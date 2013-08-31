TestCase("BowlingGameTest", {
    setUp: function () {
        g =  new Game();
    },

    "testClutterGame": function(){
        this.rollMany(20,0);
         assertEquals(0, g.score());
    },

    "testAllOnes": function(){
        this.rollMany(20,1);
        assertEquals(20, g.score())
    },

     rollMany: function(n,pins){
        for(var i = 0; i<n; i++){
            g.roll(pins);
        }
    },

    "testPerfectGame":function(){
        this.rollMany(12,10);
        assertEquals(300, g.score());
    },

    "testOneStrike": function(){
        this.rollStrike();
        g.roll(3);
        g.roll(6);
        this.rollMany(17,0);
        assertEquals(28, g.score());

    },

    rollStrike: function(){
        g.roll(10);
    },

    "testOneSpare": function(){
        this.rollSpare();
        g.roll(3);
        this.rollMany(17,0);
        assertEquals(16, g.score());
    },

    rollSpare: function(){
        g.roll(5);
        g.roll(5);
    }

})