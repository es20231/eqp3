# Djavú
![login screen](https://github.com/es20231/eqp3/assets/112213498/7a76b2f8-d09b-4318-9005-66a18c94ab16)
> Este é um projeto desenvolvido como parte da disciplina de Engenharia de Software II na Universidade Federal do Piauí (UFPI). Djavú é um clone do Instagram, ou seja, uma rede social de compartilhamento de fotos.
## 💻 Tecnologias utilizadas:
![Git](https://img.shields.io/badge/Git-E34F26?style=for-the-badge&logo=git&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![React](https://shields.io/badge/react-black?logo=react&style=for-the-badge)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)

## 🛠 Funcionalidades Principais
- Upload e postagem de fotos
- Sistema de Comentarios
- Sistema de Likes

## Baixando e Usando o Projeto
Para baixar o projeto bastar utilizar o comando:
```
git clone https://github.com/es20231/eqp3.git
```
Ou baixe o .zip pelo próprio do github
### Iniciando o servidor
- vá ao diretório ./api/, crie um ambiente virtual
```powershell
py -3 -m venv .venv
```
- Ative o ambiente virtual
```powershell
.venv/Scripts/Activate
```

- Instale as dependências 
```powershell
pip install -r requirements.txt
```

- Exporte a variável de ambiente
```powershell
$env:FLASK_APP = ".\api\__init__.py"
```
- Execute a aplicação
```powershell
flask run
```
## Iniciando a Aplicação
- No diretório ./client/ use:
```powershell
yarn --force
```
ou 

```powershell
npm clean-install 
```
- Em Seguida inicie a aplicação usando:
```powershell
yarn start
```

ou 

```powershell
npm start 
```

## Imagens do Projeto
> **Tela de Login**
![image](https://github.com/es20231/eqp3/assets/112213498/e706ce04-2673-4cdd-9fe8-49dfbff52645)
>
> **Home**
![image](https://github.com/es20231/eqp3/assets/112213498/66a24db2-14f3-4e55-a241-b8b7b98208e2)
>
> **Perfil**
![image](https://github.com/es20231/eqp3/assets/112213498/4033cc46-2ec3-487d-8afb-de6c0026ac37)

[⬆ Voltar ao topo](#Djavú)
