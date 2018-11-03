const data = {
    a: {
        b: 1
    }
};

function walk(data) {
    for (let key in data) {
        const dep = [];
        let val = data[key];
        // 如果 val 是对象，递归调用 walk 函数将其转为访问器属性
        const nativeString = Object.prototype.toString.call(val);
        if (nativeString === "[object Object]") {
            walk(val);
        }
        // console.log("!!!!", val);
        Object.defineProperty(data, key, {
            set(newVal) {
                if (newVal === val) return;
                val = newVal;
                dep.forEach(fn => fn());
            },
            get() {
                dep.push(Target);
                return val;
            }
        });
    }
}
walk(data);

// Target 是全局变量
let Target = null;

function $watch(exp, fn) {
    Target = fn;
    let pathArr,
        obj = data;
    // 检查 exp 中是否包含 .
    if (/\./.test(exp)) {
        // 将字符串转为数组，例：'a.b' => ['a', 'b']
        pathArr = exp.split(".");
        // 使用循环读取到 data.a.b
        pathArr.forEach(p => {
            console.log(p, obj[p]);
            obj = obj[p];
            console.log("@@@", obj);
        });
        return;
    }
    data[exp];
}
$watch("a.b", () => {
    console.log("第一个依赖");
});

data.a.b = 3;
