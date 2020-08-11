# 学习笔记
# 盒（box）
标签（tag） -- 源代码
元素（element） -- 语义
盒（box）-- 表现
HTML代码中可以书写开始 标签（tag），结束 标签，和只封闭 标签。<br/>
一对起止 标签， 表示一个 元素（element）。<br/>
DOM树中存储的是 元素 和其他类型的节点（node）。<br/>
>DOM树中存储的不全是元素，元素是节点的一种，还有文本节点，注释节点，CDATA，DTD等

css选择器选中的是 元素 或 伪元素。<br/>
css选择器选中的 元素，在排版时可能产生多个 盒。<br/>
排版和渲染的基本单位是 盒。<br/>
## 盒模型
![](./box.png)
box-sizing:
* content-box
* border-box

## 正常流

>css排版只排盒和文字
* 收集盒进行
* 计算盒在行中的排布
* 计算行的排布

IFC：inline-levle-formatting-context，行内级格式化上下文<br/>
BFC：block-levle-formatting-context，块级格式化上下文

### 正常流的行级排布
#### 基线对齐
![](./text.png)
任何一个文字都有宽和高，基线定义
orgin：文字的基线位置
bearingX：决定默认字间距
advance：字符占据的空间

#### 行模型
![](./line.png)




### 正常流的块级排布

### BFC合并