## Comando para gerar a imagem
docker build -t mingle-test-hosts:0.1 .

## Comando para subir o container
docker run -ti -p 3000:3000 mingle-test-hosts:0.1