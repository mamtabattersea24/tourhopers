document.addEventListener("DOMContentLoaded", function () {

    // Table Of Content   ============ start =====>
    const tableHeader = document.querySelector(".toc-header");
    const tableCrossBtn = document.querySelector(".toc-toggle-btn");    
    const tableOfcontentBody = document.querySelector(".th-toc-wrap .toc-body");
    const tableDropdowns =  document.querySelectorAll(".toc-body ul ul");
    
    


    // Function to check if it's a mobile device
    function isMobileDevice() {
        return window.innerWidth <= 768; // Adjust the width as needed
    }


    // Function to hide table of content on mobile devices
    function hideTableOfContentOnMobile() {
        if (isMobileDevice()) {
            tableOfcontentBody.classList.add("hidden");
        }
    }


    // Initial check to hide on page load if it's a mobile device
    if (tableHeader) {
        tableHeader.classList.add('head-border');
        hideTableOfContentOnMobile();
        const minus = '<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect width="11" height="2" rx="1" fill="#000"/></svg>';
        const plus =
            '<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.68 6.2H6.8v4.12H4.79V6.2H.93V4.37h3.86V.27H6.8v4.1h3.88z" fill="#000"></path></svg>';

        tableHeader.addEventListener("click", function () {
            if (tableOfcontentBody.classList.contains("hidden")) {
                tableOfcontentBody.classList.remove("hidden");
                tableHeader.classList.add('head-border');
                tableCrossBtn.innerHTML = plus;
            } else {
                tableOfcontentBody.classList.add("hidden");
                tableHeader.classList.remove('head-border');
                tableCrossBtn.innerHTML = minus;
            }
        });
    }

    // table nested li (converted into dropdown)
    if(tableDropdowns){
        tableDropdowns.forEach((tableDropdown) => {
            const parentli = tableDropdown.parentElement;
            parentli.classList.add("drop-down")

            parentli.addEventListener("click", function (e) {
                this.classList.toggle("showtocdrop");
            });
          
        });
     
    }

    




    // Check on window resize to adjust visibility
    window.addEventListener("resize", hideTableOfContentOnMobile);

    const tableOfContentItems = document.querySelectorAll(".toc-body ul li a");
    tableOfContentItems.forEach((link) => {
        link.addEventListener("click", scrollToSection);
    });

    function scrollToSection(event) {
        event.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const offset = targetElement.offsetTop - 100;
            const top = offset > 0 ? offset : 0;
            window.scrollTo({
                top: top,
                behavior: "smooth",
            });
        }
    }
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const targetId = entry.target.getAttribute("id");
                const link = document.querySelector(`.toc-body ul li a[href="#${targetId}"]`);
                if (entry.isIntersecting) {
                    link?.parentElement.classList.add("active");
                } else {
                    link?.parentElement.classList.remove("active");
                }
            });
        },
        {
            threshold: 0.5,
        }
    );
    document.querySelectorAll("h2, h3, h4, h5, h6").forEach((element) => {
        observer.observe(element);
    });


    // Header Sticky  ============ start =====>
    const header = document.querySelector("header");
    function handleScroll() {
        if (window.scrollY > 0) {
            header.classList.add("sticky-header");
        } else {
            header.classList.remove("sticky-header");
        }
    }

    window.addEventListener("scroll", handleScroll);

    // mobile search form code ============ start =====>
    let searchIcon = document.querySelector(".mob-search-btn");
    let searchForm = document.querySelector(".th-menu-search-form");
    let svg1 =
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9" stroke-width="2" stroke="#000" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
    let svg2 =
        '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>';
    let isSvg1 = true;
    if (searchIcon) {
        searchIcon.addEventListener("click", function () {
            searchIcon.innerHTML = isSvg1 ? svg2 : svg1;
            isSvg1 = !isSvg1;

            searchForm.classList.toggle("search-bar-show");
        });
    }


    // Show mobile left canvas ============ start =====>
    const toggleslideBtn = document.querySelector(".th-menu-toggle-btn");
    const cancelBtn = document.querySelector(".cancel-btn");
    const headerUl = document.querySelector("header .th-menu ul");

    function toggleButtons(cancelBtn, headerUl) {
        cancelBtn.style.display = cancelBtn.style.display === "block" ? "none" : "block";
        $mobileNav = headerUl.classList.toggle("show-ul");

        if (!$mobileNav) {
            const backDrop = document.querySelector('.back-drop');
            backDrop.remove();
            enableScroll();
        }
        else {
            const backDrop = document.createElement('div');
            header.appendChild(backDrop);
            backDrop.classList.add('back-drop');
            disableScroll();

            backDrop.addEventListener("click", function () {
                headerUl.classList.remove("show-ul");
                backDrop.remove();
                enableScroll();
            });
        }

        function disableScroll() {
            document.body.style.overflow = 'hidden';
        }

        function enableScroll() {
            document.body.style.overflow = 'auto';
        }

    }

    toggleslideBtn.addEventListener("click", function () {
        toggleButtons(cancelBtn, headerUl);
    });

    cancelBtn.addEventListener("click", function () {
        toggleButtons(cancelBtn, headerUl);
    });



    // mobile Dropdown  ============ start =====>
    const navDropdowns = document.querySelectorAll(".dropdown");
    navDropdowns.forEach((parentDropdown) => {
        parentDropdown.addEventListener("click", function (e) {
            this.classList.toggle("showMenu");
        });

        const subDropdowns = parentDropdown.querySelectorAll(".dropdown ul");
        subDropdowns.forEach((subDropdown) => {
            subDropdown.addEventListener("click", function (event) {
                event.stopPropagation(); // Prevents the click event from reaching the parent dropdown
            });
        });
    });

    // Add a click event listener to the document to close dropdowns when clicking outside
    document.addEventListener("click", (e) => {
        navDropdowns.forEach((dropdown) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove("showMenu");
            }
        });
    });



    // accordion code  ============ start =====>
    const detailsElements = document.querySelectorAll("details");
    const summaryElements = document.querySelectorAll("summary");
    summaryElements.forEach((summary, index) => {
        summary.addEventListener("click", () => {
            detailsElements.forEach((details, i) => {
                if (i !== index) {
                    details.open = false;
                }
            });
        });
    });



    // Scroll to top   ============ start =====>

    let mybutton = document.getElementById("scroll_to_top");
    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.classList.toggle('active');
        }
    }
    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    mybutton.addEventListener("click", topFunction);


    // silder

const wrapper = document.querySelector(".slide-wrapper");
const carousel = document.querySelector(".carousel");
const indicatorsContainer = document.querySelector(".indicators");
const firstCardWidth = carousel.querySelector(".slide-card").offsetWidth;
const arrowBtns = document.querySelectorAll(".slide-wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId, activeIndicator;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
  carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
    carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
  // Autoplay the carousel after every 2500 ms
  timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 1000);
}
autoPlay();
const updateActiveIndicator = () => {
  const scrollLeft = carousel.scrollLeft;
  const index = Math.round(scrollLeft / firstCardWidth);
  const indicators = document.querySelectorAll(".indicator");
  indicators.forEach((indicator, i) => {
    if (i === index) {
      setActiveIndicator(indicator);
    }
  });                                                                                              
}

carousel.addEventListener("scroll", updateActiveIndicator);


carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

// Create indicators
for (let i = 0; i < carouselChildrens.length / 2; i++) {
  const indicator = document.createElement("div");
  indicator.classList.add("indicator");
  if (i === 0) {
    indicator.classList.add("active");
    activeIndicator = indicator;
  }
  indicator.addEventListener("click", () => {
    carousel.scrollLeft = i * firstCardWidth;
    setActiveIndicator(indicator);
  });
  indicatorsContainer.appendChild(indicator);
}

// Function to set active indicator
const setActiveIndicator = (indicator) => {
  activeIndicator.classList.remove("active");
  indicator.classList.add("active");
  activeIndicator = indicator;
}


});


