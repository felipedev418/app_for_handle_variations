$(document).ready(function() {
  $('.status-btn').on('click', function() {
    const btn = $(this);
    const newStatus = btn.text() === 'incomplete' ? 'completed' : 'incomplete';
    btn.text(newStatus);
    btn.toggleClass('btn-warning btn-success');
  });

  $('.save-btn').on('click', function() {
    const row = $(this).closest('tr');
    const pmid = row.data('pmid');
    const gene = row.find('input[name="gene"]').val();
    const variation = row.find('input[name="variation"]').val();
    const status = row.find('.status-btn').text();

    if (gene && variation) {
      $.ajax({
        url: '/save-variation',
        method: 'POST',
        data: { pmid, gene, variation, status },
        success: function(response) {
          // Reset status to 'incomplete' after saving
          row.find('.status-btn').text('incomplete');
          row.find('.status-btn').removeClass('btn-success').addClass('btn-warning');
          row.find('input[name="gene"]').val('');
          row.find('input[name="variation"]').val('');
        },
        error: function() {
          alert('Error saving variation');
        }
      });
    } else {
      alert('Please enter both gene and variation');
    }
  });

  $('.cancel-btn').on('click', function() {
    const row = $(this).closest('tr');
    row.find('input[name="gene"]').val('');
    row.find('input[name="variation"]').val('');
    // Reset status to 'incomplete' when cancelling
    row.find('.status-btn').text('incomplete');
    row.find('.status-btn').removeClass('btn-success').addClass('btn-warning');
  });
});
