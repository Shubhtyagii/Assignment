//$(document).ready(function(){
//    $('.form-field2').on('click',function(){
//        alert('lldf');
//        validateForm_field('form-field2')
//    })
//
//
//});

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
        if (result == true){
            TYPE = 'POST'
            data = {'username':$("input[name=post-username]").val(),'firstname':$("input[name=post-firstname]").val(),
            'lastname':$("input[name=post-lastname]").val(),'email':$("input[name=post-email]").val(),
             'password':$("input[name=post-password]").val(),'operation-type':'post-operation'}
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


    $.ajax({
             type: TYPE,
             url: "/handle_crud_actions/",
             data: data,
             dataType: "json",
             success: function (response) {
            if (response) {

                $('#response').text(response.result);

            }
        }
    });

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
//
//
//function validateForm_field(name) {

//                    var valid = true;
//                    $('.'+name).each(function () {
//                        if ($(this).val() !== '') {
//                            $(this).css({"border":"2px solid #ced4da"});
//                            valid = false;
//
//                        }
//                    });
//                    return valid
//                }




$(document).ready(function(){
$('.page-link').on('click',function(){
    var page = $(this).attr('value');;
    alert(page)
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
//                console.log(resp.results)
               $.each(resp.users, function(i, val) {
                 //apending table_body

                $('#table_body').append('<tr id="tr-{{user.id}}"><td>'+val.id+'</td><td>'+val.username+'</td><td>'+val.first_name+'</td><td>'+val.last_name+'</td><td>'+val.email+'</td></tr>')
               });
            },
            error: function () {}
        }); //

});


});


