!function(){"use strict";function t(t,e){e.otherwise("/home"),t.state("home",{url:"/home",templateUrl:"partials/_home.html",controller:"homeCtrl"}).state("credentials",{url:"/credentials",templateUrl:"partials/_credentials.html",controller:"credentialsCtrl"}).state("logs",{url:"/logs",templateUrl:"partials/_logs.html",controller:"logsCtrl"}).state("test",{url:"/test",templateUrl:"partials/_test.html",controller:"testCtrl",params:{answerId:null,answered:0,total:1}}).state("testCompleted",{templateUrl:"partials/_test-completed.html",controller:"testCompletedCtrl",params:{testId:null}}).state("testDetails",{url:"/logs/:testId",templateUrl:"partials/_test-details.html",controller:"testDetailsCtrl"})}app.config(t),t.$inject=["$stateProvider","$urlRouterProvider"]}();