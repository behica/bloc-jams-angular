(function () {
    function AlbumCtrl(Fixtures) {
        //gets albumPicasso from Fixtures.js
        this.albumData = Fixtures.getAlbum();
    }
    
    angular
        .module('blocJams')
    //inject dependencies in array
        .controller('AlbumCtrl', ['Fixtures',AlbumCtrl]);
})();