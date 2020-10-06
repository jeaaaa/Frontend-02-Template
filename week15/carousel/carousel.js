import { Component } from './framework.js'
import { enableGesture } from './gesture.js'
import { Timeline, Animation } from './animation.js'; 
import { ease } from './ease.js'

export class Carousel extends Component {
    constructor(){
        super();
        this.attributes = Object.create(null);
    }
    setAttribute(name, value){
        this.attributes[name] = value;
    }
    render(){
        console.log(this.attributes.src)
        this.root = document.createElement("div");
        this.root.classList.add("carousel")
        for (let image of this.attributes.src) {
            let child = document.createElement("div");
            child.style.backgroundImage = `url('${image}')`;
            this.root.appendChild(child);
        }

        let children = this.root.children;

        let position = 0;
        
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


        // let currentIndex = 0;
        // setInterval(()=>{
        //     let children = this.root.children;
        //     let nextIndex = (currentIndex+1)%children.length; //取余，永远不会比除数大

        //     let current = children[currentIndex];
        //     let next = children[nextIndex];

        //     next.style.transition = "none";
        //     next.style.transform = `translateX(${100 - nextIndex*100}%)`;

        //     setTimeout(()=>{
        //         next.style.transition = "";
        //         current.style.transform = `translateX(${-100 - currentIndex*100}%)`;
        //         next.style.transform = `translateX(${ - nextIndex*100}%)`;

        //         currentIndex = nextIndex;
        //     },16)
        // }, 1500)
        return this.root;
    }
    mountTo(parent){
        parent.appendChild(this.render())
    }
}