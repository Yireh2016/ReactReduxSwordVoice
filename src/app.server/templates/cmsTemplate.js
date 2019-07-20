export default ({ title }) => {
  return `
    <!DOCTYPE html lang="en">
    <html>
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      
        <link href="https://fonts.googleapis.com/css?family=Work+Sans:100,200,300,400,500,600,700,800,900" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Sedgwick+Ave" rel="stylesheet">
        <title>${title}</title>
        <base href="/">
        <link href="cms/main.css" rel="stylesheet" />
        <script defer src="/cms/main.bundleCMS.js"></script>

      </head>
      
      <body>
        <div id="root"></div>
      </body>
      





     

    </html>
  `;
};
