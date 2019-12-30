

//listen for submit

document.getElementById('form-group').addEventListener('submit', function(e){
    
    e.preventDefault();

    //hide results
    document.querySelector('#results').style.display = 'none';

    //show Loader
    document.querySelector('#loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

});

function calculateResults(){
    // e.preventDefault();

    // ui vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');


    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / ( x - 1);

    if (isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2); 
        document.querySelector('#results').style.display = 'block';
        document.querySelector('#loading').style.display = 'none';


    }else{
        showError('Please check your inputs');
    }

}


function showError(message){
    document.querySelector('#loading').style.display = 'none';

    //create div
    const errorDiv = document.createElement('div');

    //get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //add class
    errorDiv.className = `alert alert-danger`;

    //create text node and append to div
    errorDiv.appendChild(document.createTextNode(message));

    //insert error above heading
    card.insertBefore(errorDiv, heading);

    // clear error after 3 sec
    setTimeout(() => {
        document.querySelector('.alert-danger').remove();
    }, 3000);

}