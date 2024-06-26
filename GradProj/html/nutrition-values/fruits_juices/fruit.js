document.getElementById('nutrition-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const foodItem = document.getElementById('food-item').value;
    const quantity = parseFloat(document.getElementById('quantity').value);
    const measurement = document.getElementById('measurement').value;

    const nutritionData = {
        pineapple_raw_all_varieties: { fat: 0.1, protein: 0.5, calories: 50 },
        avocado_fresh_all_commercial_varieties: { fat: 15, protein: 2, calories: 160 },
        watermelon: { fat: 0.2, protein: 0.6, calories: 30 },
        pomelo_fresh: { fat: 0.2, protein: 0.8, calories: 38 },
        blackberries_fresh: { fat: 0.5, protein: 2, calories: 43 },
        cranberries_fresh: { fat: 0.1, protein: 0.4, calories: 46 },
        cranberries_dried_sweetened: { fat: 0.3, protein: 0.1, calories: 325 },
        blueberries_canned_syrup_concentrate_dried: { fat: 0.4, protein: 0.9, calories: 240 },
        blueberries_fresh: { fat: 0.3, protein: 0.7, calories: 57 },
        blueberries_canned_light_syrup_dried: { fat: 0.3, protein: 0.7, calories: 74 },
        blueberries_canned_syrup_concentrate_solids_liquids: { fat: 0.4, protein: 0.9, calories: 84 },
        grapes_red_or_green_fresh: { fat: 0.2, protein: 0.6, calories: 69 },
        apricots_dried: { fat: 0.5, protein: 1.4, calories: 241 },
        apricots_fresh: { fat: 0.1, protein: 0.5, calories: 48 },
        apricots_canned_very_light_syrup_peels_solids_liquids: { fat: 0.1, protein: 0.5, calories: 83 },
        banana_fresh: { fat: 0.3, protein: 1.3, calories: 89 },
        nectarine_fresh: { fat: 0.3, protein: 1, calories: 44 },
        orange_navel_fresh: { fat: 0.1, protein: 1.2, calories: 47 },
        orange_fresh_all_commercial_varieties: { fat: 0.2, protein: 1.2, calories: 49 },
        persimmon_japanese_fresh: { fat: 0.2, protein: 0.8, calories: 70 },
        plum_fresh: { fat: 0.2, protein: 0.5, calories: 46 },
        plum_dried_cooked_sugar_added: { fat: 0.5, protein: 1.4, calories: 166 },
        plum_canned_purple_very_heavy_syrup_solids_liquids: { fat: 0.5, protein: 1.4, calories: 120 },
        plum_canned_purple_heavy_syrup_solids_liquids: { fat: 0.5, protein: 1.4, calories: 105 },
        apple_fresh_with_skin: { fat: 0.2, protein: 0.3, calories: 52 },
        apple_canned_sweetened_slices_dried_undried: { fat: 0.3, protein: 0.2, calories: 42 },
        tamarind_fresh: { fat: 0.6, protein: 2.8, calories: 239 },
        dates_deglet_noor: { fat: 0.2, protein: 1.8, calories: 282 },
        dates_medjool: { fat: 0.2, protein: 1.8, calories: 277 },
        raspberries_fresh: { fat: 0.5, protein: 1.5, calories: 52 },
        raspberries_frozen_red_sweetened: { fat: 0.5, protein: 0.8, calories: 96 },
        raspberries_canned_red_thick_syrup_solids_liquids: { fat: 0.5, protein: 0.8, calories: 68 },
        berries_fresh: { fat: 0.3, protein: 0.7, calories: 48 },
        prickly_pear_raw: { fat: 0.5, protein: 1.1, calories: 41 },
        figs_fresh: { fat: 0.3, protein: 0.8, calories: 74 },
        figs_dried: { fat: 0.3, protein: 3.3, calories: 249 },
        figs_canned_light_syrup_solids_liquids: { fat: 0.3, protein: 0.9, calories: 70 },
        figs_canned_water_juice_solids_liquids: { fat: 0.3, protein: 0.9, calories: 52 },
        grapefruit_fresh_pink_red_all_areas: { fat: 0.1, protein: 0.9, calories: 42 }
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
