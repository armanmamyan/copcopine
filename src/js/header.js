const getHeaderInitiate = document.querySelector(".project--subheader-bg");
const getHeaderLinks = document.querySelectorAll(".project--link");
let getSubheaderContainer = null;
let previousElement = document.querySelector(".project--link.active");
let inputsOfDOM = document.getElementsByClassName('project--input');


function keepInputPlaceholder(input) {
  input.nextElementSibling.style.top = '-5px';
  input.nextElementSibling.style.transform = 'none';
  input.nextElementSibling.style.fontSize = '10px';
}

function preventInputPlaceholder(input) {
  input.nextElementSibling.style.top = '';
  input.nextElementSibling.style.transform = '';
}

function handleOutsideClick() {
  window.addEventListener("click", (e) => {
    if (e.target == modalOverlay) {
      getPopup.classList.contains("active") &&
        getPopup.classList.remove("active");
      getPopup2.classList.contains("active") &&
        getPopup2.classList.remove("active");
      modalOverlay.classList.remove("active");
      return;
    }
  });
}

const menuItemOver = (e) => {
  const target = e.currentTarget;
  const targetPaddingLeft = parseInt(window.getComputedStyle(target, null).getPropertyValue('padding-left'), 10);
  const hoveredElement = e.target;
  const lastChild = target.lastElementChild;
  const findPreviousElem = document.querySelector('.nav-item.active');
  if(window.innerWidth < 1200 && findPreviousElem){
    findPreviousElem.classList.remove('active');
  }
  target.classList.add('active');
  if(window.innerWidth >= 769){
    if(hoveredElement.dataset.section !== 'brand'){
      if(target.parentElement.lastElementChild.previousElementSibling == target){
        lastChild?.setAttribute('style',`padding-inline-end: ${Math.abs(window.innerWidth - target.getBoundingClientRect().left - target.offsetWidth - 90)}px`);
      }else{
        let targetLeft = target.getBoundingClientRect().left;
        if(window.innerWidth < 1200 && targetLeft === 0){
          targetLeft = 58
        }
        lastChild?.setAttribute('style',`padding-inline-start: ${targetLeft + targetPaddingLeft}px`);
      }
    }
  }
  if(window.innerWidth > 1200){
    getHeaderLinks.forEach(item => !item.parentElement.classList.contains('active') && item.classList.add('hover--opacity'));
  }
};

const handleMenuClick = e => {
  const target = e.currentTarget;
  if(target.classList.contains('active')){
    target.classList.remove('active')
    return;
  }
  if(previousElement){
    previousElement.classList.remove('active');
  }
  target.classList.add('active');
  previousElement = target;
}

const menuItemOut = (e) => {
  const target = e.currentTarget;
  const lastChild = target.lastElementChild;
  const lastChildRow = lastChild.querySelector('.container');
  getHeaderLinks.forEach(item => item.classList.remove('hover--opacity'));
  lastChildRow?.removeAttribute('style');
  e.currentTarget.classList.remove('active');
};

getHeaderLinks.forEach((item) => {
  if(window.innerWidth > 1200){
    item.parentElement.addEventListener("mouseover", menuItemOver);
    item.parentElement.addEventListener("mouseleave", menuItemOut);
  }
});


for (let input of inputsOfDOM) {
  input.addEventListener('input', function(e) {
      var value = input.value.trim();
      if (value) {
          keepInputPlaceholder(input);
      } else {
          preventInputPlaceholder(input);
      }
  });
}

let cartPopupIsOpen = false;
let userPopupIsOpen = false;
const logo = document.querySelector('.project--logo');
const forgotPassword = document.querySelector(".forgot--pasword");
const loginForm = document.querySelector("#login1");
const loginStep2 = document.querySelector(".login--btn-step2");
const resetPassForm = document.querySelector("#forgotPassword");
const resetPassForm2 = document.querySelector("#forgotPassword2");
const loginPopupContainer = document.querySelector(".project--popup-multistep");
const arrow = document.querySelector('.popup-arrow');
const userIcon = document.querySelector(
  '.primary--link-item[data-nav-name="login"]'
);
const navigationIcons = document.querySelectorAll('.primary--link-item');
const createAccount = document.querySelector("#createAccountBtn");
const modalOverlay = document.querySelector(".modalOverlay");
const loginGoBackBtn = document.querySelectorAll(".project--popup-goback");
const loginCloseButton = document.querySelectorAll(".project--popup-close");
const createAccModal = document.querySelector("#createAccount");
const resetPassStep2Btn = document.querySelector(".reset-pass-step-2");
const navbar = document.querySelector('header .navbar-toggler');

forgotPassword &&
  forgotPassword.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("active");
    resetPassForm.classList.add("active");
  });

userIcon &&
  userIcon.addEventListener("click", (e) => {
    e.preventDefault();
    if(window.innerWidth < 1200 && navbar.classList.contains('showing')){
      navbar.click();
      e.currentTarget.setAttribute('style', 'opacity: 1; display: block !important;');
      logo.setAttribute('style', 'overflow: hidden;width: 0;height: 0;');
    }
    if (userPopupIsOpen) {
      loginPopupContainer.classList.remove("active");
      arrow.removeAttribute('style');
      modalOverlay?.classList.remove("active");
      userPopupIsOpen = !userPopupIsOpen;
      return;
    }

    if (resetPassForm && resetPassForm.classList.contains("active")) {
      resetPassForm.classList.remove("active");
      loginForm.classList.add("active");
    }

    if (resetPassForm2 && resetPassForm2.classList.contains("active")) {
      resetPassForm2.classList.remove("active");
      loginForm.classList.add("active");
    }
   
    if (cartPopupIsOpen) {
      document.querySelector('#cart')?.classList.remove("active");
      cartPopupIsOpen = !cartPopupIsOpen;
      arrow.removeAttribute('style');
      if (resetPassForm.classList.contains("active")) {
        resetPassForm.classList.remove("active");
        loginForm.classList.add("active");
      }
      if (resetPassForm2.classList.contains("active")) {
        resetPassForm2.classList.remove("active");
        loginForm.classList.add("active");
      }
    }
    const alreadyOpenedModal = document.querySelector('.project--popup-container.active');
    alreadyOpenedModal && alreadyOpenedModal.classList.remove('active');
    loginPopupContainer.classList.add("active");
    const userIconLeft = userIcon.getBoundingClientRect().left;
    arrow?.setAttribute('style', `display:block; left: ${userIconLeft}px; top: ${loginPopupContainer.getBoundingClientRect().top - 17}px`);

    modalOverlay?.classList.add("active");
    userPopupIsOpen = !userPopupIsOpen;
    handleOutsideClick();
  });

resetPassStep2Btn &&
  resetPassStep2Btn.addEventListener("click", (e) => {
    e.preventDefault();
    resetPassForm.classList.remove("active");
    resetPassForm2.classList.add("active");
  });

loginGoBackBtn &&
  loginGoBackBtn.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      e.currentTarget.parentElement.parentElement.classList.remove("active");
      loginForm.classList.add("active");
    });
  });

  loginCloseButton.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      e.currentTarget.setAttribute('style', 'opacity: 1;');
      const parentID = e.currentTarget.parentElement.parentElement.parentElement.id;
      const searchId = e.currentTarget.parentElement.parentElement.id;
      if(window.innerWidth < 1200){
          const findIcon = document.querySelector(`.primary--link-item[data-nav-name=${parentID || searchId}]`);
          findIcon && findIcon.removeAttribute('style');
          logo.removeAttribute('style');
      }

      if(parentID === 'login'){
        e.currentTarget.parentElement.parentElement.parentElement?.classList.remove("active");
        if(e.currentTarget.parentElement.parentElement.id !== 'login1'){
          e.currentTarget.parentElement.parentElement.classList.remove("active");
          document.querySelector('#login1')?.classList?.add('active');
        }
        if(userPopupIsOpen){
          userPopupIsOpen = !userPopupIsOpen;
        }
        return;
      }
      e.currentTarget.parentElement.parentElement?.classList.remove("active");
      if(userPopupIsOpen){
        userPopupIsOpen = !userPopupIsOpen;
      }
    });
  });

  if(createAccount){
    createAccountBtn.addEventListener("click", () => {
      loginForm.classList.remove("active");
      createAccModal.classList.add("active");
    });
  }
  

loginStep2 &&
  loginStep2.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.add("active");
    resetPassForm2?.classList.remove("active");
  });


  const handleNavigationClick = (e) => {
    if(window.innerWidth < 1200 && navbar.classList.contains('showing') && e.currentTarget.dataset.navName === 'search'){
      e.preventDefault();
      navbar.click();
      logo.setAttribute('style', 'overflow: hidden;width: 0;height: 0;');
      e.currentTarget.setAttribute('style', 'opacity: 1; display: block !important;');
      const dataAttrName = e.currentTarget.dataset.navName;
      userPopupIsOpen = false;
      const findCurrentAttrModal = document.querySelector(`#${dataAttrName}`);
      const alreadyOpenedModal = document.querySelector('.project--popup-container.active');
      alreadyOpenedModal && alreadyOpenedModal.classList.remove('active');
      findCurrentAttrModal && findCurrentAttrModal.classList.add('active');
      return;
    }
    if(window.innerWidth > 1200 || e.currentTarget.dataset.navName === 'search'){
      e.preventDefault();
      const dataAttrName = e.currentTarget.dataset.navName;
      if(dataAttrName === 'login') return;
      userPopupIsOpen = false;
      const findCurrentAttrModal = document.querySelector(`#${dataAttrName}`);
      const alreadyOpenedModal = document.querySelector('.project--popup-container.active');
      const userIconLeft = e.currentTarget.getBoundingClientRect().left;
      alreadyOpenedModal && alreadyOpenedModal.classList.remove('active');
      findCurrentAttrModal && findCurrentAttrModal.classList.add('active');
      arrow.setAttribute('style', `display:block; left: ${userIconLeft}px; top: ${findCurrentAttrModal.getBoundingClientRect().top - 17}px`);
      
      if(dataAttrName === 'cart'){
        findCurrentAttrModal.setAttribute('style', `right: -20px !important;`);
        cartPopupIsOpen = true;
      }else{
        findCurrentAttrModal.removeAttribute('style');
      }
      if(dataAttrName === 'wishlist' || dataAttrName === 'cart'){
        const getInnerElementChilds = findCurrentAttrModal.children[1];
        if(getInnerElementChilds?.children.length > 1){
          getInnerElementChilds.children[0].setAttribute('style', 'padding-block-end: 0');
        }
      }
      return;
    }
    
  }


  navigationIcons.forEach(item => {
    item.addEventListener('click', handleNavigationClick);
  });



  const checkWishlist = (wishlistContainer,wishlistContainerElements) => {
    if(wishlistContainer){
      if(wishlistContainerElements?.length > 3){
        wishlistContainer.setAttribute('style', 'justify-content: flex-start;');
      }else{
        wishlistContainer.removeAttribute('style');
      }
    }
    
  };

  // Password Start
  const passwordInput = document.querySelector('#passwordInput');
  const passwordBtn = document.querySelector('.popup-form-search-btn[name="passwordShowHide"]');
  passwordBtn.addEventListener('click', (e) => {
    const target = e.currentTarget;
    if(target.firstElementChild.classList.contains('active')){
      target.firstElementChild.classList.remove('active');
      passwordInput.type = 'password';
      return;
    }
    target.firstElementChild.classList.add('active');
    passwordInput.type = 'text';
  });
  // Password End

  window.onload = function(){
    const wishlistContainer = document.querySelector('.project--wishlist-modal');
    const wishlistContainerElements = document.querySelectorAll('.project--wishlist-modal-item');
    wishlistContainerElements && checkWishlist(wishlistContainer, wishlistContainerElements);
    if(window.innerWidth < 1200){
      getHeaderLinks.forEach((item) => {
        if (window.innerWidth < 769) {
          item.parentElement.addEventListener("click", handleMenuClick);
          return;
        } 
        item.parentElement.addEventListener("click", menuItemOver);
      });

      $('header .collapse').on('show.bs.collapse', function () {
        document.body.setAttribute('style', 'overflow: hidden');
        getHeaderLinks[0].click();
        navbar.classList.add('showing');
        getHeaderLinks[0].classList.add('active');

      });
      $('header .collapse').on('hidden.bs.collapse', function () {
        getHeaderLinks[0].click();
        navbar.classList.remove('showing');
        document.body.removeAttribute('style');
      });
    }
  }

  window.addEventListener('resize', () => {
    const wishlistContainer = document.querySelector('.project--wishlist-modal');
    const wishlistContainerElements = document.querySelectorAll('.project--wishlist-modal-item');
    wishlistContainerElements && checkWishlist(wishlistContainer, wishlistContainerElements); 
    
    if(window.innerWidth < 1200){
      getHeaderLinks.forEach((item) => {
        if (window.innerWidth < 769) {
          item.parentElement.addEventListener("click", handleMenuClick);
          getHeaderLinks[0].click();
          getHeaderLinks[0].classList.add('active');
          return;
        } 
        item.parentElement.addEventListener("click", menuItemOver);
        getHeaderLinks[0].click();                      
        getHeaderLinks[0].classList.add('active');
      });
      $('header .collapse').on('show.bs.collapse', function () {
        getHeaderLinks[0].click();
        navbar.classList.add('showing');
      });
      $('header .collapse').on('hidden.bs.collapse', function () {
        getHeaderLinks[0].click();
        navbar.classList.remove('showing');
      });
    }
  });

  window.addEventListener('scroll', () => {
    const activePopup = document.querySelector('.project--popup-container.active');
    if(activePopup){
      arrow.style.top = (activePopup.getBoundingClientRect().top - 17) + 'px'
    }
  });


