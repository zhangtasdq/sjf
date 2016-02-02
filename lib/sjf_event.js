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
