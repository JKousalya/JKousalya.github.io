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
    const platformNames = Object.keys(data.contact);
    platformNames.forEach(platform => {
        const link = document.createElement('a');
        link.href = data.contact[platform];
        link.textContent = platform; 
        link.className = 'social-btn';
        link.target = "_blank";
        socialContainer.appendChild(link);
    });
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

// 6. Projects & Filters & MEDIUM AUTO-FETCH
const projectContainer = document.getElementById('project-list');
const filterContainer = document.getElementById('filter-container');

if (projectContainer && filterContainer && data) {
    
    // Ensure data.projects exists as an array
    data.projects = data.projects || [];

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
                actionBtn = `<a href="${project.link}" target="_blank">${project.buttonText || "Listen Podcast ♫"}</a>`;
            
            } else if (project.type === 'markdown') {
                actionBtn = `<button onclick="loadMarkdown('${project.source}')" class="read-btn">Read Article →</button>`;
            
            } else {
                // Default for text/blogs
                actionBtn = `<a href="${project.link}" target="_blank">Read Blog ↗</a>`;
            }

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

    function setupFilters() {
        filterContainer.innerHTML = ''; 
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

    // --- BULLETPROOF MEDIUM AUTO-FETCH LOGIC ---
    const mediumUsername = "jkousalya007"; 
    const mediumRSSUrl = `https://medium.com/feed/@${mediumUsername}`;
    
    // Using the 'raw' proxy endpoint to get pure XML data
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(mediumRSSUrl)}`;

    fetch(proxyUrl)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(xmlDoc => {
            // Native, fail-proof XML parsing
            const items = xmlDoc.getElementsByTagName("item");
            const liveMediumBlogs = [];

            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                
                let title = item.getElementsByTagName("title")[0]?.textContent || "Untitled";
                let link = item.getElementsByTagName("link")[0]?.textContent || "#";
                
                // Safely grab the content box
                let rawHTML = "";
                const encodedContent = item.getElementsByTagName("content:encoded")[0];
                const descriptionContent = item.getElementsByTagName("description")[0];

                if (encodedContent) {
                    rawHTML = encodedContent.textContent;
                } else if (descriptionContent) {
                    rawHTML = descriptionContent.textContent;
                }

                // Bulletproof HTML Stripper
                let tempDiv = document.createElement("div");
                tempDiv.innerHTML = rawHTML;
                let cleanText = tempDiv.textContent || tempDiv.innerText || "";
                let snippet = cleanText.substring(0, 120).trim() + "...";

                liveMediumBlogs.push({
                    title: title,
                    category: "Blogs", 
                    type: "text",
                    source: "",
                    description: snippet,
                    link: link
                });
            }

            // Combine and render
            if (liveMediumBlogs.length > 0) {
                data.projects = [...liveMediumBlogs, ...data.projects];
            }
            
            setupFilters();
            displayProjects(data.projects);
        })
        .catch(error => {
            console.error("Medium Fetch Failed:", error);
            
            // THE FAILSAFE: If the API breaks, show this fallback card so the page isn't empty!
            if (data.projects.length === 0) {
                data.projects.push({
                    title: "Check out my latest articles on Medium",
                    category: "Blogs",
                    type: "text",
                    source: "",
                    description: "Click below to read my most recent thoughts on SaaS, SEO, and content strategy.",
                    link: `https://medium.com/@${mediumUsername}`
                });
            }
            
            setupFilters();
            displayProjects(data.projects);
        });
}
