# 学习笔记
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

### 现代语言好分类
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