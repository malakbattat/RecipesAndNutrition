document.getElementById('nutrition-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const foodItem = document.getElementById('food-item').value;
    const quantity = parseFloat(document.getElementById('quantity').value);
    const measurement = document.getElementById('measurement').value;

    const nutritionData = {
        ice_cream_regular_low_calorie_chocolate: { fat: 3, protein: 3, energy: 90 },
        ice_cream_chocolate_light: { fat: 2.5, protein: 3, energy: 75 },
        ice_cream_chocolate_light_no_sugar: { fat: 2.5, protein: 3, energy: 70 },
        jams_and_preserves: { fat: 0, protein: 0.1, energy: 56 },
        pudding_rice_dry_mix_milk: { fat: 2, protein: 2, energy: 120 },
        pudding_coconut_dry_mix_milk: { fat: 3, protein: 2, energy: 150 },
        pudding_chocolate_dry_mix_regular: { fat: 1, protein: 1, energy: 70 },
        pudding_vanilla_ready_to_eat: { fat: 2, protein: 1, energy: 100 },
        pudding_vanilla_dry_mix_regular: { fat: 1, protein: 1, energy: 80 },
        pudding_banana_dry_mix_regular: { fat: 1, protein: 1, energy: 75 },
        gelatin_low_sugar_nonfat_milk_chocolate: { fat: 0, protein: 2, energy: 40 },
        pie_filling_apple_canned: { fat: 0, protein: 0.2, energy: 70 },
        gelatin_dry_mix: { fat: 0, protein: 1, energy: 10 },
        desserts_apple_crisp_prepared_from_recipe: { fat: 5, protein: 1, energy: 200 },
        desserts_sugar_candy: { fat: 0, protein: 0, energy: 60 },
        desserts_chocolate_milk: { fat: 3, protein: 2, energy: 100 },
        desserts_chocolate_milk_with_almonds: { fat: 4, protein: 2, energy: 130 },
        desserts_carob_unsweetened: { fat: 0, protein: 0.5, energy: 40 },
        desserts_yogurt_chocolate_dry_mix: { fat: 1, protein: 2, energy: 60 },
        desserts_chocolate_fondant_covered: { fat: 6, protein: 1, energy: 150 },
        desserts_fondant_prepared_from_recipe: { fat: 3, protein: 1, energy: 100 },
        desserts_hard_diet_or_low_calorie_sorbitol: { fat: 0, protein: 0, energy: 30 },
        desserts_kit_kat_wafers: { fat: 10, protein: 2, energy: 210 },
        desserts_chocolate_caramel_rolls: { fat: 8, protein: 1, energy: 180 },
        desserts_york_peppermint_patties: { fat: 2, protein: 1, energy: 140 },
        desserts_caramello_candy_bars: { fat: 9, protein: 1, energy: 200 },
        desserts_mars_milky_way_bars: { fat: 8, protein: 2, energy: 220 },
        desserts_m_and_m_chocolate_candies: { fat: 10, protein: 2, energy: 240 },
        desserts_marshmallows: { fat: 0, protein: 1, energy: 25 },
        desserts_chocolate_covered_caramel_with_nuts: { fat: 11, protein: 2, energy: 250 },
        desserts_chocolate_mousse_prepared_from_recipe: { fat: 10, protein: 2, energy: 180 },
        molasses: { fat: 0, protein: 0, energy: 60 },
        fruit_butter_apple: { fat: 0, protein: 0, energy: 20 },
        sugar_turbinado: { fat: 0, protein: 0, energy: 16 },
        syrup_corn_high_fructose: { fat: 0, protein: 0, energy: 53 },
        syrup_sorghum: { fat: 0, protein: 0, energy: 61 },
        syrup_blend_corn_and_sugar: { fat: 0, protein: 0, energy: 54 },
        baking_chocolate_unsweetened_squares: { fat: 15, protein: 4, energy: 240 },
        custard_egg_dry_mix: { fat: 8, protein: 3, energy: 160 },
        cocoa_dry_powder_unsweetened: { fat: 1.5, protein: 1, energy: 12 },
        cocoa_dry_powder_unsweetened_alkalized: { fat: 1.5, protein: 1, energy: 12 },
        frozen_yogurt_chocolate_soft_serve: { fat: 2.5, protein: 3, energy: 110 },
        frozen_yogurt_non_chocolate_flavors: { fat: 2, protein: 3, energy: 100 },
        candy_bar_chocolate_and_peanut: { fat: 12, protein: 3, energy: 260 },
        italian_ice_restaurant_prepared: { fat: 0, protein: 0, energy: 110 },
        italian_ice_lemon: { fat: 0, protein: 0, energy: 100 },
        frozen_juice_bar_low_calorie_sweetened: { fat: 0, protein: 0, energy: 20 },
        frozen_juice_bar_fruit_no_sugar_added: { fat: 0, protein: 0, energy: 50 },
        klondike_slim_ice_cream_sandwich: { fat: 6, protein: 2, energy: 160 },
        diet_jams_and_preserves_any_flavor: { fat: 0, protein: 0.1, energy: 30 }
    };

    const conversions = {
        grams: 1
    };

    const foodNutrition = nutritionData[foodItem];
    const conversionFactor = conversions[measurement];

    const fat = (foodNutrition.fat / conversionFactor) * quantity;
    const protein = (foodNutrition.protein / conversionFactor) * quantity;
    const energy = (foodNutrition.energy / conversionFactor) * quantity;

    document.getElementById('result-food-item').textContent = foodItem.replace(/_/g, ' ');
    document.getElementById('result-quantity').textContent = `${quantity} ${measurement}`;
    document.getElementById('result-fat').textContent = fat.toFixed(2);
    document.getElementById('result-protein').textContent = protein.toFixed(2);
    document.getElementById('result-energy').textContent = energy.toFixed(2);

    document.getElementById('results').classList.remove('hidden');

    updateChart(fat.toFixed(2), protein.toFixed(2), energy.toFixed(2));
});

function updateChart(fat, protein, energy) {
    const ctx = document.getElementById('nutrition-chart').getContext('2d');

    if (window.nutritionChart) {
        window.nutritionChart.destroy();
    }

    window.nutritionChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Fat (g)', 'Protein (g)', 'Energy (kcal)'],
            datasets: [{
                label: 'Nutritional Values',
                data: [fat, protein, energy],
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
