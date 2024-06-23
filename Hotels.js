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





document.addEventListener("DOMContentLoaded", function () {
    // Task Bar
    const toggleButton = document.querySelector(".task_bar > a:first-child");
    const taskBarList = document.querySelector(".task_bar ul");
    let taskBarListVisible = false;

    function toggleTaskBarList(event) {
        event.preventDefault();
        event.stopPropagation();
        taskBarList.style.display = taskBarListVisible ? "none" : "block";
        taskBarListVisible = !taskBarListVisible;
        document.body.style.overflowY = taskBarListVisible ? "hidden" : "auto";
    }

    function hideTaskBarList() {
        taskBarList.style.display = "none";
        taskBarListVisible = false;
        document.body.style.overflowY = "auto";
    }

    toggleButton.addEventListener("click", toggleTaskBarList);

    document.addEventListener("click", function (event) {
        if (!taskBarList.contains(event.target) && !toggleButton.contains(event.target)) {
            hideTaskBarList();
        }
    });

    taskBarList.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    window.addEventListener("resize", function () {
        if (taskBarListVisible) {
            document.body.style.overflowY = (document.body.clientWidth > 768) ? "hidden" : "auto";
        }
    });

    // Option 1
    const option1Selector = 'header .hd .option1';
    const option1Elements = document.querySelector(option1Selector);
    const option1Divs = option1Elements.querySelectorAll('li > div');

    function hideAllOption1Divs() {
        option1Divs.forEach(div => div.style.display = 'none');
    }

    function toggleOption1Div(event) {
        const div = this.querySelector('div');
        const isVisible = div.style.display === 'block';
        hideAllOption1Divs();
        div.style.display = isVisible ? 'none' : 'block';
        event.stopPropagation();
    }

    option1Elements.querySelectorAll('li').forEach(li => {
        li.addEventListener('click', toggleOption1Div);
    });

    const searchDiv = document.querySelector('header .hd .option1 .search');
    searchDiv.addEventListener('click', function (event) {
        const otherDivs = Array.from(option1Divs).filter(div => div !== searchDiv);
        otherDivs.forEach(div => div.style.display = 'none');
        event.stopPropagation();
    });
});


document.addEventListener('DOMContentLoaded', function () {
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
    signUpLink.addEventListener('click', function (event) {
        event.preventDefault();
        showOverlay();
    });

    // Add click event listener to 'Sign in' link
    signInLink.addEventListener('click', function (event) {
        event.preventDefault();
        showOverlay();
    });

    // Add click event listener to overlayContent to prevent hiding when clicked inside
    overlayContent.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    // Add click event listener to document to hide overlay when clicked outside of overlayContent
    document.addEventListener('click', function (event) {
        if (!overlayContent.contains(event.target) && event.target !== signInLink && event.target !== signUpLink) {
            hideOverlay();
        }
    });
});



//slide show
document.addEventListener('DOMContentLoaded', (event) => {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const itemWidth = 150; // Chiều rộng của mỗi mục
    const totalItems = items.length;
    let currentIndex = 0;
    let moveRightCount = 0; // Số lần di chuyển sang phải
    let moveLeftCount = 0; // Số lần di chuyển sang trái

    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');

    function updateCarousel() {
        const offset = -currentIndex * itemWidth;
        carousel.style.transform = `translateX(${offset}px)`;
        updateButtonsState();
    }

    let maxMoveCount = 5; // Số lần di chuyển tối đa mặc định

    function nextItem() {
        // Kiểm tra chiều dài của web (viewport width)
        const viewportWidth = window.innerWidth;

        // Cập nhật giá trị của maxMoveCount tùy theo chiều dài của web
        if (viewportWidth > 1080) {
            maxMoveCount = 5;
        }
        if (viewportWidth < 1080) {
            maxMoveCount = 8;
        } if (viewportWidth < 500) {
            maxMoveCount = 9;
        }

        if (currentIndex < totalItems - 1) {
            currentIndex++;
            moveRightCount++;
            if (moveRightCount >= maxMoveCount) {
                currentIndex = 0;
                moveRightCount = 0;
                resetCarousel();
            } else {
                updateCarousel();
            }
        }
    }


    function prevItem() {
        if (currentIndex > 0) {
            currentIndex--;
            moveLeftCount++;
            updateCarousel();
        }
    }

    function resetCarousel() {
        currentIndex = 0;
        moveRightCount = 0;
        carousel.style.transform = `translateX(0px)`;
        updateButtonsState();
    }

    function updateButtonsState() {
        // Bấm vào nút next
        if (moveRightCount >= maxMoveCount) {
            nextButton.disabled = true;
        } else {
            nextButton.disabled = false;
        }
    }

    prevButton.addEventListener('click', prevItem);
    nextButton.addEventListener('click', nextItem);

    // Thiết lập CSS ban đầu cho carousel
    carousel.style.display = 'flex';
    carousel.style.transition = 'transform 0.5s ease-in-out';

    // Cập nhật trạng thái nút khi tải trang
    updateButtonsState();
});







// option header
document.addEventListener('DOMContentLoaded', function() {
    var linkElement = document.querySelector('.real_header .trai > a');
    var optionElement = document.querySelector('.real_header .trai .option_rh');
    var lenElement = document.querySelector('.real_header .trai .len');
    var xuongElement = document.querySelector('.real_header .trai .xuong');

    optionElement.style.display = 'none'; // Ẩn optionElement ban đầu

    linkElement.addEventListener('click', function(event) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>

        var optionDisplay = window.getComputedStyle(optionElement).display;

        if (optionDisplay === 'none') {
            // Nếu optionElement đang ẩn thì hiển thị nó lên và ẩn lenElement, hiển thị xuongElement
            optionElement.style.display = 'block';
            lenElement.style.display = 'block';
            xuongElement.style.display = 'none';
        } else {
            // Nếu optionElement đang hiển thị thì ẩn nó đi, hiển thị lenElement và ẩn xuongElement
            optionElement.style.display = 'none';
            lenElement.style.display = 'none';
            xuongElement.style.display = 'block';
        }
    });
});

// slide show
let currentIndexes = {}; 

function getItemsPerView() {
    return window.innerWidth <= 1080 ? 2 : 2;
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


// slide dahf cho ảnh lớn
let currentIndexCarousel6 = 0; 

function scrollSingleImageCarousel6(direction) {
    const carouselContainer = document.getElementById('carousel6');
    const carousel = carouselContainer.querySelector('.carousel');
    const items = carouselContainer.querySelectorAll('.carousel .carousel-item');
    const totalItems = items.length;

    currentIndexCarousel6 += direction;


    if (currentIndexCarousel6 < 0) {
        currentIndexCarousel6 = totalItems - 1;
    } else if (currentIndexCarousel6 >= totalItems) {
        currentIndexCarousel6 = 0; 
    }

    let newTransform = -currentIndexCarousel6 * 100; 

    carousel.style.transform = `translateX(${newTransform}%)`;
}

document.addEventListener('DOMContentLoaded', () => {
    const carousel6 = document.getElementById('carousel6');
    const prevButton = carousel6.querySelector('.carousel-button.prev');
    const nextButton = carousel6.querySelector('.carousel-button.next');

    prevButton.addEventListener('click', () => scrollSingleImageCarousel6(-1));
    nextButton.addEventListener('click', () => scrollSingleImageCarousel6(1));
});

window.addEventListener('resize', () => {
});


// ẩn hiện văn bản
document.addEventListener('DOMContentLoaded', function() {
    var moreLinks = document.querySelectorAll('.more');
    var lessLinks = document.querySelectorAll('.less');

    moreLinks.forEach(function(moreLink) {
        moreLink.addEventListener('click', function(event) {
            event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ <a>

            var hiddenElement = moreLink.parentElement.querySelector('.an');
            var lessLink = moreLink.parentElement.querySelector('.less');

            hiddenElement.style.display = 'block'; // Hiển thị phần tử ẩn
            moreLink.style.display = 'none'; // Ẩn liên kết "Xem thêm"
            lessLink.style.display = 'inline-block'; // Hiển thị liên kết "Thu gọn"
        });
    });

    lessLinks.forEach(function(lessLink) {
        lessLink.addEventListener('click', function(event) {
            event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ <a>

            var hiddenElement = lessLink.parentElement.querySelector('.an');
            var moreLink = lessLink.parentElement.querySelector('.more');

            hiddenElement.style.display = 'none'; // Ẩn phần tử ẩn
            moreLink.style.display = 'inline-block'; // Hiển thị liên kết "Xem thêm"
            lessLink.style.display = 'none'; // Ẩn liên kết "Thu gọn"
        });
    });
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
