// language.js
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('nexct-language') || 'id';
        this.translations = translations;
        
        this.desktopToggle = document.getElementById('desktopLanguageToggle');
        this.mobileToggle = document.getElementById('mobileLanguageToggle');
        this.mobileLangText = document.getElementById('mobileLangText');
        this.langIndicator = document.getElementById('langIndicator');
        
        this.init();
    }
    
    init() {
        // Set initial language
        this.updateLanguage(this.currentLang);
        
        // Add event listeners
        if (this.desktopToggle) {
            this.desktopToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleLanguage();
            });
        }
        
        if (this.mobileToggle) {
            this.mobileToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleLanguage();
            });
        }
        
        // Update mobile text
        this.updateMobileText();
        
        // Update indicator position
        this.updateIndicator();
    }
    
    toggleLanguage() {
        this.currentLang = this.currentLang === 'id' ? 'en' : 'id';
        localStorage.setItem('nexct-language', this.currentLang);
        this.updateLanguage(this.currentLang);
        this.updateMobileText();
        this.updateIndicator();
    }
    
    updateLanguage(lang) {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getNestedTranslation(lang, key);
            
            if (translation) {
                // Check if element is an input/textarea placeholder
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    if (element.getAttribute('placeholder')) {
                        element.setAttribute('placeholder', translation);
                    }
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Trigger custom event for other components
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    }
    
    getNestedTranslation(lang, key) {
        return key.split('.').reduce((obj, k) => obj && obj[k] ? obj[k] : null, this.translations[lang]);
    }
    
    updateMobileText() {
        if (this.mobileLangText) {
            this.mobileLangText.textContent = this.currentLang === 'id' ? 'English' : 'Indonesia';
        }
    }
    
    updateIndicator() {
        if (this.langIndicator) {
            this.langIndicator.style.transform = this.currentLang === 'id' 
                ? 'translateX(0)' 
                : 'translateX(30px)';
        }
    }
}

// Initialize language manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
});