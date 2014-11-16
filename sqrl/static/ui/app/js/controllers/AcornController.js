define([], function(){
    'use strict';

    var AcornController = function($scope, $routeParams, $timeout, AcornService, FileService){
        var changedTimerId = null,
            aceEditor = null,
            aceSession = null,
            aceMappings = {
                'js':'ace/mode/javascript',
                'css': 'ace/mode/css',
                'html': 'ace/mode/html'
            }

        $scope.currentAcorn = $routeParams.acornName;
        $scope.files = [];
        $scope.accordionStatus = {
            html:true,
            css:true,
            js:true
        };
        $scope.fileText='';
        $scope.unsaved = false;
        $scope.saveMessage = '';

        var init = (function(){
            AcornService.getAcorn($scope.currentAcorn).then(function(result){
               $scope.files = result;
               if($scope.files.length) {
                   $scope.selectFile($scope.files[0]);
               }
            });
        }());

        $scope.selectFile = function(file) {
            saveChanges();
            FileService.getFile($scope.currentAcorn, file.fileName).then(function (fileText) {
                $scope.fileType = file.fileType;
                $scope.fileName = file.fileName;
                setAceSession(file.fileType,fileText);
            });
        };

        var saveChanges = function(){
            if($scope.fileName) { //when page is first loading
                var fileContents = aceSession.getValue();
                FileService.saveFile($scope.currentAcorn, $scope.fileName, $scope.fileText).then(function () {
                    $scope.unsaved = false;
                    $scope.saveMessage += ' (saved)';
                    //$timeout(function(){
                    //    $scope.saved=null;
                    //},2000);
                });
            }
        };

        var setAceSession = function(fileType, fileContents){
            aceEditor.setValue(fileContents);
            aceSession.setMode(aceMappings[fileType]);
            aceEditor.focus();

        }

        $scope.aceChanged = function() {
            if(!changedTimerId){
                changedTimerId = $timeout(function(){
                    saveChanges();
                    changedTimerId = null;
                },4000);
                $scope.unsaved = true;
                $scope.saveMessage = '*';
            }
        };

        $scope.aceLoaded = function(editor){
            aceEditor = editor;
            aceSession = editor.getSession();
        };
    };

    return ["$scope", '$routeParams', '$timeout', 'AcornService', 'FileService', AcornController];
});