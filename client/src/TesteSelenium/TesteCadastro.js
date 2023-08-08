

const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function teste() {
  
      async function waitForElement(driver, selector) {
        await driver.wait(until.elementLocated(selector), 10000);
      }

    //Configurando o driver do selenium para usar o navegador chrome
        const options = new chrome.Options();
        options.addArguments('--start-maximized');//iniciar maximizado em tela cheia
        const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();//Defini para usar o navegador chrome
      
        try {
            await driver.get('http://localhost:3000/Register');
        
            await driver.findElement(By.id('floatingInput')).sendKeys('Usuario');
            await driver.findElement(By.id('floatingInputFullName')).sendKeys('UsuarioTeste');
            await driver.findElement(By.id('floatingInputEmail')).sendKeys('usuarioteste@teste.com');
            await driver.findElement(By.id('floatingPassword')).sendKeys('1234');

            await driver.sleep(1500)


            // Submete o formulário
            const button =  await driver.findElement(By.css('.text-light'))
            await driver.executeScript('arguments[0].click();', button);


            await driver.sleep(1500)

            // Aguarda até que a URL atual contenha a URL de redirecionamento após o cadastro
            //await driver.wait(until.urlContains('http://localhost:3000/'), 15000);
    
            // Verificar se foi redirecionado para a página inicial
            // await driver.wait(until.urlIs('http://localhost:3000/login'), 1000);

            

            if (await driver.wait(until.urlIs('http://localhost:3000/'), 1000)) {
              console.log(driver.getCurrentUrl());
                console.log('Cadastro realizado com sucesso e redirecionado para a página correta.');
              } else {
                console.log('Cadastro não redirecionado como esperado.');
                console.log(driver.getCurrentUrl());
              }
          
            } catch (error) {
              console.error('Ocorreu um erro:', error);
            } finally {
              await driver.quit();
            }
        
    })();
    