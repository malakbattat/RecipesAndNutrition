document.getElementById('nutrition-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const foodItem = document.getElementById('food-item').value;
    const quantity = parseFloat(document.getElementById('quantity').value);
    const measurement = document.getElementById('measurement').value;

    const nutritionData = {
        goose_meat_skin_cooked_roasted: { fat: 39.34, protein: 29.15, calories: 472 },
        chicken_fried_breaded_flour_egg: { fat: 10.5, protein: 16.1, calories: 246 },
        chicken_fried_breaded_flour_egg_milk: { fat: 13.1, protein: 18.4, calories: 272 },
        chicken_breast_meat_skin_fried_flour_mixture: { fat: 8.7, protein: 23.5, calories: 247 },
        chicken_back_meat_skin_fried_flour_mixture: { fat: 10.1, protein: 21.9, calories: 254 },
        chicken_liver_all_classes_raw: { fat: 5.8, protein: 16.9, calories: 119 },
        chicken_breast_meat_skin_fried_flour: { fat: 10.1, protein: 23.5, calories: 262 },
        chicken_thigh_meat_only_grilled: { fat: 5.6, protein: 25.9, calories: 209 },
        chicken_thigh_meat_only_fried: { fat: 10.3, protein: 23.4, calories: 253 },
        chicken_thigh_meat_skin_grilled: { fat: 12.2, protein: 21.9, calories: 259 },
        chicken_thigh_meat_skin_cooked: { fat: 8.4, protein: 27, calories: 245 },
        chicken_grilled_fried_light_meat_skin_raw: { fat: 3.1, protein: 21.3, calories: 128 },
        chicken_grilled_fried_meat_only_grilled: { fat: 5.6, protein: 25.9, calories: 209 },
        chicken_grilled_fried_meat_only_cooked_fried: { fat: 10.3, protein: 23.4, calories: 253 },
        chicken_grilled_fried_meat_skin_giblets_neck_grilled: { fat: 12.2, protein: 21.9, calories: 259 },
        chicken_grilled_fried_meat_skin_grilled: { fat: 8.4, protein: 27, calories: 245 },
        chicken_grilled_fried_meat_skin_cooked_boiled: { fat: 3.1, protein: 21.3, calories: 128 },
        chicken_grilled_fried_meat_skin_cooked_fried_flour: { fat: 10.3, protein: 23.4, calories: 253 },
        chicken_grilled_giblets_cooked_boiled: { fat: 5.6, protein: 25.9, calories: 209 },
        chicken_grilled_meat_only_raw: { fat: 3.1, protein: 21.3, calories: 128 },
        chicken_grilled_low_fat_meat_only_cooked_grilled: { fat: 3.1, protein: 25.3, calories: 158 },
        chicken_grilled_meat_skin_cooked_grilled: { fat: 8.4, protein: 27, calories: 245 },
        chicken_grilled_fried_back_meat_only_cooked_fried: { fat: 5.6, protein: 25.9, calories: 209 },
        chicken_grilled_fried_wing_meat_only_cooked_grilled: { fat: 5.6, protein: 25.9, calories: 209 },
        chicken_grilled_fried_wing_meat_only_cooked_fried: { fat: 10.3, protein: 23.4, calories: 253 },
        chicken_grilled_fried_wing_meat_skin_cooked_boiled: { fat: 3.1, protein: 21.3, calories: 128 },
        chicken_grilled_fried_separable_fat_raw: { fat: 100, protein: 0, calories: 900 },
        chicken_grilled_fried_neck_meat_only_cooked_fried: { fat: 10.3, protein: 23.4, calories: 253 },
        chicken_grilled_fried_leg_meat_only_cooked_boiled: { fat: 3.1, protein: 21.3, calories: 128 },
        chicken_grilled_fried_leg_meat_only_raw: { fat: 3.1, protein: 21.3, calories: 128 },
        chicken_grilled_fried_leg_meat_skin_cooked_boiled: { fat: 8.4, protein: 27, calories: 245 },
        chicken_grilled_fried_leg_meat_skin_cooked_fried_flour_egg_milk: { fat: 10.3, protein: 23.4, calories: 253 },
        chicken_grilled_fried_breast_meat_only_cooked_grilled: { fat: 3.1, protein: 21.3, calories: 128 },
        chicken_grilled_fried_breast_meat_only_cooked_boiled: { fat: 3.1, protein: 21.3, calories: 128 },
        chicken_grilled_fried_breast_meat_only_cooked_fried: { fat: 10.3, protein: 23.4, calories: 253 },
        chicken_grilled_fried_breast_meat_skin_cooked_boiled: { fat: 8.4, protein: 27, calories: 245 }
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
                }
            }
        }
    });
}
