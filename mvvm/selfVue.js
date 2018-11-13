function SelfVue(data, el, exp) {
    const self = this;
    this.data = data;

    Object.keys(data).forEach(function(key) {
        self.proxyKeys(key);
    });

    observe(data);

    el.innerHTML = this[exp]; //初始化模板数据的值
    new Watcher(this, exp, function(value) {
        el.innerHTML = value;
    });
    return this;
}

SelfVue.prototype = {
    proxyKeys: function(key) {
        const _this = this;
        Object.defineProperty(this, key, {
            enumerable: false,
            configurable: true,
            get: function() {
                return _this.data[key];
            },
            set: function(newVal) {
                _this.data[key] = newVal;
            }
        });
    }
};
