export const load = () => {
    // This would typically fetch from an API/database
    // Mocked data for now
    return {
        coursesInProgress: [
            {
                id: 1,
                title: "Introduction to JavaScript",
                progress: 45,
                cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png",
                lastAccessed: "2024-01-15"
            },
            {
                id: 2, 
                title: "Advanced React Patterns",
                progress: 23,
                cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
                lastAccessed: "2024-01-14"
            },
            {
                id: 3,
                title: "Building with Svelte",
                progress: 78,
                cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/1200px-Svelte_Logo.svg.png",
                lastAccessed: "2024-01-13"
            }
            ,
            {
                id: 4,
                title: "TypeScript Fundamentals",
                progress: 34,
                cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png",
                lastAccessed: "2024-01-12"
            }
        ]
    };
};
