var api = 'http://localhost:8000/';
// var api = 'https://consultoragaleano.com.py/api_public/';

$(document).ready(function(){
    
    $.get(api+'api/v1/content', function(data){
        if(data.status == 'ok'){
            var content = data.data;

            //Servicios
            var html_servicios = '';
            content.servicios.forEach(servicio => {
                html_servicios += `
                <div class="col-md-3 col-sm-6">
                    <div class="icon-box boxed-style" data-animation="fadeInRight">
                        <div class="animated-icon" data-icon="assets/images/${servicio.icono}" data-custom-color="#007aff"></div>
                        <div class="ib-content">
                        <h4>${servicio.titulo}</h4>
                        <p>${servicio.descripcion}</p>
                        </div>
                    </div>
                </div>
                `;
            });
            $('#content_servicios').html(html_servicios);


            //Clientes
            var html_clientes = '';
            content.clientes.forEach(cliente => {
                html_clientes += `
                <div class="carousel-item">
                    <figure>
                        <img src="${api}${cliente.url_img}" alt="logo de cliente">
                    </figure>
                </div>
                `;
            });
            $('#content_clientes').html(html_clientes);


            //Contactos
            var html_contactos_direccion = '';
            var html_contactos_horarios = '';
            var html_contactos_horarios2 = '<i class="hc-time"></i>';
            var html_contactos_telefonos = '';
            var html_contactos_telefonos2 = '<i class="hc-call"></i>';
            var html_contactos_correos = '';
            var html_contactos_correos2 = '';
            var flag_correos = true;
            content.contactos.forEach(contacto => {
                switch (contacto.tipo) {
                    case 'direccion':
                        html_contactos_direccion += contacto.detalle + '<br>';
                        break;
                    case 'horario':
                        html_contactos_horarios += contacto.detalle + '<br>';
                        html_contactos_horarios2 += contacto.detalle + ' ';
                        break;
                    case 'nro':
                        var tel = '';
                        if(contacto.detalle.charAt(0) == '0'){
                            tel = `href="tel:+595${contacto.detalle.substr(1).replace(/ /g, '')}"`;
                        }
                        html_contactos_telefonos += `<a ${tel} target="_blank" class="white-text">${contacto.detalle}</a><br>`;
                        html_contactos_telefonos2 += `<a ${tel}>${contacto.detalle}</a> `;
                        break;
                    case 'email':
                        html_contactos_correos += `<li> <a href="mailto:${contacto.detalle}" target="_blank" >${contacto.detalle}</a></li>`;
                        if(flag_correos){
                            html_contactos_correos2 = `<i class="hc-mail-alt"></i><a href="mailto:${contacto.detalle}">${contacto.detalle}</a>`
                            flag_correos = false;
                        }
                        break;
                    default:
                        break;
                }
            });
            $('#content_contactos_1').html(`
                <strong>Dirección:</strong> ${html_contactos_direccion}
                <strong>Horario:</strong> ${html_contactos_horarios}
                <strong>Teléfono: </strong> ${html_contactos_telefonos}
            `);
            $('#content_contactos_2').html(html_contactos_correos);
            $('#content_contactos_3').html(html_contactos_horarios2);
            $('#content_contactos_4').html(html_contactos_telefonos2);
            $('#content_contactos_5').html(html_contactos_correos2);

            mainFunctions.initVivus();
            mainFunctions.initSlick();
            mainFunctions.initAnimation();
        };
    });

    //Get noticias
    var global_desde = 1;
    getNoticias(true);

    $('#back_page_button').click(function(e){
        
        e.preventDefault();
        if (window.getSelection) {console.log('hika');window.getSelection().removeAllRanges();}
        else if (document.selection) {console.log('aaaa');document.selection.empty();}

        if(global_desde > 0){
            global_desde -= 3;
        }

        getNoticias();
    });

    $('#next_page_button').click(function(e){

        e.preventDefault();
        if (window.getSelection) {window.getSelection().removeAllRanges();}
        else if (document.selection) {document.selection.empty();}

        global_desde += 3;
        getNoticias();
    });

    //get noticias
    function getNoticias(first=false){
        $.get(api+`api/v1/content-noticias?desde=${global_desde}`, function(data){
            if(data.status == 'ok'){
                if(data.data.length == 0 && first){
                    $('#noticias').css('display', 'none');
                }

                var noticias = data.data
                var html_noticias = '';

                if(noticias.length > 0){
                    noticias.forEach(noticia => {
                        html_noticias += `
                        <article class="card-post">
                          <div class="card-post-wrapper">
                            <div class="card-post-image" style="background:url(${api}${noticia.img_portada})center center;background-size: cover;">
                              
                            </div>
                            <div class="card-post-content">
                              <div class="post-body">
                                <h3><a href="posteo.php?id=${noticia.id}">${noticia.titulo}</a></h3>
                                <p>${noticia.descripcion_corta.substr(0, 180)}...</p>
                              </div>
                              <div class="post-footer">
                                <h6><span><i class="hc-clock"></i><span class="post-time">${noticia.fecha_creacion}</span></span></h6>
                              </div>
                            </div>
                          </div>
                        </article>
                        `;
                    });
                    $('#content_noticias').html(html_noticias);
                }
            }
        });

    }

    //Send contact
    $('#form-contact').submit(function(e){
        e.preventDefault();

        var name = $('#contact-name').val();
        var email = $('#contact-email').val();
        var message = $('#contact-message').val();

        if(name.length === 0 || email.length === 0 || message.length === 0){
            setError('Debes completar todos los campos.');
            return false;
        }

        if(!isEmail(email)){
            setError('Favor ingresar un email valido.');
            return false;
        }

        //submit
        $.ajax({
            type: 'POST',
            url: api+'api/v1/contact',
            contentType: "application/json",
            data: JSON.stringify({
                contact: {
                    name: name,
                    email: email,
                    message: message
                }
            }),
            success: function(val){
                if(val.status == 'ok'){
                    successContact();
                }else{
                    errorContact();
                }
            },
            error: function(e){
                errorContact();
            }
        });
    });

    function successContact(){
        Swal.fire({
            title: 'Contacto enviado!',
            text: 'Nos estaremos comunicando por tu email.',
            type: 'success',
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000
        });
        $('#contact-name').val('');
        $('#contact-email').val('');
        $('#contact-message').val('');
    }

    function errorContact(){
        Swal.fire({
            title: 'Oopss!',
            text: 'Hubo un error al procesar el formulario.',
            type: 'error',
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000
        });
    }

    function setError(msg){
        $('#contact-error').html(msg);
        setTimeout(() => {
            $('#contact-error').html('');
        }, 3000);
    }

    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    $('#an-noticias').click(function(){
        $('#a-noticias').fadeOut();
    });
});

//get noticia content
function getContent(id){
    $.get(api+`api/v1/content-noticia/${id}`, function(data){
        if(data.status == 'ok'){
            const noticia = data.data;
            $('#post-fecha').html(noticia.fecha_creacion);
            $('#post-title').html(noticia.titulo);
            $('#post-creador').html(noticia.creador);
            $('#post-body').html(noticia.contenido);
            
            $('#content-img-portada').css({
                'background-image': "url('" + api + noticia.img_portada.replace('\\','/') + "')"
            });
            initParallax();
        }else{
            window.location.href = "index";
        }
    }).catch(e => window.location.href = "index");
}
