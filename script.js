const textBlocks = document.querySelectorAll('.text-block');
const image = document.getElementById('main-image');

const updateImageOnScroll = () => {
  textBlocks.forEach(block => {
    const rect = block.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5;

    if (isInView) {
      const newImg = block.getAttribute('data-img');
      if (!image.src.includes(newImg)) {
        image.style.opacity = 0;
        setTimeout(() => {
          image.src = `images/${newImg}`;
          image.style.opacity = 1;
        }, 300);
      }
    }
  });
};

window.addEventListener('scroll', updateImageOnScroll);
window.addEventListener('load', updateImageOnScroll);
