function observe(data) {
    if (!data || typeof data !== "object") {
        return;
    }
    Object.keys(data).forEach(function(key) {
        defineReacitve(data, key, data[key]);
    });
}

function defineReacitve(data, key, val) {
    observe(val); //遍历所有子属性
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            return val;
        },
        set: function(newVal) {
            if (newVal === val) {
                return;
            }
            val = newVal;
            console.log(
                "属性" + key + "已经被监听了，新值为：" + newVal.toString()
            );
        }
    });
}

var library = {
    book1: {
        name: ""
    },
    book2: ""
};

observe(library);

library.book1.name = "vue权威指南";
library.book2 = "无此书籍";
console.log("~~~~~~~~~~");
console.log(library.book1.name);


