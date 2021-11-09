export const colorPicker = () => {
  const colors = [
    "#E0BBE4",
    "#957DAD",
    "#D291BC",
    "#FEC8D8",
    "#FFDFD3",
    "#D5D6EA",
    "#F6F6EB",
    "#D7ECD9",
    "#F5D5CB",
    "#F6ECF5",
    "#F3DDF2",
  ];
  const selctedColor = colors[Math.floor(Math.random() * colors.length)];
  return selctedColor;
};
