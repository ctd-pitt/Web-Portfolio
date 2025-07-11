document.addEventListener("DOMContentLoaded", function () {
    const mazeContainer = document.getElementById("maze-id");
    const feagiContainer = document.getElementById("feagi-project");
    const fileContainer = document.getElementById("file-project");
    const video = document.getElementById("hover-video");
    const feagiVideo = document.getElementById("feagi-video");
    const randomColor = getRandomColor();
    const tabContainer = document.querySelector(".tab-container");
    const contactButton = document.getElementById("contact-button");
    const contactOverlay = document.getElementById("contact-overlay");
    const closeContact = document.getElementById("close-contact");
    const copyButtons = document.querySelectorAll(".copy-btn");
    const blurOverlay = document.getElementById("blur-overlay");
    const videoOverlay = document.getElementById("video-overlay");
    const expandedVideo = document.getElementById("expanded-video");
    const videoMenu = document.getElementById("video-menu");
    let closeTimeout = null;
    

    // Set the body's background to the random color
    document.body.style.backgroundColor = randomColor;
    
    // Get the color picker element
    const colorPicker = document.getElementById('color-picker');
    
    // Set the color picker's value to the random color
    if (colorPicker) {
        colorPicker.value = randomColor;
    }

    colorPicker.addEventListener('input', (event) => {
        document.body.style.backgroundColor = event.target.value;
    });
    // Open Contact Menu
    contactButton.addEventListener("click", function () {
        contactOverlay.style.display = "flex";
        // Force reflow to apply initial transform
        void contactOverlay.offsetHeight;
        contactOverlay.classList.add('show');
    });

    // Close Contact Menu
    closeContact.addEventListener("click", function () {
        contactOverlay.classList.remove('show');
        setTimeout(() => { contactOverlay.style.display = "none"; }, 500); // match transition duration
    });


    //Code for each copy button
    copyButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Get the parent `a` tag
            const parentLink = this.previousElementSibling;
            const textToCopy = parentLink.getAttribute("data-clipboard");

            // Copy text to clipboard
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Reset all other buttons to the clipboard icon
                copyButtons.forEach(btn => {
                    btn.classList.remove("copied");
                    btn.innerHTML = '<i class="copy-icon">📋</i>';
                });

                // Change this button to a checkmark
                this.classList.add("copied");
                this.innerHTML = '<i class="copy-icon">✔️</i>';
            });
        });
    });

    // Close overlay when clicking outside the menu
    contactOverlay.addEventListener("click", function (event) {
        if (event.target === contactOverlay) {
            contactOverlay.classList.remove('show');
            setTimeout(() => { contactOverlay.style.display = "none"; }, 500);
        }
    });


    //for every project section
    document.querySelectorAll(".project").forEach(project => {
        const submenu = project.querySelector(".submenu");
        
        
        //add a click event listener to each project
        project.addEventListener("click", function (event) {
            event.stopPropagation(); // Prevents submenu from closing immediately

            // Close all other submenus before opening a new one
            document.querySelectorAll(".submenu").forEach(menu => {
                if (menu !== submenu) {
                    menu.classList.remove("show");
                    setTimeout(() => (menu.style.display = "none"), 300);
                }
            });

            // Toggle the clicked submenu
            if (submenu.classList.contains("show")) {
                submenu.classList.remove("show");
                setTimeout(() => (submenu.style.display = "none"), 300);
            } else {
                submenu.style.display = "flex"; // Show first
                setTimeout(() => submenu.classList.add("show"), 10);
            }
            /* blurOverlay.classList.add("active"); */
            video.classList.add("active");
        });

        // Close submenu when clicking anywhere outside
        document.addEventListener("click", function (event) {
           
            if (!project.contains(event.target)) {
                submenu.classList.remove("show");
                setTimeout(() => (submenu.style.display = "none"), 300);
            }
        });

        // Ensure submenu items don’t close the menu when clicked
        submenu.querySelectorAll(".submenu-item").forEach(item => {
            item.addEventListener("click", function (event) {
                event.stopPropagation();
            });
        });

        // Add the new hover logic here
        project.addEventListener("mouseenter", function () {
            blurOverlay.classList.add("active");
            const projectVideo = project.querySelector(".hover-video");
            if (projectVideo) {
                // Dynamic sizing
                const rect = project.getBoundingClientRect();
                const availableLeft = rect.left - 40; // increased padding for more space
                const maxWidth = Math.min(250, availableLeft);
                projectVideo.style.width = `${maxWidth}px`;
                projectVideo.style.left = `-${maxWidth + 20}px`; // increased gap
                projectVideo.play();
            }
        });

        project.addEventListener("mouseleave", function () {
            blurOverlay.classList.remove("active");
            const projectVideo = project.querySelector(".hover-video");
            if (projectVideo) {
                projectVideo.pause();
            }
        });
    });

    // Prevent page jump on dummy links
    document.querySelectorAll('.submenu-item[href="#"]').forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
      });
    });

    // Add click listener for videos
    document.querySelectorAll('.hover-video').forEach(video => {
      video.addEventListener('click', function() {
        expandedVideo.src = this.src;
        expandedVideo.load();
        videoOverlay.classList.add('active');
        expandedVideo.play();
      });
    });

    // Close overlay on click outside
    videoOverlay.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('active');
        expandedVideo.pause();
      }
    });

    // Add click listener for videos
    document.querySelectorAll('.submenu-item').forEach(item => {
      if (item.textContent.trim() === 'Video') {
        item.addEventListener('click', function(e) {
          e.preventDefault();
          const project = this.closest('.project');
          const projectVideo = project.querySelector('.hover-video');
          if (projectVideo) {
            expandedVideo.src = projectVideo.src;
            expandedVideo.load();
            videoOverlay.classList.add('active');
            expandedVideo.play();
          }
        });
      }
    });

    //scroll to top of page on refresh
    window.onload = function () {
        window.scrollTo(0, 0);
    };
});



function getRandomColor() {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    // Ensure the color is always 6 characters long
    return '#' + color.padStart(6, '0');
}

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');

    // Trigger animation reset
    const activeTab = document.getElementById(tabId);
    activeTab.style.opacity = 0;
    activeTab.style.transform = 'translateY(10px)';

    // Force reflow to restart animation
    void activeTab.offsetHeight;

    activeTab.style.opacity = '';
    activeTab.style.transform = '';
}