(function() {
    function SongPlayer(Fixtures) {
        
        //setting object and returning makes public and available to application
        var SongPlayer = {};
/**
* @func Fixtures.getAlbum
* @type variable
* @desc store the album information in the service
*/
        var currentAlbum = Fixtures.getAlbum();
/**
* @desc Buzz object audio file
* @type {Object}
*/
        var currentBuzzObject = null;

/**
* @function setSong
* @desc Stops currently playing song and loads new audio file as currentBuzzObject
* @param {Object} song
*/
        var setSong = function(song){
            if(currentBuzzObject){
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
        
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            SongPlayer.currentSong = song;
        };
/**
* @func getSongIndex
* @desc get the index of the current song
*/
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        SongPlayer.currentSong = null;
        
        
/** private playSong function
    @function playSong
    @desc plays the song and marks the song as playing
    @param {Object} song
*/
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };
 
/**
 * @function play
 * @desc Play current or new song
 * @param {Object} song
 */          
        //adding play mmethod to SongPlayer to play song - buzz
        //get song from Album view; ng-repeat passes song
        
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);                
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if(currentBuzzObject.isPaused()){
                    playSong(song);
                }
            }
        };
        
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
/**
* @func SongPlayer.previous
* @desc Switch to previous song in index unless first song, then stay at first song
*/
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if(currentSongIndex < 0){
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();