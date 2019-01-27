class Calculator {
    constructor(inputArray, value){
        this.inputArray = inputArray;
        this.value = value;
        this.inputArray = [];
        this.value = 0;

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
        $('.calculatorScreen').val(0);

        console.log('ClearAll was clicked');
    }

    clearEntry(e){
        console.log('Clear Entry clicked');
    }

    doMath(num1, num2, operator){
        calc.value = $(this).text();
        this.num1 = num1;
        this.num2 = num2;
        this.operator = operator;

        if(calc.inputArray.length === 0){
            num1 = this.value;
            calc.inputArray.push(num1);
        } else if (calc.inputArray.length === 1){
            operator = this.value;
            calc.inputArray.push(operator);
        } else if (calc.inputArray.length === 2){
            num2 = this.value;
            calc.inputArray.push(num2);
        }

        $('.calculatorScreen').val(calc.inputArray.join(""));

        console.log(this.value, ' was clicked');
    }

    evaluate(e){
        let operator = calc.inputArray[1];
        let num1 = parseInt(calc.inputArray[0]);
        let num2 = parseInt(calc.inputArray[2]);

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

        $('.calculatorScreen').val(calc.inputArray.join("") + " = " + calc.value);

        console.log('evaluate was called');
    }
}

const calc = new Calculator();

$(document).ready(calc.initialize);
