## Comando para gerar a imagem
docker build -t mingle-test-hosts:0.1 .

## Comando para subir o container
docker run -ti -p 4000:4000 mingle-test-hosts:0.1