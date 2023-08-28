
let buttons = document.getElementsByClassName("num_button")
let buffer = document.getElementById("buffer")
let result = document.getElementById("result")

function changeRes(elem) {
    if (result.innerText.length < 13) {
        result.innerText = result.innerText == '0' ? elem.target.innerText 
            : result.innerText + elem.target.innerText
    }
}

for (num_button of buttons) {
    num_button.addEventListener("click", changeRes)
}

document.getElementById("dot_button").addEventListener("click", e => {
    if (result.innerText.length < 13 && !result.innerText.includes('.')) {
        result.innerText = result.innerText + '.'
    }
})

document.getElementById("sign_button").addEventListener("click", e => {
    if (result.innerText.includes('-')) {
        result.innerText = result.innerText.substring(1, result.innerText.length)
    } else {
        result.innerText = '-' + result.innerText
    }
})

document.getElementById("ce_button").addEventListener("click", e => {
    result.innerText = '0'
})

document.getElementById("c_button").addEventListener("click", e => {
    result.innerText = '0'
    buffer.innerText = '0'
})

document.getElementById("backspace_button").addEventListener("click", e => {
    result.innerText = result.innerText.length == 1 ?
     '0' : result.innerText.substring(0, result.innerText.length - 1)
})

document.getElementById("plus_button").addEventListener("click", () => {

})