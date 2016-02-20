/*jshint -W030 */

describe("工具测试", function() {
    "use strict";

    var Util = SJF.Util;

    it("SJF 应该存在有 Util 的属性且值为对象", function() {
        expect(Util).to.be.an("object");
    });

    describe("buildRestParameter 可以将函数包装为支持 rest 参数的形式", function(){

        describe("被包装函数只有一个参数", function() {
            function oneArg(arg1) {
                return arg1;
            }

            var spyOneArg = sinon.spy(oneArg),
                restOneArgFn = Util.buildRestParameter(spyOneArg);

            it("调用包装后的函数时不传递参数", function() {
                restOneArgFn();
                expect(spyOneArg.calledWith([])).to.be.true;
            });

            it("调用包装后的函数时传递多个参数", function() {
                restOneArgFn(1, 2, 3, 4);
                expect(spyOneArg.calledWith([1, 2, 3, 4])).to.be.true;
            });
        });

        describe("被包装函数有多个参数", function() {
            function manyArg(arg1, arg2, arg3) {
                arg1, arg2, arg3;
            }

            var spyManyArg = sinon.spy(manyArg),
                restManyArgFn = Util.buildRestParameter(spyManyArg);

            it("调用包装后的函数传递的参数少于被包装函数的参数个数", function() {
                restManyArgFn(1);
                expect(spyManyArg.calledWith(1, undefined, [])).to.be.true;
            });

            it("调用包装后的函数传递的参数多于被包装函数的参数个数", function() {
                restManyArgFn(1, 2, 3, 4, 5);
                expect(spyManyArg.calledWith(1, 2, [3, 4, 5])).to.be.true;
            });

        });

    });

});
