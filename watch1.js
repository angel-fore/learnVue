const data = {
    a: 1
};

const dep = [];
Object.defineProperty(data, "a", {
    set() {
        dep.forEach(fn => fn());
    },
    get() {
        // 此时 Target 变量中保存的就是依赖函数
        dep.push(Target);
    }
});

// Target 是全局变量
let Target = null;
function $watch(exp, fn) {
    // 将 Target 的值设置为 fn
    Target = fn;
    // 读取字段值，触发 set 函数
    data[exp];
}
$watch("a", () => {
    console.log("第一个依赖");
});
$watch("a", () => {
    console.log("第二个依赖");
});

data.a = 3;
