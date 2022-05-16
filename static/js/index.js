
$(document).ready(function(){
    $("#form1").hide();
    $("#form2").hide();
    $("#form3").hide();
    $("#form4").hide();

  $(".action-button").click(function(){
    if (($(this).attr('value')) == 'GET'){
        $('#response').text('');
        $("#form1").toggle();
        $("#form2").hide();
        $("#form3").hide();
        $("#form4").hide();
        $('.form-field2').css({"border":"2px solid #ced4da"});
        $('.form-field3').css({"border":"2px solid #ced4da"});
        $("input[name=delete-id]").css({"border":"2px solid #ced4da"});
    }
    else if (($(this).attr('value')) == 'POST'){
        $('#response').text('');
        $("#form2").toggle();
        $("#form1").hide();
        $("#form3").hide();
        $("#form4").hide();
        $("input[name=get-id]").css({"border":"2px solid #ced4da"});
        $("input[name=delete-id]").css({"border":"2px solid #ced4da"});
        $('.form-field3').css({"border":"2px solid #ced4da"});
    }
     else if (($(this).attr('value')) == 'PUT'){
        $('#response').text('');
        $("#form3").toggle();
        $("#form1").hide();
        $("#form2").hide();
        $("#form4").hide();
        $("input[name=get-id]").css({"border":"2px solid #ced4da"});
        $('.form-field2').css({"border":"2px solid #ced4da"});
        $("input[name=delete-id]").css({"border":"2px solid #ced4da"});
    }
    else if (($(this).attr('value')) == 'DELETE'){
        $('#response').text('');
        $("#form4").toggle();
        $("#form1").hide();
        $("#form2").hide();
        $("#form3").hide();
        $("input[name=get-id]").css({"border":"2px solid #ced4da"});
        $('.form-field2').css({"border":"2px solid #ced4da"});
        $('.form-field3').css({"border":"2px solid #ced4da"});
    }
  });



  $('.hit-submit-button').on('click',function(){

    if (($(this).attr('name')) == 'get-operation'){
        if ($("input[name=get-id]").val() == ''){
            $("input[name=get-id]").css({"border":"2px solid red"});
            return false;
        }
        TYPE = 'GET'
        data = {'id':$("input[name=get-id]").val(), 'operation-type':'get-operation'}
    }
    else if (($(this).attr('name')) == 'post-operation'){
        var result = validateForm('form-field2')
        var email = isEmail($("input[name=post-email]").val())
        if (result == true){
            if (isEmail($("input[name=post-email]").val())){
                TYPE = 'POST'
                data = {'username':$("input[name=post-username]").val(),'firstname':$("input[name=post-firstname]").val(),
                'lastname':$("input[name=post-lastname]").val(),'email':$("input[name=post-email]").val(),
                 'password':$("input[name=post-password]").val(),'operation-type':'post-operation'}
            }else{
                $('#response').text("Email not in proper format: eg. admin@gmail.com");
                return false;
            }
         }
         else{
            return false
         }
    }
    else if (($(this).attr('name')) == 'put-operation'){
        var result = validateForm('form-field3')
        if (result == true){
             TYPE = 'POST'
             data = {'id':$("input[name=put-id]").val(),'username':$("input[name=put-username]").val(),'firstname':$("input[name=put-firstname]").val(),
            'lastname':$("input[name=put-lastname]").val(),'email':$("input[name=put-email]").val(),
             'password':$("input[name=put-password]").val(),'operation-type':'put-operation'}

    }else{
        return false
        }
    }
    else {
        if ($("input[name=delete-id]").val() == ''){
                $("input[name=delete-id]").css({"border":"2px solid red"});
                return false;
            }
        TYPE = 'POST'
        data = {'id':$("input[name=delete-id]").val(), 'operation-type':'delete-operation'}
    }
    if ($(this).attr('name') == 'delete-operation'){

         Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, remove it!'
        }).then((result) => {
          if (result.isConfirmed) {

            $.ajax({
                type: TYPE,
             url: "/handle_crud_actions/",
             data: data,
             dataType: "json",
             success: function (response) {
                   if (response) {
                        $('#response').text(response.result);
                        $('.form-control').val("");
                   }
                   if (response.flag){
                   Swal.fire(
                         'Removed!',
                        'removed successfully',
                        'success'
                    )}if (response.flag == false ){
                        Swal.fire(
                         'Opps!',
                        'id does not exists!',
                        'error'
                    )
                    }

                }
            });


          }
        })

    }
    else{
    $.ajax({
             type: TYPE,
             url: "/handle_crud_actions/",
             data: data,
             dataType: "json",
             success: function (response) {
            if (response) {

                $('#response').text(response.result);
                $('.form-control').val("");

            }
        }
    });}

  });
});


function validateForm(name) {
                    var valid = true;
                    $('.'+name).each(function () {
                        if ($(this).val() === '') {
                            $(this).css({"border":"2px solid red"});
                            valid = false;

                        }
                    });
                    return valid
                }



$(document).ready(function(){

    $('.page-link').on('click',function(){
        var page = $(this).attr('value');

        // ajax
        $.ajax({
                type: "GET",
                url: "/loader/", // name of url
                data : {
                page : page, //page_number
            },
            success: function (resp) {
                //loop
                $('#table_body').html('')
               $.each(resp.users, function(i, val) {
                 //apending table_body
                $('#table_body').append('<tr id="tr-{{user.id}}"><td>'+val.id+'</td><td>'+val.username+'</td><td>'+val.first_name+'</td><td>'+val.last_name+'</td><td>'+val.email+'</td></tr>')
               });
                  $('.page-item').removeClass('active')
                  $('#pg-'+page).addClass('active')

               if (resp.Next){
                 $('.next_button').removeClass('disabled');
                 $('.next-button-link').attr('value',resp.next_value);
               }else{
                 $('.next_button').addClass('disabled');
                 $('.next_button').addClass('cursor-not-allowed');
               }
               if (resp.Previous){
                 $('.previous_button').removeClass('disabled');
                 $('.previous-button-link').attr('value',resp.previous_value);
               }else{
                 $('.previous_button').addClass('disabled');
                 $('.previous_button').addClass('cursor-not-allowed');
               }
            },
        }); //

    });


});


function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}



