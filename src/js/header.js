const getHeaderInitiate = document.querySelector(".project--subheader-bg");
const getHeaderLinks = document.querySelectorAll(".project--link");
let getSubheaderContainer = null;

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

const handleMouseOut = () => {
  getSubheaderContainer?.setAttribute("style", `visibility: hidden`);
  gsap.to(getHeaderInitiate, { height: 0 });
  getSubheaderContainer = null;
};

const menuItemOver = (e) => {
  const target = e.currentTarget.parentElement;
  target.animation?.play();
};

const menuItemOut = (e) => {
  const target = e.currentTarget.parentElement;
  if (isRowElement(e)) return;
  target.animation?.reverse();
};

getHeaderLinks.forEach((item) => {
  const target = item.parentElement;
  const subContainer = target.querySelector(".dropdown--content");
  let tl;
  if (!!subContainer?.children.length) {
    tl = new TimelineLite({ paused: true });
    const getHeight = subContainer.offsetHeight;
    let height = getHeight + 40;
    tl.to(getHeaderInitiate, { duration: 0.9, height: height }).to(
      subContainer,
      { visibility: "visible" }
    );
    target.animation = tl;
  }

  item.addEventListener("mouseover", menuItemOver);
  item.addEventListener("mouseleave", menuItemOut);
  getHeaderInitiate.addEventListener("mouseleave", menuItemOut);
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
      e.currentTarget.parentElement.parentElement.parentElement?.classList.remove("active");
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


  navigationIcons.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const dataAttrName = e.currentTarget.dataset.navName;
        if(dataAttrName === 'login') return;
        const findCurrentAttrModal = document.querySelector(`#${dataAttrName}`);
        const alreadyOpenedModal = document.querySelector('.project--popup-container.active');

        alreadyOpenedModal && alreadyOpenedModal.classList.remove('active');
        findCurrentAttrModal && findCurrentAttrModal.classList.add('active');
        
    });
  });



  const checkWishlist = (wishlistContainer,wishlistContainerElements) => {
    if(wishlistContainerElements?.length > 3){
      wishlistContainer.setAttribute('style', 'justify-content: flex-start;');
    }else{
      wishlistContainer.removeAttribute('style');
    }
  };



  window.onload = function(){
    const wishlistContainer = document.querySelector('.project--wishlist-modal');
    const wishlistContainerElements = document.querySelectorAll('.project--wishlist-modal-item');
    wishlistContainerElements && checkWishlist(wishlistContainer, wishlistContainerElements); 
    window.addEventListener('resize', () => {
      const wishlistContainer = document.querySelector('.project--wishlist-modal');
      const wishlistContainerElements = document.querySelectorAll('.project--wishlist-modal-item');
      wishlistContainerElements && checkWishlist(wishlistContainer, wishlistContainerElements); 
    })
  }