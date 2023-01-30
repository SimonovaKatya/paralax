const scene = document.getElementById('mountains')
const layers = scene.children
const depth = [0.2, 0.4, 0.6, 0.6, 0.8, 1] 

let windowWidht = null
let windowHeight = null
let windowCenterX = null
let windowCenterY = null

let inputX = 0
let inputY = 0
let scrollY = window.scrollY
let offSetX = 0
let offSetY = 0

updateDimensions()
startAnimation()

function updateDimensions(){
    windowWidht = window.innerWidth
    windowHeight = window.innerHeight
    windowCenterX = windowWidht / 2
    windowCenterY = windowHeight / 2
}

function startAnimation(){
    window.addEventListener('resize', updateDimensions)
    scene.addEventListener('mousemove', onMouseMove)
    window.addEventListener('scroll', onScroll)
    window.requestAnimationFrame(onAnimationFrame)
}

function onMouseMove(event){
    const clientX = event.clientX
    const clientY = event.clientY

    if(windowCenterX && windowCenterY){
        inputX = (clientX - windowCenterX) / windowCenterX
        inputY = (clientY - windowCenterY) / windowCenterY
    }
}

function onScroll(event) {
    inputY = window.scrollY / windowCenterY * 1.5
}

function onAnimationFrame(){
    const positionX = inputX * windowWidht / 10
    const positionY = inputY * windowHeight / 10 + window.scrollY / windowCenterY * 1.5

    offSetX += (positionX - offSetX) * 0.1
    offSetY += (positionY - offSetY) * 0.1

    for(let i = 0; i < layers.length; i++){
        const layer = layers[i]
        const layerDepth = depth[i] || 0.2
        const xOffset = offSetX * layerDepth * -1
        const yOffset = offSetY * layerDepth * -1

        setPosition(layer, xOffset, yOffset)
    }

    window.requestAnimationFrame(onAnimationFrame)
}

function setPosition(element, x, y){
    element.style.transform = 'translate3d(' + x.toFixed(1) + 'px,'+ y.toFixed(1)+'px,0)'
}