const css = require('css')

let currentToken = null;
let currentAttribute = null;

let stack = [{type: "document", children:[]}]; // 栈的一个初始根节点
let currentTextNode = null;

let rules = [];
function addCSSRules(text){
    // 调用css parser分析css规则
    var ast = css.parse(text);
    // console.log(JSON.stringify(ast))
    rules.push(...ast.stylesheet.rules);    // 展开数组
}

function match(element, selector){
    if(!selector || !element.attributes){   //如果是文本节点就跳出
        return false;
    }

    if(selector.charAt(0) == "#"){
        var attr = element.attributes.filter(attr=> attr.name === "id")[0];
        if( attr && attr.value === selector.replace("#", '')){
            return true;
        }
    }else if(selector.charAt(0) == "."){
        var attr = element.attributes.filter(attr=>attr.name === "class")[0];
        if(attr && attr.value){
            let attrs = attr.value.split(" ");
            for( let i=0;i<attrs.length;i++ ){
                if(attrs[i] === selector.replace(".", '')){
                    return true;
                }
            }
        }
    }else{
        if(element.tagName === selector){
            return true;
        }
    }
    return false;
}

function specificity(selector){
    var p = [0, 0, 0, 0];
    var selectorParts = selector.split(" ");
    for(var part of selectorParts){
        if(part.charAt(0) == "#" ){
            p[1] += 1;
        }else if(part.charAt(0) == "."){
            p[2] += 1;
        }else{
            p[3] += 1;
        }
    }
    return p;
}

function compare(sp1, sp2){
    
}

function computeCSS(element){
    var elements = stack.slice().reverse();     //获取父元素序列，slice拷贝stack数组避免栈里的stack污染
    // 当前元素会逐级向外匹配

    if(!element.computedStyle){ //为了判断是否匹配添加的属性
        element.computedStyle = {};
    }

    for (let rule of rules){    //双循环匹配选择器
        var selectorParts = rule.selectors[0].split(" ").reverse(); //选择器也要从当前元素向外排列
        if(!match(element, selectorParts[0]))
            continue;

        let matched = false;

        var j = 1;
        for (let i = 0; i < elements.length; i++) {
            if(match(elements[i], selectorParts[j])){
                j++;
            }
        }
        if(j >= selectorParts.length){
            matched = true;
        }

        if(matched){
            //如果匹配到就加入到元素上
            var computedStyle = element.computedStyle;
            for(var declaration of rule.declarations){  //取出rule规则里的属性
                if(!computedStyle[declaration.property]){   //如果没有属性就创建一个对象储存属性值
                    computedStyle[declaration.property] = {}
                }
                computedStyle[declaration.property].value = declaration.value;
            }
            console.log(element.computedStyle);
        }
    }
}

function emit(token){
    let top = stack[stack.length - 1];

    if(token.type == "startTag"){
        let element = {
            type: "element",
            children: [],
            attributes: []
        };

        element.tagName = token.tagName;

        for(let p in token){
            if(p != "type" && p != "tagName"){  // 属性入栈
                element.attributes.push({
                    name: p,
                    value: token[p]
                })
            }
        }
        // 创建一个元素后，立即计算css
        computeCSS(element);    // 计算添加css属性

        top.children.push(element);
        element.parent = top; 

        if(!token.isSelfClosing){
            stack.push(element);
        }
        currentTextNode = null;

    }else if(token.type == "endTag"){
        if(top.tagName != token.tagName){
            console.log(top.tagName, token.tagName)
            throw new Error("Tag start end doesn't match")
        }else{
            //遇到style标签时，执行添加css规则操作
            if(top.tagName === "style"){
                addCSSRules(top.children[0].content);
            }
            stack.pop();
        }
        currentTextNode = null;
    }else if(token.type == "text"){
        if(currentTextNode == null){
            currentTextNode = {
                type: "text",
                content: ""
            }
            top.children.push(currentTextNode);
        }
        currentTextNode.content += token.content;
    }
}

const EOF = Symbol("EOF"); //EOF: end of file

function data(c){
    if( c=="<" ){
        return tagOpen;
    }else if(c == EOF){
        emit({
            type: "EOF"
        });
        return;
    }else{
        emit({
            type:"text",
            content: c
        });
        return data;
    }
}

function tagOpen(c){
    if(c == '/'){
        return endTagOpen;
    }else if(c.match(/^[a-zA-Z]$/)){
        currentToken = {
            type: "startTag",
            tagName: ""
        }
        return tagName(c);
    }else{
        return;
    }
}

function endTagOpen(c){
    if(c.match(/^[a-zA-Z]$/)){
        currentToken = {
            type: "endTag",
            tagName: ""
        }
        return tagName(c);
    }else if(c == ">"){
        // 报错
    }else if(c == EOF){
        // 报错
    }else{

    }
}

function tagName(c){
    if(c.match(/^[\t\n\f ]$/)){  // \t: tab符  ,\n:换行符，\f:禁止符， 空格
        return beforeAttributeName;
    }else if(c == "/"){
        return  selfClosingStartTag;
    }else if(c.match(/^[a-zA-Z]$/)){
        currentToken.tagName += c;
        return tagName
    }else if(c == ">"){
        emit(currentToken);
        return data;
    }else{
        return tagName;
    }
}

function beforeAttributeName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if( c == "/" || c == ">" || c == EOF){
        return afterAttributeName(c);
    }else if(c == "="){
        // return beforeAttributeName;
    }else{
        currentAttribute = {
            name: "",
            value: ""
        }
        return attributeName(c);
    }
}

function attributeName(c){
    if(c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF){
        return afterAttributeName(c);
    }else if(c == "="){
        return beforeAttributeValue;
    }else if(c == "\u0000"){

    }else if(c == "\"" || c == "'" || c == "<"){

    }else{
        currentAttribute.name += c;
        return attributeName;
    }
}

function beforeAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF){
        return beforeAttributeValue;
    }else if(c == "\""){
        return doubleQuotedAttributeValue;
    }else if(c == "\'"){
        return singleQuotedAttributeValue;
    }else if(c == ">"){

    }else{
        return UnquotedAttributeValue(c);
    }
}

function afterAttributeName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return afterAttributeName;
    }else if(c == "/"){
        return selfClosingStartTag;
    }else if(c == "="){
        return beforeAttributeValue;
    }else if(c == ">"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    }else if(c == EOF){

    }else{
        currentToken[currentAttribute.name] = currentAttribute.value;
        currentAttribute = {
            name: "",
            value: ""
        }
        return attributeName(c);
    }
}

function doubleQuotedAttributeValue(c){
    if(c == "\""){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    }else if(c == "\u0000"){

    }else if(c == EOF){

    }else{
        currentAttribute.value += c ;
        return doubleQuotedAttributeValue;
    }
}

function singleQuotedAttributeValue(c){
    if(c == "\'"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    }else if(c == "\u0000"){

    }else if(c == EOF){

    }else{
        currentAttribute.value += c ;
        return doubleQuotedAttributeValue;
        // return singleQuotedAttributeValue;
    }
}

function afterQuotedAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if(c == "/"){
        return selfClosingStartTag;
    }else if(c == ">"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    }else if(c == EOF){

    }else{
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}

function UnquotedAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/)){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return beforeAttributeName;
    }else if(c == "/"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    }else if(c == ">"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    }else if(c == "\u0000"){

    }else if(c == "\'" || c == "'" || c == "<" || c == "=" || c == "`"){

    }else if(c == EOF){

    }else{
        currentAttribute.value += c;
        return UnquotedAttributeValue;
    }
}

function selfClosingStartTag(c){
    if(c==">"){
        currentToken.isSelfClosing = true;
        emit(currentToken);
        return data;
    }else if(c == "EOF"){
        //报错
    }else{
        //报错
    }
}



module.exports.parserHTML = function parserHTML(html){
    
    let state = data; // 先给初始状态
    for (let c of html) {
        state = state(c);
    }
    state = state(EOF);
    
    console.log(stack)
    return stack;
}