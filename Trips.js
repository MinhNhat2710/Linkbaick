document.addEventListener('DOMContentLoaded', function() {
    const underPb = document.querySelector('.under_pb');
    const lastLink = document.querySelector('.under_pb .tong .last a');

    // Xử lý khi di chuột vào .under_pb
    underPb.addEventListener('mouseenter', function() {
        underPb.style.cursor = 'pointer'; // Thay đổi hình ảnh con trỏ chuột thành hình bàn tay
    });

    // Xử lý khi di chuột ra khỏi .under_pb
    underPb.addEventListener('mouseleave', function() {
        underPb.style.cursor = 'auto'; // Khôi phục hình ảnh con trỏ chuột mặc định
    });

    // Xử lý khi bấm vào .under_pb
    underPb.addEventListener('click', function(event) {
        // Kích hoạt sự kiện click trên phần tử <a>
        lastLink.click();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const signInLink = document.querySelector('.click_login');
    const overlay = document.querySelector('.tren_cung');
    const overlayContent = document.querySelector('.tren_cung > div'); // Lưu trữ phần div bên trong .tren_cung

    // Function to show overlay
    function showOverlay() {
        overlay.classList.add('active');
    }

    // Function to hide overlay
    function hideOverlay() {
        overlay.classList.remove('active');
    }

    // Add click event listener to 'Sign in' link
    signInLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default action of the link
        showOverlay(); // Show the overlay
    });

    // Add click event listener to overlay to hide it when clicked outside of overlayContent
    document.addEventListener('click', function(event) {
        // Check if the click was outside of overlayContent
        if (!overlayContent.contains(event.target) && event.target !== signInLink) {
            hideOverlay(); // Hide the overlay if clicked outside of overlayContent
        }
    });

    // Add click event listener to overlayContent to prevent hiding when clicked inside
    overlayContent.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent click event from bubbling up to document
    });
});


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
});


document.addEventListener('DOMContentLoaded', function() {
    const cap1Elements = document.querySelectorAll('.option1 .cap1.hien');
    const option2Elements = document.querySelectorAll('.option2');

    // Function to toggle visibility of a specific option2 element
    function toggleOption2(event) {
        const cap1Element = event.currentTarget;
        const option2 = cap1Element.querySelector('.option2');

        // Hide all option2 elements except the one clicked
        option2Elements.forEach(function(otherOption2) {
            if (otherOption2 !== option2) {
                otherOption2.classList.remove('active');
            }
        });

        option2.classList.toggle('active');
    }

    // Function to hide all option2 elements
    function hideAllOption2() {
        option2Elements.forEach(function(option2) {
            option2.classList.remove('active');
        });
    }

    // Add click event listener to each .cap1.hien element
    cap1Elements.forEach(function(cap1Element) {
        cap1Element.addEventListener('click', function(event) {
            event.preventDefault();
            toggleOption2(event);
        });
    });

    // Add click event listener to document to hide option2 when clicking elsewhere
    document.addEventListener('click', function(event) {
        const targetElement = event.target;

        // Check if the clicked element is not part of .option1 .cap1.hien or .option2
        if (!targetElement.closest('.option1 .cap1.hien') && !targetElement.closest('.option2')) {
            hideAllOption2();
        }
    });

    // Add click event listener to option2 to prevent anchor tag behavior
    option2Elements.forEach(function(option2) {
        option2.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent click event from propagating
        });
    });
});




// slide show
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
