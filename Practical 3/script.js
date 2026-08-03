function validatePassword() {

    let password = document.getElementById("password").value;

    let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]{8,}$/;

    if (pattern.test(password)) {
        alert("Password Verified Successfully!");
        document.getElementById("marksSection").style.display = "block";
    }
    else {
        alert("Invalid Password!\n\nPassword should contain:\n\n• Minimum 8 characters\n• One Uppercase Letter\n• One Lowercase Letter\n• One Number\n• One Special Symbol");
        document.getElementById("marksSection").style.display = "none";
    }

}

function getGrade(mark) {

    if (mark < 50)
        return "F";
    else if (mark <= 65)
        return "C";
    else if (mark <= 80)
        return "B";
    else if (mark <= 90)
        return "A";
    else
        return "A+";

}

function calculateResult() {

    let name = document.getElementById("name").value;
    let prn = document.getElementById("prn").value;

    let dbms = Number(document.getElementById("dbms").value);
    let js = Number(document.getElementById("js").value);
    let cn = Number(document.getElementById("cn").value);
    let cc = Number(document.getElementById("cc").value);
    let mes = Number(document.getElementById("mes").value);

    if (dbms > 100 || js > 100 || cn > 100 || cc > 100 || mes > 100 ||
        dbms < 0 || js < 0 || cn < 0 || cc < 0 || mes < 0) {

        alert("Please enter marks between 0 and 100.");
        return;

    }

    document.getElementById("m1").innerHTML = dbms;
    document.getElementById("m2").innerHTML = js;
    document.getElementById("m3").innerHTML = cn;
    document.getElementById("m4").innerHTML = cc;
    document.getElementById("m5").innerHTML = mes;

    document.getElementById("g1").innerHTML = getGrade(dbms);
    document.getElementById("g2").innerHTML = getGrade(js);
    document.getElementById("g3").innerHTML = getGrade(cn);
    document.getElementById("g4").innerHTML = getGrade(cc);
    document.getElementById("g5").innerHTML = getGrade(mes);

    let total = dbms + js + cn + cc + mes;

    let percentage = (total / 500) * 100;

    document.getElementById("total").innerHTML =
    "Student Name : " + name +
    "<br>PRN Number : " + prn +
    "<br><br>Total Marks : " + total + " / 500";

    document.getElementById("percentage").innerHTML =
    "Percentage : " + percentage.toFixed(2) + "%";

    if (dbms < 35 || js < 35 || cn < 35 || cc < 35 || mes < 35) {

        document.getElementById("result").innerHTML = "❌ RESULT : FAIL";
        document.getElementById("result").style.color = "red";

        alert("Sorry! You have Failed.");

    }
    else {

        document.getElementById("result").innerHTML = "✅ RESULT : PASS";
        document.getElementById("result").style.color = "green";

        alert("🎉 Congratulations! You Passed.");

    }

}