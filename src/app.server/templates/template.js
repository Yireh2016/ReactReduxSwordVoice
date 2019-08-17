export default ({
  body,
  scriptTags,
  linkTags,
  styleTags,
  initialState,
  seoID
}) => {
  //aqui se introduce todo lo de SEO preferiblemente otra opcion es helmet pero en el server ojo
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>SwordVoice.com</title>
      <meta charset="utf-8">
      <meta name="language" content="english"> 
      <meta http-equiv="content-type" content="text/html">
      <meta name="author" content="Jainer Muñoz">
      <meta name="designer" content="Jainer Muñoz">
      <meta name="publisher" content="SwordVoice.com">
      <meta name="no-email-collection" content="http://www.unspam.com/noemailcollection/">
      <meta name="copyright" content="SwordVoice">
      <meta name="reply-to" content="support@swordvoice.com">
      <meta name="distribution" content="global">
      
    
    
    
    
      <!--Search Engine Optimization Meta Tags-->
      <meta name="robots" content="index,follow">
      <meta name="revisit-after" content="7 days">
      <meta name="distribution" content="web">
      <meta name="robots" content="noodp">
    
      <!--http-equiv Tags-->
      <meta http-equiv="Content-Style-Type" content="text/css">
      <meta http-equiv="Content-Script-Type" content="text/javascript">



        <script>window.__PRELOADED_STATE__ = ${initialState}</script>
        <link href="https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Sedgwick+Ave" rel="stylesheet">
        <base href="/">
        ${linkTags}
        ${styleTags}
        
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=${seoID}"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${seoID}');
        </script>

      </head>
      
      <body>
        <div id="root">${body}</div>

      

      </body>





      ${scriptTags}
    </html>
  `;
};
