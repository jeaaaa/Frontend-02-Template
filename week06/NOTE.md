# CSS

## CSS总体结构
* @charset
* @import
* rules
    * @media
    * @page
    * rule

## CSS的at-rules
* @charset: 用于提示 CSS 文件使用的字符编码方式，它如果被使用，必须出现在最前面。
* @import:  用于引入一个 CSS 文件，除了 @charset 规则不会被引入，@import 可以引入另一个文件的全部内容。
* @media:   media query 使用的规则，它能够对设备的类型进行一些判断。在 media 的区块内，是普通规则列表。
* @page:用于分页媒体访问网页时的表现设置，页面是一种特殊的盒模型结构，除了页面本身，还可以设置它周围的盒。
* @counter-style: 产生一种数据，用于定义列表项的表现。
* @keyframes: 产生一种数据，用于定义动画关键帧。
* @fontface: 用于定义一种字体，icon font 技术就是利用这个特性来实现的。
* @suppoets: 检查环境的特性，它与 media 比较类似。
* @namespace: 用于跟 XML 命名空间配合的一个规则，表示内部的 CSS 选择器全都带上特定命名空间。

## CSS规则
* selector-选择器
* key
* value

# 为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？

first-line表示第一行，其与first-letter实则表兄弟关系，都是针对文字的。注意这里，“针对文字”，也就是说，first-line是无法匹配任何真实的HTML元素的！
对于inline水平的元素，其本身就是line box, 就是一行流，因此，不存在所谓的first-line的说法。因此，first-line伪类/伪元素要想起作用，必须应用在block水平的元素上，例如display为如下值的些元素block, inline-block, table-cell或table-caption.
再由于first-line伪类/伪元素是处理文字字符的，因此，只有部分的CSS声明可以使用，类似float，position:absolute这些破坏性属性显然是不支持的。那都支持那些属性呢？

所有文字相关属性：font, font-style, font-variant, font-weight, font-size, 以及font-family.
color属性。
所有背景相关属性：background-color, background-image, background-position, background-repeat, background-size, 以及background-attachment.
word-spacing, letter-spacing, text-decoration, text-transform, 和line-height.