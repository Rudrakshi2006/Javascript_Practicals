let movies = [
    "Avengers",
    "Superman",
    "Jurassic World",
    "F1",
    "Pushpa 2"
];

let prices = [
    180,
    250,
    320,
    450,
    200
];

let bookings = [];
window.onload = showPrice;

function showPrice(){

    let index = document.getElementById("movieSelect").value;

    document.getElementById("price").value = "₹ " + prices[index];

}

function addBooking(){

    let index = document.getElementById("movieSelect").value;
    let booking = {

        movie : movies[index],
        price : prices[index]

    };

    bookings.push(booking);
    displayBookings();
    document.getElementById("result").innerHTML =
    "✅ Booking Added Successfully!";
}

function displayBookings(){

    let text = "";
    if(bookings.length==0){
        text = "No bookings yet.";
    }

    else{
        bookings.forEach(function(item,i){
            text += (i+1)+". 🎬 "+item.movie+
            " - ₹"+item.price+"\n";
        });

    }
    document.getElementById("bookingList").innerText = text;

}

function removeBooking(){

    if(bookings.length==0){

        alert("No booking available!");

        return;

    }
    bookings.pop();
    displayBookings();
    document.getElementById("result").innerHTML =
    "❌ Last Booking Removed.";

}

function premiumMovies(){

    let premium = bookings.filter(function(item){
        return item.price > 300;
    });

    let text = "⭐ Premium Bookings\n\n";

    if(premium.length==0){
        text += "No Premium Movie Booked.";
    }

    else{
        premium.forEach(function(item){

            text += "🎬 "+item.movie+
            " - ₹"+item.price+"\n";

        });

    }
    document.getElementById("result").innerText = text;
}

function highestLowest(){
    if(bookings.length==0){

        document.getElementById("result").innerText =
        "No Bookings Available.";
        return;

    }

    let bookedPrices = [];
    bookings.forEach(function(item){
        bookedPrices.push(item.price);

    });

    let highest = Math.max(...bookedPrices);
    let lowest = Math.min(...bookedPrices);
    let highMovie = "";
    let lowMovie = "";
    bookings.forEach(function(item){
        if(item.price == highest){
            highMovie = item.movie;
        }

        if(item.price == lowest){
            lowMovie = item.movie;
        }

    });

    document.getElementById("result").innerText =
    "📈 Highest Booked Movie\n\n"+
    highMovie+" - ₹"+highest+

    "\n\n📉 Lowest Booked Movie\n\n"+
    lowMovie+" - ₹"+lowest;

}