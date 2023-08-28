
let buttons = document.getElementsByClassName("num_button")
let buffer = document.getElementById("buffer")
let result = document.getElementById("result")

let overwrite = false
let finished = false
let last_op = ''
let operand = 0

function changeRes(elem) {
    if (overwrite) {
        overwrite = false
        result.innerText = elem.target.innerText
        if (finished) {
            finished = false
            buffer.innerText = '0'
        }
    }
    else if (result.innerText.length < 13) {
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
    } else if (result.innerText != '0'){
        result.innerText = '-' + result.innerText
    }
})

document.getElementById("ce_button").addEventListener("click", e => {
    result.innerText = '0'
    if (finished) {
        buffer.innerText = '0'
    }
})

document.getElementById("c_button").addEventListener("click", e => {
    result.innerText = '0'
    buffer.innerText = '0'
    operand = 0
    last_op = ''
})

document.getElementById("backspace_button").addEventListener("click", e => {
    if (finished) {
        return
    }
    if (result.innerText.length == 1 || (result.innerText.length == 2 && result.innerText.charAt(0) == '-')) {
        result.innerText = '0'
    } else {
        result.innerText = result.innerText.substring(0, result.innerText.length - 1)
    }
})

document.getElementById("plus_button").addEventListener("click", () => {
    overwrite = true
    let res = calculate(last_op, operand, Number(result.innerText))
    buffer.innerText = res + ' + '
    operand = res
    last_op = 'plus'
})

document.getElementById('minus_button').addEventListener("click", () => {
    overwrite = true
    let res = calculate(last_op, operand, Number(result.innerText))
    buffer.innerText = res + ' + '
    operand = res
    last_op = 'plus'
})


function calculate(op, buf, res) {
    switch (op) {
        case 'plus':
            return buf + res
        case 'minus':
            return buf - res
        case 'times':
            return buf * res
        case 'div':
            return buf / res
        default:
            return res
    }
}

document.getElementById("equals_button").addEventListener("click", () => {
    if (!finished) {
        let res = calculate(last_op, operand, Number(result.innerText))
        buffer.innerText = buffer.innerText == '0' ?  result.innerText + ' = '
         : buffer.innerText + ' ' + result.innerText + ' = '
        result.innerText = res
        operand = 0
        overwrite = true
        finished = true
    }
})