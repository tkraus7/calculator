
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
    if (finished) {
        return
    }
    if (result.innerText.length < 13 && !result.innerText.includes('.')) {
        result.innerText = result.innerText + '.'
    }
})

document.getElementById("sign_button").addEventListener("click", e => {
    if (finished) {
        return
    }
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
    finished = false
    overwrite = false
})

document.getElementById("c_button").addEventListener("click", e => {
    result.innerText = '0'
    buffer.innerText = '0'
    operand = 0
    last_op = ''
    finished = false
    overwrite = false
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
    finished = false
    let res = calculate(last_op, operand, Number(result.innerText))
    buffer.innerText = res + ' + '
    operand = res
    last_op = 'plus'
})

document.getElementById("minus_button").addEventListener("click", () => {
    overwrite = true
    finished = false
    let res = calculate(last_op, operand, Number(result.innerText))
    buffer.innerText = res + ' - '
    operand = res
    last_op = 'minus'
})

document.getElementById('times_button').addEventListener('click', () => {

})


function calculate(op, buf, res) {
    let temp = 0
    switch (op) {
        case 'plus':
            temp = buf + res
            break
        case 'minus':
            temp = buf - res
            break
        case 'times':
            temp = buf * res
            break
        case 'div':
            temp = buf / res
            break
        default:
            temp = res
            break
    }
    return Number(temp.toFixed(2))
}

document.getElementById("equals_button").addEventListener("click", () => {
    if (!finished) {
        let res = calculate(last_op, operand, Number(result.innerText))
        if (buffer.innerText == '0') {
            buffer.innerText = result.innerText + ' = '
        } else if (Number(result.innerText) >= 0) {
            buffer.innerText =  buffer.innerText + ' ' + Number(result.innerText) + ' = '
        } else {
            buffer.innerText =  buffer.innerText + ' (' + Number(result.innerText) + ') = '
        }
        result.innerText = res
        operand = 0
        overwrite = true
        finished = true
        last_op = ''
    }
})