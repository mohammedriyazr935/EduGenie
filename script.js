function startLearning() {
    alert("Welcome to EduGenie! Your learning journey starts here.");
}

async function solveDoubt() {
    const question = document.getElementById("questionInput").value;
    const answerBox = document.getElementById("answerBox");

    if (question.trim() === "") {
        answerBox.innerText = "Please enter a question.";
        return;
    }

    answerBox.innerText = "EduGenie is thinking...";

    try {
        const response = await fetch("/api/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: question
            })
        });

        const data = await response.json();

        if (data.answer) {
            answerBox.innerText = data.answer;
        } else {
            answerBox.innerText = data.error || "Something went wrong.";
        }

    } catch (error) {
        answerBox.innerText = "Unable to connect to EduGenie.";
        console.error(error);
    }
}
function summarizeNotes() {
    const text = document.getElementById("notesInput").value.trim();
    const summaryBox = document.getElementById("summaryBox");

    if (text === "") {
        summaryBox.innerText = "Please enter your study content.";
        return;
    }

    const sentences = text
        .split(/[.!?]+/)
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 0);

    const important = sentences.slice(0, 4);

    summaryBox.innerText =
        "Key Notes:\n\n• " + important.join("\n• ");
}
function generateQuiz() {
    const topic = document.getElementById("quizTopic").value.trim();
    const quizBox = document.getElementById("quizBox");

    if (topic === "") {
        quizBox.innerText = "Please enter a topic.";
        return;
    }

    quizBox.innerText =
        "Quiz on " + topic + "\n\n" +
        "1. What is " + topic + "?\n\n" +
        "2. What are the main features of " + topic + "?\n\n" +
        "3. Give one example of " + topic + ".";
}
function createStudyPlan() {
    const subject = document.getElementById("studySubject").value.trim();
    const hours = document.getElementById("studyHours").value;
    const box = document.getElementById("studyPlanBox");

    if (subject === "" || hours === "" || Number(hours) < 1 || Number(hours) > 12) {
        box.innerText = "Enter a subject and study hours from 1 to 12.";
        return;
    }

    box.innerText =
        "Your Study Plan\n\n" +
        "Subject: " + subject + "\n" +
        "Study Time: " + hours + " hour(s)\n\n" +
        "1. Revise the main concepts.\n" +
        "2. Practise important questions.\n" +
        "3. Review what you learned.";
}
function createStudyPlan() {
    const subject = document.getElementById("studySubject").value.trim();
    const hours = document.getElementById("studyHours").value;
    const box = document.getElementById("studyPlanBox");

    if (subject === "" || hours === "" || Number(hours) < 1 || Number(hours) > 12) {
        box.innerText = "Enter a subject and study hours from 1 to 12.";
        return;
    }

    box.innerText =
        "Your Study Plan\n\n" +
        "Subject: " + subject + "\n" +
        "Study Time: " + hours + " hour(s)\n\n" +
        "1. Revise the main concepts.\n" +
        "2. Practise important questions.\n" +
        "3. Review what you learned.";
}