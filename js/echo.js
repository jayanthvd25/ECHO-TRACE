// ============================================
// ECHOTRACE - COMPLETE JAVASCRIPT
// Black Theme Version
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    console.log('🖤 EchoTrace initialized!');
    console.log('🔍 Try searching for: person, car, or dog');
    console.log('📤 Upload videos using drag & drop or click');

    // ============================================
    // 1. SEARCH FUNCTIONALITY
    // ============================================
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const exampleChips = document.querySelectorAll('.example-chip');
    const resultsGrid = document.getElementById('resultsGrid');
    const resultsCount = document.getElementById('resultsCount');

    // Mock data for demonstration
    const mockResults = [
        { id: 1, timestamp: '00:12:34', confidence: 92, video: 'Camera 1 - Front Entrance' },
        { id: 2, timestamp: '01:45:20', confidence: 87, video: 'Camera 3 - Parking Lot' },
        { id: 3, timestamp: '03:22:10', confidence: 78, video: 'Camera 2 - Hallway' },
        { id: 4, timestamp: '04:15:45', confidence: 95, video: 'Camera 1 - Front Entrance' },
        { id: 5, timestamp: '05:30:12', confidence: 68, video: 'Camera 4 - Back Alley' },
        { id: 6, timestamp: '06:22:33', confidence: 82, video: 'Camera 3 - Parking Lot' },
        { id: 7, timestamp: '07:10:05', confidence: 74, video: 'Camera 2 - Hallway' },
        { id: 8, timestamp: '08:45:50', confidence: 91, video: 'Camera 1 - Front Entrance' },
        { id: 9, timestamp: '09:15:30', confidence: 88, video: 'Camera 5 - Main Gate' },
        { id: 10, timestamp: '10:05:22', confidence: 76, video: 'Camera 3 - Parking Lot' },
    ];

    // Function to display results
    function displayResults(query) {
        if (!query || !query.trim()) {
            resultsGrid.innerHTML = `
                <div class="result-placeholder">
                    <i class="fas fa-search-plus"></i>
                    <p>Please enter a search query</p>
                    <span style="font-size: 0.9rem; color: rgba(255,255,255,0.15);">Try: "person wearing red shirt"</span>
                </div>
            `;
            resultsCount.textContent = '0 matches found';
            return;
        }

        // Show loading state
        resultsGrid.innerHTML = `
            <div class="result-placeholder" style="color: rgba(255,255,255,0.05);">
                <i class="fas fa-spinner fa-spin"></i>
                <p style="margin-top: 1rem; color: rgba(255,255,255,0.2);">Searching for "${query}"...</p>
                <span style="font-size: 0.85rem; color: rgba(255,255,255,0.08);">Analyzing video footage...</span>
            </div>
        `;

        // Simulate API delay
        setTimeout(() => {
            const queryLower = query.toLowerCase();
            const filtered = mockResults.filter(r => {
                const videoLower = r.video.toLowerCase();
                return videoLower.includes(queryLower) ||
                       queryLower.includes('person') ||
                       queryLower.includes('people') ||
                       queryLower.includes('car') ||
                       queryLower.includes('vehicle') ||
                       queryLower.includes('dog') ||
                       queryLower.includes('animal') ||
                       queryLower.includes('red') ||
                       queryLower.includes('shirt') ||
                       queryLower.includes('backpack') ||
                       queryLower.includes('bag') ||
                       queryLower.includes('park') ||
                       queryLower.includes('parking') ||
                       queryLower.includes('gate') ||
                       queryLower.includes('entrance') ||
                       queryLower.includes('hallway') ||
                       queryLower.includes('alley');
            });

            if (filtered.length === 0) {
                resultsGrid.innerHTML = `
                    <div class="result-placeholder">
                        <i class="fas fa-search" style="color: rgba(255,255,255,0.05);"></i>
                        <p style="color: rgba(255,255,255,0.3);">No results found for "${query}"</p>
                        <span style="font-size: 0.9rem; color: rgba(255,255,255,0.12);">Try a different search term</span>
                    </div>
                `;
                resultsCount.textContent = '0 matches found';
                return;
            }

            resultsCount.textContent = `${filtered.length} matches found`;

            resultsGrid.innerHTML = filtered.map(result => `
                <div class="result-card" onclick="openVideo('${result.video}', '${result.timestamp}', ${result.confidence})">
                    <div class="result-thumb">
                        <i class="fas fa-video"></i>
                        <div class="result-play">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <div class="result-info">
                        <div>
                            <span class="result-timestamp">
                                <i class="fas fa-clock"></i> ${result.timestamp}
                            </span>
                            <span class="result-confidence">${result.confidence}% match</span>
                        </div>
                        <p style="margin-top: 0.5rem; font-size: 0.85rem; color: rgba(255,255,255,0.3);">
                            ${result.video}
                        </p>
                    </div>
                </div>
            `).join('');

            document.getElementById('resultsSection').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }, 1500);
    }

    function performSearch() {
        const query = searchInput.value.trim();
        displayResults(query);
    }

    // Event Listeners
    searchBtn.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });

    // Example chips
    exampleChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const query = this.getAttribute('data-query');
            searchInput.value = query;
            performSearch();
        });
    });

    // ============================================
    // 2. VIDEO UPLOAD FUNCTIONALITY
    // ============================================
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const uploadProgress = document.getElementById('uploadProgress');
    const progressFill = document.querySelector('.progress-fill');
    const progressPercent = document.getElementById('progressPercent');
    const videoList = document.getElementById('videoList');
    const videoCount = document.getElementById('videoCount');

    let uploadedVideos = [];

    uploadArea.addEventListener('click', function(e) {
        if (e.target.closest('.btn-secondary')) return;
        fileInput.click();
    });

    document.querySelector('.btn-secondary')?.addEventListener('click', function(e) {
        e.stopPropagation();
        fileInput.click();
    });

    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
            handleFiles(e.dataTransfer.files);
        }
    });

    fileInput.addEventListener('change', function(e) {
        if (this.files.length) {
            handleFiles(this.files);
            this.value = '';
        }
    });

    function handleFiles(files) {
        let validFiles = 0;
        Array.from(files).forEach(file => {
            const validTypes = ['video/mp4', 'video/avi', 'video/quicktime', 'video/x-matroska'];
            const validExtensions = ['.mp4', '.avi', '.mov', '.mkv'];
            const fileExt = '.' + file.name.split('.').pop().toLowerCase();
            
            if (!validTypes.includes(file.type) && !validExtensions.includes(fileExt)) {
                alert(`⚠️ Unsupported format: ${file.name}\nPlease upload MP4, AVI, MOV, or MKV files.`);
                return;
            }

            if (file.size > 2 * 1024 * 1024 * 1024) {
                alert(`⚠️ File too large: ${file.name}\nMaximum size is 2GB.`);
                return;
            }

            validFiles++;
            simulateUpload(file);
        });

        if (validFiles === 0) {
            alert('No valid files to upload. Please check the format and size.');
        }
    }

    function simulateUpload(file) {
        uploadProgress.style.display = 'block';
        let progress = 0;

        const interval = setInterval(() => {
            progress += Math.random() * 8 + 2;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                const fileSize = (file.size / (1024 * 1024)).toFixed(1);
                uploadedVideos.push({
                    name: file.name,
                    size: fileSize + ' MB',
                    date: new Date().toLocaleDateString(),
                    id: Date.now()
                });

                updateVideoList();
                updateVideoCount();

                setTimeout(() => {
                    uploadProgress.style.display = 'none';
                    progressFill.style.width = '0%';
                    progressPercent.textContent = '0';
                }, 600);
            }

            progressFill.style.width = Math.min(progress, 100) + '%';
            progressPercent.textContent = Math.min(Math.round(progress), 100);
        }, 80);
    }

    function updateVideoList() {
        if (uploadedVideos.length === 0) {
            videoList.innerHTML = `
                <p class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: rgba(255,255,255,0.12);">
                    <i class="fas fa-upload" style="display: block; font-size: 2.5rem; margin-bottom: 0.8rem; color: rgba(255,255,255,0.03);"></i>
                    No videos uploaded yet.<br>
                    <span style="font-size: 0.85rem; color: rgba(255,255,255,0.08);">Drag & drop or click to upload</span>
                </p>
            `;
            return;
        }

        videoList.innerHTML = uploadedVideos.map(video => `
            <div class="video-card" data-id="${video.id}">
                <div class="video-thumb">
                    <i class="fas fa-file-video"></i>
                </div>
                <div class="video-name" title="${video.name}">${video.name}</div>
                <div class="video-meta">${video.size} • ${video.date}</div>
            </div>
        `).join('');
    }

    function updateVideoCount() {
        videoCount.textContent = uploadedVideos.length;
    }

    // ============================================
    // 3. VIDEO PLAYER MODAL
    // ============================================
    const modal = document.getElementById('videoModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.querySelector('.modal-overlay');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoTitle = document.getElementById('videoTitle');
    const videoTimestamp = document.getElementById('videoTimestamp');
    const videoConfidence = document.getElementById('videoConfidence');

    window.openVideo = function(title, timestamp, confidence) {
        videoTitle.textContent = title || 'Unknown Video';
        videoTimestamp.textContent = timestamp || '00:00:00';
        videoConfidence.textContent = confidence ? `${confidence}% Match` : 'Match';

        videoPlayer.src = 'https://www.w3schools.com/html/mov_bbb.mp4';
        videoPlayer.load();
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (timestamp) {
            const parts = timestamp.split(':');
            if (parts.length === 3) {
                const seconds = parseInt(parts[0]) * 3600 + 
                               parseInt(parts[1]) * 60 + 
                               parseInt(parts[2]);
                videoPlayer.addEventListener('loadedmetadata', function seek() {
                    videoPlayer.currentTime = Math.min(seconds, videoPlayer.duration - 1);
                    videoPlayer.removeEventListener('loadedmetadata', seek);
                });
            }
        }

        videoPlayer.play().catch(() => {});
    };

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // ============================================
    // 4. SIDEBAR TOGGLE
    // ============================================
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarClose = document.getElementById('sidebarClose');

    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
        this.style.display = this.style.display === 'none' ? 'flex' : 'none';
    });

    sidebarClose.addEventListener('click', function() {
        sidebar.classList.remove('open');
        sidebarToggle.style.display = 'flex';
    });

    document.addEventListener('click', function(e) {
        if (sidebar.classList.contains('open') && 
            !sidebar.contains(e.target) && 
            e.target !== sidebarToggle &&
            !sidebarToggle.contains(e.target)) {
            sidebar.classList.remove('open');
            sidebarToggle.style.display = 'flex';
        }
    });

    document.querySelectorAll('.history-item').forEach(item => {
        item.addEventListener('click', function() {
            const queryText = this.querySelector('.history-query')?.textContent || '';
            const cleanQuery = queryText.replace(/^"|"$/g, '');
            if (cleanQuery) {
                searchInput.value = cleanQuery;
                performSearch();
                sidebar.classList.remove('open');
                sidebarToggle.style.display = 'flex';
            }
        });
    });

    document.querySelector('.sidebar-footer .btn-outline')?.addEventListener('click', function() {
        const historyItems = document.querySelectorAll('.history-item');
        if (historyItems.length === 0) return;
        
        if (confirm('Clear all search history?')) {
            historyItems.forEach(item => item.remove());
            const sidebarContent = document.querySelector('.sidebar-content');
            if (sidebarContent && !sidebarContent.querySelector('.empty-history')) {
                sidebarContent.innerHTML = `
                    <div class="empty-history" style="text-align: center; padding: 2rem; color: rgba(255,255,255,0.12);">
                        <i class="fas fa-history" style="font-size: 2rem; display: block; margin-bottom: 0.5rem;"></i>
                        <p>No search history</p>
                        <span style="font-size: 0.85rem; color: rgba(255,255,255,0.06);">Your searches will appear here</span>
                    </div>
                `;
            }
        }
    });

    // ============================================
    // 5. FILTERS & SORTING
    // ============================================
    const sortFilter = document.getElementById('sortFilter');
    const confidenceFilter = document.getElementById('confidenceFilter');

    sortFilter.addEventListener('change', function() {
        showToast(`Sorting by: ${this.options[this.selectedIndex].text}`);
    });

    confidenceFilter.addEventListener('change', function() {
        showToast(`Showing results with ${this.value}%+ confidence`);
    });

    // ============================================
    // 6. TOAST NOTIFICATIONS
    // ============================================
    function showToast(message, type = 'info') {
        const existing = document.querySelector('.toast-container');
        if (!existing) {
            const container = document.createElement('div');
            container.className = 'toast-container';
            container.style.cssText = `
                position: fixed;
                bottom: 2rem;
                left: 50%;
                transform: translateX(-50%);
                z-index: 3000;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
                pointer-events: none;
            `;
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.style.cssText = `
            background: rgba(10, 10, 15, 0.95);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.04);
            border-radius: 12px;
            padding: 0.8rem 1.5rem;
            color: rgba(255, 255, 255, 0.7);
            font-family: 'Rajdhani', sans-serif;
            font-weight: 600;
            font-size: 0.9rem;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
            animation: toastIn 0.3s ease;
            pointer-events: auto;
            max-width: 400px;
            text-align: center;
        `;
        
        if (type === 'success') {
            toast.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        } else if (type === 'error') {
            toast.style.borderColor = 'rgba(255, 68, 68, 0.2)';
            toast.style.color = 'rgba(255, 68, 68, 0.7)';
        }
        
        toast.textContent = message;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes toastIn {
                from { opacity: 0; transform: translateY(20px) scale(0.95); }
                to { opacity: 1; transform: translateY(0) scale(1); }
            }
            @keyframes toastOut {
                from { opacity: 1; transform: translateY(0) scale(1); }
                to { opacity: 0; transform: translateY(-20px) scale(0.95); }
            }
        `;
        document.head.appendChild(style);

        const container = document.querySelector('.toast-container');
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'toastOut 0.3s ease forwards';
            setTimeout(() => {
                toast.remove();
                if (container.children.length === 0) {
                    container.remove();
                }
            }, 300);
        }, 3000);
    }

    // ============================================
    // 7. MOBILE NAVIGATION TOGGLE
    // ============================================
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.classList.toggle('active');
                const icon = this.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-bars');
                    icon.classList.toggle('fa-times');
                }
            }
        });
    }

    // ============================================
    // 8. INITIAL STATE
    // ============================================
    updateVideoList();
    updateVideoCount();

    console.log('✅ EchoTrace fully loaded!');
    console.log('📊 Features: Search, Upload, Video Player, History');
    console.log('💡 Tip: Click example queries or type your own!');
});