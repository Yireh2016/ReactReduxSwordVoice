export default ({ body, title, initialState }) => {
  //aqui se introduce todo lo de SEO preferiblemente otra opcion es helmet pero en el server ojo
  return `
    <!DOCTYPE html>
    <html>
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
        <script>window.__PRELOADED_STATE__ = ${initialState}</script>
        <link href="https://fonts.googleapis.com/css?family=Work+Sans:100,200,300,400,500,600,700,800,900" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Sedgwick+Ave" rel="stylesheet">
        <title>${title}</title>
        <base href="/">
        <link href="index.css" rel="stylesheet">
      </head>
      
      <body>
        <div id="root">${body}</div>
      </body>





      <script src="bundle.js"></script>
    </html>
  `;
};
