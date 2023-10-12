type Func = (...args: any[]) => void;

function debounce(func: Func, delay: number): Func {
    let timer: ReturnType<typeof setTimeout>;

    return function(this: any, ...args: any[]) {
        const context = this;

        clearTimeout(timer);

        timer = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}
export default debounce;
