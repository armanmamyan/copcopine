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


const isRowElement = (e) => {
    console.log(e.relatedTarget);
    if(e.relatedTarget.classList.contains('row')) return true;
    return false;
}

const handleMouseOut = () => {
    const completeFunc = () => {
      getSubheaderContainer?.setAttribute("style", `visibility: hidden`);
      gsap.to(getHeaderInitiate, { height: 0 });
      getSubheaderContainer = null;
    };
    var tl = gsap.timeline({ onComplete: completeFunc });
    tl.fromTo(".nav-sublink", { duration: 1, y: 0 }, { y: -100 })
    .fromTo(
        ".nav--banner-link",
        { x: 0},
        { x: 500, duration: 1  }
      )
  };

  

const handleMouseOver = (e) => {
  const target = e.currentTarget.parentElement;
  getSubheaderContainer = target.querySelector(".dropdown--content");
  if (getSubheaderContainer) {
    getSubheaderContainer.addEventListener('mouseleave', e => {
        if(isRowElement(e)) return;
        handleMouseOut();
    });

    const getHeight = getSubheaderContainer.offsetHeight;
    const height = getHeight + 30;
    const createAsyncCall = new Promise((resolve) => {
      gsap.fromTo(
        getHeaderInitiate,
        { height: 0 },
        { duration: 0.9, height: height }
      );
      setTimeout(() => {
        return resolve(1);
      }, 900);
    });
    createAsyncCall.then((resolve) => {
      if (resolve) {
        var tl = gsap.timeline();
        getSubheaderContainer.setAttribute("style", `visibility: visible`);
        tl.fromTo(".nav-sublink", { y: 100 }, { duration: 1, y: 0 }).fromTo(
          ".nav--banner-link",
          { scale: 0 },
          { transformOrigin: "center right", scale: 1 }
        );
        return 1;
      }
    });
  }
};

getHeaderLinks.forEach((item) => {
  item.addEventListener("mouseover", handleMouseOver);
  item.addEventListener("mouseleave", function onMouseOut(e) {
    //this is the original element the event handler was assigned to
    const target = e.toElement || e.relatedTarget;
    const classNames = ['dropdown--content', 'project--subheader-bg']; 
    while(classNames.some(classes => target.classList.contains(classes))){
        return false;
    }

    handleMouseOut(e);
  });
  item.addEventListener("touchstart", handleMouseOver);
});