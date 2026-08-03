function validateVehicle(){

const vehicle=document.getElementById("vehicleNo").value.trim();
const result=document.getElementById("result");

try{

if(vehicle==="")
throw"Vehicle Registration Number cannot be empty.";

if(vehicle.length!==10)
throw"Vehicle Registration Number must contain exactly 10 characters.";

if(!/^[A-Z]{2}/.test(vehicle))
throw"First two characters must be uppercase letters.";

if(!/^[A-Z]{2}[0-9]{2}/.test(vehicle))
throw"Third and fourth characters must be digits.";

if(!/^[A-Z]{2}[0-9]{2}[A-Z]{2}/.test(vehicle))
throw"Fifth and sixth characters must be uppercase letters.";

if(!/^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/.test(vehicle))
throw"Last four characters must be digits.";

result.className="success";
result.innerHTML="✅ Vehicle Registration Number is Valid.";

}
catch(error){

result.className="error";
result.innerHTML="❌ "+error;

}

}

function displayDateTime(){

const now=new Date();

const options={
weekday:"long",
year:"numeric",
month:"long",
day:"numeric"
};

document.getElementById("datetime").innerHTML=
now.toLocaleDateString("en-IN",options)+"<br>"+now.toLocaleTimeString("en-IN");

}