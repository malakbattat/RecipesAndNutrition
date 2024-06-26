document.getElementById('nutrition-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const foodItem = document.getElementById('food-item').value;
    const quantity = parseFloat(document.getElementById('quantity').value);
    const measurement = document.getElementById('measurement').value;

    const nutritionData = {
        eggs: { fat: 5, protein: 6, calories: 70 },
        dried_eggs: { fat: 2, protein: 12, calories: 60 },
        scrambled_eggs: { fat: 10, protein: 7, calories: 100 },
        hard_boiled_eggs: { fat: 5, protein: 6, calories: 70 },
        fried_eggs: { fat: 7, protein: 6, calories: 90 },
        cream_cheese_fat_free: { fat: 0, protein: 4, calories: 30 },
        mozzarella_cheese_fat_free: { fat: 0, protein: 9, calories: 50 },
        swiss_cheese: { fat: 9, protein: 8, calories: 110 },
        low_fat_yogurt: { fat: 2, protein: 12, calories: 150 },
        dried_yogurt: { fat: 1, protein: 3, calories: 20 },
        thick_vanilla_milkshake: { fat: 10, protein: 5, calories: 200 },
        yogurt_with_chocolate_fat_free: { fat: 0, protein: 8, calories: 140 },
        full_fat_yogurt: { fat: 5, protein: 8, calories: 180 }
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
                    'rgba(255, 99, 132, 0.6)',  
                    'rgba(54, 162, 235, 0.6)',  
                    'rgba(255, 206, 86, 0.6)'  
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',  
                    'rgba(54, 162, 235, 1)', 
                    'rgba(255, 206, 86, 1)'
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
