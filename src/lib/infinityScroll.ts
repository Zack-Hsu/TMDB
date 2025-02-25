

export default function (action: any) {
    let scrollTimeout: any
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