(() => {
  const wrappers = document.querySelectorAll('.map-wrapper');
  wrappers.forEach((wrapper) => {
    const iframe = wrapper.querySelector('iframe');

    wrapper.addEventListener('click', () => {
      iframe.style.pointerEvents = 'auto';
    });

    wrapper.addEventListener('mouseleave', () => {
      iframe.style.pointerEvents = 'none';
    });
  });
})();
