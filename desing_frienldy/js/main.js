const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    let yScroll = window.scrollY;
    header.classList.toggle('header-show', yScroll > 50)
})

const eyebrow = document.getElementById('eyebrow');
const heading = document.getElementById('title');
const body = document.getElementById('content');
const dataHotel = document.getElementById('hotelData');
const isReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

fetch('/XX_Module_D/content/hotel-copy.json')
    .then(res => res.json())
    .then(data => {
        eyebrow.textContent = data.eyebrow;
        heading.textContent = data.heading;
        body.textContent = data.body;
        dataHotel.innerHTML = '';
        if (isReduced) {
            data.stats.forEach(stat => {
                dataHotel.innerHTML += `
                            <div class="vstack gap-1">
                                <span class="cormorant brick display-6">${stat.value} ${stat.suffix}</span>
                                <span class="eyebrow">${stat.label}</span>
                            </div>`
            })
        } else {
            let realStats = [];
            data.stats.forEach(stat => {
                realStats.push(stat.value);
                dataHotel.innerHTML += `
                            <div class="vstack gap-1">
                                <span class="cormorant brick display-6"><span class="stat-value">${0}</span>${stat.suffix}</span>
                                <span class="eyebrow">${stat.label}</span>
                            </div>`
            })
            const observer = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    runNumbers(realStats)
                    observer.unobserve(dataHotel)
                }
            }, {
                threshold: 1,
            })
            observer.observe(dataHotel)
        }
    })

function runNumbers(stats) {

    const statElements = document.querySelectorAll('.stat-value');
    statElements.forEach((el, i) => {
        let intervalId = setInterval(() => {
            let number = Number(el.textContent)
            let newNumber = number + 1;
            el.textContent = newNumber;
            if (newNumber >= stats[i]) {
                clearInterval(intervalId);
            }
        }, 50)
    })
}

const altImages = {
    "hero-shanghai-hotel.webp": "The S\u00f9 Hotel terrace overlooking Suzhou Creek and the Shanghai skyline at blue hour.",
    "story-lobby.webp": "A contemporary Art Deco hotel lobby with warm brass lighting and a curved staircase.",
    "images/room-deluxe-river.webp": "Deluxe River Room with a king bed and window overlooking Suzhou Creek.",
    "images/room-art-deco-king.webp": "Art Deco King Room with geometric wall detailing and warm evening light.",
    "images/room-suzhou-suite.webp": "Suzhou Suite living and sleeping areas with a panoramic river view.",
    "images/room-bund-signature.webp": "Bund Signature Suite with a night skyline view and sculptural furniture.",
    "dining-su-kitchen.webp": "Dining room at SU Kitchen with warm pendant lights and contemporary Chinese interiors.",
    "dining-river-bar.webp": "Curved stone cocktail bar lit with amber light beside blue river reflections.",
    "wellness-pool.webp": "Long indoor swimming pool with calm water, stone walls and bronze details.",
    "nearby-bund.webp": "Historic buildings lining the Bund waterfront in soft morning mist.",
    "nearby-suzhou-creek.webp": "Tree-lined pedestrian path beside Suzhou Creek and restored warehouses.",
    "nearby-m50.webp": "Industrial gallery lane in Shanghai\u2019s contemporary art district.",
    "decorative": [
        "icon-arrow.svg",
        "su-monogram.svg"
    ]
}

const optionSelected = document.getElementById('option-selected');
const optionRow = document.getElementById('room-select');

const options = [
    {
        "id": "deluxe-river",
        "name": "Deluxe River Room",
        "size": "42 m²",
        "guests": 2,
        "bed": "1 king bed",
        "price": 2380,
        "image": "images/room-deluxe-river.webp",
        "description": "A calm river-facing room shaped by warm timber, cream linen and morning light.",
        "amenities": [
            "Suzhou Creek view",
            "Window daybed",
            "Rain shower",
            "Complimentary minibar"
        ]
    },
    {
        "id": "art-deco-king",
        "name": "Art Deco King Room",
        "size": "46 m²",
        "guests": 2,
        "bed": "1 king bed",
        "price": 2680,
        "image": "images/room-art-deco-king.webp",
        "description": "Geometric detailing and rich, muted colour reinterpret Shanghai glamour for a modern stay.",
        "amenities": [
            "Art Deco lounge area",
            "Nespresso machine",
            "Walk-in rain shower",
            "Evening turndown"
        ]
    },
    {
        "id": "suzhou-suite",
        "name": "Suzhou Suite",
        "size": "68 m²",
        "guests": 3,
        "bed": "1 king bed",
        "price": 3680,
        "image": "images/room-suzhou-suite.webp",
        "description": "A residential suite with separate living space and wide views over the moving river.",
        "amenities": [
            "Separate living room",
            "Panoramic river view",
            "Deep soaking bath",
            "Personal host service"
        ]
    },
    {
        "id": "bund-signature",
        "name": "Bund Signature Suite",
        "size": "92 m²",
        "guests": 4,
        "bed": "1 king bed",
        "price": 5280,
        "image": "images/room-bund-signature.webp",
        "description": "Our generous corner suite frames Shanghai after dark with cinematic views and quiet privacy.",
        "amenities": [
            "Corner skyline view",
            "Dining table for four",
            "Private bar",
            "Return airport transfer"
        ]
    }
];

options.forEach((opt, i) => {
    optionRow.innerHTML += `
                    <div class="card-option ${i === 0 && 'active'}">
                        ${opt.name}
                    </div>`
})
const [prev, next] = document.querySelectorAll('.btn-slide');
let selectedIndex = 0;
prev.addEventListener('click', () => {
    selectedIndex = (selectedIndex - 1 + options.length) % options.length;
    renderOpt()
})
next.addEventListener('click', () => {
    selectedIndex = (selectedIndex + 1 + options.length) % options.length;
    renderOpt()
})
window.addEventListener('keydown', ev => {
    let {key} = ev;
    if (key === 'ArrowRight') {
        selectedIndex = (selectedIndex + 1 + options.length) % options.length;
        renderOpt()
    } else if (key === 'ArrowLeft') {
        selectedIndex = (selectedIndex - 1 + options.length) % options.length;
        renderOpt()
    }
})

function renderOpt() {
    let selected = options[selectedIndex];
    optionSelected.innerHTML = `<div class="row" id="${selected.id}">
                    <div class="col-12 col-md-8 bg-white position-relative col-image">
                        <img src="${selected.image}"
                             alt="${altImages[selected.image]}"
                             class="img-total img-position">
                    </div>
                    <div class="col-12 col-md-4 bg-white vstack justify-content-center p-sm-3">
                        <p class="eyebrow text-spaced mb-3">${selectedIndex + 1}/${options.length}</p>
                        <h3 class="display-5">${selected.name}</h3>
                        <p>${selected.description}</p>
                        <hr>
                        <div class="hstack justify-content-between">
                            <div class="room-data">
                                <p class="eyebrow text-spaced">space</p>
                                <p>${selected.size}</p>
                            </div>
                            <div class="room-data">
                                <p class="eyebrow text-spaced">Guests</p>
                                <p>${selected.guests}</p>
                            </div>
                            <div class="room-data">
                                <p class="eyebrow text-spaced">Bed</p>
                                <p>${selected.bed}</p>
                            </div>
                        </div>
                        <hr>
                        <p class="cormorant fs-3">From CNY ${selected.price.toLocaleString('en')} / night</p>
                        <div class="d-flex flex-column flex-md-row gap-2 align-items-start">
                            <button class="btn btn-underline-theme">View room details</button>
                            <button class="btn btn-dark-theme mb-3 mb-md-0">Book this room</button>
                        </div>
                    </div>
                </div>`
    const opts = document.querySelectorAll('.card-option');
    opts.forEach(opt => opt.classList.remove('active'));
    opts[selectedIndex].classList.add('active');
    opts[selectedIndex].focus();
}

const formEl = document.getElementById('form');
const textEl = document.getElementById('form-message')
const inputEl = document.getElementById('email')

formEl.addEventListener('submit', (ev) => {
    ev.preventDefault();
    let value = inputEl.value;
    textEl.innerHTML = '';
    if (value === '') {
        textEl.innerHTML = 'Please enter your email address';
        return;
    }
    let regexMail = /\w+@\w+\.[a-z]{2,3}/
    if (!regexMail.test(value)) {
        textEl.innerHTML = 'Please enter a valid email address.';
        return;
    }
    if (textEl.innerHTML === '') {
        textEl.innerHTML = 'Thank you. Shanghai stories are on their way.';
        return;
    }
})

const now = new Date();
const yearEl = document.getElementById('year');
yearEl.innerHTML = String(now.getFullYear());