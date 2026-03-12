//1
const colorRadios = document.querySelectorAll('#colorForm input[name="color"]');
colorRadios.forEach(radio => {
    radio.onchange = () => {
        document.body.style.backgroundColor = radio.value;
    };
});

//2
const hobbyCheckboxes = document.querySelectorAll('#hobbyForm input[type="checkbox"]');
const selectedHobbies = document.getElementById('selectedHobbies');

hobbyCheckboxes.forEach(chk => {
    chk.onchange = () => {
        const selected = Array.from(hobbyCheckboxes)
                              .filter(c => c.checked)
                              .map(c => c.value);
        selectedHobbies.textContent = selected.length ? selected.join(', ') : 'немає';
    };
});

//3
const countrySelect = document.getElementById('countrySelect');
const countryInfo = document.getElementById('countryInfo');

const countriesData = {
    'ukraine': 'Столиця: Київ, Населення: 41 млн',
    'usa': 'Столиця: Вашингтон, Населення: 331 млн',
    'japan': 'Столиця: Токіо, Населення: 125 млн'
};

countrySelect.onchange = () => {
    const value = countrySelect.value;
    countryInfo.textContent = countriesData[value] || 'Інформація про країну';
};

//4
const ratingRadios = document.querySelectorAll('#ratingForm input[name="rating"]');
const ratingMessage = document.getElementById('ratingMessage');

ratingRadios.forEach(r => {
    r.onchange = () => {
        ratingMessage.textContent = `Дякуємо за вашу оцінку: ${r.value}`;
    };
});

// bonus
const pizzaSelect = document.getElementById('pizzaSelect');
const sizeRadios = document.querySelectorAll('#pizzaForm input[name="size"]');
const toppingCheckboxes = document.querySelectorAll('#pizzaForm input[type="checkbox"]');
const pizzaPrice = document.getElementById('pizzaPrice');

const pizzaPrices = {
    "Маргарита": 120,
    "Пепероні": 140,
    "Чотири сири": 160
};

const sizePrices = {
    "Маленька": 50,
    "Середня": 100,
    "Велика": 150
};

function calculatePizzaPrice() {
    let price = 0;

    const pizzaType = pizzaSelect.value;
    price += pizzaPrices[pizzaType];

    const selectedSize = Array.from(sizeRadios).find(r => r.checked);
    if(selectedSize) price += sizePrices[selectedSize.value];

    const toppings = Array.from(toppingCheckboxes).filter(c => c.checked);
    price += toppings.length * 25;

    pizzaPrice.textContent = price;
}

pizzaSelect.onchange = calculatePizzaPrice;
sizeRadios.forEach(r => r.onchange = calculatePizzaPrice);
toppingCheckboxes.forEach(c => c.onchange = calculatePizzaPrice);