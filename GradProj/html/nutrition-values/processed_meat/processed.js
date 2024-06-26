document.getElementById('nutrition-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const foodItem = document.getElementById('food-item').value;
    const quantity = parseFloat(document.getElementById('quantity').value);
    const measurement = document.getElementById('measurement').value;

    const nutritionData = {
        salami_pastrami_sausage_turkey: { fat: 10, protein: 15, calories: 200 },
        salami_pastrami_sausage_beef: { fat: 12, protein: 16, calories: 220 },
        pastrami_turkey_breast: { fat: 2, protein: 18, calories: 100 },
        pastrami_turkey_thigh: { fat: 5, protein: 20, calories: 150 },
        pastrami_turkey: { fat: 3, protein: 17, calories: 110 },
        pastrami_beef_fat_free: { fat: 1, protein: 22, calories: 90 },
        turkey_sausage_low_fat: { fat: 5, protein: 12, calories: 140 },
        lebanese_bologna_sausage_beef: { fat: 10, protein: 14, calories: 190 },
        blood_sausage: { fat: 15, protein: 10, calories: 250 },
        bologna_sausage_beef: { fat: 12, protein: 12, calories: 200 },
        beef_sausage_cooked: { fat: 14, protein: 14, calories: 220 },
        italian_sausage_sweet: { fat: 16, protein: 13, calories: 240 },
        italian_sausage_turkey_smoked: { fat: 7, protein: 19, calories: 180 },
        polish_sausage_beef_chicken_hot: { fat: 14, protein: 15, calories: 230 },
        turkey_breakfast_sausage_links: { fat: 5, protein: 12, calories: 140 },
        processed_beef_slices: { fat: 8, protein: 20, calories: 160 },
        processed_beef_dried: { fat: 10, protein: 18, calories: 200 },
        processed_beef_sausage_smoked: { fat: 12, protein: 16, calories: 220 },
        chicken_rolls_low_fat: { fat: 2, protein: 18, calories: 100 },
        turkey_rolls_light: { fat: 2, protein: 17, calories: 110 },
        turkey_rolls_light_dark: { fat: 4, protein: 16, calories: 120 },
        pate_truffle_flavored: { fat: 20, protein: 12, calories: 300 },
        pate_goose_liver_smoked: { fat: 18, protein: 14, calories: 280 },
        pate_chicken_liver: { fat: 15, protein: 16, calories: 260 },
        poultry_salad_spread: { fat: 10, protein: 10, calories: 180 },
        german_bratwurst_chicken: { fat: 8, protein: 15, calories: 180 },
        german_bratwurst_veal: { fat: 12, protein: 14, calories: 220 },
        frankfurter_chicken: { fat: 7, protein: 13, calories: 170 },
        frankfurter_turkey: { fat: 5, protein: 14, calories: 160 },
        frankfurter_beef: { fat: 12, protein: 13, calories: 210 },
        frankfurter_beef_hot: { fat: 14, protein: 12, calories: 230 },
        frankfurter_beef_low_fat: { fat: 7, protein: 13, calories: 170 }
    };

    const conversions = {
        grams: 1
    };

    const foodNutrition = nutritionData[foodItem];
    const conversionFactor = conversions[measurement];

    const fat = (foodNutrition.fat / conversionFactor) * quantity;
    const protein = (foodNutrition.protein / conversionFactor) * quantity;
    const calories = (foodNutrition.calories / conversionFactor) * quantity;

    document.getElementById('result-food-item').textContent = foodItem.replace(/_/g, ' ');
    document.getElementById('result-quantity').textContent = `${quantity} ${measurement}`;
    document.getElementById('result-fat').textContent = fat.toFixed(2);
    document.getElementById('result-protein').textContent = protein.toFixed(2);
    document.getElementById('result-calories').textContent = calories.toFixed(2);

    document.getElementById('results').classList.remove('hidden');

    updateChart(fat.toFixed(2), protein.toFixed(2), calories.toFixed(2));
});

function updateChart(fat, protein, calories) {
    const ctx = document.getElementById('nutrition-chart').getContext('2d');

    if (window.nutritionChart) {
        window.nutritionChart.destroy();
    }

    window.nutritionChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Fat (g)', 'Protein (g)', 'Calories (kcal)'],
            datasets: [{
                label: 'Nutritional Values',
                data: [fat, protein, calories],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',  // Fat (g)
                    'rgba(54, 162, 235, 0.6)',  // Protein (g)
                    'rgba(255, 206, 86, 0.6)'   // Calories (kcal)
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',    // Fat (g)
                    'rgba(54, 162, 235, 1)',    // Protein (g)
                    'rgba(255, 206, 86, 1)'     // Calories (kcal)
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.raw;
                            return label;
                        }
                    }
                }
            }
        }
    });
}
