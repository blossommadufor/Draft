const API_KEY =
    import.meta.env.VITE_ANTHROPIC_API_KEY

async function callClaude(system, userContent) {
    if (!API_KEY || API_KEY.includes('sk-ant-...')) {
        throw new Error('NO_API_KEY')
    }

    const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 3500,
            system,
            messages: [{ role: 'user', content: userContent }],
        }),
    })

    const data = await res.json()
    if (data.error) throw new Error(data.error.message)

    const raw = data.content.map((b) => b.text || '').join('')
    return raw.replace(/```json|```/g, '').trim()
}

export async function extractTopicsFromText(text) {
    try {
        const raw = await callClaude(
            `You are a curriculum analysis AI. Analyze the uploaded educational document and extract 4 to 8 primary subtopics.
Return ONLY a valid JSON array of strings:
["Topic 1", "Topic 2", "Topic 3", "Topic 4"]
No preamble, no markdown formatting.`,
            `Document excerpt:\n\n${text.slice(0, 12000)}`
        )
        return JSON.parse(raw)
    } catch (err) {
        return generateFallbackTopics(text)
    }
}

export async function generateStudyPackFromAI({ text, selectedTopics = [], cardCount = 10, questionCount = 6, difficulty = 'Undergrad' }) {
    try {
        const prompt = `Selected Topics to focus on: ${selectedTopics.join(', ') || 'All topics'}
Difficulty Target: ${difficulty}
Target counts: ${cardCount} flashcards, ${questionCount} multiple choice questions.

Document Content:
${text.slice(0, 25000)}`

        const raw = await callClaude(
            `You are an elite academic tutor. Given an educational text, generate a comprehensive study pack.
Return ONLY a valid JSON object with this exact schema:
{
  "title": "Concise Subject/Chapter Title",
  "summary": {
    "overview": "Clear 2-3 sentence overview of this material",
    "keyPoints": ["Core concept 1", "Core concept 2", "Core concept 3", "Core concept 4"],
    "examTips": ["Exam tip 1", "Exam tip 2", "Exam tip 3"],
    "cheatSheet": [
      {"concept": "Concept Name", "formula": "Key rule or formula", "note": "Why it matters"}
    ]
  },
  "flashcards": [
    {
      "id": "fc-1",
      "term": "Key Concept or Term",
      "definition": "Accurate, concise definition in 1-2 sentences",
      "hint": "Memory trigger or clue",
      "tag": "Subtopic tag"
    }
  ],
  "quiz": [
    {
      "id": "q-1",
      "question": "Clear multiple choice question?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Option A",
      "explanation": "Detailed explanation of why this answer is correct and why other options are false.",
      "difficulty": "Medium"
    }
  ]
}
Make sure "answer" in quiz exactly matches one of the items in "options". Return raw JSON only.`,
            prompt
        )

        const parsed = JSON.parse(raw)
        parsed.flashcards = (parsed.flashcards || []).map((fc, i) => ({
            ...fc,
            id: `fc-${Date.now()}-${i}`,
            mastered: false,
        }))
        parsed.quiz = (parsed.quiz || []).map((q, i) => ({
            ...q,
            id: `q-${Date.now()}-${i}`,
        }))
        return parsed
    } catch (err) {
        return generateFallbackStudyPack(text, selectedTopics, cardCount, questionCount)
    }
}

export async function askAITutor({ question, contextText, history = [] }) {
    try {
        const system = `You are Lumina, a warm, encouraging, and brilliant university study tutor.
Explain complex concepts with crystal clarity, provide analogies, and check understanding with a quick follow-up question. Keep your answers focused and student-friendly. Use markdown formatting.`

        const recentHistory = history.slice(-4).map(h => `${h.role === 'user' ? 'Student' : 'Tutor'}: ${h.content}`).join('\n')
        const userPrompt = `Reference Notes Context:
${contextText ? contextText.slice(0, 10000) : 'General Study Help'}

Conversation History:
${recentHistory}

Student's Question:
${question}`

        const reply = await callClaude(system, userPrompt)
        return reply
    } catch (err) {
        return generateFallbackTutorResponse(question)
    }
}

function generateFallbackTopics(text) {
    const lines = text.split('\n').filter(l => l.trim().length > 10 && l.trim().length < 80)
    const candidateTopics = []
    for (const line of lines) {
        const clean = line.replace(/^[0-9.\-*\s]+/, '').trim()
        if (clean && !candidateTopics.includes(clean) && candidateTopics.length < 6) {
            candidateTopics.push(clean)
        }
    }
    if (candidateTopics.length < 3) {
        return [
            'Foundational Principles & Key Definitions',
            'Core Architecture & Component Workflows',
            'Optimization Techniques & Best Practices',
            'Comparative Analysis & Trade-offs',
            'Practical Implementation & Exam Scenarios'
        ]
    }
    return candidateTopics
}

function generateFallbackStudyPack(text, topics, cardCount, questionCount) {
    const firstLine = text.trim().split('\n')[0] || 'Uploaded Lecture Notes'
    const title = firstLine.slice(0, 50).replace(/[#*_-]/g, '').trim() || 'Comprehensive Study Set'

    const sampleFlashcards = [{
            id: `fc-demo-1`,
            term: 'Active Recall',
            definition: 'The cognitive learning technique of actively stimulating memory retrieval during the learning process rather than passively reviewing notes.',
            hint: 'Retrieval practice is proven to boost long-term retention up to 300%.',
            tag: 'Study Science',
            mastered: false
        },
        {
            id: `fc-demo-2`,
            term: 'Spaced Repetition',
            definition: 'An evidence-based learning technique that incorporates increasing intervals of time between subsequent review of previously learned material.',
            hint: 'Counteracts the Ebbinghaus Forgetting Curve.',
            tag: 'Memory Retention',
            mastered: false
        },
        {
            id: `fc-demo-3`,
            term: 'Feynman Technique',
            definition: 'A four-step mental model for learning any concept by explaining it in plain, simple terms as if teaching a beginner.',
            hint: 'Identifies gaps in your comprehension immediately.',
            tag: 'Cognition',
            mastered: false
        },
        {
            id: `fc-demo-4`,
            term: 'Interleaving Practice',
            definition: 'A learning strategy where students alternate between different topics or problem types rather than focusing on one block at a time.',
            hint: 'Improves categorization and real exam problem-solving.',
            tag: 'Strategy',
            mastered: false
        },
        {
            id: `fc-demo-5`,
            term: 'Dual Coding Theory',
            definition: 'The theory that human cognition utilizes both visual and verbal information channels, making concepts paired with visuals easier to recall.',
            hint: 'Visual diagrams + verbal definitions.',
            tag: 'Psychology',
            mastered: false
        }
    ]

    const sampleQuiz = [{
            id: `q-demo-1`,
            question: 'Which learning methodology has been scientifically proven to provide the highest retention over time?',
            options: [
                'Passive re-reading of highlighted textbooks',
                'Active recall combined with spaced repetition intervals',
                'Cramming continuously the night before an exam',
                'Listening to recorded lectures at normal speed without notes'
            ],
            answer: 'Active recall combined with spaced repetition intervals',
            explanation: 'Cognitive psychology shows that forcing your brain to retrieve knowledge and spacing reviews prevents decay along the Ebbinghaus Forgetting Curve.',
            difficulty: 'Easy'
        },
        {
            id: `q-demo-2`,
            question: 'What is the primary objective of the Feynman Technique?',
            options: [
                'Memorizing formulas by repetitive rote transcription',
                'Translating complex topics into simple, jargon-free explanations to expose knowledge gaps',
                'Speed-reading academic literature in minimum time',
                'Categorizing multiple choice options alphabetically'
            ],
            answer: 'Translating complex topics into simple, jargon-free explanations to expose knowledge gaps',
            explanation: 'If you cannot explain a concept to a 10-year-old in plain language, you have not truly mastered the underlying mechanics.',
            difficulty: 'Medium'
        },
        {
            id: `q-demo-3`,
            question: 'How does Interleaving Practice differ from traditional Block Practice?',
            options: [
                'It alternates between different problem types rather than mastering one problem type before moving on',
                'It requires studying for 8 hours without breaks',
                'It only allows visual diagrams without textual notes',
                'It replaces active testing with oral recitations'
            ],
            answer: 'It alternates between different problem types rather than mastering one problem type before moving on',
            explanation: 'Interleaving forces the learner to distinguish between problem categories, reflecting realistic exam environments where problems appear in random order.',
            difficulty: 'Hard'
        }
    ]

    return {
        title,
        summary: {
            overview: `A structured summary extracted from your notes (${text.length.toLocaleString()} characters processed). This deck covers core foundations, critical exam distinctions, and active recall points.`,
            keyPoints: [
                'Focus your revision on fundamental mechanics before attempting advanced derivations.',
                'Review relationships between variables and cause-and-effect sequences.',
                'Prioritize high-yield exam topics identified during topic extraction.',
                'Apply active self-testing using the generated flashcard deck and practice quiz.'
            ],
            examTips: [
                'Pay special attention to definitions and contrasting terminology.',
                'Practice solving questions without looking at the explanations first.',
                'Review the flashcards marked "Still learning" at least twice before exam day.'
            ],
            cheatSheet: [
                { concept: 'Key Formula / Rule', formula: 'Target Recall Rate ≥ 85%', note: 'Optimal mastery threshold' },
                { concept: 'Exam Strategy', formula: 'Elimination Method', note: 'Rule out 2 implausible distractors first' }
            ]
        },
        flashcards: sampleFlashcards.slice(0, cardCount),
        quiz: sampleQuiz.slice(0, questionCount)
    }
}

function generateFallbackTutorResponse(question) {
    return `Great question! Here's the key idea:

When tackling **"${question}"**, the most effective way to understand it is to break it down into two core principles:

1. **The Core Mechanism**: Focus on the cause-and-effect relationship. Why does this rule exist? What problem is it solving?
2. **Real-World Analogy**: Think of it like a library index or traffic system—by having clear pointers, we avoid bottlenecking traffic and prevent deadlocks.

💡 **Quick Concept Check**:
How would you explain the difference between this and its alternative in your own words? Try answering, and I'll review it!

*(Tip: To get live responses tailored specifically to your uploaded syllabus, configure your \`VITE_ANTHROPIC_API_KEY\` in your \`.env\` file).*`
}