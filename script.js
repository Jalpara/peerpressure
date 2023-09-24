async function generatePrompt() {
    const newsType = document.getElementById('news-type').value;
    const location = document.getElementById('location').value;

    try {
        const response = await fetch('http://localhost:3000/generateNews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newsType, location })
        });

        const result = await response.json();
        const newsResult = document.getElementById('news-result');
        newsResult.innerHTML = `<p>${result.content}</p>`;
    } catch (error) {
        console.error('Error:', error);
    }
}
