(function (SJF) {
    "use strict";

    var Util = SJF.namespace("Util"),
        slice = Array.prototype.slice;

    Util.buildRestParameter = function(wrapperFn) {
        var argCount = wrapperFn.length;

        return function() {
            var args = [];

            for(var i = 0; i < argCount - 1; i++) {
                args.push(arguments[i]);
            }
            if (arguments.length < argCount) {
                args.push([]);
            } else {
                args.push(slice.call(arguments, argCount -1));
            }

            wrapperFn.apply(this, args);
        };
    };
}(SJF));
