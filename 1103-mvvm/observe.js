// 需要创建一个可以容纳订阅者的消息订阅器Dep，订阅器Dep主要负责收集订阅者，然后再属性变化的时候执行对应订阅者的更新函数。所以显然订阅器需要有一个容器，这个容器就是list

function observe(data) {
    if (!data || typeof data !== "object") {
        return;
    }
    Object.keys(data).forEach(function(key) {
        defineReacitve(data, key, data[key]);
    });
}

function defineReacitve(data, key, val) {
    observe(val);
    var dep = new Dep();
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            if(需要添加订阅者){
                //需要添加订阅者
                dep.addSub(watcher)
            }
            return val;
        },
        set: function(newVal) {
            if (newVal === val) {
                return;
            }
            val = newVal;
            console.log(
                "属性" + key + "已经被监听了，新值为：" + newVal.toString();
            );
            dep.notify(); //如果数据变化，通知所有订阅者
        }
    });
}

function Dep(){
    this.subs = []
}
Dep.prototype = {
    addSub:function(sub){
        this.subs.push(sub)
    },
    notify:function(){
        this.subs.forEach(function(sub){
            sub.updata()
        })
    }
}


