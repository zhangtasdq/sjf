/*jshint -W030 */

describe("模块测试", function() {
    "use strict";

    it("SJF 应该有 Module 属性且为函数", function() {
        expect(SJF.Module).to.be.an("function");
    });

    describe("继承测试", function() {
        var ChildClass = null,
            childObj = null;

        beforeEach(function() {
            ChildClass = new SJF.Module();
            childObj = new ChildClass();
        });

        it("继承的子类可以通过 extend 向类本身添加属性或方法", function() {
            expect(ChildClass.extend).to.be.an("function");
            var extendValue = {
                extendName: "test extend",
                extendFn: function() {
                    return this.extendName;
                }
            };
            ChildClass.extend(extendValue);

            expect(ChildClass.extendName).to.equal(extendValue.extendName);
            expect(ChildClass.extendFn).to.equal(extendValue.extendFn);

            expect(childObj.extendName).to.be.undefined;
            expect(childObj.extendFn).to.be.undefined;
        });

        it("子类可以通过 include 向实例的原型添加属性或方法", function() {
            expect(ChildClass.include).to.be.an("function");
            var includeValue = {
                includeName: "include name",
                includeFn: function() {
                    return this.includeName;
                }
            };
            ChildClass.include(includeValue);

            expect(ChildClass.includeName).to.be.undefined;
            expect(ChildClass.includeFn).to.be.undefined;

            expect(childObj.includeName).to.equal(includeValue.includeName);
            expect(childObj.includeFn).to.equal(includeValue.includeFn);
        });
    });
});
