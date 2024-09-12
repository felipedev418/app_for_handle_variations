$(document).ready(function() {
  let variationCount = 1;

  function addVariationField(variation = '') {
    const newVariation = `
      <div class="form-group variation-group">
        <label for="variation-${variationCount}">Variation ${variationCount}</label>
        <div class="input-group">
          <input class="form-control variation-input" type="text" name="variation-${variationCount}" value="${variation}" required>
          <div class="input-group-append">
            <button class="btn btn-danger remove-variation" type="button">Remove</button>
          </div>
        </div>
      </div>
    `;
    $('#variations-container').append(newVariation);
    variationCount++;
  }

  $('#add-variation').on('click', function() {
    addVariationField();
  });

  $(document).on('click', '.remove-variation', function() {
    $(this).closest('.variation-group').remove();
  });

  $('#addMultipleVariantsBtn').on('click', function() {
    const multipleVariants = $('#multipleVariantsInput').val().split('\n');
    
    // Clear existing variations except the first one
    $('.variation-group:not(:first)').remove();
    
    // Update the first variation with the first new variant
    if (multipleVariants.length > 0 && multipleVariants[0].trim()) {
      $('.variation-input').first().val(multipleVariants[0].trim());
    }
    
    // Add the rest of the variants as new fields
    multipleVariants.slice(1).forEach(variant => {
      if (variant.trim()) {
        addVariationField(variant.trim());
      }
    });
    
    $('#multipleVariantsModal').modal('hide');
    $('#multipleVariantsInput').val('');
  });
  

  $('#curation-form').on('submit', function(e) {
    e.preventDefault();
    const form = $(this);
    const pmid = form.data('pmid');
    const variations = [];

    $('.variation-input').each(function() {
      const variation = $(this).val().trim();
      if (variation) {
        variations.push(variation);
      }
    });

    if (variations.length === 0) {
      alert('Please enter at least one variation');
      return;
    }

    $.ajax({
      url: '/save-variation',
      method: 'POST',
      data: JSON.stringify({ pmid, variations, status: 'completed' }),
      contentType: 'application/json',
      success: function(response) {
        alert('Variations saved successfully');
        window.location.href = '/curate';
      },
      error: function(xhr, status, error) {
        alert('Error saving variations: ' + xhr.responseText);
      }
    });
  });
});
