$(function () {

  $('.pg-cart-btns').on('click', function(e) {
    e.preventDefault();

    $('.cards-added ul').append('<li><a class="remove-start-item"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a> Сбербанк <span>20 000 рублей</span></li>')
  });

  $('.remove-start-item').on('click', function() {
    $(this).parent('li').remove();
  });

  // var nal = $('#pg-nal').val();
  //
  // var data = {nal: nal}
  //
  // $.ajax({
  //   type: 'POST',
  //   url: '/user/reatrof/start',
  //   data: data
  // })

});
