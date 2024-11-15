function updateDateTime() {
    const datetimeElement = document.getElementById('datetime');
    if (datetimeElement) { 
        const now = new Date();
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        const formattedDate = now.toLocaleDateString('tr-TR', options);
        datetimeElement.innerText = formattedDate;
    }
}

setInterval(updateDateTime, 1000);
updateDateTime();

document.addEventListener("DOMContentLoaded", function () {
    setupFormValidation();
    setupToggleButton();
    setupProjectButtons();
    setupProjectSorting();
});


function setupFormValidation() {
    const form = document.getElementById("contact-form");

    if (form) { 
        form.addEventListener("submit", function (event) {
            event.preventDefault(); 

            let isValid = true; 
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            document.getElementById("name-error").innerHTML = "";
            document.getElementById("email-error").innerHTML = "";
            document.getElementById("message-error").innerHTML = "";

            if (name === "") {
                document.getElementById("name-error").innerHTML = "<p>Adınızı giriniz.</p>";
                isValid = false; 
            }

            if (email === "") {
                document.getElementById("email-error").innerHTML = "<p>E-posta adresinizi giriniz.</p>";
                isValid = false; 
            } else {
                const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailPattern.test(email)) {
                    document.getElementById("email-error").innerHTML = "<p>Lütfen geçerli bir e-posta adresi giriniz.</p>";
                    isValid = false; 
                }
            }

            if (message === "") {
                document.getElementById("message-error").innerHTML = "<p>Mesajınızı giriniz.</p>";
                isValid = false; 
            }


            if (isValid) {
                const mailtoLink = `mailto:zuhalaltas090@gmail.com?subject=İletişim Formu: ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0D%0A%0D%0AGönderen: ${encodeURIComponent(email)}`;
                window.location.href = mailtoLink; 
            }
        });
    }
}

function setupToggleButton() {
    const toggleButton = document.getElementById("toggle-button");
    const moreInfo = document.getElementById("more-info");
    if (toggleButton && moreInfo) { 
        toggleButton.addEventListener("click", function () {
            const isExpanded = moreInfo.style.display === "block";
            moreInfo.style.display = isExpanded ? "none" : "block";
            toggleButton.textContent = isExpanded ? "Daha Fazla Gör" : "Daha Az Gör";
            toggleButton.setAttribute("aria-expanded", !isExpanded); 
        });
    }
}

function setupProjectButtons() {
    document.getElementById("proje1-buton-detay").addEventListener("click", function () {
        window.location.href = "projects.html#proje1";
    });

    document.getElementById("proje2-buton-detay").addEventListener("click", function () {
        window.location.href = "projects.html#proje2";
    });

    document.getElementById("proje3-buton-detay").addEventListener("click", function () {
        window.location.href = "projects.html#proje3";
    });
}

const projects = [
    {
        name: "Elektrik Faturası Tahmin Uygulaması",
        date: new Date("2024-10-15"),
        description: "Bu uygulamanın amacı, kullanıcının belirli girdilerle yaklaşık aylık elektrik faturası tutarını tahmin etmektir.",
        image: "img/Resim1.png",
        likes: 120 
    },
    {
        name: "Kişisel Müzik Kütüphanesi Düzenleyicisi",
        date: new Date("2024-11-01"),
        description: "Kişisel Müzik Kütüphanesi Düzenleyicisi projesi arkadaşımla birlikte geliştirdiğimiz bir konsol uygulamasıdır.",
        image: "img/Proje2.jpg",
        likes: 80 
    },
    {
        name: "Araba Kiralama Sistemi",
        date: new Date("2024-09-20"),
        description: "Java dilinde geliştirdiğimiz Araç Kiralama Sistemi, kullanıcı ve admin işlevselliğine sahip bir uygulamadır.",
        image: "img/Proje3_1.jpg",
        likes: 150 
    }
];

function sortLatestProjects() {
    const sortedProjects = [...projects].sort((a, b) => b.date - a.date);
    displayProjects(sortedProjects);
}

function sortPopularProjects() {
    const sortedProjects = [...projects].sort((a, b) => b.likes - a.likes);
    displayProjects(sortedProjects);
}

document.getElementById("sort-latest").addEventListener("click", () => {
    sortLatestProjects();
});

document.getElementById("sort-popular").addEventListener("click", () => {
    sortPopularProjects();
});



function toggleSortOptions() {
    const sortOptions = document.getElementById("sort-options");
    const isHidden = sortOptions.getAttribute("aria-hidden") === "true";
    sortOptions.style.display = isHidden ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", function() {
    const sortButton = document.getElementById("sort-button");
    const sortOptions = document.querySelector(".sort-options");


    sortButton.addEventListener("click", function(event) {
        event.stopPropagation(); 
        sortOptions.style.display = isVisible ? "none" : "block"; 
    });

    document.addEventListener("click", function() {
        sortOptions.style.display = "none"; 
    });
});

function displayProjects(projectList) {
    const container = document.querySelector(".projeler-container");
    container.innerHTML = ""; 

    projectList.forEach(project => {
        const projectCard = `
            <div class="proje-card">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <img src="${project.image}" alt="${project.name}">
                <p>Beğeni: ${project.likes}</p>
                <p>Tarih: ${project.date.toLocaleDateString()}</p>
            </div>
        `;
        container.innerHTML += projectCard;
    });
}
document.getElementById("show-all-button").addEventListener("click", function() {
    window.location.href = "projects.html"; 
});


const modalOverlay = document.querySelector(".modal-overlay");
const modalContent = document.querySelector(".modal-content");
const modalTitle = document.querySelector(".modal-title");
const modalImg = document.querySelector(".modal-img");
const modalDescription = document.querySelector(".modal-description");


function openModal(title, imgSrc, descriptionHTML) {
    modalTitle.textContent = title;
    modalImg.src = imgSrc;
    modalDescription.innerHTML = descriptionHTML;
    modalOverlay.style.display = "flex";
}

function closeModal() {
    modalOverlay.style.display = "none";
}

document.querySelectorAll(".proje-card").forEach(card => {
    card.addEventListener("click", () => {
        const title = card.querySelector("h3").textContent;
        const imgSrc = card.querySelector("img").src;
        const descriptionHTML = card.querySelector(".proje-description").innerHTML;
        openModal(title, imgSrc, descriptionHTML);
    });
});