'use strict';

angular.module('unihack2015App')
  .controller('MainCtrl', function ($scope, $http, $state, Idea, Auth, $location) {
    $scope.user = {};
    $scope.newIdea = '';
    $scope.createState = 'creating';
    $scope.errors = [];
    var createdIdea = null;

    $scope.isLoggedIn = function () {
      return Auth.isLoggedIn();
    };

    $scope.createIdea = function (newIdea) {
      $scope.errors = [];
      if (newIdea.trim() == '') {
        console.log(newIdea);

        $scope.errors = ["You didn't provide an idea!"];
      } else {
        Idea.save({name: newIdea, user_id: Auth.getCurrentUser()._id}, function (item) {
          $scope.createState = 'created';
          createdIdea = item;
        });
      }
    };

    $scope.goToNew = function () {
      console.log('going to new');
      $state.go('idea', {id: createdIdea._id});
    };

    $scope.search = function () {
      if ($scope.user.newIdea) {
        Idea.search({title: $scope.user.newIdea}, function (ideas) {
          $scope.ideas = ideas;
        });
      }
    };

    $scope.registerUser = function (form) {
      Auth.createUser({
        username: $scope.user.username,
        email: $scope.user.email,
        password: $scope.user.password
      })
        .then(function () {
          if ($scope.user.newIdea) {
            $scope.createIdea($scope.user.newIdea);
          }
          // Account created, redirect to home
          $location.path('/ideas');
        })
        .catch(function (err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function (error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
    };

    $scope.loginUser = function () {
      Auth.login({
        username: $scope.user.username,
        password: $scope.user.password
      })
        .then(function () {
          if ($scope.user.newIdea) {
            $scope.createIdea($scope.user.newIdea);
          }
          // Logged in, redirect to home
          $location.path('/ideas');
        })
        .catch(function (err) {
          $scope.errors.other = err.message;
        });
    }
  });
