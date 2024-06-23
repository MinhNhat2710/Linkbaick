
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
    const option1Elements = document.querySelector('header .hd > .option1');
    const option1Divs = option1Elements.querySelectorAll('li > div');

    function hideAllOption1Divs() {
        option1Divs.forEach(function(div) {
            div.style.display = 'none';
        });
    }

    document.addEventListener('click', function(event) {
        if (!event.target.closest('header .hd > .option1')) {
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
});


document.addEventListener('DOMContentLoaded', function() {
    const underHeader = document.querySelector('.under_header');
    const mainSearch = document.querySelector('main .search');
    const firstOption1ChildDiv = document.querySelector('header .hd > .option1 > li:first-child > div');
    const firstOption1ChildLi = document.querySelector('header .hd > .option1 > li:first-child');
    const option1Parent = document.querySelector('header .hd > .option1');
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


document.addEventListener('DOMContentLoaded', function() {
    const cap1Elements = document.querySelectorAll('.option1 .cap1.hien');

    // Function to toggle visibility of a specific option2 element
    function toggleOption2(event) {
        const cap1Element = event.currentTarget;
        const option2 = cap1Element.querySelector('.option2');

        // Hide all option2 elements except the clicked one
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
            event.preventDefault(); // Prevent default link behavior
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
        taskBarList.style.display = taskBarListVisible ? "none" : "block";
        taskBarListVisible = !taskBarListVisible;
        document.body.style.overflowY = taskBarListVisible ? "hidden" : "auto";
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
