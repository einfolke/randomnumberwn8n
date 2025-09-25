#n8n Random – Serviço + Conector Custom -  ONFLY TESTE

Projeto com dois componentes principais:

⚡ randomnumberwn8n – serviço Fastify/TypeScript para gerar números aleatórios.

🔌 n8n-custom-random – conector n8n chamado Random com a operação True Random Number Generator (usa random.org).



---

📋 Requisitos

🐳 Docker Desktop

🟢 Node.js 20+ e npm (apenas se for desenvolver ou compilar localmente)



---

⚙️ Configuração

Crie um arquivo .env na raiz:

POSTGRES_USER=n8n
POSTGRES_PASSWORD=n8n
POSTGRES_DB=n8n
N8N_ENCRYPTION_KEY=<chave forte>
APP_PORT=4000

Gerar uma chave forte:

node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"


---

🚀 Subir com Docker

Na raiz do repositório:

docker compose build    # primeira vez ou após mudanças
docker compose up -d

Serviços disponíveis:

🌐 n8n UI → http://localhost:5678

🎯 Serviço Fastify → http://localhost:4000/random?min=1&max=10


> O conector custom é carregado automaticamente no n8n (menu Nodes → Random).




---

💻 Desenvolvimento local (opcional)

Compilar TypeScript no host:

# Serviço Fastify
cd randomnumberwn8n
npm install
npm run build   # gera dist/
npm start       # roda dist/server.js
cd ..

# Node custom n8n
cd n8n-custom-random
npm install
npm run build   # gera dist/ usado pelo n8n
cd ..


---

🧪 Testes

Se houver testes configurados:

# Serviço Fastify
cd randomnumberwn8n
npm test
cd ..

# Node custom
cd n8n-custom-random
npm test
cd ..


---

🗂️ Estrutura rápida

docker-compose.yml
.env
randomnumberwn8n/      ⚡ serviço Fastify
n8n-custom-random/     🔌 conector custom (montado em /home/node/.n8n/custom)


---

🎯 Uso no n8n

1. ➕ Crie um workflow e adicione o node Random.


2. 🔢 Preencha Min e Max.


3. ▶️ Execute → retorna:



{ "value": 17, "min": 1, "max": 60, "source": "random.org" }


---

Pronto! Em poucos comandos você tem n8n, Postgres, o serviço Fastify e o conector custom funcionando.
