const wheel = document.getElementById('spinWheel');
const ctx = wheel.getContext('2d');
const spinButton = document.getElementById('spinButton');
const nameInput = document.getElementById('nameInput');
const addNameButton = document.getElementById('addName');
const resetWheelButton = document.getElementById('resetWheel');
const nameList = document.getElementById('nameList');
const contactForm = document.querySelector('form');

let names = [];
let colors = ['#ffcc00', '#00ccff', '#ff66cc', '#66ff66', '#cc66ff', '#ff6666', '#66ccff', '#ff9933'];

// وظيفة لإعادة رسم العجلة مع الأسماء المدخلة
function drawWheel() {
    const numSections = names.length;
    const arcSize = (2 * Math.PI) / numSections;

    ctx.clearRect(0, 0, wheel.width, wheel.height);
    
    names.forEach((name, index) => {
        // تلوين القسم
        const angleStart = index * arcSize;
        const angleEnd = angleStart + arcSize;
        ctx.beginPath();
        ctx.moveTo(250, 250);
        ctx.arc(250, 250, 200, angleStart, angleEnd);
        ctx.fillStyle = colors[index % colors.length];
        ctx.fill();
        ctx.stroke();

        // إضافة الاسم داخل القسم
        ctx.save();
        ctx.translate(250, 250);
        ctx.rotate(angleStart + arcSize / 2);
        ctx.textAlign = "center";
        ctx.fillStyle = "#000";
        ctx.font = "18px Arial";
        ctx.fillText(name, 120, 10); // تعديل المسافة حسب الحاجة
        ctx.restore();
    });
}

// تدوير العجلة
spinButton.addEventListener('click', function() {
    if (names.length === 0) return;
    
    let rotation = Math.floor(Math.random() * 360 + 360); // دوران عشوائي
    let finalRotation = rotation % 360; // الدوران النهائي بعد الحساب

    wheel.style.transition = "transform 4s ease-out";
    wheel.style.transform = `rotate(${rotation}deg)`;

    setTimeout(() => {
        wheel.style.transition = "";
        wheel.style.transform = `rotate(${finalRotation}deg)`; // إعادة ضبط الوضع بعد الدوران

        const winnerIndex = Math.floor((finalRotation / 360) * names.length) % names.length;
        const winner = names[winnerIndex];

        alert(`الفائز هو: ${winner}`);
        createConfetti();  // إنشاء تأثير القصاصات الملونة
    }, 4000);
});

// إضافة الاسم إلى العجلة
addNameButton.addEventListener('click', () => {
    const newName = nameInput.value.trim();
    if (newName !== "") {
        names.push(newName);
        nameInput.value = "";

        const listItem = document.createElement('li');
        listItem.textContent = newName;
        nameList.appendChild(listItem);

        drawWheel();
    }
});

// إعادة تعيين العجلة
resetWheelButton.addEventListener('click', () => {
    names = [];
    nameList.innerHTML = "";
    drawWheel();
});

// معالجة إرسال نموذج الاتصال
contactForm.addEventListener('submit', (event) => {
    event.preventDefault();  // منع الإرسال الافتراضي للنموذج
    alert("تم إرسال الرسالة بنجاح!");
    contactForm.reset();  // إعادة ضبط النموذج
});

// إنشاء تأثير القصاصات الملونة
function createConfetti() {
    const colors = ['#ffcc00', '#00ccff', '#ff66cc', '#66ff66', '#cc66ff', '#ff6666', '#66ccff', '#ff9933'];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.animationDuration = Math.random() * 2 + 1 + 's';
        confetti.style.opacity = Math.random();

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}