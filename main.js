class Calculator {
    constructor(inputArray, value){
        this.inputArray = inputArray;
        this.value = value;
        this.inputArray = [];
        this.value = 0;
        this.prevArray = null;
        this.validNumbers = /[-+]?[0-9]*\.?[0-9]+/;
        this.validOperators = /[\+\-\*\x\X\/\/]/;
        this.decimal = /\./; // Regex here? for line 127

        this.initialize = this.initialize.bind(this);
    }

    initialize(){
        console.log('Initialize called');

        $('.clear').click(this.clearAll);
        $('.clearEntry').click(this.clearEntry);
        $('.operator').click(this.doMath);
        $('.number').click(this.doMath);
        $('.decimal').click(this.doMath);
        $('.equalSign').click(this.evaluate);
        
    }

    clearAll(e){
        calc.inputArray = [];
        calc.value = 0;
        calc.prevArray = null;
        $('.calculatorInput').val("");
        $('.calculatorValue').val(0);

        console.log('ClearAll was clicked');
    }

    clearEntry(e){
        if(calc.inputArray.length - 1 > 0 && calc.inputArray[calc.inputArray.length - 1] !== 0 && calc.inputArray[0] !== calc.value && calc.prevArray === calc.inputArray) {

            calc.inputArray.splice(0, 1, 0);
            calc.value = calc.inputArray[0];            

            $('.calculatorInput').val(calc.inputArray.join(""));
            $('.calculatorValue').val(calc.value);

        } else if (calc.inputArray !== calc.prevArray) {
            calc.inputArray.pop();
            calc.value = 0;
            $('.calculatorValue').val(calc.value);
        } else if (calc.inputArray.length - 1 === 0){
            calc.inputArray = [0];
            calc.value = 0;
            
            $('.calculatorScreen').val(calc.value);
        }

        console.log('Clear Entry clicked');
    }

    doMath(num1, num2, operator){
        calc.value = $(this).text();
        this.num1 = num1;
        this.num2 = num2;
        this.operator = operator;
        let inputArrayNumbers = calc.validNumbers.test(calc.inputArray);
        let inputArrayOperators = calc.validOperators.test(calc.inputArray);
        let currentNumber = calc.validNumbers.test(calc.value);
        let currentOperator = calc.validOperators.test(calc.value);
        let lastIndexDecimal = calc.decimal.test(calc.inputArray[2]);
        
        if(calc.value === "." && !inputArrayOperators){
            calc.inputArray.push(calc.value);
            $('.calculatorValue').val(calc.inputArray.join(""));
        } else if (calc.value === "." && inputArrayOperators){
            calc.inputArray.push(calc.value);
            calc.value = calc.inputArray[2] + calc.value;
            calc.inputArray.splice(2, calc.inputArray.length, calc.value)
            $('.calculatorValue').val(calc.value);
        }
        if(!inputArrayOperators && currentNumber){
            if(calc.inputArray.includes(".")){
                calc.inputArray.push(calc.value);
                if(calc.value === "0"){
                    calc.inputArray.splice(0, calc.inputArray.length, calc.inputArray.join(""));
                    $('.calculatorValue').val(calc.inputArray);
                    return;
                }
                num1 = calc.inputArray.join("") * 1;
                calc.inputArray.splice(0, 3, num1);
                calc.value = num1;
                $('.calculatorValue').val(calc.value);
                return;
            }
            num1 = parseFloat(this.value);
            calc.inputArray.push(num1);
            calc.value = calc.inputArray.join("");
            calc.value = calc.value * 1;

            if(calc.inputArray.length > 1){
                num1 = "" + calc.inputArray[0] + calc.inputArray[1];
                num1 = parseFloat(num1);
                calc.inputArray.splice(0, 2, num1);
            }
            
            $('.calculatorValue').val(num1);
        } else if (calc.inputArray.length === 0 && currentOperator){
            operator = this.value;
            calc.inputArray = [0];
            calc.inputArray.push(operator);
            calc.value = 0;
            $('.calculatorInput').val(calc.inputArray.join(""));
        } else if (inputArrayNumbers && inputArrayOperators && currentOperator){
            operator = this.value;
            calc.inputArray.pop();
            calc.inputArray.push(operator);
            $('.calculatorInput').val(calc.inputArray.join(""));
        } else if (inputArrayNumbers && currentOperator){
            operator = this.value;
            calc.inputArray.push(operator);
            calc.value = calc.inputArray[0];
            $('.calculatorInput').val(calc.inputArray.join(""));
        } else if (inputArrayNumbers && inputArrayOperators && currentNumber && !isNaN(calc.value)){

            if(calc.inputArray.length === 3 && typeof calc.inputArray[2] === "string"){
                if(lastIndexDecimal){
                    calc.value = calc.inputArray[2] + calc.value;
                    calc.inputArray.splice(2, 2, calc.value);
                    $('.calculatorValue').val(calc.value);
                }
            }

            if(calc.value.includes(".")){
                return;
            }

            num2 = parseFloat(this.value);
            calc.value = num2;
            calc.inputArray.push(num2);

            if(calc.inputArray.length === 4){
                num2 = "" + calc.inputArray[2] + calc.inputArray[3];
                num2 = parseFloat(num2);
                calc.inputArray.splice(2, 2, num2);
            }


            $('.calculatorValue').val(num2);
        } else if (calc.inputArray.length === 3 && calc.inputArray === calc.prevArray) {
            num1 = parseFloat(this.value);
            calc.inputArray.splice(0, 1, num1);
            $('.calculatorValue').val(num1);
        }


        console.log(this.value, ' was clicked');
    }

    evaluate(e){

        if(calc.prevArray === calc.inputArray){ //operation repeat
            calc.inputArray[0] = calc.value;
        } else if (calc.inputArray.length === 2) {
            calc.inputArray.push(calc.value);
        }
        let operator = calc.inputArray[1];
        let num1 = parseFloat(calc.inputArray[0]);
        let num2 = parseFloat(calc.inputArray[2]);

        switch(operator){
            case '+':
                calc.value = (num1 * 10 + num2 * 10) / 10;
                break;
            case '-':
                calc.value =  (num1 * 10 - num2 * 10) / 10;
                break;
            case '*':
            case 'x':
            case 'X':
                calc.value =  ((num1 * 10) * (num2 * 10)) / 100;
                break;
            case '/':
                calc.value =  (num1 / num2 * 10) / 10;
        }

        calc.prevArray = calc.inputArray;
        $('.calculatorInput').val(calc.inputArray.join(""));
        $('.calculatorValue').val(calc.value);
        console.log("value: ", calc.value);
        console.log('evaluate was called');
    }
}

const calc = new Calculator();

$(document).ready(calc.initialize);
