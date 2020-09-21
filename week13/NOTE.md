# 学习笔记

## 动画（animation）

```
setInterval(()=>{}, 16) //16帧间隔

let tick = () => {
    setTimeout(tick, 16)
}

let tick = () =>{
    requestAnimationFrame(tick)
}

```