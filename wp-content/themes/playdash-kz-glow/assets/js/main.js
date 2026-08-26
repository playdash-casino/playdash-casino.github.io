(function(){
  var body = document.body;
  var sidebar = document.getElementById('sidebar');
  var sidebarToggle = document.getElementById('sidebarToggle');
  var toggleIcon = document.getElementById('toggleIcon');
  var hamburgerBtn = document.getElementById('hamburgerBtn');
  var backdrop = document.getElementById('navBackdrop');
  var refLoader = document.getElementById('refLoader');

  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function(){
      var collapsed = body.classList.toggle('sidebar-collapsed');
      sidebarToggle.setAttribute('aria-label', collapsed ? 'Show menu' : 'Hide menu');
      if (toggleIcon) { toggleIcon.style.transform = collapsed ? 'rotate(180deg)' : 'rotate(0deg)'; }
    });
  }

  function openMobileNav(){
    body.classList.add('mobile-nav-open');
    if (hamburgerBtn) {
      hamburgerBtn.setAttribute('aria-expanded','true');
      hamburgerBtn.setAttribute('aria-label','Close menu');
    }
  }
  function closeMobileNav(){
    body.classList.remove('mobile-nav-open');
    if (hamburgerBtn) {
      hamburgerBtn.setAttribute('aria-expanded','false');
      hamburgerBtn.setAttribute('aria-label','Open menu');
    }
  }
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', function(){
      if (body.classList.contains('mobile-nav-open')) { closeMobileNav(); }
      else { openMobileNav(); }
    });
  }
  if (backdrop) { backdrop.addEventListener('click', closeMobileNav); }

  if (sidebar) {
    var navLinks = sidebar.querySelectorAll('a[href^="#"]');
    for (var i=0;i<navLinks.length;i++){
      navLinks[i].addEventListener('click', closeMobileNav);
    }
  }

  /* ---- Referral link handler: loading interstitial (duration from Options), then navigate ---- */
  var refLinks = document.querySelectorAll('.ref-link');
  for (var r=0;r<refLinks.length;r++){
    refLinks[r].addEventListener('click', function(e){
      e.preventDefault();
      var el = this;
      if (el.classList.contains('sport-tab')){
        var tabs = document.querySelectorAll('.sport-tab');
        for (var t=0;t<tabs.length;t++){ tabs[t].classList.remove('active'); }
        el.classList.add('active');
      }
      var href = el.getAttribute('href') || '/play-and-win/';
      if (refLoader) { refLoader.classList.add('active'); }
      var ms = (typeof window.PLD_LOADER_MS === 'number' && window.PLD_LOADER_MS > 0) ? window.PLD_LOADER_MS : 4000;
      setTimeout(function(){ window.location.href = href; }, ms);
    });
  }

})();
