$(window).load(function() {
    game.init();
});

var game = {
    // Start initioalising objects, preloading assets and display start screen
    init:function(){
        // Initialise objects
        levels.init();

        // Hide all game layers and display the start screen
        $('.gamelayer').hide();
        $('#gamestartscreen').show();

        // Get handler for game canvas and context
        game.canvas = $('#gamecanxas')[0];
        game.context = game.canvas.getContext('2d');
    },
    
    showLevelScreen: function () {
        $('.gamelayer').hide();
        $('#levelselectscreen').show('slow');
    },
};

var levels = {
    // level data
    data: [
        {
            // First Level
            foreground: 'desert-foreground',
            background: 'clouds-background',
            entities: []
        },
        {
            // Second Level
            foreground: 'desert-foreground',
            background: 'clouds-background',
            entities: []
        }
    ],

    // Initialise level selection screen
    init: function() {
        var html = "";
        for (var i = 0; i < levels.data.length; i++) {
            var level = levels.data[i];
            html += '<input type="button" value="' + (i + 1) + '">';
        }

        $('#levelselectscreen').html(html);

        // Set the button click event handlers to load level
        $('#levelselectscreen input').click(function() {
            levels.load(this.value - 1);
            $('#levelselectscreen').hide();
        });
    },

    // Load all data and images for a specific level
    load: function(number) {
    }
};

var loader = {
    loaded: true,
    loadedCount: 0, // Assests that have been loaded so far
    totalCount: 0, // Total number of assets that need to be loaded
    
    init:function() {
        // check for sound support
        var mp3Support, oggSuppourt;
        var audio = document.createElement('audio');
        if (audio.canPlayType) {
            // Currently canPlayType() returns: "", "maybe" or "probably"
            mp3Support = "" != audio.canPlayType('audio/mpeg');
            oggSuppourt = "" != audio.canPlayType('audio/ogg; codecs="vorbis"');
        } else {
            // The audio tag is not supported
            mp3Support = false;
            oggSuppourt = false;
        }
        
        // Check for ogg, then mp3, and finally set soundFileExtn to undifined
        loader.soundFileExtn = oggSuppourt ? ".ogg" : mp3Support ? ".mp3" : undefined;      
    },
    
    loadImage:function(url) {
        this.totalCount++;
        this.loaded = false;
        $('#loadingscreen').show();
        var image = new image();
        image.src = url;
        image.onload = loader.itemLoaded;
        return image;
    },
    
    itemLoaded:function() {
        loader.loadedCount++;
    }
};
