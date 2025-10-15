
// use intersection observer to add a class and animate elements when their parent is in view
// Select all elements with the class 'animate'
const animateElements = document.querySelectorAll('.animate');
// Loop through the elements
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            // observer.unobserve(entry.target);
        }
        if (!entry.isIntersecting) {
            entry.target.classList.remove('in-view');
        }
    });
}, {
    // Set the threshold for when the animation should trigger
    threshold: 0.2 // 20% of the element is visible
});
// Observe each element
animateElements.forEach(animateElement => {
    observer.observe(animateElement);
});

