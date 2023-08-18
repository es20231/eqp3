const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function testLogoutButton() {
    // Configurando o driver do selenium para usar o navegador Chrome
    const options = new chrome.Options();
    options.addArguments('--start-maximized'); // Iniciar maximizado em tela cheia
    const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
   
    
try{
    
    // Abre a página
    await driver.get('http://localhost:3000/'); 

    // Preenche o formulário
    await driver.findElement(By.id('floatingInput')).sendKeys('aa');
    await driver.findElement(By.id('floatingPassword')).sendKeys('aa');

    // Submete o formulário
    const buttonLogin =  await driver.findElement(By.css('.w-100'))
    await driver.executeScript('arguments[0].click();', buttonLogin);

    await driver.sleep(1500)

    await driver.get('http://localhost:3000/Private'); // Abre a página onde o botão está localizado
    
    await driver.sleep(1500)

   // Encontra e clica no botão de logout
   const logoutButton = await driver.findElement(By.xpath('//button[contains(text(), "Sair")]'));
   await logoutButton.click();

    await driver.sleep(1500)


    // Aguarda até que a URL atual contenha a URL após o logout
    await driver.wait(until.urlContains('http://localhost:3000/'), 10000);

    await driver.sleep(1500)

    // Verifica se a URL corresponde à URL após o logout
    if (await driver.getCurrentUrl() === 'http://localhost:3000/') {
        console.log('Logout realizado com sucesso e redirecionado para a página correta.');
    } else {
        console.log('Logout não redirecionado como esperado.');
    }
    

}

catch (error) {
    console.error('Ocorreu um erro:', error);
} finally {
    // Fecha o navegador
    await driver.quit();
}


})();