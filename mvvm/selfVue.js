function SelfVue(options) {
    const self = this;
    this.vm = this;
    this.data = options.data;

    Object.keys(this.data).forEach(function(key) {
        self.proxyKeys(key);
    });

    observe(this.data);

    new Compile(options.el, this.vm);

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
