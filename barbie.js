const initSlider = () => {
  const barbieList = document.querySelector(".barbie-list");
  const slideButtons = document.querySelectorAll(".slide-button");
  const slideScrollbar = document.querySelector(".slide-scrollbar");
  const slideScrollbarThumb = document.querySelector(".scrollbar-thumb");
  const maxScrollableWidth = barbieList.scrollWidth - barbieList.clientWidth;

  //Handle click events on slide buttons
  slideButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-button" ? -1 : 1;
      const scrollAmount = barbieList.clientWidth * direction;
      barbieList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });
  //Show of Hide slide Buttons
  const handleSlideButtons = () => {
    slideButtons[0].style.display =
      barbieList.scrollLeft <= 0 ? "none" : "block";
    slideButtons[1].style.display =
      barbieList.scrollLeft >= maxScrollableWidth ? " none" : " block";
  };

  //Update Scrollbar Thumb Position
  const updateScrollbarThumb = () => {
    const scrollPosition = barbieList.scrollLeft;
    const thumbPosition =
      (scrollPosition / maxScrollableWidth) *
      (slideScrollbar.clientWidth - slideScrollbarThumb.offsetWidth);
    slideScrollbarThumb.style.left = `${thumbPosition}px`;
  };

  barbieList.addEventListener("scroll", () => {
    handleSlideButtons();
    updateScrollbarThumb();
  });

  //Handling scrollbar thumb drag
  slideScrollbarThumb.addEventListener("mousedown", (e) => {
    const start = e.clientX;
    const thumbPosition = slideScrollbarThumb.offsetLeft;
    const maxThumbPosition =
      slideScrollbar.getBoundingClientRect().width -
      slideScrollbarThumb.offsetWidth;

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - start;
      const newThumbPosition = thumbPosition + deltaX;
      const boundedPosition = Math.max(
        0,
        Math.min(maxThumbPosition, newThumbPosition)
      );
      const scrollPosition =
        (boundedPosition / maxThumbPosition) * maxScrollableWidth;
      slideScrollbarThumb.style.left = `${boundedPosition}px`;
      barbieList.scrollLeft = scrollPosition;
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });
};

window.addEventListener("load", initSlider);
