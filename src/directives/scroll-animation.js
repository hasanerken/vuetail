const animatedScrollObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("enter");
      } else {
        entry.target.classList.remove("enter");
      }
    });
  });
  
  export default {
    beforeMount(el) {
      el.classList.add("before-enter");
      animatedScrollObserver.observe(el);
    }
  };
  