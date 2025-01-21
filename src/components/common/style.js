export const TipsErrorDrawerStyle = (isDrawerOpen, isMobile) => ({
  position: "fixed",
  zIndex: 60,
  backgroundColor: "#1cbcba",
  color: "black",
  transition: "transform 0.3s, opacity 0.3s",
  top: isMobile ? "13%" : "0",
  right: "0",
  bottom: "auto",
  width: isMobile ? "100%" : "55%",
  height: "100%",
  transform: isDrawerOpen
    ? isMobile
      ? "translateY(0)"
      : "translateX(0)"
    : isMobile
    ? "translateY(100%)"
    : "translateX(100%)",
  opacity: isDrawerOpen ? 1 : 0, // Fades out when closing
  pointerEvents: isDrawerOpen ? "auto" : "none", // Prevent interaction when closed
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
