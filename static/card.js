// Function to create cards
function createCards(data) {
    const container = document.getElementById("cardContainer");
    let row;

    // Your web app's Firebase configuration
    const usersRef = fetch("https://trial-b8c5a-default-rtdb.firebaseio.com", {
        method: "POST",
        body: JSON.stringify({
            apiKey: 'AIzaSyAMd6Tw1a0k6F1CG4al43Vk6CRLCFlpy_4',
        }),
        headers: {
            "Content-type": "application/json"
        }
    });

    console.log(usersRef)

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