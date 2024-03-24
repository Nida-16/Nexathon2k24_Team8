// Function to create cards
function createCards() {
    const all_data = {
        project_name: "Project 1",
        property_type: "Apartment",
        area_in_sqft: 1000,
        developer_name: "Developer A",
        bedrooms: 2,
        bathrooms: 2,
        location: "Bandra",
        project_status: "Pre-launch"
    };
    const container = document.getElementById("cardContainer");
    let row;

    // Create a row for every 4 cards
    // data.forEach((item, index) => {
    //     if (index % 4 === 0) {
    //         row = document.createElement("div");
    //         row.classList.add("row");
    //         container.appendChild(row);
    //     }

    // Create a card element
    const card = document.createElement("card");
    card.innerHTML = `
            <h3>${all_data.project_name}</h3>
            <p>Property Type: ${all_data.property_type}</p>
            <p>Area in Sqft: ${all_data.area_in_sqft}</p>
            <p>Developer Name: ${all_data.developer_name}</p>
            <p>Bedrooms: ${all_data.bedrooms}</p>
            <p>Bathrooms: ${all_data.bathrooms}</p>
            <p>Location: ${all_data.location}</p>
            <p>Project Status: ${all_data.project_status}</p>
        `;

    // Append the card to the container
    container.appendChild(card);
}
// });

// Call the function with sample data
// createCards();
