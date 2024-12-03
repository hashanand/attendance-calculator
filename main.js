document.getElementById('attendanceForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Input values collect kar rhe.
    const totalClasses = parseInt(document.getElementById('totalClasses').value);
    const classesAttended = parseInt(document.getElementById('classesAttended').value);
    const requiredPercentage = parseFloat(document.getElementById('requiredPercentage').value);

    // Input check kar rhe hai kahi koi hoshiyari toh nhi dikha rha 
    if (classesAttended > totalClasses) {
        alert('Attended classes cannot exceed total classes!');
        return;
    }

    //⚠️ Yha main calculation chal rhi hai dhyan se

    const currentAttendancePercentage = (classesAttended / totalClasses) * 100;
    const requiredClassesNeeded = (requiredPercentage * totalClasses - 100 * classesAttended) / (100 - requiredPercentage);
    const maxBunkClasses = Math.floor(((100 * classesAttended) - (requiredPercentage * totalClasses)) / requiredPercentage);

    // Bas yhi tk thi main calculation baki faltu ki chijein hai 

    // Result ki taiyaari chal rhi hai
    const resultSection = document.getElementById('resultSection');
    const calculationDetails = document.getElementById('calculationDetails');
    const resultText = document.getElementById('resultText');
    const bunkDetails = document.getElementById('bunkDetails');
    const progressValue = document.querySelector('.progress-value');
    const circularProgress = document.querySelector('.circular-progress');
    const calculationSteps = document.getElementById('calculationSteps');

    resultSection.classList.remove('d-none');
    calculationDetails.classList.remove('d-none');

    // attendence ProgressBar ka Animation 
    let progressStartValue = 0;
    const progressEndValue = Math.round(currentAttendancePercentage);

    const progress = setInterval(() => {
        progressStartValue++;
        progressValue.textContent = `${currentAttendancePercentage.toFixed(2)}%`;
        circularProgress.style.background = `conic-gradient(#4070f4 ${progressEndValue == 0 ? 0 : progressStartValue * 3.6}deg, #e0e0e0 0deg)`;
        if (progressStartValue === progressEndValue || progressEndValue == 0) {
            clearInterval(progress);
        }
    }, 20);

    // Yeh rha aapka result
    if (currentAttendancePercentage >= requiredPercentage) {
        resultText.innerHTML = `<i class="fas fa-check-circle text-success me-2"></i>Bahut Badhiya 👏`;
        bunkDetails.innerHTML = `Tension free ho jao bro abhi tum <span class="fw-bold">${maxBunkClasses} classes</span> bunk krte ho toh bhi koi dikkat nhi hai 🤠`;
    } else {
        resultText.innerHTML = `<i class="fas fa-info-circle text-warning me-2"></i>Abhi ${requiredClassesNeeded} classes aur leni padegi tb jake ${requiredPercentage}% hogi 🤕`;
        bunkDetails.innerHTML = `Naa bhai is situation me toh bunk ka sochna bhi mat 🤧`;
    }


    // Yeh rhi saari calculation (MathML hai ji)
    let ClassesNeeded = "";
    let ClassesCanBunk = "";

    if (currentAttendancePercentage.toFixed(2) >= requiredPercentage) {
        ClassesCanBunk = `<p class="mt-2">Detailed Calculation:</p><math xmlns="http://www.w3.org/1998/Math/MathML"><mfrac><mrow><mo>(</mo><mn>100</mn><mo>&#xd7;</mo><mi>${classesAttended}</mi><mo>)</mo><mo>-</mo><mo>(</mo><mi>${requiredPercentage}</mi><mo>&#xd7;</mo><mi>${totalClasses}</mi><mo>)</mo></mrow><mrow><mi>${requiredPercentage}</mi></mrow></mfrac><mo>=</mo><mn> ${maxBunkClasses}</mn></math>`;
    }
    else {
        ClassesNeeded = `<p class="mt-2">Detailed Calculation:</p><math xmlns="http://www.w3.org/1998/Math/MathML"><mfrac><mrow><mo>(</mo><mi>${requiredPercentage}</mi><mo>&#xd7;</mo><mi>${totalClasses}</mi><mo>)</mo><mo>-</mo><mo>(</mo><mn>100</mn><mo>&#xd7;</mo><mi>${classesAttended}</mi><mo>)</mo></mrow><mrow><mn>100</mn><mo>-</mo><mi>${requiredPercentage}</mi></mrow></mfrac><mo>=</mo><mn> ${requiredClassesNeeded}</mn></math>`;
    }
    calculationSteps.innerHTML = `
    <div class="row">
    <div class="col-md-6 mb-3">
    <div class="calculation-card">
    <h5 class="mb-3">Attendance Percentage</h5>
    <p>Calculation Formula:</p>
    <math xmlns="http://www.w3.org/1998/Math/MathML"><mfrac><mrow><mi>Attended Classes</mi></mrow><mrow><mi>Total Classes</mi></mrow></mfrac><mo>×</mo><mn>100</mn></math>
    <p class="mt-2">Detailed Calculation:</p>
    <math xmlns="http://www.w3.org/1998/Math/MathML"><mfrac><mn>${classesAttended}</mn><mn>${totalClasses}</mn></mfrac><mo>×</mo><mn>100</mn><mo>=</mo><mn>${currentAttendancePercentage.toFixed(2)}</mn><mi>%</mi></math>
    </div>
    </div>
    <div class="col-md-6 mb-3">
    <div class="calculation-card">
    <h5 class="mb-3">Kitni classes aur leni hai ?</h5>
    <p>Calculation Formula:</p>
    <math xmlns="http://www.w3.org/1998/Math/MathML"><mfrac><mrow><mo>(</mo><mi>RequiredPercentage</mi><mo>&#xd7;</mo><mi>TotalClasses</mi><mo>)</mo><mo>-</mo><mo>(</mo><mn>100</mn><mo>&#xd7;</mo><mi>ClassesAttended</mi><mo>)</mo></mrow><mrow><mn>100</mn><mo>-</mo><mi>RequiredPercentage</mi></mrow></mfrac></math>
    ${ClassesNeeded}
    </div>
    </div>
    <div class="col-12">
    <div class="calculation-card">
    <h5 class="mb-3">Kitni Classes aur bunk kar sakte hai ?</h5>
    <p>Calculation Formula:</p>
    <math xmlns="http://www.w3.org/1998/Math/MathML"><mfrac><mrow><mo>(</mo><mn>100</mn><mo>&#xd7;</mo><mi>ClassesAttended</mi><mo>)</mo><mo>-</mo><mo>(</mo><mi>RequiredPercentage</mi><mo>&#xd7;</mo><mi>TotalClasses</mi><mo>)</mo></mrow><mrow><mi>RequiredPercentage</mi></mrow></mfrac></math>
    ${ClassesCanBunk}
    </div>
    </div>
    </div>
    `;
});


// Yeh ab yha se utha ke html me daal diya jaayega JS ki sahayata se

// https://github.com/hashanand/
// https://hashanand.github.io/