// variables
const contentPageOne = [];
const contentPageTwo = [];
const contentPageThree = [];
let news;
const container = document.querySelector(".container");
const pageOne = document.querySelector(".page-one");
const pageTwo = document.querySelector(".page-two");
const pageThree = document.querySelector(".page-three");
const page = document.querySelectorAll(".page");
const btns = document.querySelectorAll(".btn");
const btnOne = document.querySelector(".btn-one");
const btnTwo = document.querySelector(".btn-two");
const btnThree = document.querySelector(".btn-three");
// functions
async function getNews() {
  try {
    const resp = await fetch("http://www.mocky.io/v2/58fda6ce0f0000c40908b8c8");
    const respData = await resp.json();
    news = respData.news;
  } catch (err) {
    const html = document.createElement("div");
    html.innerHTML = '<div class="lds-dual-ring"></div>';
    html.classList.add("loader");
    container.style.background = "#999";
    container.innerHTML = "";
    container.appendChild(html);
  }
  news.forEach((newsItem, i) => {
    if (i < 5) {
      contentPageOne.push(newsItem);
    } else if (i >= 5 && i < 10) {
      contentPageTwo.push(newsItem);
    } else if (i >= 10) {
      contentPageThree.push(newsItem);
    }
  });
  populatePage(contentPageOne, pageOne);
  populatePage(contentPageTwo, pageTwo);
  populatePage(contentPageThree, pageThree);
}
getNews();
setInterval(getNews, 180000);

const populatePage = function (arr, node) {
  const ul = document.createElement("ul");
  arr.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <h5>${item.title}</h5>
      <p>${item.details}</p>
      `;
    ul.appendChild(li);
  });
  node.appendChild(ul);
};
console.log(page);

let i = 1;
let pageInterval = setInterval(() => {
  displayPage(i);
  i++;
  if (i > 2) {
    i = 0;
  }
}, 15000);
const displayPage = function (x) {
  page.forEach((page) => {
    if (page.classList.contains("page-active")) {
      page.classList.remove("page-active");
    }
  });
  page[x].classList.add("page-active");
  btns.forEach((btn) => {
    if (btn.classList.contains("btn-active")) {
      btn.classList.remove("btn-active");
    }
  });
  btns[x].classList.add("btn-active");
};
displayPage(0);

// listeners
btnOne.addEventListener("click", () => {
  clearInterval(pageInterval);
  displayPage(0);
  i = 1;
  pageInterval = setInterval(() => {
    displayPage(i);
    i++;
    if (i > 2) {
      i = 0;
    }
  }, 15000);
});

btnTwo.addEventListener("click", () => {
  clearInterval(pageInterval);
  displayPage(1);
  i = 2;
  pageInterval = setInterval(() => {
    displayPage(i);
    i++;
    if (i > 2) {
      i = 0;
    }
  }, 15000);
});
btnThree.addEventListener("click", () => {
  clearInterval(pageInterval);
  displayPage(2);
  i = 0;
  pageInterval = setInterval(() => {
    displayPage(i);
    i++;
    if (i > 2) {
      i = 0;
    }
  }, 15000);
});
