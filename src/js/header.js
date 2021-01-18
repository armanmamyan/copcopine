const getHeaderInitiate = document.querySelector(".project--subheader-bg");
const getHeaderLinks = document.querySelectorAll(".project--link");
let getSubheaderContainer = null;
let previousElement = null;

function isParent(refNode, otherNode) {
  var parent = otherNode.parentNode;
  do {
    if (refNode == parent) {
      return true;
    } else {
      parent = parent.parentNode;
    }
  } while (parent);
  return false;
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

const isRowElement = (e) => {
  if (
    e.relatedTarget?.classList.contains("row") ||
    e.relatedTarget?.classList.contains("project--subheader-bg")
  )
    return true;
  return false;
};


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
  if(window.innerWidth > 1200){
    if(hoveredElement.dataset.section !== 'brand'){
      if(target.parentElement.lastElementChild == target){
        lastChild?.setAttribute('style',`padding-inline-end: ${window.innerWidth - target.getBoundingClientRect().left - target.offsetWidth - 104}px`);
      }else{
        lastChild?.setAttribute('style',`padding-inline-start: ${target.getBoundingClientRect().left + targetPaddingLeft}px`);
      }
    }else{
      console.log('mti hambal');
    }
    getHeaderLinks.forEach(item => !item.parentElement.classList.contains('active') && item.parentElement.classList.add('hover--opacity'));
  }
};

const handleMenuClick = e => {
  const target = e.currentTarget;
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
  getHeaderLinks.forEach(item => item.parentElement.classList.remove('hover--opacity'));
  lastChildRow?.removeAttribute('style');
  e.currentTarget.classList.remove('active');
};

getHeaderLinks.forEach((item) => {
  if(window.innerWidth > 1200){
    item.parentElement.addEventListener("mouseover", menuItemOver);
    item.parentElement.addEventListener("mouseleave", menuItemOut);
  }
});

let cartPopupIsOpen = false;
let userPopupIsOpen = false;
const forgotPassword = document.querySelector(".forgot--pasword");
const loginForm = document.querySelector("#login1");
const loginStep2 = document.querySelector(".login--btn-step2");
const resetPassForm = document.querySelector("#forgotPassword");
const resetPassForm2 = document.querySelector("#forgotPassword2");
const loginPopupContainer = document.querySelector(".project--popup-multistep");
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

forgotPassword &&
  forgotPassword.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("active");
    resetPassForm.classList.add("active");
  });

userIcon &&
  userIcon.addEventListener("click", (e) => {
    e.preventDefault();
    if (userPopupIsOpen) {
      loginPopupContainer.classList.remove("active");
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
      cartPopup.classList.remove("active");
      cartPopupIsOpen = !cartPopupIsOpen;
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
      if(e.currentTarget.parentElement.parentElement.parentElement.id === 'login'){
        console.log('gandon');
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

createAccountBtn &&
  createAccountBtn.addEventListener("click", () => {
    loginForm.classList.remove("active");
    createAccModal.classList.add("active");
  });

loginStep2 &&
  loginStep2.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.add("active");
    resetPassForm2?.classList.remove("active");
  });


  const handleNavigationClick = (e) => {
    if(window.innerWidth > 1200 || e.currentTarget.dataset.navName === 'search'){
      e.preventDefault();
      const dataAttrName = e.currentTarget.dataset.navName;
      if(dataAttrName === 'login') return;
      const findCurrentAttrModal = document.querySelector(`#${dataAttrName}`);
      const alreadyOpenedModal = document.querySelector('.project--popup-container.active');
      alreadyOpenedModal && alreadyOpenedModal.classList.remove('active');
      findCurrentAttrModal && findCurrentAttrModal.classList.add('active');

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
    if(wishlistContainerElements?.length > 3){
      wishlistContainer.setAttribute('style', 'justify-content: flex-start;');
    }else{
      wishlistContainer.removeAttribute('style');
    }
  };

  if(window.innerWidth < 1200){
    getHeaderLinks.forEach((item) => {
      item.parentElement.addEventListener("click", menuItemOver);
    });
    getHeaderLinks[0].click();
  }

  window.onload = function(){
    const wishlistContainer = document.querySelector('.project--wishlist-modal');
    const wishlistContainerElements = document.querySelectorAll('.project--wishlist-modal-item');
    wishlistContainerElements && checkWishlist(wishlistContainer, wishlistContainerElements); 
  }

  window.addEventListener('resize', () => {
    const wishlistContainer = document.querySelector('.project--wishlist-modal');
    const wishlistContainerElements = document.querySelectorAll('.project--wishlist-modal-item');
    wishlistContainerElements && checkWishlist(wishlistContainer, wishlistContainerElements); 
    if(window.innerWidth < 1200){
      getHeaderLinks.forEach((item) => {
        item.parentElement.addEventListener("click", menuItemOver);
        getHeaderLinks[0].click();
      });
    }
  });