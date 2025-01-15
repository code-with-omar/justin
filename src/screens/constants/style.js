export const DrawerStyle = (isDrawerOpen, isMobile) => ({
  position: "fixed",
  zIndex: isDrawerOpen ? 60 : 50,
  backgroundColor: "white",
  color: "black",
  transition: "transform 0.3s",
  top: isMobile ? "13%" : "0",
  right: "0",
  bottom: "auto",
  width: isMobile ? "100%" : "60%",
  height: "100%",
  transform: isDrawerOpen
    ? isMobile
      ? "translateY(0)"
      : "translateX(0)"
    : isMobile
    ? "translateY(100%)"
    : "translateX(100%)",
  display: "flex",
  flexDirection: "column",
  borderTopLeftRadius:
    isDrawerOpen && isMobile
      ? "1rem"
      : isDrawerOpen && !isMobile
      ? "3rem"
      : "0",
  borderTopRightRadius: isDrawerOpen && isMobile ? "1rem" : "0",
});
