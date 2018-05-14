/*
/
/    ##############################
/    /user/ module specific scripts
/    ##############################
/
*/

$(window).ready(function(){
    $('#password').hideShowPassword({
        innerToggle: true,
        touchSupport: Modernizr.touch,
        initEvent: 'password-toggle',
        toggle: {
            className: 'password-toggle'
        },
        className: 'password-show-hide',
        states: {
            shown: {
                className: 'password-toggle-shown',
                changeEvent: 'password-shown',
                props: { type: 'text' },
                toggle: {
                    className: 'password-toggle-hide',
                    content: 'Hide',
                    attr: {
                        'aria-pressed': 'true',
                        title: 'Hide Password'
                    }
                }
            },
            hidden: {
                className: 'password-toggle-hidden',
                changeEvent: 'password-hidden',
                props: { type: 'password' },
                toggle: {
                    className: 'password-toggle-show',
                    content: 'Show',
                    attr: {
                        'aria-pressed': 'false',
                        title: 'Show Password'
                    }
                }
            }
        }

    });

    /* alert-boxes jump to specific url */
    $('.alert-box-jump-away').click(function(){
       window.location.href = $(this).data('target');
    })

});