const data = {
    name: "Kousalya Jayasankar",
    bio: "Content Marketer & SEO Specialist. I help SaaS companies double their organic traffic through data-driven storytelling.",
    
    // Ensure these exist in your assets folder
    photo: "assets/profile.jpeg", 
    resume: "assets/MyResume.pdf", 

    services: [
        "Copywriting", 
        "SEO Blog Writing", 
        "Social Media Strategy", 
        "Email Marketing"
    ],
    
    contact: {
        email: "kousalya.arundhathi@gmail.com",
        linkedin: "https://www.linkedin.com/in/kousalya-jayasankar-856344209/",
        medium: "https://medium.com/@jkousalya007"
    },

    projects: [
        {
            title: "Search intent mismatch: When Google Thinks SaaS is a Tent",
            category: "Blogs",
            type: "text",
            source: "",
            description: "What is search intent and why search intent mismatch occur? ",
            link: "https://medium.com/@jkousalya007/search-intent-mismatch-b9b786d253a4"
        },
        {
            title: "How to Scale Organic Traffic",
            category: "Blogs",
            type: "text",
            source: "",
            description: "A guide on keyword clustering that increased traffic by 40%.",
            link: "https://medium.com"
        },
        {
            title: "How to Scale Organic Traffic",
            category: "Blogs",
            type: "text",
            source: "",
            description: "A guide on keyword clustering that increased traffic by 40%.",
            link: "https://medium.com"
        },
        {
            title: "How to Scale Organic Traffic",
            category: "Blogs",
            type: "text",
            source: "",
            description: "A guide on keyword clustering that increased traffic by 40%.",
            link: "https://medium.com"
        },
        {
            title: "Webinar: Future of SEO",
            category: "Videos",
            type: "youtube",
            // Use the Embed URL (https://www.youtube.com/embed/...)
            source: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
            description: "Hosted a 1-hour session on Search trends.",
            link: "https://youtube.com"
        },
        {
            title: "Promotional Reel",
            category: "Videos",
            type: "video",
            // Points to local file in assets folder
            source: "assets/video.mp4", 
            description: "30-second brand introduction.",
            link: "#"
        },
        {
            title: "Marketing Talks Ep. 1",
            category: "Podcasts",
            type: "audio",
            source: "assets/podcast.mp3", 
            description: "Discussing AI in marketing.",
            link: "#"
        },
        {
        title: "Podcast Ep 10: The AI Revolution",
        category: "Podcasts",
        
        // 1. This makes the AUDIO PLAYER appear on your card
        type: "audio", 
        
        // 2. The file that plays when they press 'Play' on the card
        source: "assets/podcast.mp3", 
        
        // 3. The description
        description: "Listen to the audio here, or watch the full video on our channel.",
        
        // 4. Where the button takes them (The YouTube Video)
        link: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
        
        // 5. Custom Button Text
        buttonText: "Watch Video on YouTube ↗" 
    },
    ]
};