// FreeAuditor Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupModal();
    setupSearch();
    setupTableActions();
    setupUserMenu();
    addLoadingStates();
    setupAccessibility();
}

// Navigation Management
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the target section
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });
}

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content > section, .content > div');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show target section or dashboard by default
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
    } else {
        // Show dashboard content if section doesn't exist
        const dashboard = document.getElementById('dashboard');
        if (dashboard) {
            dashboard.style.display = 'block';
        } else {
            // If no dashboard section, show all content
            sections.forEach(section => {
                section.style.display = 'block';
            });
        }
    }
    
    // Add fade-in animation
    if (targetSection) {
        targetSection.classList.add('fade-in');
        setTimeout(() => {
            targetSection.classList.remove('fade-in');
        }, 300);
    }
}

// Modal Management
function setupModal() {
    const modal = document.getElementById('newAuditModal');
    const openButtons = document.querySelectorAll('[onclick*="openModal"], .btn-primary');
    const closeButton = document.querySelector('.modal-close');
    
    // Open modal when clicking "Nueva Auditoría" buttons
    openButtons.forEach(button => {
        if (button.textContent.includes('Nueva Auditoría') || button.textContent.includes('Nueva')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                openModal();
            });
        }
    });
    
    // Close modal
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function openModal() {
    const modal = document.getElementById('newAuditModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        const firstInput = modal.querySelector('input, select, textarea');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
}

function closeModal() {
    const modal = document.getElementById('newAuditModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset form
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
        }
    }
}

function createAudit() {
    const form = document.querySelector('.audit-form');
    const formData = new FormData(form);
    
    // Validate form
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Show loading state
    const submitButton = document.querySelector('.modal-footer .btn-primary');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Creando...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Create new audit object
        const newAudit = {
            id: '#2024-' + String(Date.now()).slice(-3),
            name: formData.get('auditName'),
            type: formData.get('auditType'),
            status: 'En Progreso',
            startDate: formData.get('startDate'),
            responsible: formData.get('responsible')
        };
        
        // Add to table
        addAuditToTable(newAudit);
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Close modal
        closeModal();
        
        // Show success message
        showNotification('Auditoría creada exitosamente', 'success');
        
    }, 1000);
}

function addAuditToTable(audit) {
    const tbody = document.querySelector('.data-table tbody');
    if (!tbody) return;
    
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${audit.id}</td>
        <td>${audit.name}</td>
        <td>${getTypeDisplayName(audit.type)}</td>
        <td><span class="status status-active">${audit.status}</span></td>
        <td>${formatDate(audit.startDate)}</td>
        <td>${audit.responsible}</td>
        <td>
            <button class="btn-icon" title="Ver detalles" onclick="viewAudit('${audit.id}')">
                <i class="fas fa-eye"></i>
            </button>
            <button class="btn-icon" title="Editar" onclick="editAudit('${audit.id}')">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn-icon" title="Eliminar" onclick="deleteAudit('${audit.id}')">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    
    // Add with animation
    row.style.opacity = '0';
    tbody.insertBefore(row, tbody.firstChild);
    
    setTimeout(() => {
        row.style.transition = 'opacity 0.3s ease-in-out';
        row.style.opacity = '1';
    }, 100);
}

function getTypeDisplayName(type) {
    const typeMap = {
        'financial': 'Financiera',
        'operational': 'Operacional',
        'compliance': 'Cumplimiento',
        'it': 'Tecnología'
    };
    return typeMap[type] || type;
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
}

// Search Functionality
function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        filterTable(query);
    });
}

function filterTable(query) {
    const rows = document.querySelectorAll('.data-table tbody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const shouldShow = text.includes(query);
        
        row.style.display = shouldShow ? '' : 'none';
        
        if (shouldShow && query) {
            row.style.backgroundColor = 'rgba(37, 99, 235, 0.05)';
        } else {
            row.style.backgroundColor = '';
        }
    });
}

// Table Actions
function setupTableActions() {
    // Add event listeners for table action buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-icon')) {
            const button = e.target.closest('.btn-icon');
            const action = button.title.toLowerCase();
            
            if (action.includes('ver')) {
                const row = button.closest('tr');
                const auditId = row.cells[0].textContent;
                viewAudit(auditId);
            } else if (action.includes('editar')) {
                const row = button.closest('tr');
                const auditId = row.cells[0].textContent;
                editAudit(auditId);
            } else if (action.includes('eliminar')) {
                const row = button.closest('tr');
                const auditId = row.cells[0].textContent;
                deleteAudit(auditId);
            }
        }
    });
}

function viewAudit(auditId) {
    showNotification(`Viendo detalles de auditoría ${auditId}`, 'info');
    // Here you would typically navigate to a detail view
}

function editAudit(auditId) {
    showNotification(`Editando auditoría ${auditId}`, 'info');
    // Here you would typically open an edit modal or navigate to edit view
}

function deleteAudit(auditId) {
    if (confirm(`¿Está seguro de que desea eliminar la auditoría ${auditId}?`)) {
        const row = document.querySelector(`tr td:first-child`);
        if (row && row.textContent === auditId) {
            const tableRow = row.closest('tr');
            tableRow.style.transition = 'opacity 0.3s ease-in-out';
            tableRow.style.opacity = '0';
            
            setTimeout(() => {
                tableRow.remove();
                showNotification(`Auditoría ${auditId} eliminada`, 'success');
            }, 300);
        }
    }
}

// User Menu
function setupUserMenu() {
    const userMenu = document.querySelector('.user-menu');
    if (!userMenu) return;
    
    userMenu.addEventListener('click', function() {
        showNotification('Menú de usuario (funcionalidad pendiente)', 'info');
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        z-index: 1001;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        min-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Manual close
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
    
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0.8;
    `;
}

function removeNotification(notification) {
    notification.style.animation = 'slideOutRight 0.3s ease-in';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        'success': '#10b981',
        'error': '#ef4444',
        'warning': '#f59e0b',
        'info': '#2563eb'
    };
    return colors[type] || '#2563eb';
}

// Loading States
function addLoadingStates() {
    // Add loading animations to buttons on click
    document.addEventListener('click', function(e) {
        if (e.target.matches('.btn') && !e.target.disabled) {
            const button = e.target;
            const originalText = button.textContent;
            
            // Don't add loading to certain buttons
            if (button.classList.contains('btn-secondary') || 
                button.classList.contains('modal-close') ||
                button.classList.contains('btn-icon')) {
                return;
            }
            
            button.style.opacity = '0.7';
            
            setTimeout(() => {
                button.style.opacity = '';
            }, 200);
        }
    });
}

// Accessibility Improvements
function setupAccessibility() {
    // Add keyboard navigation for table rows
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    tableRows.forEach((row, index) => {
        row.setAttribute('tabindex', '0');
        row.setAttribute('role', 'button');
        row.setAttribute('aria-label', `Fila de auditoría ${index + 1}`);
        
        row.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const viewButton = row.querySelector('.btn-icon[title*="Ver"]');
                if (viewButton) viewButton.click();
            }
        });
    });
    
    // Add ARIA labels to buttons
    document.querySelectorAll('.btn-icon').forEach(button => {
        if (!button.getAttribute('aria-label')) {
            button.setAttribute('aria-label', button.title || 'Acción');
        }
    });
    
    // Add focus management for modal
    document.addEventListener('keydown', function(e) {
        const modal = document.querySelector('.modal.active');
        if (!modal) return;
        
        if (e.key === 'Tab') {
            const focusableElements = modal.querySelectorAll(
                'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;
document.head.appendChild(style);

// Export functions for global access
window.openModal = openModal;
window.closeModal = closeModal;
window.createAudit = createAudit;
window.viewAudit = viewAudit;
window.editAudit = editAudit;
window.deleteAudit = deleteAudit;