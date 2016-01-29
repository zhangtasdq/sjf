(function (SJF) {
    "use strict";

    var Event = SJF.namespace("Event");

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

        if (arguments.length < 4) {
            extraArg = [];
        } else {
            extraArg = Array.prototype.slice.call(arguments, 3);
        }

        this.__listener[eventName].push({
            name: eventName,
            fn: callback,
            context: context,
            args: extraArg
        });
    };

    Event.__called = function(callback, context, args) {
        var calledContext = context || callback.context;
        args = callback.args.concat(args);
        callback.fn.apply(calledContext, args);
    };

    Event.trigger = function(eventName, context, args) {
        if (!eventName || !this.__listener || !this.__listener[eventName]) {
            return;
        }
        if (arguments.length < 3) {
            args = [];
        } else {
            args = Array.prototype.slice.call(arguments, 2);
        }
        var callbacks = this.__listener[eventName];
        for(var i = 0; i < callbacks.length; i++) {
            this.__called(callbacks[i], context, args);
        }
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
}(SJF));
