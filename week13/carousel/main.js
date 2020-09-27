import { Carousel } from './carousel.js'
import { createElement } from './framework.js'
import { Timeline, Animation} from "./animation"

let b = [
    'https://picsum.photos/id/231/700/500',
    'https://picsum.photos/id/232/700/500',
    'https://picsum.photos/id/233/700/500',
    'https://picsum.photos/id/234/700/500',
    'https://picsum.photos/id/235/700/500',
]

let a = <Carousel src={b}/>
a.mountTo(document.body);

let tl = new Timeline();

tl.add(new Animation({set a(v){console.log(v)}}, "a", 0, 100, 1000, null))

tl.start()