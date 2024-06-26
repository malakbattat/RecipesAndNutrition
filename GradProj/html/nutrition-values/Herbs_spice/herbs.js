document.getElementById('nutrition-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const foodItem = document.getElementById('food-item').value;
    const quantity = parseFloat(document.getElementById('quantity').value);
    const measurement = document.getElementById('measurement').value;

    const nutritionData = {
        pickled_capers: { fat: 0.9, protein: 2.4, calories: 23 },
        spices_oregano_dried: { fat: 4.28, protein: 9, calories: 306 },
        spices_paprika: { fat: 12, protein: 14, calories: 282 },
        spices_cardamom: { fat: 7, protein: 11, calories: 311 },
        spices_fenugreek_seeds: { fat: 6.41, protein: 23, calories: 323 },
        spices_anise_seeds: { fat: 15.9, protein: 17.6, calories: 337 },
        spices_parsley_dried: { fat: 5.5, protein: 20, calories: 292 },
        spices_ground: { fat: 3, protein: 10, calories: 250 },
        spices_poultry_seasoning: { fat: 2, protein: 8, calories: 200 },
        spices_rosemary_dried: { fat: 15, protein: 4.9, calories: 331 },
        spices_basil_dried: { fat: 4.1, protein: 14, calories: 251 },
        spices_thyme_dried: { fat: 7.4, protein: 9.1, calories: 276 },
        spices_saffron: { fat: 5.9, protein: 11, calories: 310 },
        spices_ginger_ground: { fat: 4.2, protein: 9, calories: 335 },
        spices_cervil_dried: { fat: 5.8, protein: 12, calories: 237 },
        spices_tarragon_dried: { fat: 7.2, protein: 23, calories: 295 },
        spices_ground_hot_pepper: { fat: 13, protein: 12, calories: 318 },
        spices_pepper_white: { fat: 3.3, protein: 10.4, calories: 296 },
        spices_pepper_black: { fat: 3.3, protein: 10.4, calories: 251 },
        spices_cinnamon_ground: { fat: 1.2, protein: 4, calories: 247 },
        spices_turmeric_ground: { fat: 3.25, protein: 7.8, calories: 312 },
        spices_marjoram_dried: { fat: 7, protein: 12.7, calories: 271 },
        spices_sage_ground: { fat: 13, protein: 11, calories: 315 },
        spices_onion_powder: { fat: 1.04, protein: 10, calories: 341 },
        spices_garlic_powder: { fat: 0.73, protein: 17, calories: 331 },
        spices_mustard_powder_ground: { fat: 14.7, protein: 36, calories: 508 },
        spices_curry_powder: { fat: 14, protein: 13, calories: 325 },
        spices_bay_leaf: { fat: 8.4, protein: 7.6, calories: 313 },
        spices_coriander_leaf_dried: { fat: 4.8, protein: 21, calories: 279 },
        vinegar_apple_juice: { fat: 0, protein: 0, calories: 21 },
        vanilla_extract: { fat: 0.06, protein: 0.06, calories: 288 },
        rosemary_fresh: { fat: 5.86, protein: 3.31, calories: 131 },
        basil_fresh: { fat: 0.64, protein: 3.15, calories: 23 },
        thyme_fresh: { fat: 1.68, protein: 5.56, calories: 101 },
        food_salt: { fat: 0, protein: 0, calories: 0 }
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
