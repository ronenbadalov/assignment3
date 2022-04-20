import { getSites, postSite, getSite, deleteSite } from "./api.js";
// const { getSites, postSites } = require("../models/site");
const root = document.querySelector("#root");

const handleNavbar = async () => {
  document.querySelector(".nav-wrapper")?.remove();
  const data = await getSites();
  let html = `<div class="nav-wrapper"><nav><div class="nav-item-wrap"><a href='/' class="nav-item">Home</a><span class="bottom-border__blue hide"></span></div>`;
  data.forEach((site) => {
    html += `<div class="nav-item-wrap"><a href="#${site._id}" class="nav-item site-link" >${site.title}</a><span class="bottom-border__blue hide"></span></div>`;
  });

  html += `</nav></div>`;
  root.insertAdjacentHTML("beforeend", html);
  document.querySelectorAll(".site-link").forEach((site) => {
    site.addEventListener("click", (e) => {
      const lastActive = document.querySelector(".nav-item-active");
      lastActive?.classList.remove("nav-item-active");
      lastActive
        ?.closest(".nav-item-wrap")
        .querySelector("span")
        .classList.add("hide");
      e.target.classList.add("nav-item-active");
      e.target
        .closest(".nav-item-wrap")
        .querySelector("span")
        .classList.remove("hide");
    });
  });
};

window.addEventListener(
  "hashchange",
  (e) => {
    renderSite(e.target.location.hash.slice(1));
  },
  false
);

const handleSitesTable = async () => {
  if (location.hash) {
    renderSite(location.hash.slice(1));
    return;
  }
  const data = await getSites();
  let html = `<div class="home"><div class="btn btn-add">Add Site</div><table class="table"><tr ><th>Title</th><th>Image</th><th>Description</th><th></th></tr>`;
  data.forEach((site) => {
    html += `<tr data-id="${
      site._id
    }" class="table-item"><td class="table-item-title">${
      site.title
    }</td><td class="table-item-image"><img src="${site.image}" alt="${
      site.title
    }"/></td><td class="table-item-description">${site.description.slice(
      0,
      150
    )}${
      site.description.length > 150 ? "..." : ""
    }</td><td class="table-item-remove"><div class="icon-wrap"><i class="fa-solid fa-trash"></i></div></td></tr>`;
  });
  html += `</table></div>`;
  root.insertAdjacentHTML("beforeend", html);

  document.querySelectorAll(".icon-wrap").forEach((delIcon) => {
    delIcon.addEventListener("click", async function (e) {
      const res = await deleteSite(this.closest("tr").dataset.id);
      if (!res.ok) {
        alert("there was an error while trying to delete");
        return;
      }
      await handleNavbar();
      setInitialActiveLink();
    });
  });
};

const handleModal = () => {
  const modal = document.querySelector(".modal");
  const btn = document.querySelector(".btn-add");
  const span = document.querySelector(".modal-close");
  const form = modal.querySelector(".modal form");
  const title = form.querySelector("#title");
  const image = form.querySelector("#image");
  const description = form.querySelector("#description");

  span.onclick = () => {
    modal.style.display = "none";
  };
  btn.onclick = () => {
    modal.style.display = "block";
  };

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
      title.value = "";
      image.value = "";
      description.value = "";
    }
  };

  form.onsubmit = async (e) => {
    e.preventDefault();
    if (title.value === "" || image.value === "" || description.value === "") {
      alert("Please fill out all of the required fields");
      return;
    }
    const res = await postSite({
      title: title.value,
      image: image.value,
      description: description.value,
    });

    if (!res.ok) {
      alert("it seems we have an error");
      return;
    }
    modal.style.display = "none";
    title.value = "";
    image.value = "";
    description.value = "";
    await handleNavbar();

    setInitialActiveLink();
  };
};

const renderSite = async (siteID) => {
  document.querySelector(".home")?.remove();
  document.querySelector(".site")?.remove();
  document.querySelector(".notfound")?.remove();
  const data = await getSite(siteID);
  let html = "";
  if (!data._id) {
    html += ` <div class="notfound"><h1>Site not found!</h1><lottie-player
    src="https://assets4.lottiefiles.com/packages/lf20_a3kesdek.json"
    background="transparent"
    speed="2"
    style="width: 60vh;margin: auto;"
    loop
    autoplay
  ></lottie-player></div>`;
  } else {
    html += `<div class="site">
     <h1 class="site-title">${data.title}</h1>
     <img class="site-image" src=${data.image} />
     <p class="site-description">${data.description}</p>
   </div>`;
  }
  document.querySelector("#root").insertAdjacentHTML("beforeend", html);
};

const setInitialActiveLink = async () => {
  document.querySelector(".home")?.remove();
  if (location.hash) {
    const link = document.querySelector(`a[href="${location.hash}"]`);
    link?.classList.add("nav-item-active");
    link
      ?.closest(".nav-item-wrap")
      .querySelector("span")
      .classList.remove("hide");
    renderSite(location.hash.slice(1));
  } else {
    const link = document.querySelector('a[href="/"]');
    link.classList.add("nav-item-active");
    link
      .closest(".nav-item-wrap")
      .querySelector("span")
      .classList.remove("hide");
    await handleSitesTable();

    handleModal();
  }
};

await handleNavbar();
setInitialActiveLink();
