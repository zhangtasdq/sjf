describe("SJF 核心测试", function() {
    "use strict";

    it("应该存在有名为 SJF 的全局变量", function() {
        expect(SJF).to.be.an("object");
    });

    it("如果已有名为 SJF 的全局变量,可以调用 noConflict 返回当前框架的 SJF 并还原原有的 SJF");

    it("SJF.isString 方法应该对字符串返回 true, 其它返回 false", function() {
        expect(SJF.isString).to.be.an("function");

        var invalidStr = [null, undefined, {}, function(){}, 1, /\s/, NaN];
        invalidStr.forEach(function(item) {
            expect(SJF.isString(item)).to.equal(false);
        });

        var validStr = ["", "str", "str_", "_str"];
        validStr.forEach(function(item) {
            expect(SJF.isString(item)).to.equal(true);
        });
    });

    describe("SJF.namespace", function() {
        it ("应该存在有名为 namespace 的方法", function() {
            expect(SJF.namespace).to.be.an("function");
        });

        it("namespace('parentSpace.childSpace') 可以在 SJF 上创建对应的名字空间", function() {
            var childSpace = SJF.namespace("parentSpace.childSpace");
            expect(childSpace).to.be.an("object");
            expect(childSpace).to.equal(SJF.parentSpace.childSpace);
        });

        it("当 SJF 中存在对应的名字空间时, namespace 将返回对应的值", function() {
            var nameValue = "childSpace";
            var childSpace = SJF.namespace("parentSpace.childSpace");
            expect(childSpace).to.not.have.ownProperty("name");
            childSpace.name = nameValue;

            var sameSpace = SJF.namespace("parentSpace.childSpace");
            expect(sameSpace.name).to.equal(nameValue);
        });

        it("当 namespace 的参数不是以 . 分隔的字符串时应该抛出错误", function() {
            var errorValue = [null, undefined, true, false, "error-name"];
            errorValue.forEach(function(item) {
                expect(function() {
                    SJF.namespace(item);
                }).to.throw(Error);
             });
        });
    });
});
