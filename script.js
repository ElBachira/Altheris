document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. SISTEMA DE SONIDOS UI OPTIMIZADO ---
    const sfxHover = document.getElementById('sfx-hover');
    const sfxClick = document.getElementById('sfx-click');
    const sfxOpen = document.getElementById('sfx-open');

    const playSound = (audioEl) => {
        if(audioEl) {
            audioEl.currentTime = 0;
            audioEl.volume = 0.3; 
            audioEl.play().catch(() => {}); 
        }
    };

    // Delegación corregida para no interferir con los enlaces <a>
    document.body.addEventListener('click', (e) => {
        const trigger = e.target.closest('.ui-trigger');
        if (trigger) {
            playSound(sfxClick);
        }
    });

    document.querySelectorAll('.ui-trigger-hover').forEach(el => {
        el.addEventListener('mouseenter', () => playSound(sfxHover), { passive: true });
    });

    // --- 1. PANTALLA DE CARGA ---
    const loader = document.getElementById('loader');
    
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                playSound(sfxOpen);
            }, 800);
        }, 1500);
    }

    // --- 2. SISTEMA DE REPRODUCTOR DE MÚSICA ---
    const songs = [
        {
            title: "Let The World Burn",
            artist: "Chris Grey",
            src: "song.mp3", 
            lyrics: `Perdido en la niebla,
temo que aún me queda más por caer.
Es peligroso porque lo quiero todo,
y no creo que me importe el precio.
No debí haberme enamorado,
mira en lo que me he convertido.
Dejé que te acercaras demasiado,
solo para despertar a solas.
Y sé que crees que puedes huir,
tienes miedo de creer que soy el indicado.
Pero simplemente no puedo dejarte ir.
**Dejaría que el mundo arda**,
que el mundo arda por ti.
Así es como siempre tuvo que terminar:
**si no puedo tenerte, nadie más podrá**.
Dejaría que arda,
dejaría que el mundo arda,
solo por oírte gritar mi nombre
mientras veo todo consumirse en llamas.
Miedo en sus ojos,
cenizas lloviendo desde un cielo naranja sangre.
Le hice saber a todos que eres mía,
ahora solo es cuestión de tiempo
antes de que el polvo nos arrastre.
**Mira en lo que me hiciste convertir**.
Dejé que te acercaras demasiado,
solo para despertar a solas.
Y sé que crees que puedes huir,
tienes miedo de creer que soy el indicado.
Pero simplemente no puedo dejarte ir.
Dejaría que el mundo arda,
que el mundo arda por ti.
Así es como siempre tuvo que terminar:
si no puedo tenerte, nadie más podrá.
Dejaría que arda,
dejaría que el mundo arda,
solo por oírte gritar mi nombre
mientras veo todo consumirse en llamas.
Que todo arda,
oh, quemaría este mundo por ti.
Oh, nena, dejaría que arda
por ti.
Dejaría que el mundo arda,
que el mundo arda por ti.
Así es como siempre tuvo que terminar:
si no puedo tenerte, nadie más podrá`,
        }
    ];

    let currentIdx = 0;
    const audio = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-pause-btn');
    const playerContainer = document.querySelector('.music-player-container');
    
    const titleEl = document.getElementById('song-title');
    const artistEl = document.getElementById('song-artist');
    const lyricsEl = document.getElementById('lyrics-content');
    const meaningEl = document.getElementById('meaning-content');

    function loadSong(index) {
        if (!titleEl || !artistEl || !lyricsEl || !meaningEl) return;
        const s = songs[index];
        titleEl.innerText = s.title;
        artistEl.innerText = s.artist;
        if(audio) audio.src = s.src;
        lyricsEl.innerText = s.lyrics;
        meaningEl.innerText = s.meaning;
    }

    loadSong(currentIdx);

    if (playBtn && audio) {
        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play().then(() => {
                    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    if(playerContainer) playerContainer.classList.add('playing');
                }).catch(e => console.log("Interacción requerida o error", e));
            } else {
                audio.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
                if(playerContainer) playerContainer.classList.remove('playing');
            }
        });
    }

    // --- 3. GALERÍA DE BOTS ---
    const maleGrid = document.getElementById('bots-masculinos');
    const femaleGrid = document.getElementById('bots-femeninos');
    const myName = "Archibald"; 

    if (maleGrid && femaleGrid) {
        if (typeof BOTS_LIST !== 'undefined' && Array.isArray(BOTS_LIST)) {
            const fragMale = document.createDocumentFragment();
            const fragFemale = document.createDocumentFragment();

            BOTS_LIST.forEach(bot => {
                if (!bot.nombre.includes(myName)) {
                    const item = document.createElement('a');
                    item.href = bot.url || '#';
                    item.target = "_blank"; // Asegura que abra en nueva pestaña
                    item.className = 'bot-item ui-trigger'; 
                    item.style.animation = `fadeIn 0.5s ease forwards`; 
                    
                    item.innerHTML = `
                        <img src="${bot.imagen}" loading="lazy" alt="${bot.nombre}">
                        <span>${bot.nombre}</span>
                    `;

                    if (bot.genero === 'masculino') fragMale.appendChild(item);
                    else fragFemale.appendChild(item);
                }
            });
            maleGrid.appendChild(fragMale);
            femaleGrid.appendChild(fragFemale);
        } else {
            maleGrid.innerHTML = '<p style="color:#555; font-size:0.8rem;">Sin conexión...</p>';
        }
    }

    // --- 4. STICKER INTERACTIVO ---
    const sticker = document.getElementById('honk-sticker');
    const honkAudio = new Audio('https://www.myinstants.com/media/sounds/honk-sound.mp3'); 
    
    if (sticker) {
        sticker.addEventListener('click', () => {
            honkAudio.currentTime = 0;
            honkAudio.volume = 0.5;
            honkAudio.play().catch(() => {});
            
            sticker.style.transform = "scale(0.8) rotate(-20deg)";
            setTimeout(() => sticker.style.transform = "", 150);
        });
    }

    // --- 5. UTILIDADES UI (Tabs & Acordeones) ---
    window.openOverlay = (id) => {
        playSound(sfxOpen);
        const el = document.getElementById(id);
        if(el) requestAnimationFrame(() => el.classList.add('active'));
    };
    
    window.closeOverlay = (id) => {
        playSound(sfxClick);
        const el = document.getElementById(id);
        if(el) el.classList.remove('active');
    };

    window.toggleFold = (id) => {
        playSound(sfxClick);
        const el = document.getElementById(id);
        if (el) {
            document.querySelectorAll('.foldable').forEach(f => {
                if(f.id !== id) f.classList.remove('active');
            });
            requestAnimationFrame(() => {
                el.classList.toggle('active');
            });
        }
    };
});


