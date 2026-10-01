import { useEffect, useRef, useState } from "react";

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Cake,
  Gift,
  Heart,
  Mail,
  Music,
  Package,
  Pause,
  Play,
  Send,
  Star,
  X,
} from "lucide-react";

import { birthdayData, type Memory } from "./data";

type Toast = {
  text: string;
  icon: string;
};

const YOUTUBE_VIDEO_ID = "kggHPK2yprQ";

function App() {
  const [opened, setOpened] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [packageOpen, setPackageOpen] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [selectedMemory, setSelectedMemory] =
    useState<Memory | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const [confetti, setConfetti] = useState(false);
  const [deliveryCount, setDeliveryCount] = useState(0);

  const [dateReply, setDateReply] = useState("");

  const [noPosition, setNoPosition] = useState({
    x: 0,
    y: 0,
  });

  const youtubeRef =
    useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    document.title = `You've Got Mail! | ${birthdayData.recipient}`;
  }, []);

  /* =========================================
     TOAST
  ========================================= */

  const showToast = (
    text: string,
    icon: string,
  ) => {
    setToast({
      text,
      icon,
    });

    window.setTimeout(() => {
      setToast(null);
    }, 2600);
  };

  /* =========================================
     CONFETTI
  ========================================= */

  const triggerConfetti = () => {
    setConfetti(true);

    window.setTimeout(() => {
      setConfetti(false);
    }, 1800);
  };

  /* =========================================
     YOUTUBE MUSIC
  ========================================= */

  const sendYouTubeCommand = (
    command: string,
  ) => {
    const iframe = youtubeRef.current;

    if (!iframe?.contentWindow) return;

    iframe.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func: command,
        args: [],
      }),
      "https://www.youtube.com",
    );
  };

  const startMusic = () => {
    setMusicPlaying(true);

    sendYouTubeCommand("playVideo");

    window.setTimeout(() => {
      sendYouTubeCommand("playVideo");
    }, 150);

    window.setTimeout(() => {
      sendYouTubeCommand("playVideo");
    }, 500);

    window.setTimeout(() => {
      sendYouTubeCommand("playVideo");
    }, 1000);

    window.setTimeout(() => {
      sendYouTubeCommand("playVideo");
    }, 1600);
  };

  const pauseMusic = () => {
    sendYouTubeCommand("pauseVideo");

    setMusicPlaying(false);
  };

  const toggleMusic = () => {
    if (musicPlaying) {
      pauseMusic();
    } else {
      startMusic();
    }
  };

  /* =========================================
     OPEN MAIL
  ========================================= */

  const openExperience = () => {
    setOpened(true);
    setDeliveryCount(1);

    triggerConfetti();
    startMusic();

    showToast(
      "NEW MAIL OPENED!",
      "💌",
    );
  };

  /* =========================================
     LETTER
  ========================================= */

  const openLetter = () => {
    setLetterOpen(true);
    setDeliveryCount(2);

    triggerConfetti();

    showToast(
      "LETTER DELIVERED!",
      "📨",
    );
  };

  /* =========================================
     PACKAGE
  ========================================= */

  const openPackage = () => {
    setPackageOpen(true);
    setDeliveryCount(6);

    triggerConfetti();

    showToast(
      "PACKAGE UNLOCKED!",
      "🎁",
    );
  };

  /* =========================================
     MEMORY
  ========================================= */

  const openMemory = (
    memory: Memory,
  ) => {
    setSelectedMemory(memory);

    setDeliveryCount((count) =>
      Math.max(count, 4),
    );

    showToast(
      `${memory.category} OPENED!`,
      memory.icon,
    );
  };

  /* =========================================
     PHOTO
  ========================================= */

  const nextPhoto = () => {
    setPhotoIndex((current) =>
      current ===
      birthdayData.photos.length - 1
        ? 0
        : current + 1,
    );

    showToast(
      "NEXT POSTCARD",
      "📮",
    );
  };

  const previousPhoto = () => {
    setPhotoIndex((current) =>
      current === 0
        ? birthdayData.photos.length - 1
        : current - 1,
    );

    showToast(
      "PREVIOUS POSTCARD",
      "📮",
    );
  };

  /* =========================================
     DATE NO BUTTON
  ========================================= */

  const moveNoButton = () => {
    const x =
      Math.floor(
        Math.random() * 221,
      ) - 110;

    const y =
      Math.floor(
        Math.random() * 71,
      ) - 35;

    setNoPosition({
      x,
      y,
    });

    const replies =
      birthdayData.dateMemo.noReplies;

    const randomReply =
      replies[
        Math.floor(
          Math.random() *
            replies.length,
        )
      ];

    setDateReply(randomReply);
  };

  const sayYes = () => {
    setNoPosition({
      x: 0,
      y: 0,
    });

    setDateReply(
      birthdayData.dateMemo.yesReply,
    );

    setDeliveryCount((count) =>
      Math.max(count, 5),
    );

    triggerConfetti();

    showToast(
      "DATE ACCEPTED!",
      "💗",
    );
  };

  return (
    <div className="birthday-site">

      {/* =========================================
          EXTRA OVERRIDES
          HERO CENTER + NO BUTTON JIGGLE
      ========================================= */}

      <style>
        {`
          .hero-layout {
            width: min(1120px, 100%);
            margin: 0 auto;
            justify-items: center;
          }

          .hero-copy {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .hero-copy .tiny-label {
            margin-left: auto;
            margin-right: auto;
          }

          .hero-copy .hero-subtitle {
            margin-left: auto;
            margin-right: auto;
            text-align: center;
          }

          .hero-copy .mail-meta {
            justify-content: center;
            width: 100%;
            flex-wrap: wrap;
          }

          .hero-copy .primary-button {
            margin-left: auto;
            margin-right: auto;
          }

          .mailbox-scene {
            width: 100%;
          }

          .date-actions {
            position: relative;
            min-height: 78px;
            align-items: center;
            justify-content: center;
          }

          .date-no {
            --no-x: 0px;
            --no-y: 0px;
            transform:
              translate(
                var(--no-x),
                var(--no-y)
              );
            animation:
              birthdayNoJiggle
              0.18s
              ease-in-out
              infinite alternate;
            transition:
              transform
              0.22s
              cubic-bezier(
                0.2,
                1.4,
                0.4,
                1
              );
          }

          .date-no:hover {
            animation-duration: 0.1s;
          }

          @keyframes birthdayNoJiggle {
            0% {
              rotate: -2deg;
            }

            100% {
              rotate: 2deg;
            }
          }

          @media (max-width: 700px) {
            .hero-layout {
              grid-template-columns: 1fr !important;
              gap: 20px !important;
            }

            .hero-copy {
              padding-left: 8px;
              padding-right: 8px;
            }

            .hero-copy h1 {
              text-align: center;
            }

            .hero-copy .hero-subtitle {
              text-align: center;
            }

            .hero-copy .mail-meta {
              align-items: center;
            }

            .hero-copy .primary-button {
              justify-content: center;
            }

            .mailbox-scene {
              margin-left: auto;
              margin-right: auto;
            }

            .date-actions {
              width: 100%;
              min-height: 95px;
            }

            .date-no {
              --no-x: 0px;
              --no-y: 0px;
            }
          }
        `}
      </style>

      {/* =========================================
          HIDDEN YOUTUBE
      ========================================= */}

      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          width: "1px",
          height: "1px",
          left: "-10000px",
          top: "-10000px",
          opacity: 0,
          pointerEvents: "none",
          overflow: "hidden",
          zIndex: -9999,
        }}
      >
        <iframe
          ref={youtubeRef}
          title="Birthday music"
          width="1"
          height="1"
          src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?enablejsapi=1&autoplay=${
            opened ? 1 : 0
          }&controls=0&disablekb=1&fs=0&playsinline=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&rel=0&modestbranding=1`}
          allow="autoplay; encrypted-media"
          onLoad={() => {
            if (musicPlaying) {
              window.setTimeout(() => {
                sendYouTubeCommand(
                  "playVideo",
                );
              }, 250);

              window.setTimeout(() => {
                sendYouTubeCommand(
                  "playVideo",
                );
              }, 700);

              window.setTimeout(() => {
                sendYouTubeCommand(
                  "playVideo",
                );
              }, 1200);
            }
          }}
          style={{
            width: "1px",
            height: "1px",
            border: "0",
            display: "block",
          }}
        />
      </div>

      {/* =========================================
          SITE BORDER
      ========================================= */}

      <div className="site-border" />

      {/* =========================================
          CONFETTI
      ========================================= */}

      {confetti && (
        <div className="confetti-layer">
          {Array.from({
            length: 26,
          }).map((_, index) => (
            <span key={index}>
              ✦
            </span>
          ))}
        </div>
      )}

      {/* =========================================
          TOAST
      ========================================= */}

      {toast && (
        <div className="mail-toast">

          <span className="toast-icon">
            {toast.icon}
          </span>

          <div>
            <small>
              INCOMING
            </small>

            <strong>
              {toast.text}
            </strong>
          </div>

          <div className="toast-dot" />

        </div>
      )}

      {/* =========================================
          TOP BAR
      ========================================= */}

      <header className="top-bar">

        <div className="postmark">
          <Mail size={13} />
          BIRTHDAY EXPRESS
        </div>

        <div className="top-recipient">
          TO:{" "}
          <strong>
            {birthdayData.recipient}
          </strong>
        </div>

        <div className="top-stamp">
          <Star size={15} />
          SPECIAL
        </div>

      </header>

      {/* =========================================
          DELIVERY TRACKER
      ========================================= */}

      {opened && (
        <div className="delivery-tracker">

          <span>
            DELIVERY
          </span>

          {[1, 2, 3, 4, 5, 6].map(
            (step) => (
              <i
                key={step}
                className={
                  deliveryCount >= step
                    ? "done"
                    : ""
                }
              />
            ),
          )}

          <span>
            {deliveryCount}/6
          </span>

        </div>
      )}

      <main>

        {/* =======================================
            HERO
        ======================================= */}

        <section
          className="hero section-paper"
        >

          <div className="decor decor-star one">
            ✦
          </div>

          <div className="decor decor-star two">
            ✦
          </div>

          <div className="decor decor-heart">
            ♥
          </div>

          <div className="decor decor-flower">
            ✿
          </div>

          <div className="hero-layout">

            <div className="hero-copy">

              <div className="tiny-label">
                <Send size={13} />
                {
                  birthdayData
                    .intro
                    .eyebrow
                }
              </div>

              <h1>
                YOU'VE
                <br />
                GOT{" "}
                <span>
                  MAIL!
                </span>
              </h1>

              <p className="hero-subtitle">
                {
                  birthdayData
                    .intro
                    .subtitle
                }
              </p>

              <div className="mail-meta">

                <div>
                  <span>
                    TO
                  </span>

                  <strong>
                    {
                      birthdayData
                        .recipient
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    FROM
                  </span>

                  <strong>
                    {
                      birthdayData
                        .sender
                    }
                  </strong>
                </div>

              </div>

              <button
                type="button"
                className="primary-button"
                onClick={openExperience}
              >
                <Mail size={19} />

                OPEN YOUR MAIL

                <span className="button-spark">
                  ✦
                </span>
              </button>

            </div>

            {/* =====================================
                MAILBOX
            ===================================== */}

            <div
              className={`mailbox-scene ${
                opened
                  ? "opened"
                  : ""
              }`}
            >

              <div className="spark spark-a">
                ✦
              </div>

              <div className="spark spark-b">
                ✦
              </div>

              {/* FLAG / ANTENNA REMOVED */}

              <div className="mailbox">

                <div className="mailbox-top">
                  <div className="mail-slot" />
                </div>

                <div className="mailbox-door">

                  <div className="mailbox-handle" />

                  <div className="mailbox-label">
                    SPECIAL
                    <br />
                    DELIVERY
                  </div>

                </div>

                <div className="mail-envelope">

                  <Mail size={35} />

                  <span>
                    FOR YOU
                  </span>

                </div>

                <div className="mail-paper-one">
                  ♡
                </div>

                <div className="mail-paper-two">
                  ✦
                </div>

              </div>

              <div className="mailbox-shadow" />

            </div>

          </div>

          <div className="scroll-note">

            <ArrowDown size={15} />

            SCROLL TO DELIVER

          </div>

        </section>

        {/* =======================================
            REST OF WEBSITE
        ======================================= */}

        {opened && (
          <>

            {/* =====================================
                LETTER
            ===================================== */}

            <section
              className="section-wrap letter-section"
              id="letter"
            >

              <div className="section-label">
                <span>
                  01
                </span>
                LETTER MAIL
              </div>

              <div className="letter-paper">

                <div className="paper-tape tape-left" />

                <div className="paper-tape tape-right" />

                <div className="letter-stamp">

                  <Cake size={28} />

                  <span>
                    BDAY
                  </span>

                </div>

                <div className="letter-postmark">
                  SPECIAL
                  <br />
                  DELIVERY
                </div>

                {!letterOpen ? (

                  <div className="sealed-letter">

                    <div className="sealed-envelope">

                      <Mail size={55} />

                      <span>
                        YOU HAVE A LETTER
                      </span>

                      <strong>
                        OPEN ME ♡
                      </strong>

                      <button
                        type="button"
                        className="secondary-button"
                        onClick={
                          openLetter
                        }
                      >
                        OPEN LETTER
                      </button>

                    </div>

                  </div>

                ) : (

                  <div className="letter-content letter-reveal">

                    <div className="handwritten-small">
                      DEAR{" "}
                      {
                        birthdayData
                          .recipient
                          .toUpperCase()
                      }
                      ,
                    </div>

                    <h2>
                      {
                        birthdayData
                          .letter
                          .title
                      }
                    </h2>

                    <p>
                      {
                        birthdayData
                          .letter
                          .message
                      }
                    </p>

                    <div className="letter-signoff">

                      {
                        birthdayData
                          .letter
                          .signOff
                      }

                      <span>
                        ♡
                      </span>

                    </div>

                  </div>

                )}

                <div className="letter-bottom">

                  <span>
                    FROM:{" "}
                    {
                      birthdayData
                        .sender
                    }
                  </span>

                  <span>
                    ✦
                  </span>

                  <span>
                    CONFIDENTIAL MAIL
                  </span>

                </div>

              </div>

            </section>

            {/* =====================================
                PHOTOS
            ===================================== */}

            <section className="section-wrap photos-section">

              <div className="section-label">
                <span>
                  02
                </span>
                PHOTO DELIVERY
              </div>

              <div className="photo-delivery">

                <button
                  type="button"
                  className="photo-arrow"
                  onClick={
                    previousPhoto
                  }
                  aria-label="Previous photo"
                >
                  <ArrowLeft size={22} />
                </button>

                <div className="postcard">

                  <div className="postcard-image-wrap">

                    <img
                      src={
                        birthdayData
                          .photos[
                            photoIndex
                          ]
                          .image
                      }
                      alt={
                        birthdayData
                          .photos[
                            photoIndex
                          ]
                          .caption
                      }
                    />

                    <div className="photo-number">
                      {
                        birthdayData
                          .photos[
                            photoIndex
                          ]
                          .number
                      }
                    </div>

                    <div className="photo-corner">

                      <Heart
                        size={15}
                        fill="currentColor"
                      />

                    </div>

                  </div>

                  <div className="postcard-details">

                    <div>

                      <span className="postcard-date">
                        {
                          birthdayData
                            .photos[
                              photoIndex
                            ]
                            .date
                        }
                      </span>

                      <p>
                        {
                          birthdayData
                            .photos[
                              photoIndex
                            ]
                            .caption
                        }
                      </p>

                    </div>

                    <div className="postcard-stamp">

                      <Heart
                        size={19}
                        fill="currentColor"
                      />

                      <small>
                        LOVE
                      </small>

                    </div>

                  </div>

                </div>

                <button
                  type="button"
                  className="photo-arrow"
                  onClick={
                    nextPhoto
                  }
                  aria-label="Next photo"
                >
                  <ArrowRight size={22} />
                </button>

              </div>

              <div className="photo-counter">

                {
                  birthdayData
                    .photos
                    .map(
                      (_, index) => (
                        <button
                          type="button"
                          key={index}
                          className={
                            index ===
                            photoIndex
                              ? "active"
                              : ""
                          }
                          onClick={() =>
                            setPhotoIndex(
                              index,
                            )
                          }
                          aria-label={`Go to photo ${
                            index + 1
                          }`}
                        />
                      ),
                    )
                }

              </div>

            </section>

            {/* =====================================
                MEMORY STAMPS
            ===================================== */}

            <section className="section-wrap memories-section">

              <div className="section-label">
                <span>
                  03
                </span>
                MEMORY STAMPS
              </div>

              <div className="memory-heading">

                <div className="mini-postage">
                  <span>
                    POSTAGE
                  </span>

                  <strong>
                    4
                  </strong>
                </div>

                <h2>
                  Worth Keeping
                </h2>

                <p>
                  Four little pieces of mail,
                  each carrying something
                  different.
                </p>

              </div>

              <div className="stamp-grid">

                {
                  birthdayData
                    .memories
                    .map(
                      (
                        memory,
                        index,
                      ) => (

                        <button
                          type="button"
                          className={`memory-stamp stamp-${
                            index + 1
                          } ${
                            memory.color
                          }`}
                          key={
                            memory.stamp
                          }
                          onClick={() =>
                            openMemory(
                              memory,
                            )
                          }
                        >

                          <div className="stamp-inner">

                            <div className="stamp-topline">

                              <span>
                                {
                                  memory
                                    .category
                                }
                              </span>

                              <strong>
                                {
                                  memory.stamp
                                }
                              </strong>

                            </div>

                            <div className="stamp-icon">
                              {
                                memory.icon
                              }
                            </div>

                            <h3>
                              {
                                memory.title
                              }
                            </h3>

                            <small>
                              TAP TO OPEN
                            </small>

                            <div className="stamp-barcode">
                              || ||| | |||| || |
                            </div>

                          </div>

                        </button>

                      ),
                    )
                }

              </div>

            </section>

            {/* =====================================
                DATE MEMO
            ===================================== */}

            <section className="section-wrap date-section">

              <div className="section-label">
                <span>
                  04
                </span>
                SPECIAL INVITATION
              </div>

              <div className="date-card">

                <div className="date-card-top">

                  <div className="date-eyebrow">
                    {
                      birthdayData
                        .dateMemo
                        .eyebrow
                    }
                  </div>

                  <div className="date-sticker">
                    ♡
                  </div>

                </div>

                <h2 className="date-title">
                  {
                    birthdayData
                      .dateMemo
                      .title
                  }
                </h2>

                <p className="date-copy">
                  {
                    birthdayData
                      .dateMemo
                      .message
                  }
                </p>

                <div className="date-details">

                  <div className="date-detail">

                    <span>
                      DATE
                    </span>

                    <strong>
                      {
                        birthdayData
                          .dateMemo
                          .date
                      }
                    </strong>

                  </div>

                  <div className="date-detail">

                    <span>
                      TIME
                    </span>

                    <strong>
                      {
                        birthdayData
                          .dateMemo
                          .time
                      }
                    </strong>

                  </div>

                  <div className="date-detail">

                    <span>
                      PLACE
                    </span>

                    <strong>
                      {
                        birthdayData
                          .dateMemo
                          .place
                      }
                    </strong>

                  </div>

                </div>

                <div className="date-question">
                  {
                    birthdayData
                      .dateMemo
                      .question
                  }
                </div>

                {/* BUTTONS */}

                <div className="date-actions">

                  <button
                    type="button"
                    className="date-button date-yes"
                    onClick={
                      sayYes
                    }
                  >
                    {
                      birthdayData
                        .dateMemo
                        .yesButton
                    }
                  </button>

                  <button
                    type="button"
                    className="date-button date-no"
                    onMouseEnter={
                      moveNoButton
                    }
                    onFocus={
                      moveNoButton
                    }
                    onClick={
                      moveNoButton
                    }
                    style={
                      {
                        "--no-x": `${noPosition.x}px`,
                        "--no-y": `${noPosition.y}px`,
                      } as React.CSSProperties
                    }
                  >
                    {
                      birthdayData
                        .dateMemo
                        .noButton
                    }
                  </button>

                </div>

                <div
                  className={`date-reply ${
                    dateReply
                      ? "show"
                      : ""
                  }`}
                >
                  {
                    dateReply
                  }
                </div>

                <div className="date-mini-note">
                  {
                    birthdayData
                      .dateMemo
                      .note
                  }
                </div>

                <div className="date-hearts">
                  ♡ &nbsp; ✦ &nbsp; ♡ &nbsp;
                  ✦ &nbsp; ♡
                </div>

              </div>

            </section>

            {/* =====================================
                PACKAGE
            ===================================== */}

            <section className="section-wrap package-section">

              <div className="section-label">
                <span>
                  05
                </span>
                SPECIAL PACKAGE
              </div>

              <div className="package-area">

                <div className="package-stars">
                  ✦ ✧ ✦
                </div>

                {!packageOpen ? (

                  <>

                    <div className="package-box">

                      <div className="package-tape">
                        <span>
                          ♡
                        </span>
                      </div>

                      <div className="package-front">

                        <Package size={54} />

                        <span>
                          {
                            birthdayData
                              .package
                              .label
                          }
                        </span>

                        <strong>
                          OPEN ME!
                        </strong>

                        <div className="package-label">
                          TO:{" "}
                          {
                            birthdayData
                              .recipient
                          }
                        </div>

                      </div>

                    </div>

                    <h2>
                      {
                        birthdayData
                          .package
                          .title
                      }
                    </h2>

                    <button
                      type="button"
                      className="secondary-button"
                      onClick={
                        openPackage
                      }
                    >

                      <Gift size={18} />

                      {
                        birthdayData
                          .package
                          .button
                      }

                    </button>

                  </>

                ) : (

                  <div className="package-reveal">

                    <div className="reveal-burst">

                      <span>
                        ✦
                      </span>

                      <span>
                        ♡
                      </span>

                      <span>
                        ✿
                      </span>

                      <span>
                        ★
                      </span>

                    </div>

                    <div className="reveal-icon">
                      <Gift size={42} />
                    </div>

                    <h2>
                      DELIVERY UNLOCKED! ✦
                    </h2>

                    <p>
                      {
                        birthdayData
                          .package
                          .message
                      }
                    </p>

                    <div className="confetti-text">
                      ♡ &nbsp; ✦ &nbsp; ★ &nbsp;
                      ✿ &nbsp; ♥ &nbsp; ✧
                    </div>

                  </div>

                )}

              </div>

            </section>

            {/* =====================================
                MUSIC
            ===================================== */}

            <section className="section-wrap music-section">

              <div className="section-label">
                <span>
                  06
                </span>
                MUSIC MAIL
              </div>

              <div className="music-card">

                <div className="music-label">

                  <Music size={18} />

                  NOW DELIVERING

                </div>

                <div className="music-info">

                  <div
                    className={`record ${
                      musicPlaying
                        ? "spinning"
                        : ""
                    }`}
                  >

                    <div className="record-center">
                      ♡
                    </div>

                  </div>

                  <div>

                    <span>
                      YOUR BIRTHDAY SOUNDTRACK
                    </span>

                    <h3>
                      {
                        birthdayData
                          .music
                          .title
                      }
                    </h3>

                    <p>
                      {
                        birthdayData
                          .music
                          .artist
                      }
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  className="music-button"
                  onClick={
                    toggleMusic
                  }
                  aria-label={
                    musicPlaying
                      ? "Pause music"
                      : "Play music"
                  }
                >

                  {musicPlaying ? (
                    <Pause
                      size={21}
                    />
                  ) : (
                    <Play
                      size={21}
                    />
                  )}

                </button>

                <div className="music-status">
                  {
                    musicPlaying
                      ? "PLAYING NOW ♫"
                      : "MUSIC OFF"
                  }
                </div>

                <div className="music-lines">
                  ♫ ♪ ♫ ♪ ♫ ♪ ♫
                </div>

              </div>

            </section>

            {/* =====================================
                FINAL
            ===================================== */}

            <section className="final-section">

              <div className="final-envelope">

                <div className="final-flap" />

                <div className="final-content">

                  <div className="final-stamp">

                    <Cake size={26} />

                    <span>
                      {
                        birthdayData
                          .birthdayAge
                      }
                    </span>

                  </div>

                  <div className="final-small">
                    {
                      birthdayData
                        .final
                        .smallText
                    }
                  </div>

                  <h2>
                    {
                      birthdayData
                        .final
                        .title
                    }
                  </h2>

                  <p>
                    {
                      birthdayData
                        .final
                        .message
                    }
                  </p>

                  <div className="final-divider">

                    <span>
                      ✦
                    </span>

                    <span>
                      ♡
                    </span>

                    <span>
                      ✦
                    </span>

                  </div>

                  <div className="final-footer">
                    {
                      birthdayData
                        .final
                        .footer
                    }
                  </div>

                  <div className="delivery-complete">

                    <Mail size={15} />

                    DELIVERED WITH LOVE

                    <Heart
                      size={15}
                      fill="currentColor"
                    />

                  </div>

                </div>

              </div>

              <div className="final-decor decor-left">
                ✿
              </div>

              <div className="final-decor decor-right">
                ✿
              </div>

            </section>

          </>
        )}

      </main>

      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="site-footer">

        <span>
          ✦ BIRTHDAY EXPRESS ✦
        </span>

        <span>
          MADE WITH LOVE
        </span>

        <span>
          ✦ KATE STUDIO ✦
        </span>

      </footer>

      {/* =========================================
          MEMORY MODAL
      ========================================= */}

      {selectedMemory && (
        <div
          className="modal-backdrop"
          onClick={() =>
            setSelectedMemory(
              null,
            )
          }
        >

          <div
            className="memory-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              type="button"
              className="modal-close"
              onClick={() =>
                setSelectedMemory(
                  null,
                )
              }
              aria-label="Close memory"
            >
              <X size={20} />
            </button>

            <div
              className={`modal-stamp ${selectedMemory.color}`}
            >

              <span>
                {
                  selectedMemory
                    .icon
                }
              </span>

              {
                selectedMemory
                  .stamp
              }

            </div>

            <span className="modal-label">
              {
                selectedMemory
                  .category
              }
            </span>

            <h2>
              {
                selectedMemory
                  .title
              }
            </h2>

            <p>
              {
                selectedMemory
                  .text
              }
            </p>

            <div className="modal-divider">
              ✦ &nbsp; ♡ &nbsp; ✦
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default App;