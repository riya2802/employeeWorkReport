function getCookie(name) {
   var cookieValue = null;
   if (document.cookie && document.cookie !== '') {
       var cookies = document.cookie.split(';');
       for (var i = 0; i < cookies.length; i++) {
           var cookie = cookies[i].trim();
           // Does this cookie string begin with the name we want?
           if (cookie.substring(0, name.length + 1) === (name + '=')) {
               cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
               break;
           }
       }
   }
   return cookieValue;
}
var csrftoken = getCookie('csrftoken');
console.log(csrftoken,"this is the csrftoken")
function csrfSafeMethod(method) {
   // these HTTP methods do not require CSRF protection
   return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
   beforeSend: function(xhr, settings) {
       if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
           xhr.setRequestHeader("X-CSRFToken", csrftoken);
       }
   }
});
function getQueryStringValue (key) {  
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
} 
//== Class definition
$(document).ready(function(){
    //$('#resetbtn').click(function(e) {
    //       e.preventDefault();
    //       submitform();
    //});
    $('#token').val(getQueryStringValue("token"));
    });

var FormControls = function () {
    //== Private functions
    
    var demo1 = function () {
        $( "#m_form_1" ).validate({
            // define validation rules
            rules: {
                password: {
                    required: true,
                    
                },
                conpassword: {
                    required: true 
                },
            },
            
            //display error alert on form submit  
            invalidHandler: function(event, validator) {    
                var alert = $('#m_form_1_msg');
                alert.removeClass('m--hide').show();
                mApp.scrollTo(alert, -200);
            },

            submitHandler: function (form) {
                form.ajaxSubmit({
                url : "http://192.168.0.191:8000/sendmail/resetpassword",
                type: 'POST',
                data: {'token':$('#token').val(),'password': $('#password').val(),'conpassword':$('#conpassword').val()},
                async: false,
                success:function(response)
                {
                    res=JSON.parse(JSON.stringify(response))
                    alert('responce',res['msg'] )
                    if(res['status']==200){
                        setTimeout(function() {
                            btn.removeClass('m-loader m-loader--right m-loader--light').attr('disabled', false);
                            showErrorMsg(form, 'success', res['msg']);
                        }, 2000);
                        location.href=("http://192.168.0.191:8000/login")
                    }
                    else{
                        
                        setTimeout(function() {
                            btn.removeClass('m-loader m-loader--right m-loader--light').attr('disabled', false);
                            showErrorMsg(form, 'danger', res['msg']);
                        }, 2000);
                    }
                }
            });
            
        }
                //form[0].submit(); // submit the form
            });
        };       
    

    var demo2 = function () {
        $( "#m_form_2" ).validate({
            // define validation rules
            rules: {
                email: {
                    required: true,
                    email: true 
                },
                url: {
                    required: true 
                },
                digits: {
                    required: true,
                    digits: true
                },
                creditcard: {
                    required: true,
                    creditcard: true 
                },
                phone: {
                    required: true,
                    phoneUS: true 
                },
                option: {
                    required: true
                },
                options: {
                    required: true,
                    minlength: 2,
                    maxlength: 4
                },
                memo: {
                    required: true,
                    minlength: 10,
                    maxlength: 100
                },

                checkbox: {
                    required: true
                },
                checkboxes: {
                    required: true,
                    minlength: 1,
                    maxlength: 2
                },
                radio: {
                    required: true
                }
            },
            
            //display error alert on form submit  
            invalidHandler: function(event, validator) {     
                var alert = $('#m_form_2_msg');
                alert.removeClass('m--hide').show();
                mApp.scrollTo(alert, -200);
            },

            submitHandler: function (form) {
                //form[0].submit(); // submit the form
            }
        });       
    
}
    return {
        // public functions
        init: function() {
            demo1(); 
            demo2(); 
        }
    };
}();

jQuery(document).ready(function() {    
    FormControls.init();
});