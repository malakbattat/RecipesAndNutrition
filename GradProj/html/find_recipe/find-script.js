    // إضافة مستمع للنقر على الكلمات
    document.querySelectorAll('.ingredient-name').forEach(iname => {
      iname.addEventListener('click', () => {
        var ingredientName = iname.textContent.trim();
        var i = document.getElementById('ingredients');
        var v = i.value.trim();
        var a = v ? v.split(',').map(item => item.trim()) : [];

        // التحقق إذا كانت الكلمة موجودة مسبقاً
        if (!a.includes(ingredientName)) {
          // إضافة الكلمة إلى القيمة الحالية لحقل الإدخال
          if (v === '') {
            i.value = ingredientName;
          } else {
            i.value = v + ', ' + ingredientName;
          }

          // تحديد الكلمة باللون الأخضر
          iname.classList.add('ingredient-bg');
        } else {
          // إزالة الكلمة إذا تم النقر عليها وكانت موجودة مسبقاً
          var filteredWords = a.filter(item => item !== ingredientName);
          i.value = filteredWords.join(', ');

          // إزالة لون الخلفية
          iname.classList.remove('ingredient-bg');
        }
      });
    });

    // تحديث الألوان عندما يتم التعديل في انبوت ingredients
    function updateColor() {
      var i = document.getElementById('ingredients');
      var v = i.value.trim();
      var a = v ? v.split(',').map(item => item.trim()) : [];

      // تحديث التظليلات بناءًا على الكلمات الحالية
      document.querySelectorAll('.ingredient-name').forEach(iname => {
        var ingredientName = iname.textContent.trim();
        // إضافة لون الخلفية إذا كانت الكلمة موجودة في ingredients وليست فارغة
        if (a.includes(ingredientName) && v !== '') {
          iname.classList.add('ingredient-bg');
        } else {
          iname.classList.remove('ingredient-bg');
        }
      });
    };
    document.getElementById('ingredients').addEventListener('input', () => {
      updateColor();
    });


    function setAlerts() {
      var ingredients = document.getElementById('ingredients').value;
      if(ingredients == ''){
      var alert = document.getElementById('alerts');
      alert.innerHTML = "Please select at least one ingredient";
      alert.style.display = "block";
      return false;
    }
    return true;
    }



    updateColor();