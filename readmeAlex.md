### Rodar o BD

sudo "docker-compose" up

### Rodar o server

npm run dev

### Rota Cadastro

-Mapeando a Rota(registration) da API
-Validação dos dados do obj userData pela biblioteca yup
-Geração de um id unico pela biblioteca uuid
-Conexão com o banco pra verificar se o email ja existe
-Encriptar a senha defina pela pessoa e mandar a senha pro banco.
-COnexão com o banco pra inserir o obj user na tabela users

### Rota Login

-Mapeando a Rota(login) da API
-Validacao dos dados do obj userData pela biblioteca yup
-Conexao com o banco pra verificar se: userData.email=email
-Conexao verificar se useData.password = password
-A senha recebida pelo user deve ser encriptada e comparada com a senha encriptada no banco

### Recuperação de Senha

-Mapeando a Rota(login) da API
-Validação do email
-Receber duas senhas do usuario
-Verificar se as senhas são iguais
-Encriptar e mandar a senha pro banco

### Problemas no Desenvolvimento

### 1

-Problema no throw new Error
[ ] auth.controller.ts(12)
[ ] auth.servise.ts(18)
