# 学习笔记
## 编程语言通识
### 语言按语法分类
* 非形式语言
    * 中文，英文等人类语言
* 形式语言（乔姆斯基谱系）  
    计算机编程语言，特点是有一个形式化定义，严谨严格；

    0. 无限制文法；
    1. 上下文相关文法；
    2. 上下文无关文法；
    3. 正则文法；<br/>
        `从上到下是包涵关系`

### 产生式（BNF）
* 用尖括号括起来的名称来表示语法结构名
* 语法结构分成基础结构和需要用其他语法结构定义的复合结构
    * 基础机构称终结符
    * 复合结构称非终结符
* 引号和中间的字符表示终结符
* 可以有括号
* *表示重复多次
* |表示或
* +至少一次

### 现代语言分类
* 形式语言-用途
    * 数据描述语言
    `JSON, HTML, XML, SQL, CSS`
    * 编程语言
    `C, C++, C#, JAVA, Python, Ruby, Perl, Lisp, T-SQL, Clojure, Haskell, JavaScript`
* 形式语言-表达方式
    * 声明式语言
    `JSON, HTML, XAML, SQL, CSS, Lisp, Clojure, Haskell`
    * 命令型语言
    `C, C++, JAVA, C#, Python, Ruby, Perl, JavaScript`
### 编程语言的性质
* 图灵完备性
    * 命令式-图灵机
        * goto
        * if和while    
    * 声明式-lambab
        * 递归
* 动态与静态
    * 动态
        * 在用户的设备/在线服务器上
        * 产品实际运行时
        * Runtime(运行时)
    * 静态
        * 在程序员设备上
        * 产品开发时
        * Compiletime（编译时）
* 类型系统
    * 动态类型系统与静态类型系统
        * 动态类型系统：在用户机器的内存里面能够找到的类型，比如JavaScript
        * 静态类型系统：只在编写代码的时候能够保存的类型信息，比如C++
        * Java则是半动态半静态的类型系统，因为他提供了反射机制
    * 强类型与弱类型
        * String + Number
        * String == Boolean
    * 复合类型
        * 结构体
        * 函数签名
    * 子类型
    * 泛型
        * 逆变/协变
### 一般命令式编程语言

Atom|Expression|Stateent|Structure|Program
:--:|:--:|:--:|:--:|:--:
Identier（关键字）|Atom|Expression|Function|Program
Literal（字面量）|Operator|Keyword|Class|Module
&nbsp;|Punctutor|Punctutor|Proess|Package
&nbsp;|&nbsp;|&nbsp;|Namespace|Library

Atom：原子级，组成语言的最小单位；<br/>
Expression： 表达式，原子级通过运算符相连接加上一些辅助符号构成一个表达式；<br/>
Stateent：语句，表达式加上一些特定的标识符和一些特定的关键字和一些特定的符号形成一定的结构；<br/>
Structure：结构化，function，class，等帮助组织代码<br/>
Program： 去管理语言的模块和安装，npm

语法>语义>运行时<br/>
通过一定的语法表达一定的语义最后改变了运行时的状态

## 重学JavaScript
### Atom
Grammar|Runtime
:--:|:--:
Literal(字面量)|Types
Variable（变量）|Exection Context
Keywords（关键字）|&nbsp;
Whitespace（空白符，换行符）|&nbsp;
Line Termintor（；）|&nbsp;

#### Types
* Number
* String
* Boolean
* Object
* Undefined：代表没有赋值
* Null：代表有值，但是是空；typeof的值会返回Object
* Symbol：专门用于Object属性名
* Bigint(在途)

##### Number
double float（双精度浮点类型)：sign(1个符号)，exponnt(11个指数位)，fraction(52个精度位)，每位就是一个bit，可以使0或1
float: 浮点数，小数点可以来回浮动；把一个数字拆成指数和有效位数，有效位数决定了浮点数表示的精度，指数决定了浮点数表示的范围
#### String
* charcter(字符)：一个抽象的表达，结合字体才会变成一个可见的形象
* code point： 用来表示charcter，规定的一个数字
* encoding
##### 字符集
* ASCII: 只规定了计算机里常用的127个字符，包括26个大写字母26个小写字母数字0-9和制表符换行符号等特殊符号
* Uniode：ASCII和Latin-1的超集，并支持地球上几乎所有的语言
* UCS
* GB：国标，跟Unicode不兼容，中文编码比Unicode省空间
    * GB2312
    * GBK(GB13000)
    * GB18030
* ISO-8859：没有中文版本，这个系列互不兼容
* BIG5：大五码，繁体

GB，ISO，BIG5都属于一定的国家地区语言的特定编码格式，互相之间冲突，不能混合使用
##### 编码
* UTF-8
* UTF-16
#### Boolean
* true
* false
#### Null&Undefined
* null： 表示有值，但是是空，是关键字
* undefined： 未定义，是一个全局变量，使用void 0来产生undefined
#### Object
任何一个对象都是唯一的，这与他本身的状态无关；<br/>
所以，即使状态完全一致的两个对象，也并不相等；<br/>
我们用状态来描述对象；<br/>
我们的状态改变即是行为；<br/>
对象三要素：唯一标识性，状态，行为。<br/>
##### class
类是一种常见的描述对象的方式;
##### prototype
原型是一种更接近人类原始认知的描述对象的方法；
我们并不试图做严谨的分类，而是才用“相似”这样的方式去描述对象；
任何对象仅仅需要描述他自己与原型的区别即可；
在设计对象的状态和行为时，我们总是遵循“行为改变状态”的原则；
##### Object in JavaScript
在JavaScript运行时，原生对象的描述方式非常简单，我们只需要关心原型和属性两个部分；一个对象就是一个属性的集合，JavaScript的每个对象都有一个Prototype；JS的属性既可以用来描述状态又可以描述行为；唯一标识性JavaScript使用的是内存地址；JavaScript对象获取属性的行为会沿着原型的指向一路找上去，我们称之为原型链；<br/>
JavaScript是属性是一个KV对，key值可以是两种类型string和symbol；value有两种形态数据属性和访问器属性，

