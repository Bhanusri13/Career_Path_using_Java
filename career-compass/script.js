// Career paths and their requirements
const careerPaths = {
    'Cloud Security Engineer': {
        keywords: ['cloud', 'security', 'azure', 'aws', 'cybersecurity'],
        skills: ['Cloud Computing', 'Security', 'Networking', 'DevOps', 'Automation'],
        description: 'Focuses on securing cloud infrastructure and applications',
        nextSteps: [
            'Obtain AWS Certified Security - Specialty certification',
            'Complete Azure Security Engineer Associate certification',
            'Practice with cloud security tools like AWS Security Hub',
            'Join cloud security communities and forums'
        ],
        improvements: [
            'Enhance knowledge of container security',
            'Learn infrastructure as code (Terraform, CloudFormation)',
            'Develop incident response skills',
            'Master cloud security best practices'
        ]
    },
    'Front-End Developer': {
        keywords: ['html', 'css', 'javascript', 'react', 'ui', 'ux'],
        skills: ['HTML/CSS', 'JavaScript', 'React', 'UI/UX', 'Responsive Design'],
        description: 'Creates user interfaces and interactive web applications',
        nextSteps: [
            'Master modern JavaScript frameworks (React, Vue, Angular)',
            'Learn state management (Redux, Context API)',
            'Practice responsive design principles',
            'Build a portfolio of projects'
        ],
        improvements: [
            'Study advanced CSS techniques',
            'Learn TypeScript for better type safety',
            'Explore testing frameworks (Jest, React Testing Library)',
            'Understand web performance optimization'
        ]
    },
    'Data Scientist': {
        keywords: ['python', 'machine learning', 'data', 'ai', 'analytics'],
        skills: ['Python', 'Machine Learning', 'Data Analysis', 'Statistics', 'SQL'],
        description: 'Analyzes data and builds machine learning models',
        nextSteps: [
            'Complete advanced machine learning courses',
            'Practice with real-world datasets',
            'Learn deep learning frameworks (TensorFlow, PyTorch)',
            'Participate in Kaggle competitions'
        ],
        improvements: [
            'Enhance statistical analysis skills',
            'Learn big data technologies (Spark, Hadoop)',
            'Master data visualization tools',
            'Develop MLOps knowledge'
        ]
    },
    'DevOps Engineer': {
        keywords: ['devops', 'automation', 'cloud', 'ci/cd', 'docker'],
        skills: ['CI/CD', 'Docker', 'Kubernetes', 'Automation', 'Cloud'],
        description: 'Manages development and operations infrastructure',
        nextSteps: [
            'Master container orchestration with Kubernetes',
            'Learn infrastructure as code tools',
            'Set up CI/CD pipelines',
            'Practice with cloud platforms'
        ],
        improvements: [
            'Enhance monitoring and logging skills',
            'Learn advanced automation techniques',
            'Master cloud-native technologies',
            'Develop security best practices'
        ]
    }
};

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing event listeners...');

    // Initialize the coding level display
    const codingLevelInput = document.getElementById('codingLevel');
    if (codingLevelInput) {
        codingLevelInput.addEventListener('input', function(e) {
            document.getElementById('codingLevelValue').textContent = e.target.value;
        });
        console.log('Coding level input initialized');
    } else {
        console.error('Coding level input not found');
    }

    // Handle form submission
    const careerForm = document.getElementById('careerForm');
    if (careerForm) {
        careerForm.addEventListener('submit', function(e) {
            console.log('Form submitted');
            e.preventDefault();
            
            // Get form values
            const certifications = document.getElementById('certifications').value.toLowerCase();
            const courses = document.getElementById('courses').value.toLowerCase();
            const interests = document.getElementById('interests').value.toLowerCase();
            const preferences = document.getElementById('preferences').value.toLowerCase();
            const codingLevel = parseInt(document.getElementById('codingLevel').value);

            console.log('Form values:', { certifications, courses, interests, preferences, codingLevel });

            // Calculate career path scores
            const scores = calculateCareerScores(certifications, courses, interests, preferences, codingLevel);
            console.log('Calculated scores:', scores);
            
            // Get the best matching career path
            const bestMatch = getBestMatch(scores);
            console.log('Best match:', bestMatch);
            
            // Display results
            displayResults(bestMatch, scores);
        });
        console.log('Form submission handler initialized');
    } else {
        console.error('Career form not found');
    }

    // Handle PDF export
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            const resultSection = document.getElementById('resultSection');
            const originalDisplay = resultSection.style.display;
            
            // Ensure the result section is visible for printing
            resultSection.style.display = 'block';
            
            // Create a new window for printing
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Career Compass - Your Career Path</title>
                        <style>
                            body {
                                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                                line-height: 1.6;
                                color: #2c3e50;
                                padding: 2rem;
                            }
                            .recommendation-card {
                                background-color: #f8f9fa;
                                padding: 2rem;
                                border-radius: 8px;
                                margin-bottom: 2rem;
                                border: 1px solid #e9ecef;
                            }
                            h1, h2, h3, h4 {
                                color: #4a90e2;
                            }
                            ul {
                                list-style-type: none;
                                padding-left: 0;
                            }
                            li {
                                margin-bottom: 0.8rem;
                                padding-left: 1.5rem;
                                position: relative;
                            }
                            li:before {
                                content: "•";
                                color: #4a90e2;
                                position: absolute;
                                left: 0;
                            }
                            .skills-chart {
                                margin: 2rem 0;
                            }
                            @media print {
                                body {
                                    padding: 0;
                                }
                                .recommendation-card {
                                    break-inside: avoid;
                                }
                            }
                        </style>
                    </head>
                    <body>
                        <h1>Career Compass - Your Career Path</h1>
                        ${resultSection.innerHTML}
                    </body>
                </html>
            `);
            
            // Wait for content to load
            printWindow.document.close();
            printWindow.onload = function() {
                printWindow.print();
                printWindow.close();
            };
            
            // Restore original display state
            resultSection.style.display = originalDisplay;
        });
        console.log('Export button initialized');
    } else {
        console.error('Export button not found');
    }
});

function calculateCareerScores(certifications, courses, interests, preferences, codingLevel) {
    const scores = {};
    
    for (const [career, data] of Object.entries(careerPaths)) {
        let score = 0;
        
        // Check certifications
        data.keywords.forEach(keyword => {
            if (certifications.includes(keyword)) score += 2;
        });
        
        // Check courses
        data.keywords.forEach(keyword => {
            if (courses.includes(keyword)) score += 1.5;
        });
        
        // Check interests
        data.keywords.forEach(keyword => {
            if (interests.includes(keyword)) score += 1;
        });
        
        // Adjust score based on coding level
        if (career === 'Front-End Developer' || career === 'DevOps Engineer') {
            score += codingLevel * 0.5;
        }
        
        scores[career] = score;
    }
    
    return scores;
}

function getBestMatch(scores) {
    let bestCareer = '';
    let highestScore = -1;
    
    for (const [career, score] of Object.entries(scores)) {
        if (score > highestScore) {
            highestScore = score;
            bestCareer = career;
        }
    }
    
    return {
        career: bestCareer,
        score: highestScore,
        details: careerPaths[bestCareer]
    };
}

function displayResults(bestMatch, scores) {
    // Show result section
    document.getElementById('resultSection').style.display = 'block';
    
    // Update career title and explanation
    document.getElementById('careerTitle').textContent = bestMatch.career;
    document.getElementById('careerExplanation').textContent = 
        `Based on your profile, you're a great match for ${bestMatch.career}. ${bestMatch.details.description}`;
    
    // Display next steps
    const nextStepsList = document.getElementById('nextStepsList');
    nextStepsList.innerHTML = bestMatch.details.nextSteps
        .map(step => `<li>${step}</li>`)
        .join('');
    
    // Display improvements
    const improvementsList = document.getElementById('improvementsList');
    improvementsList.innerHTML = bestMatch.details.improvements
        .map(improvement => `<li>${improvement}</li>`)
        .join('');
    
    // Create skills chart
    const ctx = document.getElementById('skillsChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: bestMatch.details.skills,
            datasets: [{
                label: 'Required Skills',
                data: bestMatch.details.skills.map(() => 8),
                backgroundColor: 'rgba(74, 144, 226, 0.2)',
                borderColor: 'rgba(74, 144, 226, 1)',
                pointBackgroundColor: 'rgba(74, 144, 226, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(74, 144, 226, 1)'
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 10
                }
            }
        }
    });
} 