function onSearch() {
    const searchText = document.getElementById("searchInput").value;
    if (searchText === "") {
        return;
    }
    const req = new XMLHttpRequest();
    req.open("GET", `/search?searchText=${searchText}`);
    req.onload = () => {
        const companyDataReceived = req.responseText;
        const companyData = JSON.parse(companyDataReceived);
        if (companyData.country != undefined) {
            displayData('company', companyData);
        }
        else {
            const errorMessage = document.getElementById('secondPart');
            errorMessage.innerHTML = `<div class="error"><p class="errorMessage">Error: No record has been found, please enter a valid symbol</p></div>`;
            return;
        }
    }
    req.send();
    event.preventDefault();
}

function displayData(tabName, data) {
    const tabs = ['company', 'stockSummary', 'charts', 'latestNews'];
    const tabContent = document.getElementById(`secondPart`);
    console.log(data.country);
    tabContent.innerHTML = `<nav id="tabsContainer" class="navbar"><button data-tab="company" onclick="highlightTab('company')">Company</button><button data-tab="stockSummary" onclick="highlightTab('stockSummary')">Stock Summary</button><button data-tab="charts" onclick="highlightTab('charts')">Charts</button><button data-tab="latestNews" onclick="highlightTab('latestNews')">Latest News</button>
      </nav>
      <div id="companyTab" class="tab-content">
        ${data.logo ? `<img src="${data.logo}" alt="${data.name} Logo" class="company-logo">` : ''}

      <table style="width:100%">
  <tr>
    <td class="left-items">Company Name</td>
    <td>${data.name}</td>
  </tr>
  <tr>
    <td class="left-items">Stock Ticker Symbol</td>
    <td>${data.ticker}</td>
  </tr>
  <tr>
    <td class="left-items">Stock Exchange code</td>
    <td>${data.exchange}</td>
  </tr>
  <tr>
    <td class="left-items">Company Start Date</td>
    <td>${data.ipo}</td>
  </tr>
  <tr>
    <td class="left-items">Category</td>
    <td>${data.finnhubIndustry}</td>
  </tr>
</table>
    </div>`
    highlightTab(tabName);
}

function highlightTab(tabName) {
    let activeTab = 'company';
    const tabs = document.querySelectorAll('.navbar button');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    const activeTabButton = document.querySelector(`.navbar button[data-tab="${tabName}"]`);
    if (activeTabButton) {
        activeTabButton.classList.add('active');
    }
    activeTab = tabName;
}

function onClear() {
    document.getElementById("searchInput").value = "";
    document.getElementById("secondPart").innerHTML = "";
}