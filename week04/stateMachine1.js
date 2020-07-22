/**状态机 */
/**递归调用？ */
function match(string) {
    let state = start;
    for (let c of string) {
        state = state(c);
    }
    return state === end;
}

function start(c) {
    if (c === 'a') {
        return foundB;
    } else {
        return start;
    }
}

function end(c) {
    return end
}

function foundB(c) {
    if (c === 'b') {
        return foundC;
    } else {
        return start(c);
    }
}

function foundC(c) {
    if (c === 'c') {
        return foundD;
    } else {
        return start(c);
    }
}

function foundD(c) {
    if (c === 'd') {
        return foundE;
    } else {
        return start(c);
    }
}

function foundE(c) {
    if (c === 'e') {
        return foundF;
    } else {
        return start(c);
    }
}

function foundF(c) {
    if (c === 'f') {
        return end;
    } else {
        return start(c);
    }
}

console.log(match('fasfabcdefgfhdk'));