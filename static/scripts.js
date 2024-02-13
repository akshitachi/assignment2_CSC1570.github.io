function onSearch() {
  const searchText = document.getElementById("searchInput").value;
  if (searchText === "") {
    return;
  }
  const req = new XMLHttpRequest();
  req.open("GET", `/search?searchText=${searchText}`);
  req.onload = () => {
    const fullDataReceived = req.responseText;
    const fullData = JSON.parse(fullDataReceived);
    if (fullData.data1.country != undefined) {
      displayData('company', fullData);
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

function displayData(tabName, fullData) {
  const tabs = ['company', 'stockSummary', 'charts', 'latestNews'];
  const tabContent = document.getElementById(`secondPart`);
  const companyData = fullData.data1;
  const summaryStockData = fullData.data2;
  const recommendationData=fullData.data3[0];
  const unixEpochTime = summaryStockData.t;
  const date = new Date(unixEpochTime * 1000);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  tabContent.innerHTML = `<nav id="tabsContainer" class="navbar"><button data-tab="company" onclick="highlightTab('company')">Company</button><button data-tab="stockSummary" onclick="highlightTab('stockSummary')">Stock Summary</button><button data-tab="charts" onclick="highlightTab('charts')">Charts</button><button data-tab="latestNews" onclick="highlightTab('latestNews')">Latest News</button>
      </nav>
      <div id="companyTab" class="tab-content">
        ${companyData.logo ? `<img src="${companyData.logo}" alt="${companyData.name} Logo" class="company-logo">` : ''}

      <table style="width:100%">
  <tr>
    <td class="left-items">Company Name</td>
    <td>${companyData.name}</td>
  </tr>
  <tr>
    <td class="left-items">Stock Ticker Symbol</td>
    <td>${companyData.ticker}</td>
  </tr>
  <tr>
    <td class="left-items">Stock Exchange Code</td>
    <td>${companyData.exchange}</td>
  </tr>
  <tr>
    <td class="left-items">Company Start Date</td>
    <td>${companyData.ipo}</td>
  </tr>
  <tr>
    <td class="left-items">Category</td>
    <td>${companyData.finnhubIndustry}</td>
  </tr>
</table>
    </div>

    <div id="stockSummaryTab" class="tab-content2" style="display: none;">
    <table style="width:100%">
  <tr>
    <td class="left-items">Stock Ticker Symbol</td>
    <td>${companyData.ticker}</td>
  </tr>
  <tr>
    <td class="left-items">Trading Day</td>
    <td>${formattedDate}</td>
  </tr>
  <tr>
    <td class="left-items">Pevious Closing Price</td>
    <td>${summaryStockData.pc}</td>
  </tr>
  <tr>
    <td class="left-items">Opening Price</td>
    <td>${summaryStockData.o}</td>
  </tr>
  <tr>
    <td class="left-items">High Price</td>
    <td>${summaryStockData.h}</td>
  </tr>
  <tr>
    <td class="left-items">Low Price</td>
    <td>${summaryStockData.l}</td>
  </tr>
  <tr>
    <td class="left-items">Change</td>
    <td>
    ${summaryStockData.d}
            ${summaryStockData.d < 0 ? '<img src="static/img/RedArrowDown.png" alt="Down Arrow" class="arrow-img">' : '<img src="static/img/GreenArrowUp.png" alt="Up Arrow" class="arrow-img">'}
    </td>
  </tr>
  <tr>
    <td class="left-items">Change Percent</td>
    <td>${summaryStockData.dp}
    ${summaryStockData.dp < 0 ? '<img src="static/img/RedArrowDown.png" alt="Down Arrow" class="arrow-img">' : '<img src="static/img/GreenArrowUp.png" alt="Up Arrow" class="arrow-img">'}</td>
  </tr>
</table>
    <div class="gauge">
    <div class="strong-text">
        <div class="label">Strong</div>
        <div class="label">Sell</div>
        </div>
            <div class="recommendation-box1"><p class="buy">${recommendationData.strongSell}</p></div>
            <div class="recommendation-box2"><p class="buy">${recommendationData.sell}</p></div>
            <div class="recommendation-box3"><p class="buy">${recommendationData.hold}</p></div>
            <div class="recommendation-box4"><p class="buy">${recommendationData.buy}</p></div>
            <div class="recommendation-box5"><p class="buy">${recommendationData.strongBuy}</p></div>
        <div class="strong-text2">
        <div class="label">Strong</div>
        <div class="label">Buy</div>
        </div>
    </div>
    <div class="recommendation">Recommendation Trends</div>

    </div>
    `
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
  const companyTab = document.getElementById('companyTab');
  const stockSummaryTab = document.getElementById('stockSummaryTab');
  if (tabName === "stockSummary") {
    stockSummaryTab.style.display = "block";
    companyTab.style.display = "none";
  }
  else {
    stockSummaryTab.style.display = "none";
    companyTab.style.display = "block";
  }

}

function onClear() {
  document.getElementById("searchInput").value = "";
  document.getElementById("secondPart").innerHTML = "";
}