const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function Login() {
  // Configuração do driver Chrome
  const options = new chrome.Options();
  options.addArguments('--start-maximized');
  options.addArguments('--log-level=3')
  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {
    // Abre a página
    await driver.get('http://localhost:3000/'); 

    await driver.sleep(100)

    // Preenche o formulário
    await driver.findElement(By.id('floatingInput')).sendKeys('TesteSelenium');
    await driver.findElement(By.id('floatingPassword')).sendKeys('1234');

    // Submete o formulário
    const button =  await driver.findElement(By.css('.w-100'))
    await driver.executeScript('arguments[0].click();', button);


    // Aguarde até que a URL atual contenha a URL do dashboard
    await driver.wait(until.urlContains('http://localhost:3000/private') , 10000)//Se for realizado o login com os dados corretos
 
    await driver.sleep(100)

    // Verifique se a URL corresponde à URL do dashboard
    if (await driver.getCurrentUrl() === 'http://localhost:3000/private') {
    console.log('Redirecionado para o Dashboard.');
    console.log('Login bem-sucedido!');
    } else {
    console.log('Não redirecionado para o Dashboard.');
    }

    // fazer upload de uma foto

    const buttonUpload = await driver.findElement(By.id("buttonUploadImage"));
    await buttonUpload.click();   

    try{

      const path = require('path');
      const imagePath = path.resolve(__dirname, './dataTest/ImageTest/test.jpg');

      const inputUploadImage = await driver.findElement(By.id("inputUploadImage"));
      inputUploadImage.sendKeys(imagePath);

      const buttonConfirmUpload = await driver.findElement(By.id("buttonConfirmUploadImage"));
      await buttonConfirmUpload.click();

      // talvez pegar o toast de sucesso do upload pra verificar

      console.log('Upload da imagem realizado com sucesso.');

    } catch (error) { 
      console.log('Não foi possível fazer o upload da imagem.');
    }

    // fazer delete de uma imagem

    driver.sleep(1000);

    // try{
    //   const deleteButton = await driver.findElement(By.xpath('//*[@id="root"]/div[3]/div/div[1]/div[1]/div/div[2]/button[2]/img'));
    //   console.log(deleteButton);
    //   // const count = deleteButtons.length; 
    //   // const lastdeleteButtons = deleteButtons[count - 1];
    //   // await lastdeleteButtons.click();
    //   deleteButton.click();
    // } catch (error) { 
    //   console.log('Não foi possível fazer o delete da imagem.');
    // }

    // editar dados do perfil

    const buttonEditProfile = await driver.findElement(By.className("edit_perfil_name"));
    await buttonEditProfile.click(); // passar a imagem

    // colocar imagem de perfil

    const buttonUploadProfileImage = await driver.findElement(By.xpath("/html/body/div[3]/div/div/div[2]/button"));
    buttonUploadProfileImage.click();


    // sleep
    await driver.sleep(10000);
    
  } catch (error) {
    console.error('Ocorreu um erro:', error);
  } finally {
    // Fecha o navegador
    await driver.quit();
  }
})();
