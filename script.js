document.addEventListener('DOMContentLoaded', () => {
    // Add search overlay HTML to the body
    const searchOverlay = document.createElement('div');
    searchOverlay.className = 'search-overlay';
    searchOverlay.innerHTML = `
        <div class="search-container">
            <div class="search-input-container">
                <input type="text" class="search-input" placeholder="Search channels...">
                <button class="close-search">
                    <svg viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                    </svg>
                </button>
            </div>
            <div class="search-results">
                <div class="channel-grid">
                    <!-- Search results will be displayed here -->
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(searchOverlay);

    // Update search button click handler
    const searchBtn = document.querySelector('.search-channel-btn');
    const searchInput = document.querySelector('.search-input');
    const closeSearchBtn = document.querySelector('.close-search');

    function toggleSearch(show) {
        const overlay = document.querySelector('.search-overlay');
        if (show) {
            overlay.classList.add('active');
            searchInput.focus();
        } else {
            overlay.classList.remove('active');
            searchInput.value = '';
            displaySearchResults('');
        }
    }

    searchBtn.addEventListener('click', () => toggleSearch(true));
    closeSearchBtn.addEventListener('click', () => toggleSearch(false));

    function displaySearchResults(query) {
        const resultsGrid = document.querySelector('.search-overlay .channel-grid');
        const filteredChannels = allContent.filter(channel => 
            channel.name.toLowerCase().includes(query.toLowerCase()) ||
            channel.country.toLowerCase().includes(query.toLowerCase()) ||
            channel.genre.toLowerCase().includes(query.toLowerCase())
        );

        resultsGrid.innerHTML = '';

        if (query.trim() === '') {
            resultsGrid.innerHTML = '<div class="no-results">Empieza a escribir para buscar canales...</div>';
            return;
        }

        if (filteredChannels.length === 0) {
            resultsGrid.innerHTML = '<div class="no-results">No se encontraron canales</div>';
            return;
        }

        filteredChannels.forEach(channel => {
            const channelCard = document.createElement('div');
            channelCard.className = 'channel-card';
            channelCard.innerHTML = `
                <div class="channel-preview" style="background-image: url('${channel.logo}')">
                    ${channel.isLive ? '<div class="live-badge">EN VIVO</div>' : ''}
                    <div class="channel-info">
                        <h3>${channel.name}</h3>
                        <p>Transmitiendo desde: ${channel.country}</p>
                        <p>${channel.viewers} viendo</p>
                        <p class="channel-country">${channel.country} | ${channel.language}</p>
                    </div>
                </div>
            `;
            
            channelCard.addEventListener('click', () => {
                playContent(channel);
                toggleSearch(false);
            });
            resultsGrid.appendChild(channelCard);
        });
    }

    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            displaySearchResults(e.target.value);
        }, 300);
    });

    // Close search on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            toggleSearch(false);
        }
    });

    // Update the specificChannels definition to include a type property
    const specificChannels = [
       {
            id: 1,
            name: "Sony Novelas",
            logo: "https://www.cxtv.com.br/img/Tvs/Logo/webp-m/a3bd552eca6645942a60a053fe61fafb.webp",
            country: "Series",
            genre: "Entertainment",
            currentShow: "Series Show 1",
            viewers: "150K",
            language: "Español",
            streamUrl: "https://a89829b8dca2471ab52ea9a57bc28a35.mediatailor.us-east-1.amazonaws.com/v1/master/0fb304b2320b25f067414d481a779b77db81760d/CanelaTV_SonyCanalNovelas/playlist.m3u8",
            isLive: true,
            type: "channel"
        },
        {
            id: 2,
            name: "Telemundo Miami",
            logo: "https://www.cxtv.com.br/img/Tvs/Logo/webp-m/70ef4b19ce0f5b973ff48dffd540d3d8.webp",
            country: "Noticias",
            genre: "News",
            currentShow: "News Show 1",
            viewers: "200K",
            language: "Español",
            streamUrl: "https://d2kowtvrzzi7ps.cloudfront.net/manifest/3fec3e5cac39a52b2132f9c66c83dae043dc17d4/prod_default_nbc/5a817dba-a6f1-4dac-9871-91e9e76e1762/2.m3u8",
            isLive: true,
            type: "channel"
        },
        {
            id: 3,
            name: "Canela Deportes",
            logo: "https://www.cxtv.com.br/img/Tvs/Logo/webp-m/3a49e44efce01bea59de8af9e253695f.webp",
            country: "Deportes",
            genre: "Sports",
            currentShow: "Sports Show 1",
            viewers: "180K",
            language: "Español",
            streamUrl: "https://playertest.longtailvideo.com/adaptive/wowzaid3/playlist.m3u8",
            isLive: true,
            type: "channel"
        },
        {
            id: 4,
            name: "3ABN KIDS",
            logo: "https://www.cxtv.com.br/img/Tvs/Logo/webp-m/42de800d69d78117b03852bac7ae3818.webp",
            country: "Infantil",
            genre: "Kids",
            currentShow: "Kids Show 1",
            viewers: "120K",
            language: "English",
            streamUrl: "https://3abn.bozztv.com/3abn2/Kids_live/smil:Kids_live.smil/playlist.m3u8",
            isLive: true,
            type: "channel"
        },
        {
            id: 5,
            name: "FOX Sports",
            logo: "https://www.cxtv.com.br/img/Tvs/Logo/webp-m/5c2f33d5ee4ec2d82edb58610f2b0ff7.webp",
            country: "Deportes",
            genre: "Sports",
            currentShow: "Sports Show 1",
            viewers: "250K",
            language: "Español",
            streamUrl: "https://live-news-manifest.tubi.video/live-news-manifest/csm/extlive/tubiprd01,Fox-Sports-Espanol2.m3u8",
            isLive: true,
            type: "channel"
        },
        {
            id: 6,
            name: "DW Español",
            logo: "https://www.cxtv.com.br/img/Tvs/Logo/webp-m/dw.webp",
            country: "Noticias",
            genre: "News",
            currentShow: "Noticias Internacionales",
            viewers: "180K",
            language: "Español",
            streamUrl: "https://dwamdstream104.akamaized.net/hls/live/2015530/dwstream104/index.m3u8",
            isLive: true,
            type: "channel"
        },
        {
            id: 7,
            name: "RT en Español",
            logo: "https://www.cxtv.com.br/img/Tvs/Logo/webp-m/rt-spanish.webp",
            country: "Noticias",
            genre: "News",
            currentShow: "Noticias RT",
            viewers: "160K",
            language: "Español",
            streamUrl: "https://rt-esp.rttv.com/live/rtesp/playlist.m3u8",
            isLive: true,
            type: "channel"
        },
        {
            id: 8,
            name: "France 24 Español",
            logo: "https://www.cxtv.com.br/img/Tvs/Logo/webp-m/france24.webp",
            country: "Noticias",
            genre: "News",
            currentShow: "Noticias Francia",
            viewers: "140K",
            language: "Español",
            streamUrl: "https://ythls.onrender.com/channel/UCUdOoVWuWmgo1wByzcsyKDQ.m3u8",
            isLive: true,
            type: "channel"
        },
        {
            id: 9,
            name: "CGTN Español",
            logo: "https://www.cxtv.com.br/img/Tvs/Logo/webp-m/cgtn-e.webp",
            country: "Noticias",
            genre: "News",
            currentShow: "Noticias China",
            viewers: "130K",
            language: "Español",
            streamUrl: "https://livees.cgtn.com/1000e/prog_index.m3u8",
            isLive: true,
            type: "channel"
        },
        {
            id: 10,
            name: "Cartoon Network Latino",
            logo: "https://www.cxtv.com.br/img/Tvs/Logo/webp-m/cartoon-network.webp",
            country: "Infantil",
            genre: "Kids",
            currentShow: "Caricaturas",
            viewers: "220K",
            language: "Español",
            streamUrl: "https://playout.cdn.cartoonnetwork.com.br/playout_02/playlist.m3u8",
            isLive: true,
            type: "channel"
        }
    ];

    // Add some sample movies
    const movies = [
        {
            id: 101,
            name: "Película de Muestra 1",
            logo: "https://i.ibb.co/1RW9vqg/poster.jpg",
            genre: "Action",
            viewers: "50K",
            language: "Español",
            streamUrl: "#",
            isLive: false,
            type: "movie"
        }
    ];

    // Combine all content for the home section
    const allContent = [...specificChannels, ...movies];

    // Initialize favorites array
    let favorites = [];

    // Function to toggle favorite
    function toggleFavorite(item) {
        const index = favorites.findIndex(f => f.id === item.id && f.type === item.type);
        if (index === -1) {
            favorites.push(item);
        } else {
            favorites.splice(index, 1);
        }
        // Save to localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));
        // Update UI
        displayFavorites();
    }

    // Function to display content in grid
    function displayContent(content, container) {
        container.innerHTML = '';
        
        if (content.length === 0) {
            container.innerHTML = '<div class="no-content">No hay contenido disponible</div>';
            return;
        }

        content.forEach(item => {
            const card = document.createElement('div');
            card.className = 'channel-card';
            const isFavorite = favorites.some(f => f.id === item.id && f.type === item.type);
            
            card.innerHTML = `
                <div class="channel-preview" style="background-image: url('${item.logo}')">
                    ${item.isLive ? '<div class="live-badge">EN VIVO</div>' : ''}
                    <div class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(${JSON.stringify(item)})">
                        <svg viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                        </svg>
                    </div>
                    <div class="channel-info">
                        <h3>${item.name}</h3>
                        <p>${item.type === 'channel' ? 'Transmitiendo desde: ' + item.country : item.genre}</p>
                        <p>${item.viewers} viendo</p>
                        <p class="channel-country">${item.language}</p>
                    </div>
                </div>
            `;
            
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.favorite-btn')) {
                    playContent(item);
                }
            });
            
            container.appendChild(card);
        });
    }

    // Function to display favorites
    function displayFavorites() {
        const favoritesContainer = document.querySelector('#favorites-section .favorites-grid');
        displayContent(favorites, favoritesContainer);
    }

    // Update section switching
    function switchSection(sectionId) {
        const sections = document.querySelectorAll('.section-content');
        const navItems = document.querySelectorAll('.nav-item');
        
        sections.forEach(section => section.classList.remove('active'));
        navItems.forEach(item => item.classList.remove('active'));
        
        const activeSection = document.getElementById(sectionId);
        const activeNav = document.querySelector(`[data-section="${sectionId}"]`);
        
        if (activeSection) {
            activeSection.classList.add('active');
            
            switch(sectionId) {
                case 'home-section':
                    const channelsInHome = allContent.filter(item => item.type === 'channel');
                    displayContent(channelsInHome, document.querySelector('#home-section .channel-grid'));
                    
                    const moviesInHome = allContent.filter(item => item.type === 'movie');
                    displayContent(moviesInHome, document.querySelector('#home-section .movies-grid'));
                    break;
                case 'live-section':
                    displayContent(specificChannels, document.querySelector('#live-section .channel-grid'));
                    break;
                case 'movies-section':
                    displayContent(movies, document.querySelector('#movies-section .movies-grid'));
                    break;
                case 'favorites-section':
                    displayFavorites();
                    break;
            }
        }
        if (activeNav) activeNav.classList.add('active');
    }

    // Initialize content on load
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
        favorites = JSON.parse(savedFavorites);
    }
    
    switchSection('home-section');

    const player = videojs('stellar-player', {
        fluid: true,
        responsive: true,
        controls: true,
        preload: 'auto',
        poster: 'https://i.ibb.co/1RW9vqg/poster.jpg',
        playbackRates: [0.5, 1, 1.5, 2],
        controlBar: {
            children: [
                'playToggle',
                'volumePanel',
                'currentTimeDisplay',
                'timeDivider',
                'durationDisplay',
                'progressControl',
                'remainingTimeDisplay',
                'playbackRateMenuButton',
                'fullscreenToggle'
            ],
            volumePanel: {
                inline: false,
                volumeControl: {
                    vertical: true
                }
            }
        }
    });

    player.addClass('vjs-custom-theme');

    player.on('dblclick', function() {
        if (!this.isFullscreen()) {
            this.requestFullscreen();
        } else {
            this.exitFullscreen();
        }
    });

    player.on('keydown', function(e) {
        switch(e.keyCode) {
            case 32: 
                if (this.paused()) {
                    this.play();
                } else {
                    this.pause();
                }
                e.preventDefault();
                break;
            case 37: 
                this.currentTime(Math.max(0, this.currentTime() - 10));
                e.preventDefault();
                break;
            case 39: 
                this.volume(Math.min(this.duration(), this.currentTime() + 10));
                e.preventDefault();
                break;
            case 38: 
                this.volume(Math.min(1, this.volume() + 0.1));
                e.preventDefault();
                break;
            case 40: 
                this.volume(Math.max(0, this.volume() - 0.1));
                e.preventDefault();
                break;
        }
    });

    function playContent(item) {
        if (item.type === "channel") {
            player.poster(''); 
            player.src({
                src: item.streamUrl,
                type: 'application/x-mpegURL'
            });
            player.play();
            updateCurrentChannel(item);
        } else {
            alert("Pelicula seleccionada no disponible para reproducción");
        }

        player.on('ended', () => {
            player.poster('https://i.ibb.co/1RW9vqg/poster.jpg');
        });
        
        player.on('error', () => {
            player.poster('https://i.ibb.co/1RW9vqg/poster.jpg');
        });
    }

    function updateCurrentChannel(channel) {
        document.getElementById('current-channel-name').textContent = channel.name;
        document.getElementById('current-show').textContent = `Transmitiendo desde: ${channel.country}`;
    }

    function initializeTouchHandling() {
        const player = videojs('stellar-player');
        
        let lastTapTime = 0;
        let touchTimeout;
        let touchStartX = 0;
        let touchStartY = 0;
        const doubleTapThreshold = 300;
        
        player.on('touchstart', (e) => {
            const touch = e.touches[0];
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
            
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTapTime;
            
            if (tapLength < doubleTapThreshold && tapLength > 0) {
                clearTimeout(touchTimeout);
                
                const playerRect = player.el().getBoundingClientRect();
                const tapX = touchStartX - playerRect.left;
                const tapPosition = tapX / playerRect.width;
                
                if (tapPosition < 0.4) {
                    player.currentTime(Math.max(0, player.currentTime() - 10));
                } else if (tapPosition > 0.6) {
                    player.currentTime(Math.min(player.duration(), player.currentTime() + 10));
                }
                
                e.preventDefault();
            } else {
                touchTimeout = setTimeout(() => {
                }, doubleTapThreshold);
            }
            
            lastTapTime = currentTime;
        });
        
        player.on('touchmove', (e) => {
            const touch = e.touches[0];
            const deltaY = Math.abs(touch.clientY - touchStartY);
            const deltaX = Math.abs(touch.clientX - touchStartX);
            
            if (deltaY < 30 && deltaX < 30) {
                e.preventDefault();
            }
        });
    }

    function initializeCategoryScroll() {
        const categoryList = document.querySelector('.category-list');
        let isScrolling = false;
        let startX;
        let scrollLeft;
        let momentumID;
        let velocity = 0;
        
        categoryList.addEventListener('touchstart', (e) => {
            isScrolling = true;
            startX = e.touches[0].pageX - categoryList.offsetLeft;
            scrollLeft = categoryList.scrollLeft;
            cancelAnimationFrame(momentumID);
        }, { passive: true });
        
        categoryList.addEventListener('touchmove', (e) => {
            if (!isScrolling) return;
            
            const x = e.touches[0].pageX - categoryList.offsetLeft;
            const walk = (x - startX) * 1.5;
            const newScrollLeft = scrollLeft - walk;
            
            velocity = walk;
            categoryList.scrollLeft = newScrollLeft;
        }, { passive: true });
        
        categoryList.addEventListener('touchend', () => {
            isScrolling = false;
            
            const momentumScroll = () => {
                velocity *= 0.95;
                categoryList.scrollLeft -= velocity;
                
                if (Math.abs(velocity) > 0.5) {
                    momentumID = requestAnimationFrame(momentumScroll);
                }
            };
            
            momentumID = requestAnimationFrame(momentumScroll);
        }, { passive: true });
    }

    initializeTouchHandling();
    initializeCategoryScroll();

    function setVH() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVH();
    window.addEventListener('resize', setVH);

    document.querySelector('.notifications').addEventListener('click', () => {
        alert('¡Notificaciones próximamente!');
    });

    document.querySelector('.profile').addEventListener('click', () => {
        alert('¡Configuración de perfil próximamente!');
    });

    const mobileNavItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section-content');

    mobileNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = item.getAttribute('data-section');
            switchSection(sectionId);
        });
    });

    switchSection('home-section');
});
