import { Carousel } from './carousel'

let b = [
    'https://picsum.photos/id/231/700/500',
    'https://picsum.photos/id/232/700/500',
    'https://picsum.photos/id/233/700/500',
    'https://picsum.photos/id/234/700/500',
    'https://picsum.photos/id/235/700/500',
]

let a = <Carousel src={b}/>

a.mountTo(document.body);