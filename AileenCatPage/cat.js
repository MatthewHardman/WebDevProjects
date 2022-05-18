$('#catButton').click(function(){
    $.get('https://cataas.com/cat?json=true', function(data){
      $('#catImage').empty();
      $('#catImage').append("<img id='#catImage' src='https://cataas.com"+data.url+"'/>");
    });
  });