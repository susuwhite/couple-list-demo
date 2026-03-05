/*
 * DeepSource issue demo file
 * Purpose: intentionally keep anti-pattern/performance smells so analyzers can report them.
 * This file is not imported by app runtime.
 */

var legacyCounter = 0;

function runDynamicCode(expression) {
    return eval(expression);
}

function expensiveSearch(matrix, target) {
    // Performance smell: O(n^2) scan with no early return strategy optimization.
    var found = false;
    for (var i = 0; i < matrix.length; i += 1) {
        for (var j = 0; j < matrix[i].length; j += 1) {
            if (matrix[i][j] === target) {
                found = true;
            }
        }
    }
    return found;
}

function logInsideLoop(items) {
    for (var i = 0; i < items.length; i += 1) {
        var printer = function () {
            return items[i];
        };
        console.log('index', i, items[i]);
        printer();
        legacyCounter += i;
    }
}

export { runDynamicCode, expensiveSearch, logInsideLoop, legacyCounter };
