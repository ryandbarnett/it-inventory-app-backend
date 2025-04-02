const campusData = {
    "Remote": {
        "Remote": []
    },
    "CentreTech": {
        "CAST": ["TBD"],
        "Classroom": [
            101, 102, 103, 104, 105, 106, 107, 112, 114,
            201, 202, 203, 204, 205, 209, 211, 212, 215, 214,
            301, 302, 304, 307, 309, 311, 312, 313, 314, 315,
            "207A", "207B"
        ],
        "Fine Arts": [100, 102, 104, 105, 101]
    },
    "Lowry": {
        "Lowry Studios": [
            100, 111, 121, 126, 129, 133, 134, 135, 136,
            142, 143, 144, 146, 147, 151, 152, 160,
            "100_Library", "109_High_Bay", "111_Screening_Room",
            "111B_50s_Cafe", "119_Cage_Equipment", "121_Studio_Stage",
            "126_Classroom_FVM", "129_Classroom_FVM", "133_Classroom_FVM",
            "134_Lab_FVM", "135_Lab_FVM", "136_Lab_FVM",
            "142_Conference_FVM", "143_Editing", "144_Editing",
            "147_Studio_Control_Suite", "151_Classroom_FVM", "Lowry_Studio_Lobby"
        ]
    }
};
  
// DOM Elements
const campusSelect = document.getElementById("campus");
const buildingSelect = document.getElementById("building");
const roomSelect = document.getElementById("room");
  
// Populate Building based on Campus
campusSelect.addEventListener("change", () => {
    const campus = campusSelect.value;
    resetDropdown(buildingSelect, "-- Select Building --");
    resetDropdown(roomSelect, "-- Select Room --");
  
    if (campus === "Remote") {
        // Auto-fill Building and disable both
        const remoteBuilding = "Remote";
        const option = document.createElement("option");
        option.value = remoteBuilding;
        option.textContent = remoteBuilding;
        option.selected = true;
        buildingSelect.appendChild(option);
        buildingSelect.disabled = true;
    
        // Room dropdown is empty but we'll show a default option
        const roomOption = document.createElement("option");
        roomOption.value = "";
        roomOption.textContent = "N/A";
        roomOption.selected = true;
        roomSelect.appendChild(roomOption);
        roomSelect.disabled = true;
    } else {
        buildingSelect.disabled = false;
        roomSelect.disabled = false;
  
        if (campusData[campus]) {
            const buildings = Object.keys(campusData[campus]);
            buildings.forEach(building => {
                const opt = document.createElement("option");
                opt.value = building;
                opt.textContent = building;
                buildingSelect.appendChild(opt);
            });
        }
    }
});
  
// Populate Room based on Building
buildingSelect.addEventListener("change", () => {
const campus = campusSelect.value;
const building = buildingSelect.value;
resetDropdown(roomSelect, "-- Select Room --");

    if (campusData[campus] && campusData[campus][building]) {
        campusData[campus][building].forEach(room => {
        const opt = document.createElement("option");
        opt.value = room;
        opt.textContent = room;
        roomSelect.appendChild(opt);
        });
    }
});
  
// Utility function to reset dropdowns
function resetDropdown(dropdown, placeholder) {
    dropdown.innerHTML = "";
    const defaultOpt = document.createElement("option");
    defaultOpt.value = "";
    defaultOpt.textContent = placeholder;
    dropdown.appendChild(defaultOpt);
}

// Form submission
document.getElementById("inventory-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form behavior

    const formData = {
        serial: document.getElementById("serial").value,
        assetTag: document.getElementById("assetTag").value,
        device: document.getElementById("device").value,
        make: document.getElementById("make").value,
        campus: document.getElementById("campus").value,
        building: document.getElementById("building").value,
        room: document.getElementById("room").value,
        user: document.getElementById("user").value,
        techName: document.getElementById("techName").value,
        deploymentDate: document.getElementById("deploymentDate").value,
        loanDate: document.getElementById("loanDate").value
    };

    console.log("Submitting form…", formData);

    fetch("/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert("Form submitted successfully!");
        } else {
            alert("Form submission failed.");
        }
    })
    .catch(err => {
        console.error("Error submitting form:", err);
        alert("Something went wrong.");
    });
});