(function(global) {
    "use strict";

    var previousSJF = global.SJF,
        SJF = global.SJF = {};

    SJF.noConflict = function() {
        global.SJF = previousSJF;
        return SJF;
    };

    SJF.isString = function(str) {
        return Object.prototype.toString.call(str) === "[object String]";
    };

    SJF.namespace = function(namespaceStr) {
        var NAMEREG = /^[a-zA-Z]\w*(\.\w*)*$/;

        if (!SJF.isString(namespaceStr)) {
            throw new Error("SJF.namespace 的参数必须为字符串");
        }
        if (!NAMEREG.test(namespaceStr)) {
            throw new Error("SJF.namespace 的参数必须是以 . 分隔的字符串");
        }
        var namespaceArray = namespaceStr.split("."),
            space = SJF;

        for(var i = 0; i < namespaceArray.length; i++) {
            var name = namespaceArray[i];
            if (!space.hasOwnProperty(name)) {
                space[name] = {};
            }
            space = space[name];
        }
        return space;
    };

}(window));
