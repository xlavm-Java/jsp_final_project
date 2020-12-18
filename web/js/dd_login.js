$(document).ready(function() {
    $('title').html(desk_locale.login_title);

    $('.flags-login .dropdown-menu .flag').click(function(event) {
        if ($(this).data('code') == 'CL' && DIRECTORIO != 'app.dentidesk.cl') {
            document.location.href = 'http://app.dentidesk.cl/';
        } else if ($(this).data('code') == 'PE' && DIRECTORIO != 'app.dentidesk.pe') {
            document.location.href = 'http://app.dentidesk.pe/';
        } else if ($(this).data('code') == 'US' && DIRECTORIO != 'app.dentidesk.us') {
            document.location.href = 'http://app.dentidesk.us/?locale=en';
        } else if ($(this).data('code') != 'CL' && $(this).data('code') != 'PE' && DIRECTORIO != 'app.dentidesk.com') {
            document.location.href = 'http://app.dentidesk.com/?pais='+ $(this).data('code');
        } else {
            $('#flag_icon').attr('class', this.id.replace('_', ' '));
        }
    });

    $('#btn_login').on('click', function(event) {
        event.preventDefault();
        var usuario = $.trim($('#user-login').val());
        var pass    = $.trim($('#pass-login').val());
        if (usuario.length <= 0) {
            alert_principal('danger', desk_locale.login_error_username);
        } else if (pass.length <= 0) {
            alert_principal('danger', desk_locale.login_error_pass);
        } else if ($('#sucursal-login').html() !== undefined && $('#sucursal-login').val() === null) {
            alert_principal('danger', desk_locale.login_error_sucursal);
        } else {
            $('.ajax-loader').show();
            $.ajax({
                type     : 'post',
                dataType : 'json',
                url      : 'ajax/ajaxIndex.php',
                data : {
                    accion   : 'login_user',
                    usuario  : usuario,
                    pass     : pass,
                    sucursal : $('#sucursal-login').val()
                },
                success: function(data) {
                    if (data && data.error === undefined) {
                        if (data.cuenta_confirmada == 1) {
                            setCookie('sucursal_selected_'+ data.usuario, data.id_sucursal, 1);
                            alert_principal('success', desk_locale.login_success_login);
                            document.location.href = 'home.php';
                        } else if (data.email !== undefined && data.usuario !== undefined) {
                            document.location.href = 'msj_noconfirmado.php?email='+ data.email +'&user='+ data.usuario;
                        } else {
                            alert_principal('danger', desk_locale.login_error_login);
                        }
                    } else if (data.error == 'bloqueado') {
                        alert_principal('danger', desk_locale.login_error_bloqueado);
                    } else if (data.error == 'bloqueo') {
                        alert_principal('danger', sprintf(desk_locale.login_error_bloqueo, data.attempts));
                    } else if (data.error == 'error_usuario_clave') {
                        var intentos_txt = data.attempts <= 3 ? sprintf(desk_locale.login_error_intentos, data.attempts) : '';
                        alert_principal('danger', sprintf(desk_locale.login_error_usuario_clave, intentos_txt));
                    } else {
                        alert_principal('danger', desk_locale.login_error_login);
                    }
                },
                error: function(data) {
                    alert_principal('danger', desk_locale.login_error_login);
                },
                complete: function(data) {
                    $('.ajax-loader').hide();
                }
            });
        }
    });
});
