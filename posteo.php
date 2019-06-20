<!DOCTYPE html>
<html lang="es">

  <head>
    <title>Consultora Galeano</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="shortcut icon" href="assets/imagenes/logo/favicon.png" type="image/x-icon">
    <link rel="icon" href="assets/imagenes/logo/favicon.png" type="image/x-icon">
    <meta name="robots" content="index, follow" />
    <meta name="author" content="Consultora Galeano">
    <meta name="keywords" content="Contabilidad, consultores contables, contables, consultor, iva, irp, impuesto, irasi, paraguay, asuncion" />
    <meta name="description" content="Brindamos servicios contables personalizados de alto nivel técnico para la solución de necesidades de las empresas y la optimización de sus recursos." />
    <meta property="og:title" content="Consultora Galeano"/>
    <meta property="og:url" content="https://consultoragaleano.com.py">
    <meta property="og:image" content="https://consultoragaleano.com.py/assets/imagenes/bg/bgc.jpg"/>
    <meta property="og:site_name" content="Consultora Galeano"/>
    <meta property="og:description" content="Brindamos servicios contables personalizados de alto nivel técnico para la solución de necesidades de las empresas y la optimización de sus recursos."/>
    <link rel="stylesheet" href="assets/css/bundle.css">
    <link rel="stylesheet" href="assets/css/hody-icons.css">
    <link rel="stylesheet" href="assets/css/styles.css">
    <link rel="stylesheet" href="assets/css/estilo.css">
  </head>

  <body>
    <!-- Preloader-->
    <div id="loader">
      <div class="centrize">
        <div class="v-center">
          <div id="mask">
            <img src="assets/imagenes/etc/audio.svg" width="40" alt="">
          </div>
        </div>
      </div>
    </div>
    <!-- End Preloader-->
    <div id="wrapper">
       <div id="top-bar">
            <div class="container">
                <h4 class="top-horario" id="content_contactos_3"><i class="hc-time"></i></h4> 
                <h4 class="top-contacto" id="content_contactos_4"><i class="hc-call"></i></h4>
                <div class="menu-item">
                <!--<div class="header-socials">
                  <ul>
                    <li><a target="_blank" href="#"><i class="hc-facebook"></i></a>
                    </li>
                    <li><a target="_blank" href="#"><i class="hc-twitter"></i></a>
                    </li>
                    <li><a target="_blank" href="#"><i class="hc-instagram"></i></a>
                    </li>
                  </ul>
                </div>-->
                </div>
                <h4 class="top-email" id="content_contactos_5"></h4>
                
           </div>
        </div>
          <div id="clearBar"></div>
          <?php include 'assets/inc/navbar2.php' ?>
      <section class="page-title parallax-section">
        <div class="row-parallax-bg">
          <div class="parallax-wrapper">
            <div class="parallax-bg">
              <img src="" alt="imagen de fondo" id="post-img">
            </div>
          </div>
          <div class="parallax-overlay"></div>
        </div>
        <div class="centrize">
          <div class="v-center">
            <div class="container">
              <div class="single-post-info">
                <h6><span><i class="hc-clock"></i>Posteado el</span><span class="post-time" id="post-fecha"></span></h6>
                <div class="title text-center">
                  <h1 id="post-title"></h1>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="container">
          <div class="row">
            <div class="col-md-8 col-md-offset-2">
              <article class="post-single">
                <div class="post-body" id="post-body">
                  <!--body-->
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
      
      <?php include 'assets/inc/footer.php'; ?>
    </div>
   <script type="text/javascript" src="assets/js/jquery.js"></script>
    <script type="text/javascript" src="assets/js/bundle.js"></script>
    <script type="text/javascript" src="assets/js/SmoothScroll.js"></script>
    <script type="text/javascript" src="assets/js/jquery.mb.YTPlayer.js"></script>
    <script type="text/javascript" src="assets/js/main.js"></script>
    <script type="text/javascript" src="assets/js/content.js"></script>
  
    <script>
      $(document).ready(function(){
        const url = new URL(location.href);
        const id = url.searchParams.get('id');

        getContent(id);
        
      });
    </script>
  </body>

</html>