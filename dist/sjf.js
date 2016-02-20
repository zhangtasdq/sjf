/*! sjf - v0.0.1-dev - 2016-02-20 */
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

(function(SJF){
    "use strict";

    function Module() {
        function kclass() {
        }

        kclass.fn = kclass.prototype;

        kclass.extend = function(extendValue) {
            for(var key in extendValue) {
                if (extendValue.hasOwnProperty(key)) {
                    kclass[key] = extendValue[key];
                }
            }
        };

        kclass.include = function(includeValue) {
            for(var key in includeValue) {
                if (includeValue.hasOwnProperty(key)) {
                    kclass.fn[key] = includeValue[key];
                }
            }
        };

        return kclass;
    }

    SJF.Module = Module;
}(SJF));

(function (SJF) {
    "use strict";

    var Event = SJF.namespace("Event"),
        Util = SJF.namespace("Util");

    Event.on = function(eventName, callback, context, extraArg) {
        if (!eventName || !callback) {
            return;
        }
        if (!this.__listener) {
            this.__listener = {};
        }
        if (!this.__listener[eventName]) {
            this.__listener[eventName] = [];
        }
        if(!context) {
            context = null;
        }

        this.__listener[eventName].push({
            name: eventName,
            fn: callback,
            context: context,
            args: extraArg
        });
    };


    Event.trigger = function(eventName, context, args) {
        if (!eventName || !this.__listener || !this.__listener[eventName]) {
            return;
        }
        var callbacks = this.__listener[eventName];
        for(var i = 0; i < callbacks.length; i++) {
            this.__called(callbacks[i], context, args);
        }
    };

    Event.__called = function(callback, context, args) {
        var calledContext = context || callback.context;
        args = callback.args.concat(args);
        callback.fn.apply(calledContext, args);
    };

    Event.off = function(eventName, callback) {
        if (!eventName || !this.__listener || !this.__listener[eventName]) {
            return ;
        }
        var callbacks = this.__listener[eventName];
        if (callback) {
            for(var i = 0; i < callbacks.length; i++) {
                if (callbacks[i].fn === callback) {
                    break;
                }
            }
            if (i !== callbacks.length) {
                callbacks.splice(i, 1);
            }
        } else {
            delete this.__listener[eventName];
        }
    };

    Event.on = Util.buildRestParameter(Event.on);
    Event.trigger = Util.buildRestParameter(Event.trigger);

}(SJF));
