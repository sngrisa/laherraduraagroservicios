$(function(){
    $("[data-toggle='tooltip']").tooltip();
    $('[data-toggle="popover"]').popover();  
    $('[data-toggle="mouseover"]').mouseover();  
    $('.carousel').carousel({interval: 4000});
    $('#contacto').on('show.bs.modal', function (e){
      console.log('El modal esta mostrandose');
      $('#contactoBtn').removeClass('btn-outline-success');
      $('#contactoBtn').addClass('btn-secondary');
      $('#contactoBtn').prop('disabled', true);
    }),
    $('#contacto').on('shown.bs.modal', function (e){
    console.log('El modal se esta abriendo');
  });
  $('#contacto').on('hide.bs.modal', function (e){
    console.log('El modal se esta ocultando')
  });
  $('#contacto').on('hidden.bs.modal', function (e){
    console.log('El modal se oculto');
    $('#contactoBtn').removeClass('btn-secondary');
      $('#contactoBtn').addClass('btn-outline-sucess');
      $('#contactoBtn').prop('disabled', false);
    });
  });
 