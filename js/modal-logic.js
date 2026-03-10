function openTerminal(spaceUrl, useIframe = false) {
    const modal = document.getElementById('terminal-modal');
    const body = document.getElementById('terminal-body');
    
    // Reset Header Text
    const headerText = modal.querySelector('.modal-header span');
    if(headerText) headerText.innerText = ">> REMOTE_LINK_ESTABLISHED // TERMINAL_01";
    
    body.innerHTML = '';

    if (useIframe) {
        const frame = document.createElement('iframe');
        frame.src = spaceUrl;
        frame.allow = 'clipboard-read; clipboard-write; microphone; camera; fullscreen; autoplay';
        body.appendChild(frame);
    } else {
        const app = document.createElement('gradio-app');
        app.setAttribute('src', spaceUrl);
        body.appendChild(app);
    }

    modal.classList.add('active');
}

function openMediaModal() {
    const modal = document.getElementById('terminal-modal');
    const body = document.getElementById('terminal-body');

    // Reset Header Text
    const headerText = modal.querySelector('.modal-header span');
    if(headerText) headerText.innerText = ">> REMOTE_LINK_ESTABLISHED // TERMINAL_01";

    // 1. HARDCODED HTML COMPLETELY BYPASSES GITHUB PAGES FETCH() BLOCKS
    const sommaHTML = `
    <div class="somma-scene">
        <div class="somma-card" id="somma-card">
            <div class="somma-face active-side" id="face-front">
                <button class="hud-btn btn-watch" onclick="toggleHud('front', event)"><span id="text-front">Watch Feed</span></button>
                <button class="hud-btn btn-flip" onclick="flipCard(event)">SWITCH_VIDEO_FEED_</button>
                <div id="player-front"></div>
                <div class="hud-overlay" id="hud-front">
                    <div class="hud-scanlines"></div>
                    <div class="hud-top">
                        <div class="hud-logo-box"><div class="hud-logo-symbol">A</div></div>
                        <div class="hud-title-box"><div class="striped-text flicker">BAYESIAN INFERENCE</div></div>
                    </div>
                    <div class="hud-middle"><div class="dot-matrix-text">STATE SPACE MODEL / EXPLANATION</div></div>
                    <div class="hud-spacer"></div>
                    <div class="hud-bottom">
                        <div class="hud-mission-box"><h2>THERMO<br>DYNAMICS</h2><div class="hud-sub-label">CAM_01 [ ACTIVE ]</div></div>
                        <div class="hud-stats-box"><div class="stat-row"><span>PROTOCOL:</span><span>RICK_ROLL</span></div><div class="stat-row"><span>LATENCY:</span><span>12ms</span></div></div>
                    </div>
                </div>
            </div>
            <div class="somma-face back-face" id="face-back">
                <button class="hud-btn btn-watch" onclick="toggleHud('back', event)"><span id="text-back">Watch Feed</span></button>
                <button class="hud-btn btn-flip" onclick="flipCard(event)">SWITCH_VIDEO_FEED_</button>
                <div id="player-back"></div>
                <div class="hud-overlay" id="hud-back">
                    <div class="hud-scanlines"></div>
                    <div class="hud-top">
                        <div class="hud-logo-box"><div class="hud-logo-symbol">B</div></div>
                        <div class="hud-title-box"><div class="striped-text flicker">BAYES SSM ALGO</div></div>
                    </div>
                    <div class="hud-middle"><div class="dot-matrix-text">NASDAQ AND GOLD // COINTEGRATION</div></div>
                    <div class="hud-spacer"></div>
                    <div class="hud-bottom">
                        <div class="hud-mission-box"><h2>MEAN<br>REVERSION</h2><div class="hud-sub-label">CAM_02 [ STANDBY ]</div></div>
                        <div class="hud-stats-box"><div class="stat-row"><span>PROTOCOL:</span><span>ORNSTEIN-UHLENBECK</span></div><div class="stat-row"><span>LATENCY:</span><span>44ms</span></div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    const snapshotCardsHTML = `
    <div class="snapshot-card">
        <div class="card-inner">
            <div class="front">
                <div class="ui-header"><span class="header-title">COINTEGRATION</span><span class="header-stat">P < 0.05</span></div>
                <div class="ui-console"><span>*** STATIONARITY TEST ***</span><span>> METHOD: ADF TEST</span><span>> ECONOMETRICS 101</span></div>
                <div class="ui-viewport">
                    <ul class="readout-list">
                        <li class="readout-item"><span class="readout-sym">&beta;</span><span class="readout-desc">Rolling OLS spread anchor, sidestepping Johansen's noise instability.</span></li>
                    </ul>
                </div>
                <div class="ui-footer"><div class="bracket-box">Like two dogs on a leash—paths may wander, but distance stays stationary.</div></div>
                <div class="vert-strip">STAT: VALID</div>
            </div>
            <div class="back"><div class="back-grid"><h2 class="back-title">DEF_01</h2><p class="back-desc">A statistical property of a collection of time series variables that share a common stochastic drift.</p></div></div>
        </div>
    </div>
    <div class="snapshot-card alert">
        <div class="card-inner">
            <div class="front">
                <div class="ui-header"><span class="header-title">STATE VECTORS</span><span class="header-stat">DIM: N</span></div>
                <div class="ui-console"><span>*** CURRENT SYSTEM STATE ***</span><span>> STEP: PREDICTION</span><span>> NOISE: GAUSSIAN</span></div>
                <div class="ui-viewport">
                    <ul class="readout-list">
                        <li class="readout-item"><span class="readout-sym">&mu;</span><span class="readout-desc">Time-varying fair value center.</span></li>
                        <li class="readout-item"><span class="readout-sym">&kappa;</span><span class="readout-desc">Speed of mean reversion.</span></li>
                        <li class="readout-item"><span class="readout-sym">&sigma;</span><span class="readout-desc">Instantaneous spread volatility.</span></li>
                    </ul>
                </div>
                <div class="ui-footer"><div class="bracket-box"><span style="color: #fff; background: var(--term-alert);">PROCESS</span> Current state estimation logic initialized.</div></div>
                <div class="vert-strip">MODE: ESTIMATE</div>
            </div>
            <div class="back"><div class="back-grid"><h2 class="back-title">DEF_02</h2><p class="back-desc">A set of data describing the exact state of a dynamic system at a given time t.</p></div></div>
        </div>
    </div>
    <div class="snapshot-card">
        <div class="card-inner">
            <div class="front">
                <div class="ui-header"><span class="header-title">BAYES INFERENCE</span><span class="header-stat">Mk_1</span></div>
                <div class="ui-console"><span>*** BAYES' THEOREM ***</span><span>> TYPE: UPDATES BELIEFS WITH EVIDENCE</span><span>> SUM: 1.0</span></div>
                <div class="ui-viewport">
                    <ul class="readout-list">
                        <li class="readout-item"><span class="readout-sym">x<sup>-</sup></span><span class="readout-desc"><strong>Prior:</strong> Initial belief about state before data.</span></li>
                        <li class="readout-item"><span class="readout-sym">R</span><span class="readout-desc"><strong>Obs Noise:</strong> Uncertainty in measurements.</span></li>
                        <li class="readout-item"><span class="readout-sym">x<sup>+</sup></span><span class="readout-desc"><strong>Posterior:</strong> Updated belief about state after data.</span></li>
                    </ul>
                </div>
                <div class="ui-footer"><div class="bracket-box">Bayesian belief update cycle.</div></div>
                <div class="vert-strip">LOGIC: PROBABILISTIC</div>
            </div>
            <div class="back"><div class="back-grid"><h2 class="back-title">DEF_03</h2><p class="back-desc">A square matrix used to describe the transitions of a Markov chain.</p></div></div>
        </div>
    </div>`;

    // 2. Build the final modal structure
    const content = `
        <div class="media-showcase">
            <div class="video-section">
                ${sommaHTML}
                <div style="margin-top: 1rem; font-family: var(--font-mono); color: var(--text-dim); font-size: 0.8rem; border-left: 2px solid var(--accent); padding-left: 10px;">
                    >> VIDEO_FEED_ESTABLISHED<br>>> STREAM_QUALITY: 4K_UHD<br>>> LATENCY: 12ms
                </div>
                <div class="desc-box">
                    <div class="desc-corner tl"></div><div class="desc-corner tr"></div>
                    <div class="desc-corner bl"></div><div class="desc-corner br"></div>
                    <div class="desc-label">MISSION_BRIEF // 01</div>
                    <div class="desc-content">
                        <strong>Objective:</strong> Deploy scalable headless architecture for global retail operations.<br><br>
                        System integrates <strong>Next.js</strong> front-end logic with <strong>Go</strong> microservices for sub-millisecond transaction processing. Features include real-time inventory locking, high-frequency trading safeguards, and distributed CDN caching.
                    </div>
                    <div class="desc-line"></div>
                    <div class="desc-meta"><span>SEC_LEVEL: 4</span><span>[ ENCRYPTED ]</span></div>
                </div>
            </div>
            <div class="gallery-section">
                <h4>>> SYSTEM_SNAPSHOTS</h4>
                <div class="gallery-scroll">
                    ${snapshotCardsHTML}
                </div>
            </div>
        </div>
    `;

    // 3. Inject and show
    body.innerHTML = content;
    modal.classList.add('active');
    
    // 4. Slight delay to ensure the DOM has fully painted the iframe containers before calling YouTube API
    setTimeout(() => {
        if (typeof initSommaPlayers === "function") initSommaPlayers();
    }, 50);
}

async function openPDFModal() {
    const modal = document.getElementById('terminal-modal');
    const body = document.getElementById('terminal-body');
    const headerText = modal.querySelector('.modal-header span');
    
    if(headerText) headerText.innerText = ">> DECRYPTING_FILE // SSM_WHITEPAPER.PDF";
    modal.classList.add('active');
    
    body.innerHTML = '';
    const container = document.createElement('div');
    container.id = 'pdf-viewer-container';
    
    const loader = document.createElement('div');
    loader.className = 'pdf-loading-text';
    loader.innerHTML = ">> DOWNLOADING DATA PACKETS... <br>>> PARSING BINARY...";
    container.appendChild(loader);
    body.appendChild(container);
    
    const url = 'SSMWhitePaper.pdf'; 
    
    try {
        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;
        loader.remove();
        
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const containerWidth = container.clientWidth || 800;
            const viewport = page.getViewport({ scale: 1.0 });
            
            const desiredWidth = containerWidth * 0.9;
            const scale = desiredWidth / viewport.width;
            const scaledViewport = page.getViewport({ scale: scale });
            
            const canvas = document.createElement('canvas');
            canvas.className = 'pdf-canvas';
            const context = canvas.getContext('2d');
            canvas.height = scaledViewport.height;
            canvas.width = scaledViewport.width;
            
            container.appendChild(canvas);
            await page.render({ canvasContext: context, viewport: scaledViewport }).promise;
            canvas.classList.add('loaded'); 
        }
        
        const footer = document.createElement('div');
        footer.style.color = "var(--text-dim)";
        footer.style.fontFamily = "var(--font-pixel)";
        footer.style.marginTop = "20px";
        footer.innerText = `[ END OF DOCUMENT // ${pdf.numPages} PAGES RENDERED ]`;
        container.appendChild(footer);
    } catch (error) {
        console.error("PDF Load Error:", error);
        container.innerHTML = `
            <div style="color:var(--term-alert); padding:2rem; text-align:center;">
                >> ERROR: DATA CORRUPTION DETECTED<br>
                >> ${error.message}<br><br>
                <a href="${url}" target="_blank" class="btn">[ MANUAL_DOWNLOAD ]</a>
            </div>
        `;
    }
}

function closeTerminal() {
    const modal = document.getElementById('terminal-modal');
    modal.classList.remove('active');
    
    if (typeof destroySommaPlayers === "function") destroySommaPlayers();
    
    setTimeout(() => {
        document.getElementById('terminal-body').innerHTML = '';
        const headerText = modal.querySelector('.modal-header span');
        if(headerText) headerText.innerText = ">> REMOTE_LINK_ESTABLISHED // TERMINAL_01";
    }, 300);
}

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeTerminal();
});