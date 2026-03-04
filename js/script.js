const root = document.body;

    // theme
    const themeToggle = document.getElementById('theme-toggle');
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      root.setAttribute('data-theme', storedTheme);
    }
    const syncThemeLabel = () => {
      const t = root.getAttribute('data-theme') || 'dark';
      themeToggle.textContent = t === 'dark' ? 'Dark' : 'Light';
    };
    syncThemeLabel();
    themeToggle.addEventListener('click', () => {
      const next = (root.getAttribute('data-theme') || 'dark') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      syncThemeLabel();
    });

    // mobile menu
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const setMenuOpen = open => {
      mobileMenu.classList.toggle('open', open);
      menuToggle.textContent = open ? 'Close' : 'Menu';
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    setMenuOpen(false);

    menuToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      setMenuOpen(!isOpen);
    });

    // close on navigation
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => setMenuOpen(false));
    });

    // close on outside click
    document.addEventListener('click', e => {
      const target = e.target;
      const isOpen = mobileMenu.classList.contains('open');
      if (!isOpen) return;
      if (menuToggle.contains(target) || mobileMenu.contains(target)) return;
      setMenuOpen(false);
    });

    // close on Escape
    window.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      setMenuOpen(false);
    });

    // close when switching to desktop
    const mq = window.matchMedia('(min-width: 760px)');
    const syncByViewport = () => {
      if (mq.matches) setMenuOpen(false);
    };
    syncByViewport();
    if (typeof mq.addEventListener === 'function') mq.addEventListener('change', syncByViewport);
    else mq.addListener(syncByViewport);

    // active nav link
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    const sectionIds = ['#home', '#projects', '#timeline', '#contact'];
    const sections = sectionIds
      .map(id => document.querySelector(id))
      .filter(Boolean);

    const setActive = id => {
      navLinks.forEach(a => {
        if (a.getAttribute('href') === id) a.classList.add('active');
        else a.classList.remove('active');
      });
    };
    const navObs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0.01 }
    );
    sections.forEach(s => navObs.observe(s));

    // fade-up animation
    const animEls = document.querySelectorAll('[data-anim]');
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('show'); });
    },{threshold:0.15});
    animEls.forEach(el=>obs.observe(el));

    // projects data
    const projects = [
      {
        title: "System Admin for Product & Digital Marketing",
        desc: "Admin system to manage products and digital marketing at PT KK Indonesia.",
        role: "Fullstack Developer",
        tech: ["Laravel", "PHP"]
      },
      {
        title: "System Services & Informations for Imigrasi Bogor",
        desc: "Information and service application for Imigrasi Bogor Kelas I Non TPI.",
        role: "Fullstack Developer",
        tech: ["Laravel", "J-Query", "PHP"]
      },
      {
        title: "E-Meterai Digital System",
        desc: "E-Meterai integration system built with Laravel and Golang.",
        role: "Fullstack Developer",
        tech: ["Laravel", "J-Query", "PHP"]
      },
      {
        title: "Ramayana Dashboard",
        desc: "Reporting dashboard for Ramayana built with Angular and Golang.",
        role: "Fullstack Developer",
        tech: ["Laravel", "Angular.js", "Golang"]
      },
      {
        title: "Ramayana E-Recruitment",
        desc: "Internal e-recruitment system for Ramayana built with Laravel.",
        role: "Fullstack Developer",
        tech: ["Laravel", "PHP", "Golang"]
      },
      {
        title: "ERP Beeloft",
        desc: "Beeloft ERP migrated to Angular and Golang.",
        role: "Fullstack Developer",
        tech: ["Angular.js", "Golang"]
      },
      {
        title: "ERP Sinar Sukses Mandiri",
        desc: "Internal ERP for Sinar Sukses Mandiri built with Vue.",
        role: "Fullstack Developer",
        tech: ["Vue.js", "Java Spring boot"]
      },
      {
        title: "ERP DFEO Indico Telkomsel",
        desc: "DFEO ERP for Telkomsel as part of INDICO.",
        role: "Fullstack Developer",
        tech: ["React.js", "Golang"]
      },
      {
        title: "System Indiana Indico Telkomsel",
        desc: "Indiana system application for Indico Telkomsel.",
        role: "Fullstack Developer",
        tech: ["React.js", "Golang"]
      },
      {
        title: "Farm Recommendation System",
        desc: "Recommendation system for agriculture (Mobile Farm).",
        role: "Fullstack Developer",
        tech: ["React.js", "Golang"]
      },
      {
        title: "Buyer Experience Mobile DFEO",
        desc: "Buyer experience for DFEO mobile platform.",
        role: "Fullstack Developer",
        tech: ["React.js", "Golang"]
      },
      {
        title: "Budget Cotroller",
        desc: "Budget cotroller system for Scuro Group.",
        role: "Fullstack Developer",
        tech: ["PHP Native"]
      },
      {
        title: "Quotation Payment",
        desc: "Note Hostory payment quotation for Scuro Group.",
        role: "Fullstack Developer",
        tech: ["PHP Native"]
      },
      {
        title: "LLM + Messenger",
        desc: "LLM + Messenger for Scuro Group.",
        role: "Fullstack Developer",
        tech: ["React.js", "Golang"]
      },
    ];

    const techTone = {
      "Golang":"cyan",
      "React.js":"sky",
      "PostgreSQL":"indigo",
      "PHP":"indigo",
      "Laravel":"red",
      "MySQL":"amber",
      "Vue.js":"green",
      "Node.js":"green",
      "HTML":"amber",
      "TailwindCSS":"cyan",
      "WebSocket":"violet",
      "Angular.js":"violet",
      "Java Spring boot":"indigo"
    };

    let currentPage=1; const perPage=4;
    function renderProjects(){
      const container=document.getElementById('project-list');
      container.innerHTML='';
      const start=(currentPage-1)*perPage;
      const pageProjects=projects.slice(start,start+perPage);
      for(const p of pageProjects){
        const badges=p.tech.map(t=>`<span class="tag" data-tone="${techTone[t]||'gray'}">${t}</span>`).join('');
        const card=document.createElement('div');
        card.className="surface card fade-up";
        card.innerHTML=`
          <h3 class="card-title">${p.title}</h3>
          <p class="card-desc">${p.desc}</p>
          <div class="card-role">As ${p.role}</div>
          <div class="badges">${badges}</div>
        `;
        card.setAttribute('data-anim', '');
        container.appendChild(card);
        obs.observe(card);
      }
      renderPagination();
    }

    function renderPagination(){
      const pag=document.getElementById('pagination'); pag.innerHTML='';
      const total=Math.ceil(projects.length/perPage);
      for(let i=1;i<=total;i++){
        const btn=document.createElement('button');
        btn.className=`page-btn ${i===currentPage?'active':''}`;
        btn.textContent=i;
        btn.onclick=()=>{currentPage=i;renderProjects();};
        pag.appendChild(btn);
      }
    }

    renderProjects();