// anti-ddos.js

// Fonction pour détecter si la requête provient d'un robot
function isBot(userAgent, headers) {
    const botRegex = /bot|curl|wget|slurp|spider|google|bing|yahoo|duckduckgo|facebook|twitter|semrush|ahrefs|yandex|baidu|sogou|exabot|mj12bot|dotbot|seokicks|netcraft|archive|webmeup|uptime|monitor|check|crawler|spider|grabber|harvest|scrape|scan|grab|fetch/i;
    const isBotUserAgent = botRegex.test(userAgent);
    const isBotHeaders = headers['Accept'] === '*/*' || headers['Accept-Encoding'] === 'gzip, deflate, br';
    return isBotUserAgent || isBotHeaders;
}

// Vérifier si l'utilisateur est un robot
if (isBot(navigator.userAgent, navigator.headers)) {
    alert("Vous êtes identifié comme un robot. Accès refusé.");
    window.location.href = "https://votresite.com/access-denied";
}

// Fonction pour vérifier l'abonnement
let subscriptionChecked = false;

async function checkSubscription() {
    if (subscriptionChecked) return;

    const siteUrl = window.location.href;
    const response = await fetch('sites.json');
    const sites = await response.json();

    const site = sites.find(s => siteUrl.includes(s.url));

    if (!site) {
        displaySubscriptionError("Ce site n'est pas autorisé.");
        return;
    }

    const now = new Date();
    const subscriptionEnd = new Date(site.subscriptionEnd);

    if (now > subscriptionEnd) {
        displaySubscriptionError("Votre abonnement a expiré.");
    }

    subscriptionChecked = true;
}

// Afficher un message d'erreur d'abonnement
function displaySubscriptionError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2em;
        z-index: 1000;
    `;
    errorDiv.innerHTML = `${message}<br>Si vous venez de payer votre abonnement, veuillez patienter 24 heures.`;
    document.body.appendChild(errorDiv);
}

// Vérifier les formulaires pour s'assurer que l'utilisateur est humain
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        const humanCheck = document.createElement('div');
        humanCheck.style.cssText = `
            border: 1px solid #ccc;
            padding: 10px;
            margin-bottom: 10px;
        `;
        humanCheck.innerHTML = `
            <input type="checkbox" id="humanCheck" required>
            <label for="humanCheck">${getLocalizedText('humanCheckLabel')}</label>
        `;
        form.insertBefore(humanCheck, form.firstChild);

        form.addEventListener('submit', function(event) {
            if (!document.getElementById('humanCheck').checked) {
                event.preventDefault();
                alert(getLocalizedText('humanCheckAlert'));
            }
        });

        // Ajouter une vérification de la vitesse de frappe
        const inputs = form.querySelectorAll('input[type="text"], input[type="password"]');
        inputs.forEach(input => {
            let startTime, endTime;
            input.addEventListener('focus', () => {
                startTime = new Date();
            });
            input.addEventListener('blur', () => {
                endTime = new Date();
                const typingSpeed = (endTime - startTime) / input.value.length;
                if (typingSpeed < 50) { // Ajustez cette valeur selon vos besoins
                    alert(getLocalizedText('typingSpeedAlert'));
                    event.preventDefault();
                }
            });
        });

        // Demander à nouveau de vérifier après 35 secondes
        setTimeout(() => {
            document.getElementById('humanCheck').checked = false;
            alert(getLocalizedText('recheckAlert'));
        }, 35000);
    });
});

// Fonction pour distordre le texte
function distortText(text) {
    return text.split('').map(char => {
        return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
    }).join('');
}

// Afficher la vérification humaine
function displayHumanVerification() {
    const verificationDiv = document.createElement('div');
    verificationDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2em;
        z-index: 1000;
    `;

    const originalText = getLocalizedText('verificationText');
    const distortedText = distortText(originalText);

    verificationDiv.innerHTML = `
        <p>${getLocalizedText('verificationPrompt')}</p>
        <p>${distortedText}</p>
        <input type="text" id="verificationInput" style="font-size: 1em;">
        <button onclick="verifyHumanInput('${originalText}')">${getLocalizedText('verifyButton')}</button>
    `;

    document.body.appendChild(verificationDiv);
}

// Vérifier l'entrée de l'utilisateur
function verifyHumanInput(originalText) {
    const input = document.getElementById('verificationInput').value;
    if (input === originalText) {
        document.querySelector('.verification-overlay').remove();
        document.body.style.overflow = 'auto'; // Rétablir le défilement
    } else {
        alert(getLocalizedText('verificationError'));
    }
}

// Bloquer l'accès au site jusqu'à ce que la vérification soit passée
document.body.style.overflow = 'hidden'; // Empêcher le défilement

// Vérifier l'abonnement au chargement de la page
checkSubscription();

// Afficher la vérification humaine au chargement de la page
displayHumanVerification();

// Fonction pour obtenir le texte localisé
function getLocalizedText(key) {
    const translations = {
        'humanCheckLabel': {
            'fr': 'Je suis un humain',
            'en': 'I am human',
            'es': 'Soy humano'
        },
        'humanCheckAlert': {
            'fr': 'Veuillez confirmer que vous êtes un humain.',
            'en': 'Please confirm that you are human.',
            'es': 'Por favor, confirme que es humano.'
        },
        'typingSpeedAlert': {
            'fr': 'Vous tapez trop vite. Veuillez réessayer.',
            'en': 'You are typing too fast. Please try again.',
            'es': 'Estás escribiendo demasiado rápido. Por favor, inténtalo de nuevo.'
        },
        'recheckAlert': {
            'fr': 'Veuillez vérifier à nouveau.',
            'en': 'Please check again.',
            'es': 'Por favor, verifique nuevamente.'
        },
        'verificationText': {
            'fr': 'Vérifiez que vous êtes humain',
            'en': 'Verify that you are human',
            'es': 'Verifica que eres humano'
        },
        'verificationPrompt': {
            'fr': 'Veuillez écrire le texte suivant :',
            'en': 'Please write the following text:',
            'es': 'Por favor, escriba el siguiente texto:'
        },
        'verifyButton': {
            'fr': 'Vérifier',
            'en': 'Verify',
            'es': 'Verificar'
        },
        'verificationError': {
            'fr': 'Texte incorrect. Veuillez réessayer.',
            'en': 'Incorrect text. Please try again.',
            'es': 'Texto incorrecto. Por favor, inténtalo de nuevo.'
        }
    };

    const language = navigator.language.split('-')[0];
    return translations[key][language] || translations[key]['en'];
          }
