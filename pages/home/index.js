const inputsColor = [...document.querySelectorAll("input[type=color]")];
const labelColor = [...document.querySelectorAll("label[class=grey-100]")];
const inputFontScale = document.querySelector("#fontScale");
const button__copy_styles = document.querySelector(".button-copy-colors");
const button__save_styles = document.querySelector(".button-save-colors");

/* Armazenando as cores definidas no site em um array: definedColors */
const createNewSetColors = () => {
  let definedColors = [];
  inputsColor.map((index) => {
    const inputValue = index.value
    definedColors.push(inputValue);
  });
  return definedColors
};

/* Criando string com as variáveis de cor para o CSS de acordo com as cores selecionadas no site */
const insertTextVar = () => {
  let listColors = '';
  createNewSetColors().map((style, index) => {
    const nodeValue = labelColor[index].attributes[0].nodeValue
    listColors += `--color-${nodeValue}: ${inputsColor[index].value = style};\n`;
  })
  return listColors
};

/* Armazenando os tamanhos de fontes definidas no site em um array: definedTypographySize; Transformando os valores do array em uma string com as variáveis de tamanho de fonte para o CSS */
const convertString = () => {
  let varCssFont = ''
  const definedTypographySize = inputFontScale.value

  const spliteString = definedTypographySize.split(',');
  const convertToNumber = spliteString.map((strIndex) => Number(strIndex));
  const convertRem = convertToNumber.map((num) => num / 16);
  convertRem.forEach((numRem, index) => varCssFont += `--font-size-${index + 1}: ${numRem}rem;\n`)

  return varCssFont
};

// Salvando os valores no localStorage
const saveValues = () => {
  localStorage.setItem('color', JSON.stringify(createNewSetColors()));

  const definedTypographySize = inputFontScale.value;
  const spliteString = definedTypographySize.split(',');
  localStorage.setItem('size', JSON.stringify(spliteString));
}

// Função para preencher os inputs com os valores do localStorage
const populateColorInputs = () => {
  const storedColorValues = localStorage.getItem('color');
  if (storedColorValues) {
    const parsedColorValues = JSON.parse(storedColorValues);
    inputsColor.forEach((input, index) => input.value = parsedColorValues[index]);

    const storedSizeValues = localStorage.getItem('size');
    if (storedSizeValues) {
      const parsedSizeValues = JSON.parse(storedSizeValues);
      inputFontScale.value = parsedSizeValues;
    }
  }
}

// Adicionando um evento de mudança para os inputs (Não precisa clicar no botão "Save Styles" para chamar a função "saveValues()")
inputsColor.forEach((input) => {
  input.addEventListener('change', saveValues);
});
inputFontScale.addEventListener('change', saveValues);

// Preenchendo os inputs com os valores do localStorage ao carregar a página
window.addEventListener('load', populateColorInputs)

/* Configurando botão para copiar variáveis do CSS */
button__copy_styles.addEventListener('click', (event) => {
  event.preventDefault();
  navigator.clipboard.writeText(insertTextVar() + convertString()).then(() => {
    button__copy_styles.innerText = "Copied";
    setTimeout(() => {
      button__copy_styles.innerText = 'Copy Styles';
    }, 3000);
  });
  /* imprimindo no console para testes: */  /* console.log(insertTextVar()); console.log(convertString()) */
});

button__save_styles.addEventListener('click', (event) => {
  event.preventDefault();

  saveValues();
  populateColorInputs();
  createNewSetColors();

  button__save_styles.innerText = "Saved";
  setTimeout(() => {
    button__save_styles.innerText = 'Save Styles';
  }, 3000);
});

