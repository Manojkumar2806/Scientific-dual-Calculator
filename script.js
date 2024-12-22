let bgContainer = document.getElementById("bg-container");
let inputContainer = document.getElementById("inputContainer");
let buttons = document.querySelectorAll("button");

let selectMode = document.getElementById("selectMode");
let normal = document.getElementById("numbers");
let scientific = document.getElementById("Scientific");

let head = document.getElementById("head");

let string = "";

let arr = Array.from(buttons);

scientific.style.display = "none";
selectMode.addEventListener("click", (e) => {
    if (e.target.value === "normal") {
        scientific.style.display = "none";
        normal.style.display = "block";
        head.textContent = "Simple Calculator";
    } else {
        normal.style.display = "none";
        scientific.style.display = "block";
        head.textContent = "Scientific Calculator";
    }
});

const scientificFunctions = {
    sin: (x) => Math.sin((x * Math.PI) / 180),
    cos: (x) => Math.cos((x * Math.PI) / 180),
    tan: (x) => Math.tan((x * Math.PI) / 180),
    cot: (x) => {
        const tanValue = Math.tan((x * Math.PI) / 180);
        return tanValue === 0 ? "Invalid Input" : 1 / tanValue;
    },
    log: (x) => (x <= 0 ? "Invalid Input" : Math.log10(x)),
    sqrt: (x) => (x < 0 ? "Invalid Input" : Math.sqrt(x)),
    PI: () => Math.PI,
    EXP: (x) => Math.exp(x),
};

arr.forEach((button) => {
    button.addEventListener("click", (e) => {
        const value = e.target.innerHTML;

        if (value === "=") {
            try {
                const processedString = string
                    .replace(/√/g, "sqrt") 
                    .replace(/(sqrt|sin|cos|tan|cot|log|EXP)\(([^)]+)\)/g, (match, func, arg) => {
                        const result = scientificFunctions[func](parseFloat(arg));
                        if (result === "Invalid Input") throw new Error("Invalid Input");
                        return result;
                    });

                string = eval(processedString);
                inputContainer.value = string;
            } catch (error) {
                inputContainer.value = "Error";
                string = "";
            }
        } else if (value === "AC") {
            string = "";
            inputContainer.value = "";
        } else if (value === "DEL") {
            string = string.substring(0, string.length - 1);
            inputContainer.value = string;
        } else if (value === "√") {
            string += "√("; 
            inputContainer.value = string;
        } else if (scientificFunctions[value]) {
            if (value === "PI") {
                string += scientificFunctions.PI();
            } else {
                string += value + "(";
            }
            inputContainer.value = string;
        } else if (value === ")") {
            string += ")";
            inputContainer.value = string;
        } else {
            string += value;
            inputContainer.value = string;
        }
    });
});
