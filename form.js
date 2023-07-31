const formBody = document.querySelector(".formBody");


function formOptions() {
    let formOptions = {
      email: {
        formRequirementValue: "Email",
        inputType: "email",
        requirements: "Email format must contain 'userEmailName' followed by @ and a valid URL domain. E.g: JohnSmith@gmail.com"
      },
      country: {
        formRequirementValue: "Country",
        inputType: "text",
        requirements: "Country should only contain letters and spaces."
      },
      zipCode: {
        formRequirementValue: "Zip Code",
        inputType: "text",
        requirements: "Zip code should be exactly 7 characters long, follow the pattern letter/digit/letter/space/digit/letter/digit. E.g: L3P 0Y9"
      },
      password: {
        formRequirementValue: "Password",
        inputType: "password",
        requirements: "Password should be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, and one number. E.g: Testing123&"
      },
      passwordConfirmation: {
        formRequirementValue: "Password Confirmation",
        inputType: "password",
        requirements: "Password Confirmation should be equal to Password."
      }
    };
    return formOptions;
}

  function createFormInput(formOption, inputType) {
    // Create a wrapper div for the input and label
    let inputWrapper = document.createElement("div");
    inputWrapper.classList.add("inputWrapper");
    inputWrapper.id = formOption.formRequirementValue;

    // Create the label element
    let label = document.createElement("label");
    label.textContent = `(Required) - ${formOption.formRequirementValue}:`;
    label.setAttribute("for", formOption.formRequirementValue);

    // Create the input element
    let input = document.createElement("input");
    input.classList.add("invalid");
    input.setAttribute("type", inputType);
    input.setAttribute("name", formOption.formRequirementValue);
    input.setAttribute("id", `form${formOption.formRequirementValue}`);
    input.setAttribute("placeholder", `Enter a value for: ${formOption.formRequirementValue}`);

    // Create user input feedback message
    let inputFeedbackMessage = document.createElement("h5");
    inputFeedbackMessage.classList.add("inputFeedbackMessage");
    inputFeedbackMessage.id = `${formOption.formRequirementValue}Feedback`;
    inputFeedbackMessage.textContent = `Please enter your ${formOption.formRequirementValue}, in the input field above!`

        // Append the label and input to the wrapper
        inputWrapper.appendChild(label);
        inputWrapper.appendChild(input);
        inputWrapper.appendChild(inputFeedbackMessage);


    // Add the "required" attribute to make the input field mandatory
    input.setAttribute("required", "");

    // Add the event listener that handles the form validation
    input.addEventListener('blur', function() {
        let isValid = validateForm(formOption, this.value);
    
        if (isValid) {
            this.classList.remove('invalid');
            this.classList.add('valid');
            inputFeedbackMessage.textContent = `${formOption.formRequirementValue} is valid.`;
        } else {
            this.classList.remove('valid');
            this.classList.add('invalid');
            inputFeedbackMessage.textContent = `The value entered is invalid. ${formOption.requirements}`; // Show the requirements
        }
    });



    return inputWrapper;
}

function createSubmitButton () {
    let submitButton = document.createElement("button");
    submitButton.classList.add("submitButton")
    submitButton.textContent = "Submit";
    submitButton.setAttribute("type", "submit");

    return submitButton;
}

function validateForm(formOption, inputValue) {
    let isValid = false;

    switch(formOption.formRequirementValue) {
        case 'Country':
            // Country should only contain letters and spaces
            let countryRegex = /^[a-zA-Z\s]*$/;
            isValid = countryRegex.test(inputValue);
            break;
        case 'Zip Code':
            // Zip code should be exactly 7 characters long, follow the pattern letter/digit/letter/space/digit/letter/digit. E.g: L3P 0Y9
            let zipCodeRegex = /^[a-zA-Z]\d[a-zA-Z]\s\d[a-zA-Z]\d$/;
            isValid = zipCodeRegex.test(inputValue);
            break;
        case 'Password':
            // Password should be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, and one number.  E.g: Testing123
            let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            isValid = passwordRegex.test(inputValue);
            break;
        case 'Password Confirmation':
            // Password Confirmation should be equal to Password.
            let password = document.getElementById('formPassword').value;
            isValid = inputValue === password;
            break;
        case 'Email':
            // Email format validation. E.g: JohnSmith@gmail.com
            let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            isValid = emailRegex.test(inputValue);
            break;
        default:
            console.error('Invalid form option');
    }
    return isValid;
}

function isFormValid() {
    // Select all input fields in the form
    let inputs = document.querySelectorAll('input');

    // Iterate over each input field
    for (let i = 0; i < inputs.length; i++) {
        // Check if the input field has the 'valid' class
        if (!inputs[i].classList.contains('valid')) {
            // If it does not have the 'valid' class, return false
            return false;
        }
    }

    // If all input fields have the 'valid' class, return true
    return true;
}


function generateFormContent () {

    
    // Define the Form Input Value Options as "formOptionValues"
    let formOptionValues = formOptions();

    // Create the Form Element
    let formContent = document.createElement("form");
    formContent.classList.add("formContent");
    formContent.name ="TOPFormExample";

    // Create the Form Title and Append to Form
    formContentHeader = document.createElement("h2");
    formContentHeader.textContent = "Form Validation Exercise";
    formContentHeader.classList.add("formContentHeader");
    formContent.appendChild(formContentHeader);


    // Generate the Form Inputs using "formOptionValues" 
    for (let key in formOptionValues) {
        let formValue = createFormInput(formOptionValues[key], formOptionValues[key].inputType);
        formContent.appendChild(formValue);
    }

    // Create Submit Button Container
    let submitButtonContainer = document.createElement("div");
    submitButtonContainer.classList.add("submitButtonContainer");
    formContent.appendChild(submitButtonContainer)

    // Create the Submit Button
    let submitButton = createSubmitButton();
    submitButton.addEventListener('click', function(event) {
        if(!isFormValid()) {
            event.preventDefault();
            alert("Form is Invalid!");
        } else {
            event.preventDefault();
            console.log("High Five Buddy!");
        }
    });
    submitButtonContainer.appendChild(submitButton)

    // Append the Form Element to the formBody div
    formBody.appendChild(formContent);
}

document.addEventListener('DOMContentLoaded', function() {
    generateFormContent();
});