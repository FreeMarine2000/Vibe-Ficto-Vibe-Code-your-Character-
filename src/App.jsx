import { forwardRef, useEffect, useRef, useState } from "react";

const spotlightCards = [
  {
    title: "Editor in Chief",
    text: "I run The Rodent's Gazette, where deadlines squeak louder than motorcycles and truth still deserves a front page."
  },
  {
    title: "Reluctant Adventurer",
    text: "I prefer tea and quiet libraries, yet somehow end up chasing treasure maps, mysteries, and missing manuscripts."
  },
  {
    title: "New Mouse City Local",
    text: "I know every alley cafe, every gossiping rooftop pigeon, and every surprising story tucked behind the skyline."
  }
];

const adventures = [
  {
    issue: "Issue 01",
    title: "The Emerald Atlas",
    detail: "Recovered a sea-salt-stained atlas from a floating archive and mapped hidden stories across Mouse Island."
  },
  {
    issue: "Issue 02",
    title: "Moonlight at Mouseford",
    detail: "Guest lectured on journalism, then solved a campus mystery involving stolen inventions and midnight clues."
  },
  {
    issue: "Issue 03",
    title: "The Clocktower Dispatch",
    detail: "Filed live notes from the top of New Mouse City's oldest tower while a thunderstorm rattled the copper bells."
  }
];

const traits = [
  "Story-first journalist",
  "Collector of antique maps",
  "Cheese-rind espresso enthusiast",
  "Courageous only after panicking",
  "Believer in kind headlines"
];

const stats = [
  { value: "128", label: "Published features" },
  { value: "34", label: "Cities visited" },
  { value: "9", label: "Mysteries solved accidentally" }
];

const cityCharacters = [
  {
    id: "geronimo-gazette",
    marker: "18",
    name: "Geronimo Stilton",
    address: "The Rodent's Gazette",
    role: "Editor of The Rodent's Gazette",
    brief: "The careful, kind-hearted reporter at the center of New Mouse City's most chaotic adventures.",
    detail:
      "Best visited near deadline hour, when the newsroom smells like ink, old paper, and emergency cheese snacks. Geronimo keeps the city connected through stories that are kinder and braver than he feels.",
    accentClass: "house-a",
    image: "/geronimo-head.png",
    initials: "GS"
  },
  {
    id: "thea-press-club",
    marker: "24",
    name: "Thea Stilton",
    address: "The Press Club Terrace",
    role: "Special Correspondent",
    brief: "Fearless, sharp, and always moving first when the story demands courage.",
    detail:
      "Thea's corner of the city is all motion: pinned field notes, camera straps, and route plans for the next impossible assignment. She is the first mouse you call when the clue trail leaves the pavement.",
    accentClass: "house-b",
    image: "/characters/thea-stilton.png",
    initials: "TS"
  },
  {
    id: "benjamin-book-nook",
    marker: "30",
    name: "Benjamin Stilton",
    address: "The Book Nook",
    role: "Curious Nephew",
    brief: "A quick-thinking young mouse who turns every mystery into a game worth solving.",
    detail:
      "Benjamin turns curiosity into momentum. His stop on the map is filled with puzzle books, treasure sketches, and the kind of bright questions that push every adventure forward.",
    accentClass: "house-c",
    image: "/characters/benjamin-stilton.png",
    initials: "BS"
  },
  {
    id: "trap-garage",
    marker: "33",
    name: "Trap Stilton",
    address: "Trap's Gadget Garage",
    role: "Certified Chaos Engine",
    brief: "Loud, messy, and somehow essential whenever the city slips into trouble.",
    detail:
      "If something is exploding, wobbling, or loudly improvising, Trap is probably nearby. His block in New Mouse City is a monument to bad planning and unexpectedly useful instincts.",
    accentClass: "house-d",
    image: "/characters/trap-stilton.png",
    initials: "TS"
  },
  {
    id: "nonna-square",
    marker: "34",
    name: "Nonna Torquata",
    address: "Sunrise Kitchen Square",
    role: "Family Anchor",
    brief: "Warm, wise, and impossible to leave without a full plate and better perspective.",
    detail:
      "Nonna's home is where adventure pauses long enough to become memory. Her part of the city is stitched together by recipes, stories, and the kind of care that steadies everyone else.",
    accentClass: "house-e",
    image: "/characters/nonna-torquata.png",
    initials: "NT"
  },
  {
    id: "scribble-docks",
    marker: "41",
    name: "Scribblehopper",
    address: "Lantern Dock Studio",
    role: "Illustrator & Dreamer",
    brief: "A wildly imaginative artist who can turn one rumor, one rooftop, and one napkin sketch into a legend.",
    detail:
      "Down by the water, Scribblehopper collects colors, postcards, and overheard conversations. This district is perfect for side characters, guest stories, and future worldbuilding.",
    accentClass: "house-f",
    image: "/characters/scribblehopper.png",
    initials: "SC"
  }
];

const Reveal = forwardRef(function Reveal(
  { as: Tag = "div", className = "", children, delay = 0, ...props },
  forwardedRef
) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={(node) => {
        ref.current = node;

        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      }}
      className={`reveal${isVisible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </Tag>
  );
});

function TypewriterText({
  as: Tag = "span",
  text,
  className = "",
  speed = 28,
  startDelay = 0
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);

    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    if (!isVisible) {
      return undefined;
    }

    if (prefersReducedMotion) {
      setDisplayText(text);
      return undefined;
    }

    setDisplayText("");
    let frame = 0;
    let intervalId;
    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        frame += 1;
        setDisplayText(text.slice(0, frame));

        if (frame >= text.length) {
          window.clearInterval(intervalId);
        }
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [isVisible, prefersReducedMotion, startDelay, speed, text]);

  return (
    <Tag
      ref={ref}
      className={`typewriter${displayText.length >= text.length ? " is-complete" : ""}${
        className ? ` ${className}` : ""
      }`}
      aria-label={text}
    >
      {displayText}
    </Tag>
  );
}

function CharacterPin({ character, isActive, onSelect }) {
  const [imageMissing, setImageMissing] = useState(false);

  return (
    <button
      className={`house ${character.accentClass}${isActive ? " is-active" : ""}`}
      type="button"
      onClick={onSelect}
      aria-pressed={isActive}
      aria-label={`Select ${character.name} at ${character.address}`}
    >
      <span className="pin-avatar">
        {!imageMissing ? (
          <img
            src={character.image}
            alt=""
            onError={() => setImageMissing(true)}
          />
        ) : (
          <span className="pin-fallback">{character.initials}</span>
        )}
      </span>
      <span className="pin-label">
        <strong>{character.name}</strong>
        <span>{character.marker}</span>
      </span>
    </button>
  );
}

export default function App() {
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);

  useEffect(() => {
    const elements = document.querySelectorAll("[data-tilt]");

    const cleanups = Array.from(elements).map((element) => {
      const applyTilt = (rotateX, rotateY, z, shiftY) => {
        const isHouse = element.classList.contains("house");
        const isActiveHouse = isHouse && element.classList.contains("is-active");
        const scale = isActiveHouse ? 1.06 : 1;
        const perspective = isHouse ? 1000 : 1200;

        element.style.transform =
          `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ` +
          `translate3d(0, ${shiftY}px, ${z}px) scale(${scale})`;
      };

      const handlePointerEnter = () => {
        applyTilt(0, 0, 10, -2);
      };

      const handlePointerMove = (event) => {
        const rect = element.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        const rotateY = px * 32;
        const rotateX = py * -18;
        const shiftY = -4 - Math.abs(py) * 2;
        const z = 18 + Math.abs(px) * 8;

        applyTilt(rotateX, rotateY, z, shiftY);
      };

      const handlePointerLeave = () => {
        const isHouse = element.classList.contains("house");
        const isActiveHouse = isHouse && element.classList.contains("is-active");

        element.style.transform = isActiveHouse
          ? "perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, -6px, 10px) scale(1.06)"
          : "";
      };

      element.addEventListener("pointerenter", handlePointerEnter);
      element.addEventListener("pointermove", handlePointerMove);
      element.addEventListener("pointerleave", handlePointerLeave);

      return () => {
        element.removeEventListener("pointerenter", handlePointerEnter);
        element.removeEventListener("pointermove", handlePointerMove);
        element.removeEventListener("pointerleave", handlePointerLeave);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div className="page-shell">
      <div className="page-noise" />
      <header className="hero">
        <nav className="topbar">
          <div className="brand-lockup">
            <div className="brand-mark" aria-hidden="true">
              GS
            </div>
            <div className="brand">
              <span className="brand-kicker">The Rodent's Gazette</span>
              <TypewriterText as="span" className="brand-name" text="Geronimo Stilton" speed={42} />
            </div>
          </div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#adventures">Adventures</a>
            <a href="#city">City Guide</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <section className="hero-grid">
          <Reveal className="hero-copy">
            <p className="eyebrow">Editor • Explorer • Professional Nervous Wreck</p>
            <h1 className="hero-title">
              <TypewriterText
                as="span"
                text="Venture into"
                speed={22}
                className="hero-title-line"
              />
              <TypewriterText
                as="span"
                text="the world of"
                speed={22}
                startDelay={360}
                className="hero-title-line"
              />
              <TypewriterText
                as="span"
                text="Geronimo Stilton."
                speed={24}
                startDelay={760}
                className="hero-title-line hero-title-signature"
              />
            </h1>
            <p className="lede">
              A character homepage imagined as the digital headquarters of New Mouse City's
              most lovable journalist: part newsroom, part travel journal, part secret-adventure scrapbook.
            </p>
            <div className="cta-row">
              <a className="button button-primary" href="#adventures" data-tilt="true">
                Read the latest adventures
              </a>
              <a className="button button-secondary" href="#about" data-tilt="true">
                Meet the editor
              </a>
            </div>
          </Reveal>

          <Reveal as="aside" className="hero-card" delay={120}>
            <p className="card-label">Front Page Feature</p>
            <TypewriterText
              as="h2"
              text="Reporting truth, chasing clues, and surviving chaos with a satchel full of notes."
              speed={18}
            />
            <p>
              Based in New Mouse City, I publish stories that celebrate courage, curiosity, and the occasional dramatic squeak.
            </p>
            <div className="stamp">Special Edition</div>
          </Reveal>
        </section>
      </header>

      <main>
        <section className="spotlight" id="about">
          {spotlightCards.map((card, index) => (
            <Reveal as="article" className="spotlight-card" key={card.title} delay={index * 80}>
              <TypewriterText as="h3" text={card.title} speed={26} />
              <p>{card.text}</p>
            </Reveal>
          ))}
        </section>

        <section className="about-layout">
          <Reveal as="article" className="about-panel parchment">
            <p className="section-tag">About Geronimo</p>
            <TypewriterText as="h2" text="The mouse behind the byline" speed={22} />
            <p>
              Geronimo Stilton is the editor of The Rodent's Gazette, a bestselling author,
              and a famously anxious mouse who keeps discovering that bravery often looks like
              showing up while scared. His portfolio blends investigative journalism, travel writing,
              literary curation, and very dramatic field notes.
            </p>
            <p>
              Off deadline, he spends time restoring old books, sketching city skylines from cafe windows,
              and planning calm weekends that never stay calm for long.
            </p>
          </Reveal>

          <Reveal as="aside" className="traits-panel" delay={100}>
            <p className="section-tag">Favorites & Habits</p>
            <ul className="traits-list">
              {traits.map((trait) => (
                <li key={trait}>{trait}</li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className="stats-strip">
          {stats.map((stat, index) => (
            <Reveal className="stat" key={stat.label} delay={index * 80}>
              <p className="stat-label">Archive Count</p>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </Reveal>
          ))}
        </section>

        <Reveal as="section" className="city-section" id="city">
          <div className="section-heading reveal is-visible">
            <p className="section-tag">New Mouse City</p>
            <TypewriterText as="h2" text="A city map built for your next feature" speed={22} />
            <p className="city-intro">
              This section is the interactive map house are a clickable
              hotspot that reveals a character card, short bio, and their role in Geronimo's world.
            </p>
          </div>

          <div className="city-layout">
            <Reveal as="article" className="city-map-card">
              <div className="city-map-placeholder">
                <div className="map-header">
                  <span className="map-pill">Interactive city feature</span>
                  <span className="map-note">Tap the map markers to reveal the resident</span>
                </div>
                <div className="map-frame">
                  <img
                    className="city-map-image"
                    src="/city-map.png"
                    alt="Illustrated map of New Mouse City"
                  />
                  <div className="map-grid">
                    {cityCharacters.map((character) => {
                      const isActive = character.id === selectedCharacterId;

                      return (
                        <CharacterPin
                          key={character.id}
                          character={character}
                          isActive={isActive}
                          onSelect={() =>
                            setSelectedCharacterId((currentId) =>
                              currentId === character.id ? null : character.id
                            )
                          }
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal as="aside" className="city-character-panel" delay={120}>
              <p className="section-tag">Character Guide</p>
              <div className="character-list" role="group" aria-label="City residents">
                {cityCharacters.map((character) => {
                  const isActive = character.id === selectedCharacterId;

                  return (
                    <article
                      key={character.id}
                      className={`character-card${isActive ? " is-active" : ""}`}
                    >
                      <button
                        type="button"
                        className="character-card-toggle"
                        onClick={() =>
                          setSelectedCharacterId((currentId) =>
                            currentId === character.id ? null : character.id
                          )
                        }
                        aria-expanded={isActive}
                        data-tilt="true"
                      >
                        <span className="character-card-topline">
                          Marker {character.marker} • {character.address}
                        </span>
                        <strong>{character.name}</strong>
                        <span className="character-card-role">{character.role}</span>
                      </button>

                      {isActive ? (
                        <div className="character-card-body">
                          <p>{character.brief}</p>
                          <p>{character.detail}</p>
                        </div>
                      ) : null}
                    </article>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </Reveal>

        <Reveal as="section" className="adventure-section" id="adventures">
          <div className="section-heading">
            <p className="section-tag">Selected Adventures</p>
            <TypewriterText as="h2" text="Dispatches from a life that refuses to stay ordinary" speed={22} />
          </div>

          <div className="adventure-grid">
            {adventures.map((adventure, index) => (
              <Reveal as="article" className="adventure-card" key={adventure.title} delay={index * 80}>
                <span className="issue-chip">{adventure.issue}</span>
                <TypewriterText as="h3" text={adventure.title} speed={26} />
                <p>{adventure.detail}</p>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal as="section" className="quote-banner">
          <p>
            "A good story is like a map. It doesn't just tell you where you've been. It shows you who you became."
          </p>
        </Reveal>
      </main>

      <Reveal as="footer" className="footer" id="contact">
        <div>
          <TypewriterText as="h2" text="Built for Vibe-Ficto" speed={24} />
        </div>
      </Reveal>
    </div>
  );
}
