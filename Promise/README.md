### 学习Promise文档并实现Promise

#### 文档连接/参考资料

[图灵社区翻译Promise](https://www.ituring.com.cn/article/66566)

[英文原文](https://promisesaplus.com/)

[菜鸟教程](https://www.runoob.com/w3cnote/javascript-promise-object.html)


#### Promise状态和值

1. 解决 (fulfill): 指promise成功是进行的操作, 对应Fulfille的状态, 虽然规范中用fulfill来表示但是在后续的实现中以resolve类代替

2. 拒绝 (reject): 指Promise失败时进行的一些列操作,对应Rejected的状态

3. 终值 (Eventual Value): 指Promise在Fulfill中传递给解决回调的值 因为Promise的状态变化不可逆性,所以此返回值成为终值, 也简洁成为Promise的值

4. 据因 (reason): 指的是Promise在Reject中返回的失败原因   

#### Promise　then
Promise必须有一个then函数, 接收两个可选参数onFulfilled onRejected, 分别在接收fuldill和reject的状态值,
