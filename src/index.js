const v_local_api_magicthegathering = `./src/MGTGxml.xml`
const v_local_api_yugioh = `./src/YGOxml.xml`
const v_api_magicthegathering = `https://api.magicthegathering.io/v1/cards`;
const v_api_yugioh = `https://db.ygoprodeck.com/api/v7/cardinfo.php`;

let v_response;
let v_data;

const v_select = document.getElementById("card-select");
const v_img = document.getElementById("image"); // Corrected to getElementsByClassName

let v_selected_card;

// Fetch the data
const f_fetch = async _ => {
    console.log(`f_fetch has STARTED.`)
    try {
        v_response = await fetch(v_api_magicthegathering);
        v_data = await v_response.json();
        console.log(v_data);
    } catch (error) {
        console.log(`${this} has ended IN FAILURE. data is NOT obtained`);
        console.log(error);
        return;
    }
    console.log(`f_fetch has ENDED. data is obtained`);
    f_populate_selector();
    return v_data;
}

const f_populate_selector = async () => {
    console.log(`f_populate_Selector has STARTED.`)
    for (let card of v_data.cards) { // corrected loop
        const l_name = card.name;
        const l_option_element = document.createElement(`option`);
        l_option_element.setAttribute("value", l_name.toLowerCase());
        l_option_element.textContent = l_name;
        v_select.appendChild(l_option_element);
    }
    console.log(`f_populate_Selector has ENDED.`)
}

const f_display_card = async (event) => {
    // Stops initial behavior
    event.preventDefault();

    const l_index = event.target.selectedIndex +1;
    const l_pic_url = v_data.cards[l_index].imageUrl; // corrected accessing selected card
    try {
        v_img.setAttribute("src", l_pic_url); // corrected attribute setting
    } catch (error) {
        console.error(error);
    };
}

const f_clear_image = _ =>{
    //
}
f_fetch();

// Attach event listener
v_select.addEventListener('change', f_display_card);