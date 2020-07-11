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