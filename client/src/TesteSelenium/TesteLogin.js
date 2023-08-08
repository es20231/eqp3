const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function Login() {
  // Configuração do driver Chrome
  const options = new chrome.Options();
  options.addArguments('--start-maximized');
  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {
    // Abre a página
    await driver.get('http://localhost:3000/'); 

    // Preenche o formulário
    await driver.findElement(By.id('floatingInput')).sendKeys('Marcelo');
    await driver.findElement(By.id('floatingPassword')).sendKeys('1234');

    // Submete o formulário
    const button =  await driver.findElement(By.css('.w-100'))
    await driver.executeScript('arguments[0].click();', button);


    // Aguarde até que a URL atual contenha a URL do dashboard
    await driver.wait(until.urlContains('http://localhost:3000/private') , 10000)//Se for realizado o login com os dados corretos
 
    await driver.sleep(1000)




    // Verifique se a URL corresponde à URL do dashboard
    if (await driver.getCurrentUrl() === 'http://localhost:3000/private') {
    console.log('Redirecionado para o Dashboard.');
    console.log('Login bem-sucedido!');
    } else {
    console.log('Não redirecionado para o Dashboard.');
    }

  } catch (error) {
    console.error('Ocorreu um erro:', error);
  } finally {
    // Fecha o navegador
    await driver.quit();
  }
})();
