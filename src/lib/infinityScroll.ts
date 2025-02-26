
export default function infinityScroll(action: () => void) {
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const isScrolledToBottom = () => {
        return window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
    }
    window.addEventListener("scroll", () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (isScrolledToBottom()) {
                action()
            }
        }, 200);
    });
}