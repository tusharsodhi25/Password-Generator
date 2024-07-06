
const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNUmber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn =  document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#Symbols");
const indicator = document.querySelector("[data-indicator]");
const generatebtn = document.querySelector(".generatebutton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


let password = "";
let passwordLength = 10;
let checkCount = 1;
// set strength circle color to gray
handleSlider();
setIndicator("#ccc");


// set passsword length
function handleSlider (){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText= passwordLength;
}

function setIndicator(color){
   indicator.style.backgroundColor = color;

}

function getRandomInteger(min,max){
    return Math.floor( Math.random() * (max-min)) + min;

}

function generateRandomNumber(){
    return getRandomInteger(0,9);
}

function generatelowerCase(){
    String.fromCharCode(getRandomInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRandomInteger(65,91));
}

function generateSymbol(){
    const randNum = getRandomInteger(0,symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;


    if(hasUpper && hasLower && (hasNum || hasSym)&& passwordLength >=8){
        setIndicator("#0f0");
    }else if(
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength >=6 ){
                 setIndicator("#ff0");
        } else{
            setIndicator("#f00");
        }
    }

    async function copyContent(){
          try{

            await navigator.clipboard.writeText(passwordDisplay.value);
             copyMsg.innerText = "copied";
          }

          catch(e){    
            copyMsg.innerText = "Failed";
          }

          copyMsg.classList.add("active");

          setTimeout(() => {
            copyMsg.classList.remove("active");
          }, 2000);
    }


    function shufflePassword(array){
       // fisher yates method

      for(let i =array.length-1;i>0;i--){
        const j = Math.floor(Math.random()* (i+1));
        const temp =array[i];
        array[i] = array[j];
        array[j] = temp;
      }

      let str = "";
      array.forEach((el)=>(str+=el));
      return str;

    }
    
    function handleCheckBoxChange(){
        checkCount =0;
        allCheckBox.forEach((checkbox)=>{
            if(checkbox.checked)
            checkCount++;
        });

        //special condition
        if(passwordLength<checkCount){
            passwordLength = checkCount;
            handleSlider();
        }
    }


    allCheckBox.forEach((checkbox)=>{
        checkbox.addEventListener('changr',handleCheckBoxChange);
    })

    inputSlider.addEventListener('input',(e) =>{
        passwordLength = e.target.value;
        handleSlider();
    })

    copyBtn.addEventListener('click', ()=>{
        if(passwordDisplay.value)
        copyContent();
    })

    generatebtn.addEventListener('click', ()=>{
        if(checkCount ==0 )
         return;
        if(passwordLength<checkCount){
            passwordLength = checkCount;
            handleSlider();
        }

       

        password = "";

        // if(uppercaseCheck.checked){
        //     password+= generateUpperCase();
        // }

        // if(lowercaseCheck.checked){
        //     password+= generatelowerCase();
        // }


        // if(numbersCheck.checked){
        //     password+= generateRandomNumber();
        // }

        // if(symbolsCheck.checked){
        //     password+= generateSymnol();
        // }

        let funArr = [];
        if(uppercaseCheck.checked){
            funArr.push(generateUpperCase);
        }


        if(lowercaseCheck.checked){
            funArr.push(generatelowerCase);
        }


        if(numbersCheck.checked){
            funArr.push(generateRandomNumber);
        }


        if(symbolsCheck.checked){
            funArr.push(generateSymbol);
        }

        for(let i =0;i<funArr.length;i++){
            password += funArr[i]();
        }

        for(let i=0;i<passwordLength-funArr.length;i++){
            let randomIndex = getRandomInteger(0,funArr.length);
            console.log(randomIndex);
            password+=funArr[randomIndex]();
        }

        password = shufflePassword(Array.from(password));
        passwordDisplay.value = password;

        calcStrength();
    });

