class Calculator {
    constructor(inputArray, input){
        this.inputArray = inputArray;
        this.inputArray = [];
        this.input = input;

        this.initialize = this.initialize.bind(this);
    }

    //jQuery selectors on event will call method.
    initialize(){
        $('.number').click(this.handleNumber);
        $('.clear').click(this.clearAll);
        $('.operator').click(this.handleOperator);
    }

    //Display inputArray on .calculatorScreen.
    display() {
        var result = calc.inputArray.join(" ");
        if (calc.inputArray.length === 0) {
          result = "0";
        }
        $(".calculatorScreen").val(result);

        console.log('display executed');
    }

    clearAll() {
        calc.input = undefined;
        calc.inputArray = [];
        calc.display();

        console.log('clearAll executed');
    }

    //First input is turned into a string and pushed to inputArray,
    //successive inputs are parameters for concatLastInput.
    handleNumber(input) {
        calc.input = input;

        if (typeof input !== 'string') {
            input = $(this).text();
            calc.input = input;
        }
        if (calc.isLastInputNum(calc.inputArray) || calc.inputArray[calc.inputArray.length - 1] === '.') {
            calc.concatLastInput(calc.inputArray, calc.input);
        } else {
            calc.inputArray.push(calc.input);
        }
        calc.display();

    }

    //Returns the inputArray and checks if last index in inputArray is a number.
    isLastInputNum(inputArray) {
        console.log('isLastInputNum executed');

        return inputArray && !isNaN(inputArray[inputArray.length - 1]);
    }

    //Takes the inputArray that has at least one number and concatenates value(input).
    concatLastInput(inputArray, value) {
        inputArray[inputArray.length - 1] += value;

        console.log('concatLastInput executed');
    }

    // Takes the input and pushes it to inputArray if there is a previous
    // input that is a number in inputArray, replaces the last inputArray input if it is a number.
    handleOperator(input) {
        if (calc.inputArray.length < 1) {
            return;
        }
        if (typeof input != 'string') {
            input = $(this).text();
            calc.input = input;
        }
        if (calc.isLastInputNum(calc.inputArray)) {
            calc.inputArray.push(input);
        } else {
            calc.replaceLastInput(calc.inputArray, calc.input);
        }
        calc.display();

        console.log('handleOperator executed');
    }

    //Replaces last index in inputArray with new value.
    replaceLastInput(inputArray, value) {
        inputArray[inputArray.length - 1] = value;

        console.log('replaceLastInput executed');
    }

}

const calc = new Calculator();

$(document).ready(calc.initialize);
