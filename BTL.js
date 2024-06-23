document.addEventListener("DOMContentLoaded", function() {
    // Task Bar
    const toggleButton = document.querySelector(".task_bar > a:first-child");
    const taskBarList = document.querySelector(".task_bar ul");
    let taskBarListVisible = false;

    function hideTaskBarList() {
        taskBarList.style.display = "none";
        taskBarListVisible = false;
        document.body.style.overflowY = "auto";
    }

    toggleButton.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();
        taskBarList.style.display = "block";
        taskBarListVisible = true;
        document.body.style.overflowY = "hidden";
    });

    document.addEventListener("click", function(event) {
        if (!taskBarList.contains(event.target) && !toggleButton.contains(event.target)) {
            hideTaskBarList();
        }
    });

    taskBarList.addEventListener("click", function(event) {
        event.stopPropagation();
    });

    window.addEventListener("resize", function() {
        if (taskBarListVisible) {
            document.body.style.overflowY = (document.body.clientWidth > 768) ? "hidden" : "auto";
        }
    });

    // Option 1
    const option1Selector = 'header .option1';
    const option1Elements = document.querySelector(option1Selector);
    const option1Divs = option1Elements.querySelectorAll('li > div');

    function hideAllOption1Divs() {
        option1Divs.forEach(function(div) {
            div.style.display = 'none';
        });
    }

    document.addEventListener('click', function(event) {
        if (!event.target.closest(option1Selector)) {
            hideAllOption1Divs();
        }
    });

    option1Elements.querySelectorAll('li').forEach(function(li) {
        li.addEventListener('click', function(event) {
            const div = this.querySelector('div');
            if (div.style.display === 'block') {
                div.style.display = 'none';
            } else {
                hideAllOption1Divs();
                div.style.display = 'block';
            }
            event.stopPropagation();
        });
    });

    // Search Options
    const titles = [
        'Where to?',
        'Stay somewhere great',
        'Do something fun',
        'Find places to eat',
        'Explore places to rent'
    ];

    const placeholders = [
        'Places to go, things to do, hotels...',
        'Hotel name or destination',
        'Attraction, activity or destination',
        'Restaurant or destination',
        'Destination'
    ];

    function changeTitleAndPlaceholder(index) {
        document.querySelector(".title").textContent = titles[index];
        document.querySelector("main .search input").placeholder = placeholders[index];
    }

    const optionLinks = document.querySelectorAll('.option ul li a');
    optionLinks.forEach((link, index) => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            changeTitleAndPlaceholder(index);

            // Remove 'active' class from all li elements
            optionLinks.forEach((l) => {
                l.parentElement.classList.remove('active');
            });

            // Add 'active' class to the parent li of the clicked link
            link.parentElement.classList.add('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const underHeader = document.querySelector('.under_header');
    const mainSearch = document.querySelector('main .search');
    const firstOption1ChildDiv = document.querySelector('header .hd > .option1 > li:first-child > div');
    const firstOption1ChildLi = document.querySelector('header .hd > .option1 > li:first-child');
    const option1Parent = document.querySelector('header .hd> .option1');
    const lastOption1Child = document.querySelector('header .hd > .option1 > li:last-child');

    underHeader.style.display = 'none';
    if (firstOption1ChildDiv) {
        firstOption1ChildDiv.style.display = 'none';
    }
    if (lastOption1Child) {
        lastOption1Child.style.display = 'block'; // Ensure the last child is initially visible
    }

    // Kiểm tra khi cuộn trang và khi resize
    function checkScrollAndResize() {
        if (window.innerWidth < 1080) {
            underHeader.style.display = 'none';
            if (firstOption1ChildDiv) {
                firstOption1ChildDiv.style.display = 'none';
                option1Parent.style.justifyContent = '';
                firstOption1ChildLi.style.width = ''; // Reset the width
            }
            if (lastOption1Child) {
                lastOption1Child.style.display = 'block';
            }
            return;
        }

        if (window.scrollY >= mainSearch.offsetTop) {
            underHeader.style.display = 'block';
            if (firstOption1ChildDiv) {
                firstOption1ChildDiv.style.display = 'block';
                option1Parent.style.justifyContent = 'center';
                firstOption1ChildLi.style.width = 'auto';
            }
            if (lastOption1Child) {
                lastOption1Child.style.display = 'none';
            }
        } else {
            underHeader.style.display = 'none';
            if (firstOption1ChildDiv) {
                firstOption1ChildDiv.style.display = 'none';
                option1Parent.style.justifyContent = '';
                firstOption1ChildLi.style.width = ''; // Reset the width
            }
            if (lastOption1Child) {
                lastOption1Child.style.display = 'block';
            }
        }
    }

    // Xử lý sự kiện scroll và resize
    window.addEventListener('scroll', checkScrollAndResize);
    window.addEventListener('resize', checkScrollAndResize);

    // Gọi hàm lần đầu khi tải trang
    checkScrollAndResize();
});





// nhấn vào quảng cáo
document.addEventListener('DOMContentLoaded', function() {
    const underPbs = document.querySelectorAll('.under_pb');

    underPbs.forEach(function(underPb) {
        const lastLink = underPb.querySelector('.last a');

        underPb.addEventListener('mouseenter', function() {
            underPb.style.cursor = 'pointer';
        });

        underPb.addEventListener('mouseleave', function() {
            underPb.style.cursor = 'auto';
        });

        underPb.addEventListener('click', function(event) {
            lastLink.click();
        });
    });
});





let currentIndexes = {}; // Object to store the current index of each carousel

function getItemsPerView() {
    return window.innerWidth <= 1080 ? 2 : 4;
}

function scrollCarousel(direction, carouselId) {
    const itemsPerView = getItemsPerView();
    const carouselContainer = document.getElementById(carouselId);
    const carousel = carouselContainer.querySelector('.carousel');
    const items = carouselContainer.querySelectorAll('.carousel .carousel-item');
    const totalItems = items.length;

    if (!currentIndexes[carouselId]) {
        currentIndexes[carouselId] = 0;
    }

    currentIndexes[carouselId] += direction;
    let currentIndex = currentIndexes[carouselId];

    // Check if reached the end of items
    const lastItemIndex = totalItems - itemsPerView;
    if (currentIndex < 0) {
        currentIndex = lastItemIndex; // Move to the last set of items
    } else if (currentIndex > lastItemIndex) {
        currentIndex = 0; // Loop back to the first item
    }

    currentIndexes[carouselId] = currentIndex;

    let newTransform = -currentIndex * (100 / itemsPerView);

    // Handle the edge case where remaining items are fewer than itemsPerView
    if (totalItems - currentIndex < itemsPerView && totalItems > itemsPerView) {
        newTransform = -(totalItems - itemsPerView) * (100 / itemsPerView);
    }

    carousel.style.transform = `translateX(${newTransform}%)`;
}

document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-container');
    carousels.forEach(container => {
        const carouselId = container.id;
        const prevButton = container.querySelector('.carousel-button.prev');
        const nextButton = container.querySelector('.carousel-button.next');

        prevButton.addEventListener('click', () => scrollCarousel(-1, carouselId));
        nextButton.addEventListener('click', () => scrollCarousel(1, carouselId));
    });
});

window.addEventListener('resize', () => {
    for (let carouselId in currentIndexes) {
        currentIndexes[carouselId] = 0;
        scrollCarousel(0, carouselId);
    }
});


document.addEventListener('DOMContentLoaded', () => {
    function updateLinkText() {
        const link = document.querySelector('main .under_pb .tong .last a');
        if (link) {
            if (window.innerWidth <= 1080) {
                link.textContent = 'More';
            } else {
                link.textContent = 'Read now';
            }
        }
    }

    // Initial check
    updateLinkText();

    // Add event listener for window resize
    window.addEventListener('resize', updateLinkText);
});


document.addEventListener('DOMContentLoaded', function() {
    const headerSearch = document.querySelector('header .hd .search');

    function checkScrollToShowHeaderSearch() {
        const mainSearch = document.querySelector('main .search');

        if (window.scrollY >= mainSearch.offsetTop) {
            headerSearch.style.display = 'block';
        } else {
            headerSearch.style.display = 'none';
        }
    }

    // Xử lý sự kiện scroll
    window.addEventListener('scroll', checkScrollToShowHeaderSearch);

    // Gọi hàm lần đầu khi tải trang
    checkScrollToShowHeaderSearch();
});


document.addEventListener('DOMContentLoaded', function() {
    const signInLink = document.querySelector('header .cuoi .dang_nhap');
    const signUpLink = document.querySelector('header .cuoi .ha svg');
    const overlay = document.querySelector('.tren_cung');
    const overlayContent = document.querySelector('.tren_cung > div');

    // Function to show overlay
    function showOverlay() {
        overlay.style.display = 'flex';
    }

    // Function to hide overlay
    function hideOverlay() {
        overlay.style.display = 'none';
    }

    // Add click event listener to 'Sign up' link
    signUpLink.addEventListener('click', function(event) {
        event.preventDefault();
        showOverlay();
    });

    // Add click event listener to 'Sign in' link
    signInLink.addEventListener('click', function(event) {
        event.preventDefault();
        showOverlay();
    });

    // Add click event listener to overlayContent to prevent hiding when clicked inside
    overlayContent.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // Add click event listener to document to hide overlay when clicked outside of overlayContent
    document.addEventListener('click', function(event) {
        if (!overlayContent.contains(event.target) && event.target !== signInLink && event.target !== signUpLink) {
            hideOverlay();
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const cap1Elements = document.querySelectorAll('.option1 .cap1.hien');

    // Function to toggle visibility of a specific option2 element
    function toggleOption2(event) {
        // Find the option2 within the clicked cap1Element
        const cap1Element = event.currentTarget;
        const option2 = cap1Element.querySelector('.option2');

        // Hide all option2 elements
        cap1Elements.forEach(function(otherCap1Element) {
            const otherOption2 = otherCap1Element.querySelector('.option2');
            if (otherOption2 !== option2) {
                otherOption2.classList.remove('active');
            }
        });

        option2.classList.toggle('active');
    }

    // Add click event listener to each .cap1.hien element
    cap1Elements.forEach(function(cap1Element) {
        cap1Element.addEventListener('click', function(event) {
            // Prevent default link behavior
            event.preventDefault();
            // Call function to toggle .option2 visibility
            toggleOption2(event);
        });
    });

    // Add click event listener to option2 to prevent anchor tag behavior
    document.querySelectorAll('.option2 a').forEach(function(anchor) {
        anchor.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent click event from propagating
        });
    });
});




document.addEventListener('DOMContentLoaded', function() {
    const firstLink = document.querySelector('main .bf_ft .option a:first-child');
    const lastLink = document.querySelector('main .bf_ft .option a:last-child');
    const mot = document.querySelector('.bf_ft .danh_muc .mot');
    const hai = document.querySelector('.bf_ft .danh_muc .hai');

    function addBorderBottom(clickedElement, otherElement) {
        clickedElement.style.borderBottom = '2px solid black';
        otherElement.style.borderBottom = 'none';
    }

    function toggleVisibility(showElement, hideElement) {
        showElement.style.display = 'flex';
        hideElement.style.display = 'none';
    }

    firstLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default link behavior if necessary
        addBorderBottom(firstLink, lastLink);
        toggleVisibility(mot, hai);
    });

    lastLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default link behavior if necessary
        addBorderBottom(lastLink, firstLink);
        toggleVisibility(hai, mot);
    });
});




document.addEventListener('DOMContentLoaded', function() {
    const triggerElements = document.querySelectorAll('.tren_ft > div > p');
    const listElements = document.querySelectorAll('.tren_ft > div > ul');

    // Function to toggle visibility of list element and icons
    function toggleListVisibility(index) {
        // Toggle visibility of the corresponding list element
        listElements[index].classList.toggle('active');

        // Toggle visibility of icons .cong and .tru
        const congIcon = triggerElements[index].querySelector('.cong');
        const truIcon = triggerElements[index].querySelector('.tru');

        if (listElements[index].classList.contains('active')) {
            // If list is active, hide .cong and show .tru
            congIcon.style.setProperty('display', 'none', 'important');
            truIcon.style.setProperty('display', 'inline-block', 'important');
        } else {
            // If list is not active, show .cong and hide .tru
            congIcon.style.setProperty('display', 'inline-block', 'important');
            truIcon.style.setProperty('display', 'none', 'important');
        }
    }

    // Add click event listener to each trigger element
    triggerElements.forEach(function(triggerElement, index) {
        triggerElement.addEventListener('click', function() {
            toggleListVisibility(index);
        });
    });

    // Click outside to hide all list elements and reset icons
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.tren_ft')) {
            listElements.forEach(function(listElement, index) {
                listElement.classList.remove('active');
                // Reset icons to initial state
                const congIcon = triggerElements[index].querySelector('.cong');
                const truIcon = triggerElements[index].querySelector('.tru');
                congIcon.style.setProperty('display', 'inline-block', 'important');
                truIcon.style.setProperty('display', 'none', 'important');
            });
        }
    });

    // Execute functions when screen width is <= 1080px
    function handleWindowResize() {
        if (window.innerWidth <= 1080) {
            // Add your logic here
            // Example: Toggle visibility of trigger elements, etc.
        }
    }

    // Initial execution on page load
    handleWindowResize();

    // Listen for window resize event
    window.addEventListener('resize', handleWindowResize);
});




document.addEventListener('DOMContentLoaded', function() {
    const triggerElement = document.querySelector('footer .trai .duoi p a');
    const targetElement = document.querySelector('footer .trai .duoi .an');

    // Add click event listener to the trigger element
    triggerElement.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default link behavior
        targetElement.style.display = 'block'; // Show the target element
        triggerElement.style.display = 'none';
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const triggerFooterElement = document.querySelector('footer .trai .duoi p a');
    const targetFooterElement = document.querySelector('footer .trai .duoi .an');

    // Add click event listener to the trigger element
    triggerFooterElement.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default link behavior
        targetFooterElement.style.display = 'block'; // Show the target element
        triggerFooterElement.style.display = 'none';
    });

    const nutMotElement = document.querySelector('footer .phai .tren .nut.mot');
    const nutHaiElement = document.querySelector('footer .phai .tren .nut.hai');
    const listMotElement = document.querySelector('footer .phai .tren > .lists.mot');
    const listHaiElement = document.querySelector('footer .phai .tren > .lists.hai');

    function hideAllLists() {
        listMotElement.classList.remove('active');
        listHaiElement.classList.remove('active');
        nutMotElement.querySelector('.len1').style.display = 'block';
        nutMotElement.querySelector('.xuong1').style.display = 'none';
        nutHaiElement.querySelector('.len1').style.display = 'block';
        nutHaiElement.querySelector('.xuong1').style.display = 'none';
    }

    function toggleList(list) {
        hideAllLists();
        list.classList.toggle('active');

        if (list === listMotElement) {
            if (list.classList.contains('active')) {
                nutMotElement.querySelector('.len1').style.display = 'none';
                nutMotElement.querySelector('.xuong1').style.display = 'block';
            } else {
                nutMotElement.querySelector('.len1').style.display = 'block';
                nutMotElement.querySelector('.xuong1').style.display = 'none';
            }
        }

        if (list === listHaiElement) {
            if (list.classList.contains('active')) {
                nutHaiElement.querySelector('.len1').style.display = 'none';
                nutHaiElement.querySelector('.xuong1').style.display = 'block';
            } else {
                nutHaiElement.querySelector('.len1').style.display = 'block';
                nutHaiElement.querySelector('.xuong1').style.display = 'none';
            }
        }
    }

    nutMotElement.addEventListener('click', function(event) {
        event.stopPropagation();
        toggleList(listMotElement);
        event.preventDefault();
    });

    nutHaiElement.addEventListener('click', function(event) {
        event.stopPropagation();
        toggleList(listHaiElement);
        event.preventDefault();
    });

    document.addEventListener('click', function(event) {
        if (!event.target.closest('footer .phai .tren')) {
            hideAllLists();
        }
    });

    listMotElement.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    listHaiElement.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});


