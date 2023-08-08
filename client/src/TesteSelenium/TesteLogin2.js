const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function Login2() {
  // Configuração do driver Chrome
  const options = new chrome.Options();
  options.addArguments('--start-maximized');
  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {
    // Abre a página
    await driver.get('http://localhost:3000/'); 

    // Preenche o formulário com dados incorretos
    await driver.findElement(By.id('floatingInput')).sendKeys('Marcelo');
    await driver.findElement(By.id('floatingPassword')).sendKeys('124');

    // Submete o formulário
    const button =  await driver.findElement(By.css('.w-100'))
    await driver.executeScript('arguments[0].click();', button);


   //Busca a mensagem de erro
    await driver.wait(
      until.elementLocated(By.xpath('//div[contains(text(), "dados errados")]')),
      10000
    );
    await driver.sleep(1000)


    // Verifica se o login foi bem-sucedido
    const errorMessage = await driver.findElements(By.xpath('//div[contains(text(), "dados errados")]'));

    if (errorMessage.length > 0) {
      console.log('Erro ao fazer login: dados incorretos.');
    } else {
      console.log('Não foi possível determinar o resultado do teste.');
    }
  } catch (error) {
    console.error('Ocorreu um erro:', error);
  } finally {
    // Fecha o navegador
    await driver.quit();
  }
})();
