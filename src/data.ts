export type Photo = {
  image: string;
  number: string;
  date: string;
  caption: string;
};

export type Memory = {
  stamp: string;
  category: string;
  title: string;
  text: string;
  icon: string;
  color: "pink" | "blue" | "yellow" | "purple";
};

export const birthdayData = {
  recipient: "Your Favorite Person",
  sender: "Someone Who Loves You",
  birthdayAge: "22",

  intro: {
    eyebrow: "SPECIAL DELIVERY",
    title: "YOU'VE GOT MAIL!",
    subtitle:
      "A little birthday surprise has arrived, and it's addressed to you.",
  },

  letter: {
    title: "A Letter Just For You",
    message:
      "Happy birthday to someone who makes ordinary days feel a little more special. I hope today reminds you how loved, appreciated, and important you are. You deserve all the happiness, laughter, and beautiful little moments coming your way.",
    signOff: "With lots of love ♡",
  },

  photos: [
    {
      image: "/photos/photo-01.jpg",
      number: "01",
      date: "FIRST CLASS",
      caption: "One of my favorite memories with you.",
    },
    {
      image: "/photos/photo-02.jpg",
      number: "02",
      date: "SPECIAL DELIVERY",
      caption: "A moment I would happily relive.",
    },
    {
      image: "/photos/photo-03.jpg",
      number: "03",
      date: "MEMORY MAIL",
      caption:
        "Proof that the best memories are the unexpected ones.",
    },
    {
      image: "/photos/photo-04.jpg",
      number: "04",
      date: "PRIORITY MAIL",
      caption:
        "Another little moment worth keeping forever.",
    },
    {
      image: "/photos/photo-05.jpg",
      number: "05",
      date: "POSTCARD #05",
      caption: "One more memory for your collection.",
    },
    {
      image: "/photos/photo-06.jpg",
      number: "06",
      date: "FOREVER MAIL",
      caption:
        "And this one will always make me smile.",
    },
  ] as Photo[],

  memories: [
    {
      stamp: "01",
      category: "FIRST CLASS",
      title: "WHERE IT STARTED",
      text:
        "The beginning of one of my favorite chapters. Some moments become special simply because they were the first.",
      icon: "✦",
      color: "pink",
    },
    {
      stamp: "02",
      category: "SPECIAL MOMENT",
      title: "THAT DAY",
      text:
        "A day that somehow turned into a memory I never want to forget.",
      icon: "♡",
      color: "blue",
    },
    {
      stamp: "03",
      category: "PRIORITY MAIL",
      title: "THE LITTLE THINGS",
      text:
        "The tiny moments somehow became the biggest ones. Those are usually the ones worth saving.",
      icon: "✿",
      color: "yellow",
    },
    {
      stamp: "04",
      category: "FOREVER DELIVERY",
      title: "KEEP THIS ONE",
      text:
        "A little reminder that some memories don't need an expiration date.",
      icon: "★",
      color: "purple",
    },
  ] as Memory[],

  dateMemo: {
    eyebrow: "SPECIAL INVITATION",
    title: "DATE MEMO 💌",
    message:
      "I would like to officially invite you to celebrate your birthday with me. Consider this your very cute, very serious, definitely-not-made-at-1AM invitation.",
    date: "YOUR BIRTHDAY",
    time: "YOUR TIME",
    place: "YOUR FAVORITE PLACE",
    question: "SOOO... WILL YOU GO WITH ME?",
    yesButton: "YES, OF COURSE ♡",
    noButton: "NO",
    yesReply:
      "YAYYYYY! I KNEW IT! 💗 Okay, it's a date. No take-backsies.",
    noReplies: [
      "nooo wait 😭",
      "are u sure about that??",
      "the button said NO but my heart said YES",
      "hmmm... suspicious 🤨",
      "nice try HAHAHA",
      "NO BUTTON ESCAPING!!!",
      "u cannot escape the birthday date 💌",
      "wrong answer bestie 😭",
    ],
    note: "P.S. The NO button is feeling a little shy.",
  },

  package: {
    label: "ONE MORE DELIVERY...",
    title: "A PACKAGE FOR YOU",
    message:
      "If birthdays came in boxes, this one would be filled with every good wish I could possibly send your way.",
    button: "OPEN PACKAGE",
  },

  music: {
    title: "Miss Independent",
    artist: "Ne-Yo",
    file: "/music/miss-independent.mp3",
  },

  final: {
    smallText: "DELIVERY COMPLETE",
    title: "HAPPY BIRTHDAY!",
    message:
      "May this new year of your life be full of happy surprises, beautiful memories, and people who love you very much.",
    footer: "MADE ESPECIALLY FOR YOU ♡",
  },
};