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
* Member
    * a.b
    * a[b]
    * foo``string``
    * super.b
    * new.target
    * new Foo()
* New
    * new Foo

#### Reference
Object, key
delete, assign

* Expressions
    * Call
        * foo()
        * super()
        * foo()['b']
        * foo().b
        * foo()'abc'
    * Left Handside & Right Handside
        example: a.b=c;<br/>a+b=c;
    * Update
        * a++
        * a--
        * --a
        * ++a
        example: ++a++; <br/> ++ (a++);
    * Unary
        * delete a.b
        * void foo()
        * typeof a
        * +a
        * -a
        * ~a
        * !a
        * await a
    * Exponentall
        * \**
    * Multiplicative
        * \* / %
    * Additive
        *  \- \+
    * Shift
        * << >> >>>
    * Relationship
        * < > <= >= instanceof in
    * Equality
        * ==
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

* Type Convertion
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
