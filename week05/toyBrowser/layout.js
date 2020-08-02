function getStyle(element){
    if(!element.style){
        element.style = {};
    }

    for(let prop in element.computedStyle){
        var p = element.computedStyle.value;
        element.style[prop] = element.computedStyle[prop].value; //style存储最后计算出来的属性


        if(element.style[prop].toString().match(/px$/)){ //px单位转换为数字
            element.style[prop] = parseInt(element.style[prop]);
        }

        if(element.style[prop].toString().match(/^[0-9\.]+$/)){
            element.style[prop] = parseInt(element.style[prop]);
        }
    }
    return element.style;
}

function layout(element){
    if(!element.computedStyle){ //跳过没有computdStyle的元素
        return;
    }

    var elementStyle = getStyle(element);

    if(elementStyle.display !== 'flex'){ //不是flex布局就直接跳出
        return
    }

    // 过滤所有文本元素 
    var items = element.children.filter(e => e.type === 'element');

    // 处理order
    items.sort(function (a, b) {
        return (a.order || 0) - (b.order || 0);
    });

    var style = elementStyle;
    //处理主轴和交叉轴
    ['width', 'height'].forEach(size => {
        if (style[size] === 'auto' || style[size] === '') {
            style[size] = null;
        }
    });

    //设置属性默认值
    if(!style.flexDirection || style.flexDirection === 'auto'){
        style.flexDirection = 'row';
    }
    if(!style.alignItems || style.alignItems === 'auto'){
        style.alignItems = 'stretch';
    }
    if(!style.justifyContent || style.justifyContent === 'auto'){
        style.justifyContent = 'flex-start';
    }
    if(!style.flexWrap || style.flexWrap === 'auto'){
        style.flexWrap = 'nowarp';
    }
    if(!style.alignContent || style.alignContent === 'auto'){
        style.alignContent = 'stretch';
    }

    var mainSize, mainStart, mainEnd, mainSign, mainBase,
        crossSize, crossStart, crossEnd, crossSign, crossBase;
    if(style.flexDirection === 'row'){ //设定主轴和交叉轴
        mainSize = 'width';
        mainStart = 'left';
        mainEnd = 'right';
        mainSign = +1; //从右往左排去延伸
        mainBase = 0;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }
    if(style.flexDirection === 'row-reverse'){
        mainSize = 'width';
        mainStart = 'right';
        mainEnd = 'left';
        mainSign = -1;
        mainBase = style.width;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }
    if(style.flexDirection === 'column'){
        mainSign = 'height';
        mainStart = 'top';
        mainEnd = 'bottom';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    }
    if(style.flexDirection === 'column-reverse'){
        mainSign = 'height';
        mainStart = 'bottom';
        mainEnd = 'top';
        mainSign = -1;
        mainBase = style.height;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    }
    if(style.flexWrap === 'wrap-reverse'){
        var tmp = crossStart;
        crossStart = crossEnd;
        crossEnd = tmp;
        crossSign = -1;
    } else {
        crossBase = 0;
        crossSign = 1;
    }

    var isAutoMainSize = false; //如果父元素没有设置主轴尺寸，就进入autoMainSize，由子元素把父元素撑开
    if(!style[mainSize]){
        elementStyle[mainSize] = 0;
        for(let i = 0; i < items.length; i++){
            var item = items[i];
            if(itemStyle[mainSize] !== null || itemStyle[mainSize] !== (void 0)){
                elementStyle[mainSize] = elementStyle[mainSize] + itemStyle[mainSize];
            }
        }
        isAutoMainSize = true;
    }

    var flexLine = [];
    var flexLines = [flexLine];

    // 剩余空间
    var mainSpace = elementStyle[mainSize]; //剩余空间 = 主轴尺寸
    var crossSpace = 0;

    // 分行
    // 根据主轴尺寸，把元素分进行
    // 若设置了no-wap，则强行分配进第一行
    for(var i = 0; i < items.length; i++){ //循环所有元素
        var item = items[i];
        var itemStyle = getStyle(item);

        if(itemStyle[mainSize] === null){ //没设主轴尺寸就给个默认值
            itemStyle[mainSize] = 0;
        }

        if(itemStyle.flex){
            flexLine.push(item);
        }else if (style.flexWrap === 'nowrap' && isAutoMainSize){
            mainSpace -= itemStyle[mainSize];
            if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)){
                crossSpace = Math.max(crossSpace, itemStyle[crossSize]); //行高
            }
            flexLine.push(item);
        }else{ //处理换行
            if(itemStyle[mainSize] > style[mainSize]){ //比父元素尺寸还大就填满父元素
                itemStyle[mainSize] = style[mainSize];
            }
            if(mainSpace < itemStyle[mainSize]){ //主轴剩下的空间不足以容纳接下来的元素

                flexLine.mainSpace = mainSpace; // 主轴剩余空间

                flexLine.crossSpace = crossSpace; // 交叉轴剩余空间
                flexLine = [item];
                flexLines.push(flexLine);
                mainSpace = style[mainSize]; //重置尺寸
                crossSpace = 0;
            }else{
                flexLine.push(item);
            }

            // 重新计算主轴和交叉轴的剩余空间
            if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)){
                crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
            }

            mainSpace -= itemStyle[mainSize];
        }

    }

    flexLine.mainSpace = mainSpace;

    // 计算主轴方向
    // 找出所有Flex元素
    // 把主轴方向的剩余尺寸按比例分配给这些元素
    // 若剩余空间为负数，所有flex元素为0，等比压缩剩余元素
    if(style.flexWrap === 'nowrap' || isAutoMainSize){
        flexLine.crossSpace = (style[crossSize] !== undefined) ? style[crossSize] : crossSpace;
    }else{
        flexLine.crossSpace = crossSpace;
    }

    if(mainSpace < 0){ //等比压缩
        // 单行
        var scale = style[mainSize] / (style[mainSize] - mainSpace);
        var currentMain = mainBase;

        for(let i = 0; i < items.length; i++){
            var item = items[i];
            var itemStyle = getStyle(item);
            if(itemStyle.flex){
                itemStyle[mainSize] = 0;
            }

            itemStyle[mainSize] = itemStyle[mainSize] * scale;
            itemStyle[mainStart] = currentMain;
            itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
            currentMain = itemStyle[mainEnd];
        }
    }else{
        // 多行
        flexLines.forEach(function (items){
            var mainSpace = items.mainSpace;
            var flexTotal = 0;
            for(let i = 0; i < items.length; i++){
                var item = items[i];
                var itemStyle = getStyle(item);

                if((itemStyle.flex !== null) && (itemStyle.flex !== (void 0))){
                    flexTotal += itemStyle.flex;
                    continue;
                }
            }

            if(flexTotal > 0){
                var currentMain = mainBase;
                for(let i = 0; i < items.length; i++){
                    var item = items[i];
                    var itemStyle = getStyle(item);

                    if(itemStyle.flex){
                        itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;
                    }

                    itemStyle[mainStart] = currentMain;
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];

                    currentMain = itemStyle[mainEnd];
                }
            }else{
                if(style.justifyContent === 'flex-start'){
                    var currentMain = mainBase;
                    var step = 0;
                }
                if(style.justifyContent === 'flex-end'){
                    var currentMain = mainSpace * mainSign + mainBase;
                    var step = 0;
                }
                if(style.justifyContent === 'center'){
                    var currentMain = mainBase
                    var step = mainSpace / (items.length - 1) * mainSign;
                }
                if(style.justifyContent === 'space-between'){
                    var step = mainSpace / (items.length - 1) * mainSign;
                    var currentMain = mainBase;
                }
                if(style.justifyContent === 'space-around'){
                    var step = mainSpace / items.length * mainSign;
                    var currentMain = step / 2 + mainBase;
                }
                for(var i = 0; i < items.length; i++){
                    var item = items[i];
                    itemStyle[mainStart, currentMain];
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
                    currentMain = itemStyle[mainEnd] + step;
                }
            }
        });
    }

    //计算交叉轴
    //根据每一行中最大元素尺寸计算行高
    // 根据行高flex-align和item-align, 确定元素具体位置
    if(!style[crossSize]){ // 交叉轴，crossSize 未设定时默认为 count flexLines 每行最大crossSpace之和
        crossSpace = 0;
        elementStyle[crossSize] = 0;
        for(let i = 0; i < flexLines.length; i++){
            elementStyle[crossSize] = elementStyle[crossSize] + flexLines[i].crossSpace;
        }
    }else{ // 设定后，计算出最终的crossSpace 为crossSpace 减去每行最大crossSpace 剩余空间，用作分配
        crossSpace = style[crossSize];
        for(let i = 0; i < flexLines.length; i++){
            crossSpace -= flexLines[i].crossSpace;
        }
    }

    if(style.flexWrap === 'wrap-reverse'){ // 如果是reverse 那么从底部往上排列
        crossBase = style[crossSize];
    }else{
        crossBase = 0;
    }

    var lineSize = style[crossSize] / flexLines.length;

    var step;
    if(style.alignContent === 'flex-start'){
        crossBase += 0;
        step = 0;
    }
    if(style.alignContent === 'flex-end'){
        crossBase += crossSign * crossSpace;
        step = 0;
    }
    if(style.alignContent === 'center'){
        crossBase += crossSign * crossSpace / 2;
        step = 0;
    }
    if(style.alignContent === 'space-between'){
        crossBase += 0;
        step = crossSpace / (flexLines.length - 1);
    }
    if(style.alignContent === 'stretch'){
        crossBase += 0;
        step = 0;
    }

    flexLines.forEach(function(items){
        var lineCrossSize = style.alignContent === 'stretch' ? items.crossSpace + crossSpace / flexLines.length : items.crossSpace;

        for(let i = 0; i < items.length; i++){
            var item = items[i];
            var itemStyle = getStyle(item);

            var align = itemStyle.alignSelf || style.alignItems;

            if(itemStyle[crossSize] === null){
                itemStyle[crossSize] = (align === 'stretch') ? lineCrossSize : 0;
            }
            if(align === 'flex-start'){
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
            }
            if(align === 'flex-end'){
                itemStyle[crossStart] = crossBase + crossSign * lineCrossSize;
                itemStyle[crossEnd] = itemStyle[crossStart] - crossSign * itemStyle[crossSize];
            }
            if(align === 'center'){
                itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize] / 2);
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
            }
            if(align === 'stretch'){
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = crossBase + crossSign * ((itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) ? itemStyle[crossSize] : lineCrossSize);

                itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart]);
            }
        }
        crossBase += crossSign * (lineCrossSize + step);
    });

    console.log(items);
}

module.exports = layout;