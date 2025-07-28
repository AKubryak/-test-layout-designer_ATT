document.addEventListener('DOMContentLoaded', function() {
    const select = document.querySelector('.form-select-chosen');
    const output = select.querySelector('.form-select-chosen__output');
    const searchInput = select.querySelector('.form-select-chosen__search-input');
    const options = select.querySelectorAll('.form-select-chosen__option');
    const hiddenInput = select.querySelector('.form-select-chosen__input');
    
    if (!hiddenInput.value) {
        output.textContent = output.getAttribute('data-placeholder');
    }
    
    select.addEventListener('click', function(e) {
        if (e.target.closest('.form-select-chosen__search')) return;
        this.classList.toggle('active');
        if (this.classList.contains('active')) {
            searchInput.focus();
        }
    });
    
    searchInput.addEventListener('input', function() {
        const term = this.value.toLowerCase();
        options.forEach(option => {
            const text = option.textContent.toLowerCase();
            option.style.display = text.includes(term) ? 'block' : 'none';
        });
    });
    
    options.forEach(option => {
        option.addEventListener('click', function() {
            output.textContent = this.textContent;
            output.removeAttribute('data-placeholder');
            select.classList.remove('active');
            searchInput.value = '';
            options.forEach(opt => opt.style.display = 'block');
            
            if (hiddenInput) {
                hiddenInput.value = this.getAttribute('data-value');
                hiddenInput.classList.remove('error-class');
                hiddenInput.dispatchEvent(new Event('change'));
            }
        });
    });
    
    document.addEventListener('click', function(e) {
        if (!select.contains(e.target)) {
            select.classList.remove('active');
        }
    });
});