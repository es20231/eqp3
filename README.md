## server
no diretório api/, crie o ambiente virtual
```powershell
py -3 -m venv .venv
```

ative o ambiente virtual
```powershell
.venv/Scripts/Activate
```

instale as dependências(flask,flask-cors)
```powershell
pip install -r requirements.txt
```

exporte a variável de ambiente
```powershell
$env:FLASK_APP = "\api\__init__.py"
```
execute a aplicação
```powershell
flask run
```
## client
no diretório client/
```powershell
yarn
```

```powershell
yarn start
```
