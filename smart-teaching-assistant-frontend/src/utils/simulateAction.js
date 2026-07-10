export const simulateAction = (delay = 1500) => {
    return new Promise((resolve) => setTimeout(resolve, delay));
};

export const simulateDownload = (fileName, delay = 2000) => {
    return simulateAction(delay);
};
