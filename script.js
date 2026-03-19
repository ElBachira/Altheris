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
            title: "House of Balloons / Glass Table Girls",
            artist: "The Weeknd",
            src: "song.mp3", 
            lyrics: `He estado en otro nivel desde que llegaste, se acabó el dolor

Me miras a los ojos, pero no reconoces mi cara

Estás en mi mundo ahora, te puedes quedar, te puedes quedar

Pero me perteneces, me perteneces.

Si te duele respirar, abre la ventana

Tu mente se quiere ir, pero no puedes salir

Esta es una casa feliz, somos felices aquí

En una casa feliz, oh, esto es divertido.

La música te hizo perder el control

Las noches pasan mucho más rápido que los días

Con la misma ropa, no estás lista para el turno de mañana

Este lugar te va a consumir

Pero nena, está bien, mis hermanos están al lado

Están trabajando en el *trap*, así que pórtate mal si quieres

Así que no me culpes porque no llamaste a tu casa

No me culpes a mí, chica, porque tú querías divertirte.

Si te duele respirar, abre la ventana

Tu mente se quiere ir, pero no puedes salir

Esta es una casa feliz, somos felices aquí

En una casa feliz, oh, esto es divertido.

Saquen la 707...

Dos caladas para la dama que se apunta a eso

Lo que sea, juntos

Trae tu propia reserva de la mejor, intercámbiala

Enróllalo, quémalo, tósalo, pruébalo

Y luego mira cómo lo perseguimos

Con un puñado de pastillas, sin nada para bajarlas

La mandíbula trabada sobre billetes gigantes

Ella es mala y su cabeza está mal

Escapando, su van es un País de las Maravillas.

Y son las seis y media

Cielos rojos porque el tiempo no existe

Pero cuando las estrellas brillan de vuelta en la casa

Líneas de superestrella nos esperan en la casa

Y podemos probar las mesas

Tengo unas mesas nuevas

Todo es cristal y miden un metro de ancho

Pero es obligatorio hacernos volar tres metros de alto.

Ella me da sexo rápido

La dejo más mojada que una toallita

Y sin puertas cerradas

Así escucho el eco de sus gemidos.

Escuché que él ahora se droga

Escuchaste mal, llevo tiempo en esto

Solo que nunca hacemos el tonto

Así es como vivimos esta mierda.

Y cuando hacemos el tonto

Probablemente es porque lo mezclamos.

Sí, siempre estoy en ese rollo

Esos blancos saben de qué hablo, no soy ningún falso

El "Big O" sabe qué onda, él fue quien me enseñó

Mira cómo domino este ritmo, justo como me dijo:

—"¿Esa es tu chica? ¿Cuál es su maldita historia?"

—"Está buena, pero lo monta como un maldito poni".

Le quito el puesto a su hombre, seré su puta historia

Sí, estoy hablando de ti, hombre, conóceme

Sin ofensas, te lo prometo

Si eres un hombre de verdad, decidirás la verdad

Pero soy un tipo agradable con sueños agradables

Y podemos convertir esto en una pesadilla: Elm Street.

La la la la la la la la...

Estoy tan ido, tan ido

Saquen las mesas de cristal

Saquen la 707`,
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


