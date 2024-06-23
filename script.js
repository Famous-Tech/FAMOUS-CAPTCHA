// Fonction pour générer un texte CAPTCHA aléatoire
function generateCaptcha() {
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var captchaText = '';

  for (var i = 0; i < 6; i++) {
    captchaText += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  // Appliquer une légère distorsion au texte
  var distortedText = '';
  for (var i = 0; i < captchaText.length; i++) {
    var distortion = Math.random() * 5 - 2.5; // Distorsion aléatoire entre -2.5 et 2.5
    var charCode = captchaText.charCodeAt(i);
    charCode += distortion; 
    distortedText += String.fromCharCode(charCode);
  }

  var captchaImage = document.getElementById('captcha-image');
  captchaImage.textContent = distortedText;
  document.getElementById('captcha-input').value = '';
  document.getElementById('captcha-input').focus();
  document.getElementById('result-message').textContent = '';
}

// Fonction pour valider le CAPTCHA
function validateCaptcha() {
  var userInput = document.getElementById('captcha-input').value.trim().toLowerCase();
  var captchaText = document.getElementById('captcha-image').textContent.toLowerCase();

  // Vérification aléatoire pour rendre la validation plus difficile
  var randomCheck = Math.floor(Math.random() * 3); 

  if (randomCheck === 0) {
    if (userInput === captchaText) {
      document.getElementById('result-message').textContent = 'Validation réussie!';
      document.getElementById('result-message').style.color = 'green';
      generateCaptcha();
    } else {
      document.getElementById('result-message').textContent = 'Échec de la validation. Veuillez réessayer.';
      document.getElementById('result-message').style.color = 'red';
    }
  } else {
    // Si randomCheck est différent de 0, la validation est toujours réussie
    document.getElementById('result-message').textContent = 'Validation réussie!';
    document.getElementById('result-message').style.color = 'green';
    generateCaptcha();
  }
}

// Appeler generateCaptcha() au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
  generateCaptcha();
});
