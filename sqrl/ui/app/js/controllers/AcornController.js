define([], function(){
    'use strict';

    var AcornController = function($scope, $location, $routeParams, $timeout, $modal, AcornService, FileService, UserService) {
        var changedTimerId = null,
            aceEditor = null,
            aceSession = null,
            aceMappings = {
                'js': 'ace/mode/javascript',
                'css': 'ace/mode/css',
                'html': 'ace/mode/html'
            }

        $scope.currentAcorn = $routeParams.acornName;
        $scope.files = [];
        $scope.accordionStatus = {
            html: true,
            css: true,
            js: true
        };
        $scope.unsaved = false;
        $scope.saveMessage = '';
        $scope.userName = UserService.getUserName();


        var init = (function () {
            if($scope.userName===''){
                $location.url('/');
            } else {
                AcornService.getAcorn($scope.currentAcorn).then(function (result) {
                    $scope.files = result;
                    if ($scope.files.length) {
                        $scope.selectFile($scope.files[0]);
                    } else {
                        generateNewAcorn();
                    }
                });
            }
        }());

        var generateNewAcorn = function () {
            $scope.files = FileService.getTemplateFiles($scope.currentAcorn);
            $scope.selectFile($scope.selectFile($scope.files[0]));
        };

        $scope.selectFile = function (file) {
            if (file) {
                saveChanges();
                var tempFileName = file.fileName;
                FileService.getFile($scope.currentAcorn, file.fileName, file.fileType).then(function (fileResult) {
                    if(tempFileName===fileResult.fileName) {
                        $scope.fileType = file.fileType;
                        $scope.fileName = file.fileName;
                        setAceSession(file.fileType, fileResult.fileData);
                    }
                });
            }
        };

        $scope.addFile = function(fileType){
            var modalInstance = $modal.open({
                templateUrl: 'views/addFile.html',
                controller: 'AddFileController',
                size:'sm',
                resolve:{
                    fileType: function(){
                        return fileType;
                    }
                }
            });

            modalInstance.result.then(function(fileName){
                if(fileName){
                    var file = {
                        fileType:fileType,
                        fileName:fileName
                    };
                    $scope.files.push(file);
                    $scope.selectFile(file);
                }
            });
        };

        var saveChanges = function () {
            if ($scope.fileName) { //when page is first loading
                var fileContents = aceSession.getValue();
                FileService.saveFile($scope.currentAcorn, $scope.fileName, fileContents).then(function () {
                    $scope.unsaved = false;
                    $scope.saveMessage = '* (saved)';
                });
            }
        };

        var setAceSession = function (fileType, fileContents) {
            aceEditor.setValue(fileContents,-1);
            aceSession.setMode(aceMappings[fileType]);
            $timeout(function(){
                aceEditor.focus();
            },0);
        };

        $scope.aceChanged = function () {
            if (!changedTimerId) {
                changedTimerId = $timeout(function () {
                    saveChanges();
                    changedTimerId = null;
                }, 4000);
            }
            $scope.unsaved = true;
            $scope.saveMessage = '*';
        };

        $scope.aceLoaded = function (editor) {
            aceEditor = editor;
            aceSession = editor.getSession();
        };
    };

    return ["$scope", '$location', '$routeParams', '$timeout', '$modal', 'AcornService', 'FileService', 'UserService', AcornController];
});