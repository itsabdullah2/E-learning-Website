let mainColor = localStorage.getItem("color-option");

// Check if there's a color in local storage

if (mainColor !== null) {
  document.documentElement.style.setProperty("--main", mainColor);
  // Remove active class from all childrens
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    // Add active class on element with data-color === local storage item
    if (element.dataset.color === mainColor) {
      // Add active class
      element.classList.add("active");
    }
  });
}

// Random Background Option
let backgroundOption = true;

// Variable To Control In Background Interval
let backgroundInterval;

// Check if there's a random background in localStorage
let backgroundLocalStorage = localStorage.getItem("background-option");

if (backgroundLocalStorage !== null) {
  // Remove class active from all spans
  document.querySelectorAll(".random-bg span").forEach((element) => {
    element.classList.remove("active");
  });
  // Add class active on self
  if (backgroundLocalStorage === "true") {
    backgroundOption = true;

    document.querySelector(".random-bg .yes").classList.add("active");
  } else {
    backgroundOption = false;

    document.querySelector(".random-bg .no").classList.add("active");
  }
}

// Function To Open Setting Bar
document.querySelector(".box-icon i").onclick = function () {
  // Rotate the icon
  this.classList.toggle("spin");

  // Open the setting bar
  document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors
let colorLis = document.querySelectorAll(".colors-list li");

// Looping On All Lists
colorLis.forEach((li) => {
  li.addEventListener("click", (e) => {
    // Set Color On Root
    document.documentElement.style.setProperty(
      "--main",
      e.target.dataset.color
    );

    localStorage.setItem("color-option", e.target.dataset.color);

    // Function to remove active class from all childrens
    handleActive(e);
  });
});

// Switch Random Background
let randomBg = document.querySelectorAll(".random-bg span");

// Looping On All Lists
randomBg.forEach((span) => {
  span.addEventListener("click", (e) => {
    // Function to remove active class from all childerns
    handleActive(e);

    // If condition to control in background interval
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      radomBackground();

      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;

      clearInterval(backgroundInterval);

      localStorage.setItem("background-option", false);
    }
  });
});

// navigation toggle bar
let burgerMenu = document.querySelector(".icon .i");
let dropDownBurger = document.querySelector(".dropdown .ul");
let dropDownLogin = document.querySelector(".dropDownLogin");
let dropDownRegister = document.querySelector(".dropDownRegister");

dropDownLogin.addEventListener("click", (e) => {
  e.preventDefault();
  // Change the display of loginPopup from none to block
  loginPopup.style.display = "block";
  // Overlay function
  overlay();
  // Close login popup
  closeLogin.addEventListener("click", closePopupForm);
  // Event to open register popup from login popup
  newAccount.addEventListener("click", () => {
    registerPopup.style.display = "block";
    loginPopup.style.display = "none";
  });

  // Event to close register popup
  closeRegister.addEventListener("click", closePopupForm);
});

dropDownRegister.addEventListener("click", () => {
  overlay();
  registerPopup.style.display = "block";
  closeRegister.addEventListener("click", closePopupForm);

  closePopupOnEsc(registerPopup);
});

burgerMenu.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-bars")) {
    e.target.classList.toggle("fa-x");
  }
  dropDownBurger.classList.toggle("block");
});

// Change Landing Page Background
let landingPage = document.querySelector(".landing-page");

let imgsArray = [
  "landing-1.jpg",
  "landing-2.jpg",
  "landing-3.jpg",
  "landing-4.jpg",
  "landing-5.jpg",
];

// Function To Control in background interval
function radomBackground() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get random background
      let randomImg = Math.floor(Math.random() * imgsArray.length);

      // Change background url
      landingPage.style.backgroundImage =
        'url("imgs/' + imgsArray[randomImg] + '")';
    }, 3000);
  }
}

radomBackground();

// Button To Top
let btn = document.getElementById("btn");

window.onscroll = function () {
  if (window.scrollY >= 600) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

btn.onclick = function () {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

// Function to create overlay
function overlay() {
  let overlay = document.createElement("div");

  overlay.className = "overlay-box";

  document.body.appendChild(overlay);
}

// Call Gallery Images
let galleryImgs = document.querySelectorAll(".our-gallery img");

// Looping On image
galleryImgs.forEach((img) => {
  img.addEventListener("click", () => {
    // Call overlay function
    overlay();

    let popupBox = document.createElement("div");

    popupBox.className = "popup-box";

    // Append popupBox to the page
    document.body.appendChild(popupBox);

    // Looping if there is img's alt
    if (img.alt !== null) {
      let imgheading = document.createElement("h3");

      let imgText = document.createTextNode(img.alt);

      // Append imgText to imgHeading
      imgheading.appendChild(imgText);

      // Append imgHeading to popupBox
      popupBox.appendChild(imgheading);
    }

    let popupImg = document.createElement("img");

    popupImg.src = img.src;

    // Append popupImp to popupBox
    popupBox.appendChild(popupImg);

    let text = document.createElement("p");
    text.className = "text";
    let textContent = document.createTextNode(
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex nesciuntimpedit maxime laborum ducimus molestiae sint dolorum minima"
    );
    text.appendChild(textContent);

    // Append imgHeading to popupBox
    popupBox.appendChild(text);
    // Create Close popup button
    let closeBtn = document.createElement("span");

    let closeText = document.createTextNode("X");

    // Append closeText to CloseBtn
    closeBtn.appendChild(closeText);

    closeBtn.className = "close-btn";

    // Append closeBtn to popupBox
    popupBox.appendChild(closeBtn);
  });
});

// close popup

document.addEventListener("click", (e) => {
  if (e.target.className == "close-btn") {
    // Remove the current popup
    e.target.parentNode.remove();
    // Save overlay box in variable to check if the element is exist
    let overlayElementTwo = document.querySelector(".overlay-box");
    if (overlayElementTwo) {
      // Remove the overlay element
      overlayElementTwo.remove();
    }
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === "Esc") {
    let popupBoxElement = document.querySelector(".popup-box");
    let overlayElementTwo = document.querySelector(".overlay-box");
    if (popupBoxElement) {
      popupBoxElement.remove();
    }
    if (overlayElementTwo) {
      overlayElementTwo.remove();
    }
  }
});

// Select All bullets
let bulletsSection = document.querySelectorAll(".nav-bullets .bullets");

// Select All Links
let links = document.querySelectorAll(".links a");

// Call links of dropdown menu
let dropDownLinks = document.querySelectorAll(".ul .scroll");

// Function to get the selected section
function getTheSection(elements) {
  // Looping on bullets
  elements.forEach((ele) => {
    // Event click
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      // Call bullet and set scrollIntoView method
      document.querySelector(`.${e.target.dataset.section}`).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
getTheSection(bulletsSection);
getTheSection(links);
getTheSection(dropDownLinks);

// Call bullets spans
let bulletsSpans = document.querySelectorAll(".bullets-opt span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bullets = document.querySelector("bullets");

let bulletsLocalItem = localStorage.getItem("bullets-option");

if (bulletsLocalItem !== null) {
  bulletsSpans.forEach((span) => {
    span.classList.remove("active");
    if (bulletsLocalItem === "block") {
      bulletsContainer.style.right = "15px";

      document.querySelector(".bullets-opt .yes").classList.add("active");
    } else {
      bulletsContainer.style.right = "-100px";

      document.querySelector(".bullets-opt .no").classList.add("active");
    }
  });
}

bulletsSpans.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "block") {
      bulletsContainer.style.right = "15px";

      localStorage.setItem("bullets-option", "block");
    } else {
      bulletsContainer.style.right = "-100px";

      localStorage.setItem("bullets-option", "none");
    }

    handleActive(e);
  });
});

// Navbar

// Call login popup items
let login = document.querySelector("#login");
let closeLogin = document.querySelector(".close-login");
let loginPopup = document.querySelector(".login-popup");
// Call register popup items
let registerPopup = document.querySelector(".register-popup");
let newAccount = document.querySelector(".new-account");
let closeRegister = document.querySelector(".close-register");
let openRegister = document.querySelector(".open-register");

login.addEventListener("click", (e) => {
  e.preventDefault();

  loginPopup.style.display = "block";
  // Overlay function
  overlay();

  closeLogin.addEventListener("click", closePopupForm);
  // Close login popup on escape
  closePopupOnEsc(loginPopup);

  newAccount.addEventListener("click", () => {
    registerPopup.style.display = "block";
    loginPopup.style.display = "none";
  });

  closeRegister.addEventListener("click", closePopupForm);
});

openRegister.addEventListener("click", () => {
  overlay();
  registerPopup.style.display = "block";
  closeRegister.addEventListener("click", closePopupForm);
});

closePopupOnEsc(registerPopup);

// Function to close the popup
function closePopupForm() {
  loginPopup.style.display = "none";
  registerPopup.style.display = "none";
  let overlayElementThree = document.querySelector(".overlay-box");
  if (overlayElementThree) {
    overlayElementThree.remove();
  }
}
// Function to close the popup by pressing on Esc button
function closePopupOnEsc(popupElement) {
  function escapeButton(e) {
    if (e.key === "Escape" || e.key === "Esc") {
      let overlayElement = document.querySelector(".overlay-box");
      if (popupElement) {
        popupElement.style.display = "none";
      }
      if (overlayElement) {
        overlayElement.remove();
      }
    }
  }
  document.addEventListener("keydown", escapeButton);
}
// Function To Handle Active State
function handleActive(event) {
  event.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  event.target.classList.add("active");
}

document.querySelector(".reset-option").onclick = () => {
  localStorage.clear();

  window.location.reload();
};

// Chatbot
const chatInput = document.querySelector(".chat-input textarea");
const sendBtn = document.querySelector(".chat-input span");
const chatBox = document.querySelector(".chatbot-box");
const chatBotToggle = document.querySelector(".chatbot-toggler");
const closeChatBot = document.querySelector(".close-btn");

let userMessage;
const inputHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
  // Create chat (li) element with passed message and className
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent =
    className === "outgoing"
      ? `<p></p>`
      : `<span><i class="fa-solid fa-robot"></i></span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
};
const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;
  chatInput.value = "";
  chatInput.style.height = `${inputHeight}px`;
  // Append the user's message to the chatBox
  chatBox.appendChild(createChatLi(userMessage, "outgoing"));
  chatBox.scrollTo(0, chatBox.scrollHeight);

  setTimeout(() => {
    // Display "Typing..." message while waiting for the response
    const incomingChatLi = createChatLi("Typing...", "incoming");
    chatBox.appendChild(incomingChatLi);
    chatBox.scrollTo(0, chatBox.scrollHeight);
  }, 600);
};

chatInput.addEventListener("input", () => {
  // Adjust the height of the textarea based on its content
  chatInput.style.height = `${inputHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  // If enter key is pressed without shift key and the window
  // width is greater that 800px, handle the chat
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault;
    handleChat();
  }
});

sendBtn.addEventListener("click", handleChat);
chatBotToggle.addEventListener("click", () => {
  document.body.classList.toggle("show-chatbot");
});

// Animation

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((e) => observer.observe(e));
