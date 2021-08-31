document.getElementById('spinner').style.display = 'none';//spinner
const searchInput = document.getElementById('input-form');
const errorMessage = document.getElementById('error-message');
const searchError = document.getElementById('search-error');

document.getElementById('search-button').addEventListener('click', ()=>{

if(searchInput.value == 0){
        errorMessage.innerHTML =`<h4 class="text-white bg-danger rounded shadow-lg mx-auto w-50 p-2 text-center">Please search the food what you want !</h4>`
}
else{
    document.getElementById('spinner').style.display = 'block';
    errorMessage.style.display = "none";
    const searchValue = searchInput.value;
    const url = (`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
    fetch(url)
    .then(res => res.json())
    .then(data => displayMeals(data))
}
    
})

const displayMeals = data => {

document.getElementById('spinner').style.display = 'none';//spinner

if(data.meals == null){
    
    searchError.classList.add('search-error')
    searchError.innerHTML = `<div>
                             <p class="card-text">
                             Your search ---- <b>${searchInput.value}</b> --- did not match any of our set meal. Please enter a
                             correct name.
                             </p>
                             </div>`
}
else{   
    const itemParent = document.getElementById('items-container');
    itemParent.textContent = '';
    searchError.style.display = 'none';
    for(const meal of data.meals){
        const div = document.createElement('div');
        div.classList.add('card')
        div.innerHTML = `  
                        <img src="${meal.strMealThumb}" width="250px">
                        <h5 class="mt-2 px-2">Name: ${meal.strMeal}</h5>
                        <p class="px-2">${meal.strInstructions.slice(0,150)}</p>
                        <button class="btn-danger border-0 py-2" onclick=getDetails(${meal.idMeal})>See Details</button>`
        div.style.width = "250px"
        itemParent.appendChild(div);
    }
}
    searchInput.value = '';
}

// item details part
const getDetails = itemDetails => {
    
    const url = (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemDetails}`)
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data))
}

const displayDetails = item => {

    const itemDetails = document.getElementById('item-details');
    itemDetails.textContent = '';
    window.scrollTo(0,40);
    const div = document.createElement('div');
    div.classList.add('card')
    div.innerHTML = ` <img src="${item.meals[0].strMealThumb}" width="250px">
                     <h5 class="mt-2 px-2">Name of food: ${item.meals[0].strMeal}</h5>
                     <h5 class="px-2">Food area: ${item.meals[0].strArea}</h5>
                     <h6 class="ms-2">It needs to be done :</h6>
                     <ul>
                     <li>${item.meals[0].strIngredient1}</li>
                     <li>${item.meals[0].strIngredient2}</li>
                     <li>${item.meals[0].strIngredient3}</li>
                     <li>${item.meals[0].strIngredient4}</li>
                     <li>${item.meals[0].strIngredient5}</li>
                     <li>${item.meals[0].strIngredient6}</li>
                     <li>${item.meals[0].strIngredient7}</li>
                     <li>${item.meals[0].strIngredient8}</li>
                     <li>${item.meals[0].strIngredient9}</li>
                     <li>${item.meals[0].strIngredient10}</li>
                     <li>${item.meals[0].strIngredient11}</li>
                     <li>${item.meals[0].strIngredient12}</li>
                     </ul>
                     <button class="btn-danger border-0 py-2">Add to cart</button>`
    div.style.width ="250px"
    itemDetails.appendChild(div)
}

