window.onload = function() {

    const textStr = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos itaque vero laborum fugit harum! Quia, cumque necessitatibus nemo veniam odit dolor impedit aspernatur, ipsa vitae minima quasi doloribus repellendus cupiditate!`;
    const operation = "5 плюс 7 = 3";

    const tasks = {
        1: () => textStr.match(/[A-Z]/g),
        2: () => operation.match(/\d+/g),
        3: () => textStr.match(/\b[a-zA-Z]{5}\b/g)
    };

    document.querySelectorAll('.formBlock').forEach(block => {
        const taskId = block.dataset.task;
        const button = block.querySelector('button');
        const output = block.querySelector('p');

        button.addEventListener('click', () => {
            output.textContent = tasks[taskId]().join(', ');
        });
    });
};