### Rodar o BD
sudo "docker-compose" up
### Rodar o server
npm run dev

### Rota Cadastro
-Mapeando a Rota(registration) da API
-Validação dos dados do obj userData pela biblioteca yup
-Geração de um id unico pela biblioteca uuid
-Conexão com o banco pra verificar se o email ja existe
-COnexão com o banco pra inserir o obj user na tabela users

### Rota Login
-Mapeando a Rota(login) da API
-Validacao dos dados do obj userData pela biblioteca yup
-Conexao com o banco pra verificar se: userData.email=email
-Conexao verificar se useData.password = password 
-Lembrando que o password do banco precisa ser discriptografado pra que senha comparada com a senha da pessoa, não sei se faz diferença, mas talvez o userData.password devesse ser encriptado ao invez
do proprio password do banco.



### Problemas no Desenvolvimento
### 1

-Problema no throw new Error
[ ] auth.controller.ts(12)
[ ] auth.servise.ts(18)