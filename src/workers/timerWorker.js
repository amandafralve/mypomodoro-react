let timeoutId = null;

self.onmessage = function (event) {
    const state = event.data;
    const { activeTask, secondsRemaining } = state;

    // sempre cancela qualquer contagem anterior antes de decidir o que fazer
    if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
    }

    if (!activeTask) return; // sem tarefa ativa, não inicia contagem

    const endDate = activeTask.startDate + secondsRemaining * 1000;

    function tick() {
        const now = Date.now();
        const countDownSeconds = Math.round((endDate - now) / 1000);

        self.postMessage(countDownSeconds);

        if (countDownSeconds > 0) {
            timeoutId = setTimeout(tick, 1000);
        }
    }

    tick();
};