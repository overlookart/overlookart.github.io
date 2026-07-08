export class LeftSideBarController {
    constructor() {
        this.sidebarCollapsed = false;
        this.sidebar = null;
        this.sidebarContent = null;
        this.toggleButton = null;
    }

    init() {
        this.sidebar = document.getElementById('left-sidebar');
        this.sidebarContent = document.getElementById('left-sidebar-content');
        this.toggleButton = document.getElementById('left-sidebar-toggle');

        if (this.toggleButton) {
            this.toggleButton.addEventListener('click', () => this.toggle());
        }

        this.restoreState();
    }

    toggle() {
        this.sidebarCollapsed = !this.sidebarCollapsed;
        this.updateSidebar();
        this.saveState();
    }

    updateSidebar() {
        if (!this.sidebar || !this.sidebarContent) return;

        if (this.sidebarCollapsed) {
            this.sidebar.style.width = '58px';
            this.sidebarContent.style.opacity = '0';
            this.sidebarContent.style.pointerEvents = 'none';
        } else {
            this.sidebar.style.width = '215px';
            this.sidebarContent.style.opacity = '1';
            this.sidebarContent.style.pointerEvents = 'auto';
        }
    }

    saveState() {
        localStorage.setItem('LeftSideBarCollapsed', this.sidebarCollapsed);
    }

    restoreState() {
        const savedState = localStorage.getItem('LeftSideBarCollapsed');
        if (savedState === 'true') {
            this.sidebarCollapsed = true;
            this.updateSidebar();
        }
    }
}

export const leftSidebarController = new LeftSideBarController();
