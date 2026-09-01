function reverseString() {
    let str = document.getElementById("stringInput").value;

    if (str.trim() === "") {
        document.getElementById("reverseResult").innerHTML =
            "Please enter a string.";
        return;
    }

    let reversed = str.split("").reverse().join("");

    document.getElementById("reverseResult").innerHTML =
        "Reversed String: " + reversed;
}


function countVowels() {
    let paragraph = document.getElementById("paragraphInput").value;

    if (paragraph.trim() === "") {
        document.getElementById("vowelResult").innerHTML =
            "Please enter a paragraph.";
        return;
    }

    let vowels = paragraph.match(/[aeiouAEIOU]/g);

    let count = vowels ? vowels.length : 0;

    document.getElementById("vowelResult").innerHTML =
        "Number of Vowels: " + count;
}