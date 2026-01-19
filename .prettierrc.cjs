module.exports = {
  printWidth: 100,
  overrides: [
    {
      files: ["layouts/**/*.html", "layouts/**/*.htm", "layouts/**/*.tmpl"],
      options: {
        parser: "go-template",
      },
    },
  ],
};
