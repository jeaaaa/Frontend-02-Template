import { Carousel } from './Carousel.js'
import { createElement } from './framework.js'
import { Timeline, Animation} from "./animation"
import { Button } from './Button.js'
import { List } from './List.js'

let b = [
    'https://picsum.photos/id/231/700/500',
    'https://picsum.photos/id/232/700/500',
    'https://picsum.photos/id/233/700/500',
    'https://picsum.photos/id/234/700/500',
    'https://picsum.photos/id/235/700/500',
]

let d = [
    {
        img: 'https://picsum.photos/id/231/700/500',
        title: '欧卡',
        url: 'https://www.google.com'
    },
    {
        img: 'https://picsum.photos/id/232/700/500',
        title: '还有',
        url: 'https://www.google.com'
    },
    {
        img: 'https://picsum.photos/id/233/700/500',
        title: '空空',
        url: 'https://www.google.com'
    },
    {
        img: 'https://picsum.photos/id/234/700/500',
        title: '成都',
        url: 'https://www.google.com'
    },
    {
        img: 'https://picsum.photos/id/235/700/500',
        title: '射雕',
        url: 'https://www.google.com'
    }
]

// let a = <Carousel src={b} 
//     onChange = {event => console.log(event.detail.position)}
//     onClick = {event => window.location.href = event.detail.data}
//     />

// a.mountTo(document.body);

// let f = <Button>
//     content
// </Button>

// f.mountTo(document.body);

let l = <List data={d}>
    {(record)=>{
        <div>
            <img src={record.img}/>
            <a href={record.url}>{record.title}</a>
        </div>
    }}
</List>

l.mountTo(document.body)
