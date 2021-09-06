const registerValidate = (username, email, password, confirmPassword) => {
    const errors = {}

    if (username.trim() === '') {
        errors.username = 'Username is empty!'
    }

    const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (email.trim() === '') {
        errors.email = 'Email is empty!'
    } else if (!email.match(emailRegEx)) {
        errors.email = 'Email format is wrong!'
    }

    if (password === '') {
        errors.password = 'Password is empty!'
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords are not same!'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

const loginValidate = (username, password) => {
    const errors = {}

    if (username.trim() === '') {
        errors.username = 'Username is empty!'
    }

    if (password === '') {
        errors.password = 'Password is empty!'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports = {
    registerValidate,
    loginValidate
}