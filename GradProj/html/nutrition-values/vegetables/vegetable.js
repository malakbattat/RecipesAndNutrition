document.getElementById('nutrition-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const foodItem = document.getElementById('food-item').value;
    const quantity = parseFloat(document.getElementById('quantity').value);
    const measurement = document.getElementById('measurement').value;

    const nutritionData = {
        cilantro_leaves_raw: { fat: 0.5, protein: 2.1, energy: 23 },
        sweet_potato_frozen_cooked_baked_without_salt: { fat: 0.1, protein: 1.6, energy: 76 },
        sweet_potato_frozen_cooked_baked_with_salt: { fat: 0.1, protein: 1.6, energy: 76 },
        sweet_potato_cooked_baked_in_skin_with_salt: { fat: 0.1, protein: 2, energy: 90 },
        sweet_potato_cooked_boiled_without_salt: { fat: 0.1, protein: 1.4, energy: 76 },
        sweet_potato_raw_unprepared: { fat: 0.1, protein: 1.6, energy: 86 },
        lettuce_common: { fat: 0.1, protein: 1.4, energy: 15 },
        lettuce_green_leaf: { fat: 0.2, protein: 1.4, energy: 15 },
        garden_cress_cooked_boiled_drained_without_salt: { fat: 0.4, protein: 2.6, energy: 32 },
        spinach_frozen_chopped_or_leaf_cooked_boiled_with_salt: { fat: 0.3, protein: 2.6, energy: 23 },
        spinach_raw: { fat: 0.4, protein: 2.9, energy: 23 },
        fiddlehead_fern_cooked_without_salt: { fat: 0.2, protein: 2.5, energy: 34 },
        tomato_red_ripe_raw: { fat: 0.2, protein: 0.9, energy: 18 },
        tomato_green_raw: { fat: 0.2, protein: 1.2, energy: 23 },
        snap_beans_green_cooked_boiled_drained_without_salt: { fat: 0.3, protein: 1.9, energy: 35 },
        snap_beans_green_frozen_cooked_boiled_drained_with_salt: { fat: 0.3, protein: 1.9, energy: 35 },
        snap_beans_green_canned_no_salt_added_drained_solids: { fat: 0.3, protein: 1.4, energy: 16 },
        snap_beans_green_raw: { fat: 0.2, protein: 1.8, energy: 31 },
        winter_squash_raw: { fat: 0.1, protein: 1, energy: 34 },
        squash_raw: { fat: 0.1, protein: 1, energy: 16 },
        squash_blossoms_cooked_boiled_drained_with_salt: { fat: 0.2, protein: 2.6, energy: 15 },
        zucchini_small_raw: { fat: 0.3, protein: 1.2, energy: 17 },
        eggplant_pickled: { fat: 0.5, protein: 1, energy: 18 },
        eggplant_cooked_boiled_drained_without_salt: { fat: 0.2, protein: 1, energy: 35 },
        eggplant_raw: { fat: 0.2, protein: 1, energy: 25 },
        peas_and_onions_frozen_cooked_boiled_drained_without_salt: { fat: 0.4, protein: 3.7, energy: 38 },
        peas_and_onions_frozen_cooked_boiled_drained_with_salt: { fat: 0.4, protein: 3.7, energy: 38 },
        peas_and_carrots_frozen_cooked_boiled_drained_with_salt: { fat: 0.4, protein: 3.7, energy: 38 },
        peas_mature_seeds_sprouted_cooked_boiled_drained_without_salt: { fat: 0.5, protein: 6.8, energy: 81 },
        peas_green_frozen_unprepared: { fat: 0.4, protein: 4.3, energy: 63 },
        peas_green_frozen_cooked_boiled_drained_without_salt: { fat: 0.4, protein: 4.3, energy: 63 },
        peas_green_cooked_boiled_drained_without_salt: { fat: 0.4, protein: 5.4, energy: 66 },
        peas_green_cooked_boiled_drained_with_salt: { fat: 0.4, protein: 5.4, energy: 66 },
        peas_green_canned_regular_pack_solids_and_liquids: { fat: 0.4, protein: 3.5, energy: 53 },
        okra_frozen_cooked_boiled_drained_without_salt: { fat: 0.3, protein: 1.9, energy: 22 },
        okra_cooked_boiled_drained_without_salt: { fat: 0.3, protein: 1.9, energy: 22 },
        okra_raw: { fat: 0.2, protein: 1.9, energy: 33 },
        potato_pancakes: { fat: 10, protein: 2.5, energy: 223 },
        radish_seeds_sprouted_raw: { fat: 0.2, protein: 2.5, energy: 43 },
        broccoli_stalks_raw: { fat: 0.3, protein: 2.9, energy: 34 },
        broccoli_frozen_stalks_cooked_boiled_drained_without_salt: { fat: 0.3, protein: 2.9, energy: 34 },
        broccoli_frozen_chopped_cooked_boiled_drained_with_salt: { fat: 0.2, protein: 2.8, energy: 28 },
        broccoli_cooked_boiled_drained_without_salt: { fat: 0.4, protein: 2.4, energy: 35 },
        broccoli_raw: { fat: 0.4, protein: 2.8, energy: 34 },
        onion_sweet_raw: { fat: 0.1, protein: 1.1, energy: 32 },
        onion_raw: { fat: 0.1, protein: 1.1, energy: 40 }
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
