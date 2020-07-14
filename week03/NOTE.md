# 学习笔记
## 表达式（Expression）
### Grammer
**Grammar Tree(语法树) vs Priority(优先级)**<br/>
**Left hand side & Right hand Side**
### Runtime 
**Type Convertion(类型转换)**<br/>
**Reference(引用类型)**

#### Tree vs Priority
* \+ -
* \* /
* ()
运算符的优先级会影响到语法树的构成
##### Expressions
###### Member（运算符优先级最高，往下依次递减）
    * a.b：成员访问
    * a[b]：成员访问，支持运行时的字符串
    * foo\`string\`：反引号字符串，前面加函数名，反引号字符串会传进函数当做参数
    * super.b：super在class构造函数里使用
    * super['b']
    * new.target：前后两个词固定
    * new Foo()：带括号的new优先级跟前面的相同，不带括号的new被单独设为一个优先级new expression并且优先级更低
###### New
    * new Foo：比带括号的new运算优先级低

Example:
```
new a()();  //new ()的结构优先级更高，所以第一个括号跟着new运算
new new a();    // 因为带括号的new运算优先级更高，括号回合第二个new结合
```

###### Reference，运行时存在的类型，称作标准中的类型
a.b访问的一个属性，从属性里面取出来的引用，即reference引用类型；<br/>
一个reference类型取出来的是一个object和一个key，完全记录了member运算的前半部分和后半部分；
* Object 
* key：可以使string也可以是symbol
列如：delete, assign会用到reference类型，+ -运算就直接解引用


###### Call
* foo()
* super()
* foo()['b']：['b']，.b，\`b\`运算优先级会降低到call expression
* foo().b
* foo()'abc'
###### Left Handside & Right Handside
    example: a.b=c; c = a+b;    //不能使用a+b=c
// a.b是一个left handside expression，a+b是一个right handside expression;
// 只有left handside expression才有资格放到等号左边
* Update   （从这里往下的expression都是right handside expression）
    * a++
    * a--
    * --a
    * ++a
    example: ++a++; <br/> ++ (a++);
    // 都不合法
* Unary（单目运算符）
    * delete a.b
    * void foo()
    * typeof a
    * +a
    * -a
    * ~a： 位运算，把整数按位取反，不是整数就强制转为整数
    * !a： ！！任意类型强制转换为Boolean
    * await a
* Exponentall
    * \**   
唯一一个右结合运算符，乘方
    example：
        3 ** 2 ** 3； //先算2的三次方，再算3的八次方
* Multiplicative
    * \* / %
* Additive
    *  \- \+
* Shift（位运算）
    * << >> >>>
* Relationship
    * < > <= >= instanceof in
* Equality
    * ==   //会类型转换后比较
    * !=
    * ===
    * !==
* Bitwise
    * & ^ |
* Logical
    * &&
    * ||
* Conditional
    * xx ? xx : xx  

###### Type Convertion（类型转换）
    * a+b
    * "false" == false;
    * a[o] = 1;

&nbsp;|Number|String|Boolean|Undefined|Null|Object|Symbol
:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:
Number|-|&nbsp;|0 false|X|X|Boxing|X
String|&nbsp;|-|"" false|X|X|Boxing|X
Boolean|true 1<br/> false 0|'true'<br/>'false'|-|X|X|Boxing|X
Undefined|NaN|'Undefined'|false|-|X|X|X
Null|0|'null'|false|X|-|X|X
Object|valueOf|valueOf<br/>toString|true|X|X|-|X
Symbol|X|X|X|X|X|Boxing|-

* unboxing
    * ToPremotive
    * toString vs valueOf
    * Symbol.toPrimitive
    ```
    var o={
        toString(){ return "2"};
        valueOf(){ return 1 };
        [Symbol.toPrimitive](){return 3};
    }
    ```
* Boxing

类型|对象|值
:--:|:--:|:--:
Number|new Number(1)|1
String|new String("a")|"a"
Boolean|new Boolean(true)|true
Symbol|new Object(Symbol("a"))|Symbol("a")

* Exercise
    * StringToNumber
    * NumberToString
