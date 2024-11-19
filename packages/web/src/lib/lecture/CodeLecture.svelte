<script lang="ts">
	import type { CodeLecture } from "../server/content/_lecture";
    import { onMount } from 'svelte';
    import {
        SandpackProvider,
        type SandpackFiles,
        SandpackCodeEditor,
        SandpackFileExplorer,
    } from "@codesandbox/sandpack-react";

    import { loadSandpackClient, type ClientOptions, type SandboxSetup } from "@codesandbox/sandpack-client";
	import { invalidate } from "$app/navigation";

    let { lecture }: {lecture: CodeLecture} = $props();

    const DEPENDENCIES: Record<string, string> = {
        "react": "18.3.1",
        "react-dom": "18.3.1",
        "@types/react": "18.2.66",
        "@types/react-dom": "18.2.22",
        "react-router-dom": "6.22.3",
        "react-hook-form": "7.51.2",
        zod: "3.22.4",
        "@hookform/resolvers": "3.3.4",
    };

    const indexFile = "import { StrictMode } from \"react\";\nimport { createRoot } from \"react-dom/client\";\n\nimport App from \"./src/App\";\n\nconst rootElement = document.getElementById(\"root\");\nconst root = createRoot(rootElement);\n\nroot.render(\n  <StrictMode>\n    <App />\n  </StrictMode>\n);";
    let iframe: HTMLIFrameElement | null = null;

    onMount(async () => {
        const assignmentFiles: SandpackFiles = {
            "index.js": { code: indexFile }
        };
        const solutionFiles: SandpackFiles = {};
        const text = [];

        for (const token of lecture.content) {
            if (token.type === "code") {
                const [, file, type] = token.lang.split(" ");
                if (type === "assignment") assignmentFiles[`/src/${file}`] = { code: token.text };
                if (type === "solution") solutionFiles[`/src/${file}`] = { code: token.text };
            }
            if (token.type === "paragraph") {
                text.push(token.text);
            }
        }
  
        // Files, environment and dependencies
        const content: SandboxSetup = {
            files: { 
                // Add index.html file with root div
                "/index.html": {
                    code: "<!DOCTYPE html>\n<html>\n  <head>\n    <title>React App</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n  </body>\n</html>"
                },
                "/package.json": { code: JSON.stringify({
                    main: "index.js",
                    dependencies: {...DEPENDENCIES},
                    scripts: {
                        start: "react-scripts start",
                        build: "react-scripts build",
                        test: "react-scripts test --env=jsdom",
                        eject: "react-scripts eject"
                    }
                })},
                // Main file
                ...assignmentFiles
            },
            template: 'create-react-app-typescript',
            entry: "/index.js",
        };
  
        // Optional options
        const options: ClientOptions = {
            showOpenInCodeSandbox: true,
            showErrorScreen: true,
            showLoadingScreen: true,
        };
        

        const client = loadSandpackClient(iframe, content, options);

        // showIframe = false;

        const listener = client.listen((msg) => {
            if(msg.type === 'done') {
            }
        });
    });
            
</script>

<!-- <iframe bind:this={iframe}
style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
title="sharp-shape-yg6dt7"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
 -->
<h1 class="text-2xl font-bold text-white">Code lectures are not supported yet</h1>