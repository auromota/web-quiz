!function(){"use strict";function r(r){function n(r,n){return n?100*r/n:100}function t(n){for(var t=[],e=n>r?r:n,o=0;e>o;o++){for(var u=Math.floor(Math.random()*n);!a(t,u);)var u=Math.floor(Math.random()*n);t.push(u)}return t}function a(r,n){var t=!0;return r.forEach(function(r){r==n&&(t=!1)}),t}var e={getPercetange:n,generateRandomArray:t,canInsertNumber:a};return e}app.factory("utilService",r),r.$inject=["NUMBER_OF_QUESTIONS"]}();