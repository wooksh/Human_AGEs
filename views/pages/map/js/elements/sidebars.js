function initializeSidebars() {
  $(".sidebar").mCustomScrollbar({
    theme: "minimal",
    scrollInertia: 150,
    mouseWheel:{ 
      disableOver: ["select", "option", "textarea", "a", "li", "ul"],
      deltaFactor: 40 // px
    }
  });
}

export default initializeSidebars;