// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Cart quantity controls
    const quantityControls = document.querySelectorAll('.quantity-controls');

    quantityControls.forEach(control => {
        const minusBtn = control.querySelector('.minus');
        const plusBtn = control.querySelector('.plus');
        const input = control.querySelector('input');

        if (minusBtn && plusBtn && input) {
            minusBtn.addEventListener('click', function () {
                let value = parseInt(input.value);
                if (value > 1) {
                    input.value = value - 1;
                    updateCartTotal();
                }
            });

            plusBtn.addEventListener('click', function () {
                let value = parseInt(input.value);
                input.value = value + 1;
                updateCartTotal();
            });

            input.addEventListener('change', function () {
                if (parseInt(input.value) < 1) {
                    input.value = 1;
                }
                updateCartTotal();
            });
        }
    });

    // Wishlist toggle
    const wishlistBtns = document.querySelectorAll('.wishlist');

    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            this.classList.toggle('fas');
            this.classList.toggle('far');
        });
    });

    // Form submissions
    const contactForm = document.querySelector('.contact-form');
    const loginForm = document.querySelector('.login-form');
    const registerForm = document.querySelector('.register-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.');
            this.reset();
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Inicio de sesión exitoso');
            window.location.href = '/src/index.html';
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Cuenta creada exitosamente');
            window.location.href = '/src/page/login.html';
        });
    }

    // Search functionality
    const searchInput = document.querySelector('.search-box input');

    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    alert(`Buscando: ${searchTerm}`);
                }
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Update cart total function
function updateCartTotal() {
    const cartItems = document.querySelectorAll('.cart-item');
    let total = 0;

    cartItems.forEach(item => {
        const price = parseFloat(item.querySelector('.price').textContent.replace('$', ''));
        const quantity = parseInt(item.querySelector('.quantity input').value);
        const subtotal = price * quantity;

        item.querySelector('.subtotal').textContent = `$${subtotal}`;
        total += subtotal;
    });

    // Update summary
    const subtotalElement = document.querySelector('.summary-row span:last-child');
    const totalElement = document.querySelector('.summary-row.total span:last-child');

    if (subtotalElement && totalElement) {
        subtotalElement.textContent = `$${total}`;
        totalElement.textContent = `$${total}`;
    }
}

// Add to cart functionality
function addToCart(productName, price) {
    alert(`${productName} agregado al carrito por $${price}`);

    // Update cart count
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        let count = parseInt(cartCount.textContent);
        cartCount.textContent = count + 1;
    }
}

// Product card interactions
document.addEventListener('click', function (e) {
    if (e.target.closest('.product-card')) {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.font-bold').textContent.replace('$', '');

        if (e.target.textContent === 'Agregar al carrito' || e.target.closest('.product-info')) {
            addToCart(productName, productPrice);
        }
    }
});

// Checkout functionality
const checkoutBtn = document.querySelector('.checkout-btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function () {
        alert('Redirigiendo al proceso de pago...');
        // Aquí implementarías la lógica de checkout real
    });
}

// Apply coupon functionality
const applyCouponBtn = document.querySelector('.coupon-section .btn-primary');
if (applyCouponBtn) {
    applyCouponBtn.addEventListener('click', function () {
        const couponInput = document.querySelector('.coupon-section input');
        const couponCode = couponInput.value.trim();

        if (couponCode) {
            if (couponCode.toLowerCase() === 'descuento10') {
                alert('Cupón aplicado: 10% de descuento');
                // Aplicar descuento
            } else {
                alert('Código de cupón inválido');
            }
        } else {
            alert('Por favor ingresa un código de cupón');
        }
    });
}

// Responsive image loading
function loadImages() {
    const images = document.querySelectorAll('img[src*="placeholder.svg"]');

    images.forEach(img => {
        img.addEventListener('error', function () {
            this.style.backgroundColor = '#f0f0f0';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.innerHTML = '<span style="color: #999;">Imagen</span>';
        });
    });
}

// Initialize image loading
loadImages();

// Window resize handler for responsive adjustments
window.addEventListener('resize', function () {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (window.innerWidth > 768 && mobileMenu) {
        mobileMenu.classList.add('hidden');
    }
});