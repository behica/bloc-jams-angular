(function() {
    function seekBar($document){ //need to inject $document to add as dependency
        
        // calculates horizontal percent along seek bar where event occured
        
        var calculatePercent = function(seekBar, event) {
            var offsetX = event.pageX - seekBar.offset().left;
            var seekBarWidth = seekBar.width();
            var offsetXPercent = offsetX / seekBarWidth;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1, offsetXPercent);
            return offsetXPercent;
        };
        
        return {
            templateUrl: '/templates/directives/seek_bar.html',
            replace: true,
            restrict: 'E',
            scope: { },
            link: function(scope, element, attributes){
                // directive Logic to return
                scope.value = 0;
                scope.max = 100;
                
                // seekBar holds element that matches <seek-bar> as jQuery object $(element)
                var seekBar = $(element);
                
                var percentString = function() {
                    var value = scope.value;
                    var max = scope.max;
                    var percent = value / max * 100;
                    return percent + "%";
                };
                
                scope.fillStyle = function() {
                    return {width: percentString()};
                };
                
                scope.thumbStyle = function() {
                    return {left: percentString()};
                }
                
                //updates seek bar value based on seek bar's width and location of user's click on seek bar
                scope.onClickSeekBar = function(event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                };
                
                //like onClickSeekBar, uses $apply to apply change in value as user drags the seek bar thumb
                scope.trackThumb = function() {
                    $document.bind('mousemove.thumb', function(event) {
                        var percent = calculatePercent(seekBar, event);
                       scope.$apply(function() {
                            scope.value = percent * scope.max;
                           });
                        });
                    
                    $document.bind('mouseup.thumb', function() {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                            });
                        };
                    }
                };
            }
        
 
    
    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();
