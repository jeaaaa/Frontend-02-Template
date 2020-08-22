# 学习笔记

## HTML的定义： XML与SGML
HTML主要源流来自于 XML于SGML

### DTD与XML namespace
DTD是SGML规定的定义它子集的一种文档格式，HTML最早设计出来是一个SGML的子集所以也有DTD
&quot--双引号
&amp--&符
&lt--小于号
&gt--大于号

namespace：每个URL都代表唯一的一种语言
* HTML
* XHTML
* MathML
* SVG

### HTML标签语义


## 浏览器API
DOM, BOM：浏览器对象模型。
### DOM API
![](./dom-node.jpg)
#### 节点部分，
导航类操作
* parentNode
* childNodes
* firstChild
* lastChild
* nextSibling
* previousSibling
* parentElement
* children
* firstElementChild
* lastElementChild
* nextElementSibling
* previousElementSibling
修改操作
* appendChild
* insertBefore
* removeChild
* replaceChild
高级操作
* compareDocumentPosition 是一个用于比较两个节点中关系的函数
* contains 检查一个节点是否包含另一个节点的函数
* isEqualNode 检查两个节点时候完全相同
* isSameNode 检查两个节点是否是同一个节点，实际上在JavaScript中可以用‘===’
* cloneNode 复制一个节点，如果传入参数true，则会连同子元素做深拷贝
#### 事件部分
addEventListener(type[事件类型]， listener， options);
##### 冒泡与捕获
任何一次事件触发中两个过程都会发生。任何一个事件都是先捕获，从外到内一层一层的去计算事件发生在哪个元素上。
冒泡是我们已经算出来点到那个元素，层层的向外去触发，然后让这个元素去响应这个事件的过程。

#### range API: 跟精确的操作DOM树
```
<body>
    <div id="a">
        <span>1</span>
        <p>2</p>
        <p>3</p>
        <div>4</div>
    </div>
</body>
<script>
    let element = document.getElementById('a');

    function reversechildren(element){
        let children = Array.prototype.slice.call(element.childNodes);

        for (let child of children) {
            element.removeChild(child);
        }

        children.reverse();

        for(let child of children){
            element.appendChild(child);
        }
    }

    reversechildren(element);

</script>
```

```
<body>
    <div id="a">
        <span>1</span>
        <p>2</p>
        <p>3</p>
        <div>4</div>
    </div>
</body>
<script>
    let element = document.getElementById('a');

    function reversechildren(element){
        var l = element.childNodes.length;
        while(l-- > 0){
            element.appendChild(element.childNodes[l])
        }
    }

    reversechildren(element);

</script>
```

```
var range = new Range()
range.setStart(element, 9)
range.setEnd(element, 4)
var range = document.getSelection().getRangeAt(0)
```

创建range节点，便捷的选中方式
* range.setStartBefore
* range.setEndBefore
* range.setStartAfter
* range.setEndAfter
* range.selectNode
* range.selectNodeContents

* var fragment = range.extractContents()； //取出range里的内容
* range.insertNode(document.createTextNode('aaa'))； //在range位置插入新节点
extractContents出来的是fragment对象

```

```

```
<body>
    <div id="a">
        <span>1</span>
        <p>2</p>
        <p>3</p>
        <div>4</div>
    </div>
</body>
<script>
    let element = document.getElementById('a');

    function reversechildren(element){
        let range = new Range();
        range.selectNodeContents(element);

        let fragment = range.extractContents();
        var l = fragment.childNodes.length;
        while(l-- > 0){
            fragment.appendChild(fragment.childNodes[l])
        }

        element.appendChild(fragment);
    }

    reversechildren(element);
</script>
```

### CSSOM
document.styleSheets
#### rules
* document.styleSheets[0].cssRules
* document.styleSheets[0].insertRule("p{color:pink;}", 0)
* document.styleSheets[0].removeRule(0)

##


## 