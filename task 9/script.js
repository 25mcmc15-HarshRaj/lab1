// JSON Structure
const formStructure = {
    fields: [
        { type: "text", label: "Name", id: "name" },
        { type: "email", label: "Email", id: "email" },
        { type: "password", label: "Password", id: "password" },
        { 
            type: "select", 
            label: "Country", 
            id: "country",
            options: ["Select", "USA", "India", "UK"]
        },
        {
            type: "select",
            label: "Role",
            id: "role",
            options: ["Select", "Student", "Employee"]
        }
    ]
};

let passwordStrengthDiv;

$(document).ready(function(){

    buildForm();

    // Country change logic
    $(document).on("change", "#country", function(){
        let country = $(this).val();

        if(country === "USA"){
            $("#usaStateDiv").show();
            $("#indiaStateDiv").hide();
        }
        else if(country === "India"){
            $("#indiaStateDiv").show();
            $("#usaStateDiv").hide();
        }
        else{
            $("#usaStateDiv, #indiaStateDiv").hide();
        }
    });

    // Role change logic
    $(document).on("change", "#role", function(){
        let role = $(this).val();

        if(role === "Student"){
            $("#collegeDiv").show();
            $("#companyDiv").hide();
        }
        else if(role === "Employee"){
            $("#companyDiv").show();
            $("#collegeDiv").hide();
        }
        else{
            $("#collegeDiv, #companyDiv").hide();
        }
    });

    // Password strength
    $(document).on("keyup", "#password", function(){
        checkPasswordStrength($(this).val());
    });

    $(document).on("click", "#submitBtn", function(){
        validateForm();
    });

});


// 🔹 Dynamic Form Builder
function buildForm(){

    let form = $("<form></form>");

    formStructure.fields.forEach(function(field){

        let div = $("<div class='form-group'></div>");
        div.append("<label>"+field.label+"</label>");

        if(field.type === "select"){

            let select = $("<select id='"+field.id+"'></select>");
            field.options.forEach(function(option){
                select.append("<option>"+option+"</option>");
            });

            div.append(select);

        } else {
            div.append("<input type='"+field.type+"' id='"+field.id+"'>");
        }

        div.append("<span class='error'></span>");
        form.append(div);
    });

    // Password strength display
    passwordStrengthDiv = $("<div id='passwordStrength'></div>");
    form.append(passwordStrengthDiv);

    // USA State
    form.append(`
        <div id="usaStateDiv" class="form-group" style="display:none;">
            <label>State (USA)</label>
            <select id="usaState">
                <option>Select</option>
                <option>California</option>
                <option>Texas</option>
            </select>
            <span class="error"></span>
        </div>
    `);

    // India State
    form.append(`
        <div id="indiaStateDiv" class="form-group" style="display:none;">
            <label>State (India)</label>
            <select id="indiaState">
                <option>Select</option>
                <option>Telangana</option>
                <option>Maharashtra</option>
            </select>
            <span class="error"></span>
        </div>
    `);

    // College field
    form.append(`
        <div id="collegeDiv" class="form-group" style="display:none;">
            <label>College Name</label>
            <input type="text" id="college">
            <span class="error"></span>
        </div>
    `);

    // Company field
    form.append(`
        <div id="companyDiv" class="form-group" style="display:none;">
            <label>Company Name</label>
            <input type="text" id="company">
            <span class="error"></span>
        </div>
    `);

    form.append("<button type='button' id='submitBtn'>Submit</button>");

    $("#formContainer").append(form);
}


// 🔹 Password Strength Checker
function checkPasswordStrength(password){

    let strength = 0;

    if(password.length >= 6) strength++;
    if(/[A-Z]/.test(password)) strength++;
    if(/[0-9]/.test(password)) strength++;
    if(/[^A-Za-z0-9]/.test(password)) strength++;

    let message = "";

    if(strength <= 1) message = "Weak";
    else if(strength == 2) message = "Medium";
    else message = "Strong";

    passwordStrengthDiv.text("Password Strength: " + message);
}


// 🔹 Validation
function validateForm(){

    $(".error").text("");
    let isValid = true;

    let name = $("#name").val();
    let email = $("#email").val();
    let password = $("#password").val();
    let country = $("#country").val();
    let role = $("#role").val();

    if(name === ""){
        $("#name").next(".error").text("Name required");
        isValid = false;
    }

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        $("#email").next(".error").text("Valid email required");
        isValid = false;
    }

    if(password.length < 6){
        $("#password").next(".error").text("Minimum 6 characters");
        isValid = false;
    }

    if(country === "Select"){
        $("#country").next(".error").text("Select country");
        isValid = false;
    }

    if(role === "Select"){
        $("#role").next(".error").text("Select role");
        isValid = false;
    }

    if(country === "USA" && $("#usaState").val() === "Select"){
        $("#usaState").next(".error").text("Select state");
        isValid = false;
    }

    if(country === "India" && $("#indiaState").val() === "Select"){
        $("#indiaState").next(".error").text("Select state");
        isValid = false;
    }

    if(role === "Student" && $("#college").val() === ""){
        $("#college").next(".error").text("Enter college name");
        isValid = false;
    }

    if(role === "Employee" && $("#company").val() === ""){
        $("#company").next(".error").text("Enter company name");
        isValid = false;
    }

    if(isValid){
        alert("Form Submitted Successfully!");
    }
}