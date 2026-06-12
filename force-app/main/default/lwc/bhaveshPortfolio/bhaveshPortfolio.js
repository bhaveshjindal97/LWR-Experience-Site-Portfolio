import { LightningElement } from 'lwc';
import PROFILE_PHOTO from '@salesforce/resourceUrl/Bhavesh_Profile_Picture';
import ALTIMETRIK_LOGO from '@salesforce/resourceUrl/altimetrikLogo';
import ALTIMETRIK_TEXT_LOGO from '@salesforce/resourceUrl/Altimetrik_Logo';
import ALTIMETRIK_TEXT_LOGO_MOBILE from '@salesforce/resourceUrl/Altimetrik_Logo_Mobile';

const SECTIONS = [
    'home',
    'summary',
    'expertise',
    'experience',
    'recognition',
    'skills',
    'contact'
];

export default class BhaveshPortfolio extends LightningElement {
    photoUrl = PROFILE_PHOTO;
    logoUrl = ALTIMETRIK_LOGO;
    altimetrikTextLogoUrl = ALTIMETRIK_TEXT_LOGO;
    altimetrikTextLogoMobileUrl = ALTIMETRIK_TEXT_LOGO_MOBILE;
    activeSection = 'home';
    mobileMenuOpen = false;
    _scrollHandler = null;

    connectedCallback() {
        this._scrollHandler = this._handleScroll.bind(this);
        window.addEventListener('scroll', this._scrollHandler, { passive: true });
    }

    disconnectedCallback() {
        if (this._scrollHandler) {
            window.removeEventListener('scroll', this._scrollHandler);
        }
    }

    _handleScroll() {
        const scrollPos = window.scrollY + 120;
        let current = 'home';

        SECTIONS.forEach((id) => {
            const el = this.template.querySelector(`[data-section="${id}"]`);
            if (el && el.offsetTop <= scrollPos) {
                current = id;
            }
        });

        if (current !== this.activeSection) {
            this.activeSection = current;
        }
    }

    handleNavClick(event) {
        event.preventDefault();
        const target = event.currentTarget.dataset.target;
        if (!target) return;

        const section = this.template.querySelector(`[data-section="${target}"]`);
        if (section) {
            const navHeight = 80;
            const top = section.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({ top, behavior: 'smooth' });
        }

        this.mobileMenuOpen = false;
    }

    toggleMobileMenu() {
        this.mobileMenuOpen = !this.mobileMenuOpen;
    }

    get navClasses() {
        const base = 'nav-link';
        const active = `${base} ${base}--active`;
        const a = this.activeSection;
        return {
            home: a === 'home' ? active : base,
            summary: a === 'summary' ? active : base,
            expertise: a === 'expertise' ? active : base,
            experience: a === 'experience' ? active : base,
            recognition: a === 'recognition' ? active : base,
            skills: a === 'skills' ? active : base,
            contact: a === 'contact' ? active : base
        };
    }

    get mobileMenuClass() {
        return this.mobileMenuOpen ? 'mobile-menu mobile-menu--open' : 'mobile-menu';
    }
}
