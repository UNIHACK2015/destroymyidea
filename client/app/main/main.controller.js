'use strict';

angular.module('unihack2015App')
  .controller('MainCtrl', ['$scope', '$http', '$q', function ($scope, $http, $q) {
    $scope.awesomeThings = [];

    $scope.comments = [
      { comment: 'This is a clone of that other popular service.' },
      { comment: 'This is a clone of that other popular service.' },
      { comment: 'This is a clone of that other popular service.' },
      { comment: 'This is a clone of that other popular service.' },
      { comment: 'This is a clone of that other popular service.' },
      { comment: 'This is a clone of that other popular service.' },
      { comment: 'This is a clone of that other popular service.' },
      { comment: 'This is a clone of that other popular service.' }    
    ]

    $scope.ideas = [
      {
        title: 'RPG Game',
        description: "I'm going to make an RPG Game"
      },
      {
        title: 'Fighter Game',
        description: "I'm going to make an Fighter Game"
      }
    ]

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { title: $scope.ideas[0].title, description: $scope.ideas[0].description });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    var title = "Destroy My Idea!";

    function writeText(someString, someElement) {

      // var idea = ideas[0];

      // var writing = writeLetter().resolve(function () {



      // });

      var wait_time = 5000;
      var removeTimeout = someString.length * 100 + wait_time;

      writeLetter(someString.split(""));
      setTimeout(function() { removeLetter(someString) }, removeTimeout);

      function writeLetter(stringArray) {

        setTimeout(function() {
            if(stringArray.length) {
                someElement.innerHTML += stringArray.shift();
                writeLetter(stringArray);
            }
        }, 100);

      }

      function removeLetter (stringArray) {
          
        setTimeout(function() {
          if(stringArray.length+1) {
            someElement.innerHTML = stringArray;
            removeLetter(stringArray.slice(0,stringArray.length-1));
          }
        }, 100);

      }

    }

    writeText(title, document.getElementById("search"));

    var commentSection = document.getElementById('commentSection');

    function showSomeComments() {

      for(var i=0; i<$scope.comments.length; i++) {
        var comment = document.createElement('div');
        comment.setAttribute('id', 'comment' + i);
        comment.style.position = 'absolute';
        comment.style.padding = '10px';
        var positionX = Math.ceil((Math.random() * 100));
        var positionY = Math.ceil((Math.random() * 100));
        comment.style.left = positionX + '%';
        comment.style.top = positionY + '%';
        commentSection.appendChild(comment);
      }

      setTimeout(function() {
        for(var i=0; i<$scope.comments.length; i++) {
          randomStartWriteText($scope.comments[i].comment, document.getElementById('comment' + i));
        }
      }, 200);

      var startwritingtimeout = 200;

      function randomStartWriteText(someString, someElement) {
        startwritingtimeout = Math.ceil((Math.random() * 10000) + 200);
        console.log(startwritingtimeout);
        setTimeout(function () {
          writeText(someString,someElement);
        }, startwritingtimeout);
      }


    }

    showSomeComments();
  }]);
