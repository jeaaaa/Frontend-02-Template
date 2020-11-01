
let stack; // 栈的一个初始根节点
let currentToken = null;
let currentAttribute = null;
let currentTextNode = null;


function emit(token){
    let top = stack[stack.length - 1];

    if(token.type === 'startTag'){
        let element = {
            type: 'element',
            children: [],
            attributes: []
        };

        element.tagName = token.tagName;

        for(let p in token){
            if(p != "type" || p != "tagName"){    // 属性入栈
                element.attributes.push({
                    name: p,
                    value: token[p]
                });
            }
        }

        top.children.push(element);

        if(!token.isSelfClosing){
            stack.push(element);
        }
        currentTextNode = null;

    }else if(token.type === 'endTag'){
        if(top.tagName !== token.tagName){
            throw new Error("Tag start end don't match!");
        }else{
            stack.pop();
        }
        currentTextNode = null;
    }else if(token.type === 'text'){
        if(currentTextNode === null){
            currentTextNode = {
                type: 'text',
                content: ''
            }
            top.children.push(currentTextNode);
        }
        currentTextNode.content += token.content;
    }
}

const EOF = Symbol('EOF'); // end of a file signal

function data(c){
    if(c === '<'){
        return tagOpen;
    }else if (c === EOF){
        emit({
            type: 'EOF',
        });
        return;
    }else{
        emit({
            type: 'text',
            content: c,
        });
        return data;
    }
}

function tagOpen(c){
    if(c === '/'){
        return endTagOpen;
    }else if(c.match(/^[a-zA-Z]$/)){
        currentToken = {
            type: 'startTag',
            tagName: '',
        };
        return tagName(c);
    }else{
        emit({
            type: 'text',
            content: c,
        });
        return data;
    }
}

function tagName(c){
    if(c.match(/^[\t\n\f ]$/)){   // \t: tab符  ,\n:换行符，\f:禁止符， 空格
        return beforeAttributeName;
    }else if(c === '/'){
        return selfClosingStartTag;
    }else if(c.match(/^[a-zA-Z]$/)){
        currentToken.tagName += c;
        return tagName
    }else if(c === '>'){
        emit(currentToken);
        return data;
    }else{
        currentToken.tagName += c;
        return tagName;
    }
}

function beforeAttributeName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if(c === '/' || c === '>' || c === EOF){
        return afterAttributeName(c);
    }else{
        currentAttribute = {
            name: '',
            value: ''
        }
        return attributeName(c);
    }
}

function attributeName(c){
    if(c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF){
        return afterAttributeName(c);
    }else if(c === '='){
        return beforeAttributeValue;
    }else{
        currentAttribute.name += c;
        return attributeName;
    }
}

function beforeAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF){
        return beforeAttributeValue(c);
    }else if(c === '\"'){
        return doubleQuotedAttributeValue;
    }else if(c === "\'"){
        return singleQuotedAttributeValue;
    }else{
        return UnquotedAttributeValue(c);
    }
}


function doubleQuotedAttributeValue(c){
    if(c === '\"'){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    }else{
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}

function singleQuotedAttributeValue(c){
    if(c === '\''){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    }else{
        currentAttribute.value += c;
        return singleQuotedAttributeValue;
    }
}

function afterQuotedAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if(c === '/'){
        return selfClosingStartTag;
    }else if (c === '>'){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    }else{
        throw new Error("unexpected charater \"" + c +"\"")
    }
}

function UnquotedAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/)){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return beforeAttributeName;
    }else if(c === '/'){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    }else if (c === '>'){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    }else{
        currentAttribute.value += c;
        return UnquotedAttributeValue;
    }
}

function selfClosingStartTag(c){
    if(c === '>'){
        currentToken.isSelfClosing = true;
        emit(currentToken);
        return data;
    }
}

function endTagOpen(c){
    if(c.match(/^[a-zA-Z]$/)){
        currentToken = {
            type: 'endTag',
            tagName: '',
        };
        return tagName(c);
    }
}

function afterAttributeName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return afterAttributeName;
    }else if(c === '/'){
        return selfClosingStartTag;
    }else if(c === '='){
        return beforeAttributeValue;
    }else if(c === '>'){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    }else{
        currentToken[currentAttribute.name] = currentAttribute.value;
        currentAttribute = {
            name: '',
            value: ''
        };
        return attributeName(c);
    }
}

export function parseHTML(html){

    stack = [{ type: 'document', children: [] }];
    currentToken = null;
    currentAttribute = null;
    currentTextNode = null;

    let state = data;
    for(let c of html){
        state = state(c);
    }
    state = state(EOF);
    return stack[0];
} 