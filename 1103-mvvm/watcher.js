/**
订阅者Watcher在初始化的时候需要将自己添加进订阅器Dep中，那该如何添加呢？我们已经知道监听器Observer是在get函数执行了添加订阅者Wather的操作的，所以我们只要在订阅者Watcher初始化的时候出发对应的get函数去执行添加订阅者操作即可，那要如何触发get的函数，再简单不过了，只要获取对应的属性值就可以触发了，核心原因就是因为我们使用了Object.defineProperty( )进行数据监听
**/
function Watcher(vm, exp, cb) {
    this.vm = vm;
    this.exp = exp;
    this.cb = cb;
    this.value = this.get(); //将自己添加到订阅器
}
Watcher.prototype = {
    update: function() {
        this.run();
    },
    run: function() {
        var value = this.vm.data[this.exp];
        var oldValue = this.value;
        if (value !== oldValue) {
            this.value = value;
            this.cb.call(this.vm, value, oldValue);
        }
    },
    get: function() {
        Dep.target = this; //缓存订阅者
        var value = this.vm.data[this.exp]; // 强制执行监听器里的get函数
        Dep.target = null; //释放自己
        return value;
    }
};
