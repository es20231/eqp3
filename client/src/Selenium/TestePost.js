const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');


(async function Post() {
  // Configuração do driver Chrome
  const options = new chrome.Options();
  options.addArguments('--start-maximized');
  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

//   try {
//     await driver.get('http://localhost:3000/Register');

//     await driver.findElement(By.id('UserName')).sendKeys('Usuario');
//     await driver.findElement(By.id('UserFullName')).sendKeys('UsuarioTeste');
//     await driver.findElement(By.id('UserEmail')).sendKeys('usuarioteste@teste.com');
//     await driver.findElement(By.id('UserPassword')).sendKeys('1234');

//     await driver.sleep(1500)


//     // Submete o formulário
//     const buttonRegister =  await driver.findElement(By.id('ButtonRegister'))
    
//     buttonRegister.click();


//     await driver.sleep(1500)

    
// console.log("Registo Realizado com sucesso ")
  
//     } catch (error) {
//       console.error('Ocorreu um erro:', error);
//     }
//     //  finally {
//     //   await driver.quit();
//     // }

  try {


    // Abre a página
    await driver.get('http://localhost:3000/');

    // Preenche o formulário
    await driver.findElement(By.id('floatingInput')).sendKeys('Usuario');
    await driver.findElement(By.id('floatingPassword')).sendKeys('1234');

    // Submete o formulário
    const button = await driver.findElement(By.css('.w-100'))
    await driver.executeScript('arguments[0].click();', button);


    // Aguarde até que a URL atual contenha a URL do dashboard
    await driver.wait(until.urlContains('http://localhost:3000/private'), 10000)//Se for realizado o login com os dados corretos

    await driver.sleep(1000)
    // Verifique se a URL corresponde à URL do dashboard
    if (await driver.getCurrentUrl() === 'http://localhost:3000/private') {
      console.log('Redirecionado para o Dashboard.');
      console.log('Login bem-sucedido!');
    } else {
      console.log('Não redirecionado para o Dashboard.');
    }        // 


    // Fazer upload de uma foto

    const buttonUpload = await driver.findElement(By.id("buttonUploadImage"));
    await buttonUpload.click();




    const path = require('path');
    const imagePath = path.resolve(__dirname, './DataTest/test.jpg');

    const inputUploadImage = await driver.findElement(By.id("inputUploadImage"));
    inputUploadImage.sendKeys(imagePath);

    const buttonConfirmUpload = await driver.findElement(By.id("buttonConfirmUploadImage"));
    await buttonConfirmUpload.click();
    await driver.sleep(1000)

    // talvez pegar o toast de sucesso do upload pra verificar

    console.log('Upload da imagem realizado com sucesso.');

    //Postar a foto


    // await driver.wait(until.urlContains('http://localhost:3000/private') , 10000)    

    await driver.get('http://localhost:3000/Private');
    await driver.sleep(2000)



    // Localiza e cliqua no botão que abre o modal de postagem + nome da imagem
    const postButton = await driver.findElement(By.css('[id="post-test.jpg"]'));
    await postButton.click();

    // Aguarda até que o modal de postagem seja exibido
    await driver.wait(until.elementLocated(By.css('[id="Description-test.jpg"]')), 10000);



    // Preencha a descrição e escolha um filtro
    const descriptionInput = await driver.findElement(By.css('textarea'));
    await descriptionInput.sendKeys('MENINO NEY');
    await driver.sleep(1000)

    //    const filterSelect = await driver.findElement(By.id('ControlSelect'));
    //    await filterSelect.click();
    //    const invertFilterOption = await driver.findElement(By.css('option[value="invert"]'));
    //    await invertFilterOption.click();


    // Clique no botão "Aplicar Filtro"
    // const applyFilterButton = await driver.findElement(By.xpath('//button[contains(text(), "Aplicar Filtro")]'));
    // await applyFilterButton.click();



    // Clique no botão "Save Changes"
    const saveChangesButton = await driver.findElement(By.css('[id="SaveChanges-test.jpg"]'));
    await saveChangesButton.click();

    await driver.sleep(2000)


  

    //await driver.wait(until.urlContains('http://localhost:3000/DashboardPerfil'), 10000);


    console.log("Imagem postada com sucesso")


    //editar Perfil
    const EditProfile = await driver.findElement(By.css('[id="EditProfile"]'));
    await EditProfile.click();

    const OpenEditProfilePicture = await driver.findElement(By.css('[id="OpenEditProfilePicture"]'));
    await OpenEditProfilePicture.click();

    await driver.sleep(2000)

    

    // const path = require('path'); 
    // const imagePath = path.resolve(__dirname, './DataTest/test.jpg'); Selecionar a Imagem

    ////// Passando a Mesma imagem para o Perfil
    const SelectImageInput = await driver.findElement(By.css('[id="SelectImageInput"]'));
    await SelectImageInput.sendKeys(imagePath);

    await driver.sleep(2000)

  

    const ConfirmImageInput = await driver.findElement(By.id("ConfirmImageInput"));
    await ConfirmImageInput.click();
    await driver.sleep(1000)

    // Alterar Description
    await driver.findElement(By.id('ChangeUserDescription')).sendKeys('ChangeUserDescription');
    const ChangeUserDescriptionButton = await driver.findElement(By.id("ChangeUserDescriptionButton"));
    await ChangeUserDescriptionButton.click();
    await driver.sleep(1000)

    //Fechar
    const CloseModalEditProfile = await driver.findElement(By.id("CloseModalEditProfile"));
    await CloseModalEditProfile.click();
    await driver.sleep(1000)




    //await driver.sleep(5000)
    await driver.get('http://localhost:3000/TimeLine');
    await driver.sleep(2000)

    const LikePostButton = await driver.findElement(By.css('[id="LikePost-test.jpg"]'));
    await LikePostButton.click();

    await driver.sleep(2000)

    console.log("Like realizado com sucesso")
    //pode fazer a verificação de like 

    const CommentsPostTextArea = await driver.findElement(By.css('[id="CommentsPost-test.jpg"]'));
    await CommentsPostTextArea.sendKeys('boa MENINO NEY');
    await driver.sleep(2000)
    const CommentsPostButton = await driver.findElement(By.css('[id="SendCommentsPost-test.jpg"]'));
    CommentsPostButton.click()
    await driver.sleep(1000)

    console.log("Comentário realizado com sucesso")

    const ShowCommentsPostButton = await driver.findElement(By.css('[id="ShowComments-test.jpg"]'));
    ShowCommentsPostButton.click();
    await driver.sleep(2000);

    const LikeCommentPostButton = await driver.findElement(By.css('[id="LikePost-undefined"]'));
    await LikeCommentPostButton.click();
    await driver.sleep(2000);

    console.log("Like do Comentário realizado com sucesso")

    //await driver.sleep(5000)
    await driver.get('http://localhost:3000/Private');
    await driver.sleep(2000)

    // Deletar Post
    const DeletePostButton = await driver.findElement(By.css('[id="DeletePost-test.jpg"]'));
    DeletePostButton.click();
    await driver.sleep(3000)

    

    //Logout
    const LogoutButton = await driver.findElement(By.css('[id="LogoutButton"]'));
    LogoutButton.click();
    await driver.sleep(2500)


  } catch (error) {
    console.error('Ocorreu um erro:', error);
  } finally {
    // Fecha o navegador
    await driver.quit();
  }
})();

