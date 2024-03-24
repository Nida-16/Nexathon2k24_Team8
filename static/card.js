const data = [{
    project_name: "Project 1",
    property_type: "Apartment",
    area_in_sqft: 1000,
    developer_name: "Developer A",
    bedrooms: 2,
    bathrooms: 2,
    location: "Bandra",
    project_status: "Pre-launch"
},
{
    project_name: "Project 2",
    property_type: "Villa",
    area_in_sqft: 1500,
    developer_name: "Developer B",
    bedrooms: 3,
    bathrooms: 3,
    location: "Andheri",
    project_status: "Under Construction"
},
// Add more data as needed
];
// Function to create cards
function createCards(data) {
    const container = document.getElementById("cardContainer");
    let row;


    data.forEach((item, index) => {
        if (index % 4 === 0) {
            row = document.createElement("div");
            row.classList.add("row");
            container.appendChild(row);
        }

        const card = document.createElement("card");
        card.innerHTML = `
            <h3>${item.project_name}</h3>
            <p>Property Type: ${item.property_type}</p>
            <p>Area in Sqft: ${item.area_in_sqft}</p>
            <p>Developer Name: ${item.developer_name}</p>
            <p>Bedrooms: ${item.bedrooms}</p>
            <p>Bathrooms: ${item.bathrooms}</p>
            <p>Location: ${item.location}</p>
            <p>Project Status: ${item.project_status}</p>
        `;
        row.appendChild(card);
    });
}

// Call the function with sample data
createCards(data);