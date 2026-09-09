document.addEventListener('DOMContentLoaded', () => {
	if (window.lucide) window.lucide.createIcons();
	const modeButtons = document.querySelectorAll('[data-mode-button]');
	const savedMode = localStorage.getItem('beth-mode') || 'designer';
	const applyMode = (mode) => {
		const activeMode = mode === 'beth' ? 'beth' : 'designer';
		document.body.classList.remove('designer-mode', 'beth-mode');
		document.body.classList.add(`${activeMode}-mode`);
		modeButtons.forEach((button) => {
			const isActive = button.dataset.modeButton === activeMode;
			button.setAttribute('aria-pressed', String(isActive));
		});
		document.querySelectorAll('[data-designer][data-beth]').forEach((copy) => {
			copy.textContent = activeMode === 'beth' ? copy.dataset.beth : copy.dataset.designer;
		});
	};
	applyMode(savedMode);
	modeButtons.forEach((button) => button.addEventListener('click', () => {
		const nextMode = button.dataset.modeButton;
		localStorage.setItem('beth-mode', nextMode);
		applyMode(nextMode);
	}));

	const toggle = document.querySelector('.menu-toggle');
	const menu = document.querySelector('#mobile-menu');
	if (!toggle || !menu) return;
	toggle.addEventListener('click', () => {
		const isOpen = toggle.getAttribute('aria-expanded') === 'true';
		toggle.setAttribute('aria-expanded', String(!isOpen));
		toggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
		menu.classList.toggle('hidden', isOpen);
	});
	menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
		toggle.setAttribute('aria-expanded', 'false');
		toggle.setAttribute('aria-label', 'Open navigation');
		menu.classList.add('hidden');
	}));
});
