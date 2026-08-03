const books=[
{name:"Java Programming",author:"Herbert Schildt",price:699,qty:0},
{name:"Python Programming",author:"Eric Matthes",price:799,qty:0},
{name:"Database Management System",author:"Abraham Silberschatz",price:499,qty:0},
{name:"Data Structures",author:"Narasimha Karumanchi",price:599,qty:0},
{name:"Operating System",author:"Galvin",price:649,qty:0},
{name:"Computer Networks",author:"Forouzan",price:699,qty:0},
{name:"Web Development",author:"Jon Duckett",price:799,qty:0}
];

const GST=0.05;

function increaseQty(index){
books[index].qty++;
document.getElementById(`qty${index}`).innerText=books[index].qty;
}

function decreaseQty(index){
if(books[index].qty>0){
books[index].qty--;
document.getElementById(`qty${index}`).innerText=books[index].qty;
}
}

function generateBill(){

var customerName=document.getElementById("customerName").value.trim();
var mobileNumber=document.getElementById("mobileNumber").value.trim();
let coupon=document.getElementById("couponCode").value.trim().toUpperCase();
const payment=document.getElementById("paymentMethod").value;

if(customerName==""||mobileNumber==""){
alert("Please enter customer details.");
return;
}

let subtotal=0;
let rows="";

for(let i=0;i<books.length;i++){
if(books[i].qty>0){
let total=books[i].qty*books[i].price;
subtotal+=total;
rows+=`
<tr>
<td>${books[i].name}</td>
<td>${books[i].qty}</td>
<td>₹${books[i].price}</td>
<td>₹${total.toFixed(2)}</td>
</tr>
`;
}
}

if(subtotal===0){
alert("Please select at least one book.");
return;
}

let storeDiscount=0;
if(subtotal>999){
storeDiscount=subtotal*0.05;
}
let couponDiscount=0;

if(coupon==="BOOK10"){
couponDiscount=(subtotal-storeDiscount)*0.10;
}
else if(coupon==="SAVE50" && subtotal>=500){
couponDiscount=50;
}

let amount=subtotal-storeDiscount-couponDiscount;
let gst=amount*GST;
let finalAmount=amount+gst;
let delivery=0;

if(finalAmount<500){
delivery=50;
}
finalAmount+=delivery;
const bill={
billNo:Math.floor(Math.random()*9000)+1000,
date:new Date().toLocaleDateString(),
customerName,
mobileNumber,
payment,
subtotal,
storeDiscount,
coupon,
couponDiscount,
gst,
delivery,
finalAmount
};

const{
billNo,
date
}=bill;
document.getElementById("billSection").style.display="block";

document.getElementById("billSection").innerHTML=`
<h2>📚 SHOPPY BOOK STORE</h2>

<p><strong>Bill No :</strong> ${billNo}</p>
<p><strong>Date :</strong> ${date}</p>
<p><strong>Customer :</strong> ${customerName}</p>
<p><strong>Mobile :</strong> ${mobileNumber}</p>
<p><strong>Payment :</strong> ${payment}</p>

<table>
<tr>
<th>Book</th>
<th>Qty</th>
<th>Price</th>
<th>Total</th>
</tr>
${rows}
</table>

<h3>Bill Summary</h3>

<table>
<tr>
<td>Subtotal</td>
<td>₹${subtotal.toFixed(2)}</td>
</tr>

<tr>
<td>Store Discount</td>
<td>- ₹${storeDiscount.toFixed(2)}</td>
</tr>

<tr>
<td>Coupon (${coupon===""?"None":coupon})</td>
<td>- ₹${couponDiscount.toFixed(2)}</td>
</tr>

<tr>
<td>GST (5%)</td>
<td>₹${gst.toFixed(2)}</td>
</tr>

<tr>
<td>Delivery Charge</td>
<td>${delivery===0?"FREE":"₹50.00"}</td>
</tr>

<tr>
<th>Final Amount</th>
<th>₹${finalAmount.toFixed(2)}</th>
</tr>
</table>
`;

alert(`Thank You for shopping with us,
Visit Again `);
}
function saveBill(){
if(document.getElementById("billSection").innerHTML===""){
alert("Please preview the bill first.");
return;
}
window.print();
}