document.addEventListener("DOMContentLoaded", () => {
  console.log("Enhanced Portfolio Script Loading...")

  // Import GSAP and ScrollTrigger
  const gsap = window.gsap
  const ScrollTrigger = window.ScrollTrigger

  // Initialize GSAP
  gsap.registerPlugin(ScrollTrigger)

  // Import particlesJS
  const particlesJS = window.particlesJS

  // Loading Screen
  const loadingScreen = document.querySelector(".loading-screen")

  // Simulate loading time
  setTimeout(() => {
    loadingScreen.classList.add("hidden")
    document.body.style.overflow = "visible"

    // Ensure all content is visible
    const allSections = document.querySelectorAll("section, .section")
    allSections.forEach((section) => {
      section.style.opacity = "1"
      section.style.transform = "translateY(0)"
    })

    initializeAnimations()
  }, 1500)

  // Particles.js Configuration
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#6366f1",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#6366f1",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 6,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "repulse",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    })
  }

  // Theme Toggle
  const themeToggle = document.querySelector(".theme-toggle")
  const body = document.body

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "light") {
    body.classList.add("light-theme")
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-theme")

    // Save theme preference
    if (body.classList.contains("light-theme")) {
      localStorage.setItem("theme", "light")
    } else {
      localStorage.setItem("theme", "dark")
    }
  })

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const navMenu = document.querySelector(".nav-menu")

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenuBtn.classList.toggle("active")
    navMenu.classList.toggle("active")
    document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "visible"
  })

  // Close mobile menu when clicking on nav links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuBtn.classList.remove("active")
      navMenu.classList.remove("active")
      document.body.style.overflow = "visible"
    })
  })

  // Enhanced Custom Cursor
  const cursor = document.querySelector(".cursor")
  const cursorFollower = document.querySelector(".cursor-follower")
  let mouseX = 0,
    mouseY = 0
  let cursorX = 0,
    cursorY = 0

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1
    cursorY += (mouseY - cursorY) * 0.1

    cursor.style.left = mouseX + "px"
    cursor.style.top = mouseY + "px"
    cursorFollower.style.left = cursorX + "px"
    cursorFollower.style.top = cursorY + "px"

    requestAnimationFrame(animateCursor)
  }
  animateCursor()

  // Cursor interactions
  const interactiveElements = document.querySelectorAll(
    "a, button, .project-card, .skill-card, .contact-card, .social-link, .cta-button",
  )

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.classList.add("cursor-active")
      cursorFollower.classList.add("cursor-active")
    })

    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("cursor-active")
      cursorFollower.classList.remove("cursor-active")
    })
  })

  // Header Scroll Effect
  const header = document.querySelector("header")
  let lastScrollY = window.scrollY

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY

    if (currentScrollY > 100) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }

    // Hide/show header on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      header.style.transform = "translateY(-100%)"
    } else {
      header.style.transform = "translateY(0)"
    }

    lastScrollY = currentScrollY

    // Update scroll progress
    updateScrollProgress()
  })

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))

      if (target) {
        const headerHeight = header.offsetHeight
        const targetPosition = target.offsetTop - headerHeight - 20

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Typing Animation
  const typingText = document.querySelector(".typing-text")
  const texts = ["MERN Stack Developer", "Problem Solver", "Tech Enthusiast", "Creative Coder", "Full Stack Developer"]
  let textIndex = 0
  let charIndex = 0
  let isDeleting = false

  function typeWriter() {
    const currentText = texts[textIndex]

    if (isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex - 1)
      charIndex--
    } else {
      typingText.textContent = currentText.substring(0, charIndex + 1)
      charIndex++
    }

    let typeSpeed = isDeleting ? 50 : 100

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      textIndex = (textIndex + 1) % texts.length
      typeSpeed = 500
    }

    setTimeout(typeWriter, typeSpeed)
  }

  // Counter Animation
  function animateCounters() {
    const counters = document.querySelectorAll(".stat-number[data-count]")

    counters.forEach((counter) => {
      const target = Number.parseInt(counter.getAttribute("data-count"))
      const duration = 2000
      const increment = target / (duration / 16)
      let current = 0

      const updateCounter = () => {
        current += increment
        if (current < target) {
          counter.textContent = Math.floor(current)
          requestAnimationFrame(updateCounter)
        } else {
          counter.textContent = target
        }
      }

      updateCounter()
    })
  }

  // Scroll to Top Button
  const scrollToTopBtn = document.querySelector(".scroll-to-top")

  function updateScrollProgress() {
    const scrollTop = window.pageYOffset
    const docHeight = document.body.scrollHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100

    document.documentElement.style.setProperty("--scroll-progress", scrollPercent + "%")

    if (scrollTop > 500) {
      scrollToTopBtn.classList.add("active")
    } else {
      scrollToTopBtn.classList.remove("active")
    }
  }

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Section Reveal Animation
  const revealSections = document.querySelectorAll(".section-reveal")

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed")
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  revealSections.forEach((section) => {
    revealObserver.observe(section)
  })

  // Skill Bar Animation
  function animateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress[data-width]")

    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target
            const width = bar.getAttribute("data-width")

            setTimeout(() => {
              bar.style.width = width + "%"
            }, 200)

            skillObserver.unobserve(bar)
          }
        })
      },
      { threshold: 0.5 },
    )

    skillBars.forEach((bar) => {
      skillObserver.observe(bar)
    })
  }

  // Form Handling
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const submitBtn = contactForm.querySelector(".submit-btn")
      const originalText = submitBtn.querySelector(".btn-text").textContent

      // Show loading state
      submitBtn.querySelector(".btn-text").textContent = "Sending..."
      submitBtn.disabled = true

      // Simulate form submission
      setTimeout(() => {
        // Show success message
        showNotification("Message sent successfully! I'll get back to you soon.", "success")

        // Reset form
        contactForm.reset()

        // Reset button
        submitBtn.querySelector(".btn-text").textContent = originalText
        submitBtn.disabled = false

        // Reset form labels
        const formGroups = contactForm.querySelectorAll(".form-group")
        formGroups.forEach((group) => {
          const input = group.querySelector("input, textarea")
          const label = group.querySelector("label")
          const line = group.querySelector(".form-line")

          if (input && label && line) {
            input.value = ""
            label.style.top = "1rem"
            label.style.fontSize = "1rem"
            label.style.color = "var(--text-secondary)"
            line.style.width = "0"
          }
        })
      }, 2000)
    })
  }

  // Notification System
  function showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
                <span>${message}</span>
            </div>
        `

    // Add notification styles
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--surface-color);
            color: var(--text-color);
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            border-left: 4px solid var(--${type === "success" ? "success" : type === "error" ? "error" : "primary"}-color);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            transform: translateX(400px);
            transition: all 0.3s ease;
            max-width: 350px;
        `

    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 100)

    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(400px)"
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 5000)
  }

  // Parallax Effect for Hero Section
  function initParallax() {
    const heroElements = document.querySelectorAll(".floating-icon")

    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5

      heroElements.forEach((element, index) => {
        const speed = (index + 1) * 0.1
        element.style.transform = `translateY(${rate * speed}px)`
      })
    })
  }

  // Initialize all animations
  function initializeAnimations() {
    // Start typing animation
    setTimeout(typeWriter, 1000)

    // Animate counters when hero section is visible
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters()
          heroObserver.unobserve(entry.target)
        }
      })
    })

    const heroSection = document.querySelector(".hero")
    if (heroSection) {
      heroObserver.observe(heroSection)
    }

    // Initialize skill bar animations
    animateSkillBars()

    // Initialize parallax
    initParallax()

    // GSAP Animations (if available)
    if (typeof gsap !== "undefined") {
      initGSAPAnimations()
    }

    // Ensure all sections are visible
    const sections = document.querySelectorAll(".section")
    sections.forEach((section) => {
      section.style.opacity = "1"
      section.style.transform = "translateY(0)"
    })
  }

  // GSAP Animations
  function initGSAPAnimations() {
    // Hero section animations
    gsap
      .timeline()
      .from(".hero-greeting", { duration: 1, y: 50, opacity: 0, ease: "power3.out" })
      .from(
        ".hero-name .name-part",
        {
          duration: 1,
          y: 100,
          opacity: 0,
          stagger: 0.2,
          ease: "power3.out",
        },
        "-=0.5",
      )
      .from(".hero-subtitle", { duration: 1, y: 30, opacity: 0, ease: "power3.out" }, "-=0.3")
      .from(".hero-description", { duration: 1, y: 30, opacity: 0, ease: "power3.out" }, "-=0.2")
      .from(
        ".hero-cta .cta-button",
        {
          duration: 0.8,
          y: 30,
          opacity: 0,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.2",
      )
      .from(
        ".hero-stats .stat-item",
        {
          duration: 0.8,
          y: 30,
          opacity: 0,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.3",
      )

    // Floating icons animation
    gsap.from(".floating-icon", {
      duration: 1.5,
      scale: 0,
      rotation: 180,
      stagger: 0.2,
      ease: "back.out(1.7)",
      delay: 1,
    })

    // Hero shape animation
    gsap.from(".hero-shape", {
      duration: 2,
      scale: 0,
      rotation: 45,
      ease: "elastic.out(1, 0.5)",
      delay: 1.5,
    })

    // Code snippet animation
    gsap.from(".code-snippet", {
      duration: 1.5,
      x: 100,
      opacity: 0,
      ease: "power3.out",
      delay: 2,
    })

    // Section animations with ScrollTrigger
    gsap.utils.toArray(".section-reveal").forEach((section, index) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        duration: 1,
        y: 100,
        opacity: 0,
        ease: "power3.out",
        delay: index * 0.1,
      })
    })

    // Skill cards animation
    gsap.utils.toArray(".skill-card").forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        scale: 0.9,
        ease: "power3.out",
        delay: index * 0.1,
      })
    })

    // Project cards animation
    gsap.utils.toArray(".project-card").forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        duration: 1,
        y: 80,
        opacity: 0,
        rotationY: 15,
        ease: "power3.out",
        delay: index * 0.2,
      })
    })

    // Timeline animation
    gsap.from(".timeline-item", {
      scrollTrigger: {
        trigger: ".timeline-container",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      duration: 1,
      x: -100,
      opacity: 0,
      stagger: 0.3,
      ease: "power3.out",
    })

    // Contact cards animation
    gsap.utils.toArray(".contact-card").forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        duration: 0.8,
        x: -50,
        opacity: 0,
        ease: "power3.out",
        delay: index * 0.1,
      })
    })

    // Form animation
    gsap.from(".contact-form", {
      scrollTrigger: {
        trigger: ".contact-form",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      duration: 1,
      x: 50,
      opacity: 0,
      ease: "power3.out",
    })

    // Footer animation
    gsap.from(".footer-main > *", {
      scrollTrigger: {
        trigger: "footer",
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
      duration: 1,
      y: 50,
      opacity: 0,
      stagger: 0.2,
      ease: "power3.out",
    })
  }

  // Intersection Observer for active nav links
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentSection = entry.target.getAttribute("id")

          navLinks.forEach((link) => {
            link.classList.remove("active")
            if (link.getAttribute("href") === `#${currentSection}`) {
              link.classList.add("active")
            }
          })
        }
      })
    },
    {
      threshold: 0.3,
      rootMargin: "-100px 0px -100px 0px",
    },
  )

  sections.forEach((section) => {
    navObserver.observe(section)
  })

  // Add ripple effect to buttons
  document.querySelectorAll(".cta-button, .submit-btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = this.querySelector(".btn-ripple")
      if (ripple) {
        ripple.style.left = e.clientX - this.offsetLeft + "px"
        ripple.style.top = e.clientY - this.offsetTop + "px"
        ripple.style.transform = "translate(-50%, -50%) scale(0)"

        setTimeout(() => {
          ripple.style.transform = "translate(-50%, -50%) scale(1)"
        }, 10)

        setTimeout(() => {
          ripple.style.transform = "translate(-50%, -50%) scale(0)"
        }, 600)
      }
    })
  })

  // Performance optimization: Debounce scroll events
  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  // Optimize scroll events
  const optimizedScrollHandler = debounce(() => {
    updateScrollProgress()
  }, 10)

  window.addEventListener("scroll", optimizedScrollHandler)

  // Preload images
  function preloadImages() {
    const images = document.querySelectorAll("img[src]")
    images.forEach((img) => {
      const imageLoader = new Image()
      imageLoader.src = img.src
    })
  }

  preloadImages()

  console.log("Enhanced Portfolio Script Loaded Successfully! 🚀")
})

// Service Worker Registration (for PWA capabilities)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript Error:", e.error)
})

// Unhandled promise rejection handling
window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled Promise Rejection:", e.reason)
})
