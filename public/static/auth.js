// Marketing Pro Authentication JavaScript

// Configure axios defaults
axios.defaults.withCredentials = true;

// Login form handler
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error');
    
    try {
        const response = await axios.post('/api/auth/login', {
            email,
            password
        });
        
        if (response.data.success) {
            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('team', JSON.stringify(response.data.team));
            
            // Redirect to dashboard
            window.location.href = '/';
        }
    } catch (error) {
        console.error('Login error:', error);
        showError(errorDiv, error.response?.data?.error || 'حدث خطأ في تسجيل الدخول');
    }
});

// Register form handler
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const team_name = document.getElementById('team_name').value;
    const team_slug = document.getElementById('team_slug').value;
    const errorDiv = document.getElementById('error');
    
    // Validate team slug format
    if (!/^[a-z0-9-]+$/.test(team_slug)) {
        showError(errorDiv, 'رابط الفريق يجب أن يحتوي على أحرف إنجليزية صغيرة وأرقام وشرطات فقط');
        return;
    }
    
    try {
        const response = await axios.post('/api/auth/register', {
            name,
            email,
            password,
            team_name,
            team_slug
        });
        
        if (response.data.success) {
            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('team', JSON.stringify(response.data.team));
            
            // Redirect to dashboard
            window.location.href = '/';
        }
    } catch (error) {
        console.error('Register error:', error);
        showError(errorDiv, error.response?.data?.error || 'حدث خطأ في إنشاء الحساب');
    }
});

// Auto-generate team slug from team name
document.getElementById('team_name')?.addEventListener('input', (e) => {
    const teamName = e.target.value;
    const slugInput = document.getElementById('team_slug');
    
    if (slugInput && teamName) {
        const slug = teamName
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '') // Remove special chars except spaces and hyphens
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with single
            .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
        
        slugInput.value = slug;
    }
});

// Show error message
function showError(errorDiv, message) {
    errorDiv.classList.remove('hidden');
    errorDiv.querySelector('p').textContent = message;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorDiv.classList.add('hidden');
    }, 5000);
}