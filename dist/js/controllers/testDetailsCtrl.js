!function(){"use strict";function t(t,e,n,s,o){function i(t){n.getTestAndUser(t).then(r,a)}function a(){e.go("home")}function r(e){t.data.test=e.tests,t.data.user=e.users,s.getByTestId(t.data.test.id).then(u)}function u(e){t.data.answers=e,t.data.answers.forEach(l),c()}function c(){m(),d()}function d(){function e(t){n+=t.time}var n=0;t.data.answers.forEach(e),t.totalTime=n}function l(t){o.getById(t.questionId).then(function(e){e&&(t.question=e[0])})}function f(){var e=[];return t.data.answers.forEach(function(t){var n={c:[{v:"Questão "+t.order},{v:t.time}]};e.push(n)}),e}function m(){var e={cols:[{id:"question",label:"Questão",type:"string"},{id:"time",label:"Tempo",type:"number"}],rows:f()};t.questionTimeChart.data=e,t.questionTimeChart.options={title:"Duração por questão",colors:["#2c3e50"],vAxis:{title:"Tempo",gridlines:{count:10}},hAxis:{title:"Questão"}}}t.data={},t.questionTimeChart={type:"ColumnChart",displayed:!1},e.params.testId?i(e.params.testId):e.go("logs")}app.controller("testDetailsCtrl",t),t.$inject=["$scope","$state","testService","answerService","questionService"]}();