export default function infinityScroll(action: () => void) {
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const isScrolledToBottom = () => {
        return window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
    }
    const inifintyScrollAction = () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (isScrolledToBottom()) {
                action()
                removeScrollEvent()
            }
        }, 500);
    }
    const removeScrollEvent = () => {
        window.removeEventListener("scroll", inifintyScrollAction);
    }
    window.addEventListener("scroll", inifintyScrollAction);
}