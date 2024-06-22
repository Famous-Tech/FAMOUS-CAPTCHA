function generateCaptcha() {
    var captchaText = generateRandomText();
    var captchaImage = document.getElementById('captcha-image');
    captchaImage.textContent = captchaText;
    document.getElementById('captcha-input').value = '';
    document.getElementById('captcha-input').focus();
    document.getElementById('result-message').textContent = '';
}

function validateCaptcha() {
    var userInput = document.getElementById('captcha-input').value.trim().toLowerCase();
    var captchaText = document.getElementById('captcha-image').textContent.toLowerCase();

    if (userInput === captchaText) {
        document.getElementById('result-message').textContent = 'Validation réussie!';
        document.getElementById('result-message').style.color = 'green';
        generateCaptcha();
    } else {
        document.getElementById('result-message').textContent = 'Échec de la validation. Veuillez réessayer.';
        document.getElementById('result-message').style.color = 'red';
    }
}

function generateRandomText() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var captchaText = '';

    for (var i = 0; i < 6; i++) {
        captchaText += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return captchaText;
}

document.addEventListener('DOMContentLoaded', function() {
    generateCaptcha();
});
