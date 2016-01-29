/*jshint -W030 */

describe("事件测试", function() {
    "use strict";

    var TestEvent = null;

    before(function() {
        TestEvent = new SJF.Module();
        TestEvent.include(SJF.Event);
    });

    it("SJF 应该存在 Event 属性且值为对象", function() {
        expect(SJF.Event).to.be.an("object");
    });

    describe("事件监听", function() {
        var eventObj = null;

        beforeEach(function() {
            eventObj = new TestEvent();
        });

        it("基本事件监听", function() {
            var callback = sinon.spy(),
                eventName = "simple event";
            eventObj.on(eventName, callback);
            eventObj.on(eventName, callback);
            eventObj.trigger(eventName);
            expect(callback.calledTwice).to.be.true;
        });

        it("上下文环境绑定", function() {
            var eventName = "context bind",
                context = {contextName: "test context bind"},
                callbackFn = function() {
                    return this.contextName;
                };
            var spyCallback = sinon.spy(callbackFn);

            eventObj.on(eventName, spyCallback, context);
            eventObj.trigger(eventName);
            expect(spyCallback.returnValues[0]).to.equal(context.contextName);
        });


        it("参数绑定", function() {
            var eventName = "args bind",
                arg = "binded arg",
                callbackFn = function(arg) {
                    return arg;
                };
            var spyCallback = sinon.spy(callbackFn);

            eventObj.on(eventName, spyCallback, null, arg);
            eventObj.trigger(eventName);
            expect(spyCallback.withArgs(arg).calledOnce).to.be.true;
        });

        it("触发时变更上下文", function() {
            var eventName = "context bind",
                context = {contextName: "test context bind"},
                anotherContext = {contextName: "another context bind"},
                callbackFn = function() {
                    return this.contextName;
                };
            var spyCallback = sinon.spy(callbackFn);

            eventObj.on(eventName, spyCallback, context);
            eventObj.trigger(eventName, anotherContext, null);
            expect(spyCallback.returnValues[0]).to.equal(anotherContext.contextName);
        });

        it("触发时传递参数", function() {
            var eventName = "args bind",
                arg = "binded arg",
                secondArg = "second arg",
                callbackFn = function(arg) {
                    return arg;
                };
            var spyCallback = sinon.spy(callbackFn);

            eventObj.on(eventName, spyCallback, null, arg);
            eventObj.trigger(eventName, null, secondArg);
            expect(spyCallback.calledWithExactly(arg, secondArg)).to.be.true;
        });

        it("可以为同一个事件绑定多个回调", function() {
            var eventName = "mutiple callback",
                callbackOne = function() {},
                callbackTwo = function() {};
            var spyOne = sinon.spy(callbackOne);
            var spyTwo = sinon.spy(callbackTwo);
            eventObj.on(eventName, spyOne);
            eventObj.on(eventName, spyTwo);
            eventObj.trigger(eventName);

            expect(spyOne.calledOnce).to.be.true;
            expect(spyTwo.calledOnce).to.be.true;
        });

        it("可以绑定多个事件处理", function() {
            var eventOne = "mutiple event one",
                eventTwo = "mutiple event two",
                callbackOne = function() {},
                callbackTwo = function() {};
            var spyOne = sinon.spy(callbackOne);
            var spyTwo = sinon.spy(callbackTwo);
            eventObj.on(eventOne, spyOne);
            eventObj.on(eventTwo, spyTwo);

            eventObj.trigger(eventOne);
            expect(spyOne.calledOnce).to.be.true;
            expect(spyTwo.calledOnce).to.be.false;

            eventObj.trigger(eventTwo);
            expect(spyTwo.calledOnce).to.be.true;
        });
    });

    describe("移除监听事件", function() {
        var eventObj = null,
            eventName = "remove listener",
            listenerOne = function() {},
            listenerTwo = function() {},
            spyOne = null,
            spyTwo = null;

        beforeEach(function() {
            eventObj = new TestEvent();
            spyOne = sinon.spy(listenerOne);
            spyTwo = sinon.spy(listenerTwo);
            eventObj.on(eventName, spyOne);
            eventObj.on(eventName, spyTwo);
        });

        it("可以移除一个事件名所有监听函数", function() {
            eventObj.off(eventName);
            eventObj.trigger(eventName);

            expect(spyOne.called).to.be.false;
            expect(spyTwo.called).to.be.false;
        });

        it("可以移除一个事件名下对应的回调函数", function() {
            eventObj.off(eventName, spyTwo);
            eventObj.trigger(eventName);
            expect(spyOne.calledOnce).to.be.true;
        });
    });

});
