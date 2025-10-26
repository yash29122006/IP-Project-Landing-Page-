// Three.js 3D Model Setup
let scene, camera, renderer, visionPro;
let mouseX = 0, mouseY = 0;
let targetRotationX = 0, targetRotationY = 0;

// Experience section 3D model
let experienceScene, experienceCamera, experienceRenderer, experienceModel;
let experienceMouseX = 0, experienceMouseY = 0;
let isDragging = false;
let previousMouseX = 0, previousMouseY = 0;

function init() {
    // Initialize experience section 3D model
    initExperienceModel();
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards and other elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .spec-item, .experience-text');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Initialize Experience Section 3D Model
function initExperienceModel() {
    const container = document.getElementById('experience-canvas-container');
    if (!container) return;
    
    // Scene setup
    experienceScene = new THREE.Scene();
    
    // Camera setup
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    
    experienceCamera = new THREE.PerspectiveCamera(
        50,
        containerWidth / containerHeight,
        0.1,
        1000
    );
    experienceCamera.position.set(0, 0, 3);
    
    // Renderer setup
    experienceRenderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true 
    });
    experienceRenderer.setSize(containerWidth, containerHeight);
    experienceRenderer.setPixelRatio(window.devicePixelRatio);
    experienceRenderer.setClearColor(0x000000, 0);
    experienceRenderer.outputEncoding = THREE.sRGBEncoding;
    experienceRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    experienceRenderer.toneMappingExposure = 1.0;
    
    container.appendChild(experienceRenderer.domElement);
    
    // Lighting for experience model
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    experienceScene.add(ambientLight);
    
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight1.position.set(5, 5, 5);
    experienceScene.add(directionalLight1);
    
    const directionalLight2 = new THREE.DirectionalLight(0x6666ff, 0.8);
    directionalLight2.position.set(-5, 3, -5);
    experienceScene.add(directionalLight2);
    
    const directionalLight3 = new THREE.DirectionalLight(0xff6666, 0.5);
    directionalLight3.position.set(0, -5, 5);
    experienceScene.add(directionalLight3);
    
    // Load GLB model
    const loader = new THREE.GLTFLoader();
    loader.load(
        'AR-Code-1686060373323.glb',
        function (gltf) {
            experienceModel = gltf.scene;
            
            // Center and scale the model
            const box = new THREE.Box3().setFromObject(experienceModel);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            
            // Center the model
            experienceModel.position.x = -center.x;
            experienceModel.position.y = -center.y;
            experienceModel.position.z = -center.z;
            
            // Scale to fit
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2 / maxDim;
            experienceModel.scale.setScalar(scale);
            
            experienceScene.add(experienceModel);
            
            // Start animation for experience model
            animateExperience();
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('Error loading GLB model:', error);
        }
    );
    
    // Mouse move listener for experience section
    container.addEventListener('mousemove', (event) => {
        if (!isDragging) return;
        
        const rect = container.getBoundingClientRect();
        const currentMouseX = event.clientX - rect.left;
        const currentMouseY = event.clientY - rect.top;
        
        const deltaX = currentMouseX - previousMouseX;
        const deltaY = currentMouseY - previousMouseY;
        
        experienceMouseX = deltaX * 0.01;
        experienceMouseY = deltaY * 0.01;
        
        previousMouseX = currentMouseX;
        previousMouseY = currentMouseY;
    });
    
    // Mouse down listener
    container.addEventListener('mousedown', (event) => {
        isDragging = true;
        const rect = container.getBoundingClientRect();
        previousMouseX = event.clientX - rect.left;
        previousMouseY = event.clientY - rect.top;
        container.style.cursor = 'grabbing';
    });
    
    // Mouse up listener
    container.addEventListener('mouseup', () => {
        isDragging = false;
        experienceMouseX = 0;
        experienceMouseY = 0;
        container.style.cursor = 'grab';
    });
    
    // Mouse leave listener
    container.addEventListener('mouseleave', () => {
        isDragging = false;
        experienceMouseX = 0;
        experienceMouseY = 0;
        container.style.cursor = 'grab';
    });
    
    // Handle window resize for experience model
    window.addEventListener('resize', () => {
        if (!container) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        experienceCamera.aspect = width / height;
        experienceCamera.updateProjectionMatrix();
        experienceRenderer.setSize(width, height);
    });
}

// Animation loop for experience section model
function animateExperience() {
    requestAnimationFrame(animateExperience);
    
    if (experienceModel) {
        // Apply drag rotation when user is dragging
        if (isDragging) {
            experienceModel.rotation.y += experienceMouseX;
            experienceModel.rotation.x += experienceMouseY;
        } else {
            // Auto-rotate horizontally when not dragging
            experienceModel.rotation.y += 0.005;
        }
    }
    
    experienceRenderer.render(experienceScene, experienceCamera);
}

// Initialize Three.js scene
init();

// Modal functionality
const registrationModal = document.getElementById('registrationModal');
const successModal = document.getElementById('successModal');
const bookDemoBtn = document.getElementById('bookDemoBtn');
const learnMoreBtn = document.getElementById('learnMoreBtn');
const closeModalBtn = document.querySelector('.close-modal');
const demoForm = document.getElementById('demoForm');

// Learn More button - scroll to specifications
learnMoreBtn.addEventListener('click', () => {
    const specsSection = document.querySelector('.specs');
    specsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Open registration modal
bookDemoBtn.addEventListener('click', () => {
    registrationModal.classList.add('show');
    document.body.style.overflow = 'hidden';
});

// Close registration modal
closeModalBtn.addEventListener('click', () => {
    registrationModal.classList.remove('show');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
registrationModal.addEventListener('click', (e) => {
    if (e.target === registrationModal) {
        registrationModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Handle form submission
demoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        country: document.getElementById('country').value,
        pincode: document.getElementById('pincode').value
    };
    
    // Here you would normally send data to a server
    console.log('Form submitted:', formData);
    
    // Close registration modal and restore scroll
    registrationModal.classList.remove('show');
    document.body.style.overflow = 'auto';
    
    // Show success toast
    setTimeout(() => {
        successModal.classList.add('show');
        
        // Auto-close after 4 seconds
        setTimeout(() => {
            successModal.classList.remove('show');
        }, 4000);
    }, 300);
    
    // Reset form
    demoForm.reset();
});

// Remove old close button listeners since toast auto-closes

// View All Specifications Modal
const viewMoreBtn = document.getElementById('viewMoreBtn');
const specsModal = document.getElementById('specsModal');
const closeSpecsModal = document.getElementById('closeSpecsModal');

if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', () => {
        specsModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
}

if (closeSpecsModal) {
    closeSpecsModal.addEventListener('click', () => {
        specsModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
}

// Close specs modal when clicking outside
if (specsModal) {
    specsModal.addEventListener('click', (e) => {
        if (e.target === specsModal) {
            specsModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
}
