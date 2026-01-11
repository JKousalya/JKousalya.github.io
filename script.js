// 1. SAFE LOAD HELPER
function setContent(id, content) {
    const element = document.getElementById(id);
    if (element) element.textContent = content;
}

// 2. Load Header Info (Runs on ALL pages)
if (typeof data !== 'undefined') {
    setContent('name', data.name);
    setContent('footer-name', data.name);
    setContent('bio', data.bio); 
    setContent('year', new Date().getFullYear());

    const photoEl = document.getElementById('profile-photo');
    if (photoEl && data.photo) photoEl.src = data.photo;
}

// 3. Services Logic
const servicesContainer = document.getElementById('services-container');
const toggleBtn = document.getElementById('service-toggle');

if (servicesContainer && data && data.services) {
    data.services.forEach(service => {
        const tag = document.createElement('span');
        tag.className = 'service-tag';
        tag.textContent = service;
        servicesContainer.appendChild(tag);
    });

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            servicesContainer.classList.toggle('hidden');
            servicesContainer.classList.toggle('active-services');
            
            if (servicesContainer.classList.contains('active-services')) {
                toggleBtn.textContent = "Close Services -";
            } else {
                toggleBtn.textContent = "View Services +";
            }
        });
    }
}

// 4. Resume & Socials
const resumeContainer = document.getElementById('resume-container');
if (resumeContainer && data && data.resume) {
    const resumeBtn = document.createElement('a');
    resumeBtn.href = data.resume;
    resumeBtn.textContent = "DOWNLOAD RESUME"; 
    resumeBtn.className = 'resume-btn';
    resumeBtn.target = "_blank"; 
    resumeContainer.appendChild(resumeBtn);
}

const socialContainer = document.getElementById('social-links');
if (socialContainer && data && data.contact) {
    for (const [platform, url] of Object.entries(data.contact)) {
        const link = document.createElement('a');
        link.href = url;
        link.textContent = platform; 
        link.className = 'social-btn';
        socialContainer.appendChild(link);
    }
}

// 5. Modal Logic
const modal = document.getElementById('blog-modal');
const modalContent = document.getElementById('markdown-viewer');
const closeModal = document.getElementById('close-modal');

if (modal && closeModal) {
    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
}

// 6. Projects & Filters (Only runs on Home Page)
const projectContainer = document.getElementById('project-list');
const filterContainer = document.getElementById('filter-container');

if (projectContainer && filterContainer && data && data.projects) {
    
    function displayProjects(items) {
        projectContainer.innerHTML = ''; 
        items.forEach(project => {
            const card = document.createElement('div');
            card.className = 'card';

            let mediaContent = '';
            let actionBtn = '';

            // --- CUSTOM BUTTON LOGIC ---
            if (project.type === 'youtube') {
                mediaContent = `<iframe src="${project.source}" title="YouTube video" frameborder="0" allowfullscreen></iframe>`;
                actionBtn = `<a href="${project.link}" target="_blank">Watch Video ▶</a>`;
            
            } else if (project.type === 'video') {
                mediaContent = `<video controls src="${project.source}"></video>`;
                actionBtn = `<a href="${project.link}" target="_blank">Watch Video ▶</a>`;
            
            } else if (project.type === 'audio') {
                mediaContent = `<audio controls src="${project.source}"></audio>`;
                actionBtn = `<a href="${project.link}" target="_blank">Listen Podcast ♫</a>`;
            
            } else if (project.type === 'markdown') {
                // Button triggers the Popup Modal
                actionBtn = `<button onclick="loadMarkdown('${project.source}')" class="read-btn">Read Article →</button>`;
            
            } else {
                // Default for text/blogs
                actionBtn = `<a href="${project.link}" target="_blank">Read Blog ↗</a>`;
            }
            // ---------------------------

            card.innerHTML = `
                ${mediaContent}
                <h3>${project.title}</h3>
                <span style="font-size: 0.75rem; color: #999; text-transform: uppercase; letter-spacing: 1px; font-weight:bold;">${project.category}</span>
                <p>${project.description}</p>
                ${actionBtn}
            `;
            projectContainer.appendChild(card);
        });
    }

    // Global function for Markdown
    window.loadMarkdown = function(filePath) {
        if (!modal) return;
        fetch(filePath)
            .then(response => response.text())
            .then(text => {
                modalContent.innerHTML = marked.parse(text);
                modal.classList.remove('hidden');
            })
            .catch(err => console.error('Error loading blog:', err));
    };

    function setupFilters() {
        const categories = ['All', ...new Set(data.projects.map(p => p.category))];
        categories.forEach(category => {
            const btn = document.createElement('button');
            btn.textContent = category;
            btn.className = 'filter-btn';
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                if (category === 'All') displayProjects(data.projects);
                else displayProjects(data.projects.filter(p => p.category === category));
            });
            filterContainer.appendChild(btn);
        });
        const firstBtn = document.querySelector('.filter-btn');
        if (firstBtn) firstBtn.classList.add('active');
    }

    setupFilters();
    displayProjects(data.projects);
}