
function Assert(b: boolean) {
    if (!b) {
        throw new Error("Assert Error");
    }
}

export { Assert };
