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
