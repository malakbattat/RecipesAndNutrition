document.getElementById('nutrition-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const foodItem = document.getElementById('food-item').value;
    const quantity = parseFloat(document.getElementById('quantity').value);
    const measurement = document.getElementById('measurement').value;

    const nutritionData = {
        lamb_fat: { fat: 99, protein: 0, calories: 897 },
        industrial_palm_kernel_oil: { fat: 100, protein: 0, calories: 884 },
        palm_oil: { fat: 100, protein: 0, calories: 884 },
        walnut_oil: { fat: 100, protein: 0, calories: 884 },
        mustard_oil: { fat: 100, protein: 0, calories: 884 },
        corn_oil: { fat: 100, protein: 0, calories: 884 },
        olive_oil: { fat: 100, protein: 0, calories: 884 },
        oat_oil: { fat: 100, protein: 0, calories: 884 },
        rice_bran_oil: { fat: 100, protein: 0, calories: 884 },
        almond_oil: { fat: 100, protein: 0, calories: 884 },
        coconut_oil: { fat: 100, protein: 0, calories: 884 },
        cocoa_butter_oil: { fat: 100, protein: 0, calories: 884 },
        vegetable_ghee: { fat: 100, protein: 0, calories: 884 },
        regular_vegetable_ghee: { fat: 100, protein: 0, calories: 884 },
        mayonnaise_tofu: { fat: 75, protein: 0, calories: 666 },
        chicken_fat: { fat: 100, protein: 0, calories: 884 },
        avocado_oil: { fat: 100, protein: 0, calories: 884 },
        hazelnut_oil: { fat: 100, protein: 0, calories: 884 },
        fish_oil_salmon: { fat: 100, protein: 0, calories: 884 },
        mayonnaise_chol_free: { fat: 75, protein: 0, calories: 666 },
        mayonnaise_low_sodium: { fat: 75, protein: 0, calories: 666 },
        cream_low_calorie: { fat: 50, protein: 0, calories: 450 }
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
                    position: 'top',
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
