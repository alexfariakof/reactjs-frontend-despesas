if (typeof TextEncoder === 'undefined') {
    const { TextEncoder, TextDecoder } = require('util');
    global.TextEncoder = TextEncoder;
    global.TextDecoder = TextDecoder;
}

const fs = require('fs');
const { JSDOM } = require('jsdom');

// Ler os arquivos de certificado e chave privada
const cert = fs.readFileSync('./certificate/ssl_certificate.pem', 'utf8');
const key = fs.readFileSync('./certificate/ssl_certificate_key.pem', 'utf8');

// Configurar as opções para o JSDOM
const jsdomOptions = {
    url: process.env.NODE_ENV === 'production' ? 'http://alexfariakof.com:42535/api' : 'http://alexfariakof.dev.com:42535/api',
    resources: 'usable',
    pretendToBeVisual: true,
    beforeParse(window) {
        Object.defineProperty(window, 'process', {
            value: {
                env: {
                    NODE_TLS_REJECT_UNAUTHORIZED: 0,
                },
            },
        });
        window.https = {
            certificate: cert,
            privateKey: key,
        };
        window.process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
    },
};

// Configurar o ambiente global com o JSDOM
const jsdomInstance = new JSDOM('', jsdomOptions);

global.document = jsdomInstance.window.document;
global.window = jsdomInstance.window;
global.navigator = jsdomInstance.window.navigator;
