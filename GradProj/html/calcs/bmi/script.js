function calculateBMI() {
    // Get input values
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;

    // Validate inputs
    if (weight <= 0 || height <= 0) {
        alert("Please enter valid positive numbers for weight and height.");
        return;
    }

    // Convert height from cm to meters
    const heightInMeters = height / 100;

    // Calculate BMI
    const bmi = weight / (heightInMeters * heightInMeters);

    // Display result
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = `Your BMI is ${bmi.toFixed(2)}`;

    // Determine BMI category and advice
    let category = "";
    let advice = "";
    if (bmi < 18.5) {
        category = "Underweight";
    } else if (bmi < 24.9) {
        category = "Normal weight";
    } else if (bmi < 29.9) {
        category = "Overweight";
        const targetWeight = 24.9 * (heightInMeters * heightInMeters);
        const weightToLose = weight - targetWeight;
        advice = `You need to lose ${weightToLose.toFixed(2)} kg to reach a normal weight.`;
    } else {
        category = "Obesity";
        const targetWeight = 24.9 * (heightInMeters * heightInMeters);
        const weightToLose = weight - targetWeight;
        advice = `You need to lose ${weightToLose.toFixed(2)} kg to reach a normal weight.`;
    }
    resultDiv.textContent += ` (${category})`;

    // Display advice
    const adviceDiv = document.getElementById('advice');
    adviceDiv.textContent = advice;
}
