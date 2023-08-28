
let buttons = document.getElementsByClassName("num_button")
let buffer = document.getElementById("buffer")
let result = document.getElementById("result")

function changeRes(elem) {
    if (result.innerText.length < 13) {
        result.innerText = result.innerText == '0' ? elem.target.innerText 
            : result.innerText + elem.target.innerText
    }
}

console.log(buttons)

for (num_button of buttons) {
    num_button.addEventListener("click", changeRes)
}

document.getElementById("ce_button").addEventListener("click", e => {
    result.innerText = '0'
})

document.getElementById("c_button").addEventListener("click", e => {
    result.innerText = '0'
    buffer.innerText = '0'
})
