'use strict';

angular.module('unihack2015App')
  .controller('UserCtrl', function ($scope, User, $state, Idea) {
    $scope.user = {};
    User.getByUName({'username': $state.params.userid}, function (user) {
      $scope.user = user;
      $scope.user.userImgPath = 'http://lorempixel.com/g/300/300/abstract';
      generateLevelData($scope.user.points);

      Idea.query({user_id: user._id}, function (users) {
        $scope.ideas = [{
          name: 'Hello world',
          description: 'WWWWWW'
        }, {
          name: 'Hello WwwWWW',
          description: 'WWWWWW'
        }, {
          name: 'Hello WwwWWW',
          description: 'WWWWWW'
        }, {
          name: 'Hello WwwWWW',
          description: 'WWWWWW'
        }];
      });
    });


    // {
    // 	'username' : 'TheKiller',
    // 	'userImgPath' : '../../assets/images/person.png',
    // 	'reputation': 500,
    // 	'level': 0,
    // 	'remainingXp': 0,
    // 	'levelCurrentXp': 0,
    // 	'levelTotalXp': 0,
    // 	'levelPercentage': 0,
    // 	'badges': [
    // 		{
    // 			'badgeName': 'DYNAMITE',
    // 			'badgeDescription': 'Made your first comment',
    // 			'badgeImgPath': '../../assets/images/badges/bomb.png'
    // 		},
    // 		{
    // 			'badgeName': 'DYNAMITE',
    // 			'badgeDescription': 'Made your first comment',
    // 			'badgeImgPath': '../../assets/images/badges/bomb.png'
    // 		},
    // 		{
    // 			'badgeName': 'DYNAMITE',
    // 			'badgeDescription': 'Made your first comment',
    // 			'badgeImgPath': '../../assets/images/badges/bomb.png'
    // 		},
    // 		{
    // 			'badgeName': 'DYNAMITE',
    // 			'badgeDescription': 'Made your first comment',
    // 			'badgeImgPath': '../../assets/images/badges/bomb.png'
    // 		}
    // 	]
    // };

    function generateLevelData(reputation) {
      var level = 0;
      var remainingXp = 0;
      var levelXp = 0;

      var levelPoints = new Array();
      var levelCeil = 0;
      var levelTotalXp = 0;

      for (var i = 1; i < 20; i++) {
        levelCeil += 50 * Math.pow(i, 2);
        levelPoints[i] = levelCeil;
      }

      for (var i = 1; i < 20; i++) {
        if (reputation < levelPoints[i]) {
          level = i;
          if (level > 1) {
            remainingXp = reputation - levelPoints[level - 1];
          }
          levelTotalXp = 50 * Math.pow(i, 2);
          break;
        }
      }

      $scope.user.level = level;
      $scope.user.remainingXp = remainingXp;
      $scope.user.levelCurrentXp = levelTotalXp - remainingXp;
      $scope.user.levelTotalXp = levelTotalXp;
      $scope.user.levelPercentage = (Math.ceil(((levelTotalXp - remainingXp) / levelTotalXp) * 100)).toString() + '%';

      console.log('Level: ' + $scope.user.level);
      console.log('levelCurrentXp: ' + $scope.user.levelCurrentXp);
      console.log('remainingXp: ' + $scope.user.remainingXp);
      console.log('levelTotalXp: ' + $scope.user.levelTotalXp);
      console.log('levelPercentage: ' + $scope.user.levelPercentage);
    }

  });
