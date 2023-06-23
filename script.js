const randomSquaresContainer = document.getElementById('random-squares');
const section1 = document.querySelector('.parallax-section');
const contentElements = document.querySelectorAll('.content, h1, button');

function generateRandomSquare() {
  const square = document.createElement('div');
  square.classList.add('square');

  const size = Math.floor(Math.random() * 10); // Random size between 50 and 150 pixels
  let positionX, positionY;

  // Generate random position within the frame shape of Section 1 with padding
  do {
    positionX = Math.random() * (section1.offsetWidth);
    positionY = Math.random() * (section1.offsetHeight);

    // Calculate distance from the center of the frame
    const centerX = section1.offsetWidth / 2;
    const centerY = section1.offsetHeight / 2;
    const distanceX = Math.abs(centerX - positionX);
    const distanceY = Math.abs(centerY - positionY);

    // Check if the square is within the frame shape
    if (distanceX + distanceY <= centerX) {
      // Check for collisions with existing squares
      let collision = false;
      const squares = randomSquaresContainer.querySelectorAll('.square');
      squares.forEach((existingSquare) => {
        const existingSquareRect = existingSquare.getBoundingClientRect();
        if (
          positionX < existingSquareRect.right &&
          positionX + size > existingSquareRect.left &&
          positionY < existingSquareRect.bottom &&
          positionY + size > existingSquareRect.top
        ) {
          collision = true;
        }
      });

      // Check for collisions with existing content elements
      contentElements.forEach((element) => {
        const elementRect = element.getBoundingClientRect();
        if (
          positionX < elementRect.right &&
          positionX + size > elementRect.left &&
          positionY < elementRect.bottom &&
          positionY + size > elementRect.top
        ) {
          collision = true;
        }
      });

      if (!collision) {
        break;
      }
    }
  } while (true);

  square.style.width = size + 'px';
  square.style.height = size + 'px';
  square.style.left = positionX + 'px';
  square.style.top = positionY + 'px';

  return square;
}

for (let i = 0; i < 60; i++) { // Generate 6 random squares
  const square = generateRandomSquare();
  randomSquaresContainer.appendChild(square);
}

document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const squares = randomSquaresContainer.querySelectorAll('.square');

  squares.forEach((square) => {
    const squareRect = square.getBoundingClientRect();
    const squareCenterX = squareRect.left + squareRect.width / 2;
    const squareCenterY = squareRect.top + squareRect.height / 2;

    const deltaX = mouseX - squareCenterX;
    const deltaY = mouseY - squareCenterY;

    const angle = Math.atan2(deltaY, deltaX);
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    const maxDistance = 1200; // Maximum distance for the square to move

    if (distance < maxDistance) {
      const moveX = (Math.cos(angle) * (maxDistance - distance)) / maxDistance * 30;
      const moveY = (Math.sin(angle) * (maxDistance - distance)) / maxDistance * 30;

      square.style.transform = `translate3d(${moveX}px, ${moveY}px, ${distance}px)`;
    } else {
      square.style.transform = 'none';
    }
  });
});

randomSquaresContainer.addEventListener('mouseleave', () => {
  const squares = randomSquaresContainer.querySelectorAll('.square');

  squares.forEach((square) => {
    square.style.transform = 'none';
  });
});

window.addEventListener('scroll', function() {
  var floatingBtn = document.getElementById('floatingBtn');
  var scrollProgress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  var blueColor = Math.round(scrollProgress * 2.55); // Convert scroll progress to a value between 0 and 255
  var fillHeight = Math.round(scrollProgress) + '%';
  
  // Update the button background color and fill height based on scroll progress
  floatingBtn.style.background = `linear-gradient(to top, #149C00 ${fillHeight}, #333 ${fillHeight})`;
  
  // Toggle the visibility of the button based on scroll position
  if (window.scrollY >= window.innerHeight) {
    floatingBtn.classList.add('show');
  } else {
    floatingBtn.classList.remove('show');
  }
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

window.addEventListener('scroll', function() {
  var menuBtn = document.getElementById('menuBtn');
  // Toggle the visibility of the button based on scroll position
  if (window.scrollY >= window.innerHeight) {
    menuBtn.classList.add('show');
  } else {
    menuBtn.classList.remove('show');
  }
});

window.addEventListener("scroll", function() {
  var navbar = document.querySelector(".navbar");
  var section1 = document.querySelector(".parallax-content");
  if (window.pageYOffset > section1.offsetHeight) {
    navbar.style.display = "none";
  } else {
    navbar.style.display = "block";
  }
});


    // Function to toggle the side menu overlay and update the menu icon
    function toggleMenu() {
      var sidemenu = document.getElementById("sidemenu");
      sidemenu.classList.toggle("active");

      var menuBtnIcon = document.querySelector("#menuBtn i");
      menuBtnIcon.classList.toggle("fa-bars");
      menuBtnIcon.classList.toggle("fa-times");
    }

    // Add event listeners to each menu item to close the side menu on click
    var menuItems = document.querySelectorAll(".sidemenu-content a");
    menuItems.forEach(function(item) {
      item.addEventListener("click", function() {
        toggleMenu();
      });
    });

    // JavaScript for the parallax effect
    window.addEventListener('scroll', function() {
      var parallaxSection = document.querySelector('.parallax-section');
      var parallaxContent = document.querySelector('.parallax-content');
      var scrollPosition = window.pageYOffset;
      parallaxSection.style.backgroundPositionY = scrollPosition * 0.1 + 'px';
      parallaxContent.style.transform = 'translateY(' + scrollPosition * 0.3 + 'px)';
      behavior = 'smooth'
    });