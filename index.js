const images = [];
const carousel = document.querySelector(".carousel");
const arrowIcons = document.querySelectorAll(".wrapper .arrow");
const cards = document.querySelectorAll(".card");
const cardsScroll = document.querySelector(".cards");
const cardsArrowIcons = document.querySelectorAll(".months .arrow");

let currentNumber = 1;
let currentMonth = 1;
let scrollWidth = 0;

carousel.querySelectorAll("div").forEach((div) => {
    const imgs = [];
    div.querySelectorAll("img").forEach((img) => {
        imgs.push(img.src);
    });
    images.push(imgs);
})

const createCarousel = () => {
    const carouselImages = document.querySelectorAll(".carousel img");
    carouselImages.forEach((img) => img.remove());
    images[currentMonth - 1].forEach((img) => {
        carousel.innerHTML += `<img src=${img} alt=${img}>`;
    });
    currentNumber = 1;
    scrollWidth = carousel.scrollWidth - carousel.clientWidth;
}

createCarousel();

const firstImage = carousel.querySelectorAll("img")[0];
const imageWidth = firstImage.clientWidth;
const cardHeight = cards[0].clientHeight;

const showIcons = () => {
    arrowIcons[0].style.display = carousel.scrollLeft === 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft === scrollWidth ? "none" : "block";
};

const scrollToImage = (number) => (number - 1) * imageWidth;

const scrollToCard = (number) => (number - 1) * cardHeight;

const selectCard = (number) => {
    cards.forEach(card => {
        if (card.id == number) {
            card.classList.add("selected");
        } else {
            card.classList.remove("selected");
        }
    });
};

showIcons();

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        currentNumber += icon.id === "left" ? -1 : 1;
        carousel.scrollLeft = scrollToImage(currentNumber);
        setTimeout(() => showIcons(), 800);
    })
});

cards.forEach(card => {
    card.addEventListener("click", () => {
        currentMonth = +card.id;
        createCarousel();
        selectCard(currentMonth);
        carousel.scrollLeft = scrollToImage(currentNumber);
        setTimeout(() => showIcons(), 1000);
    });
});

cardsArrowIcons.forEach(arrow => {
    arrow.addEventListener("click", () => {
        currentMonth += arrow.id === "up" ? -1 : 1;
        if (currentMonth < 1) currentMonth = 1;
        if (currentMonth > 12) currentMonth = 12;
        createCarousel();
        carousel.scrollLeft = scrollToImage(currentNumber);
        selectCard(currentMonth);
        cardsScroll.scrollTop = scrollToCard(currentMonth);
        setTimeout(() => showIcons(), 1000);
    })
});


