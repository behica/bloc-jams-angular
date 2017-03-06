(function () {
    function AlbumCtrl(Fixtures, SongPlayer) {
        //gets albumPicasso from Fixtures.js
        this.albumData = Fixtures.getAlbum();
        //holds service and makes it accessible within Album view
        this.songPlayer = SongPlayer;
    }
    
    angular
        .module('blocJams')
    //inject dependencies in array
        .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
})();