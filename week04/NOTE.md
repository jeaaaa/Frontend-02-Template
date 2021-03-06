# 浏览器工作原理
## 浏览器工作原理总论

URL ->(HTTP) HTML ->(parse) DOM ->(css computing) DOM with CSS ->(layout) DOM with position ->(render) bitmap

### 有限状态机（处理字符串）
* 每一个状态都是一个机器
    * 在每一个机器里，我们可以做计算、存储、输出......
    * 所有的这些机器接受的输入是一致的
    * 状态机的每一个机器本身没有状态，如果我们用函数来表示的话，它应该是纯函数（无副作用）
* 每一个机器知道下一个状态
    * 每个机器都有确定的下一个状态（Moore）
    * 每个机器根据输入决定下一个状态（Mealy）

JS中的有限状态机（mealy）

```
// 每个函数是一个状态
function state(input)   //函数参数就是输入
{
    // 在函数中，可以自由的编写代码，处理每个状态的逻辑
    return next; //返回值作为下一个状态
}

*****以下是调用*****
while(input){
    // 获取输入
    state = state(input); //把状态机的返回值作为下一个状态
}
```

### HTTP的协议解析

* tcp的基础知识
    * 流：TCP数据传输，保证前后数据正确
    * 端口
    * require('net')：node里面使用
* IP的基础知识
    * 包
    * IP地址
    * libnet/libpcap
* HTTP（一个request对应着一个response）
    * request
    * response
    * http协议，文本型协议，所有的内容都是字符串，每个字节都是字符串的一部分
        * request line(POST,GET/HTTP/1.1)
        * headers（行数不固定，一个空行为标志进行结束）
            * Host:127.0.0.1
            * Content-Type: application/x-www-form-urlencoded
        * body （由content-type规定格式  ）

从使用设计接口形式