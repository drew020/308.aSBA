/* 
AI Summerized My Code
------------------------------------------------------------------------------------------

Constants and Variables:

v_local_api_magicthegathering and v_local_api_yugioh: These variables hold local file paths for XML files.
v_api_magicthegathering and v_api_yugioh: These variables hold URLs for APIs.
v_response and v_data: These variables are declared to store response and parsed JSON data from API requests.
v_select, v_previous, v_next, and v_img: These variables represent various HTML elements retrieved by their IDs.
v_selected_card: This variable is initialized to store the index of the selected card.
------------------------------------------------------------------------------------------

Promise Creation (f_fetch):

A Promise is created to fetch data from the local API (v_local_api_magicthegathering).
The fetched data is processed inside .then() blocks.
If there is an error during fetching, it's caught using .catch() and logged.
------------------------------------------------------------------------------------------

f_populate_selector Function:

This function populates the <select> element (v_select) with options based on the fetched data.
It loops through the v_data.cards array and creates an <option> element for each card's name.
If the card doesn't have an image URL, it adds a placeholder option with the text 'NO_IMAGE'.
------------------------------------------------------------------------------------------

f_display_card Function:

This function is triggered when an option is selected from the <select> element.
It retrieves the index of the selected option and updates the displayed image (v_img) with the corresponding card's image URL.
------------------------------------------------------------------------------------------

f_button Function:

This function is triggered when either the "NEXT" or "PREVIOUS" button is clicked.
It updates the displayed image (v_img) based on the direction of the button click and the current selection.
It handles cases where there's no image URL available for the selected card or when trying to go beyond the available cards.
------------------------------------------------------------------------------------------

Event Listeners:

Event listeners are attached to the <select> element (v_select) for the change event, and to the "NEXT" and "PREVIOUS" buttons for the click event.
------------------------------------------------------------------------------------------
*/

/* 
------------------------------------------------------------------------------------------

Detailed Break down of Fetch process with promise - AI Summerized

Promise Creation (f_fetch):

This function creates a Promise called f_fetch which is used to fetch data from an API endpoint.
It starts by logging a message indicating that the promise has started.
Then it makes a fetch request to v_local_api_magicthegathering.
The fetch request returns a Promise, which is handled using .then() and .catch() methods.
Inside the first .then() block, the response is checked for its status. If it's not okay (status other than 200), an error is thrown.
If the response is okay, it proceeds to parse the response as JSON and stores it in v_response.
The parsed data is then logged, resolved with resolve(data), and stored in v_data.
If there's an error during fetching or parsing, it's caught in the .catch() block and logged.
The f_fetch promise is returned.
------------------------------------------------------------------------------------------

f_populate_selector Function:

This function populates the <select> element (v_select) with options based on the fetched data.
It starts by logging a message indicating that the function has started.
Then it loops through each card object in the v_data.cards array.
For each card, it checks if it has an image URL (card.imageUrl is not undefined).
If it has an image URL, it creates an <option> element with the card's name as text content and adds it to the <select> element.
If the card doesn't have an image URL, it creates an <option> element with the text 'NO_IMAGE' as both value and text content, and adds it to the <select> element.
Finally, it logs a message indicating that the function has ended.
------------------------------------------------------------------------------------------

f_display_card Function:

This function is triggered when an option is selected from the <select> element.
It starts by preventing the default behavior of the event (form submission).
Then it checks if the selected option's text content is not 'NO_IMAGE'.
If it's not 'NO_IMAGE', it retrieves the index of the selected option.
It then gets the corresponding card's image URL from v_data.cards array using the index and updates the src attribute of v_img element with the URL.
If there's an error during this process, it's caught and logged.
------------------------------------------------------------------------------------------
*/
// import { clear, createCarouselItem, appendCarousel } from "./Carousel.js";
// import { clear, createCarouselItem, appendCarousel } from "./Carousel.js";
// import { f, createCarouselItem, appendCarousel } from "./Carousel.js";

const v_local_api_magicthegathering = `./src/MGTGxml.xml`
const v_local_api_yugioh = `./src/YGOxml.xml`
const v_api_magicthegathering = `https://api.magicthegathering.io/v1/cards`;
const v_api_yugioh = `https://db.ygoprodeck.com/api/v7/cardinfo.php`;

let v_response;
let v_data;

const v_select = document.getElementById("card-select");
const v_previous = document.getElementById("previous");
const v_next = document.getElementById("next");

const v_img = document.getElementById("image"); // Corrected to getElementsByClassName

let v_selected_card = 0;

const f_fetch = new Promise((resolve, reject) => {
    console.log(`f_fetch has STARTED.`);

    fetch(v_local_api_magicthegathering)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return v_response = response.json();

        })
        .then(data => {
            console.log(data); // Log the fetched data
            resolve(data); // Resolve the promise with the fetched data
            v_data = data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            reject(error); // Reject the promise with the error
        });
});

f_fetch.then(data => {
    console.log(`f_fetch has ENDED. Data is obtained`);
    // Assuming f_populate_selector is defined somewhere
    if (data !== undefined) {
        f_populate_selector(data);
    }
}).catch(error => {
    console.error('Data not obtained:', error.message);
});

const f_populate_selector = async () => {
    console.log(`f_populate_Selector has STARTED.`)
    for (let card of v_data.cards) { // corrected loop
        if (card.imageUrl != undefined) {
            const l_name = card.name;
            const l_option_element = document.createElement(`option`);
            l_option_element.setAttribute("value", l_name.toLowerCase());
            l_option_element.textContent = l_name;
            v_select.appendChild(l_option_element);
        }
        else {
            const l_name = 'NO_IMAGE';
            const l_option_element = document.createElement(`option`);
            l_option_element.setAttribute("value", l_name.toLowerCase());
            l_option_element.textContent = l_name;
            v_select.appendChild(l_option_element);
        }
    }
    console.log(`f_populate_Selector has ENDED.`)
}

const f_display_card = async (event) => {
    // Stops initial behavior
    event.preventDefault();
    if (event.target.textContent != 'NO_IMAGE') {
        const l_index = event.target.selectedIndex;
        const l_pic_url = v_data.cards[l_index].imageUrl; // corrected accessing selected card
        try {
            v_img.setAttribute("src", l_pic_url); // corrected attribute setting
            v_selected_card = l_index;
        } catch (error) {
            console.error(error);
        };

        console.log(`card index: ${l_index - 1}`)
    }
}

function f_button(event) {
    event.preventDefault();

    if (event.target.textContent == 'NEXT') {
        if (v_select.children.length > v_selected_card) {
            v_selected_card++;
        } try {
            if (v_data.cards[v_selected_card].imageUrl) {
                let l_pic_url = v_data.cards[v_selected_card].imageUrl; // corrected accessing selected card
                v_img.setAttribute("src", l_pic_url); // corrected attribute setting
                console.log(`Next Pressed:`)
            } else {
                if (v_select.children.length > v_selected_card) {
                    v_selected_card++;
                }
                let l_pic_url = v_data.cards[v_selected_card].imageUrl; // corrected accessing selected card
                v_img.setAttribute("src", l_pic_url); // corrected attribute setting
                console.log(`Next Pressed:`)
            }

        } catch (error) {

        }

    }
    else {
        if (0 < v_selected_card) {
            v_selected_card--;
        }
        try {
            if (v_data.cards[v_selected_card].imageUrl) {
                let l_pic_url = v_data.cards[v_selected_card].imageUrl; // corrected accessing selected card
                v_img.setAttribute("src", l_pic_url); // corrected attribute setting
                console.log(`Previous Pressed:`)
            }
            else {
                if (0 < v_selected_card) {
                    v_selected_card--;
                }
                let l_pic_url = v_data.cards[v_selected_card].imageUrl; // corrected accessing selected card
                v_img.setAttribute("src", l_pic_url); // corrected attribute setting
                console.log(`Previous Pressed:`)
            }
        } catch (error) {

        }

    }

    console.log(v_selected_card)

}

const f_clear_image = _ => {
    //
}

// Attach event listener
v_select.addEventListener('change', f_display_card);
v_next.addEventListener('click', f_button);
v_previous.addEventListener('click', f_button);