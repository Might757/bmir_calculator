var wMethod = "kg"; var hMethod = "m";

function $(id) 
{
    return document.getElementById(id);
}

function calculate() 
{  
    let htmlOut = "";
    let weight = parseInt($("weight").value);
    let height = parseInt($("height").value);
    var rawHeight = $("height").value;
    let age = parseInt($("age").value);
    console.log("this is the weight: " + weight);
    console.log("this is the height: " + height);
    var errPopoverw = new bootstrap.Popover($("weight")); // weight popover
    var errPopoverh = new bootstrap.Popover($("height")); // height popover
    var errPopovera = new bootstrap.Popover($("age")); // height popover
    // Make popovers appear if number is not valid
    if (isNaN(weight) && !isNaN(height) && !isNaN(age)) 
    {
        errPopoverw.show();
        errPopoverh.dispose();
        errPopovera.dispose();
    } else if (isNaN(weight) && isNaN(height) && !isNaN(age))
    {
        errPopoverw.show();
        errPopoverh.show();
        errPopovera.dispose();
    } else if (isNaN(weight) && isNaN(height) && isNaN(age)) 
    {
        errPopoverw.show();
        errPopoverh.show();
        errPopovera.show();
    } else if (!isNaN(weight) && isNaN(height) && !isNaN(age))
    {
        errPopoverw.dispose();
        errPopoverh.show();
        errPopovera.dispose();
    } else if (!isNaN(weight) && !isNaN(height) && isNaN(age))
    {
        errPopoverw.dispose();
        errPopoverh.dispose();
        errPopovera.show();
    } else if (isNaN(weight) && !isNaN(height) && isNaN(age))
    {
        errPopoverw.show();
        errPopoverh.dispose();
        errPopovera.show();
    } else if (!isNaN(weight) && isNaN(height) && isNaN(age))
    {
        errPopoverw.dispose();
        errPopoverh.show();
        errPopovera.show();
    } else {
        errPopoverw.dispose();
        errPopoverh.dispose();
        errPopovera.dispose();


        //WEIGHT CONVERSION
        if ($("wMethod").value == "pound") 
        {
            console.log($("wMethod").value);
            console.log("wMethod before = " + weight);
            weight = weight / 2.2;
            console.log("wMethod after = " + weight);
        } 
        else if ($("wMethod").value == "stone") 
        {
            console.log($("wMethod").value);
            console.log("wMethod before = " + weight);
            weight = weight / 6.35029318;
            console.log("wMethod after = " + weight);
        }

        //HEIGHT CONVERSION
        // validate height separate, feet from inches
        else if ($("hMethod").value == "feetin") 
        {
            console.log($("hMethod").value);
            console.log("hMethod before = " + height);
            let feet = parseInt(rawHeight.charAt(0));
            let inches = parseInt(rawHeight.substring(2, 4));
            if (!isNaN(inches)) 
            {
                height = (feet * 30.48) + (inches * 2.54);
            }
            else
            {
                height = (feet * 30.48);
            }
            console.log("This is inches! " + inches);
            console.log("hMethod after = " + height);
        } else if ($("hMethod").value == "meters") 
        {
            height = rawHeight * 100;

        }

        let bmi = Math.round(((weight / height / height) * 10000) * 10) / 10; // BMI Formula = (weight / height / height) * 10000
        console.log("this is the BMI = " + bmi);


        let activity = $("activity").value;
        if ($("male").checked == true)  //MALE RADIO BUTTON PICKED
        {
            let bmr = (66 + (13.7 * weight) + (5 * height) - (6.8 * age)) * activity;

            $("formRow").remove();
            htmlOut += "<div class='col-12 col-lg-6 text-center align-self-end'>";
                htmlOut += "<div class='bmiBox text-center'>";
                    htmlOut += "<p class='bmiStyle'>You Body Mass Index is <span style='color: #863cab'>" + bmi + "</span>%.<p/>";
                    htmlOut += "<p class='bmiStyle'>You have a Basal Metabolic Rate of <h1 style='color: #863cab; font-weight: 900;'>" + bmr.toFixed(2) + "</h1><p/>";
                    htmlOut += "<button type='button' class='btn btn-primary resetButton mt-5' onclick='location.reload()'>TRY AGAIN</button>";
                htmlOut += "</div>";
            htmlOut += "</div>";
            htmlOut += "<div class='col-12 col-lg-6 text-center align-self-end'>";
                htmlOut += "<div class='bmirImg'>";
                    htmlOut += "<img src='./img/svg/ballperson.svg' style='width: 500px;'/>";
                htmlOut += "</div>";
            htmlOut += "</div>";
            $("bmiRow").innerHTML += htmlOut;
        } else //FEMALE RADIO BUTTON PICKED
        {
            let bmr = (655 + (9.6 * weight) + (1.8 * height) - (4.7 * age)) * activity;
            $("formRow").remove();
            htmlOut += "<div class='col-sm-12 col-md-6 col-lg-6 text-center align-self-end'>";
                htmlOut += "<div class='bmiBox text-center'>";
                    htmlOut += "<p class='bmiStyle'>You Body Mass Index is <span style='color: #863cab'>" + bmi + "</span>%.<p/>";
                    htmlOut += "<p class='bmiStyle'>You have a Basal Metabolic Rate of <h1 style='color: #863cab; font-weight: 900;'>" + bmr.toFixed(2) + "</h1><p/>";
                    htmlOut += "<button type='button' class='btn btn-primary resetButton mt-5' onclick='location.reload()'>TRY AGAIN</button>";
                htmlOut += "</div>";
            htmlOut += "</div>";
            htmlOut += "<div class='col-sm-12 col-md-6 col-lg-6 text-center align-self-end'>";
                htmlOut += "<div class='bmirImg'>";
                    htmlOut += "<img src='./img/svg/ballperson.svg' style='width: 500px;'/>";
                htmlOut += "</div>";
            htmlOut += "</div>";
            $("bmiRow").innerHTML += htmlOut;
        }

    }

}

function resetFields() 
{
    $("weight").value = "";
    $("height").value = "";
    $("age").value = "";
    $("activity").value = "1.2";
}

window.onload = function()
{
    AOS.init();
}