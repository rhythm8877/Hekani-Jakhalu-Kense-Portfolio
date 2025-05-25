// DOM Elements
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const navLinks = document.querySelectorAll(".nav-link")
const navbar = document.getElementById("navbar")
const carousel = document.getElementById("carousel")
const prevBtn = document.getElementById("prevBtn")
const nextBtn = document.getElementById("nextBtn")
const indicators = document.getElementById("indicators")

// Navigation functionality
let currentSection = "home"

// Hamburger menu toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
  document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "auto"
})

// Close menu when clicking on nav links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
    document.body.style.overflow = "auto"

    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)
    const offsetTop = targetSection.offsetTop - 80

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  })
})

// Active navigation highlighting
function updateActiveNav() {
  const sections = document.querySelectorAll("section")
  const scrollPos = window.scrollY + 100

  sections.forEach((section) => {
    const top = section.offsetTop
    const bottom = top + section.offsetHeight
    const id = section.getAttribute("id")

    if (scrollPos >= top && scrollPos < bottom) {
      if (currentSection !== id) {
        currentSection = id
        navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("data-section") === id) {
            link.classList.add("active")
          }
        })
      }
    }
  })
}

// Navbar scroll effect
function handleNavbarScroll() {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
}

// Carousel functionality
let currentSlide = 0
const slides = document.querySelectorAll(".carousel-slide")
const totalSlides = slides.length
let autoPlayInterval

// Create indicators
function createIndicators() {
  indicators.innerHTML = ""
  for (let i = 0; i < totalSlides; i++) {
    const indicator = document.createElement("div")
    indicator.classList.add("indicator")
    if (i === 0) indicator.classList.add("active")
    indicator.addEventListener("click", () => goToSlide(i))
    indicators.appendChild(indicator)
  }
}

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active")
    if (i === index) {
      slide.classList.add("active")
    }
  })

  const indicatorElements = document.querySelectorAll(".indicator")
  indicatorElements.forEach((indicator, i) => {
    indicator.classList.remove("active")
    if (i === index) {
      indicator.classList.add("active")
    }
  })
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides
  showSlide(currentSlide)
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
  showSlide(currentSlide)
}

function goToSlide(index) {
  currentSlide = index
  showSlide(currentSlide)
  resetAutoPlay()
}

function startAutoPlay() {
  // Clear any existing interval first to avoid multiple intervals running
  clearInterval(autoPlayInterval)
  // Set a consistent interval time
  autoPlayInterval = setInterval(nextSlide, 5000)
}

function resetAutoPlay() {
  // Clear existing interval
  clearInterval(autoPlayInterval)
  // Start fresh with the same timing
  startAutoPlay()
}

// Carousel event listeners
nextBtn.addEventListener("click", () => {
  nextSlide()
  // Reset autoplay to maintain consistent timing
  resetAutoPlay()
})

prevBtn.addEventListener("click", () => {
  prevSlide()
  // Reset autoplay to maintain consistent timing
  resetAutoPlay()
})

// Pause autoplay on hover - use clear/start pattern consistently
const carouselContainer = document.querySelector(".carousel-container")
carouselContainer.addEventListener("mouseenter", () => {
  clearInterval(autoPlayInterval)
})

carouselContainer.addEventListener("mouseleave", () => {
  // Don't just start a new interval, use the function that ensures clean state
  startAutoPlay()
})

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")
    }
  })
}, observerOptions)

// Staggered animations for achievement cards
const achievementObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll(".achievement-card")
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add("animate")
          }, index * 200)
        })
      }
    })
  },
  { threshold: 0.2 },
)

// Vision items staggered animation
const visionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const items = entry.target.querySelectorAll(".vision-item")
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("animate")
          }, index * 300)
        })
      }
    })
  },
  { threshold: 0.2 },
)

// Timeline staggered animation
const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const items = entry.target.querySelectorAll(".timeline-item")
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("animate")
          }, index * 200)
        })
      }
    })
  },
  { threshold: 0.2 },
)

// Philosophy items staggered animation
const philosophyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const items = entry.target.querySelectorAll(".philosophy-item")
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("animate")
          }, index * 200)
        })
      }
    })
  },
  { threshold: 0.2 },
)

// Parallax effect for hero and vision sections
function handleParallax() {
  const scrolled = window.pageYOffset
  const vision = document.querySelector(".vision")

  if (vision) {
    const visionTop = vision.offsetTop
    const visionHeight = vision.offsetHeight
    const windowHeight = window.innerHeight

    if (scrolled + windowHeight > visionTop && scrolled < visionTop + visionHeight) {
      const rate = (scrolled - visionTop + windowHeight) * 0.3
      vision.style.backgroundPositionY = `${rate}px`
    }
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize carousel
  createIndicators()
  startAutoPlay()

  // Set up observers for animations
  const elementsToAnimate = document.querySelectorAll(
    ".section-title, .bio-image-container, .bio-intro, .fade-in, .slide-in-left, .slide-in-right, .scale-in, .reveal-up",
  )
  elementsToAnimate.forEach((el) => observer.observe(el))

  // Observe achievement section for staggered animation
  const achievementSection = document.querySelector(".achievements")
  if (achievementSection) {
    achievementObserver.observe(achievementSection)
  }

  // Observe vision section for staggered animation
  const visionSection = document.querySelector(".vision")
  if (visionSection) {
    visionObserver.observe(visionSection)
  }

  // Observe timeline for staggered animation
  const timelineSection = document.querySelector(".timeline")
  if (timelineSection) {
    timelineObserver.observe(timelineSection)
  }

  // Observe philosophy section for staggered animation
  const philosophySection = document.querySelector(".philosophy-grid")
  if (philosophySection) {
    philosophyObserver.observe(philosophySection)
  }

  // Initialize active nav
  updateActiveNav()
})

// Event listeners
window.addEventListener("scroll", () => {
  handleNavbarScroll()
  updateActiveNav()
  handleParallax()
})

// Keyboard navigation for carousel
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    prevSlide()
    resetAutoPlay()
  } else if (e.key === "ArrowRight") {
    nextSlide()
    resetAutoPlay()
  }
})

// Touch/swipe support for carousel
let touchStartX = 0
let touchEndX = 0

carouselContainer.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX
})

carouselContainer.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX
  handleSwipe()
})

function handleSwipe() {
  const swipeThreshold = 50
  const diff = touchStartX - touchEndX

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextSlide()
    } else {
      prevSlide()
    }
    resetAutoPlay()
  }
}

// Intersection Observer for fade-in animations
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  },
  { threshold: 0.1 },
)

// Apply fade-in to all sections
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0"
  section.style.transform = "translateY(30px)"
  section.style.transition = "opacity 0.8s ease, transform 0.8s ease"
  fadeObserver.observe(section)
})

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments

    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Apply throttling to scroll handler
window.addEventListener(
  "scroll",
  throttle(() => {
    handleNavbarScroll()
    updateActiveNav()
    handleParallax()
  }, 16),
) // ~60fps

// Accessibility improvements
document.addEventListener("keydown", (e) => {
  // Escape key closes mobile menu
  if (e.key === "Escape" && navMenu.classList.contains("active")) {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
    document.body.style.overflow = "auto"
  }
})

// Focus management for mobile menu
navLinks.forEach((link, index) => {
  link.addEventListener("keydown", (e) => {
    if (e.key === "Tab" && navMenu.classList.contains("active")) {
      if (e.shiftKey && index === 0) {
        e.preventDefault()
        navLinks[navLinks.length - 1].focus()
      } else if (!e.shiftKey && index === navLinks.length - 1) {
        e.preventDefault()
        navLinks[0].focus()
      }
    }
  })
})

// Loading state management
window.addEventListener("load", () => {
  document.body.classList.add("loaded")

  // Trigger initial animations
  setTimeout(() => {
    const heroElements = document.querySelectorAll(".hero .fade-in-up")
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = "1"
        el.style.transform = "translateY(0)"
      }, index * 200)
    })
  }, 500)
})

// Error handling for images
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", function () {
    this.src = "/placeholder.svg?height=400&width=400&text=Image+Not+Found"
    this.alt = "Image not available"
  })
})

// Print styles optimization
window.addEventListener("beforeprint", () => {
  document.body.classList.add("printing")
})

window.addEventListener("afterprint", () => {
  document.body.classList.remove("printing")
})
