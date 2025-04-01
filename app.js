/* add your code here */
document.addEventListener('DOMContentLoaded', () => {
    const userData = JSON.parse(userContent);
    const stocksData = JSON.parse(stockContent);
  
    const deleteButton = document.querySelector('#btnDelete');
    const saveButton = document.querySelector('#btnSave');
    const userList = document.querySelector('.user-list');
    const portfolioDetails = document.querySelector('.portfolio-list');
    const stockArea = document.querySelector('.stock-form');
  
    generateUserList(userData, stocksData);
  
    // === DELETE USER ===
    deleteButton.addEventListener('click', (e) => {
      e.preventDefault();
      const userId = document.querySelector('#userID').value;
      const index = userData.findIndex(user => user.id == userId);
      if (index !== -1) {
        userData.splice(index, 1);
        generateUserList(userData, stocksData);
        portfolioDetails.innerHTML = '';
      }
    });
  
    // === SAVE USER CHANGES ===
    saveButton.addEventListener('click', (e) => {
      e.preventDefault();
      const userId = document.querySelector('#userID').value;
      const user = userData.find(user => user.id == userId);
      if (user) {
        const fields = ['firstname', 'lastname', 'address', 'city', 'email'];
        fields.forEach(field => {
          user.user[field] = document.querySelector(`#${field}`).value;
        });
        generateUserList(userData, stocksData);
      }
    });
  
    // === RENDER USER LIST ===
    function generateUserList(users, stocks) {
      userList.innerHTML = '';
      users.forEach(({ user, id }) => {
        const listItem = document.createElement('li');
        listItem.innerText = `${user.lastname}, ${user.firstname}`;
        listItem.setAttribute('id', id);
        userList.appendChild(listItem);
      });
  
      // Click on user
      userList.addEventListener('click', (event) => {
        const user = users.find(u => u.id == event.target.id);
        if (user) {
          populateForm(user);
          renderPortfolio(user, stocks);
        }
      });
    }
  
    // === POPULATE FORM WITH USER DATA ===
    function populateForm(data) {
      const { user, id } = data;
      document.querySelector('#userID').value = id;
      document.querySelector('#firstname').value = user.firstname;
      document.querySelector('#lastname').value = user.lastname;
      document.querySelector('#address').value = user.address;
      document.querySelector('#city').value = user.city;
      document.querySelector('#email').value = user.email;
    }
  
    // === RENDER USER PORTFOLIO ===
    function renderPortfolio(user, stocks) {
      portfolioDetails.innerHTML = '';
      user.portfolio.forEach(({ symbol, owned }) => {
        const symbolEl = document.createElement('p');
        const sharesEl = document.createElement('p');
        const actionEl = document.createElement('button');
  
        symbolEl.innerText = symbol;
        sharesEl.innerText = owned;
        actionEl.innerText = 'View';
        actionEl.setAttribute('id', symbol);
  
        portfolioDetails.appendChild(symbolEl);
        portfolioDetails.appendChild(sharesEl);
        portfolioDetails.appendChild(actionEl);
      });
  
      // Handle View button click for stocks
      portfolioDetails.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
          const symbol = event.target.id;
          viewStock(symbol, stocks);
        }
      });
    }
  
    // === VIEW STOCK DETAILS ===
    function viewStock(symbol, stocks) {
      if (stockArea) {
        const stock = stocks.find(s => s.symbol === symbol);
        if (stock) {
          document.querySelector('#stockName').textContent = stock.name;
          document.querySelector('#stockSector').textContent = stock.sector;
          document.querySelector('#stockIndustry').textContent = stock.subIndustry;
          document.querySelector('#stockAddress').textContent = stock.address;
          document.querySelector('#logo').src = `logos/${symbol}.svg`;
        }
      }
    }
  });
  
