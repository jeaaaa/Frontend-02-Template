# 学习笔记

前端架构： 组件化（复用），架构模式（MVC, MVVM，前端跟数据逻辑层怎么交互）

## 对象与组件

* 对象
    * Properties（属性）
    * Methods（方法）
    * Inherit（继承关系）

* 组件（UI强相关，即是对象又是模块）
    * Properties：强调从属关系
    * Methods
    * Inherit
    * Attribute：强调描述性
    * Config & State（config配置，state状态）
    * Event（事件，组件往外传递数据）
    * Lifecycle （生命周期）
    * Children

Attribute:
```
<my-component attribute="v />
myComponent.getAttribute("a")
myComponent.setAttribute("a", "value")
```
Property:
```
myComponent.a = "value";
```

```
<div class="cls1 cls2"></div>
<script>
var div = document.getElementByTagName('div')
div.className //cls1 cls2
// attribute 叫class, property 叫className
</script>
```

```
<div class="cls1 cls2" style="color:blue"></div>
<script>
var div = document.getElementByTagName('div')
div.style //对象
// attribute 是字符串，property是字符串语义化后的对象
</script>
```

```
<a href="//m.taobao.com"></a>
<script>
var a = document.getElementByTagName('a');
a.href //https://m.taobao.com 这个URL是resolve过的结果
a.getAttribute('href') //m.taobao.com 跟HTML代码中完全一致
</script>
```

```
<input value = "cute">
<script>
var input = document.getElementByTagName('input');  // 若property没有设置则结果是attribute
input.value // cute
input.getAttribute('value') //cyte
input.value = 'hello'   // 若value属性已经设置，则attribute不变，property变化，
元素上实际的效果是property优先
input.value // hellp
input.getAttribute('value') //cute
</script>
```

## 如何设计组件状态

&nbsp;|Markup set|JS set|JS change|User Input Change
:--:|:--:|:--:|:--:|:--:
property|❎|✅|✅|❓
attribute|✅|✅|✅|❓
state|❎|❎|❎|✅
config|❎|✅|❎|❎

### 搭建JSX环境
npm install -g webpack webpack-cli //全局安装webpack-cli
npm install --save-dev webpack babel-loader
npm install --save-dev @babel/core @babel/preset-env
