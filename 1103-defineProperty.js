var Book = {};
var name = "";
Object.defineProperty(Book, "name", {
    set: function(val) {
        name = val;
        console.log("书取名叫做" + name);
    },
    get: function() {
        console.log("书名是" + name);
        return name;
    }
});
Book.name = "vue权威指南";
console.log("~~~~~~~~~~~");
console.log(Book.name);
