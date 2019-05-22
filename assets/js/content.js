$(document).ready(function(){
    var api = 'https://consultoragaleano.com.py/api_public/';
    $.get(api+'api/v1/content', function(data){
        if(data.status == 'ok'){
            var content = data.data;
            
            //Servicios
            var html_servicios = '';
            content.servicios.forEach(servicio => {
                console.log(servicio.icono)
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

});

