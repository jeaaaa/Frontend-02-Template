function match(string){
    let state = start;
    for( let c of string ){
        state = state(c);
    }
    return state === end;
}