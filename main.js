class Calculator {
    constructor(inputArray, value){
        this.inputArray = inputArray;
        this.value = value;
        this.inputArray = [];
        this.value = 0;
        this.prevArray = null;
        this.validNumbers = /[0-9]/;
        this.validOperators = /[\+\-\*\x\X\/\/]/;

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

        if(calc.inputArray.length === 0 && calc.value.match(calc.validNumbers)){
            num1 = parseFloat(this.value);
            calc.value = num1;
            calc.inputArray.push(num1);
            $('.calculatorValue').val(num1);
        } else if (calc.inputArray.length === 0 && calc.value.match(calc.validOperators)){
            operator = this.value;
            calc.inputArray = [0];
            calc.inputArray.push(operator);
            calc.value = 0;
            $('.calculatorInput').val(calc.inputArray.join(""));
        } else if (calc.inputArray.length === 1 && calc.value.match(calc.validOperators)){
            operator = this.value;
            calc.inputArray.push(operator);
            calc.value = calc.inputArray[0];
            $('.calculatorInput').val(calc.inputArray.join(""));
        } else if (calc.inputArray.length === 2 && calc.value.match(calc.validNumbers)){
            num2 = parseFloat(this.value);
            calc.value = num2;
            calc.inputArray.push(num2);
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
                calc.value = num1 + num2;
                break;
            case '-':
                calc.value = num1 - num2;
                break;
            case '*':
            case 'x':
            case 'X':
                calc.value = num1 * num2;
                break;
            case '/':
                calc.value = num1 / num2;
        }

        calc.prevArray = calc.inputArray;
        $('.calculatorInput').val(calc.inputArray.join(""));
        $('.calculatorValue').val(calc.value);

        console.log('evaluate was called');
    }
}

const calc = new Calculator();

$(document).ready(calc.initialize);
