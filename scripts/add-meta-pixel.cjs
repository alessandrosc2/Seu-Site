const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Fix the powershell typo if it exists
html = html.replace('`n  </head>', '\n</head>');

const pixelCode = `
    <!-- Meta Pixel Code -->
    <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1137808185571487');
    fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=1137808185571487&ev=PageView&noscript=1"
    /></noscript>
    <!-- End Meta Pixel Code -->
  </head>
`;

if (!html.includes('Meta Pixel Code')) {
  html = html.replace('</head>', pixelCode.trim() + '\n  </head>');
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('Meta Pixel installed.');
} else {
  console.log('Meta Pixel already installed.');
}
