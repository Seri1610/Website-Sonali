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

    // A small local chatbot: replace getAssistantReply with a fetch call when a backend is ready.
    const launcher = document.querySelector("#chat-launcher");
    const panel = document.querySelector("#chat-panel");
    const closeButton = document.querySelector("#chat-close");
    const form = document.querySelector("#chat-form");
    const input = document.querySelector("#chat-input");
    const messages = document.querySelector("#chat-messages");
    const suggestions = document.querySelectorAll("[data-question]");

    function setChatOpen(isOpen) {
        panel.hidden = !isOpen;
        launcher.setAttribute("aria-expanded", String(isOpen));
        if (isOpen) input.focus();
    }

    function addMessage(text, type) {
        const message = document.createElement("div");
        message.className = `chat-message ${type}-message`;
        message.textContent = text;
        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;
    }

    function getAssistantReply(question) {
        const normalizedQuestion = question.toLowerCase();

        if (normalizedQuestion.includes("nowadays") || normalizedQuestion.includes("these days") || normalizedQuestion.includes("currently") || normalizedQuestion.includes("doing now") || normalizedQuestion.includes("what is sonali doing")) {
            return "Sonali is currently pursuing her Ph.D. in Environmental Engineering at Virginia Tech and is also completing a Master's in Computer Science. Apart from research, she is preparing for the Hokie Half Marathon!";
        }
        if (normalizedQuestion.includes("research") || normalizedQuestion.includes("work")) {
            return "Sonali's research combines biosensing, Surface-enhanced Raman spectroscopy, nanoparticle engineering, and machine learning. She studies pathogen detection, protein changes in cells, and computational biology for single-cell sequencing data.";
        }
        if (normalizedQuestion.includes("publication") || normalizedQuestion.includes("paper")) {
            return "Selected publications cover machine learning-assisted SERS detection, rapid virus quantification with a digital SERS-LFT dipstick, and Raman imaging of cementitious carbonation. Visit the Publications section or Google Scholar for the complete list.";
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
