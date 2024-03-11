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

    console.log(`f_fetch has STARTED.`)
    try {
        v_response =  fetch(v_api_magicthegathering);
        v_data =  v_response.json();
        console.log(v_data);

        f_populate_selector();

        resolve(v_data);
    } catch (error) {
        console.log(`${this} has ended IN FAILURE. data is NOT obtained`);
        console.log(error);
        reject(new Error("Data not found")); // Operation failed

    }
    finally{
            console.log(`f_fetch has ENDED. data is obtained`);
    }
  });

// Fetch the data
// const  = new Promise async _ => {
//     console.log(`f_fetch has STARTED.`)
//     try {
//         v_response = await fetch(v_api_magicthegathering);
//         v_data = await v_response.json();
//         console.log(v_data);
//     } catch (error) {
//         console.log(`${this} has ended IN FAILURE. data is NOT obtained`);
//         console.log(error);
//         return;
//     }
//     console.log(`f_fetch has ENDED. data is obtained`);
//     f_populate_selector();
//     return v_data;
// }

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
f_fetch();

// Attach event listener
v_select.addEventListener('change', f_display_card);
v_next.addEventListener('click', f_button);
v_previous.addEventListener('click', f_button);