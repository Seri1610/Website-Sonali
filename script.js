document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling for navbar links
    const links = document.querySelectorAll(".navbar .center ul li a");

    links.forEach(link => {
        link.addEventListener("click", function (event) {
            if (!this.getAttribute("href").startsWith("#")) {
                return;
            }
            event.preventDefault();
            const section = document.querySelector(this.getAttribute("href"));
            if (section) {
                window.scrollTo({
                    top: section.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

    // Fade-in animation for sections
    const sections = document.querySelectorAll(".section, .aboutSection, .news-section, .awards-section, .publications-section, .talks-section, .blog-section");
    const options = {
        root: null,
        threshold: 0.2,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, options);

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = "translateY(20px)";
        section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        observer.observe(section);
    });

    const storyIndex = document.querySelector("#story-index");
    const storyReader = document.querySelector("#story-reader");
    const backToStories = document.querySelector("#back-to-stories");
    const storyArticles = document.querySelectorAll("[data-story]");

    function showStory(storyId, updateHistory = true) {
        const story = document.querySelector(`[data-story="${storyId}"]`);
        if (!story) return showStoryIndex(false);
        storyIndex.hidden = true;
        storyReader.hidden = false;
        storyArticles.forEach(article => {
            article.hidden = article !== story;
        });
        if (updateHistory) window.history.pushState(null, "", `#${storyId}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function showStoryIndex(updateHistory = true) {
        storyIndex.hidden = false;
        storyReader.hidden = true;
        storyArticles.forEach(article => {
            article.hidden = true;
        });
        if (updateHistory) window.history.pushState(null, "", window.location.pathname);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (storyIndex && storyReader && backToStories) {
        document.querySelectorAll("[data-story-link]").forEach(link => {
            link.addEventListener("click", event => {
                event.preventDefault();
                showStory(link.dataset.storyLink);
            });
        });
        backToStories.addEventListener("click", () => showStoryIndex());
        window.addEventListener("popstate", () => {
            const storyId = window.location.hash.slice(1);
            storyId ? showStory(storyId, false) : showStoryIndex(false);
        });
        const initialStory = window.location.hash.slice(1);
        initialStory ? showStory(initialStory, false) : showStoryIndex(false);
    }

    // A small local chatbot: replace getAssistantReply with a fetch call when a backend is ready.
    const launcher = document.querySelector("#chat-launcher");
    const panel = document.querySelector("#chat-panel");
    const closeButton = document.querySelector("#chat-close");
    const form = document.querySelector("#chat-form");
    const input = document.querySelector("#chat-input");
    const messages = document.querySelector("#chat-messages");
    const suggestions = document.querySelectorAll("[data-question]");

    if (!launcher || !panel || !closeButton || !form || !input || !messages) return;

    function setChatOpen(isOpen) {
        panel.hidden = !isOpen;
        launcher.setAttribute("aria-expanded", String(isOpen));
        if (isOpen) input.focus();
    }

    function addMessage(text, type) {
        const message = document.createElement("div");
        message.className = `chat-message ${type}-message`;
        if (type === "assistant") {
            message.innerHTML = text;
        } else {
            message.textContent = text;
        }
        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;
    }

    function getAssistantReply(question) {
        const normalizedQuestion = question.toLowerCase();

        if (normalizedQuestion.includes("nowadays") || normalizedQuestion.includes("these days") || normalizedQuestion.includes("currently") || normalizedQuestion.includes("doing now") || normalizedQuestion.includes("what is sonali doing")) {
            return "Sonali is currently pursuing her Ph.D. in Environmental Engineering at Virginia Tech and is also completing a Master's in Computer Science. Apart from research, she is preparing for the Hokie Half Marathon!";
        }
        if (normalizedQuestion.includes("pensieve")) {
            return "Muggles :|";
        }
        if (normalizedQuestion.includes("fun") || normalizedQuestion.includes("hobby") || normalizedQuestion.includes("free time") || normalizedQuestion.includes("harry potter") || normalizedQuestion.includes("running")) {
            return "Sonali enjoys <strong>running and unapologetically nerding out over Harry Potter</strong>. She is always up for a deep dive into the Wizarding World and is currently listening to the <em>Harry Potter</em> audiobooks for what might be the 10th time. 🪄🏃‍♀️";
        }
        if (normalizedQuestion.includes("research") || normalizedQuestion.includes("work")) {
            return "Sonali's research combines biosensing, Surface-enhanced Raman spectroscopy, nanoparticle engineering, and machine learning. She studies pathogen detection, protein changes in cells, and computational biology for single-cell sequencing data.";
        }
        if (normalizedQuestion.includes("publication") || normalizedQuestion.includes("published") || normalizedQuestion.includes("paper") || normalizedQuestion.includes("article")) {
            return "Here are selected publications from Sonali's <a href=\"#publications\">portfolio</a>:<br><br><a href=\"https://pubs.acs.org/esthag/article/58/47/20830/153043\" target=\"_blank\" rel=\"noopener\">Machine learning-assisted SERS detection review</a><br><a href=\"https://pmc.ncbi.nlm.nih.gov/articles/PMC10956432/\" target=\"_blank\" rel=\"noopener\">Digital SERS-LFT dipstick for virus quantification</a><br><a href=\"https://analyticalsciencejournals.onlinelibrary.wiley.com/doi/abs/10.1002/jrs.6483\" target=\"_blank\" rel=\"noopener\">Raman imaging of cementitious carbonation</a><br><a href=\"https://www.cell.com/one-earth/abstract/S2590-3322(24)00331-2\" target=\"_blank\" rel=\"noopener\">Nanosensors for water contaminant surveillance</a><br><a href=\"https://www.pnas.org/doi/full/10.1073/pnas.2604717123\" target=\"_blank\" rel=\"noopener\">Interfacial electric fields in microdroplet aerosols</a><br><br><a href=\"https://scholar.google.co.in/citations?user=JXGMY98AAAAJ&hl=en\" target=\"_blank\" rel=\"noopener\">View all publications on Google Scholar</a>.";
        }
        if (normalizedQuestion.includes("project")) {
            return "Current portfolio projects include Cross-Attention Enhanced SwinUNETR for brain tumor segmentation and CNN-based classification of diabetic retinopathy using retinal images.";
        }
        if (normalizedQuestion.includes("education") || normalizedQuestion.includes("degree") || normalizedQuestion.includes("study")) {
            return "Sonali is pursuing a Ph.D. in Environmental Engineering and an M.S. in Computer Science at Virginia Tech. She also holds an M.S. in Construction Materials from UIUC and a B.Tech. in Civil Engineering from IIT Tirupati.";
        }
        if (normalizedQuestion.includes("contact") || normalizedQuestion.includes("email") || normalizedQuestion.includes("hire")) {
            return "You can contact Sonali at sonalis3@vt.edu or connect with her on LinkedIn. The links are available in the Contact section.";
        }

        return "I can answer questions about Sonali's research, education, publications, projects, awards, and contact information. Try asking: What does Sonali research?";
    }

    function submitQuestion(question) {
        const trimmedQuestion = question.trim();
        if (!trimmedQuestion) return;
        addMessage(trimmedQuestion, "user");
        input.value = "";
        window.setTimeout(() => addMessage(getAssistantReply(trimmedQuestion), "assistant"), 250);
    }

    launcher.addEventListener("click", () => setChatOpen(panel.hidden));
    closeButton.addEventListener("click", () => setChatOpen(false));
    form.addEventListener("submit", event => {
        event.preventDefault();
        submitQuestion(input.value);
    });
    suggestions.forEach(button => {
        button.addEventListener("click", () => submitQuestion(button.dataset.question));
    });
});
