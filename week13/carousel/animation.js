const TICK = Symbol("tick");
const TICK_HANDLER = Symbol("tick-handler");

export class Timeline {
    constructor(){
        this[TICK] = ()=>{
            console.log("tick")
            requestAnimationFrame(this[TICK])
        }
    }
    start(){
        this[TICK]();
    }
    /**速率 */
    set rate(){

    }
    get rate(){

    }
    pause(){

    }
    resume(){

    }
    reset(){

    }
}

let tick = ()=>{
    let handle = requestAnimationFrame(tick )
    cancelAnimationFrame(handle)
}