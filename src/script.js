let v_response;
let v_data;

//f_main();
f_fetch();

// JS Main Body
function f_main() {
}

// Fetch the data, 
const f_fetch = async _ => {
    console.log(`${this} has STARTED.`)

    try {
        v_response = await fetch();
        v_data = await v_response.json;
    } catch (error) {
        console.log(console.log(`${this} has ended IN FAILURE. data is NOT obtained`))
        console.log(error);
        return;
    }

    console.log(`${this} has ENDED. data is obtained`)

    return v_data;
}