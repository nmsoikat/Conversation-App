const DUMMY_MESSAGES = [
  {
    _id: 1,
    content: "hello",
    sameAuthor: false,
    author: {
      _id: 1,
      username: "Marek",
    },
    date: "22/01/2022",
    sameDay: false,
  },
  {
    _id: 2,
    content: "hello once again",
    sameAuthor: true,
    author: {
      _id: 1,
      username: "Marek",
    },
    date: "22/01/2022",
    sameDay: true,
  },
  {
    _id: 3,
    content: "hello third time",
    sameAuthor: true,
    author: {
      _id: 1,
      username: "Marek",
    },
    date: "23/01/2022",
    sameDay: false,
  },
  {
    _id: 4,
    content: "hello response first time",
    sameAuthor: false,
    author: {
      _id: 2,
      username: "John",
    },
    date: "23/01/2022",
    sameDay: true,
  },
  {
    _id: 5,
    content: "hello response third time",
    sameAuthor: true,
    author: {
      _id: 2,
      username: "John",
    },
    date: "24/01/2022",
    sameDay: false,
  },
];

export default DUMMY_MESSAGES;
