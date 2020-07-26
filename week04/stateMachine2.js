function match(string){
    let state = start;
    for (const word of string) {
        state = state(word);
    }
    return state === end;
}

function end(word){
    return end;
}

function start(word){
    if( word == 'a' ){
        return foundB;
    }else{
        return start;
    }
}

function foundB(word){
    if( word == 'b' ){
        return foundA2;
    }else{
        return start(word);
    }
}

function foundA2(word){
    if( word == 'a' ){
        return foundB2;
    }else{
        return start(word);
    }
}

function foundB2(word){
    if( word ==  'b' ){
        return foundA3;
    }else{
        return start(word);
    }
}

function foundA3(word){
    if( word == 'a' ){
        return foundB3;
    }else{
        return start(word);
    }
}

function foundB3(word){
    if( word ==  'b' ){
        return foundX;
    }else{
        return start(word);
    }
}

function foundX(word){
    if( word == 'x' ){
        return end;
    }else{
        return start(word);
    }
}

console.log(match('dsaifabxababxfhjds'))