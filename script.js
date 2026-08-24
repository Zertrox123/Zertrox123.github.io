/* ==========================================================================
   PORTFOLIO LOGIC - VANILLA JAVASCRIPT (INDEPENDENT STATIC BUNDLE)
   ========================================================================== */

// 1. Projects Data (Inlined for 0-latency & 100% offline/static compatibility)
const PROJECTS_DATA = [
  {
    id: "corewar",
    name: "Corewar",
    category: "scolaire",
    subCategory: "system",
    date: "2026",
    technologies: ["C", "ASM", "Virtual Machine", "Scheduling"],
    description: "Machine virtuelle complète et assembleur bytecode en C pour champions de combat mémoire.",
    detailed_description: "Projet majeur de systèmes consistant à développer en langage C une machine virtuelle complète exécutant des champions programmés en bytecode assembleur dans une arène circulaire mémoire de 6 Ko.\n\nFonctionnalités principales :\n- Interprétation et ordonnancement dynamique des processus de chaque programme champion.\n- Cycle d'exécution temps réel avec gestion des conflits d'adressage et instructions spéciales (fork, live, ld, st, add, zjmp).\n- Assembleur personnalisé traduisant le langage assembleur en format binaire exécutable .cor.\n\nObjectifs techniques : Maîtrise avancée du C, manipulation des pointeurs, gestion dynamique de la mémoire, adressage circulaire et émulation matérielle bas-niveau.",
    github: "https://github.com/Zertrox123"
  },
  {
    id: "the-plazza",
    name: "The Plazza & Panoramix",
    category: "scolaire",
    subCategory: "system",
    date: "2026",
    technologies: ["C++20", "Multithreading", "IPC", "Thread Pools"],
    description: "Moteur de simulation distribué haute concurrence avec gestion multi-processus et synchronisation POSIX.",
    detailed_description: "Simulation d'une architecture distribuée haute concurrence simulant une pizzeria industrielle répartissant les commandes sur plusieurs processus enfants (cuisines).\n\nFonctionnalités principales :\n- Communication inter-processus via Named Pipes / Sockets de domaine Unix et protocoles binaires.\n- Thread pools dynamiques optimisés avec sémaphores, mutex et variables de condition.\n- Ordonnanceur et load-balancer automatique prévenant la famine, les deadlocks et les race conditions.\n\nObjectifs techniques : Programmation concurrente moderne en C++20, synchronisation sans verrou bloquant, architectures distribuées et allocation dynamique de ressources.",
    github: "https://github.com/Zertrox123"
  },
  {
    id: "myteams-myftp",
    name: "MyTeams & MyFTP",
    category: "scolaire",
    subCategory: "system",
    date: "2026",
    technologies: ["C", "C++", "RFC 959", "Multiplexage I/O", "TCP/IP"],
    description: "Serveurs et clients réseaux multi-clients asynchrones basés sur multiplexage d'E/S (select / poll).",
    detailed_description: "Implémentation d'architectures serveurs et clients réseau concurrentes conformes aux standards internet.\n\nFonctionnalités principales :\n- MyFTP : Implémentation du protocole standardisé RFC 959 (authentification, transferts de fichiers passif/actif, commandes Unix distantes).\n- MyTeams : Plateforme collaborative distribuée multi-clients avec gestion des utilisateurs, canaux de discussion, messages privés et persistance.\n- Gestion des connexions non-bloquantes via multiplexage I/O (select / poll / epoll).\n\nObjectifs techniques : Programmation réseau bas-niveau sous Unix, sockets TCP, machines à états finis et protocoles asynchrones.",
    github: "https://github.com/Zertrox123"
  },
  {
    id: "my-top",
    name: "My Top",
    category: "scolaire",
    subCategory: "system",
    date: "2024",
    technologies: ["C", "Unix", "/proc", "System Monitoring"],
    description: "Reproduction fidèle en C de la commande système top d'Unix.",
    detailed_description: "Reprogrammation complète en langage C de la commande top d’Unix afin de comprendre en profondeur le noyau du système d'exploitation.\n\nFonctionnalités principales :\n- Parsing et extraction des métriques système depuis le répertoire virtuel /proc/.\n- Affichage temps réel de l'état des processus (PID, mémoire vive, CPU, statut, threads).\n- Rafraîchissement périodique fluide et options de tri dynamique par consommation de ressources.",
    github: "https://github.com/Zertrox123"
  },
  {
    id: "minishell",
    name: "Minishell",
    category: "scolaire",
    subCategory: "system",
    date: "2025",
    technologies: ["C", "Unix", "Pipes", "Process Management"],
    description: "Reproduction complète d'un shell Unix (Bash/Zsh) avec gestion des pipes et redirections.",
    detailed_description: "Développement d'un interpréteur de commandes Unix interactif en C.\n\nFonctionnalités principales :\n- Parsing et exécution des commandes utilisateur via fork, execve et waitpid.\n- Gestion des pipes multi-niveaux (|) et redirections d'entrées/sorties (<, >, >>, <<).\n- Builtins internes : cd, env, setenv, unsetenv, exit, echo, export.\n- Gestion des variables d'environnement, des signaux Unix (SIGINT, SIGTSTP) et de la mémoire sans fuite.",
    github: "https://github.com/Zertrox123"
  },
  {
    id: "tardis",
    name: "Tardis AI",
    category: "scolaire",
    subCategory: "ai",
    date: "2025",
    technologies: ["Python", "Pandas", "Scikit-Learn", "Machine Learning"],
    description: "IA prédictive anticipant les retards de trains à partir de jeux de données historiques.",
    detailed_description: "Modèle de machine learning supervisé en Python pour l'analyse prédictive et la classification.\n\nFonctionnalités principales :\n- Prétraitement et nettoyage de données réelles massives avec Pandas et NumPy.\n- Entraînement de modèles de régression et classification pour estimer la probabilité et la durée des retards ferroviaires.\n- Évaluation statistique des performances et métriques de validation croisée.",
    github: "https://github.com/Zertrox123"
  },
  {
    id: "my-sudo",
    name: "My Sudo",
    category: "scolaire",
    subCategory: "system",
    date: "2025",
    technologies: ["C", "Unix", "Security", "Authentication"],
    description: "Recréation en C de l'utilitaire système sudo avec gestion des privilèges et authentification.",
    detailed_description: "Compréhension bas-niveau des mécanismes d'authentification et d'élévation de privilèges sous Linux.\n\nFonctionnalités principales :\n- Demande sécurisée de mot de passe utilisateur et vérification des droits dans les configurations sudoers.\n- Exécution de commandes avec privilèges root contrôlés et gestion rigoureuse des erreurs système.",
    github: "https://github.com/Zertrox123"
  },
  {
    id: "my_portfolio_rust",
    name: "Portfolio Web en Rust",
    category: "personnel",
    subCategory: "web",
    date: "2025",
    technologies: ["Rust", "Rocket", "Tera", "HTML/CSS"],
    description: "Portfolio web fullstack développé en Rust avec le framework Rocket et moteur Tera.",
    detailed_description: "Conception d'une application web côté serveur performante et typée en Rust.\n\nFonctionnalités principales :\n- Gestion des routes asynchrones et rendu de templates dynamiques avec Tera.\n- Espace d'administration sécurisé avec gestion dynamique des projets et stockage JSON.\n- Interface utilisateur moderne avec animations dynamiques et mode interactif.",
    github: "https://github.com/Zertrox123"
  },
  {
    id: "geometry-dash",
    name: "Geometry Dash Auto Recorder",
    category: "personnel",
    subCategory: "system",
    date: "2025",
    technologies: ["Python", "OpenCV", "FFmpeg", "Automation"],
    description: "Outil d'automatisation et de capture d'écran temps réel pour Geometry Dash.",
    detailed_description: "Automatisation de la détection et de la capture de sessions de jeu en Python.\n\nFonctionnalités principales :\n- Détection d'événements visuels à l'écran via analyse d'images.\n- Enregistrement vidéo accéléré par matériel en tâche de fond avec FFmpeg.\n- Sérialisation et journalisation précise des timestamps d'inputs clavier/souris.",
    github: "https://github.com/Zertrox123"
  },
  {
    id: "youtube-game",
    name: "Youtube Game Bot",
    category: "personnel",
    subCategory: "other",
    date: "2020",
    technologies: ["Python", "MySQL", "Discord API", "AsyncIO"],
    description: "Bot Discord interactif intégrant un système de jeu RPG avec base de données relationnelle MySQL.",
    detailed_description: "Bot communautaire en Python gérant des interactions asynchrones et de la persistance de données pour des milliers de requêtes de joueurs.",
    github: "https://github.com/Zertrox123"
  }
];

// 2. Dynamic Ticker Animation
const tickerWords = ["C / C++20", "Systèmes Unix / Linux", "Concurrence & Threads", "Rust", "Python & IA", "Architectures Réseau"];
let tickerIndex = 0;
const tickerEl = document.getElementById("tickerWord");

function updateTicker() {
  if (!tickerEl) return;
  tickerEl.style.opacity = "0";
  tickerEl.style.transform = "translateY(10px)";
  
  setTimeout(() => {
    tickerIndex = (tickerIndex + 1) % tickerWords.length;
    tickerEl.textContent = tickerWords[tickerIndex];
    tickerEl.style.opacity = "1";
    tickerEl.style.transform = "translateY(0)";
  }, 250);
}
setInterval(updateTicker, 2400);

// 3. Render Projects & Filter Logic
const projectsGrid = document.getElementById("projectsGrid");

function renderProjects(filter = "all") {
  if (!projectsGrid) return;
  projectsGrid.innerHTML = "";

  const filtered = PROJECTS_DATA.filter(p => {
    if (filter === "all") return true;
    if (filter === "scolaire") return p.category === "scolaire";
    if (filter === "personnel") return p.category === "personnel";
    if (filter === "system") return p.subCategory === "system";
    return true;
  });

  filtered.forEach(project => {
    const card = document.createElement("div");
    card.className = "card project-card";
    card.dataset.id = project.id;

    const tagsHtml = project.technologies.map(t => `<span>${t}</span>`).join("");

    card.innerHTML = `
      <div class="project-header">
        <span class="project-category-tag">${project.category === "scolaire" ? "Scolaire" : "Personnel"}</span>
        <span class="text-muted" style="font-size: 0.8rem;">${project.date}</span>
      </div>
      <h3 class="project-title">${project.name}</h3>
      <p class="project-desc">${project.description}</p>
      <div class="project-tags">${tagsHtml}</div>
      <div class="click-hint">&rarr; Cliquer pour voir les détails</div>
    `;

    card.addEventListener("click", () => openModal(project));
    projectsGrid.appendChild(card);
  });
}

// 4. Modal Logic
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalDate = document.getElementById("modalDate");
const modalTechs = document.getElementById("modalTechs");
const modalDescription = document.getElementById("modalDescription");
const modalCloseBtn = document.getElementById("modalCloseBtn");

function openModal(project) {
  modalTitle.textContent = project.name;
  modalCategory.textContent = project.category === "scolaire" ? "Projet Scolaire" : "Projet Personnel";
  modalDate.textContent = project.date;
  modalTechs.textContent = project.technologies.join(" • ");
  modalDescription.textContent = project.detailed_description || project.description;
  
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}

// Filter buttons
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProjects(btn.dataset.filter);
  });
});

// 5. Crazy Mode Physics (Directly inspired by omar/portfolio)
const crazyToggle = document.getElementById("crazyToggle");
let crazyActive = false;
let crazyAnimationFrame = null;

function randomOffset(max = 2.5) {
  return Math.random() * max * 2 - max;
}

function animateCrazyCards() {
  if (!crazyActive) return;
  const cards = document.querySelectorAll(".project-card, .about-card, .skill-group");
  
  cards.forEach(card => {
    const currentX = parseFloat(card.dataset.x || 0) + randomOffset();
    const currentY = parseFloat(card.dataset.y || 0) + randomOffset();
    
    // Bounded offsets
    const boundedX = Math.max(-12, Math.min(12, currentX));
    const boundedY = Math.max(-12, Math.min(12, currentY));
    
    card.dataset.x = boundedX;
    card.dataset.y = boundedY;
    card.style.transform = `translate(${boundedX}px, ${boundedY}px)`;
  });

  crazyAnimationFrame = requestAnimationFrame(animateCrazyCards);
}

if (crazyToggle) {
  crazyToggle.addEventListener("change", () => {
    crazyActive = crazyToggle.checked;
    if (crazyActive) {
      animateCrazyCards();
    } else {
      if (crazyAnimationFrame) cancelAnimationFrame(crazyAnimationFrame);
      const cards = document.querySelectorAll(".project-card, .about-card, .skill-group");
      cards.forEach(card => {
        card.dataset.x = 0;
        card.dataset.y = 0;
        card.style.transform = "translate(0, 0)";
      });
    }
  });
}

// 6. Interactive Terminal Logic
const terminalInput = document.getElementById("terminalInput");
const terminalOutput = document.getElementById("terminalOutput");

const TERMINAL_COMMANDS = {
  help: "Commandes disponibles :\n  • skills    - Affiche l'arsenal technique\n  • projects  - Liste les projets majeurs\n  • about     - Présentation du profil\n  • contact   - Coordonnées & réseaux\n  • sudo      - Élévation de privilèges\n  • clear     - Efface l'écran",
  skills: "Arsenal Technique :\n  - Langages    : C, C++20, Rust, Python, ASM x86_64, Bash, SQL\n  - Systèmes    : Linux, POSIX, Multithreading, IPC, Multiplexage I/O\n  - IA & Data   : PyTorch, Scikit-Learn, Pandas, NumPy, OpenCV\n  - Outils      : Git, Docker, GDB, Valgrind, CMake, Makefile",
  projects: "Projets Majeurs :\n  1. Corewar             - Machine virtuelle & Assembleur C\n  2. The Plazza          - Moteur de simulation distribué C++20\n  3. MyTeams & MyFTP     - Serveurs réseaux asynchrones RFC\n  4. Tardis AI           - Modèle prédictif Machine Learning\n  5. Minishell & MyTop   - Outils système Unix en C",
  about: "Zertrox123 - Développeur Systèmes & IA\nSpécialisé dans le C, C++20, les architectures réseau et le calcul haute performance.",
  contact: "Coordonnées :\n  • LinkedIn : https://www.linkedin.com/in/omar-joudi/?locale=en\n  • GitHub   : https://github.com/Zertrox123\n  • Email    : omar.joudi@epitech.eu",
  sudo: "Permission accordée. Bienvenue, root. Vous avez désormais le contrôle complet du système.",
  top: "PID  USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND\n  1  root      20   0  168432   9840   6520 S   0.0   0.1   0:02.14 systemd\n420  guest     20   0   48290  12480   8920 R   4.2   0.2   0:00.89 zertrox_engine",
  clear: "CLEAR"
};

function handleTerminalCommand(cmd) {
  const trimmed = cmd.trim().toLowerCase();
  if (!trimmed) return;

  if (trimmed === "clear") {
    terminalOutput.innerHTML = "";
    return;
  }

  const response = TERMINAL_COMMANDS[trimmed] || `Commande non reconnue : "${cmd}". Tapez "help" pour la liste.`;
  
  const cmdLine = document.createElement("div");
  cmdLine.innerHTML = `<span class="prompt-symbol">guest@zertrox:~$</span> ${cmd}`;
  
  const respLine = document.createElement("div");
  respLine.className = "terminal-line";
  respLine.style.color = "#8b949e";
  respLine.style.marginBottom = "8px";
  respLine.textContent = response;

  terminalOutput.appendChild(cmdLine);
  terminalOutput.appendChild(respLine);

  // Auto scroll
  const terminalBody = document.getElementById("terminalBody");
  if (terminalBody) terminalBody.scrollTop = terminalBody.scrollHeight;
}

if (terminalInput) {
  terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const val = terminalInput.value;
      handleTerminalCommand(val);
      terminalInput.value = "";
    }
  });
}

document.querySelectorAll(".term-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const cmd = btn.dataset.cmd;
    if (terminalInput) terminalInput.value = cmd;
    handleTerminalCommand(cmd);
  });
});

// 7. Copy Email & Toast Notification
const copyEmailBtn = document.getElementById("copyEmailBtn");
const toast = document.getElementById("toast");

if (copyEmailBtn) {
  copyEmailBtn.addEventListener("click", () => {
    const email = document.getElementById("emailText")?.textContent || "omar.joudi@epitech.eu";
    navigator.clipboard.writeText(email).then(() => {
      if (toast) {
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2800);
      }
    });
  });
}

// 8. Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.querySelector(".nav-links");

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// 9. Year Update
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Initial Render
renderProjects("all");
