function onSearch() {
    const searchText = document.getElementById("searchInput").value;
    if (searchText === "") {
        return;
    }
    const req = new XMLHttpRequest();
    req.open("GET", `/search?searchText=${searchText}`);
    req.onload = () => {
        const companyDataReceived = req.responseText;
        const companyData=JSON.parse(companyDataReceived);
        displayData('company', companyData);
        document.getElementById('tabsContainer').style.display = 'flex';
    }
    req.send();
    event.preventDefault();
}

function displayData(tabName, data) {
    const tabs = ['company', 'stockSummary', 'charts', 'latestNews'];
    tabs.forEach(tab => {
        const tabContent = document.getElementById(`${tab}Tab`);
        if (tabContent) {
            tabContent.style.display = tab === tabName ? 'block' : 'none';
        }
    });


    const tabContent = document.getElementById(`${tabName}Tab`);
    if (tabContent) {
        console.log(data.country);
        tabContent.innerHTML = ` <div class="company-info">
        <h2>${data.name}</h2>
        <p><strong>Country:</strong> ${data.country}</p>
        <p><strong>Currency:</strong> ${data.currency}</p>
        <!-- Add more properties as needed -->
        <p><strong>Market Capitalization:</strong> ${data.marketCapitalization}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <!-- Show image if logo URL is available -->
        ${data.logo ? `<img src="${data.logo}" alt="${data.name} Logo" class="company-logo">` : ''}
        <!-- ... and so on -->
        <p><strong>Web URL:</strong> <a href="${data.weburl}" target="_blank">${data.weburl}</a></p>
    </div>`};
    

    highlightTab(tabName);
}

function highlightTab(tabName) {
let activeTab = 'company'; 

    // Remove the highlight class from all tabs
    const tabs = document.querySelectorAll('.navbar button');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // Add the highlight class to the active tab
    const activeTabButton = document.querySelector(`.navbar button[data-tab="${tabName}"]`);
    if (activeTabButton) {
        activeTabButton.classList.add('active');
    }

    // Update the active tab variable
    activeTab = tabName;
}

function onClear () {
    document.getElementById("searchInput").value = "";
    document.getElementById("secondPart").innerHTML="";
}