const gamemodeSelect = document.getElementById("gameModeSelect");
const mapSelect = document.getElementById("mapSelect");

const kothContent = document.getElementById("kothContent");
const payloadAndAtrtackDefendContent = document.getElementById("payloadAndAttackDefendContent");


const mapsByGameMode = {
    attackDefend: [
        'Altitude',
        'Brew',
        'Dustbowl',
        'Egypt',
        'Fortezza',
        'Gorge',
        'Gravelpit',
        'Haarp',
        'Hadal',
        'Hardwood',
        'Junction',
        'Mercenary Park',
        'Mossrock',
        'Mountain Lab',
        'Overgrown',
        'Snowplow',
        'Steel',
        'Sulfur',
    ],
    koth: [
        'Badlands',
        'Brazil',
        'Cachoeria',
        'Cascade',
        'Harvest',
        'Highpass',
        'Kong King',
        'Lakeside',
        'Lazarus',
        'Megaton',
        'Nucleus',
        'Overcast',
        'Probed',
        'Rotunda',
        'Sawmill',
        'Sharkbay',
        'Snowtower',
        'Suijin',
        'Viaduct',
    ],
    payload: [
        'Badwater',
        'Barnblitz',
        'Borneo',
        'Bread Space',
        'Camber',
        'Cashworks',
        'Embargo',
        'Emerge',
        'Enclosure',
        'Frontier',
        'Goldrush',
        'Hoodoo',
        'Odyssey',
        'Patagonia',
        'Phoenix',
        'Pier',
        'Rumford',
        'Snowycoast',
        'Swiftwater',
        'Thundermountain',
        'Upward',
        'Venice',
    ]
}


const numberOfCPPerMap = {
    'Altitude': 3,
    'Brew': 2,
    'Dustbowl': 6,
    'Egypt': 6,
    'Fortezza': 2,
    'Gorge': 2,
    'Gravelpit': 3,  // TODO: Special logic for Gravelpit
    'Haarp': 6,
    'Hadal': 4,  // TODO: Special logic
    'Hardwood': 3,
    'Junction': 3,
    'Mercenary Park': 3,
    'Mossrock': 2,
    'Mountain Lab': 3,
    'Overgrown': 2,
    'Snowplow': 6,
    'Steel': 5,  // TODO: Special logic
    'Sulfur': 4,

    'Badwater': 4,
    'Barnblitz': 4,
    'Borneo': 4,
    'Bread Space': 4,
    'Camber': 4,
    'Cashworks': 4,
    'Embargo': 4,
    'Emerge': 3,
    'Enclosure': 6,  // TODO: Not sure how many
    'Frontier': 4,
    'Goldrush': 7,
    'Hoodoo': 6,
    'Odyssey': 4,
    'Patagonia': 8,
    'Phoenix': 4,
    'Pier': 5,
    'Rumford': 3,
    'Snowycoast': 4,
    'Swiftwater': 5,
    'Thundermountain': 7,
    'Upward': 4,
    'Venice': 4
}


let currentMapList = [];

function updateMapList() {
    const selectedMode = gamemodeSelect.value;
    currentMapList = mapsByGameMode[selectedMode];

    mapSelect.innerHTML = "";

    currentMapList.forEach((optionText) => {
        const option = document.createElement("option");
        option.textContent = optionText;
        mapSelect.appendChild(option);
    })
}


function createTimeInputs(numberOfInputs) {
    let contentToInput = "";
     for (let i = 0; i < numberOfInputs; i++) {
        let timeContentBlock = `
        <div class="time-input">
            <label>Point ${i + 1}
                <input type="time">
            </label>
            <br>
            <label>RED held
                <input type="checkbox" name="redHeld">
            </label>
        </div>
         `

         contentToInput += timeContentBlock;
     }

     document.getElementById("payloadAndAttackDefendContent").innerHTML = contentToInput;
}


function addCheckBoxGroup() {
    const checkboxes = document.querySelectorAll('input[name="redHeld"]');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                checkboxes.forEach(cb => {
                    if (cb !== checkbox) cb.checked = false;
                });
            }
        });
    });
}


function updateTimeInputBasedOnMap() {
    const selectedMode = gamemodeSelect.value;

    // Stop showing any time inputs ...

    kothContent.classList.add("doNotShow");
    payloadAndAtrtackDefendContent.classList.add("doNotShow");

    if (selectedMode == "koth") {
        kothContent.classList.remove("doNotShow");

        return
    }

    payloadAndAtrtackDefendContent.classList.remove("doNotShow");

    const selectedMap = mapSelect.value;

    // If special logic for map --> Do this, then RETURN ...

    const numberOfCheckpoints = numberOfCPPerMap[selectedMap];

    createTimeInputs(numberOfCheckpoints);
    addCheckBoxGroup();
}


gamemodeSelect.addEventListener("change", function (e) {
    updateMapList();
    updateTimeInputBasedOnMap();
})


mapSelect.addEventListener("change", function (e) {
    updateTimeInputBasedOnMap();
})


// Init
updateMapList();
updateTimeInputBasedOnMap();
