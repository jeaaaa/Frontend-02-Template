import { Component, STATE, ATTRIBUTE } from './framework.js'
import { enableGesture } from './gesture.js'
import { Timeline, Animation } from './animation.js'; 
import { ease } from './ease.js'

export { STATE, ATTRIBUTE} from "./framework.js"

export class Carousel extends Component {
    constructor(){
        super();
    }
    render(){
        this.root = document.createElement("div");
        this.root.classList.add("carousel")
        for (let image of this[ATTRIBUTE].src) {
            let child = document.createElement("div");
            child.style.backgroundImage = `url('${image}')`;
            this.root.appendChild(child);
        }

        enableGesture(this.root);

        let timeline = new Timeline;
        timeline.start();

        let handler = null;

        let children = this.root.children;

        this[STATE].position = 0;

        let t = 0;
        let ax = 0; //动画产生的位移

        this.root.addEventListener("start", event=>{
            timeline.pause();
            clearInterval(handler);
            if(Date.now() - t < 1500){
                let progress = (Date.now() - t)/1500;
                ax = ease(progress) * 700 - 700;
            }else{
               ax = 0;
            }
        })

        this.root.addEventListener("tap", event=>{
            this.triggerEvent("click", {
                data: this[ATTRIBUTE].src[this[STATE].position],
                position: this[STATE].position
            })
        })

        this.root.addEventListener("pan", event=>{
            let x = event.clientX - event.startX - ax;

            let current = this[STATE].position - ((x-x%700)/700);

            for (let offset of [-1, 0, 1]) {    //图片当前屏幕元素的中心
                let pos = current + offset;
                pos = (pos % children.length + children.length )% children.length;  //让-1变成3

                children[pos].style.transition = "none";
                children[pos].style.transform = `translateX(${-pos*700 + offset*700 + x % 700}px)`;
            }
        })

        this.root.addEventListener("end", event=>{
            timeline.reset();
            timeline.start();
            handler = setInterval(nextPicture, 3000)

            let x = event.clientX - event.startX - ax;
            let current = this[STATE].position - ((x-x%700)/700);

            let direction = Math.round((x%700)/700)
            
            if( event.isFlick ){
                if( event.velocity < 0){
                    direction = Math.ceil((x%700)/700)
                }else{
                    direction = Math.floor((x%700)/700)
                }
            }

            for (let offset of [-1, 0, 1]) {    //图片当前屏幕元素的中心
                let pos = current + offset;
                pos = (pos % children.length + children.length )% children.length;  //让-1变成3

                children[pos].style.transition = "none";
                timeline.add(new Animation(children[pos].style, "transform", 
                - 100 * pos + offset * 100 + x % 100, 
                - 100 * pos + offset * 100 + direction * 100, 
                700, 0, ease, v=>`translateX(${v}%)` ))
            }

            this[STATE].position = this[STATE].position - ((x-x%700)/700) - direction;
            this[STATE].position = (this[STATE].position % children.length + children.length )% children.length;
        
            this.triggerEvent("change", {position: this[STATE].position})
        })
        
        // this.root.addEventListener("mousedown", event =>{
        //     let children = this.root.children;
        //     let startX = event.clientX;

        //     let move = event => {
        //         let x = event.clientX-startX;

        //         let current = position - ((x-x%700)/700);

        //         for (let offset of [-2 ,-1, 0, 1, 2]) {    //图片当前屏幕元素的中心
        //             let pos = current + offset;
        //             pos = (pos + children.length )% children.length;  //让-1变成3

        //             children[pos].style.transition = "none";
        //             children[pos].style.transform = `translateX(${-pos*700 + offset*700 + x % 700}px)`
        //         }
        //     }
        //     let up = event => {
        //         let x = event.clientX-startX;
        //         position = position - Math.round(x/700);
        //         for (let offset of [0, -Math.sign(Math.round(x/700)-x + 350*Math.sign(x))]) {    //图片当前屏幕元素的中心
        //             let pos = position + offset;
        //             pos = (pos + children.length )% children.length;  //让-1变成3

        //             children[pos].style.transition = "";
        //             children[pos].style.transform = `translateX(${-pos*700 + offset*700}px)`
        //         }
        //         document.removeEventListener("mousemove", move);
        //         document.removeEventListener("mouseup", up);
        //     }

        //     document.addEventListener("mousemove", move);

        //     document.addEventListener("mouseup", up);
        // })

        let nextPicture = ()=>{
            // let children = this.root.children;
            let nextIndex = (this[STATE].position+1)%children.length; //取余，永远不会比除数大

            let current = children[this[STATE].position];
            let next = children[nextIndex];

            t = Date.now();

            timeline.add(new Animation(current.style, "transform", 
            -100 * this[STATE].position, - 100 - 100 * this[STATE].position, 700, 0, ease, v=>`translateX(${v}%)` ))

            timeline.add(new Animation(next.style, "transform", 
            100- 100 * nextIndex, - 100 * nextIndex, 700, 0, ease, v=>`translateX(${v}%)` ))
            
            
            this[STATE].position = nextIndex;
            this.triggerEvent("change", {position: this[STATE].position})
        }

        handler = setInterval(nextPicture, 3000)

        return this.root;
    }
}