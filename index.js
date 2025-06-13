// This is the JavaScript code for the typing effect

// function([string1, string2],target id,[color1,color2])

consoleText(
  ["Class of Creators.", "Because it's Mercedez-Benz", "Made with Love."],
  "text",
  ["tomato", "rebeccapurple", "lightblue"]
);

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ["#fff"];
  var visible = true;
  var con = document.getElementById("console");
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id);
  target.setAttribute("style", "color:" + colors[0]);
  window.setInterval(function () {
    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount);
      window.setTimeout(function () {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute("style", "color:" + colors[0]);
        letterCount += x;
        waiting = false;
      }, 1000);
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function () {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000);
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount);
      letterCount += x;
    }
  }, 120);
  window.setInterval(function () {
    if (visible === true) {
      con.className = "console-underscore hidden";
      visible = false;
    } else {
      con.className = "console-underscore";

      visible = true;
    }
  }, 400);
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize ScrollOut with modified settings
  if (typeof ScrollOut !== 'undefined') {
    ScrollOut({
      threshold: 0.1,
      once: false,
      cssProps: {
        visibleY: true,
        viewportY: true
      }
    });
  }

  // Performance Section Initialization
  const performanceSection = document.querySelector('#performance-section');
  const performanceHeader = document.querySelector('.performance-header');
  const speedometerContainer = document.querySelector('.speedometer-container');
  const carFeatures = document.querySelector('.car-features');

  // Ensure elements are visible
  if (performanceSection) {
    performanceSection.style.opacity = '1';
    performanceSection.style.visibility = 'visible';
  }

  // Initialize GSAP animations
  gsap.set([performanceHeader, speedometerContainer, carFeatures], {
    opacity: 1,
    y: 0
  });

  // Performance Section Animations
  // Speedometer Animation
  const speedometer = {
    value: 0,
    target: 320,
    duration: 2,
    ease: "power2.out"
  };

  gsap.to(speedometer, {
    value: speedometer.target,
    duration: speedometer.duration,
    ease: speedometer.ease,
    onUpdate: () => {
      document.querySelector('.speed-value').textContent = Math.round(speedometer.value);
      const progress = (speedometer.value / speedometer.target) * 100;
      document.querySelector('.speedometer-progress').style.strokeDashoffset = 251.2 - (251.2 * progress / 100);
    }
  });

  // 0-100 Time Animation
  gsap.to('.time-value', {
    innerText: 2.9,
    duration: 2,
    snap: { innerText: 0.1 },
    ease: "power2.out"
  });

  // Feature Cards Animation
  const features = [
    { value: 831, unit: 'HP' },
    { value: 1000, unit: 'lb-ft' },
    { value: 320, unit: 'km/h' }
  ];

  features.forEach((feature, index) => {
    gsap.to(`.feature-card:nth-child(${index + 1}) .feature-value`, {
      innerText: feature.value,
      duration: 2,
      snap: { innerText: 1 },
      ease: "power2.out"
    });
  });

  // Car Highlights Animation
  const highlights = document.querySelectorAll('.highlight');
  highlights.forEach((highlight, index) => {
    gsap.from(highlight, {
      opacity: 0,
      x: -50,
      duration: 0.8,
      delay: index * 0.3,
      ease: "power2.out"
    });
  });

  // Enhanced 3D Car Image Effect
  const carImage = document.querySelector('.car-image');
  let isDragging = false;
  let startX, startY;
  let currentRotationX = 0;
  let currentRotationY = 0;

  // Mouse/Touch Events for 3D Effect
  carImage.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    currentRotationY += deltaX * 0.5;
    currentRotationX -= deltaY * 0.5;

    gsap.to(carImage, {
      rotationY: currentRotationY,
      rotationX: currentRotationX,
      duration: 0.1,
      ease: "none"
    });

    startX = e.clientX;
    startY = e.clientY;
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch events for mobile
  carImage.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;

    const deltaX = e.touches[0].clientX - startX;
    const deltaY = e.touches[0].clientY - startY;

    currentRotationY += deltaX * 0.5;
    currentRotationX -= deltaY * 0.5;

    gsap.to(carImage, {
      rotationY: currentRotationY,
      rotationX: currentRotationX,
      duration: 0.1,
      ease: "none"
    });

    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  document.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Interactive Speedometer with Sound Effects
  const speedSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
  speedSound.volume = 0.3;

  speedometerContainer.addEventListener('click', () => {
    speedSound.currentTime = 0;
    speedSound.play();

    gsap.to(speedometer, {
      value: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        gsap.to(speedometer, {
          value: speedometer.target,
          duration: speedometer.duration,
          ease: "power2.out"
        });
      }
    });
  });

  // Enhanced Feature Cards with Particle Effects
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    card.appendChild(particleContainer);

    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });

      // Create particles
      for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particleContainer.appendChild(particle);

        gsap.fromTo(particle,
          {
            x: '50%',
            y: '50%',
            scale: 0,
            opacity: 1
          },
          {
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            scale: Math.random() * 0.5 + 0.5,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            onComplete: () => particle.remove()
          }
        );
      }
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });

  // Interactive Highlight Points with Info Panels
  const highlightPoints = document.querySelectorAll('.highlight');
  highlightPoints.forEach(point => {
    const infoPanel = point.querySelector('.highlight-info');

    point.addEventListener('mouseenter', () => {
      gsap.to(point.querySelector('.highlight-dot'), {
        scale: 1.5,
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(infoPanel, {
        scale: 1.1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    point.addEventListener('mouseleave', () => {
      gsap.to(point.querySelector('.highlight-dot'), {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(infoPanel, {
        scale: 1,
        opacity: 0.8,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });

  // Dynamic Performance Stats with Real-time Updates
  const stats = {
    acceleration: 0,
    topSpeed: 0,
    power: 0
  };

  const updateStats = () => {
    gsap.to(stats, {
      acceleration: 2.9,
      topSpeed: 320,
      power: 831,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        document.querySelector('.time-value').textContent = stats.acceleration.toFixed(1);
        document.querySelector('.speed-value').textContent = Math.round(stats.topSpeed);
        document.querySelector('.feature-value').textContent = Math.round(stats.power);
      }
    });
  };

  // Scroll-triggered Animations with Parallax
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateStats();

        // Parallax effect for section elements
        gsap.to('.performance-header', {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out"
        });

        gsap.to('.speedometer-container', {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: "power2.out"
        });

        gsap.to('.car-features', {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.4,
          ease: "power2.out"
        });

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(performanceSection);

  // Add keyboard controls for the car model
  document.addEventListener('keydown', (e) => {
    const rotationAmount = 10;
    switch (e.key) {
      case 'ArrowLeft':
        currentRotationY -= rotationAmount;
        break;
      case 'ArrowRight':
        currentRotationY += rotationAmount;
        break;
      case 'ArrowUp':
        currentRotationX -= rotationAmount;
        break;
      case 'ArrowDown':
        currentRotationX += rotationAmount;
        break;
    }

    gsap.to(carImage, {
      rotationY: currentRotationY,
      rotationX: currentRotationX,
      duration: 0.3,
      ease: "power2.out"
    });
  });
});
// This is the JavaScript code for the typing effect