export default ({body, title, styleTags}) => {
  //aqui se introduce todo lo de SEO preferiblemente otra opcion es helmet pero en el server ojo
  return `
    <!DOCTYPE html>
    <html>
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
       
        <link href="https://fonts.googleapis.com/css?family=Work+Sans:100,200,300,400,500,600,700,800,900" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Sedgwick+Ave" rel="stylesheet">
        <title>${title}</title>
        <base href="/">
        <link href="index.css" rel="stylesheet">
        ${styleTags}
      </head>
      
      <body>
        <div id="root">${body}</div>

      

      </body>





    </html>
  `
}
