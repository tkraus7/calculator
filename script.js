
let buttons = document.getElementsByClassName("num_button")
let buffer = document.getElementById("buffer")
let result = document.getElementById("result")

let overwrite = false
let finished = false
let last_op = ''
let operand = 0

function changeRes(text) {
    if (overwrite) {
        overwrite = false
        result.innerText = text
        if (finished) {
            finished = false
            buffer.innerText = '0'
        }
    }
    else if (result.innerText.length < 13) {
        result.innerText = result.innerText == '0' ? text : result.innerText + text
    }
}


for (num_button of buttons) {
    num_button.addEventListener("click", e => {
        changeRes(e.target.innerText)
    })
}


document.getElementById("sign_button").addEventListener("click", e => {
    if (finished) {
        return
    }
    if (result.innerText.includes('-')) {
        result.innerText = result.innerText.substring(1, result.innerText.length)
    } else if (result.innerText != '0') {
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

function dotHandler() {
    if (finished) {
        return
    }
    if (result.innerText.length < 13 && !result.innerText.includes('.')) {
        result.innerText = result.innerText + '.'
    }
}
document.getElementById("dot_button").addEventListener("click", dotHandler)

function backspaceHandler() {
    if (finished) {
        return
    }
    overwrite = false
    if (result.innerText.length == 1 || (result.innerText.length == 2 && result.innerText.charAt(0) == '-')) {
        result.innerText = '0'
    } else {
        result.innerText = result.innerText.substring(0, result.innerText.length - 1)
    }
}
document.getElementById("backspace_button").addEventListener("click", backspaceHandler)

function plusHandler() {
    if (overwrite && !finished) {
        buffer.innerText = buffer.innerText.substring(0, buffer.innerText.length - 2) + ' + '
        last_op = 'plus'
    } else {
        overwrite = true
        finished = false
        let res = calculate(last_op, operand, Number(result.innerText))
        buffer.innerText = res + ' + '
        operand = Number(res)
        last_op = 'plus'
    }
}
document.getElementById("plus_button").addEventListener("click", plusHandler)

function minusHandler() {
    if (overwrite && !finished) {
        buffer.innerText = buffer.innerText.substring(0, buffer.innerText.length - 2) + ' - '
        last_op = 'minus'
    } else {
        overwrite = true
        finished = false
        let res = calculate(last_op, operand, Number(result.innerText))
        buffer.innerText = res + ' - '
        operand = Number(res)
        last_op = 'minus'
    }
}
document.getElementById("minus_button").addEventListener("click", minusHandler)

function timesHandler() {
    if (overwrite && !finished) {
        buffer.innerText = buffer.innerText.substring(0, buffer.innerText.length - 2) + ' * '
        last_op = 'times'
    } else {
        overwrite = true
        finished = false
        let res = calculate(last_op, operand, Number(result.innerText))
        buffer.innerText = res + ' * '
        operand = Number(res)
        last_op = 'times'
    }
}
document.getElementById('times_button').addEventListener('click', timesHandler)

function divideHandler() {
    if (overwrite && !finished) {
        buffer.innerText = buffer.innerText.substring(0, buffer.innerText.length - 2) + ' / '
        last_op = 'div'
    } else {
        overwrite = true
        finished = false
        let res = calculate(last_op, operand, Number(result.innerText))
        buffer.innerText = res + ' / '
        operand = Number(res)
        last_op = 'div'
    }
}
document.getElementById("divide_button").addEventListener("click", divideHandler)

function parseNumber(num) {
    if (Math.abs(num) < 1 && num > 0) {
        return num.toFixed(12)
    } else if (Math.abs(num) < 10 ** 13) {
        return Number(num) == Number(num.toFixed(2)) ? num : num.toFixed(2)
    } else {
        return num.toPrecision(8)
    }
}

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
    return parseNumber(temp)
}

function equalsHandler() {
    if (!finished) {
        let res = calculate(last_op, operand, Number(result.innerText))
        if (buffer.innerText == '0') {
            buffer.innerText = result.innerText + ' = '
        } else if (Number(result.innerText) >= 0) {
            buffer.innerText = buffer.innerText + ' ' + Number(result.innerText) + ' = '
        } else {
            buffer.innerText = buffer.innerText + ' (' + Number(result.innerText) + ') = '
        }
        result.innerText = res
        operand = 0
        overwrite = true
        finished = true
        last_op = ''
    }
}
document.getElementById("equals_button").addEventListener("click", equalsHandler)

document.addEventListener('keydown', e => {
    document.activeElement.blur()
    if (Number(e.key) >= 0 && Number(e.key) <= 9) {
        changeRes(e.key)
    } else {
        switch (e.key) {
            case '+':
                plusHandler()
                break;
            case '-':
                minusHandler()
                break
            case '*':
                timesHandler()
                break
            case '/':
                divideHandler()
                break
            case '.':
                dotHandler()
                break
            case 'Backspace':
                backspaceHandler()
                break
            case 'Enter':
                equalsHandler()
                break
        }
    }
})

