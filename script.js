function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');

    // Trigger animation reset
    const activeTab = document.getElementById(tabId);
    activeTab.style.opacity = 0;
    activeTab.style.transform = 'translateY(10px)';

    // Force reflow to restart animation
    void activeTab.offsetHeight;

    activeTab.style.opacity = '';
    activeTab.style.transform = '';
}