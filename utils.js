export const wrap = (length, margin = 0) => {
    const startMargin = "".padEnd(margin / 2, "\n");
    const lineMargin = "".padEnd(margin, " ");
    return {
        top: () => `${startMargin}${lineMargin}┌─${"".padEnd(length, "─")}─┐`,
        row: content => `${lineMargin}│ ${content.padEnd(length, " ")} │`,
        mid: () => `${lineMargin}├─${"".padEnd(length, "─")}─┤`,
        bottom: () => `${lineMargin}└─${"".padEnd(length, "─")}─┘${startMargin}`
    };
};

export const box = (contents = [["fallback"]]) => {
    const itemLengths = contents
        .reduce((acc, curr) => [...acc, ...curr])
        .map(i => [...i].length);
    const maxwidth = Math.max(...itemLengths);
    const wrapper = wrap(maxwidth, 2);

    console.log(wrapper.top());
    contents.map((block, i) => {
        block.map(row => console.log(wrapper.row(row)));
        if (i < contents.length - 1) {
            console.log(wrapper.mid());
        }
    });
    console.log(wrapper.bottom());
};
